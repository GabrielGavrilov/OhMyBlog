import { Register, useLocation, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import User from '../models/User';
import ValidationError from '../models/ValidationError';
import { useLogin, useRegister } from '../hooks/AccountHooks';

export default function AuthForm() {
  const navigate = useNavigate();
  const location = useLocation();
  // const { loginUser, registerUser } = useAuth();
  const loginUser = useLogin();
  const registerUser = useRegister();
  const [isRegistering, setRegistering] = useState<boolean>(true);
  const { register, handleSubmit } = useForm();
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );

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
          onError: function (error) {
            if (Array.isArray(error)) {
              setValidationErrors(error);
            } else {
              setValidationErrors([]);
            }
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
              {validationErrors.map((err: ValidationError) =>
                err.field.includes('displayName') ? (
                  <p className="text-red-600">{err.message}</p>
                ) : null
              )}
            </div>
          </div>
        )}
        <div className="mb-3">
          <div>
            <p className="font-semibold mb-1.5">Email</p>
          </div>
          <div>
            <input className="auth-form-input" {...register('email')} />
            {validationErrors.map((err: ValidationError) =>
              err.field.includes('email') ? (
                <p className="text-red-600">{err.message}</p>
              ) : null
            )}
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
            {validationErrors.map((err: ValidationError) =>
              err.field.includes('password') ? (
                <p className="text-red-600">{err.message}</p>
              ) : null
            )}
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
