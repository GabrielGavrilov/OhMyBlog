'use client';

import { useCreateUser } from '@/lib/hooks/auth';
import { User } from '@/lib/types/auth';
import { useForm } from 'react-hook-form';

type Props = {
  isRegistering: boolean;
};

export default function UserForm({ isRegistering }: Readonly<Props>) {
  const { mutateAsync: createUser } = useCreateUser();
  const { register, handleSubmit } = useForm();

  async function handleOnSubmit(data: User) {
    console.log(data);
  }

  return (
    <form
      className="w-full bg-white p-8 border rounded"
      onSubmit={handleSubmit(handleOnSubmit)}
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
            <input type="password" className="auth-form-input" />
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
