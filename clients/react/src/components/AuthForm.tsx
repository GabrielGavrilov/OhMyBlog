import { useLocation, useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';

export default function AuthForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo, loginUser, registerUser } = useAuth();

  return (
    <>
      <p>Auth form</p>
    </>
  );
}
