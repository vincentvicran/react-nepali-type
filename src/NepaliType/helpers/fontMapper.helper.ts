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
    if (fromFont.toLowerCase() === "unicode") {
        return input
    }

    if (!supportedMaps.includes(fromFont)) {
        throw new NoMapForOriginException()
    }

    let text = unescapeHtmlInput ? he.decode(input) : input
    const rules = allRules[fromFont].rules

    var output = ""
    for (var w = 0; w < text.length; w++) {
        var letter = text[w]
        output += rules["character-map"][letter] || letter
    }

    for (let r of rules["post-rules"]) {
        const regexPattern = new RegExp(r[0], "g")
        output = output.replace(regexPattern, r[1])
    }

    return escapeHtmlOutput ? he.encode(output) : output
}

export const mapToPreeti1 = (
    input: string,
    fromFont: TFontKeys = "Preeti",
    unescapeHtmlInput: boolean = false,
    escapeHtmlOutput: boolean = false,
): string => {
    let inputString = unescapeHtmlInput ? he.decode(input) : input

    if (!supportedMaps.includes(fromFont)) {
        throw new NoMapForOriginException()
    }

    if (fromFont.toLowerCase() === "preeti") {
        return inputString
    }

    const unicodeMapped = mapToUnicode(inputString, fromFont)
    const preetiMapped = convertUnicodeToASCIIPreeti(unicodeMapped)

    return escapeHtmlOutput ? he.encode(preetiMapped) : preetiMapped
}
