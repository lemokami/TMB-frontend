/* eslint-disable @next/next/no-img-element */
import { AnchorWallet, useAnchorWallet } from '@solana/wallet-adapter-react';
import { FC } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { AXIOS } from '../helpers/axios';
import { sharePostContract } from '../helpers/contract';
import { dbUser } from '../types/User';

type PostType = {
  id?: string | number;
  imageUrl: string;
  caption: string;
  author: string;
  shareable: boolean;
  likes: number;
  likeAction: () => void;
  owner: dbUser;
  imageHash: string;
  pid: string;
};
const Post: FC<PostType> = (props) => {
  const wallet = useAnchorWallet();

  const handleShare = async () => {
    await sharePostContract(wallet as AnchorWallet, props.pid);

    await AXIOS.post('/share/post', {
      pid: props.pid,
      sharer_id: JSON.parse(sessionStorage.getItem('user') + '')._id,
    });
  };
  return (
    <div className='flex flex-col border border-light-gray rounded'>
      <div className='p-2'>{props.author}</div>
      <div className=' w-full overflow-hidden'>
        <img
          src={`http://localhost:8080/ipfs/${props.imageHash}`}
          alt={props.caption}
          className='bg-cover w-full h-full'
        />
      </div>
      <div className='p-2'>
        <div className='flex items-center gap-2 justify-between'>
          <div
            onClick={props.likeAction}
            className='flex items-center cursor-pointer gap-2'>
            <AiOutlineHeart className='text-xl' />
            {props.likes}
          </div>
          {props.shareable && props.owner.key !== wallet?.publicKey.toString() && (
            <button onClick={handleShare} className='p-1 px-4'>
              Share
            </button>
          )}
        </div>
        <div className='mt-3 mb-1'>{props.caption}</div>
      </div>
    </div>
  );
};
export default Post;
