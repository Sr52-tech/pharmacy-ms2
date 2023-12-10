import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAhXVKjukHtl4Ka9_Rq0gSMVudSjHP97hg",
  authDomain: "se-project-7a91d.firebaseapp.com",
  projectId: "se-project-7a91d",
  storageBucket: "se-project-7a91d.appspot.com",
  messagingSenderId: "728019917866",
  appId: "1:728019917866:web:3d6545356a77d95cce7753",
  measurementId: "G-P68T601E2L"
};


export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage();
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();