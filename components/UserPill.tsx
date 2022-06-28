import { FC, useState } from 'react';

type UserPillProps = {
  name: string;
  address: string;
  isOwner?: boolean;
};
const UserPill: FC<UserPillProps> = ({ name, address, isOwner }) => {
  const [content, setContent] = useState(name);
  return (
    <div
      onMouseEnter={() => setContent(address)}
      onMouseLeave={() => setContent(name)}
      className='rounded p-2 py-4 border flex items-center justify-center relative cursor-pointer'>
      {isOwner && (
        <span className='absolute -top-4 -left-2 bg-black text-[#fff] text-sm rounded-md p-1 px-4'>
          Owner
        </span>
      )}
      {content}
    </div>
  );
};
export default UserPill;
