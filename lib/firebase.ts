import { firebaseConfig } from "@/firebase_config";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);