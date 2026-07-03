import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import AdminLayout from '../../../components/admin/AdminLayout';
import AdminTable from '../../../components/admin/AdminTable';
import ConfirmDialog from '../../../components/admin/ConfirmDialog';
import { adminAPI } from '../../../lib/api';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const load = () => {
    setLoading(true);
    adminAPI.getAllCategories()
      .then((data) => {
        const active = (data || []).filter((c) => c.isActive !== false);
        setCategories(active);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async () => {
    try {
      await adminAPI.deleteCategory(deleteTarget._id.toString());
      setDeleteTarget(null);
      load();
    } catch (err) {
      alert(err.message);
      setDeleteTarget(null);
    }
  };

  const categoryMap = Object.fromEntries(categories.map((c) => [c._id, c.name]));

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'slug', label: 'Slug' },
    {
      key: 'parent', label: 'Parent',
      render: (item) => {
        const parentId = item.parent?._id || item.parent;
        return parentId ? (categoryMap[parentId] || '—') : 'Top Level';
      },
    },
    {
      key: 'actions', label: '',
      render: (item) => (
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link href={`/admin/categories/${item._id?.toString()}`}
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
      <Head><title>Categories | Admin | Green Light House</title></Head>
      <AdminLayout title="Categories">

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
          <Link href="/admin/categories/new" style={{
            background: '#1A4731', color: 'white', padding: '10px 20px',
            borderRadius: '4px', fontFamily: 'var(--font-label)',
            fontSize: '11px', letterSpacing: '0.05em', textDecoration: 'none',
          }}>
            + Add Category
          </Link>
        </div>

        {loading ? (
          <p style={{ fontFamily: 'var(--font-body)', color: '#999999' }}>Loading…</p>
        ) : (
          <AdminTable
            columns={columns}
            data={categories}
            emptyMessage="No categories yet. Click + Add Category to create your first one."
          />
        )}

        <ConfirmDialog
          isOpen={!!deleteTarget}
          title="Delete Category"
          message={`Are you sure you want to delete "${deleteTarget?.name}"? It will be hidden from the website and admin panel.`}
          confirmLabel="Yes, Delete"
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      </AdminLayout>
    </>
  );
}
