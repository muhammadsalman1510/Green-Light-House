import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

export default function ImageGallery({ images, productName }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const hasImages = images && images.length > 0;

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const prevImage = useCallback(() => {
    setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  }, [images]);

  const nextImage = useCallback(() => {
    setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  }, [images]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxOpen, closeLightbox, prevImage, nextImage]);

  if (!hasImages) {
    return (
      <div style={{
        width: '100%',
        aspectRatio: '1/1',
        background: '#E8E4DC',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        borderRadius: '8px',
      }}>
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none"
             stroke="#C4C0B6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V8l-5-5z"/>
          <path d="M9 3v5h5M12 12l-3 3 3 3M15 12h-3"/>
          <circle cx="12" cy="10" r="2"/>
          <path d="M3 9h4l2-3h6l2 3h4"/>
        </svg>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#999', margin: 0 }}>
          No image available
        </p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .glh-main-swiper { height: 100% !important; }
        .glh-main-swiper .swiper-wrapper { height: 100% !important; }
        .glh-main-swiper .swiper-slide { height: 100% !important; }
        .swiper-slide-thumb-active .thumb-img {
          border-color: #1A4731 !important;
          opacity: 1 !important;
        }
        .thumb-img { opacity: 0.6; transition: opacity 200ms ease; }
        .glh-main-swiper .swiper-button-next,
        .glh-main-swiper .swiper-button-prev {
          color: white !important;
          background: rgba(0,0,0,0.35);
          width: 36px !important;
          height: 36px !important;
          border-radius: 50%;
        }
        .glh-main-swiper .swiper-button-next::after,
        .glh-main-swiper .swiper-button-prev::after {
          font-size: 14px !important;
        }
      `}</style>

      {/* Outer wrapper controls the aspect ratio */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', borderRadius: '8px', overflow: 'hidden', background: '#E8E4DC' }}>
        <Swiper
          className="glh-main-swiper"
          modules={[Navigation, Thumbs, FreeMode]}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          navigation={images.length > 1}
          spaceBetween={0}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          style={{ position: 'absolute', inset: 0, height: '100%' }}
        >
          {images.map((src, i) => (
            <SwiperSlide key={i}>
              <div
                style={{ position: 'relative', width: '100%', height: '100%', cursor: 'zoom-in' }}
                onClick={() => { setActiveIndex(i); setLightboxOpen(true); }}
              >
                <Image
                  src={src}
                  alt={`${productName} — image ${i + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority={i === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          modules={[FreeMode, Thumbs]}
          spaceBetween={8}
          slidesPerView={Math.min(images.length, 5)}
          freeMode={true}
          watchSlidesProgress={true}
          style={{ marginTop: '10px', height: '64px' }}
        >
          {images.map((src, i) => (
            <SwiperSlide key={i} style={{ cursor: 'pointer' }}>
              <div
                className="thumb-img"
                style={{
                  width: '100%',
                  height: '64px',
                  position: 'relative',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  border: '2px solid transparent',
                }}
              >
                <Image
                  src={src}
                  alt={`${productName} thumbnail ${i + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.92)',
            zIndex: 9998,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={closeLightbox}
        >
          <div
            style={{ position: 'relative', width: '90vw', height: '90vh', maxWidth: '1000px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[activeIndex]}
              alt={`${productName} — ${activeIndex + 1}`}
              fill
              style={{ objectFit: 'contain' }}
            />

            {/* Close */}
            <button
              onClick={closeLightbox}
              aria-label="Close"
              style={{
                position: 'absolute', top: '16px', right: '16px',
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)', border: 'none',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>

            {/* Prev */}
            {images.length > 1 && (
              <button
                onClick={prevImage}
                aria-label="Previous image"
                style={{
                  position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
                  width: '40px', height: '40px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.15)', border: 'none',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
            )}

            {/* Next */}
            {images.length > 1 && (
              <button
                onClick={nextImage}
                aria-label="Next image"
                style={{
                  position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)',
                  width: '40px', height: '40px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.15)', border: 'none',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            )}

            {/* Counter */}
            <div style={{
              position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)',
              fontFamily: 'var(--font-label)', fontSize: '12px', color: 'rgba(255,255,255,0.70)',
              background: 'rgba(0,0,0,0.40)', padding: '4px 12px', borderRadius: '20px',
            }}>
              {activeIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
