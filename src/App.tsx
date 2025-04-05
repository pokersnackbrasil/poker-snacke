import {RoutesApp} from './Routes';
import './global.module.css'
import { useEffect } from 'react';
import { useAppDispatch } from './hooks';
import { setUserData, setLevelAccess } from './slices';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userDataStored = localStorage.getItem('userData') || sessionStorage.getItem('userData');
    const levelAccessStored = localStorage.getItem('levelAccess') || sessionStorage.getItem('levelAccess');

    if (userDataStored && levelAccessStored) {
      dispatch(setUserData(JSON.parse(userDataStored)));
      dispatch(setLevelAccess(levelAccessStored));
    }
  }, [dispatch]);
  return <RoutesApp />;
}

export default App
