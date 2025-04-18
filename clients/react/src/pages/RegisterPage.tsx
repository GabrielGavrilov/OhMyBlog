import AuthForm from '../components/AuthForm';

export default function RegisterPage() {
  return (
    <>
      <div className="w-full flex justify-center">
        <div className="w-10/12 lg:w-2/3 md:w-10/12 sm:w-10/12">
          <AuthForm />
        </div>
      </div>
    </>
  );
}
