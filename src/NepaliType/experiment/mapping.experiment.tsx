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
