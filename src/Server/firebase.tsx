// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { initializeApp, getApps } from 'firebase/app';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwL3uQ2TkvAJ0mMdCjri713J1zBw7s-Lc",
  authDomain: "poker-snack.firebaseapp.com",
  projectId: "poker-snack",
  storageBucket: "poker-snack.firebasestorage.app",
  messagingSenderId: "936149800627",
  appId: "1:936149800627:web:60cf5a3624c0967faf42c6",
  measurementId: "G-RB7K48CQ29"
};

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

if (!getApps().length) {
 initializeApp(firebaseConfig);
}

const auth = getAuth();
const db = getFirestore();

let authCheckPromise;

const waitForAuthCheck = new Promise((resolve) => {
 onAuthStateChanged(auth, (user) => {
   if (user) {
     console.log("Firebase inicializado e usuário autenticado.");
   } else {
     console.log("Firebase inicializado, mas nenhum usuário autenticado.");
   }
   resolve();
 });
});

const authIsReady = () => authCheckPromise;

authCheckPromise = waitForAuthCheck;

export { db, auth, authIsReady };