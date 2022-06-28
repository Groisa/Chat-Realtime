import styled from 'styled-components'

export const ContainerStyled = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`
export const ChatView = styled.div`
    width: 80%;
    height: 70%;
    background-color: #311919;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
export const ChatInput = styled.div`
    background-color: #fff;
    width: 100%;
    height: 15%;
    border-radius: 50px 50px 0 0 ;
    display: flex;
    align-items: center;
    justify-content: center;
    form {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    button {
        font-size: 45px;
        border: none;
        background: none;
        cursor: pointer;
    }
`
export const ChatData = styled.div`
    width: 100%;
    height: 85%;
`
export const ButtonStyled = styled.button`
        background-color: #311919;
        color: white;
        border: none;
        border-radius: 10px;
        padding: 5px;
        font-size: 18px;
        width: 70%;
        margin-top: 20px ;
        cursor: pointer;
`
export const InputStyled = styled.input`
    width: 70%;
    border-radius: 20px;
    padding: 10px;
    border: 2px solid;
`
export const StyledMensagem = styled.div`
    background-color: #fff;
    width: 50%;
    margin-left: 15px ;
    min-height: 40px;
    border-radius: 30px;
    margin-bottom: 30px ;
    p {
        margin-left: 5%;
        padding-top: 2%;
    }
`