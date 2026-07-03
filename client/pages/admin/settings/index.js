import { useState, useEffect } from 'react';
import Head from 'next/head';
import AdminLayout from '../../../components/admin/AdminLayout';
import { adminAPI } from '../../../lib/api';

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
const sectionHead = {
  fontFamily: 'var(--font-label)', fontSize: '11px',
  color: '#1C1C1C', letterSpacing: '0.05em',
  textTransform: 'uppercase', marginBottom: '12px', marginTop: '24px',
  paddingBottom: '8px', borderBottom: '0.5px solid #E8E8E8',
};

export default function AdminSettingsPage() {
  const [form, setForm] = useState({
    storeName: '', tagline: '', address: '', phone: '',
    businessHours: '', deliveryPolicy: '', aboutText: '', mapEmbedUrl: '',
    socialLinks: { instagram: '', facebook: '', tiktok: '', youtube: '' },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    adminAPI.getSettings().then((data) => {
      setForm({
        storeName:      data.storeName || '',
        tagline:        data.tagline || '',
        address:        data.address || '',
        phone:          data.phone || '',
        businessHours:  data.businessHours || '',
        deliveryPolicy: data.deliveryPolicy || '',
        aboutText:      data.aboutText || '',
        mapEmbedUrl:    data.mapEmbedUrl || '',
        socialLinks: {
          instagram: data.socialLinks?.instagram || '',
          facebook:  data.socialLinks?.facebook || '',
          tiktok:    data.socialLinks?.tiktok || '',
          youtube:   data.socialLinks?.youtube || '',
        },
      });
    }).catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  const setSocial = (key, value) =>
    setForm((prev) => ({ ...prev, socialLinks: { ...prev.socialLinks, [key]: value } }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    setSaved(false);
    try {
      await adminAPI.updateSettings(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Head><title>Settings | Admin | Green Light House</title></Head>
      <AdminLayout title="Store Settings">

        {loading ? (
          <p style={{ fontFamily: 'var(--font-body)', color: '#999999' }}>Loading…</p>
        ) : (
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

            {saved && (
              <div style={{
                background: 'rgba(26,71,49,0.10)', color: '#1A4731',
                padding: '10px 14px', borderRadius: '6px', marginBottom: '16px',
                fontFamily: 'var(--font-body)', fontSize: '13px',
              }}>
                Settings saved successfully.
              </div>
            )}

            {/* Store Info */}
            <p style={sectionHead}>Store Information</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={labelStyle}>Store Name</label>
                <input style={inputStyle} value={form.storeName} onChange={(e) => set('storeName', e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Phone</label>
                <input style={inputStyle} value={form.phone} onChange={(e) => set('phone', e.target.value)} />
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Tagline</label>
              <input style={inputStyle} value={form.tagline} onChange={(e) => set('tagline', e.target.value)} />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Address</label>
              <textarea
                style={{ ...inputStyle, minHeight: '70px', resize: 'vertical' }}
                value={form.address}
                onChange={(e) => set('address', e.target.value)}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Business Hours</label>
              <input style={inputStyle} value={form.businessHours} onChange={(e) => set('businessHours', e.target.value)}
                placeholder="e.g. Monday – Saturday, 10:00 AM – 8:00 PM" />
            </div>

            {/* Content */}
            <p style={sectionHead}>Content</p>

            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>About Text</label>
              <textarea
                style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
                value={form.aboutText}
                onChange={(e) => set('aboutText', e.target.value)}
                placeholder="Text shown on the About page"
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Delivery Policy</label>
              <textarea
                style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
                value={form.deliveryPolicy}
                onChange={(e) => set('deliveryPolicy', e.target.value)}
                placeholder="Delivery terms shown in FAQ / footer"
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Google Maps Embed URL</label>
              <input style={inputStyle} value={form.mapEmbedUrl}
                onChange={(e) => set('mapEmbedUrl', e.target.value)}
                placeholder="https://maps.google.com/maps?..." />
            </div>

            {/* Social */}
            <p style={sectionHead}>Social Links</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              {[
                { key: 'instagram', label: 'Instagram' },
                { key: 'facebook',  label: 'Facebook' },
                { key: 'tiktok',    label: 'TikTok' },
                { key: 'youtube',   label: 'YouTube' },
              ].map(({ key, label }) => (
                <div key={key}>
                  <label style={labelStyle}>{label}</label>
                  <input style={inputStyle} value={form.socialLinks[key]}
                    onChange={(e) => setSocial(key, e.target.value)} />
                </div>
              ))}
            </div>

            <button type="submit" disabled={saving} style={{
              background: '#1A4731', color: 'white', padding: '12px 32px',
              borderRadius: '4px', border: 'none', fontFamily: 'var(--font-label)',
              fontSize: '12px', letterSpacing: '0.08em', cursor: saving ? 'not-allowed' : 'pointer',
              opacity: saving ? 0.6 : 1,
            }}>
              {saving ? 'Saving…' : 'Save Settings'}
            </button>
          </form>
        )}
      </AdminLayout>
    </>
  );
}
