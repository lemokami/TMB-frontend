/* eslint-disable @next/next/no-img-element */
import { AnchorWallet, useAnchorWallet } from '@solana/wallet-adapter-react';
import { FC, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useQueryClient } from 'react-query';
import { AXIOS } from '../helpers/axios';
import { sharePostContract } from '../helpers/contract';
import { dbUser } from '../types/User';
import LoadingSpinner from './LoadingSpinner';

type PostType = {
  id?: string | number;
  imageUrl: string;
  caption: string;
  shareable: boolean;
  likes: number;
  poster: dbUser;
  imageHash: string;
  isOwner: boolean;
  pid: string;
  owner: dbUser;
};
const Post: FC<PostType> = (props) => {
  const wallet = useAnchorWallet();
  const queryClient = useQueryClient();
  const [sharing, setSharing] = useState(false);
  const [user, setUser] = useState<dbUser>(
    JSON.parse(sessionStorage.getItem('user')!) as dbUser
  );

  const handleShare = async () => {
    setSharing(true);
    await sharePostContract(wallet as AnchorWallet, props.pid);

    const {
      data: { user },
    } = await AXIOS.post('/share/post', {
      pid: props.pid,
      owner_id: props.owner._id,
      sharer_id: JSON.parse(sessionStorage.getItem('user') + '')._id,
    });
    sessionStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    setSharing(false);
  };

  const handleLike = async () => {
    const { data } = await AXIOS.post('/like/post', {
      id: props.id,
      liker_id: JSON.parse(sessionStorage.getItem('user') + '')._id,
    });

    sessionStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
    queryClient.invalidateQueries('posts');
  };
  const handleUnLike = async () => {
    const { data } = await AXIOS.post('/unlike/post', {
      id: props.id,
      unliker_id: user._id,
    });

    sessionStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
    queryClient.invalidateQueries('posts');
  };
  const hasElement = (arr: any[], element: any) => {
    return arr.indexOf(element) > -1;
  };

  return (
    <div className='flex flex-col border border-light-gray rounded'>
      <div className='p-2'>
        {props.isOwner
          ? props.poster.name
          : `${props.poster.name} shared ${props.owner.name}'s post`}
      </div>
      <div className='w-full overflow-hidden'>
        <img
          src={`http://localhost:8080/ipfs/${props.imageHash}`}
          alt={props.caption}
          className='bg-cover w-full h-full'
        />
      </div>
      <div className='p-2'>
        <div className='flex items-center gap-2 justify-between'>
          <div className='flex items-center cursor-pointer gap-2'>
            {hasElement(user.liked, props.id) ? (
              <AiFillHeart
                className='text-red text-xl'
                onClick={handleUnLike}
              />
            ) : (
              <AiOutlineHeart className='text-xl' onClick={handleLike} />
            )}
            {props.likes}
          </div>
          {props.shareable && props.owner.key !== wallet?.publicKey.toString() && (
            <button
              onClick={handleShare}
              className='p-1 px-4 flex items-center justify-center'>
              {sharing ? <LoadingSpinner /> : 'Share'}
            </button>
          )}
        </div>
        <div className='mt-3 mb-1'>{props.caption}</div>
      </div>
    </div>
  );
};
export default Post;
