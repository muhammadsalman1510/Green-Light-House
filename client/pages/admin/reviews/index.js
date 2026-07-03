import { useState, useEffect } from 'react';
import Head from 'next/head';
import AdminLayout from '../../../components/admin/AdminLayout';
import ConfirmDialog from '../../../components/admin/ConfirmDialog';
import { adminAPI } from '../../../lib/api';

const STAR_PATH = 'M6 1l1.39 2.81L11 4.24l-2.5 2.43.59 3.43L6 8.5l-3.09 1.6.59-3.43L1 4.24l3.61-.43z';

function StarRow({ rating }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 12 12">
          <path d={STAR_PATH} fill={i <= rating ? '#C9A84C' : '#E0DDD5'} />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review, onApprove, onDelete }) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState(review.adminReply || '');
  const [saving, setSaving] = useState(false);

  const handleReply = async () => {
    setSaving(true);
    try {
      await adminAPI.replyReview(review._id, replyText);
      setShowReplyForm(false);
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{
      background: 'white', borderRadius: '8px', padding: '20px',
      border: '0.5px solid #E8E8E8',
      borderLeft: review.isApproved ? '3px solid #1A4731' : '3px solid #C9A84C',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
        <div>
          <StarRow rating={review.rating} />
          <p style={{ margin: '4px 0 0', fontFamily: 'var(--font-label)', fontSize: '11px', color: '#1C1C1C', fontWeight: 500 }}>
            {review.name}{review.city ? ` — ${review.city}` : ''}
          </p>
          {review.title && (
            <p style={{ margin: '4px 0 0', fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500 }}>
              {review.title}
            </p>
          )}
        </div>
        <span style={{
          padding: '3px 10px', borderRadius: '20px', fontSize: '10px',
          fontFamily: 'var(--font-label)',
          background: review.isApproved ? 'rgba(26,71,49,0.10)' : 'rgba(201,168,76,0.15)',
          color: review.isApproved ? '#1A4731' : '#B8860B',
        }}>
          {review.isApproved ? 'Approved' : 'Pending'}
        </span>
      </div>

      <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6B6B6B', fontStyle: 'italic', lineHeight: 1.6, margin: '0 0 12px' }}>
        &ldquo;{review.body}&rdquo;
      </p>

      {review.adminReply && (
        <div style={{ background: 'rgba(26,71,49,0.06)', borderRadius: '4px', padding: '10px 12px', marginBottom: '12px' }}>
          <p style={{ fontFamily: 'var(--font-label)', fontSize: '9px', color: '#1A4731', textTransform: 'uppercase', marginBottom: '4px' }}>
            Store Response
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#6B6B6B', margin: 0 }}>
            {review.adminReply}
          </p>
        </div>
      )}

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {!review.isApproved && (
          <button onClick={() => onApprove(review._id)} style={{
            background: '#1A4731', color: 'white', padding: '7px 16px',
            border: 'none', borderRadius: '4px', fontFamily: 'var(--font-label)',
            fontSize: '10px', letterSpacing: '0.05em', cursor: 'pointer',
          }}>
            Approve
          </button>
        )}
        <button onClick={() => setShowReplyForm((s) => !s)} style={{
          background: 'white', color: '#1A4731', padding: '7px 16px',
          border: '1px solid #1A4731', borderRadius: '4px', fontFamily: 'var(--font-label)',
          fontSize: '10px', letterSpacing: '0.05em', cursor: 'pointer',
        }}>
          {review.adminReply ? 'Edit Reply' : 'Reply'}
        </button>
        <button onClick={() => onDelete(review)} style={{
          background: 'white', color: '#D94040', padding: '7px 16px',
          border: '1px solid #D9404040', borderRadius: '4px', fontFamily: 'var(--font-label)',
          fontSize: '10px', letterSpacing: '0.05em', cursor: 'pointer',
        }}>
          Delete
        </button>
      </div>

      {showReplyForm && (
        <div style={{ marginTop: '12px' }}>
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            rows={3}
            placeholder="Write a store response…"
            style={{
              width: '100%', padding: '10px 12px', borderRadius: '4px',
              border: '0.5px solid #E8E8E8', fontFamily: 'var(--font-body)',
              fontSize: '13px', resize: 'vertical', outline: 'none', boxSizing: 'border-box',
            }}
          />
          <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            <button onClick={handleReply} disabled={saving} style={{
              background: '#1A4731', color: 'white', padding: '8px 16px',
              border: 'none', borderRadius: '4px', fontFamily: 'var(--font-label)',
              fontSize: '10px', cursor: 'pointer', opacity: saving ? 0.6 : 1,
            }}>
              {saving ? 'Saving…' : 'Save Reply'}
            </button>
            <button onClick={() => setShowReplyForm(false)} style={{
              background: 'white', color: '#6B6B6B', padding: '8px 16px',
              border: '1px solid #E8E8E8', borderRadius: '4px',
              fontFamily: 'var(--font-label)', fontSize: '10px', cursor: 'pointer',
            }}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending');
  const [deleteTarget, setDeleteTarget] = useState(null);

  const load = () => {
    setLoading(true);
    adminAPI.getAllReviews()
      .then((data) => setReviews(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleApprove = async (id) => {
    try {
      await adminAPI.approveReview(id);
      setReviews((prev) => prev.map((r) => r._id === id ? { ...r, isApproved: true } : r));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async () => {
    try {
      await adminAPI.deleteReview(deleteTarget._id);
      setReviews((prev) => prev.filter((r) => r._id !== deleteTarget._id));
      setDeleteTarget(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const pending  = reviews.filter((r) => !r.isApproved);
  const approved = reviews.filter((r) => r.isApproved);
  const displayed = filter === 'pending' ? pending : filter === 'approved' ? approved : reviews;

  return (
    <>
      <Head><title>Reviews | Admin | Green Light House</title></Head>
      <AdminLayout title="Reviews">

        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
          {[
            { key: 'pending',  label: `Pending (${pending.length})` },
            { key: 'approved', label: `Approved (${approved.length})` },
            { key: 'all',      label: `All (${reviews.length})` },
          ].map(({ key, label }) => (
            <button key={key} onClick={() => setFilter(key)} style={{
              padding: '7px 16px', borderRadius: '20px', fontSize: '11px',
              fontFamily: 'var(--font-label)', letterSpacing: '0.04em', cursor: 'pointer',
              border: filter === key ? '1px solid #1A4731' : '1px solid #E8E8E8',
              background: filter === key ? '#1A4731' : 'white',
              color: filter === key ? 'white' : '#6B6B6B',
            }}>
              {label}
            </button>
          ))}
        </div>

        {loading ? (
          <p style={{ fontFamily: 'var(--font-body)', color: '#999999' }}>Loading…</p>
        ) : displayed.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center', background: 'white', borderRadius: '8px', border: '0.5px solid #E8E8E8' }}>
            <p style={{ fontFamily: 'var(--font-body)', color: '#999999', margin: 0 }}>
              No {filter !== 'all' ? filter : ''} reviews.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {displayed.map((review) => (
              <ReviewCard
                key={review._id}
                review={review}
                onApprove={handleApprove}
                onDelete={setDeleteTarget}
              />
            ))}
          </div>
        )}

        <ConfirmDialog
          isOpen={!!deleteTarget}
          title="Delete Review"
          message={`Delete this review by "${deleteTarget?.name}"? This cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      </AdminLayout>
    </>
  );
}
