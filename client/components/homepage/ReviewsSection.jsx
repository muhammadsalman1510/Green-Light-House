import StarRating from '../ui/StarRating';

export default function ReviewsSection({ reviews }) {
  return (
    <section style={{ background: 'var(--clr-surface)', padding: '56px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>

        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: '12px' }}>
          <p style={{
            fontSize: '9px',
            color: '#C9A84C',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-label)',
            fontWeight: 500,
            margin: '0 0 8px',
          }}>
            Testimonials
          </p>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(20px, 3vw, 28px)',
            fontWeight: 400,
            color: 'var(--clr-text-primary)',
            margin: '0 0 8px',
          }}>
            What Our Customers Say
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            color: 'var(--clr-text-secondary)',
            margin: 0,
          }}>
            4.9 out of 5 · 120+ Verified Reviews
          </p>
        </div>

        {/* Review cards — auto grid (stacked mobile, 3-col desktop) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px',
          marginTop: '32px',
        }}>
          {reviews.map((review) => (
            <div
              key={review._id}
              style={{
                background: 'var(--clr-page-bg)',
                borderRadius: '6px',
                padding: '16px 16px 16px 14px',
                borderLeft: '3px solid #C9A84C',
              }}
            >
              <div style={{ marginBottom: '8px' }}>
                <StarRating rating={review.rating} size="sm" />
              </div>

              {review.title && (
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  fontSize: '13px',
                  color: 'var(--clr-text-primary)',
                  margin: '0 0 6px',
                }}>
                  {review.title}
                </p>
              )}

              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                color: 'var(--clr-text-secondary)',
                fontStyle: 'italic',
                lineHeight: 1.7,
                margin: '0 0 10px',
              }}>
                &ldquo;{review.body}&rdquo;
              </p>

              <p style={{
                fontFamily: 'var(--font-label)',
                fontSize: '9px',
                fontWeight: 500,
                color: 'var(--clr-text-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                margin: 0,
              }}>
                {review.name} — {review.city}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
