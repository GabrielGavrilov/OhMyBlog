import { TextareaHTMLAttributes } from 'react';
import { UseFormRegister } from 'react-hook-form';
import ValidationError from '../lib/types/ValidationError';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  field: string;
  register: UseFormRegister<any>;
  validationErrors: ValidationError[];
}

export default function InputArea({
  field,
  register,
  validationErrors,
  ...children
}: Props) {
  return (
    <>
      <textarea
        {...children}
        {...register(field)}
        className="w-full h-96 focus:outline-none text-xl"
      />
      {validationErrors
        .filter((err) => err.field.includes(field))
        .map((err) => (
          <p className="text-red-600">{err.message}</p>
        ))}
    </>
  );
}
