import { collection, onSnapshot } from "firebase/firestore";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { chatMensagem, photoMensagem } from "../Services/chatMensagem";
import { db } from "../Services/firebase";
import { singOut } from "../Services/singOut";
import { ButtonStyled, ChatData, ChatInput, ChatView, ContainerStyled, InputStyled, StyledMensagem } from "../styled";
export function Homeview() {
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
            // await photoMensagem()
        }
    })
    useEffect(() => {
        const colectionMensagem = collection(db, 'mensagem')
        onSnapshot(colectionMensagem, (snapshot) => {
            const data = snapshot.docs.map(mensagem => mensagem.data())
            setDataMensagens(data.sort((a, b) => {
                const dateA = new Date(
                    a.dateCreate.seconds * 1000 + a.nanoseconds / 1000000,
                );
                const dateB = new Date(
                    b.dateCreate.seconds * 1000 + a.nanoseconds / 1000000,
                );
                return dateB - dateA
            }))
        })
    }, [])
    return (
        <ContainerStyled>
            <ChatView>
                <ChatData>
                    {dataMenagens.map(mensagem =>
                        <StyledMensagem key={mensagem.id}>
                            <p>{mensagem.mensagem}</p>
                        </StyledMensagem>
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
            <ButtonStyled onClick={Loggout}>Sair</ButtonStyled>
        </ContainerStyled>
    )
}
