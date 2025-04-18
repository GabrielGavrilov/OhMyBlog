import { Navigate, Outlet, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';

export default function RequireAuth() {
  const { userInfo, loadingUserInfo } = useAuth();
  const location = useLocation();

  if (loadingUserInfo) {
    return <p>Loading...</p>;
  }

  if (userInfo === undefined || !userInfo) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
}
