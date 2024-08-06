// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxlk12n9fIbpmvZaAyxNFn0RAET0lkUoQ",
  authDomain: "pantrify-fe436.firebaseapp.com",
  projectId: "pantrify-fe436",
  storageBucket: "pantrify-fe436.appspot.com",
  messagingSenderId: "759225160372",
  appId: "1:759225160372:web:1cb4eff78c6b84395e3de1",
  measurementId: "G-NXL7LRZF6S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };
