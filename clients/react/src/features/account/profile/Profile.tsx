import { useParams } from 'react-router';
import { useProfileById } from '../../../hooks/AccountHooks';
import ProfileInformation from './ProfileInformation';
import BlogList from '../../blog/BlogList';

export default function Profile() {
  const { id } = useParams();
  const { data: user, isLoading: isLoadingUser } = useProfileById(id!);

  if (isLoadingUser) {
    return <p>Loading...</p>;
  }

  console.log(user);

  return (
    <div>
      <ProfileInformation user={user!} />
      <BlogList />
    </div>
  );
}
