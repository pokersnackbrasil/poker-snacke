import { DocumentData } from "firebase/firestore";
import Cookies from "js-cookie";
export const saveUserSession = async (userData: DocumentData | null,acesso: string, rememberPassword: boolean) => {
 if (typeof userData !== "object" || !acesso || userData === null) {
   console.error("userData inválido:", userData);
   return;
 }

 const sessionData = JSON.stringify(userData);
 const levelAccess = acesso;

 if (rememberPassword) {
   localStorage.setItem("userData", sessionData);
   localStorage.setItem("levelAccess", levelAccess);
 } else {
   sessionStorage.setItem("userData", sessionData);
   sessionStorage.setItem("levelAccess", levelAccess);
 }

 Cookies.set("user", sessionData, {
   expires: rememberPassword ? 30 : undefined,
 });
};