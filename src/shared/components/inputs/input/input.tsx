import { Input as InputAntd, InputProps as InputPropsAntd } from "antd"
import { BoxInput, TitleInput } from "./input.styles"
import { InputTextIdEnum } from "./enum/InputTestIdEnum";

export interface InputProps extends InputPropsAntd {
    title?: string;
    margin?: string;

}

const Input = ({ title, margin, ...props }: InputProps) => {

    return (
        <BoxInput data-testid={InputTextIdEnum.BOX_INPUT} style={{ margin }}>
            {title && <TitleInput data-testid={InputTextIdEnum.INPUT_TITLE}>{title}</TitleInput>}
            <InputAntd {...props} />
        </BoxInput>
    )

}

export default Input