import UserForm from '@/components/user-form';

export default function Page() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-10/12 lg:w-2/3 md:w-10/12 sm:w-10/12">
        <UserForm isRegistering={true} />
      </div>
    </div>
  );
}
