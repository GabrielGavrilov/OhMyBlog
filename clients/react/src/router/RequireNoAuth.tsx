import { Navigate, Outlet } from 'react-router';
import useAuth from '../hooks/useAuth';

export default function RequireNoAuth() {
  const { isAuthorized } = useAuth();

  if (!isAuthorized) {
    return <Outlet />;
  }

  return <Navigate to="/" />;
}
