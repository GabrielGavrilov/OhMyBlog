import { useNavigate, useParams } from 'react-router';
import {
  useLogout,
  useProfile,
  useUpdateUser,
} from '../../../hooks/AccountHooks';
import { UserDto } from '../../../lib/types/User';
import defaultProfilePicture from '/default.png';
import { useState } from 'react';
import Modal from '../../../components/Modal';
import Input from '../../../components/Input';
import { useForm } from 'react-hook-form';

type Props = {
  user: UserDto;
};

export default function ProfileInformation({ user }: Props) {
  const { id } = useParams();
  const { data: userInfo } = useProfile();
  const logout = useLogout();
  const isUser = userInfo?.id === id;
  const [viewEditDescriptionModal, setViewEditDescriptionModal] =
    useState<boolean>(false);
  const { register, handleSubmit } = useForm();
  const updateUser = useUpdateUser();
  const navigate = useNavigate();

  async function onSubmit(data: UserDto) {
    await updateUser.mutate(
      { ...userInfo, ...data },
      {
        onSuccess: (user: UserDto) => navigate(`/user/${user.id}`),
      }
    );
  }

  return (
    <>
      {viewEditDescriptionModal && (
        <Modal
          header="Edit description"
          confirmationText="Edit"
          onSubmit={handleSubmit(onSubmit)}
          onCancel={() =>
            setViewEditDescriptionModal(!viewEditDescriptionModal)
          }
        >
          <Input
            field="description"
            register={register}
            placeholder="Description"
          />
        </Modal>
      )}
      <div className="bg-white w-full pt-8 pb-8 flex justify-center items-center mb-2 border rounded ">
        <div></div>
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
          {isUser && (
            <div className="flex pt-2">
              <div>
                <button
                  className="btn"
                  onClick={() =>
                    setViewEditDescriptionModal(!viewEditDescriptionModal)
                  }
                >
                  Edit bio
                </button>
                <button className="btn" onClick={() => logout.mutate()}>
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
