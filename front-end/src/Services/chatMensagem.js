
import { onAuthStateChanged } from "firebase/auth";
import { addDoc, doc, collection, setDoc, getDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "./firebase"


export const chatMensagem = async (mensagem) => {
    onAuthStateChanged(auth, async (user) => {
        const docRef = doc(db, 'authCurrente', user.uid)
        const docSnap = await getDoc(docRef)
        const docSnapUrl = docSnap.data().url
        const uidUserSend = auth.currentUser.uid
        const userName = auth.currentUser.displayName
        const userEmailSend = auth.currentUser.email
        const mensagemRef = collection(db, 'mensagem');
        await addDoc(mensagemRef, {
            mensagem,
            uidUserSend,
            dateCreate: new Date().toISOString(),
            userEmailSend,
            docSnapUrl,
            userName
        })
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
        document.location.reload()
    })
}