// firebase-config.ts
import { initializeApp,getApps,getApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { setPersistence,onAuthStateChanged,
	// getAuth ,
	browserLocalPersistence} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { getAuth } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyBwL3uQ2TkvAJ0mMdCjri713J1zBw7s-Lc",
  authDomain: "poker-snack.firebaseapp.com",
  projectId: "poker-snack",
  storageBucket: "poker-snack.firebasestorage.app",
  messagingSenderId: "936149800627",
  appId: "1:936149800627:web:60cf5a3624c0967faf42c6",
  measurementId: "G-RB7K48CQ29"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);


// const analytics = getAnalytics(app);
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    // console.log("Persistência definida com sucesso.");
  })
  .catch((error) => {
    console.error("Erro ao definir persistência: ", error);
  });
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

export {
	app,
	auth,
	db,
	// analytics,
	authIsReady
};

