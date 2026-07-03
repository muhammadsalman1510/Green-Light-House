import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import AdminLayout from '../../components/admin/AdminLayout';
import StatCard from '../../components/admin/StatCard';
import { adminAPI } from '../../lib/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, new: 0, processing: 0, completed: 0 });
  const [pendingReviews, setPendingReviews] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      adminAPI.getOrderStats(),
      adminAPI.getPendingReviews(),
      adminAPI.getAllProducts(),
    ]).then(([orderStats, reviews, products]) => {
      setStats(orderStats || {});
      setPendingReviews(Array.isArray(reviews) ? reviews.length : 0);
      setProductCount(products?.total ?? products?.products?.length ?? 0);
    }).catch((err) => {
      console.error('[Dashboard]', err.message);
    }).finally(() => setLoading(false));
  }, []);

  const quickActions = [
    { label: '+ Add Product',    href: '/admin/products/new' },
    { label: '+ Add Category',   href: '/admin/categories/new' },
    { label: 'View Orders',      href: '/admin/orders' },
    { label: 'Pending Reviews',  href: '/admin/reviews' },
  ];

  return (
    <>
      <Head><title>Dashboard | Admin | Green Light House</title></Head>
      <AdminLayout title="Dashboard">

        {loading ? (
          <p style={{ fontFamily: 'var(--font-body)', color: '#999999' }}>Loading…</p>
        ) : (
          <>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px', marginBottom: '32px',
            }}>
              <StatCard
                label="Total Orders" value={stats.total ?? 0} accent="#1A4731"
                icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/></svg>}
              />
              <StatCard
                label="New Orders" value={stats.new ?? 0} accent="#C9A84C"
                icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>}
              />
              <StatCard
                label="Products" value={productCount} accent="#1A4731"
                icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>}
              />
              <StatCard
                label="Pending Reviews" value={pendingReviews} accent="#B45309"
                icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>}
              />
            </div>

            <div style={{
              background: 'white', borderRadius: '8px', padding: '24px',
              border: '0.5px solid #E8E8E8',
            }}>
              <h2 style={{
                fontFamily: 'var(--font-heading)', fontSize: '18px',
                color: '#1C1C1C', marginBottom: '16px',
              }}>
                Quick Actions
              </h2>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {quickActions.map((action) => (
                  <Link key={action.href} href={action.href} style={{
                    padding: '10px 18px', borderRadius: '4px',
                    border: '1px solid #1A4731', color: '#1A4731',
                    fontFamily: 'var(--font-label)', fontSize: '11px',
                    letterSpacing: '0.05em', textDecoration: 'none',
                    transition: 'all 150ms ease',
                  }}>
                    {action.label}
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </AdminLayout>
    </>
  );
}
