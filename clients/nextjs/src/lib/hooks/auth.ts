import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { createUser } from '../services/auth';

export const useCreateUser = () => {
  // const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      // queryClient.invalidateQueries({
      //   queryKey: ['user'],
      // });
      router.push('/login');
    },
  });
};
