import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { WalletContext } from '../hoc/WalletContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WalletContext>
      <Component {...pageProps} />
    </WalletContext>
  );
}

export default MyApp;
