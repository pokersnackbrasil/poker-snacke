
import { toast } from "react-toastify";
import errorMessages from "./msgAlertFireBase.json";

export function HandleError(error:unknown){
 const message =
   typeof error === "string"
     ? (errorMessages as Record<string, string>)[error]
     : (errorMessages as Record<string, string>)[(error as any).code];
//  console.log("erro: ", error)
//  console.log("Código de erro: ", message)
 if (message) {
  toast.error(message);
 } else {
  // console.log(error);
 }
}