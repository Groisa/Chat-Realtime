import { collection, onSnapshot } from "firebase/firestore";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { chatMensagem, getPhoto, photoMensagem } from "../Services/chatMensagem";
import { auth, db } from "../Services/firebase";
import { singOut } from "../Services/singOut";
import { ButtonStyled, ChatData, ChatInput, ChatView, ContainerStyled, CotainerMensagem, InputStyled, StyledMensagem, StyledMensagemContainer } from "../styled";
export function Homeview() {
    const [loading, setloading] = useState(false)
    const [dataMenagens, setDataMensagens] = useState([])
    const Loggout = async () => {
        await singOut()
    }
    const formik = useFormik({
        initialValues: {
            chatText: ''
        },
        onSubmit: async (values) => {
            await chatMensagem(values.chatText)
        }
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const file = formData.get('file')
        if (file && file.size > 0) {
            setloading(true)
            await photoMensagem(file)
            setloading(false)
            alert('Foto cadastra com sucesso')
        }
    }
    useEffect(() => {
        const getMensagem = async () => {
            const colectionMensagem = collection(db, 'mensagem')
            onSnapshot(colectionMensagem, (snapshot) => {
                const data = snapshot.docs.map(mensagem => mensagem.data())
                setDataMensagens(data.sort((a, b) => {
                    return new Date(b.dateCreate) - new Date(a.dateCreate)
                }))
            })
        }
        getMensagem()
    }, [])
    return (
        <ContainerStyled>
            <ChatView>
                <ChatData>
                    {dataMenagens.map(mensagem =>
                        <CotainerMensagem>
                            <StyledMensagem>
                                <span>{mensagem.userName}</span>
                                <StyledMensagemContainer>
                                    <p>{mensagem.mensagem}</p>
                                </StyledMensagemContainer>
                            </StyledMensagem>
                            <img src={mensagem.docSnapUrl} />
                        </CotainerMensagem>
                    )}
                </ChatData>
                <ChatInput>
                    <form onSubmit={formik.handleSubmit}>
                        <InputStyled
                            placeholder="Digite sua mensagem"
                            {...formik.getFieldProps('chatText')}
                        />
                        <button type="submit">➭</button>
                    </form>
                </ChatInput>
            </ChatView>
            <PStyled>Insira sua Foto de perfil</PStyled>
            <InpurtStyled onSubmit={handleSubmit}>
                <input
                    type='file'
                    placeholder="Insira sua foto de Perfil"
                    required
                    name='file'
                />
                <button type="submit">Enviar</button>
                {loading &&
                    <p>Enviando ...</p>
                }
            </InpurtStyled>
            <ButtonStyled onClick={Loggout}>Sair</ButtonStyled>
        </ContainerStyled>
    )
}
const InpurtStyled = styled.form`
    padding: 10px;
    background-color: #fff;
    width: 70%;
    margin-top: 10px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    button {
        background-color: #000;
        color: #fff;
        margin-left: 20px;
        padding: 5px;
        border-radius: 10px;
    }
    p {
        padding: 0;
        margin-left: 10px;
    }
    
`
const PStyled = styled.p`
    color: #fff;
`