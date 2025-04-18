import { Navigate, Outlet, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';

export default function RequireAuth() {
  const { isAuthorized } = useAuth();
  const location = useLocation();

  if (!isAuthorized) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
}
