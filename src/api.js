import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
} from "firebase/firestore/lite";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: "vanlife-19185.firebaseapp.com",
    projectId: "vanlife-19185",
    storageBucket: "vanlife-19185.firebasestorage.app",
    messagingSenderId: "1041687835487",
    appId: "1:1041687835487:web:cbdb0fa97060a3253dfcea",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const vansCollectionRef = collection(db, "vans");

export async function getVans() {
    const querySnapshot = await getDocs(vansCollectionRef);
    const dataArr = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
    }));
    return dataArr;
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id);
    const vanSnapshot = await getDoc(docRef);
    return {
        ...vanSnapshot.data(),
        id: vanSnapshot.id,
    };
}

export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", "123"));
    const querySnapshot = await getDocs(q);
    const dataArr = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
    }));
    return dataArr;
}

export async function loginUser(credentials) {
    const res = await fetch("/api/login", {
        method: "post",
        body: JSON.stringify(credentials),
    });
    const data = await res.json();

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status,
        };
    }

    return data;
}
