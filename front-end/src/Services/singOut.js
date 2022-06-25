import { signOut } from "firebase/auth"
import { auth } from "./firebase"

export const singOut = async () => {
    await signOut(auth)
}