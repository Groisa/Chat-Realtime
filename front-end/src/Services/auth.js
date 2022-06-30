
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore";
import { auth, db, provider } from "./firebase"
export const AuthGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider)
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
    }
}
export const getAuthPhotoAll = async () => {
    let list = []
      onAuthStateChanged(auth, async (user) => {
        const docRef = doc(db, 'authCurrente', user.uid)
        const docSnap = await getDoc(docRef)
        const docSnapUrl = docSnap.data().url
        list.push({
            url: docSnapUrl
        }
        )
    })
    return list
}