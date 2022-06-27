/* eslint-disable @next/next/no-img-element */
import { ChangeEventHandler, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Navbar from '../components/Navbar';
import PrivateRoute from '../hoc/PrivateRoute';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateUserFormSchema } from '../schema/UpdateUserFormSchema';
import { UpdateUserForm } from '../types/Forms';
import { useRouter } from 'next/router';

const User = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserForm>({
    resolver: yupResolver(updateUserFormSchema),
  });

  const [img, setImg] = useState<any>(null);
  const [fileBlob, setFileBlob] = useState<any>(null);
  const [imgError, setImgError] = useState<string | null>(null);

  const changeImage: ChangeEventHandler<HTMLInputElement> = (e) => {
    setImg((e.target.files as FileList)[0]); // file
    setFileBlob(URL.createObjectURL((e.target.files as FileList)[0])); //  blob
  };

  const onSubmit = (data: UpdateUserForm) => {
    if (!img) {
      setImgError('Please select an image');
      return;
    }
    //TODO: send update request
    router.push('/');
  };

  useEffect(() => {
    if (img) {
      setImgError(null);
    }
  }, [img]);

  return (
    <PrivateRoute>
      <div className='min-h-screen flex flex-col'>
        <Navbar wallet />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-1 items-center justify-evenly'>
          <div className='flex flex-col'>
            <div className='rounded-full h-80 w-80 border mb-2 overflow-hidden'>
              {img && (
                <img
                  src={fileBlob}
                  alt='avatar'
                  className='object-cover h-full w-full'
                />
              )}
            </div>
            <label htmlFor='profile_img'>Profile Image</label>
            <input
              type='file'
              name='profile_img'
              id='profile_img'
              accept='image/*'
              onChange={changeImage}
            />

            <span className='text-red text-sm'>{imgError}</span>
          </div>
          <div className='flex flex-col gap-2 w-1/4'>
            {/* name input  */}
            <label className='flex flex-col items-start'>
              <span>Name:</span>
              <input {...register('name')} type='text' />

              <span className='text-red text-sm'>{errors.name?.message}</span>
            </label>
            {/* age input  */}
            <label className='flex flex-col items-start'>
              <span>Age:</span>
              <input {...register('age')} type='number' min={13} max={200} />
              <span className='text-red text-sm'>{errors.age?.message}</span>
            </label>

            <button type='submit'>Update Profile</button>
          </div>
        </form>
      </div>
    </PrivateRoute>
  );
};
export default User;
