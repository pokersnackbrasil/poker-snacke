import { RoutesApp } from './Routes';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import { auth, db } from "./Server/firebase";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, query, where, getDocs, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { setUserData, setLevelAccess, clearUserData } from './slices';
import { loginStart, loginSuccess, loginFail } from './slices/authSlice';
import { Loading } from './componentes/Load';
import { ParseUserData } from './utils/ParseUserData';
import { saveUserSession } from './utils/saveUser';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useAppDispatch();
  const [internalLoading, setInternalLoading] = useState(true);
  const { authChecked } = useAppSelector(state => state.auth);

  useEffect(() => {
    let unsubscribeSnapshot: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      setInternalLoading(true);

      if (user) {
        dispatch(loginStart());

        try {
          const userDocRef = doc(db, 'usuario', user.uid);
          const userSnapshot = await getDoc(userDocRef);
          const accessQuery = query(collection(db, 'acesso'), where('id', '==', user.uid));
          const accessSnapshot = await getDocs(accessQuery);

          if (!userSnapshot.exists() || accessSnapshot.empty) {
            toast.error("Usuário ou acesso não encontrado.");
            await signOutUser();
            return;
          }

          const userData = userSnapshot.data();
          const accessData = accessSnapshot.docs[0].data();
          const parsedUser = ParseUserData(userData);

          if (auth.currentUser?.uid !== userData.id) {
            toast.error("Acesso negado.");
            await signOutUser();
            return;
          }

          dispatch(setUserData(parsedUser));
          dispatch(setLevelAccess([accessData.nivel.toString()]));
          dispatch(loginSuccess(parsedUser));
          await saveUserSession(parsedUser, accessData.nivel.toString(), true);

          // unsubscribeSnapshot = onSnapshot(userDocRef, (snapshot) => {
          //   const data = snapshot.data();
          //   if (!data || data.currentSession !== parsedUser.currentSession) {
          //     toast.warn("Sessão encerrada por login em outro dispositivo.");
          //     signOutUser();
          //   }
          // });

        } catch (error) {
          console.error("Erro no login automático:", error);
          await signOutUser();
        }
      } else {
        await signOutUser();
      }

      setInternalLoading(false);
    });

    const signOutUser = async () => {
      try {
        await signOut(auth);
      } catch (error) {
        console.warn("Erro no signOut:", error);
      }
      localStorage.clear();
      sessionStorage.clear();
      dispatch(clearUserData());
      dispatch(loginFail("Usuário não autenticado."));
    };

    return () => {
      unsubscribeAuth();
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    };
  }, [dispatch]);

  if (internalLoading || !authChecked) {
    return <Loading />;
  }

  return (
    <>
      <RoutesApp />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
}

export default App;

// import { RoutesApp } from './Routes';
// import { useEffect, useState } from 'react';
// import { useAppDispatch, useAppSelector } from './hooks';
// import { auth, db } from "./Server/firebase";
// import { onAuthStateChanged, signOut } from 'firebase/auth';
// import { collection, query, where, getDocs, doc, getDoc} from 'firebase/firestore';
// import { setUserData, setLevelAccess, clearUserData } from './slices';
// import { loginStart, loginSuccess, loginFail } from './slices/authSlice';
// import { Loading } from './componentes/Load';
// import { ParseUserData } from './utils/ParseUserData';
// import { saveUserSession } from './utils/saveUser';
// import { toast } from 'react-toastify';

// function App() {
//   const dispatch = useAppDispatch();
//   const [internalLoading, setInternalLoading] = useState(true);
//   const { loading: authLoading, authChecked } = useAppSelector(state => state.auth);

//   useEffect(() => {
//     console.log("App carregado. Estado inicial:", authLoading);
//   }, []);

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       if (authLoading) {
//         console.warn("Login automático travado por mais de 10 segundos.");
//       }
//     }, 10000);
//     return () => clearTimeout(timeout);
//   }, [authLoading]);

//   useEffect(() => {

//     const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
//       setInternalLoading(true);

//       if (user) {
//         console.log("[AuthStateChanged] Usuário autenticado:", user.email);
//         dispatch(loginStart());

//         try {
//           console.log("user",user)
//           console.log("user.uid",user.uid)
//           const userDocRef = doc(db, 'usuario', user.uid);
//           const userSnapshot = await getDoc(userDocRef);

//           const accessQuery = query(collection(db, 'acesso'), where('id', '==', user.uid));
//           const accessSnapshot = await getDocs(accessQuery);

//           if (userSnapshot.exists() && !accessSnapshot.empty) {
//             const userData = userSnapshot.data();
//             const accessData = accessSnapshot.docs[0].data();
//             const parsedUser = ParseUserData(userData);

//             console.log("[Login] Parsed User:", parsedUser);
//             console.log("[Login] Access Level:", accessData.nivel);

//             dispatch(setUserData(parsedUser));
//             dispatch(setLevelAccess([accessData.nivel.toString()]));
//             dispatch(loginSuccess(parsedUser));

//             await saveUserSession(parsedUser, accessData.nivel.toString(), true);

//             if (auth.currentUser?.uid === userData.id) {
//               console.log("ok")                           
//             } else {
//               console.error("Tentativa de acesso ao documento não autorizada.");
//               toast.error("Acesso negado.");
//               await signOutUser();
//             }
//           } else {
//             console.error("Usuário ou acesso não encontrados.");
//             await signOutUser();
//           }
//         } catch (error) {
//           console.error("Erro ao consultar dados do Firestore:", error);
//           await signOutUser();
//         }
//       } else {
//         await signOutUser();
//       }

//       setInternalLoading(false);
//     });

//     const signOutUser = async () => {
//       try {
//         await signOut(auth);
//       } catch (error) {
//         console.warn("Erro ao tentar fazer signOut:", error);
//       }
//       localStorage.clear();
//       sessionStorage.clear();
//       dispatch(clearUserData());
//       dispatch(loginFail("Usuário não autenticado."));
//     };

//     return () => {
//       unsubscribeAuth();
//     };
//   }, [dispatch]);

//   if (!authChecked || internalLoading) {
//     return <Loading />;
//   }

//   return <RoutesApp />;
// }

// export default App;


// import { RoutesApp } from './Routes';
// import { useEffect, useState} from 'react';
// import { useAppDispatch } from './hooks';
// import { setUserData, setLevelAccess, clearUserData } from './slices';
// import { auth, db } from "./Server/firebase";
// import { onAuthStateChanged, signOut } from 'firebase/auth';
// import { Loading } from './componentes/Load';
// import { collection, query, where, getDocs, onSnapshot, doc, getDoc } from 'firebase/firestore';
// import { toast } from 'react-toastify';
// import {  useAppSelector } from './hooks';
// import { loginStart, loginSuccess, loginFail } from './slices/authSlice';
// import { ParseUserData } from './utils/ParseUserData';
// import { saveUserSession } from './utils/saveUser';

// function App() {
//   const dispatch = useAppDispatch();
//   const [internalLoading, setInternalLoading] = useState(true);
//   const { loading: authLoading, authChecked } = useAppSelector(state => state.auth);


//   useEffect(() => {
//     console.log("App carregado. Estado inicial:", authLoading);
//   }, []);
//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       if (authLoading) {
//         console.warn("Login automático travado por mais de 10 segundos.");
//       }
//     }, 10000);

//     return () => clearTimeout(timeout);
//   }, [authLoading]);


//   // useEffect(() => {
    
//   //   let unsubscribeSnapshot: (() => void) | null = null;

//   //   const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
//   //     setInternalLoading(true);
      
//   //     if (user) {
//   //       dispatch(loginStart());
//   //       // const userDataStored = localStorage.getItem('userData') || sessionStorage.getItem('userData');
//   //       let userDataStored = null;
//   //       try {
//   //         userDataStored = localStorage.getItem('userData') || sessionStorage.getItem('userData');
//   //       } catch (e) {
//   //         console.error("Erro ao acessar localStorage/sessionStorage", e);
//   //       }
//   //       const levelAccessStored = localStorage.getItem('levelAccess') || sessionStorage.getItem('levelAccess');

//   //       if (userDataStored && levelAccessStored) {
//   //         try {
//   //           const parsedUser = JSON.parse(userDataStored);

//   //           if (parsedUser?.email && parsedUser?.id && parsedUser?.nome && parsedUser?.currentSession) {
//   //             const userQuery = query(collection(db, 'usuario'), where('email', '==', parsedUser.email));
//   //             const userSnapshot = await getDocs(userQuery);

//   //             if (!userSnapshot.empty) {
//   //               const docRef = userSnapshot.docs[0].ref;
//   //               const firestoreSession = userSnapshot.docs[0].data().currentSession;

//   //               if (!firestoreSession || firestoreSession !== parsedUser.currentSession) {
//   //                 if (document.visibilityState === 'visible') {
//   //                   toast.warn("Sua conta foi acessada em outro dispositivo.");
//   //                 }
//   //                 // await signOut(auth);
//   //                 try {
//   //                   await signOut(auth);
//   //                 } catch (error) {
//   //                   console.warn("Tentativa de signOut falhou:", error);
//   //                 }
//   //                 localStorage.clear();
//   //                 sessionStorage.clear();
//   //                 dispatch(clearUserData());
//   //                 dispatch(loginFail("Sessão expirada."));
//   //                 setInternalLoading(false);

//   //               } else {
//   //                 dispatch(setUserData(parsedUser));
//   //                 dispatch(setLevelAccess(levelAccessStored));
//   //                 dispatch(loginSuccess(parsedUser));
//   //                 setInternalLoading(false);


//   //                 // Ouvir em tempo real o documento do usuário
//   //                 unsubscribeSnapshot = onSnapshot(docRef, async (snapshot) => {
//   //                   const data = snapshot.data();
//   //                   if (!data || data.currentSession !== parsedUser.currentSession) {
//   //                     if (document.visibilityState === 'visible') {
//   //                       toast.warn("Sua sessão foi encerrada por login em outro dispositivo.");
//   //                     }
//   //                     // await signOut(auth);
//   //                     try {
//   //                       await signOut(auth);
//   //                     } catch (error) {
//   //                       console.warn("Tentativa de signOut falhou:", error);
//   //                     }
//   //                     localStorage.clear();
//   //                     sessionStorage.clear();
//   //                     dispatch(clearUserData());
//   //                     dispatch(loginFail("Sessão interrompida."));
//   //                     setInternalLoading(false);
//   //                   }
//   //                 });
//   //               }
//   //             } else {
//   //               dispatch(clearUserData());
//   //               dispatch(loginFail("Usuário não encontrado."));
//   //               setInternalLoading(false);
//   //             }
//   //           }
//   //         } catch (err) {
//   //           console.error("Erro ao parsear dados da sessão:", err);
//   //           dispatch(clearUserData());
//   //           dispatch(loginFail("Erro na leitura da sessão."));
//   //           setInternalLoading(false);
//   //         }
//   //       }
        
//   //       if (!userDataStored || !levelAccessStored) {
//   //         console.warn("Dados da sessão ausentes. Logout forçado.");
//   //         // await signOut(auth);
//   //         try {
//   //           await signOut(auth);
//   //         } catch (error) {
//   //           console.warn("Tentativa de signOut falhou:", error);
//   //         }
//   //         localStorage.clear();
//   //         sessionStorage.clear();
//   //         dispatch(clearUserData());
//   //         dispatch(loginFail("Sessão local não encontrada."));
//   //         setInternalLoading(false);
//   //         return;
//   //       }
//   //     } else {
//   //       dispatch(clearUserData());
//   //       dispatch(loginFail("Usuário não encontrado."));
//   //       setInternalLoading(false);
//   //     }
//   //   });

//   //   return () => {
//   //     unsubscribeAuth();
//   //     if (unsubscribeSnapshot) unsubscribeSnapshot();
//   //   };
//   // }, [dispatch]);

//   useEffect(() => {
//     let unsubscribeSnapshot: (() => void) | null = null;
  
//     const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      
//       setInternalLoading(true);
  
//       if (user) {
//         console.log("[AuthStateChanged] Usuário autenticado:", user ? user.email : "Nenhum");

//         dispatch(loginStart());
  
//         try {
          
//           // const userQuery = query(collection(db, 'usuario'), where('email', '==', user.email));
//           const userDocRef = doc(db, 'usuario', user.uid);
//           const acesseQuery = query(collection(db, 'acesso'), where('id', '==', user.uid));
//           // const userSnapshot = await getDocs(userDocRef);
//           const userSnapshot = await getDoc(userDocRef);
//           const acessSnapshot = await getDocs(acesseQuery);

//           // console.log("[Firestore] userSnapshot.empty:", userSnapshot.empty);
//           // console.log("[Firestore] acessSnapshot.empty:", acessSnapshot.empty);
//           // console.log("[Firestore] userSnapshot data:", userSnapshot.docs[0]?.data());
//           // console.log("[Firestore] acessSnapshot data:", acessSnapshot.docs[0]?.data());
  
//           if (!userSnapshot.exists() && !acessSnapshot.empty) {
//             const userData = userSnapshot.data();
//             const acessData = acessSnapshot.docs[0].data();
//             const parsedUser = ParseUserData(userData);

//             console.log("[Login] Parsed User:", parsedUser);
//             console.log("[Login] Access Level:", acessData.nivel);
            
//             dispatch(setUserData(parsedUser));
//             // if (acessData.nivel) {
//             //   dispatch(setLevelAccess(acessData.nivel));
//             //   saveUserSession(parsedUser, [String(acessData.nivel)], true);
//             // } else {
//             //   toast.error("Usuário sem nível de acesso definido.");
//             //   await signOut(auth);
//             //   dispatch(loginFail("Acesso não atribuído."));
//             //   return;
//             // }
            
//             dispatch(setLevelAccess([acessData.nivel.toString()])); 
//             dispatch(loginSuccess(parsedUser));
  
//             // Se quiser salvar localmente:
//             // saveUserSession(parsedUser, [acessData.nivel.toString()], true); 
//             saveUserSession(parsedUser, acessData.nivel.toString(), true);

  
//             // Ouvir em tempo real mudanças na sessão
//             // unsubscribeSnapshot = onSnapshot(userSnapshot.docs[0].ref, (snapshot) => {
//             //   const data = snapshot.data();
//             //   if (!data || data.currentSession !== parsedUser.currentSession) {
//             //     if (document.visibilityState === 'visible') {
//             //       toast.warn("Sua sessão foi encerrada por login em outro dispositivo.");
//             //     }
//             //     signOutUser();
//             //   }
//             // });

//             if (!userSnapshot.exists()) {
//               const userDoc = userSnapshot.docs[0];
//               const userDocRef = userDoc.ref;
//               const userData = userDoc.data();
            
//               // Verifique se o usuário tem permissão
//               if (auth.currentUser?.uid === userData.id) {
//                 // Escute o snapshot só se autorizado
//                 unsubscribeSnapshot = onSnapshot(userDocRef, (snapshot) => {
//                   const data = snapshot.data();
//                   if (!data || data.currentSession !== parsedUser.currentSession) {
//                     toast.warn("Sessão finalizada.");
//                     signOutUser();
//                   }
//                 });
//               } else {
//                 toast.error("Acesso negado.");
//                 signOutUser();
//               }
//             }
//           } else {
//             signOutUser();
//           }
//         } catch (err) {
//           console.error("Erro ao consultar dados do Firestore:", err);
//           console.error("[Login Catch] Erro detalhado:", err);
//           signOutUser();
//         }
//       } else {
//         signOutUser();
//       }
  
//       setInternalLoading(false);
//     });
  
//     const signOutUser = async () => {
//       try {
//         await signOut(auth);
//       } catch (error) {
//         console.warn("Tentativa de signOut falhou:", error);
//       }
//       localStorage.clear();
//       sessionStorage.clear();
//       dispatch(clearUserData());
//       dispatch(loginFail("Usuário não autenticado."));
//     };
  
//     return () => {
//       unsubscribeAuth();
//       if (unsubscribeSnapshot) unsubscribeSnapshot();
//     };
//   }, [dispatch]);

//   if (!authChecked || internalLoading) return <Loading />;

//   return <RoutesApp />;
// }

// export default App;



// // import { RoutesApp } from './Routes';
// // import { useEffect, useState } from 'react';
// // import { useAppDispatch } from './hooks';
// // import { setUserData, setLevelAccess, setLoading, clearUserData } from './slices';
// // import { auth, db } from "./Server/firebase";
// // import { onAuthStateChanged, signOut } from 'firebase/auth';
// // import { Loading } from './componentes/Load';
// // import { collection, query, where, getDocs } from 'firebase/firestore';
// // import { toast } from 'react-toastify';
// // import { doc, onSnapshot } from "firebase/firestore";

// // function App() {
// //   const dispatch = useAppDispatch();
// //   const [authLoading, setAuthLoading] = useState(true);

// //   useEffect(() => {
// //     dispatch(setLoading(true));

// //     const unsubscribe = onAuthStateChanged(auth, async (user) => {
// //       if (user) {
// //         const userDataStored = localStorage.getItem('userData') || sessionStorage.getItem('userData');
// //         const levelAccessStored = localStorage.getItem('levelAccess') || sessionStorage.getItem('levelAccess');

// //         if (userDataStored && levelAccessStored) {
// //           try {
// //             const parsedUser = JSON.parse(userDataStored);

// //             if (parsedUser?.email && parsedUser?.id && parsedUser?.nome && parsedUser?.currentSession) {
// //               const userQuery = query(collection(db, 'usuario'), where('email', '==', parsedUser.email));
// //               const userSnapshot = await getDocs(userQuery);

// //               if (!userSnapshot.empty) {
// //                 const firestoreSession = userSnapshot.docs[0].data().currentSession;

// //                 if (firestoreSession !== parsedUser.currentSession) {
// //                   toast.warn("Sua conta foi acessada em outro dispositivo.");
// //                   await signOut(auth);
// //                   localStorage.clear();
// //                   sessionStorage.clear();
// //                   dispatch(clearUserData());
// //                 } else {
// //                   dispatch(setUserData(parsedUser));
// //                   dispatch(setLevelAccess(levelAccessStored));
// //                 }
// //               } else {
// //                 dispatch(clearUserData());
// //               }
// //             }
// //           } catch (err) {
// //             console.error("Erro ao parsear dados da sessão:", err);
// //             dispatch(clearUserData());
// //           }
// //         }
// //       } else {
// //         dispatch(clearUserData());
// //       }

// //       dispatch(setLoading(false));
// //       setAuthLoading(false);
// //     });

// //     return () => unsubscribe();
// //   }, [dispatch]);

// //   if (authLoading) {
// //     return <Loading />;
// //   }

// //   return <RoutesApp />;
// // }

// // export default App;