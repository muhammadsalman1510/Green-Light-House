import Head from 'next/head';
import AdminLayout from '../../../components/admin/AdminLayout';
import ProductForm from '../../../components/admin/ProductForm';

export default function NewProductPage() {
  return (
    <>
      <Head><title>Add Product | Admin | Green Light House</title></Head>
      <AdminLayout title="Add New Product">
        <ProductForm />
      </AdminLayout>
    </>
  );
}
