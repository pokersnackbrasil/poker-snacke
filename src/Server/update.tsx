import { collection, query, where, getDocs, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function updateDinamico(id: string, dinamico: boolean) {
  const q = query(collection(db, "usuario"), where("id", "==", id));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    throw new Error(`Nenhum usuário encontrado com o id: ${id}`);
  }
  const docRef = querySnapshot.docs[0].ref;
  await setDoc(docRef, { "dinamico": dinamico }, { merge: true });
}
