export type TFontKeys = "Preeti" | "FONTASY_HIMALI_TT" | "Kantipur" | "PCS NEPALI" | "Sagarmatha"
type TRule = [string, string]

interface IMappingRules {
    "pre-rules": TRule[]
    "character-map": { [key: string]: string }
    "post-rules": TRule[]
}

interface IFontMappingJson
    extends Record<
        TFontKeys,
        {
            version: string
            rules: IMappingRules
        }
    > {}

// Preeti Unicode to ASCII mapping
export const FONT_MAPS_UNICODE_TO_ASCII: IFontMappingJson = {
    Preeti: {
        version: "v0.01",
        rules: {
            "character-map": {
                // Reversing the character map from ASCII_TO_UNICODE
                ण्: "0",
                ज्ञ: "1",
                द्द: "2",
                घ: "3",
                द्ध: "4",
                छ: "5",
                ट: "6",
                ठ: "7",
                ड: "8",
                ढ: "9",
                ञ्: "~",
                "१": "!",
                "२": "@",
                "३": "#",
                "४": "$",
                "५": "%",
                "६": "^",
                "७": "&",
                "८": "*",
                "९": "(",
                "०": ")",
                ")": "_",
                "ं": "+",
                " ": " ",
                ञ: "`",
                "(": "-",
                ".": "=",
                त्त: "Q",
                ध्: "W",
                भ्: "E",
                च्: "R",
                त्: "T",
                थ्: "Y",
                ग्: "U",
                क्ष्: "I",
                इ: "O",
                ए: "P",
                "ै": "}",
                "्र": "|",
                त्र: "q",
                ध: "w",
                भ: "e",
                च: "r",
                त: "t",
                थ: "y",
                ग: "u",
                ष्: "i",
                य: "o",
                उ: "p",
                "ृ": "[",
                "े": "]",
                "्": "\\",
                ब्: "A",
                क्: "S",
                म्: "D",
                "ँ": "F",
                न्: "G",
                ज्: "H",
                व्: "J",
                प्: "K",
                "ी": "L",
                स्: ":",
                "ू": '"',
                ब: "a",
                क: "s",
                म: "d",
                "ा": "f",
                न: "g",
                ज: "h",
                व: "j",
                प: "k",
                "ि": "l",
                स: ";",
                "ु": "'",
                श्: "Z",
                ह्: "X",
                ऋ: "C",
                ख्: "V",
                द्य: "B",
                ल्: "N",
                "ः": "M",
                "?": "<",
                श्र: ">",
                रु: "?",
                श: "z",
                ह: "x",
                अ: "c",
                ख: "v",
                द: "b",
                ल: "n",
                ",": ",",
                "।": ".",
                र: "/",
                ध्र: "„",
                "'": "…",
                फ्: "ˆ",
                झ्: "‰",
                ङ्घ: "‹",
                "ॅ": "'",
                ड्ड: "•",
                ऽ: "˜",
                द्र: "›",
                ज्ञ्: "¡",
                द्घ: "¢",
                घ्: "£",
                ट्ट: "§",
                ङ: "ª",
                ङ्ढ: "°",
                "+": "±",
                झ: "´",
                ठ्ठ: "¶",
                रू: "¿",
                हृ: "Å",
                '"': "Æ",
                ङ्ग: "Ë",
                न्न: "Ì",
                ङ्क: "Í",
                ङ्ख: "Î",
                "¨": "Ò",
                "=": "Ö",
                "×": "×",
                "्य": "Ø",
                ";": "Ù",
                "!": "Û",
                "%": "Ü",
                ट्ठ: "Ý",
                द्म: "ß",
                द्व: "å",
                ॐ: "ç",
                "/": "÷",
                // Add combined characters
                आ: "cf",
                ओ: "cf]",
                औ: "cf}",
                ई: "O{",
                ऐ: "P]",
                ऊ: "pm",
                "ो": "f]",
                "ौ": "f}",
            },
            "pre-rules": [
                // Preprocess certain character sequences (equivalent to reversing post-rules)
                ["अा", "आ"],
                ["अाे", "ओ"],
                ["अाै", "औ"],
                ["एे", "ऐ"],
                ["ाे", "ो"],
                ["ाै", "ौ"],
                ["ेा", "ाे"],
                ["ैा", "ाै"],
                ["टृ", "ट्ट"],
                ["^ः", ":"],
                ["ुु", "ु"],
                ["ूू", "ू"],
                ["ेे", "े"],
                ["ैै", "ै"],
                ["ंं", "ं"],
                ["ँँ", "ँ"],
                ["([ंँ])([ािीुूृेैोौः]*)", "$2$1"],
                ["([ाीुूृेैोौंःँ]+?)(्(.्)*[^्])", "$2$1"],
                ["्([ाीुूृेैोौंःँ]+?)((.्)*[^्])", "्$2$1"],
                ["{", "र्"],
                ["((.्)*){", "{$1"],
                ["(.[ािीुूृेैोौंःँ]*?){", "{$1"],
                ["ि((.्)*[^्])", "$1ि"],
                ["इ{", "ई"],
                ["उm", "ऊ"],
                ["भm", "झ"],
                ["पm", "फ"],
                ["([^उभप]+?)m", "m$1"],
                ["त्तm", "क्त"],
                ["त्रm", "क्र"],
                ["(त्र|त्त)([^उभप]+?)m", "$1m$2"],
                ["्ा", ""],
            ],
            "post-rules": [],
        },
    },
    // Add other font mappings as needed
    FONTASY_HIMALI_TT: { version: "v0.01", rules: { "character-map": {}, "pre-rules": [], "post-rules": [] } },
    Kantipur: { version: "v0.01", rules: { "character-map": {}, "pre-rules": [], "post-rules": [] } },
    "PCS NEPALI": { version: "v0.01", rules: { "character-map": {}, "pre-rules": [], "post-rules": [] } },
    Sagarmatha: { version: "v0.01", rules: { "character-map": {}, "pre-rules": [], "post-rules": [] } },
}

// Special handling for conjuncts and compound characters
const unicodeCompoundMap: Record<string, string> = {
    क्ष: "If", // क्ष = क् + ष
    त्र: "q", // त्र
    श्र: ">", // श्र
    द्य: "B", // द्य
    द्व: "å", // द्व
    द्र: "›", // द्र
    ट्ट: "§", // ट्ट
    ट्ठ: "Ý", // ट्ठ
    ठ्ठ: "¶", // ठ्ठ
    द्द: "2", // द्द
    द्ध: "4", // द्ध
    द्म: "ß", // द्म
    न्न: "Ì", // न्न
    क्त: "Qm", // क्त - placeholder
    ङ्क: "Í", // ङ्क
    ङ्ख: "Î", // ङ्ख
    ङ्ग: "Ë", // ङ्ग
    ङ्घ: "‹", // ङ्घ
    ङ्ढ: "°", // ङ्ढ
    ड्ड: "•", // ड्ड
    ज्ञ: "1", // ज्ञ
}

class NoMapForTargetException extends Error {
    constructor() {
        super("No mapping found for target font.")
        this.name = "NoMapForTargetException"
    }
}

// Helper function to get supported maps
const supportedMaps: TFontKeys[] = ["Preeti", "FONTASY_HIMALI_TT", "Kantipur", "PCS NEPALI", "Sagarmatha"]
const allRules = FONT_MAPS_UNICODE_TO_ASCII

export const mapToAscii = (input: string, toFont: TFontKeys = "Preeti"): string => {
    if (toFont.toLowerCase() === "unicode") {
        return input
    }

    if (!supportedMaps.includes(toFont)) {
        throw new NoMapForTargetException()
    }

    // Apply HTML unescaping if requested
    // let stringToConvert = unescapeHtmlInput && typeof he !== 'undefined' ? he.decode(input) : input
    let stringToConvert = input
    const rules = allRules[toFont].rules

    // Apply pre-rules (equivalent to post-rules in the original mapping)
    for (const [pattern, replacement] of rules["pre-rules"]) {
        const regex = new RegExp(pattern, "g")
        stringToConvert = stringToConvert.replace(regex, replacement)
    }

    // First handle complex conjuncts
    for (const [unicode, ascii] of Object.entries(unicodeCompoundMap)) {
        const regex = new RegExp(unicode, "g")
        stringToConvert = stringToConvert.replace(regex, ascii)
    }

    // Create a sorted array of unicode characters by length (descending)
    // to ensure longer sequences are matched first
    const sortedUnicodeChars = Object.keys(rules["character-map"]).sort((a, b) => b.length - a.length)

    // Process character by character with potential for multi-character sequences
    let result = ""
    let i = 0
    while (i < stringToConvert.length) {
        let matched = false

        // Try to match the longest possible sequence first
        for (const unicodeChar of sortedUnicodeChars) {
            if (stringToConvert.substring(i, i + unicodeChar.length) === unicodeChar) {
                result += rules["character-map"][unicodeChar]
                i += unicodeChar.length
                matched = true
                break
            }
        }

        // If no match found, keep the character as is
        if (!matched) {
            result += stringToConvert[i]
            i++
        }
    }

    // Apply post-rules (if any)
    for (const [pattern, replacement] of rules["post-rules"]) {
        const regex = new RegExp(pattern, "g")
        result = result.replace(regex, replacement)
    }

    // Apply HTML escaping if requested
    // return escapeHtmlOutput && typeof he !== "undefined" ? he.encode(result) : result
    return result
}

// Convenience function specifically for Preeti
export const unicodeToPreeti = (input: string): string => {
    return mapToAscii(input, "Preeti")
}

/**
 * devanagariToPreeti.ts
 *
 * A fairly complete example of converting Unicode Devanagari (Nepali) text
 * into legacy Preeti ASCII encoding.
 *
 * NOTES:
 *  - The "reorderShortI" handles the well-known issue with the 'ि' sign (U+093F).
 *  - Additional reorder steps for other matras can be added as needed.
 *  - The mapping dictionary is largely based on common Preeti references;
 *    real-world usage or different keyboard layouts might require slight changes.
 */

////////////////////////////////////////
// 1) HELPER FUNCTION: REORDER "ि"
////////////////////////////////////////

/**
 * Reorders the "short i" (ि / U+093F) vowel sign so that
 * in the final ASCII text, it appears *after* the consonant’s code.
 *
 * In Unicode, the stored sequence for "कि" is <क, ि>
 * which is codepoints [U+0915, U+093F].
 *
 * Preeti expects ASCII code for क first, then the ASCII code for ि.
 * But if we did a naive left-to-right replacement, the positions might invert.
 *
 * This function uses a regex that looks for:
 *   (a Devanagari letter) followed by (U+093F)
 * and rearranges it to:
 *   (U+093F) first, then (the Devanagari letter).
 *
 * Later, we map U+093F → Preeti ASCII for 'ि'.
 * Because we do the swap, the mapping will produce the right final order.
 *
 * Example: "किरण" (कि + रण)
 *   => reorder 'क + ि' to 'ि + क'
 *   => then the dictionary picks them off in the new order for correct mapping.
 */
function reorderShortI(input: string): string {
    // This regex captures any Devanagari letter/block in [\u0900-\u097F]
    // followed immediately by U+093F (the 'ि' sign)
    // Then it swaps them: "\u093F$1"
    return input.replace(/([\u0900-\u097F])\u093F/g, "\u093F$1")
}

////////////////////////////////////////
// 2) MAPPING DICTIONARY
////////////////////////////////////////

/**
 * This array defines a series of replacements from Devanagari Unicode
 * to Preeti ASCII.
 *
 * IMPORTANT:
 *   - Sometimes we have multi-character sequences (e.g., certain conjuncts),
 *     so if needed, put the multi-character patterns BEFORE single characters
 *     to avoid partial replacement conflicts.
 *   - The codes used here are the most common references for Preeti.
 *   - For some less common letters/symbols, you may need to modify or extend.
 */

// A convenient helper type
interface ReplacementRule {
    find: string // Devanagari string or codepoint(s)
    replaceWith: string // The Preeti ASCII
}

const devToPreetiMap: ReplacementRule[] = [
    //
    // 2.1) Multi-character or special sequences (if any)
    //     (In many references, “ज्ञ” is typed as "1" in Preeti, so we handle it as a single chunk)
    { find: "ज्ञ", replaceWith: "1" },
    // Other conjuncts or special forms can go here...

    //
    // 2.2) Basic Vowels
    //
    { find: "अ", replaceWith: "c" },
    { find: "आ", replaceWith: "cf" },
    { find: "इ", replaceWith: "O" },
    { find: "ई", replaceWith: "O}" },
    { find: "उ", replaceWith: "p" },
    { find: "ऊ", replaceWith: "P" },
    { find: "ए", replaceWith: "C" },
    { find: "ऐ", replaceWith: "Cf" },
    { find: "ओ", replaceWith: "lk" },
    { find: "औ", replaceWith: "lo" },
    { find: "ऋ", replaceWith: "}" },
    // Add vocalic L (ऌ) etc. if needed

    //
    // 2.3) Consonants
    //
    { find: "क", replaceWith: "s" },
    { find: "ख", replaceWith: "v" },
    { find: "ग", replaceWith: "u" },
    { find: "घ", replaceWith: "3" },
    { find: "ङ", replaceWith: "ª" },

    { find: "च", replaceWith: "r" },
    { find: "छ", replaceWith: "5" },
    { find: "ज", replaceWith: "h" },
    { find: "झ", replaceWith: "`" },
    { find: "ञ", replaceWith: "6«" }, // sometimes "6^" or variations

    { find: "ट", replaceWith: "t" },
    { find: "ठ", replaceWith: "T" },
    { find: "ड", replaceWith: "[" },
    { find: "ढ", replaceWith: "7" },
    { find: "ण", replaceWith: "8" },

    { find: "त", replaceWith: "w" },
    { find: "थ", replaceWith: "g" },
    { find: "द", replaceWith: "af" },
    { find: "ध", replaceWith: "k" },
    { find: "न", replaceWith: "a" },

    { find: "प", replaceWith: "z" },
    { find: "फ", replaceWith: "if" },
    { find: "ब", replaceWith: "]" },
    { find: "भ", replaceWith: "x" },
    { find: "म", replaceWith: "?@" },

    { find: "य", replaceWith: "¤" },
    { find: "र", replaceWith: ">" },
    { find: "ल", replaceWith: "b" },
    { find: "व", replaceWith: "B" },
    { find: "श", replaceWith: '"' },
    { find: "ष", replaceWith: "q" },
    { find: "स", replaceWith: "?" },
    { find: "ह", replaceWith: "…" },

    //
    // 2.4) Dependent Vowel Signs / Matras
    //
    // Important: “ि” (U+093F) is handled by reorderShortI first,
    // then we map it. So we map U+093F alone here:
    { find: "ि", replaceWith: "f" },

    { find: "ा", replaceWith: "f" },
    { find: "ी", replaceWith: "]" },
    { find: "ु", replaceWith: "'" },
    { find: "ू", replaceWith: '"' },
    { find: "े", replaceWith: "{" },
    { find: "ै", replaceWith: "{f" },
    { find: "ो", replaceWith: "l" },
    { find: "ौ", replaceWith: "o" },
    { find: "ृ", replaceWith: "}" },

    //
    // 2.5) Diacritics / Signs
    //
    // Chandrabindu / Anusvara / Visarga, etc.
    { find: "ँ", replaceWith: "=" }, // chandrabindu
    { find: "ं", replaceWith: "m" }, // anusvara
    { find: "ः", replaceWith: ":" }, // visarga
    { find: "ँ", replaceWith: "=" }, // chandrabindu
    { find: "्", replaceWith: "\\" }, // virama (half letter)

    //
    // 2.6) Numbers
    //
    { find: "०", replaceWith: "0" },
    { find: "१", replaceWith: "1" },
    { find: "२", replaceWith: "2" },
    { find: "३", replaceWith: "3" },
    { find: "४", replaceWith: "4" },
    { find: "५", replaceWith: "5" },
    { find: "६", replaceWith: "6" },
    { find: "७", replaceWith: "7" },
    { find: "८", replaceWith: "8" },
    { find: "९", replaceWith: "9" },

    //
    // 2.7) Punctuation (partial)
    //
    { find: "।", replaceWith: "|" }, // danda
    { find: "॥", replaceWith: "||" }, // double danda
]

/**
 * Because we have multiple possible matches, we want to replace all occurrences.
 * We'll do a simple pass for each rule in order.
 * For sequences (like "ज्ञ"), we put them before single-character maps, so that they don't
 * get partially replaced by the single-character rules for "ज" etc.
 */
function applyMapping(str: string): string {
    let out = str
    for (const { find, replaceWith } of devToPreetiMap) {
        // Replace all occurrences
        out = out.split(find).join(replaceWith)
    }
    return out
}

////////////////////////////////////////
// 3) MAIN FUNCTION
////////////////////////////////////////

/**
 * Convert a Unicode Devanagari string to Preeti ASCII.
 * Steps:
 *   1) Reorder the short-i sign (ि) so that it occurs *before* the consonant in the text stream.
 *   2) Apply dictionary-based replacements for all relevant characters and signs.
 *
 * Usage:
 *   const input = "किरण";
 *   const output = convertUnicodeToPreeti(input);
 *   console.log(output);  // => e.g. "sfa..."
 */
export function convertUnicodeToPreetiChat(input: string): string {
    // 1) reorder 'ि' so the final ASCII ends up correct
    const reordered = reorderShortI(input)

    // 2) do dictionary-based replacements
    const mapped = applyMapping(reordered)

    return mapped
}

// ----------------------------------------------------------------
// Example usage / testing (uncomment if you’re actually running TS):
// ----------------------------------------------------------------
// const sample = "किरण";
// const preeti = convertUnicodeToPreeti(sample);
// console.log(`"${sample}" in Preeti => "${preeti}"`);
