import { UserDto } from '../../../lib/types/User';

type Props = {
  user: UserDto;
};

export default function ProfileInformation({ user }: Props) {
  return (
    <div className="bg-white w-full h-56">
      <p>{user.displayName}</p>
    </div>
  );
}
