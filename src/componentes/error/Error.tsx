import { toast } from "react-toastify";
import errorMessages from "./msgAlertFireBase.json";

export function HandleError(error: unknown) {
  // console.log("======= HANDLE ERROR =======");
  // console.log("Error capturado:", error);

  try {
    const firebaseError = error as { code?: string; message?: string };

    const code = firebaseError.code || (error as any)?.error?.code || "";
    const messageFromJson = (errorMessages as Record<string, string>)[code];

    const finalMessage =
      messageFromJson ||
      firebaseError.message ||
      (typeof error === "string" ? error : "") ||
      "Ocorreu um erro inesperado. Tente novamente.";

    // console.log("Código do erro:", code);
    // console.log("Mensagem encontrada:", finalMessage);

    toast.error(finalMessage);
  } catch (err) {
    console.error("Erro dentro do HandleError:", err);
    toast.error("Erro inesperado.");
  }
}




// import { toast } from "react-toastify";
// import errorMessages from "./msgAlertFireBase.json";

// export function HandleError(error:unknown){
//  const message =
//    typeof error === "string"
//      ? (errorMessages as Record<string, string>)[error]
//      : (errorMessages as Record<string, string>)[(error as any).code];
// //  console.log("erro: ", error)
// //  console.log("Código de erro: ", message)
//  if (message) {
//   toast.error(message);
//  } else {
//   // console.log(error);
//  }
// }