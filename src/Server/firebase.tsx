// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { initializeApp, getApps, getApp } from 'firebase/app';
import { setPersistence,onAuthStateChanged, getAuth ,browserLocalPersistence} from 'firebase/auth';
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

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    // console.log("Persistência definida com sucesso.");
  })
  .catch((error) => {
    console.error("Erro ao definir persistência: ", error);
  });
  
const db = getFirestore(app);

const authCheckPromise: Promise<void> = new Promise((resolve) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // console.log("Firebase inicializado e usuário autenticado.");
    } else {
      // console.log("Firebase inicializado, mas nenhum usuário autenticado.");
    }
    resolve();
  });
});


const authIsReady = () => authCheckPromise;

export { db, auth, authIsReady };

