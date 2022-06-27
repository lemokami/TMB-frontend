import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';

const Login = () => {
  const wallet = useAnchorWallet();
  const router = useRouter();

  useEffect(() => {
    if (wallet) {
      // TODO: send signin request
      // redirect to home
      router.push('/user');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet]);

  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />
      <div className='flex flex-1 items-center justify-center'>
        <WalletMultiButton />
      </div>
    </div>
  );
};
export default Login;
