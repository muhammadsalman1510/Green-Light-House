import '../styles/globals.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { DarkModeProvider } from '../context/DarkModeContext';
import { CartProvider } from '../context/CartContext';
import { AdminProvider } from '../context/AdminContext';
import Layout from '../components/layout/Layout';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isAdminPage = router.pathname.startsWith('/admin');

  useEffect(() => {
    const html = document.documentElement;
    if (isAdminPage) {
      html.setAttribute('data-was-dark', html.classList.contains('dark'));
      html.classList.remove('dark');
    } else {
      const wasDark = html.getAttribute('data-was-dark') === 'true'
        || localStorage.getItem('glh-theme') === 'dark';
      if (wasDark) html.classList.add('dark');
      html.removeAttribute('data-was-dark');
    }
  }, [isAdminPage]);

  return (
    <DarkModeProvider>
      <CartProvider>
        {isAdminPage ? (
          <AdminProvider>
            <Component {...pageProps} />
          </AdminProvider>
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </CartProvider>
    </DarkModeProvider>
  );
}
