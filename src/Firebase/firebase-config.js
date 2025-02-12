import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAUvLbaHdcUpt6m7DgeYm9sz_Z3k1Rrm3g",
    authDomain: "netflix--clone-e6f85.firebaseapp.com",
    projectId: "netflix--clone-e6f85",
    storageBucket: "netflix--clone-e6f85.firebasestorage.app",
    messagingSenderId: "673977005118",
    appId: "1:673977005118:web:3a1f3767194badc9918d6f",
    measurementId: "G-J8VY0S4FCM"
};

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore()
const auth = getAuth()

export { firebaseApp, db, auth }