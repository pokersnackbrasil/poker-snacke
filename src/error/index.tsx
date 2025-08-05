import { toast } from "react-toastify";
import errorMessages from "./msgAlertFireBase.json";


const messages: Record<string, string> = errorMessages;

export function HandleError(error: any) {

  const key = typeof error === "string" ? error : error.code;
  const message = messages[key];
  if (message) {
    // console.log("Message:",message)
    toast.error(message);
    // toast.success(message);
  } else {
    // console.log("error:",error)
    toast.error(error);
  }
}
