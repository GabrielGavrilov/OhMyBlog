import { UserDto } from '../../../lib/types/User';

type Props = {
  user: UserDto;
};

export default function ProfileInformation({ user }: Props) {
  return (
    <div className="bg-white w-full h-56 flex justify-center">
      <div>
        <div>
          <p className="text-3xl font-bold">{user.displayName}</p>
        </div>
        <div>
          <p>{user.description === null ? 'No bio' : user.description}</p>
        </div>
      </div>
    </div>
  );
}
