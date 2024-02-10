// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxtcDIRRPY_Kb0M5dfC6Goog2vfGfV_ks",
  authDomain: "mapproject-b6266.firebaseapp.com",
  projectId: "mapproject-b6266",
  storageBucket: "mapproject-b6266.appspot.com",
  messagingSenderId: "818812664899",
  appId: "1:818812664899:web:0a6f27c17ff020788de8f6",
  measurementId: "G-H4F7W2XHTE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore con la instancia de la app Firebase
const db = getFirestore(app);

// Exporta la configuración para usarla en otras partes de tu aplicación
export { db };