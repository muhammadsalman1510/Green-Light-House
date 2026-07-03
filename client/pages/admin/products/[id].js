import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import AdminLayout from '../../../components/admin/AdminLayout';
import ProductForm from '../../../components/admin/ProductForm';
import { adminAPI } from '../../../lib/api';

export default function EditProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    adminAPI.getAllProducts().then((data) => {
      const list = data?.products || [];
      const found = list.find((p) => p._id?.toString() === id);
      if (found) {
        setProduct(found);
      } else {
        setNotFound(true);
      }
    }).catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <>
      <Head><title>Edit Product | Admin | Green Light House</title></Head>
      <AdminLayout title="Edit Product">
        {loading && <p style={{ fontFamily: 'var(--font-body)', color: '#999999' }}>Loading…</p>}
        {!loading && notFound && <p>Product not found.</p>}
        {!loading && product && <ProductForm initialData={product} productId={id} />}
      </AdminLayout>
    </>
  );
}
