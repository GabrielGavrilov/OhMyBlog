import { UserDto } from '../../../lib/types/User';
import defaultProfilePicture from '/default.png';

type Props = {
  user: UserDto;
};

export default function ProfileInformation({ user }: Props) {
  return (
    <div className="bg-white w-full h-64 flex justify-center items-center mb-2 border rounded ">
      <div className="flex w-full flex-col items-center">
        <div className="pb-6">
          <img
            src={defaultProfilePicture}
            className="h-auto max-w-24 rounded-full"
          />
        </div>
        <div>
          <p className="text-3xl font-bold font-mono pb-2">
            {user.displayName}
          </p>
        </div>
        <div>
          <p>{user.description === null ? 'No bio' : user.description}</p>
        </div>
      </div>
    </div>
  );
}
