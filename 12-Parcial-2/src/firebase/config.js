
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBxtt8UMqf8PXQyu7ugOBSxVcRGOMeh97o",
  authDomain: "parcial-2-5e46d.firebaseapp.com",
  projectId: "parcial-2-5e46d",
  storageBucket: "parcial-2-5e46d.firebasestorage.app",
  messagingSenderId: "353764647199",
  appId: "1:353764647199:web:c7745898d86cc3e5d2102a",
  measurementId: "G-7VQPW6GQ05"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
