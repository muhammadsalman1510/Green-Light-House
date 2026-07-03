import { useState, useEffect } from 'react';
import StarRating from '../ui/StarRating';
import Skeleton from '../ui/Skeleton';
import { reviewsAPI } from '../../lib/api';

const STAR_PATH = 'M6 1l1.39 2.81L11 4.24l-2.5 2.43.59 3.43L6 8.5l-3.09 1.6.59-3.43L1 4.24l3.61-.43z';

function ClickableStar({ filled, onMouseEnter, onMouseLeave, onClick }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 12 12"
      style={{ cursor: 'pointer', flexShrink: 0 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <path d={STAR_PATH} fill={filled ? '#C9A84C' : '#E0DDD5'} />
    </svg>
  );
}

export default function ProductReviews({ productId, avgRating, reviewCount }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [form, setForm] = useState({ name: '', city: '', title: '', body: '' });

  useEffect(() => {
    if (!productId) return;
    reviewsAPI.getForProduct(productId)
      .then((data) => setReviews(data || []))
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  }, [productId]);

  const breakdown = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
    pct: reviews.length > 0
      ? Math.round((reviews.filter((r) => r.rating === star).length / reviews.length) * 100)
      : 0,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRating) return;
    setSubmitError('');
    try {
      await reviewsAPI.submit(productId, {
        name: form.name,
        city: form.city,
        rating: selectedRating,
        title: form.title,
        body: form.body,
      });
      setSubmitted(true);
      setForm({ name: '', city: '', title: '', body: '' });
      setSelectedRating(0);
    } catch (err) {
      setSubmitError(err.message || 'Failed to submit review. Please try again.');
    }
  };

  return (
    <div>
      <h2
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '24px',
          fontWeight: 400,
          color: 'var(--clr-text-primary)',
          marginBottom: '24px',
        }}
      >
        Customer Reviews
      </h2>

      {/* Rating summary */}
      <div
        style={{
          display: 'flex',
          gap: '32px',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          marginBottom: '32px',
          padding: '24px',
          background: 'var(--clr-surface)',
          borderRadius: '8px',
          border: '0.5px solid var(--clr-border)',
        }}
      >
        <div style={{ textAlign: 'center', minWidth: '80px' }}>
          <div
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '48px',
              fontWeight: 400,
              color: '#1A4731',
              lineHeight: 1,
              marginBottom: '8px',
            }}
          >
            {avgRating > 0 ? avgRating.toFixed(1) : '—'}
          </div>
          <StarRating rating={avgRating} size="md" />
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              color: 'var(--clr-text-secondary)',
              marginTop: '6px',
              whiteSpace: 'nowrap',
            }}
          >
            Based on {reviewCount} review{reviewCount !== 1 ? 's' : ''}
          </p>
        </div>

        <div style={{ flex: 1, minWidth: '180px' }}>
          {breakdown.map(({ star, pct }) => (
            <div
              key={star}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-label)',
                  fontSize: '11px',
                  color: 'var(--clr-text-secondary)',
                  width: '16px',
                  textAlign: 'right',
                  flexShrink: 0,
                }}
              >
                {star}★
              </span>
              <div
                style={{
                  flex: 1,
                  height: '6px',
                  background: 'var(--clr-border)',
                  borderRadius: '3px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${pct}%`,
                    background: '#C9A84C',
                    borderRadius: '3px',
                    transition: 'width 400ms ease',
                  }}
                />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-label)',
                  fontSize: '10px',
                  color: 'var(--clr-text-muted)',
                  width: '28px',
                  flexShrink: 0,
                }}
              >
                {pct}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Loading skeletons */}
      {loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
          {[1, 2].map((i) => (
            <div
              key={i}
              style={{
                background: 'var(--clr-surface)',
                borderRadius: '6px',
                padding: '16px',
                border: '0.5px solid var(--clr-border)',
                borderLeft: '3px solid #C9A84C',
              }}
            >
              <Skeleton width="80px" height="12px" style={{ marginBottom: '10px' }} />
              <Skeleton width="50%" height="13px" style={{ marginBottom: '8px' }} />
              <Skeleton width="100%" height="13px" style={{ marginBottom: '4px' }} />
              <Skeleton width="80%" height="13px" style={{ marginBottom: '12px' }} />
              <Skeleton width="120px" height="10px" />
            </div>
          ))}
        </div>
      )}

      {/* No reviews */}
      {!loading && reviews.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: '32px',
            background: 'var(--clr-page-bg)',
            borderRadius: '8px',
            border: '0.5px solid var(--clr-border)',
            marginBottom: '32px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: 'var(--clr-text-secondary)',
              margin: 0,
            }}
          >
            No reviews yet. Be the first to share your experience.
          </p>
        </div>
      )}

      {/* Review cards */}
      {!loading && reviews.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
          {reviews.map((review) => (
            <div
              key={review._id}
              style={{
                background: 'var(--clr-surface)',
                borderRadius: '6px',
                padding: '16px 16px 16px 14px',
                border: '0.5px solid var(--clr-border)',
                borderLeft: '3px solid #C9A84C',
              }}
            >
              <div style={{ marginBottom: '8px' }}>
                <StarRating rating={review.rating} size="sm" />
              </div>
              {review.title && (
                <p style={{
                  fontFamily: 'var(--font-body)', fontWeight: 500,
                  fontSize: '13px', color: 'var(--clr-text-primary)', margin: '0 0 6px',
                }}>
                  {review.title}
                </p>
              )}
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '13px',
                color: 'var(--clr-text-secondary)', fontStyle: 'italic',
                lineHeight: 1.7, margin: '0 0 10px',
              }}>
                &ldquo;{review.body}&rdquo;
              </p>
              <p style={{
                fontFamily: 'var(--font-label)', fontSize: '9px',
                fontWeight: 500, color: 'var(--clr-text-primary)',
                textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0,
              }}>
                {review.name}{review.city ? ` — ${review.city}` : ''}
              </p>
              {review.adminReply && (
                <div
                  style={{
                    marginTop: '10px',
                    padding: '10px 12px',
                    background: 'rgba(26,71,49,0.06)',
                    borderRadius: '4px',
                  }}
                >
                  <p style={{
                    fontFamily: 'var(--font-label)', fontSize: '9px', color: '#1A4731',
                    textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 4px',
                  }}>
                    Store Response
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: '12px',
                    color: 'var(--clr-text-secondary)', margin: 0, lineHeight: 1.6,
                  }}>
                    {review.adminReply}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Write a Review toggle */}
      {!submitted && (
        <button
          onClick={() => setShowForm((s) => !s)}
          style={{
            background: 'transparent',
            border: '1px solid #1A4731',
            color: '#1A4731',
            padding: '12px 24px',
            borderRadius: '2px',
            fontFamily: 'var(--font-label)',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.10em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            marginBottom: showForm ? '24px' : '0',
          }}
        >
          {showForm ? 'Cancel' : 'Write a Review'}
        </button>
      )}

      {/* Success message */}
      {submitted && (
        <div
          style={{
            padding: '16px',
            background: 'rgba(26,71,49,0.08)',
            borderRadius: '4px',
            border: '1px solid rgba(26,71,49,0.20)',
          }}
        >
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '14px',
            color: '#1A4731', margin: 0,
          }}>
            Thank you for your review. It will appear after approval.
          </p>
        </div>
      )}

      {/* Error message */}
      {submitError && (
        <div
          style={{
            padding: '12px 16px',
            background: 'rgba(180,83,9,0.08)',
            borderRadius: '4px',
            border: '1px solid rgba(180,83,9,0.20)',
            marginTop: '12px',
          }}
        >
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#B45309', margin: 0 }}>
            {submitError}
          </p>
        </div>
      )}

      {/* Review Form */}
      {showForm && !submitted && (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          <div>
            <label style={{
              fontFamily: 'var(--font-label)', fontSize: '11px',
              color: 'var(--clr-text-secondary)', display: 'block', marginBottom: '8px',
            }}>
              Your Rating <span style={{ color: '#C9A84C' }}>*</span>
            </label>
            <div style={{ display: 'flex', gap: '4px' }}>
              {[1, 2, 3, 4, 5].map((i) => (
                <ClickableStar
                  key={i}
                  filled={(hoverRating || selectedRating) >= i}
                  onMouseEnter={() => setHoverRating(i)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setSelectedRating(i)}
                />
              ))}
            </div>
            {!selectedRating && (
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#999', marginTop: '4px' }}>
                Click to select a rating
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label style={labelStyle}>
                Your Name <span style={{ color: '#C9A84C' }}>*</span>
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Ahmed K."
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>City</label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                placeholder="Lahore"
                style={inputStyle}
              />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Review Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="Summarise your experience"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>
              Your Review <span style={{ color: '#C9A84C' }}>*</span>
            </label>
            <textarea
              required
              minLength={10}
              rows={4}
              value={form.body}
              onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
              placeholder="Tell other customers what you think about this product..."
              style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
            />
          </div>

          <button
            type="submit"
            disabled={!selectedRating}
            style={{
              background: selectedRating ? '#1A4731' : '#CCCCCC',
              color: 'white',
              border: 'none',
              padding: '14px 28px',
              borderRadius: '2px',
              fontFamily: 'var(--font-label)',
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              cursor: selectedRating ? 'pointer' : 'not-allowed',
              alignSelf: 'flex-start',
              transition: 'background 200ms ease',
            }}
          >
            Submit Review
          </button>
        </form>
      )}
    </div>
  );
}

const labelStyle = {
  fontFamily: 'var(--font-label)',
  fontSize: '11px',
  color: 'var(--clr-text-secondary)',
  display: 'block',
  marginBottom: '6px',
};

const inputStyle = {
  width: '100%',
  fontFamily: 'var(--font-body)',
  fontSize: '13px',
  color: 'var(--clr-text-primary)',
  background: 'var(--clr-surface)',
  border: '0.5px solid var(--clr-border)',
  borderRadius: '3px',
  padding: '10px 12px',
  outline: 'none',
  boxSizing: 'border-box',
};
