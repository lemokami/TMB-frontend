import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/router';
import { FC, ReactNode, useEffect } from 'react';

const PrivateRoute: FC<{ children: ReactNode }> = ({ children }) => {
  const wallet = useAnchorWallet();
  const router = useRouter();

  useEffect(() => {
    if (!wallet) {
      router.push('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet]);

  return <>{children}</>;
};
export default PrivateRoute;
