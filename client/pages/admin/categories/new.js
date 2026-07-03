import Head from 'next/head';
import AdminLayout from '../../../components/admin/AdminLayout';
import CategoryForm from '../../../components/admin/CategoryForm';

export default function NewCategoryPage() {
  return (
    <>
      <Head><title>Add Category | Admin | Green Light House</title></Head>
      <AdminLayout title="Add New Category">
        <CategoryForm />
      </AdminLayout>
    </>
  );
}
