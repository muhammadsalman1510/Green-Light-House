import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ImageUploader from './ImageUploader';
import { adminAPI } from '../../lib/api';

function slugify(text) {
  return text.toLowerCase().trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function CategoryForm({ initialData, categoryId }) {
  const router = useRouter();
  const isEdit = !!categoryId;

  const [name, setName] = useState(initialData?.name || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(isEdit);
  const [description, setDescription] = useState(initialData?.description || '');
  const [image, setImage] = useState(initialData?.image || null);
  const [parent, setParent] = useState(initialData?.parent?._id || initialData?.parent || '');
  const [bgColor, setBgColor] = useState(initialData?.bgColor || '#0E1A0B');
  const [isActive, setIsActive] = useState(initialData?.isActive ?? true);
  const [allCategories, setAllCategories] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    adminAPI.getAllCategories().then((cats) => {
      setAllCategories(cats.filter((c) => c._id !== categoryId));
    }).catch(() => {});
  }, [categoryId]);

  useEffect(() => {
    if (!slugManuallyEdited) setSlug(slugify(name));
  }, [name, slugManuallyEdited]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    const payload = {
      name, slug, description,
      image: image || null,
      parent: parent || null,
      bgColor, isActive,
    };
    try {
      if (isEdit) {
        await adminAPI.updateCategory(categoryId, payload);
      } else {
        await adminAPI.createCategory(payload);
      }
      router.push('/admin/categories');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '10px 14px',
    border: '0.5px solid #E8E8E8', borderRadius: '4px',
    fontFamily: 'var(--font-body)', fontSize: '14px', outline: 'none',
    color: '#1C1C1C', background: '#FFFFFF', boxSizing: 'border-box',
  };
  const labelStyle = {
    display: 'block', fontFamily: 'var(--font-label)', fontSize: '11px',
    fontWeight: 600, color: '#1C1C1C', letterSpacing: '0.05em',
    textTransform: 'uppercase', marginBottom: '6px',
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '640px' }}>
      {error && (
        <div style={{
          background: 'rgba(217,64,64,0.10)', color: '#D94040',
          padding: '10px 14px', borderRadius: '6px', marginBottom: '16px',
          fontFamily: 'var(--font-body)', fontSize: '13px',
        }}>
          {error}
        </div>
      )}

      <div style={{ marginBottom: '16px' }}>
        <label style={labelStyle}>Category Name *</label>
        <input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} required />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={labelStyle}>URL Slug *</label>
        <input
          style={inputStyle}
          value={slug}
          onChange={(e) => { setSlug(slugify(e.target.value)); setSlugManuallyEdited(true); }}
          required
        />
        <p style={{ fontSize: '11px', color: '#999999', marginTop: '4px' }}>
          URL: greenlighthouse.pk/category/{slug || '…'}
        </p>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={labelStyle}>Parent Category</label>
        <select style={inputStyle} value={parent} onChange={(e) => setParent(e.target.value)}>
          <option value="">— Top Level (no parent) —</option>
          {allCategories.map((c) => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={labelStyle}>Description</label>
        <textarea
          style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={labelStyle}>Category Image</label>
        <ImageUploader
          images={image ? [image] : []}
          onChange={(imgs) => setImage(imgs[0] || null)}
          maxImages={1}
        />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={labelStyle}>Placeholder Background Color</label>
        <input
          type="color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
          style={{
            width: '60px', height: '36px',
            border: '0.5px solid #E8E8E8', borderRadius: '4px', cursor: 'pointer',
          }}
        />
      </div>

      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px' }}>
            Active (visible on website)
          </span>
        </label>
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="submit" disabled={saving} style={{
          background: '#1A4731', color: 'white', padding: '12px 28px',
          borderRadius: '4px', border: 'none', fontFamily: 'var(--font-label)',
          fontSize: '12px', letterSpacing: '0.08em', cursor: saving ? 'not-allowed' : 'pointer',
          opacity: saving ? 0.6 : 1,
        }}>
          {saving ? 'Saving…' : isEdit ? 'Update Category' : 'Create Category'}
        </button>
        <button type="button" onClick={() => router.push('/admin/categories')} style={{
          background: 'white', color: '#6B6B6B', padding: '12px 28px',
          borderRadius: '4px', border: '1px solid #E8E8E8',
          fontFamily: 'var(--font-label)', fontSize: '12px', cursor: 'pointer',
        }}>
          Cancel
        </button>
      </div>
    </form>
  );
}
