// src/firebase.js
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; // Para Firestore
import { getAuth, GoogleAuthProvider } from 'firebase/auth'; // ¡Importa GoogleAuthProvider también!
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqpuxqrLyuD5KXuwBAdKSVyDkX0DghH6w",
  authDomain: "psicologa-app-2025.firebaseapp.com",
  projectId: "psicologa-app-2025",
  storageBucket: "psicologa-app-2025.firebasestorage.app",
  messagingSenderId: "297090336766",
  appId: "1:297090336766:web:cd8a230f7f9726f0e922af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
export const db = getFirestore(app); // Exporta db directamente

// Inicializa Auth
export const auth = getAuth(app); // ¡Esta línea faltaba! Exporta auth directamente
export const googleProvider = new GoogleAuthProvider(); // ¡Esta línea también faltaba!