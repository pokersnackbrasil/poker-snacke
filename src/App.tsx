import {RoutesApp} from './Routes';
// import './global.module.css'
import { useEffect, useState } from 'react';
import { useAppDispatch } from './hooks';
import { setUserData, setLevelAccess, setLoading } from './slices';
import { auth } from "./Server/firebase";
import { onAuthStateChanged } from 'firebase/auth';
import { Loading } from './componentes/Load';

function App() {
  const dispatch = useAppDispatch();
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    dispatch(setLoading(true));

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userDataStored = localStorage.getItem('userData') || sessionStorage.getItem('userData');
        const levelAccessStored = localStorage.getItem('levelAccess') || sessionStorage.getItem('levelAccess');
  
        // ⚠️ Só reidrata se dados forem válidos
        if (userDataStored && levelAccessStored) {
          try {
            const parsedUser = JSON.parse(userDataStored);
  
            // Garante que os campos essenciais existem
            if (parsedUser?.email && parsedUser?.uid && parsedUser?.nome) {
              dispatch(setUserData(parsedUser));
              dispatch(setLevelAccess(levelAccessStored));
            }
          } catch (err) {
            console.error("Erro ao parsear dados da sessão:", err);
          }
        }
      } else {
        // ⚠️ Se não há usuário logado no Firebase, limpa Redux
        dispatch(setUserData(null));
        dispatch(setLevelAccess(null));
      }
  
      dispatch(setLoading(false));
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (authLoading) {
    return <Loading/>; // loading global inicial
  }

  return <RoutesApp />;
}

export default App;
