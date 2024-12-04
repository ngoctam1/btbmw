import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBlLAfzcPseCnS1V23OcxqP8jhvvrsYuiI",
  authDomain: "bmw-store-4dc29.firebaseapp.com",
  projectId: "bmw-store-4dc29", // This is required for Firestore
  storageBucket: "bmw-store-4dc29.firebasestorage.app",
  messagingSenderId: "317358180359",
  appId: "1:317358180359:web:e591bab3362626d67942a2",
  measurementId: "G-XQC014G2F0"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
