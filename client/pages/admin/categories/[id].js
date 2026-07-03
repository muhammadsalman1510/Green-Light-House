import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import AdminLayout from '../../../components/admin/AdminLayout';
import CategoryForm from '../../../components/admin/CategoryForm';
import { adminAPI } from '../../../lib/api';

export default function EditCategoryPage() {
  const router = useRouter();
  const { id } = router.query;
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    adminAPI.getAllCategories().then((cats) => {
      const found = cats.find((c) => c._id?.toString() === id);
      if (found) {
        setCategory(found);
      } else {
        setNotFound(true);
      }
    }).catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <>
      <Head><title>Edit Category | Admin | Green Light House</title></Head>
      <AdminLayout title="Edit Category">
        {loading && <p style={{ fontFamily: 'var(--font-body)', color: '#999999' }}>Loading…</p>}
        {!loading && notFound && <p>Category not found.</p>}
        {!loading && category && <CategoryForm initialData={category} categoryId={id} />}
      </AdminLayout>
    </>
  );
}
