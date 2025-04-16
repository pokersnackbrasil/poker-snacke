
import { DocumentData } from "firebase/firestore";
import { UserData } from "../slices";

export function ParseUserData(data: DocumentData): UserData {
  if (
    typeof data !== "object" ||
    typeof data.email !== "string" ||
    typeof data.uid !== "string" ||
    typeof data.nome !== "string" ||
    typeof data.status !== "boolean"
  ) {
    throw new Error("Dados de usuário inválidos ou incompletos.");
  }

  return {
    email: data.email,
    status: data.status,
    uid: data.uid,
    nome: data.nome,
  };
}
