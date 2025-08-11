// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZI-WHdhe3WJwzP1TYlW6UVbDQdliX7Fs",
  authDomain: "paintikaa-2.firebaseapp.com",
  projectId: "paintikaa-2",
  storageBucket: "paintikaa-2.firebasestorage.app",
  messagingSenderId: "983042027142",
  appId: "1:983042027142:web:864f70d49b8d55f967eb07",
  measurementId: "G-S2H41SSE5D"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);

export default app;