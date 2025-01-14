import { useEffect, useState } from "react";
import Input, { InputProps } from "../input/input"

interface InputMoneyProps extends InputProps {
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    addonBefore?: string;
}

const DECIMAL_SIZE = 2

const InputMoney = ({ value, onChange, addonBefore = 'R$', ...props }: InputMoneyProps) => {

    const [currentValue, setCurrentValue] = useState<string>(`${value}`)

    useEffect(() => {
        const valueString = `${value}`

        if (/\d/.test(valueString.replace('.', ''))) {
            setCurrentValue(value.toFixed(DECIMAL_SIZE).toString().replace('.', ','))
        }

    }, [value])

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valueRemoved = e.target.value.replace(',', '')
        const sizeSlice = valueRemoved.length - DECIMAL_SIZE
        const newValue = [
            valueRemoved.slice(0, sizeSlice),
            '.',
            valueRemoved.slice(sizeSlice),
        ].join('')

        onChange({
            ...e,
            target: {
                ...e.target,
                value: newValue
            }
        })
    }


    return (
        <Input addonBefore={addonBefore} value={currentValue} onChange={handleOnChange} {...props} />
    )

}

export default InputMoney