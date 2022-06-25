import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthGoogle } from "../Services/auth";
import { ContainerStyled } from "../styled";

export function LoginPage () {
    const navigate = useNavigate()
    const handleLogin = async () => {
        try {
            await AuthGoogle()
            navigate('/')
        } catch {
            alert('Erro ao fazer login')
        }
    }
    return (
        <ContainerStyled>
            <ButtonStyled onClick={handleLogin}>Login</ButtonStyled>
        </ContainerStyled>
    )
}

const ButtonStyled = styled.button`
    background-color: #311919;
    color: #fff;
    font-size: 35px;
    padding: 20px;
    border-radius: 20px ;
    :hover {
        color: #000 ;
        background-color: #fff;
    }
`