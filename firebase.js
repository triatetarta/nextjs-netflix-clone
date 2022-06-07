import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBrBBG_g_ne946mQT7_4b8palCKl1Ix-c0",
  authDomain: "nextjs-netflix-f598d.firebaseapp.com",
  projectId: "nextjs-netflix-f598d",
  storageBucket: "nextjs-netflix-f598d.appspot.com",
  messagingSenderId: "5648586670",
  appId: "1:5648586670:web:32ae802006d0f5b207da3f",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
