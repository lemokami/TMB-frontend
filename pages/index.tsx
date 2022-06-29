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
import { feedPost } from '../types/Feed';

const Home: NextPage = () => {
  const { isError, isLoading, data } = useQuery('posts', async () =>
    // getting posts
    AXIOS.get('/posts')
  );

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
            (data.data as feedPost[]).map(
              ({ post, likes, isOwner, poster, owner, _id }) => (
                <Post
                  key={post._id}
                  id={_id}
                  imageUrl={post.path}
                  caption={post.caption}
                  imageHash={post.metaContentHash}
                  shareable={post.shareable}
                  likes={likes}
                  isOwner={isOwner}
                  owner={owner}
                  poster={poster}
                  pid={post.pid}
                />
              )
            )}
        </div>
      </div>
    </PrivateRoute>
  );
};

export default Home;
