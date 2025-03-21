export interface INepaliTypeProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    onChange: (asciiValue: string, unicodeValue: string) => void
    value?: string
}
