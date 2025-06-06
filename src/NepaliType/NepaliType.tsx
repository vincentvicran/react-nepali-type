import React, { useCallback, useDeferredValue, useEffect } from "react"

import { mapToAscii, mapToPreeti, mapToUnicode } from "./helpers"

import type { INepaliTypeProps } from "./Types"

const NepaliType: React.FunctionComponent<INepaliTypeProps> = ({
    onChange,
    className = "react-nepali-type-input",
    value,
    ...rest
}) => {
    const [asciiValue, setAsciiValue] = React.useState<string>(() => mapToPreeti(value ?? "", "Preeti"))

    useEffect(() => {
        const asciiNewValue = mapToPreeti(value ?? "", "Preeti")
        const asciiNewValue2 = mapToAscii(value ?? "")
        console.log({ alterAsciiValue: asciiNewValue, asciiNewValue2 })
        setAsciiValue(asciiNewValue2)
    }, [])

    const deferredAsciiValue = useDeferredValue(asciiValue)

    const alterAsciiValue = useCallback(() => {
        const unicodeValue = mapToUnicode(deferredAsciiValue, "Preeti")

        onChange?.(deferredAsciiValue, unicodeValue)
    }, [deferredAsciiValue])

    useEffect(() => {
        alterAsciiValue()
    }, [alterAsciiValue])

    return (
        <input
            {...rest}
            value={asciiValue}
            className={`${className} nepali-font`}
            onChange={(e) => {
                setAsciiValue(e.target.value)
            }}
        />
    )
}

export default NepaliType
