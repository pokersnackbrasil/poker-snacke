
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks';

export const PrivateRoute = ({ requiredLevel }: { requiredLevel?: string }) => {
  const userData = useAppSelector((state) => state.user.userData);
  const levelAccess = useAppSelector((state) => state.user.levelAccess);

  if (!userData || !levelAccess) {
    return <Navigate to="/Login" replace />;
  }

  if (requiredLevel && levelAccess !== requiredLevel) {
    return <Navigate to="/Home" replace />;
  }

  return <Outlet />;
};
