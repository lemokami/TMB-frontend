import { yupResolver } from '@hookform/resolvers/yup';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineUpload, AiOutlineUser } from 'react-icons/ai';
import { useMutation, useQueryClient } from 'react-query';
import Navbar from '../../components/Navbar';
import { AXIOS } from '../../helpers/axios';
import PrivateRoute from '../../hoc/PrivateRoute';
import { createPostSchema } from '../../schema/createPostFormSchema';
import { createPostType } from '../../types/Forms';

const Post = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const wallet = useAnchorWallet();

  const [img, setImg] = useState<any>(null);
  const [fileBlob, setFileBlob] = useState<any>(null);
  const [imgError, setImgError] = useState<string | null>(null);
  const [existsError, setExistsError] = useState<boolean>(false);
  const [errMessage, setErrMessage] = useState('');
  const [user, setUser] = useState<any>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<createPostType>({
    resolver: yupResolver(createPostSchema),
  });

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user') + '');
    setUser(user);
  }, []);

  const createPost = useMutation(
    (formData: any) => {
      const data = new FormData();
      data.append('file', img);
      data.append('caption', formData.caption);
      data.append('shareable', formData.shareable);
      data.append('key', wallet?.publicKey.toString()!);
      data.append('user_id', user?._id);

      return AXIOS.post('/post', data);
    },
    {
      onSuccess: (data) => {
        console.log(data);
        router.push('/');
      },
      onError: (error: any) => {
        if (error.response!.status === 400) {
          setErrMessage('Error parsing file');
        } else if (error.response!.status === 409) {
          setErrMessage('Post already exists');
        }

        setExistsError(true);
        reset();
      },
    }
  );

  const onSubmit = (data: createPostType) => {
    if (!img) {
      setImgError('Please select an image');
      return;
    }
    createPost.mutate(data);
    queryClient.invalidateQueries('posts');
  };

  const changeImage: ChangeEventHandler<HTMLInputElement> = (e) => {
    setImg((e.target.files as FileList)[0]); // file
    setFileBlob(URL.createObjectURL((e.target.files as FileList)[0])); //  blob
  };

  return (
    <PrivateRoute>
      <div className='flex flex-col min-h-screen'>
        <Navbar wallet>
          <Link href='/create' passHref>
            <AiOutlineUpload className='text-2xl cursor-pointer hover:bg-light-gray rounded-full' />
          </Link>
        </Navbar>
        {existsError && (
          <div className='p-2 rounded bg-red text-[#fff] self-center'>
            {errMessage}
          </div>
        )}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col flex-1 justify-evenly my-10 items-center'>
          <div className='flex flex-col px-4'>
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
              accept='image/jpeg, image/jpg'
              onChange={changeImage}
            />

            <span className='text-red text-sm'>{imgError}</span>
          </div>
          <div className='flex flex-col px-4 gap-2 w-full md:w-1/2 xl:w-1/3'>
            {/* name input  */}
            <label className='flex flex-col items-start'>
              <span>Caption:</span>
              <textarea {...register('caption')} />
              <span className='text-red text-sm'>
                {errors.caption?.message}
              </span>
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
    </PrivateRoute>
  );
};
export default Post;
