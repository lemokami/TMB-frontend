import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useRouter } from 'next/router';
import { FC, ReactNode } from 'react';

const Navbar: FC<{ children?: ReactNode; wallet?: boolean }> = ({
  children,
  wallet,
}) => {
  const router = useRouter();
  return (
    <div className='p-8 py-4 flex justify-between items-center'>
      <h3
        onClick={() => router.push('/')}
        className='font-bold text-lg cursor-pointer'>
        TrustMeBro
      </h3>
      <div className='flex items-center gap-2'>
        {children}
        {wallet && <WalletMultiButton />}
      </div>
    </div>
  );
};
export default Navbar;
