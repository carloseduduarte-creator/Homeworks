
import { useState } from 'react';
import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where
} from 'firebase/firestore';

import { db } from '../firebase/config.js';

export function useCollection(collectionName) {
    const [documents, setDocuments] = useState([]);

    const getAll = async (userId) => {
        const collectionRef = collection(db, collectionName);
        const q = query(
            collectionRef,
            where('userId', '==', userId)
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((document) => ({
            id: document.id,
            ...document.data()
        }));

        setDocuments(data);

        return data;
    };

    const add = async (data) => {
        const documentRef = await addDoc(
            collection(db, collectionName),
            data
        );

        return documentRef;
    };

    const update = async (id, data) => {
        const documentRef = doc(db, collectionName, id);

        await updateDoc(documentRef, data);
    };

    const remove = async (id) => {
        const documentRef = doc(db, collectionName, id);

        await deleteDoc(documentRef);
    };

    return {
        documents,
        getAll,
        add,
        update,
        remove
    };
}
