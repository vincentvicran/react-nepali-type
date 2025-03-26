import * as he from "he"

import { NoMapForOriginException } from "../exceptions"
import { FONT_MAPS_ASCII_TO_UNICODE } from "../maps"
import { convertUnicodeToASCIIPreeti } from "../utils" // Assuming this exists

import type { IFontMappingJson, TFontKeys } from "../maps"

const allRules: IFontMappingJson = FONT_MAPS_ASCII_TO_UNICODE
const supportedMaps: Array<TFontKeys> = Object.keys(allRules) as Array<TFontKeys>

export const mapToUnicode = (
    input: string,
    fromFont: TFontKeys = "Preeti",
    unescapeHtmlInput: boolean = false,
    escapeHtmlOutput: boolean = false,
): string => {
    if (fromFont.toLowerCase() === "unicode") {
        return input
    }

    if (!supportedMaps.includes(fromFont)) {
        throw new NoMapForOriginException()
    }

    let stringToConvert = unescapeHtmlInput ? he.decode(input) : input
    const rules = allRules[fromFont].rules

    const splitPattern = /(\s+|\S+)/g
    const words = stringToConvert.match(splitPattern) || []
    let mappedString = ""

    for (const word of words) {
        let transformedWord = word

        for (const [pattern, replacement] of rules["pre-rules"]) {
            transformedWord = transformedWord.replace(new RegExp(pattern, "g"), replacement)
        }

        let mappedWord = ""
        for (const char of transformedWord) {
            mappedWord += rules["character-map"][char] || char
        }

        for (const [pattern, replacement] of rules["post-rules"]) {
            mappedWord = mappedWord.replace(new RegExp(pattern, "g"), replacement)
        }

        mappedString += mappedWord
    }

    return escapeHtmlOutput ? he.encode(mappedString) : mappedString
}

export const mapToPreeti = (
    input: string,
    fromFont: TFontKeys = "Preeti",
    unescapeHtmlInput: boolean = false,
    escapeHtmlOutput: boolean = false,
): string => {
    let inputString = unescapeHtmlInput ? he.decode(input) : input

    if (!supportedMaps.includes(fromFont)) {
        throw new NoMapForOriginException()
    }

    // if (fromFont.toLowerCase() === "preeti") {
    //     return inputString
    // }

    const unicodeMapped = mapToUnicode(inputString, fromFont)
    const preetiMapped = convertUnicodeToASCIIPreeti(unicodeMapped)

    console.log({ preetiMapped })

    return escapeHtmlOutput ? he.encode(preetiMapped) : preetiMapped
}

export const mapToAscii = (
    input: string,
    toFont: TFontKeys = "Preeti",
    unescapeHtmlInput: boolean = false,
    escapeHtmlOutput: boolean = false,
): string => {
    if (toFont.toLowerCase() === "unicode") {
        return input
    }

    // Check if the target font is supported
    if (!supportedMaps.includes(toFont)) {
        throw new NoMapForOriginException()
    }

    let stringToConvert = unescapeHtmlInput ? he.decode(input) : input
    const rules = allRules[toFont].rules

    // Create a reverse character map
    const reverseCharMap: { [key: string]: string } = {}
    for (const [ascii, unicode] of Object.entries(rules["character-map"])) {
        reverseCharMap[unicode] = ascii
    }

    // Apply reverse post-rules first (these need to be applied in reverse order)
    const reversePostRules = rules["post-rules"]
        .slice()
        .reverse()
        .map(([pattern, replacement]) => [replacement, pattern])
        .filter(([pattern]) => pattern !== "") // Skip rules with empty patterns

    // Apply reverse pre-rules last (in reverse order)
    const reversePreRules = rules["pre-rules"]
        .slice()
        .reverse()
        .map(([pattern, replacement]) => [replacement, pattern])
        .filter(([pattern]) => pattern !== "") // Skip rules with empty patterns

    // Process the input
    const splitPattern = /(\s+|\S+)/g
    const words = stringToConvert.match(splitPattern) || []
    let mappedString = ""

    for (const word of words) {
        let transformedWord = word

        // Apply reverse post-rules
        for (const [pattern, replacement] of reversePostRules) {
            // Handle empty pattern special case
            if (pattern === "") continue
            transformedWord = transformedWord.replace(new RegExp(pattern, "g"), replacement)
        }

        // Apply character mapping
        let mappedWord = ""
        let i = 0
        while (i < transformedWord.length) {
            let found = false

            // Try to match longest sequences first
            for (let len = 4; len > 0; len--) {
                if (i + len <= transformedWord.length) {
                    const seq = transformedWord.substring(i, i + len)
                    if (reverseCharMap[seq]) {
                        mappedWord += reverseCharMap[seq]
                        i += len
                        found = true
                        break
                    }
                }
            }

            // If no match found, keep the character as is
            if (!found) {
                mappedWord += transformedWord[i]
                i++
            }
        }

        // Apply reverse pre-rules
        for (const [pattern, replacement] of reversePreRules) {
            mappedWord = mappedWord.replace(new RegExp(pattern, "g"), replacement)
        }

        mappedString += mappedWord
    }

    return escapeHtmlOutput ? he.encode(mappedString) : mappedString
}
