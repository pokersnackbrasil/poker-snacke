import { useState } from "react";
import style from "./style.module.css";
import Fundo from "../../assets/fundo2.jpg"
import PersonIcon from "../../assets/person_24px.png"
import Eye from "../../assets/eye.png"
import Hidden from "../../assets/hidden.png"
import InputText from "../../componentes/IputText";
import {HandleError} from "../../componentes/error/Error"
import { toast } from "react-toastify";
import { db,auth } from "../../Server/firebase"
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUserData, setLevelAccess } from "../../slices";

import { useNavigate } from "react-router-dom";
import { Loading } from "../../componentes/Load";
import { sendEmailVerification, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { collection, DocumentData, getDocs, query, where } from "firebase/firestore";



export default function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loadingLogin, setLoadingLogin] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")


  const [rememberPassword, setRememberPassword] = useState(true);


  const verifyEmail = async (user: User) => {
    if (!user.emailVerified) {
      await sendEmailVerification(user);
      toast.error("Por favor, verifique seu e-mail para continuar.");
      throw new Error("E-mail não verificado.");
    }
  };

  const saveUserSession = async (userData: DocumentData | null,rememberPassword: any) => {
    if (typeof userData !== "object" || userData === null) {
      console.error("userData inválido:", userData);
      return;
    }
    const sessionData = JSON.stringify(userData);
    if (rememberPassword) {
      localStorage.setItem("userData", sessionData);
    } else {
      sessionStorage.setItem("userData", sessionData); // Apenas para a sessão atual
    }
    Cookies.set("user", sessionData, { expires: rememberPassword ? 30 : undefined });

  };


  const handleLogin = async ()=>{
    setLoadingLogin(true);
    console.log("e-mail",email)
    console.log("senha",password)
    try{
      if (!email || !password) {
        setLoadingLogin(false);
        toast.success("Por favor, preencha todos os campos.");
        return;
      }

      const currentUser = await signInWithEmailAndPassword(auth, email, password);

      if (!currentUser.user.emailVerified) {
        await verifyEmail(currentUser.user);
        toast.error("E-mail não verificado");
        toast.error("Verifique sua conta, pelo link enviado por e-mail, e tente novamente!");
        throw new Error("E-mail não verificado.");
      }

      const userQuery = query(
        collection(db, "usuario"),
        where("email", "==", currentUser.user.email)
      );

      const querySnapshot = await getDocs(userQuery);

      if (querySnapshot.empty) {
        toast.error("Usuário não encontrado.");
        await signOut(auth);
        setLoadingLogin(false);
        return;
      }

      const userData = querySnapshot.docs[0].data();
      if (!userData.status) {
        toast.error("Usuário inativo na plataforma");
        await signOut(auth);
        setLoadingLogin(false);
        return;
      }

      if (!userData.validacao) {
        toast.error("Certifique-se de ser validado antes de tentar novamente!");
        await signOut(auth);
        setLoadingLogin(false);
        return;
      }

      await saveUserSession(userData,rememberPassword);

      dispatch(
        setUserData({
          userData: userData,
        }),
        // setLevelAccess({
        //   n: userData.acesso,
        // })
      );

      navigate("/home");
      toast.success("Login realizado com sucesso!");

    }catch (error) {
      console.error("Erro ao fazer login:", error);
      HandleError(error)
      toast.error("Erro ao fazer login. Tente novamente.");
    } finally {
      setLoadingLogin(false);
    }
  }
  
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
      <form className={style.formulario} onSubmit={()=>handleLogin()}>
        <h2 className={style.title}>Login</h2>

        <div className={style.inputGroup}>
          <InputText type="email" placeholder="E-mail" value={email} setValue={(it:string)=>setEmail(it)}>
            <img src={PersonIcon} alt="P" className={style.imagemIconInput} />
          </InputText>
        </div>

        <div className={style.inputGroup}>
          <InputText
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            value={password} 
            setValue={(it:string)=>setPassword(it)}
          >
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={showPassword ? Eye : Hidden}
                alt="P"
                className={style.imagemIconInput}
              />
            </span>
          </InputText>
        </div>
        <div className={style.options}>
          <a href="#" className={style.link}>
            Redefinir senha
          </a>
          <a href="#" className={style.link}>
            Fale conosco
          </a>
        </div>
        <button className={style.loginButton} type='submit' >Entrar</button>
      </form>
      {loadingLogin && (
        <div className={style.baseLoading}>
          <Loading />
        </div>
      )}
    </div>
  );
}