
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDTWG-MLjhmr7YKpeiAOBSVxeXlBT9h6s0",
  authDomain: "chat-groisa.firebaseapp.com",
  projectId: "chat-groisa",
  storageBucket: "chat-groisa.appspot.com",
  messagingSenderId: "1012331563027",
  appId: "1:1012331563027:web:aae55574018c5c0c63d7e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();
export const storege = getStorage(app)