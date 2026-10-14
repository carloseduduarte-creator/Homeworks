
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyA3YeJ_FKTaKkvsPwH6GuFekVma0KHg-fE',
    authDomain: 'challenge-07-27043.firebaseapp.com',
    projectId: 'challenge-07-27043',
    storageBucket: 'challenge-07-27043.firebasestorage.app',
    messagingSenderId: '994039250601',
    appId: '1:994039250601:web:d2701aa9821a8004df33b8',
    measurementId: 'G-QHHPD6G3FY'
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
