/* eslint-disable @next/next/no-img-element */
import { FC } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';

type PostType = {
  id?: string | number;
  imageUrl: string;
  caption: string;
  author: string;
  shareable: boolean;
  likes: number;
  likeAction: () => void;
};
const Post: FC<PostType> = (props) => {
  return (
    <div className='flex flex-col border border-light-gray rounded'>
      <div className='p-2'>{props.author}</div>
      <div className=' w-full overflow-hidden'>
        <img
          src={process.env.NEXT_PUBLIC_API_URL + '/' + props.imageUrl}
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
          {props.shareable && (
            <button
              onClick={(e) => console.log('share++')}
              className='p-1 px-4'>
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
