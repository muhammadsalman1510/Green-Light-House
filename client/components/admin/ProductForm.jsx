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
const sectionHeadStyle = {
  fontFamily: 'var(--font-label)', fontSize: '11px',
  color: '#1C1C1C', letterSpacing: '0.05em',
  textTransform: 'uppercase', marginBottom: '12px', marginTop: '24px',
  paddingBottom: '8px', borderBottom: '0.5px solid #E8E8E8',
};

export default function ProductForm({ initialData, productId }) {
  const router = useRouter();
  const isEdit = !!productId;

  const [name, setName] = useState(initialData?.name || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [slugEdited, setSlugEdited] = useState(isEdit);
  const [sku, setSku] = useState(initialData?.sku || '');
  const [category, setCategory] = useState(initialData?.category?._id || initialData?.category || '');
  const [price, setPrice] = useState(initialData?.price || '');
  const [salePrice, setSalePrice] = useState(initialData?.salePrice || '');
  const [stockStatus, setStockStatus] = useState(initialData?.stockStatus || 'inStock');
  const [isFeatured, setIsFeatured] = useState(initialData?.isFeatured || false);
  const [isNewArrival, setIsNewArrival] = useState(initialData?.isNewArrival || false);
  const [isActive, setIsActive] = useState(initialData?.isActive ?? true);
  const [shortDesc, setShortDesc] = useState(initialData?.shortDesc || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [images, setImages] = useState(initialData?.images || []);
  const [specs, setSpecs] = useState({
    wattage: '', lumens: '', colorTemp: '', fitting: '',
    ipRating: '', dimensions: '', material: '', dimmable: false, warranty: '',
    ...(initialData?.specs || {}),
  });
  const [allCategories, setAllCategories] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    adminAPI.getAllCategories().then(setAllCategories).catch(() => {});
  }, []);

  useEffect(() => {
    if (!slugEdited) setSlug(slugify(name));
  }, [name, slugEdited]);

  const updateSpec = (key, value) => setSpecs((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    const payload = {
      name, slug, sku,
      category,
      price: Number(price),
      salePrice: salePrice ? Number(salePrice) : null,
      stockStatus, isFeatured, isNewArrival, isActive,
      shortDesc, description, images, specs,
    };

    try {
      if (isEdit) {
        await adminAPI.updateProduct(productId, payload);
      } else {
        await adminAPI.createProduct(payload);
      }
      router.push('/admin/products');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '720px' }}>
      {error && (
        <div style={{
          background: 'rgba(217,64,64,0.10)', color: '#D94040',
          padding: '10px 14px', borderRadius: '6px', marginBottom: '16px',
          fontFamily: 'var(--font-body)', fontSize: '13px',
        }}>
          {error}
        </div>
      )}

      {/* Basic Info */}
      <p style={sectionHeadStyle}>Basic Information</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        <div>
          <label style={labelStyle}>Product Name *</label>
          <input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label style={labelStyle}>SKU</label>
          <input style={inputStyle} value={sku} onChange={(e) => setSku(e.target.value)} placeholder="GLH-001" />
        </div>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={labelStyle}>URL Slug *</label>
        <input
          style={inputStyle}
          value={slug}
          onChange={(e) => { setSlug(slugify(e.target.value)); setSlugEdited(true); }}
          required
        />
        <p style={{ fontSize: '11px', color: '#999999', marginTop: '4px' }}>
          URL: greenlighthouse.pk/product/{slug || '…'}
        </p>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={labelStyle}>Category *</label>
        <select style={inputStyle} value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">— Select a category —</option>
          {allCategories.map((c) => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Pricing */}
      <p style={sectionHeadStyle}>Pricing & Stock</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        <div>
          <label style={labelStyle}>Price (PKR) *</label>
          <input style={inputStyle} type="number" min="0" value={price}
            onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div>
          <label style={labelStyle}>Sale Price (PKR)</label>
          <input style={inputStyle} type="number" min="0" value={salePrice}
            onChange={(e) => setSalePrice(e.target.value)} placeholder="Leave empty if no sale" />
        </div>
        <div>
          <label style={labelStyle}>Stock Status</label>
          <select style={inputStyle} value={stockStatus} onChange={(e) => setStockStatus(e.target.value)}>
            <option value="inStock">In Stock</option>
            <option value="limitedStock">Limited Stock</option>
            <option value="outOfStock">Out of Stock</option>
          </select>
        </div>
      </div>

      <div style={{ marginBottom: '16px', display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px' }}>Featured</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <input type="checkbox" checked={isNewArrival} onChange={(e) => setIsNewArrival(e.target.checked)} />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px' }}>New Arrival</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px' }}>Active</span>
        </label>
      </div>

      {/* Description */}
      <p style={sectionHeadStyle}>Description</p>

      <div style={{ marginBottom: '16px' }}>
        <label style={labelStyle}>Short Description</label>
        <textarea
          style={{ ...inputStyle, minHeight: '60px', resize: 'vertical' }}
          value={shortDesc}
          onChange={(e) => setShortDesc(e.target.value)}
          placeholder="One or two sentences shown on product cards"
        />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={labelStyle}>Full Description</label>
        <textarea
          style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Detailed product description"
        />
      </div>

      {/* Images */}
      <p style={sectionHeadStyle}>Images</p>
      <div style={{ marginBottom: '16px' }}>
        <ImageUploader images={images} onChange={setImages} maxImages={10} />
      </div>

      {/* Specs */}
      <p style={sectionHeadStyle}>Technical Specifications</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        {[
          { key: 'wattage', label: 'Wattage', placeholder: 'e.g. 12W' },
          { key: 'lumens', label: 'Lumens', placeholder: 'e.g. 1000lm' },
          { key: 'colorTemp', label: 'Colour Temp', placeholder: 'e.g. 3000K Warm White' },
          { key: 'fitting', label: 'Fitting / Base', placeholder: 'e.g. E27' },
          { key: 'ipRating', label: 'IP Rating', placeholder: 'e.g. IP44' },
          { key: 'dimensions', label: 'Dimensions', placeholder: 'e.g. Ø30cm × H45cm' },
          { key: 'material', label: 'Material', placeholder: 'e.g. Brass, Glass' },
          { key: 'warranty', label: 'Warranty', placeholder: 'e.g. 1 Year' },
        ].map(({ key, label, placeholder }) => (
          <div key={key}>
            <label style={labelStyle}>{label}</label>
            <input
              style={inputStyle}
              value={specs[key] || ''}
              onChange={(e) => updateSpec(key, e.target.value)}
              placeholder={placeholder}
            />
          </div>
        ))}
      </div>

      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={specs.dimmable || false}
            onChange={(e) => updateSpec('dimmable', e.target.checked)}
          />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px' }}>Dimmable</span>
        </label>
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="submit" disabled={saving} style={{
          background: '#1A4731', color: 'white', padding: '12px 28px',
          borderRadius: '4px', border: 'none', fontFamily: 'var(--font-label)',
          fontSize: '12px', letterSpacing: '0.08em', cursor: saving ? 'not-allowed' : 'pointer',
          opacity: saving ? 0.6 : 1,
        }}>
          {saving ? 'Saving…' : isEdit ? 'Update Product' : 'Create Product'}
        </button>
        <button type="button" onClick={() => router.push('/admin/products')} style={{
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
