import '../styles/globals.css';
import Navbar from '../components/navbar';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />               
      <Component {...pageProps} />
    </>
  );
}