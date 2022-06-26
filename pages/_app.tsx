import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { WalletContext } from '../components/WalletContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WalletContext>
      <Component {...pageProps} />
    </WalletContext>
  );
}

export default MyApp;
