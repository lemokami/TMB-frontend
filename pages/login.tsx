import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import Navbar from '../components/Navbar';
import { AXIOS } from '../helpers/axios';

const Login = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const wallet = useAnchorWallet();
  const router = useRouter();
  const createOrCheckUser = useMutation(
    () =>
      AXIOS.post('/signin', {
        key: wallet?.publicKey.toString(),
      }),
    {
      onSuccess: (data) => {
        setUser(data.data);
        setAuthenticated(true);
      },
    }
  );

  useEffect(() => {
    if (wallet) {
      createOrCheckUser.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet]);

  useEffect(() => {
    sessionStorage.clear();
    if (authenticated) {
      sessionStorage.setItem('user', JSON.stringify(user));
      if (user.completed_profile === false) {
        router.push('/new/profile');
      } else {
        router.push('/');
      }
    }
  }, [authenticated, router, user]);

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
