import { Navigate, Outlet } from 'react-router';
import { useAuthorized } from '../../hooks/useAccountActions';

export default function RequireNoAuth() {
  const { data: authorized } = useAuthorized();

  if (!authorized) {
    return <Outlet />;
  }

  return <Navigate to="/" />;
}
