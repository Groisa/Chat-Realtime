import { collection, onSnapshot } from "firebase/firestore";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getAuthPhotoAll } from "../Services/auth";
import { chatMensagem, getPhoto, photoMensagem } from "../Services/chatMensagem";
import {  auth, db } from "../Services/firebase";
import { singOut } from "../Services/singOut";
import { ButtonStyled, ChatData, ChatInput, ChatView, ContainerStyled, CotainerMensagem, InputStyled, StyledMensagem } from "../styled";
export function Homeview() {
    const [loading, setloading] = useState(false)
    const [dataMenagens, setDataMensagens] = useState([])
    const [photoUrl, setPhotoUrl] = useState('')
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
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const formData = new FormData(e.currentTarget)
    //     const file = formData.get('file')
    //     if (file && file.size > 0) {
    //         setloading(true)
    //         await photoMensagem(file)
    //         setloading(false)
    //         alert('Foto cadastra com sucesso')
    //     }
    //     location.reload()
    // }
    useEffect(() => {
        const getMensagem = async () => {
            const colectionMensagem = collection(db, 'mensagem')
            onSnapshot(colectionMensagem, (snapshot) => {
                const data = snapshot.docs.map(mensagem => mensagem.data())
                setDataMensagens(data.sort((a, b) => {
                    return new Date(a.dateCreate) - new Date(b.dateCreate) 
                }))
            })
        }
        getMensagem()
        // const getPhotoUser = async () => {
        //     const getPhoto = await getAuthPhotoAll()
        //     if (!getPhoto) {
        //         alert('Insira sua foto de Perfil')
        //     } else {
        //         setPhotoUrl(getPhoto)
        //     }
        // }
        // getPhotoUser()
    }, [])
    return (
        <ContainerStyled>
            <ChatView>
                <ChatData>
                    {dataMenagens.map(mensagem =>
                        <CotainerMensagem>
                            <StyledMensagem key={mensagem.id}>
                                <p>{mensagem.mensagem}</p>
                                <span>{mensagem.userEmailSend}</span>
                            </StyledMensagem>
                            {/* {photoUrl.length > 0 &&
                                photoUrl.map((photo) =>
                                    <img src={photo.url} />
                                )
                            } */}
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
            {/* <PStyled>Insira sua Foto de perfil</PStyled>
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
            </InpurtStyled> */}
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