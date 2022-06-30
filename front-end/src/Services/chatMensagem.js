
import { onAuthStateChanged } from "firebase/auth";
import { addDoc, doc, collection, setDoc } from "firebase/firestore"
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "./firebase"

export const chatMensagem = async (mensagem) => {
    const uidUserSend = auth.currentUser.uid
    const mensagemRef = collection(db, 'mensagem');
    await addDoc(mensagemRef, {
        mensagem,
        uidUserSend,
        dateCreate: new Date()
    })
}

export const photoMensagem = async (file) => {
    await onAuthStateChanged(auth, async (user) => {
        if (user) {
            const uploadef = ref(storage, `image/${file.name}`)
            let upload = await uploadBytes(uploadef, file)
            let photoUrl = await getDownloadURL(upload.ref)
            const uidUserSend = auth.currentUser
            const mensagemRef = doc(db, 'authCurrente', uidUserSend.uid);
            await setDoc(mensagemRef, {
                uid: uidUserSend.uid,
                url: photoUrl,
                email: uidUserSend.email
            })
        }
    })

}