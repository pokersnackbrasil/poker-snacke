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

        if (userDataStored && levelAccessStored) {
          dispatch(setUserData(JSON.parse(userDataStored)));
          dispatch(setLevelAccess(levelAccessStored));
        }
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
