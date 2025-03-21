import React, { useCallback, useDeferredValue, useEffect } from "react"

import type { INepaliTypeProps } from "./Types"
import { mapToPreeti, mapToUnicode } from "./helpers"

const NepaliType: React.FunctionComponent<INepaliTypeProps> = ({
    onChange,
    className = "react-nepali-type-input",
    value,
    ...rest
}) => {
    const [asciiValue, setAsciiValue] = React.useState<string>(() => mapToPreeti(value ?? "", "Preeti"))

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
