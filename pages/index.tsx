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
import { dbPost, Post as PostT } from '../types/Post';

const Home: NextPage = () => {
  const router = useRouter();
  const wallet = useAnchorWallet();
  const queryClient = useQueryClient();

  const { isError, isLoading, data } = useQuery('posts', async () =>
    // getting posts
    AXIOS.get('/posts')
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
        <Link href='/new/post' passHref>
          <AiOutlineUpload className='text-2xl cursor-pointer hover:bg-light-gray rounded-full' />
        </Link>
      </Navbar>
      <div className='flex justify-center my-10 px-4 w-auto md:w-1/2 mx-auto'>
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
            (data.data as dbPost[]).map((post) => (
              <Post
                key={post._id}
                imageUrl={post.path}
                caption={post.caption}
                imageHash={post.metaContentHash}
                author={post.owner.name}
                shareable={post.shareable}
                likes={+post.likes}
                likeAction={() => likePost(post._id)}
                owner={post.owner}
                pid={post.pid}
              />
            ))}
        </div>
      </div>
    </PrivateRoute>
  );
};

export default Home;
