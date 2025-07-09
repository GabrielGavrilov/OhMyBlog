import { InputHTMLAttributes } from 'react';
import { UseFormRegister } from 'react-hook-form';
import ValidationError from '../models/ValidationError';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  field: string;
  register: UseFormRegister<any>;
  validationErrors: ValidationError[];
}

export default function Input({
  field,
  register,
  validationErrors,
  ...children
}: Props) {
  return (
    <>
      <input
        {...register(field)}
        className="w-full pt-2 pb-2 pl-4 pr-4 border rounded focus:outline-none"
        {...children}
      />
      {validationErrors
        .filter((err) => err.field.includes(field))
        .map((err) => (
          <p className="text-red-600">{err.message}</p>
        ))}
    </>
  );
}
