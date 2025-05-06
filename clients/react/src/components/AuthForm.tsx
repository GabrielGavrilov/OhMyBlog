import { Register, useLocation, useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import User from '../models/User';

export default function AuthForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser, registerUser } = useAuth();
  const [isRegistering, setRegistering] = useState<boolean>(true);
  const { register, handleSubmit } = useForm();

  useEffect(
    function () {
      if (location.pathname === '/login') {
        setRegistering(false);
      }
    },
    [location]
  );

  async function onSubmit(data: User) {
    if (isRegistering) {
      if (data.password === data.passwordConfirmation) {
        await registerUser.mutate(data, {
          onSuccess: function () {
            navigate('/login');
          },
        });
      }
    } else {
      await loginUser.mutate(data, {
        onSuccess: function () {
          navigate('/');
        },
      });
    }
  }

  return (
    <>
      <form
        className="w-full bg-white p-8 border rounded"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-6">
          <p className="text-2xl font-mono">
            {isRegistering ? 'Create your account' : 'Sign into your account'}
          </p>
        </div>
        {isRegistering && (
          <div className="mb-3">
            <div>
              <p className="font-semibold mb-1.5">Username</p>
            </div>
            <div>
              <input className="auth-form-input" {...register('displayName')} />
            </div>
          </div>
        )}
        <div className="mb-3">
          <div>
            <p className="font-semibold mb-1.5">Email</p>
          </div>
          <div>
            <input className="auth-form-input" {...register('email')} />
          </div>
        </div>
        <div className="mb-3">
          <div>
            <p className="font-semibold mb-1.5">Password</p>
          </div>
          <div>
            <input
              type="password"
              className="auth-form-input"
              {...register('password')}
            />
          </div>
        </div>
        {isRegistering && (
          <div className="mb-3">
            <div>
              <p className="font-semibold mb-1.5">Password Confirmation</p>
            </div>
            <div>
              <input
                type="password"
                className="auth-form-input"
                {...register('passwordConfirmation')}
              />
            </div>
          </div>
        )}
        <div className="mt-6 flex w-full justify-end">
          <button className="btn btn-primary-filled">
            {isRegistering ? 'Sign up' : 'Log in'}
          </button>
        </div>
      </form>
    </>
  );
}
