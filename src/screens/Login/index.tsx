import { useEffect, useState } from "react";
import style from "./style.module.css";
import Fundo from "../../assets/fundo2.jpg";
import PersonIcon from "../../assets/person_24px.png";
import Eye from "../../assets/eye.png";
import Hidden from "../../assets/hidden.png";
import InputText from "../../componentes/IputText";
import { HandleError } from "../../componentes/error/Error";
import { toast } from "react-toastify";
import { db, auth } from "../../Server/firebase";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setUserData, setLevelAccess } from "../../slices";
import { loginStart, loginSuccess, loginFail } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../componentes/Load";
import { sendEmailVerification, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { collection, getDocs, query, where, doc, getDoc, updateDoc } from "firebase/firestore";
import { ParseUserData } from "../../utils/ParseUserData";
import { saveUserSession } from "../../utils/saveUser";
import { v4 as uuidv4 } from 'uuid';

export default function Login() {
  const userData = useAppSelector(state => state.user.userData);
  const loadingLogin = useAppSelector(state => state.auth.loading);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const rememberPassword = true;

  useEffect(() => {
    if (userData && Object.keys(userData).length) {
      navigate("/Home");
    }
  }, [userData, navigate]);

  const verifyEmail = async (user: User) => {
    if (!user.emailVerified) {
      await sendEmailVerification(user);
      toast.error("Por favor, verifique seu e-mail para continuar.");
      throw new Error("E-mail não verificado.");
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      if (!email || !password) {
        toast.warning("Por favor, preencha todos os campos.");
        dispatch(loginFail("Campos vazios."));
        return;
      }

      const { user } = await signInWithEmailAndPassword(auth, email, password);

      await verifyEmail(user);
      console.log("user",user)
      console.log("user.uid",user.uid)
      const userDocRef = doc(db, 'usuario', user.uid);
      const userSnapshot = await getDoc(userDocRef);

      console.log("userSnapshot:",userSnapshot)
      console.log("userSnapshot - data:",userSnapshot.data())

      const accessQuery = query(collection(db, 'acesso'), where('id', '==', user.uid), where('status', '==', true));
      const accessSnapshot = await getDocs(accessQuery);
      console.log("accessSnapshot:",accessSnapshot)
      console.log("accessSnapshot - data:",accessSnapshot.docs[0].data())

      if (!userSnapshot.exists()) {
        toast.error("Usuário não encontrado no banco.");
        await signOut(auth);
        dispatch(loginFail("Usuário não encontrado."));
        return;
      }

      if (accessSnapshot.empty) {
        toast.error("Usuário não possui acesso válido.");
        await signOut(auth);
        dispatch(loginFail("Acesso não atribuído."));
        return;
      }

      const userDataFirestore = ParseUserData(userSnapshot.data());
      const accessData = accessSnapshot.docs[0].data();

      if (!userDataFirestore.status) {
        toast.error("Usuário inativo.");
        await signOut(auth);
        dispatch(loginFail("Usuário inativo."));
        return;
      }

      if (!accessData.status) {
        toast.error("Acesso inativo para o usuário.");
        await signOut(auth);
        dispatch(loginFail("Acesso inativo."));
        return;
      }

      const sessionToken = uuidv4();

      await updateDoc(userDocRef, {
        currentSession: sessionToken
      });

      userDataFirestore.currentSession = sessionToken;

      await saveUserSession(userDataFirestore, accessData.nivel.toString(), rememberPassword);

      dispatch(setUserData(userDataFirestore));
      dispatch(setLevelAccess([accessData.nivel.toString()]));
      dispatch(loginSuccess(userDataFirestore));

      navigate("/home");
      toast.success("Login realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao fazer login:-", error);
      toast.warning("Por favor, preencha todos os campos.");
      HandleError(error);
      dispatch(loginFail("Erro inesperado no login."));
    }
  };

  return (
    <div
      className={style.container}
      style={{
        backgroundImage: `url(${Fundo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <form className={style.formulario} onSubmit={handleLogin}>
        <h2 className={style.title}>Login</h2>

        <div className={style.inputGroup}>
          <InputText type="email" placeholder="E-mail" value={email} setValue={(it: string) => setEmail(it)}>
            <img src={PersonIcon} alt="P" className={style.imagemIconInput} />
          </InputText>
        </div>

        <div className={style.inputGroup}>
          <InputText
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            setValue={(it: string) => setPassword(it)}
          >
            <span onClick={() => setShowPassword(!showPassword)} style={{ cursor: "pointer" }}>
              <img src={showPassword ? Eye : Hidden} alt="P" className={style.imagemIconInput} />
            </span>
          </InputText>
        </div>

        <div className={style.options}>
          {/* <a href="#" className={style.link}>Redefinir senha</a>
          <a href="#" className={style.link}>Fale conosco</a> */}
        </div>

        <button className={style.loginButton} type="submit">SEND</button>
      </form>

      {loadingLogin && (
        <div className={style.baseLoading}>
          <Loading />
        </div>
      )}
    </div>
  );
}



// import { useEffect, useState } from "react";
// import style from "./style.module.css";
// import Fundo from "../../assets/fundo2.jpg"
// import PersonIcon from "../../assets/person_24px.png"
// import Eye from "../../assets/eye.png"
// import Hidden from "../../assets/hidden.png"
// import InputText from "../../componentes/IputText";
// import { HandleError } from "../../componentes/error/Error"
// import { toast } from "react-toastify";
// import { db, auth } from "../../Server/firebase"
// import { useAppDispatch, useAppSelector } from "../../hooks";
// import { setUserData, setLevelAccess } from "../../slices";
// import { loginStart, loginSuccess, loginFail } from "../../slices/authSlice";
// import { useNavigate } from "react-router-dom";
// import { Loading } from "../../componentes/Load";
// import { sendEmailVerification, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
// import { collection, getDocs, query, updateDoc, where } from "firebase/firestore";
// import { ParseUserData } from "../../utils/ParseUserData";
// import { saveUserSession } from "../../utils/saveUser";
// import { v4 as uuidv4 } from 'uuid';

// export default function Login() {
//   const userData = useAppSelector(state => state.user.userData);
//   const loadingLogin = useAppSelector(state => state.auth.loading);

//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();

//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const rememberPassword = true;

//   useEffect(() => {
//     if (userData && Object.keys(userData).length) {
//       navigate("/Home");
//     }
//   }, [userData, navigate]);

//   const verifyEmail = async (user: User) => {
//     if (!user.emailVerified) {
//       await sendEmailVerification(user);
//       toast.error("Por favor, verifique seu e-mail para continuar.");
//       throw new Error("E-mail não verificado.");
//     }
//   };

//   const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     dispatch(loginStart());

//     try {
//       if (!email || !password) {
//         toast.warning("Por favor, preencha todos os campos.");
//         dispatch(loginFail("Campos vazios."));
//         return;
//       }

//       const currentUser = await signInWithEmailAndPassword(auth, email, password);

//       if (!currentUser.user.emailVerified) {
//         await verifyEmail(currentUser.user);
//         toast.error("Verifique sua conta, pelo link enviado por e-mail, e tente novamente!");
//         throw new Error("E-mail não verificado.");
//       }

//       // const userQuery = query(
//       //   collection(db, "usuario"),
//       //   where("email", "==", currentUser.user.email)
//       // );
//       const acessQuery = query(
//         collection(db, "acesso"),
//         where("id", "==", currentUser.user.uid),
//         where("status", "==", true)
//       );

//       const userDocRef = doc(db, 'usuario', currentUser.user.uid);
//       const userSnapshot = await getDoc(userDocRef);

//       const querySnapshot = await getDocs(userQuery);
//       const querySnapshotAcess = await getDocs(acessQuery);

//       const userDocRef = querySnapshot.docs[0].ref;

//       if (querySnapshot.empty) {
//         toast.error("Usuário não encontrado.");
//         await signOut(auth);
//         dispatch(loginFail("Usuário não encontrado."));
//         return;
//       }

//       if (querySnapshotAcess.empty) {
//         toast.error("Usuário não possui acesso atribuído.");
//         await signOut(auth);
//         dispatch(loginFail("Acesso não atribuído."));
//         return;
//       }

//       const userData = ParseUserData(querySnapshot.docs[0].data());
//       const acessData = querySnapshotAcess.docs[0].data();

//       const sessionToken = uuidv4();

//       if (!userData.status) {
//         toast.error("Usuário inativo na plataforma");
//         await signOut(auth);
//         dispatch(loginFail("Usuário inativo."));
//         return;
//       }

//       if (!acessData.status) {
//         toast.error("Usuário sem acesso ativo.");
//         await signOut(auth);
//         dispatch(loginFail("Acesso inativo."));
//         return;
//       }

//       await updateDoc(userDocRef, {
//         currentSession: sessionToken
//       });

//       userData.currentSession = sessionToken;

//       await saveUserSession(userData, acessData.nivel, rememberPassword);

//       dispatch(loginSuccess(userData));
//       dispatch(setUserData(userData));
//       dispatch(setLevelAccess(acessData.nivel));

//       navigate("/home");
//       toast.success("Login realizado com sucesso!");
//     } catch (error) {
//       console.error("Erro ao fazer login:", error);
//       HandleError(error);
//       dispatch(loginFail("Erro inesperado no login."));
//     }
//   };

//   return (
//     <div
//       className={style.container}
//       style={{
//         backgroundImage: `url(${Fundo})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       <form className={style.formulario} onSubmit={handleLogin}>
//         <h2 className={style.title}>Login</h2>

//         <div className={style.inputGroup}>
//           <InputText type="email" placeholder="E-mail" value={email} setValue={(it: string) => setEmail(it)}>
//             <img src={PersonIcon} alt="P" className={style.imagemIconInput} />
//           </InputText>
//         </div>

//         <div className={style.inputGroup}>
//           <InputText
//             type={showPassword ? "text" : "password"}
//             placeholder="Senha"
//             value={password}
//             setValue={(it: string) => setPassword(it)}
//           >
//             <span onClick={() => setShowPassword(!showPassword)} style={{ cursor: "pointer" }}>
//               <img src={showPassword ? Eye : Hidden} alt="P" className={style.imagemIconInput} />
//             </span>
//           </InputText>
//         </div>

//         <div className={style.options}>
//           <a href="#" className={style.link}>Redefinir senha</a>
//           <a href="#" className={style.link}>Fale conosco</a>
//         </div>

//         <button className={style.loginButton} type='submit'>Entrar</button>
//       </form>

//       {loadingLogin && (
//         <div className={style.baseLoading}>
//           <Loading />
//         </div>
//       )}
//     </div>
//   );
// }

// // import { useEffect, useState } from "react";
// // import style from "./style.module.css";
// // import Fundo from "../../assets/fundo2.jpg"
// // import PersonIcon from "../../assets/person_24px.png"
// // import Eye from "../../assets/eye.png"
// // import Hidden from "../../assets/hidden.png"
// // import InputText from "../../componentes/IputText";
// // import {HandleError} from "../../componentes/error/Error"
// // import { toast } from "react-toastify";
// // import { db,auth } from "../../Server/firebase"
// // // import { useDispatch } from "react-redux";
// // import { useAppDispatch } from "../../hooks";
// // import { setUserData, setLevelAccess} from "../../slices";

// // import { useNavigate } from "react-router-dom";
// // import { Loading } from "../../componentes/Load";
// // import { sendEmailVerification, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
// // import { collection, getDocs, query, updateDoc, where } from "firebase/firestore";
// // import { useAppSelector } from "../../hooks";
// // import { ParseUserData } from "../../utils/ParseUserData";
// // import { saveUserSession } from "../../utils/saveUser";
// // import { v4 as uuidv4 } from 'uuid';


// // export default function Login() {
// //   const userData = useAppSelector(state => state.user.userData);

// //   const navigate = useNavigate();
// //   // const dispatch = useDispatch();
// //   const dispatch = useAppDispatch();


// //   const [loadingLogin, setLoadingLogin] = useState(false);

// //   const [showPassword, setShowPassword] = useState(false);

// //   const [email,setEmail]=useState("")
// //   const [password,setPassword]=useState("")


// //   const rememberPassword = true;  

// //   useEffect(() => {
// //     if (userData && Object.keys(userData).length) {
// //       navigate("/Home");
// //     }
// //   }, [userData, navigate]);


// //   const verifyEmail = async (user: User) => {
// //     if (!user.emailVerified) {
// //       await sendEmailVerification(user);
// //       toast.error("Por favor, verifique seu e-mail para continuar.");
// //       throw new Error("E-mail não verificado.");
// //     }
// //   };

  
  

// //   const handleLogin = async (e: React.FormEvent<HTMLFormElement>)=>{
// //     e.preventDefault();
// //     setLoadingLogin(true);
// //     console.log("e-mail",email)
// //     console.log("senha",password)
// //     try{
// //       if (!email || !password) {
// //         setLoadingLogin(false);
// //         toast.success("Por favor, preencha todos os campos.");
// //         return;
// //       }

// //       const currentUser = await signInWithEmailAndPassword(auth, email, password);

// //       if (!currentUser.user.emailVerified) {
// //         await verifyEmail(currentUser.user);
// //         toast.error("Verifique sua conta, pelo link enviado por e-mail, e tente novamente!");
// //         throw new Error("E-mail não verificado.");
// //       }

// //       const userQuery = query(
// //         collection(db, "usuario"),
// //         where("email", "==", currentUser.user.email)
// //       );
// //       const acessQuery = query(
// //         collection(db, "acesso"),
// //         where("id", "==", currentUser.user.uid),
// //         where("status", "==", true)
// //       );

// //       const querySnapshot = await getDocs(userQuery);
// //       const querySnapshotAcess = await getDocs(acessQuery);

// //       const userDocRef = querySnapshot.docs[0].ref;

// //       if (querySnapshot.empty) {
// //         toast.error("Usuário não encontrado.");
// //         await signOut(auth);
// //         setLoadingLogin(false);
// //         return;
// //       }
// //       if (querySnapshotAcess.empty) {
// //         toast.error("Usuário não possui acesso atribuído.");
// //         await signOut(auth);
// //         setLoadingLogin(false);
// //         return;
// //       }

// //       const userData = ParseUserData(querySnapshot.docs[0].data());
// //       const acessData = querySnapshotAcess.docs[0].data();

// //       const sessionToken = uuidv4();

// //       if (!userData.status) {
// //         toast.error("Usuário inativo na plataforma");
// //         await signOut(auth);
// //         setLoadingLogin(false);
// //         return;
// //       }
// //       if(!acessData.status) {
// //         toast.error("Usuário sem acesso ativo.");
// //         await signOut(auth);
// //         setLoadingLogin(false);
// //         return;
// //       }
// //       await updateDoc(userDocRef, {
// //         currentSession: sessionToken
// //       });

// //       userData.currentSession = sessionToken;

// //       await saveUserSession(userData,acessData.nivel,rememberPassword);

// //       dispatch(setUserData(userData));
// //       dispatch(setLevelAccess(acessData.nivel));

// //       navigate("/home");
// //       toast.success("Login realizado com sucesso!");

// //     }catch (error) {
// //       console.error("Erro ao fazer login:", error);
// //       HandleError(error)
// //       toast.error("Erro ao fazer login. Tente novamente.");
// //     } finally {
// //       setLoadingLogin(false);
// //     }
// //   }
  
// //   return (
// //     <div
// //       className={style.container}
// //       style={{
// //         backgroundImage: `url(${Fundo})`,
// //         backgroundSize: "cover",
// //         backgroundPosition: "center",
// //         backgroundRepeat: "no-repeat",
// //       }}
// //     >
// //       <form className={style.formulario} onSubmit={handleLogin}>
// //         <h2 className={style.title}>Login</h2>

// //         <div className={style.inputGroup}>
// //           <InputText type="email" placeholder="E-mail" value={email} setValue={(it:string)=>setEmail(it)}>
// //             <img src={PersonIcon} alt="P" className={style.imagemIconInput} />
// //           </InputText>
// //         </div>

// //         <div className={style.inputGroup}>
// //           <InputText
// //             type={showPassword ? "text" : "password"}
// //             placeholder="Senha"
// //             value={password} 
// //             setValue={(it:string)=>setPassword(it)}
// //           >
// //             <span
// //               onClick={() => setShowPassword(!showPassword)}
// //               style={{ cursor: "pointer" }}
// //             >
// //               <img
// //                 src={showPassword ? Eye : Hidden}
// //                 alt="P"
// //                 className={style.imagemIconInput}
// //               />
// //             </span>
// //           </InputText>
// //         </div>
// //         <div className={style.options}>
// //           <a href="#" className={style.link}>
// //             Redefinir senha
// //           </a>
// //           <a href="#" className={style.link}>
// //             Fale conosco
// //           </a>
// //         </div>
// //         <button className={style.loginButton} type='submit' >Entrar</button>
// //       </form>
// //       {loadingLogin && (
// //         <div className={style.baseLoading}>
// //           <Loading />
// //         </div>
// //       )}
// //     </div>
// //   );
// // }