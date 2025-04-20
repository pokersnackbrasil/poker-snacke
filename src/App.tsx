import { RoutesApp } from './Routes';
import { useEffect} from 'react';
import { useAppDispatch } from './hooks';
import { setUserData, setLevelAccess, clearUserData } from './slices';
import { auth, db } from "./Server/firebase";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { Loading } from './componentes/Load';
import { collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import { toast } from 'react-toastify';
import {  useAppSelector } from './hooks';
import { loginStart, loginSuccess, loginFail } from './slices/authSlice';

function App() {
  const dispatch = useAppDispatch();

  const authLoading = useAppSelector(state => state.auth.loading);


  useEffect(() => {
    
    let unsubscribeSnapshot: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      dispatch(loginStart());
      if (user) {
        const userDataStored = localStorage.getItem('userData') || sessionStorage.getItem('userData');
        const levelAccessStored = localStorage.getItem('levelAccess') || sessionStorage.getItem('levelAccess');

        if (userDataStored && levelAccessStored) {
          try {
            const parsedUser = JSON.parse(userDataStored);

            if (parsedUser?.email && parsedUser?.id && parsedUser?.nome && parsedUser?.currentSession) {
              const userQuery = query(collection(db, 'usuario'), where('email', '==', parsedUser.email));
              const userSnapshot = await getDocs(userQuery);

              if (!userSnapshot.empty) {
                const docRef = userSnapshot.docs[0].ref;
                const firestoreSession = userSnapshot.docs[0].data().currentSession;

                if (firestoreSession !== parsedUser.currentSession) {
                  toast.warn("Sua conta foi acessada em outro dispositivo.");
                  await signOut(auth);
                  localStorage.clear();
                  sessionStorage.clear();
                  dispatch(clearUserData());
                  dispatch(loginFail("Sessão expirada."));

                } else {
                  dispatch(setUserData(parsedUser));
                  dispatch(setLevelAccess(levelAccessStored));
                  dispatch(loginSuccess(parsedUser));


                  // Ouvir em tempo real o documento do usuário
                  unsubscribeSnapshot = onSnapshot(docRef, (snapshot) => {
                    const data = snapshot.data();
                    if (!data || data.currentSession !== parsedUser.currentSession) {
                      toast.warn("Sua sessão foi encerrada por login em outro dispositivo.");
                      signOut(auth).then(() => {
                        localStorage.clear();
                        sessionStorage.clear();
                        dispatch(clearUserData());
                        dispatch(loginFail("Sessão interrompida."));
                      });
                    }
                  });
                }
              } else {
                dispatch(clearUserData());
                dispatch(loginFail("Usuário não encontrado."));
              }
            }
          } catch (err) {
            console.error("Erro ao parsear dados da sessão:", err);
            dispatch(clearUserData());
            dispatch(loginFail("Erro na leitura da sessão."));
          }
        }
      } else {
        dispatch(clearUserData());
        dispatch(loginFail("Usuário não encontrado."));
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    };
  }, [dispatch]);

  if (authLoading) {
    return <Loading />;
  }

  return <RoutesApp />;
}

export default App;



// import { RoutesApp } from './Routes';
// import { useEffect, useState } from 'react';
// import { useAppDispatch } from './hooks';
// import { setUserData, setLevelAccess, setLoading, clearUserData } from './slices';
// import { auth, db } from "./Server/firebase";
// import { onAuthStateChanged, signOut } from 'firebase/auth';
// import { Loading } from './componentes/Load';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import { toast } from 'react-toastify';
// import { doc, onSnapshot } from "firebase/firestore";

// function App() {
//   const dispatch = useAppDispatch();
//   const [authLoading, setAuthLoading] = useState(true);

//   useEffect(() => {
//     dispatch(setLoading(true));

//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         const userDataStored = localStorage.getItem('userData') || sessionStorage.getItem('userData');
//         const levelAccessStored = localStorage.getItem('levelAccess') || sessionStorage.getItem('levelAccess');

//         if (userDataStored && levelAccessStored) {
//           try {
//             const parsedUser = JSON.parse(userDataStored);

//             if (parsedUser?.email && parsedUser?.id && parsedUser?.nome && parsedUser?.currentSession) {
//               const userQuery = query(collection(db, 'usuario'), where('email', '==', parsedUser.email));
//               const userSnapshot = await getDocs(userQuery);

//               if (!userSnapshot.empty) {
//                 const firestoreSession = userSnapshot.docs[0].data().currentSession;

//                 if (firestoreSession !== parsedUser.currentSession) {
//                   toast.warn("Sua conta foi acessada em outro dispositivo.");
//                   await signOut(auth);
//                   localStorage.clear();
//                   sessionStorage.clear();
//                   dispatch(clearUserData());
//                 } else {
//                   dispatch(setUserData(parsedUser));
//                   dispatch(setLevelAccess(levelAccessStored));
//                 }
//               } else {
//                 dispatch(clearUserData());
//               }
//             }
//           } catch (err) {
//             console.error("Erro ao parsear dados da sessão:", err);
//             dispatch(clearUserData());
//           }
//         }
//       } else {
//         dispatch(clearUserData());
//       }

//       dispatch(setLoading(false));
//       setAuthLoading(false);
//     });

//     return () => unsubscribe();
//   }, [dispatch]);

//   if (authLoading) {
//     return <Loading />;
//   }

//   return <RoutesApp />;
// }

// export default App;