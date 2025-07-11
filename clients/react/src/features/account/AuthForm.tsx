import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLogin, useRegister } from '../../hooks/AccountHooks';
import ValidationError from '../../lib/models/ValidationError';
import User from '../../lib/models/User';
import Input from '../../components/Input';

type Props = {
  mode: 'login' | 'register';
};

export default function AuthForm({ mode }: Props) {
  const isRegistering = mode === 'register';
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );
  const navigate = useNavigate();
  const loginUser = useLogin();
  const registerUser = useRegister();
  const { register, handleSubmit } = useForm();

  async function onSubmit(data: User) {
    if (isRegistering) {
      handleRegister(data);
    } else {
      handleLogin(data);
    }
  }

  async function handleRegister(data: User) {
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
  }

  async function handleLogin(data: User) {
    await loginUser.mutate(data, {
      onSuccess: function () {
        navigate('/');
      },
    });
  }

  return (
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
            <Input
              field="displayName"
              register={register}
              validationErrors={validationErrors}
            />
          </div>
        </div>
      )}
      <div className="mb-3">
        <div>
          <p className="font-semibold mb-1.5">Email</p>
        </div>
        <div>
          <Input
            field="email"
            register={register}
            validationErrors={validationErrors}
          />
        </div>
      </div>
      <div className="mb-3">
        <div>
          <p className="font-semibold mb-1.5">Password</p>
        </div>
        <div>
          <Input
            field="password"
            type="password"
            register={register}
            validationErrors={validationErrors}
          />
        </div>
      </div>
      {isRegistering && (
        <div className="mb-3">
          <div>
            <p className="font-semibold mb-1.5">Password Confirmation</p>
          </div>
          <div>
            <Input
              field="passwordConfirmation"
              type="password"
              register={register}
              validationErrors={validationErrors}
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
  );
}
