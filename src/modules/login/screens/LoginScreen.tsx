import { SetStateAction, useState } from "react";
import Button from "../../../shared/buttons/button/button";
import Input from "../../../shared/inputs/input/input";
import { BackgroundImage, ContainerLogin, ContainerLoginScreen, LimitedContainer, LogoImage, TitleLogin } from "../styles/loginScreen.styles";
import axios from "axios";

const LoginScreen: React.FC = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleLogin = async () => {
        await axios({
            method: "post",
            url: "http://localhost:8080/auth",
            data: {
                email: email,
                password: password
            }
        }).then((res) => {
            return res.data
        })
            .catch((e) => {
                alert(e)
            })
        alert("Logado com sucesso.")
    }

    return (
        <ContainerLoginScreen>
            <BackgroundImage src="./background.png" />
            <ContainerLogin>
                <LimitedContainer>
                    <LogoImage src="./logo.png" />
                    <TitleLogin level={2} type="secondary">LOGIN</TitleLogin>
                    <Input title="Usuário" margin="32px 0px 0px" onChange={handleEmail} value={email} />
                    <Input title="Senha" type="password" margin="32px 0px 0px" onChange={handlePassword} value={password} />
                    <Button type="primary" margin="64px 0px 16px 0px" onClick={handleLogin}>ENTRAR</Button>
                </LimitedContainer>
            </ContainerLogin>
        </ContainerLoginScreen>
    );
};

export default LoginScreen;