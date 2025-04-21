import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import { Loading } from '../componentes/Load';

export const PrivateRoute = ({ requiredLevels }: { requiredLevels?: string[] }) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const loading = useAppSelector((state) => state.auth.loading);
  const levelAccess = useAppSelector((state) => state.user.levelAccess);

  if (loading) {
    return <Loading />;
  }

  if (!isAuthenticated || !levelAccess) {
    return <Navigate to="/Login" replace />;
  }

  if (
    requiredLevels &&
    !requiredLevels.some((level) => levelAccess.includes(level))
  ) {
    return <Navigate to="/Home" replace />;
  }

  return <Outlet />;
};
