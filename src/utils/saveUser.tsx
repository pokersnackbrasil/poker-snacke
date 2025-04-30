import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Server/firebase";

export async function saveUserSession(user: any, accessLevel: string, persist: boolean) {
  const sessionId = user.currentSession;

  // Salva localmente
  if (persist) {
    localStorage.setItem('userData', JSON.stringify(user));
    localStorage.setItem('levelAccess', accessLevel);
  } else {
    sessionStorage.setItem('userData', JSON.stringify(user));
    sessionStorage.setItem('levelAccess', accessLevel);
  }

  // Atualiza o campo currentSession no Firestore
  try {
    // const userRef = doc(db, "usuario", user.id);
    // await updateDoc(userRef, { currentSession: sessionId });
    await updateDoc(doc(db, "usuario", user.id), {
      currentSession: user.currentSession
    }).catch((err) => {
      console.error("Erro ao atualizar currentSession no Firestore:", err);
    });
  } catch (error) {
    console.error("Erro ao atualizar sessão no Firestore:", error);
  }
}


// import { DocumentData } from "firebase/firestore";
// export const saveUserSession = async (userData: DocumentData | null, acesso: string | null, rememberPassword: boolean) => {
//   if (!userData || typeof userData !== "object") {
//     console.error("userData inválido:", userData);
//     return;
//   }

//   if (!acesso || typeof acesso !== "string") {
//     console.error("Acesso inválido:", acesso);
//     return;
//   }


//   const sessionData = JSON.stringify(userData);
//   // const levelAccess = JSON.stringify(acesso); // <--- stringifica o array
//   const levelAccess = acesso;

//   if (rememberPassword) {
//     localStorage.setItem("userData", sessionData);
//     localStorage.setItem("levelAccess", levelAccess);
//   } else {
//     sessionStorage.setItem("userData", sessionData);
//     sessionStorage.setItem("levelAccess", levelAccess);
//   }
// };

// export const saveUserSession = async (userData: DocumentData | null,acesso: string, rememberPassword: boolean) => {
//  if (typeof userData !== "object" || !acesso || userData === null) {
//    console.error("userData inválido:", userData);
//    return;
//  }

//  const sessionData = JSON.stringify(userData);
//  const levelAccess = acesso;

//  if (rememberPassword) {
//    localStorage.setItem("userData", sessionData);
//    localStorage.setItem("levelAccess", levelAccess);
//  } else {
//    sessionStorage.setItem("userData", sessionData);
//    sessionStorage.setItem("levelAccess", levelAccess);
//  }

// };