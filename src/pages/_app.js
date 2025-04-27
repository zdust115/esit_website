import '../styles/globals.css';
import Navbar from '../components/navbar';
import { SessionProvider } from 'next-auth/react';

export default function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Navbar />               
      <Component {...pageProps} />
    </SessionProvider>
  );
}