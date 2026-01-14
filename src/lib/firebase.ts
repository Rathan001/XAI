import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA8HhA9iSGMFiuIs7oJde4RkZKnYXb5oQA",
  authDomain: "sathi-ai-main.firebaseapp.com",
  projectId: "sathi-ai-main",
  storageBucket: "sathi-ai-main.firebasestorage.app",
  messagingSenderId: "819962562896",
  appId: "1:819962562896:web:a1655c096fd4bd89ccc455",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
