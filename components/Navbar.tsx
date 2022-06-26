import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { FC, ReactNode } from 'react';

const Navbar: FC<{ children?: ReactNode; wallet?: boolean }> = ({
  children,
  wallet,
}) => {
  return (
    <div className='p-8 py-4 flex justify-between items-center'>
      <h3 className='font-bold text-lg'>TrustMeBro</h3>
      <div className='flex items-center gap-2'>
        {children}
        {wallet && <WalletMultiButton />}
      </div>
    </div>
  );
};
export default Navbar;
