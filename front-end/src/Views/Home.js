import { singOut } from "../Services/singOut";
import { ButtonStyled, ChatData, ChatInput, ChatView, ContainerStyled } from "../styled";
export function Homeview () {
    const Loggout = async () => {
        await singOut()
    }
    return (
        <ContainerStyled>
            <ChatView>
                <ChatData>

                </ChatData>
                <ChatInput>

                </ChatInput>
            </ChatView>
            <ButtonStyled onClick={Loggout}>Sair</ButtonStyled>
        </ContainerStyled>
    )
}