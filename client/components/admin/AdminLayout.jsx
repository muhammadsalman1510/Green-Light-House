import AdminGuard from './AdminGuard';
import AdminSidebar from './AdminSidebar';

export default function AdminLayout({ children, title }) {
  return (
    <AdminGuard>
      <div style={{ display: 'flex', minHeight: '100vh', background: '#F8F7F4' }}>
        <AdminSidebar />
        <main style={{ flex: 1, marginLeft: '240px', padding: '32px 36px', minWidth: 0 }}>
          {title && (
            <h1 style={{
              fontFamily: 'var(--font-heading)', fontSize: '26px',
              fontWeight: 400, color: '#1C1C1C', marginBottom: '24px',
            }}>
              {title}
            </h1>
          )}
          {children}
        </main>
      </div>
    </AdminGuard>
  );
}
