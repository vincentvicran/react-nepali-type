import { FONT_MAPS_UNICODE_TO_ASCII } from "../maps"

function normalizeUnicode(unicodetext: string): string {
    let index = -1
    let normalized = ""
    while (index + 1 < unicodetext.length) {
        index += 1
        const character = unicodetext[index]
        try {
            try {
                if (character !== "र") {
                    // for aadha akshars
                    if (
                        unicodetext[index + 1] === "्" &&
                        unicodetext[index + 2] !== " " &&
                        unicodetext[index + 2] !== "।" &&
                        unicodetext[index + 2] !== "," &&
                        unicodetext[index + 2] !== "र"
                    ) {
                        if ("wertyuxasdghjkzvn".includes(FONT_MAPS_UNICODE_TO_ASCII[character])) {
                            normalized += String.fromCharCode(FONT_MAPS_UNICODE_TO_ASCII[character].charCodeAt(0) - 32)
                            index += 1
                            continue
                        } else if (character === "स") {
                            normalized += ":"
                            index += 1
                            continue
                        } else if (character === "ष") {
                            normalized += "i"
                            index += 1
                            continue
                        }
                    }
                }
                if (unicodetext[index - 1] !== "र" && character === "्" && unicodetext[index + 1] === "र") {
                    // for खुट्टा चिर्ने चिन्ह
                    if (
                        unicodetext[index - 1] !== "ट" &&
                        unicodetext[index - 1] !== "ठ" &&
                        unicodetext[index - 1] !== "ड"
                    ) {
                        normalized += "|" // for sign as in क्रम
                        index += 1
                        continue
                    } else {
                        normalized += "«" // for sign as in ट्रक
                        index += 1
                        continue
                    }
                }
            } catch (err) {
                // ignore index out of range error
            }
            normalized += character
        } catch (err) {
            normalized += character
        }
    }
    normalized = normalized.replace("त|", "q") // for त्र
    return normalized
}

export function convertUnicodeToASCIIPreeti(unicodestring: string): string {
    const normalizedunicodetext = normalizeUnicode(unicodestring)
    let converted = ""
    let index = -1
    while (index + 1 < normalizedunicodetext.length) {
        index += 1
        const character = normalizedunicodetext[index]
        if (character === "\ufeff") continue
        try {
            try {
                if (normalizedunicodetext[index + 1] === "ि") {
                    // for normal hraswo ukaar
                    if (character === "q") {
                        converted += "l" + character
                    } else {
                        converted += "l" + FONT_MAPS_UNICODE_TO_ASCII[character]
                    }
                    index += 1
                    continue
                }

                if (normalizedunicodetext[index + 2] === "ि") {
                    // for constructs like त्ति
                    if ("WERTYUXASDGHJK:ZVN".includes(normalizedunicodetext[index + 1])) {
                        if (normalizedunicodetext[index + 1] !== "q") {
                            // if not like न्त्रि
                            converted += "l" + character + FONT_MAPS_UNICODE_TO_ASCII[normalizedunicodetext[index + 1]]
                            index += 2
                            continue
                        } else {
                            converted += "l" + character + normalizedunicodetext[index + 1]
                            index += 2
                            continue
                        }
                    }
                }

                if (normalizedunicodetext[index + 1] === "्" && character === "र") {
                    // for reph as in वार्ता
                    if ("आोैेैी".includes(normalizedunicodetext[index + 3])) {
                        converted +=
                            FONT_MAPS_UNICODE_TO_ASCII[normalizedunicodetext[index + 2]] +
                            FONT_MAPS_UNICODE_TO_ASCII[normalizedunicodetext[index + 3]] +
                            "{"
                        index += 3
                        continue
                    }
                    if (normalizedunicodetext[index + 3] === "ि") {
                        converted +=
                            FONT_MAPS_UNICODE_TO_ASCII[normalizedunicodetext[index + 3]] +
                            FONT_MAPS_UNICODE_TO_ASCII[normalizedunicodetext[index + 2]] +
                            "{"
                        index += 3
                        continue
                    }
                    converted += FONT_MAPS_UNICODE_TO_ASCII[normalizedunicodetext[index + 2]] + "{"
                    index += 2
                    continue
                }

                if (normalizedunicodetext[index + 3] === "ि") {
                    // for the likes of ष्ट्रिय
                    if (["|", "«"].includes(normalizedunicodetext[index + 2])) {
                        if ("WERTYUXASDGHJK:ZVNIi".includes(normalizedunicodetext[index + 1])) {
                            converted +=
                                "l" +
                                character +
                                FONT_MAPS_UNICODE_TO_ASCII[normalizedunicodetext[index + 1]] +
                                normalizedunicodetext[index + 2]
                            index += 3
                            continue
                        }
                    }
                }
            } catch (err) {
                // ignore index out of range error
            }
            converted += FONT_MAPS_UNICODE_TO_ASCII[character]
        } catch (err) {
            converted += character
        }
    }

    converted = converted.replace("Si", "I") // Si in preeti is aadha ka aadha ष
    converted = converted.replace("H`", "1") // H` is the product of composite nature of unicode ज्ञ
    converted = converted.replace("b\\w", "4") // b\w means in preeti द halanta ध
    converted = converted.replace("z|", ">") // composite for श्र
    converted = converted.replace("/'", "?") // composite for रु
    converted = converted.replace('/"', "¿") // composite for रू
    converted = converted.replace("Tt", "Q") // composite for त्त
    converted = converted.replace("b\\lj", "lå") // composite for द्वि
    converted = converted.replace("b\\j", "å") // composite for द्व
    converted = converted.replace("0f\\", "0") // composite for ण् to get the aadha ण in say गण्डक
    converted = converted.replace("`\\", "~") // composite for aadha ञ्
    return converted
}
