import { useState } from "react";
import { BackgroundImage, ContainerLogin, ContainerLoginScreen, LimitedContainer, TitleLogin } from "../styles/loginScreen.styles";
import SVGLogo from "../../../shared/components/icons/SVGLogo";
import Input from "../../../shared/components/inputs/input/input";
import Button from "../../../shared/components/buttons/button/button";
import { useRequests } from "../../../shared/hooks/useRequests";
import { UserType } from "../types/UserType";

const LoginScreen: React.FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { loading, postRequest } = useRequests()

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleLogin = () => {
        postRequest<UserType>("http://localhost:8080/auth", {
            email: email,
            password: password
        })
    }

    return (
        <ContainerLoginScreen>
            <BackgroundImage src="./background.png" />
            <ContainerLogin>
                <LimitedContainer>
                    <SVGLogo />
                    <TitleLogin level={2} type="secondary">LOGIN</TitleLogin>
                    <Input title="Usuário" margin="32px 0px 0px" onChange={handleEmail} value={email} />
                    <Input title="Senha" type="password" margin="32px 0px 0px" onChange={handlePassword} value={password} />
                    <Button loading={loading} type="primary" margin="64px 0px 16px 0px" onClick={handleLogin}>ENTRAR</Button>
                </LimitedContainer>
            </ContainerLogin>
        </ContainerLoginScreen>
    );
};

export default LoginScreen;