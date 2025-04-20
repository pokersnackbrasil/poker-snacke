import React from 'react';
import { signOut } from 'firebase/auth';
import { useAppDispatch } from '../../hooks';
import { clearUserData, setLevelAccess } from '../../slices';
import { auth } from '../../Server/firebase';
import { useNavigate } from 'react-router-dom';
import style from './style.module.css';
import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../Server/firebase';

// import {Icon} from "../IconsSocialMidia/icon";
// import facebookIcon from "../../assets/facebook.png";
// import linkedinIcon from "../../assets/linkedin.png";
// import User from "../../assets/user.png";

type CardProps = {
	children?: React.ReactNode;
};

export default function CabecalhoVerde({ children }: CardProps) {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();


  const handleLogout = async () => {
    console.log("Saindo - 1");
    try {
      // Obtém o usuário atual autenticado
      const currentUser = auth.currentUser;
  
      if (currentUser?.email) {
        const userQuery = query(
          collection(db, "usuario"),
          where("email", "==", currentUser.email)
        );
        const userSnapshot = await getDocs(userQuery);
  
        if (!userSnapshot.empty) {
          const userDocRef = userSnapshot.docs[0].ref;
  
          // Invalida a sessão no Firestore
          await updateDoc(userDocRef, {
            currentSession: null,
          });
        }
      }
  
      // Realiza o logout usando o Firebase Auth
      await signOut(auth);
  
      // Limpa o estado do Redux (dados do usuário e nível de acesso)
      dispatch(clearUserData());
      dispatch(setLevelAccess(null));
  
      // Remove os dados salvos no armazenamento local e de sessão
      localStorage.removeItem("userData");
      localStorage.removeItem("levelAccess");
      sessionStorage.removeItem("userData");
      sessionStorage.removeItem("levelAccess");
  
      // Redireciona para a tela de login
      navigate("/Login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };
  
  return (
	<div className={style.green_header__body}>
			<span className={style.sair} style={{cursor:'pointer'}} onClick={()=>handleLogout()}>Sair</span>
      {children}
	</div>
  );
}
