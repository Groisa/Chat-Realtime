
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