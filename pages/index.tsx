import { useAnchorWallet } from '@solana/wallet-adapter-react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  AiOutlineLoading3Quarters,
  AiOutlineUpload,
  AiOutlineUser,
} from 'react-icons/ai';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Navbar from '../components/Navbar';
import Post from '../components/Post';
import { AXIOS } from '../helpers/axios';
import PrivateRoute from '../hoc/PrivateRoute';
import { Post as PostT } from '../types/Post';

const Home: NextPage = () => {
  const router = useRouter();
  const wallet = useAnchorWallet();
  const queryClient = useQueryClient();

  const { isError, isLoading, data } = useQuery('posts', async () =>
    // getting posts
    AXIOS.get('/api/posts')
  );

  const likePostMutation = useMutation(
    (id: string | number) =>
      AXIOS.patch(`/like/${id}`, { key: wallet?.publicKey.toString() }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('posts');
      },
    }
  );

  const likePost = (id: string | number) => {
    likePostMutation.mutate(id);
  };

  return (
    <PrivateRoute>
      <Navbar wallet>
        <Link href='/create' passHref>
          <AiOutlineUpload className='text-2xl cursor-pointer hover:bg-light-gray rounded-full' />
        </Link>
        <Link href='/user' passHref>
          <AiOutlineUser className='text-2xl cursor-pointer hover:bg-light-gray rounded-full' />
        </Link>
      </Navbar>
      <div className='flex justify-center my-10 px-4'>
        <div className=' flex flex-col space-y-8'>
          {isLoading && (
            <AiOutlineLoading3Quarters className='animate-spin self-center text-4xl' />
          )}

          {isError && (
            <div className='text-red self-center'>
              Error occured while fetching posts
            </div>
          )}
          {data &&
            (data.data as PostT[]).map((post) => (
              <Post
                key={post.id}
                imageUrl={post.path}
                caption={post.caption}
                author={post.owner.name}
                shareable={post.shareable}
                likes={+post.likes}
                likeAction={() => likePost(post.id)}
              />
            ))}
          <Post
            imageUrl='https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
            caption='A picture of a cat'
            author='John Doe'
            shareable={true}
            likes={10}
            likeAction={() => {
              console.log('like++');
              likePost(1);
            }}
          />
        </div>
      </div>
    </PrivateRoute>
  );
};

export default Home;
