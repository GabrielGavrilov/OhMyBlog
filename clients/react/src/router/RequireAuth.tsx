import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuthorized } from '../hooks/AccountHooks';

export default function RequireAuth() {
  const { data: authorized } = useAuthorized();
  const location = useLocation();

  if (!authorized) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
}
