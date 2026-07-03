import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAdmin } from '../../context/AdminContext';

export default function AdminGuard({ children }) {
  const { admin, loading } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !admin) {
      router.push('/admin/login');
    }
  }, [loading, admin, router]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        background: '#0E0E0E',
      }}>
        <p style={{ color: 'white', fontFamily: 'var(--font-label)', fontSize: '13px' }}>
          Loading...
        </p>
      </div>
    );
  }

  if (!admin) return null;

  return children;
}
