import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import AdminLayout from '../../../components/admin/AdminLayout';
import AdminTable from '../../../components/admin/AdminTable';
import ConfirmDialog from '../../../components/admin/ConfirmDialog';
import { adminAPI } from '../../../lib/api';

const stockColors = {
  inStock:      { bg: 'rgba(26,71,49,0.10)',  color: '#1A4731' },
  limitedStock: { bg: 'rgba(180,83,9,0.10)',  color: '#B45309' },
  outOfStock:   { bg: 'rgba(217,64,64,0.10)', color: '#D94040' },
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [search, setSearch] = useState('');

  const load = () => {
    setLoading(true);
    adminAPI.getAllProducts()
      .then((data) => {
        const active = (data?.products || []).filter((p) => p.isActive !== false);
        setProducts(active);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async () => {
    try {
      await adminAPI.deleteProduct(deleteTarget._id.toString());
      setDeleteTarget(null);
      load();
    } catch (err) {
      alert(err.message);
      setDeleteTarget(null);
    }
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      key: 'image', label: '',
      render: (item) => (
        <div style={{
          width: '40px', height: '40px', borderRadius: '4px',
          overflow: 'hidden', background: '#E8E4DC', position: 'relative', flexShrink: 0,
        }}>
          {item.images?.[0] && (
            <Image src={item.images[0]} alt={item.name} fill style={{ objectFit: 'cover' }} unoptimized />
          )}
        </div>
      ),
    },
    { key: 'name', label: 'Name' },
    { key: 'category', label: 'Category', render: (item) => item.category?.name || '—' },
    { key: 'price', label: 'Price', render: (item) => `PKR ${item.price.toLocaleString('en-PK')}` },
    {
      key: 'stockStatus', label: 'Stock',
      render: (item) => {
        const s = stockColors[item.stockStatus] || stockColors.outOfStock;
        return (
          <span style={{
            padding: '3px 10px', borderRadius: '20px', fontSize: '10px',
            fontFamily: 'var(--font-label)', background: s.bg, color: s.color,
          }}>
            {item.stockStatus}
          </span>
        );
      },
    },
    {
      key: 'flags', label: 'Tags',
      render: (item) => (
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {item.isFeatured && <span style={{ background: 'rgba(201,168,76,0.15)', color: '#B8860B', padding: '2px 8px', borderRadius: '20px', fontSize: '9px', fontFamily: 'var(--font-label)' }}>Featured</span>}
          {item.isNewArrival && <span style={{ background: 'rgba(26,71,49,0.10)', color: '#1A4731', padding: '2px 8px', borderRadius: '20px', fontSize: '9px', fontFamily: 'var(--font-label)' }}>New</span>}
        </div>
      ),
    },
    {
      key: 'actions', label: '',
      render: (item) => (
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link href={`/admin/products/${item._id?.toString()}`}
            style={{ fontSize: '12px', color: '#1A4731', textDecoration: 'underline' }}>
            Edit
          </Link>
          <button
            onClick={(e) => { e.stopPropagation(); setDeleteTarget(item); }}
            style={{
              background: 'none', border: 'none', color: '#D94040',
              fontSize: '12px', cursor: 'pointer', textDecoration: 'underline', padding: 0,
            }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Head><title>Products | Admin | Green Light House</title></Head>
      <AdminLayout title="Products">

        <div style={{
          display: 'flex', justifyContent: 'space-between',
          marginBottom: '16px', gap: '12px', flexWrap: 'wrap',
        }}>
          <input
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: '10px 14px', border: '0.5px solid #E8E8E8',
              borderRadius: '4px', fontFamily: 'var(--font-body)',
              fontSize: '13px', minWidth: '240px', outline: 'none',
            }}
          />
          <Link href="/admin/products/new" style={{
            background: '#1A4731', color: 'white', padding: '10px 20px',
            borderRadius: '4px', fontFamily: 'var(--font-label)',
            fontSize: '11px', letterSpacing: '0.05em', textDecoration: 'none',
          }}>
            + Add Product
          </Link>
        </div>

        {loading ? (
          <p style={{ fontFamily: 'var(--font-body)', color: '#999999' }}>Loading…</p>
        ) : (
          <AdminTable columns={columns} data={filtered} emptyMessage="No products yet." />
        )}

        <ConfirmDialog
          isOpen={!!deleteTarget}
          title="Delete Product"
          message={`Are you sure you want to delete "${deleteTarget?.name}"? It will be hidden from the website and admin panel.`}
          confirmLabel="Yes, Delete"
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      </AdminLayout>
    </>
  );
}
