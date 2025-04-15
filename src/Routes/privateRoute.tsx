import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import { Loading } from '../componentes/Load';

export const PrivateRoute = ({ requiredLevels }: { requiredLevels?: string[] }) => {
  const userData = useAppSelector((state) => state.user.userData);
  const levelAccess = useAppSelector((state) => state.user.levelAccess);
  const loading = useAppSelector((state) => state.user.loading);

  if (loading) {
    return <Loading/>
  }

  if (!userData || !levelAccess) {
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


