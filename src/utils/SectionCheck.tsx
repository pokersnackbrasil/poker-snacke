import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../Server/firebase';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
import { clearUserData } from '../slices';
import { loginFail } from '../slices/authSlice';
import { store } from '../store'; // ajuste conforme seu setup de redux

export async function checkSessionBeforeAction(userId: string, currentSession: string) {
  try {
    // console.log('Verificando a sessão...')
    const userDocRef = doc(db, 'usuario', userId);
    const snapshot = await getDoc(userDocRef);


    if (!snapshot.exists()) {
      toast.error("Sessão encerrada. Documento do usuário não encontrado.");
      await forceSignOut();
      return false;
    }

    const data = snapshot.data();
    if (!data || data.currentSession !== currentSession) {
      toast.error("Sessão encerrada por login em outro dispositivo.");
      await forceSignOut();
      return false;
    }

    return true; // Sessão válida, pode executar a ação.
  } catch (error) {
    // console.error("Erro ao verificar a sessão:", error);
    toast.error("Erro ao verificar a sessão.");
    await forceSignOut();
    return false;
  }
}

async function forceSignOut() {
  try {
    await signOut(auth);
  } catch (error) {
    console.warn("Erro ao fazer signOut:", error);
  }
  localStorage.clear();
  sessionStorage.clear();
  store.dispatch(clearUserData());
  store.dispatch(loginFail("Sessão encerrada."));
}
