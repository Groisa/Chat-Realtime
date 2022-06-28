
import { addDoc, doc, collection} from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storege } from "./firebase"

export const chatMensagem = async (mensagem) => {
    const uidUserSend = auth.currentUser.uid
    const mensagemRef = collection(db, 'mensagem');
    await addDoc(mensagemRef,{
       mensagem,
       uidUserSend,
       dateCreate: new Date()
    })
}

// export const photoMensagem = async () => {
//     const photUidSend = auth.currentUser
//     const uploadef = ref(storege, `image/${photUidSend.photoURL}` )
//     let upload =await uploadBytes(uploadef, photUidSend)
//     let photoUrl = await getDownloadURL(upload.ref)
//     return {
//         url: photoUrl
//     }
// }