import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyClYq-CVmGKLR-4CN2X94edavVJf-M_mpA",
    authDomain: "aerospace-testing-dashboard.firebaseapp.com",
    projectId: "aerospace-testing-dashboard",
    storageBucket: "aerospace-testing-dashboard.firebasestorage.app",
    messagingSenderId: "826473673661",
    appId: "1:826473673661:web:90751bc53de737e6a4d8d4",
    measurementId: "G-J2RYMPC659"
};


const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);