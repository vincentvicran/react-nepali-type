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

export const mapToAsciiBackup = (
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

    // 1) Possibly decode HTML entities.
    let stringToConvert = unescapeHtmlInput ? he.decode(input) : input

    // -------------------------------------------------------------------------
    //  STEP A: Reorder the "ि" (U+093F) so that in the final ASCII text,
    //          the vowel sign shows up AFTER the consonant code.
    //          e.g., /([क-ह])ि/ →  "ि$1"
    //          We'll do this BEFORE we apply reversed dictionary rules.
    // -------------------------------------------------------------------------
    stringToConvert = reorderShortI(stringToConvert)

    // The original code obtains ASCII->Unicode rules from `allRules[toFont]`.
    // We'll build the reversed dictionary, reversed post-rules, etc.:
    const rules = allRules[toFont].rules

    // Create the reversed character map (Unicode → ASCII)
    const reverseCharMap: { [key: string]: string } = {}
    for (const [ascii, unicode] of Object.entries(rules["character-map"])) {
        reverseCharMap[unicode] = ascii
    }

    // Reverse the post-rules (and swap their pattern/replacement)
    const reversePostRules = rules["post-rules"]
        .slice()
        .reverse()
        .map(([pattern, replacement]) => [replacement, pattern])
        .filter(([pattern]) => pattern !== "") // skip empty patterns

    // Reverse the pre-rules (and swap their pattern/replacement)
    const reversePreRules = rules["pre-rules"]
        .slice()
        .reverse()
        .map(([pattern, replacement]) => [replacement, pattern])
        .filter(([pattern]) => pattern !== "")

    // -------------------------------------------------------------------------
    //  STEP B: Tokenize and apply "reverse post-rules", then do dictionary
    //          mapping (Unicode → ASCII), then "reverse pre-rules".
    // -------------------------------------------------------------------------
    const splitPattern = /(\s+|\S+)/g
    const words = stringToConvert.match(splitPattern) || []
    let mappedString = ""

    for (const word of words) {
        let transformedWord = word

        // 1) Reverse post-rules
        for (const [pattern, replacement] of reversePostRules) {
            if (!pattern) continue
            transformedWord = transformedWord.replace(new RegExp(pattern, "g"), replacement)
        }

        // 2) Dictionary-based replacement (similar to applyMapping),
        //    but we do it piecewise, looking for multi-char sequences in the reversed dictionary.
        let mappedWord = ""
        let i = 0
        while (i < transformedWord.length) {
            let found = false
            // Try to match longest sequences first (4 chars, 3, 2, 1)
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
            // If no match found, copy as-is
            if (!found) {
                mappedWord += transformedWord[i]
                i++
            }
        }

        // 3) Reverse pre-rules
        for (const [pattern, replacement] of reversePreRules) {
            mappedWord = mappedWord.replace(new RegExp(pattern, "g"), replacement)
        }

        mappedString += mappedWord
    }

    mappedString = mappedString.replaceAll("©", "/")

    // Possibly re-encode as HTML
    return escapeHtmlOutput ? he.encode(mappedString) : mappedString
}

/**
 * reorderShortI:
 *  Moves the Devanagari "ि" (U+093F) so it appears
 *  before the consonant in the text stream.
 *
 *  Typically, we do:
 *    /([\u0900-\u097F])\u093F/g  =>  "\u093F$1"
 *  so that the final ASCII output has the matra AFTER
 *  the consonant glyph.
 */
function reorderShortI(input: string): string {
    // This matches any Devanagari letter/block char in [\u0900-\u097F]
    // followed immediately by ि (U+093F).
    // Then reorders them.
    return input.replace(/([\u0900-\u097F])\u093F/g, "\u093F$1")
}
