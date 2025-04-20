
import { DocumentData } from "firebase/firestore";
import { UserData } from "../slices";

export function ParseUserData(data: DocumentData): UserData {
  if (
    typeof data !== "object" ||
    typeof data.email !== "string" ||
    typeof data.id !== "string" ||
    typeof data.nome !== "string" ||
    typeof data.status !== "boolean"||
    typeof data.dinamico !== "boolean"
  ) {
    throw new Error("Dados de usuário inválidos ou incompletos.");
  }

  return {
    email: data.email,
    status: data.status,
    id: data.id,
    nome: data.nome,
    dinamico:data.dinamico,
    currentSession:data.currentSession||null,
  };
}
