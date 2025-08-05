import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import { selectAuthAuthenticated } from '../slice/auth/authSelectors';
import { JSX } from 'react';

export const RedirectByRole=({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useAppSelector(selectAuthAuthenticated);
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }
  return children;
};

export default RedirectByRole;
