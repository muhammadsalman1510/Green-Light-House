import '../styles/globals.css';
import { useRouter } from 'next/router';
import { DarkModeProvider } from '../context/DarkModeContext';
import { CartProvider } from '../context/CartContext';
import Layout from '../components/layout/Layout';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isAdminPage = router.pathname.startsWith('/admin');

  return (
    <DarkModeProvider>
      <CartProvider>
        {isAdminPage ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </CartProvider>
    </DarkModeProvider>
  );
}
