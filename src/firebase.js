// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCX3gBQaT-a8y1Ma-bG6Q_vPVYpc3zxfSY",
  authDomain: "paintikaa-1.firebaseapp.com",
  projectId: "paintikaa-1",
  storageBucket: "paintikaa-1.firebasestorage.app",
  messagingSenderId: "223056785201",
  appId: "1:223056785201:web:ae6393084137963ebc0a10",
  measurementId: "G-E71PED5TGX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);