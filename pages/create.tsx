import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEventHandler, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineUpload, AiOutlineUser } from 'react-icons/ai';
import { useQueryClient } from 'react-query';
import Navbar from '../components/Navbar';
import { createPostSchema } from '../schema/createPostFormSchema';
import { createPostType } from '../types/Forms';

const Create = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [img, setImg] = useState<any>(null);
  const [fileBlob, setFileBlob] = useState<any>(null);
  const [imgError, setImgError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createPostType>({
    resolver: yupResolver(createPostSchema),
  });

  const onSubmit = (data: createPostType) => {
    if (!img) {
      setImgError('Please select an image');
      return;
    }
    //TODO: do create post functions
    queryClient.invalidateQueries('posts');
    router.push('/');
  };

  const changeImage: ChangeEventHandler<HTMLInputElement> = (e) => {
    setImg((e.target.files as FileList)[0]); // file
    setFileBlob(URL.createObjectURL((e.target.files as FileList)[0])); //  blob
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar wallet>
        <Link href='/create' passHref>
          <AiOutlineUpload className='text-2xl cursor-pointer bg-light-gray rounded-full' />
        </Link>
        <Link href='/user' passHref>
          <AiOutlineUser className='text-2xl cursor-pointer hover:bg-light-gray rounded-full' />
        </Link>
      </Navbar>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col flex-1 justify-evenly my-10 items-center'>
        <div className='flex flex-col'>
          <div
            className={`h-auto max-w-3xl ${
              img ? 'border' : ''
            } mb-2 overflow-hidden`}>
            {img && <img src={fileBlob} alt='avatar' className='bg-cover' />}
          </div>
          <label htmlFor='profile_img'>Post</label>
          <input
            type='file'
            name='profile_img'
            id='profile_img'
            accept='image/*'
            onChange={changeImage}
          />

          <span className='text-red text-sm'>{imgError}</span>
        </div>
        <div className='flex flex-col gap-2 w-1/3'>
          {/* name input  */}
          <label className='flex flex-col items-start'>
            <span>Caption:</span>
            <textarea {...register('caption')} />
            <span className='text-red text-sm'>{errors.caption?.message}</span>
          </label>

          {/* shareable*/}
          <label className='flex items-center justify-start gap-2 cursor-pointer'>
            <input
              {...register('shareable')}
              type='checkbox'
              className='w-fit'
            />
            <span>Shareable</span>
          </label>
          <button type='submit'>Create Post</button>
        </div>
      </form>
    </div>
  );
};
export default Create;
