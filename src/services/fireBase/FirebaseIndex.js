import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyC-VCRJ6782z4KwURIP6Hsoq2ADBstDJTo",
    authDomain: "poem-site-ab76a.firebaseapp.com",
    projectId: "poem-site-ab76a",
    storageBucket: "poem-site-ab76a.appspot.com",
    messagingSenderId: "750943802800",
    appId: "1:750943802800:web:9b38d2d39dcc422c7a7275",
    measurementId: "G-ENZQ90GM3S"
};

export const app = initializeApp(firebaseConfig);