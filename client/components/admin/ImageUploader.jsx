import { useState, useRef } from 'react';
import Image from 'next/image';
import { adminAPI } from '../../lib/api';

export default function ImageUploader({ images, onChange, maxImages = 10 }) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > maxImages) {
      alert(`Maximum ${maxImages} images allowed.`);
      return;
    }

    setUploading(true);
    const newUrls = [];
    for (const file of files) {
      try {
        const result = await adminAPI.uploadImage(file);
        newUrls.push(result.url);
      } catch (err) {
        alert(`Upload failed for ${file.name}: ${err.message}`);
      }
    }
    onChange([...images, ...newUrls]);
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeImage = (index) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))',
        gap: '10px', marginBottom: '12px',
      }}>
        {images.map((url, i) => (
          <div key={i} style={{
            position: 'relative', aspectRatio: '1/1',
            borderRadius: '6px', overflow: 'hidden',
            border: '0.5px solid #E8E8E8',
          }}>
            <Image src={url} alt={`Image ${i + 1}`} fill style={{ objectFit: 'cover' }} unoptimized />
            <button
              onClick={() => removeImage(i)}
              type="button"
              style={{
                position: 'absolute', top: '4px', right: '4px',
                width: '20px', height: '20px', borderRadius: '50%',
                background: 'rgba(0,0,0,0.60)', border: 'none',
                color: 'white', fontSize: '14px', lineHeight: 1, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              ×
            </button>
            {i === 0 && (
              <span style={{
                position: 'absolute', bottom: '4px', left: '4px',
                background: '#1A4731', color: 'white', fontSize: '8px',
                padding: '2px 6px', borderRadius: '2px',
                fontFamily: 'var(--font-label)', letterSpacing: '0.05em',
              }}>
                MAIN
              </span>
            )}
          </div>
        ))}

        {images.length < maxImages && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            style={{
              aspectRatio: '1/1', borderRadius: '6px',
              border: '1.5px dashed #E8E8E8',
              background: '#F8F7F4', cursor: uploading ? 'not-allowed' : 'pointer',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '4px',
              opacity: uploading ? 0.6 : 1,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#999' }}>
              {uploading ? 'Uploading…' : 'Add'}
            </span>
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />

      <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#999999', margin: 0 }}>
        {images.length} / {maxImages} images — first image is the main display image
      </p>
    </div>
  );
}
