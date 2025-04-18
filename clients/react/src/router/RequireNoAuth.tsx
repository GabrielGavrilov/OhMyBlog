import { Navigate, Outlet } from 'react-router';
import useAuth from '../hooks/useAuth';

export default function RequireNoAuth() {
  const { userInfo, loadingUserInfo } = useAuth();

  if (loadingUserInfo) {
    return <p>Loading...</p>;
  }

  if (userInfo === undefined || !userInfo) {
    return <Outlet />;
  }

  return <Navigate to="/" />;
}
