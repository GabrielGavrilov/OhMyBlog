import { useParams } from 'react-router';
import { useProfileById } from '../../../hooks/AccountHooks';
import ProfileInformation from './ProfileInformation';

export default function Profile() {
  const { id } = useParams();
  const { data: user } = useProfileById(id!);

  return (
    <div>
      <ProfileInformation user={user!} />
    </div>
  );
}
