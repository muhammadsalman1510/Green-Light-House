import { useState, useEffect } from 'react';
import Head from 'next/head';
import AdminLayout from '../../../components/admin/AdminLayout';
import AdminTable from '../../../components/admin/AdminTable';
import { adminAPI } from '../../../lib/api';

const STATUS_COLORS = {
  new:        { bg: 'rgba(201,168,76,0.12)',  color: '#B8860B' },
  processing: { bg: 'rgba(26,71,49,0.10)',   color: '#1A4731' },
  completed:  { bg: 'rgba(26,71,49,0.20)',   color: '#0F5132' },
  cancelled:  { bg: 'rgba(217,64,64,0.10)',  color: '#D94040' },
};

const STATUS_OPTIONS = ['new', 'processing', 'completed', 'cancelled'];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [updating, setUpdating] = useState(null);

  const load = () => {
    setLoading(true);
    adminAPI.getAllOrders()
      .then((data) => setOrders(Array.isArray(data) ? data : data?.orders || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdating(orderId);
    try {
      await adminAPI.updateOrder(orderId, newStatus);
      setOrders((prev) => prev.map((o) => o._id === orderId ? { ...o, status: newStatus } : o));
    } catch (err) {
      alert(err.message);
    } finally {
      setUpdating(null);
    }
  };

  const filtered = filter === 'all' ? orders : orders.filter((o) => o.status === filter);

  const columns = [
    { key: 'orderNumber', label: 'Order #' },
    {
      key: 'customer', label: 'Customer',
      render: (item) => (
        <div>
          <p style={{ margin: 0, fontWeight: 500 }}>{item.customer?.name}</p>
          <p style={{ margin: 0, fontSize: '11px', color: '#999999' }}>
            {item.customer?.city} · {item.customer?.phone}
          </p>
        </div>
      ),
    },
    {
      key: 'items', label: 'Items',
      render: (item) => `${item.items?.length || 0} item${item.items?.length !== 1 ? 's' : ''}`,
    },
    {
      key: 'total', label: 'Total',
      render: (item) => `PKR ${(item.total || 0).toLocaleString('en-PK')}`,
    },
    {
      key: 'status', label: 'Status',
      render: (item) => {
        const s = STATUS_COLORS[item.status] || STATUS_COLORS.new;
        return (
          <select
            value={item.status}
            disabled={updating === item._id}
            onChange={(e) => handleStatusChange(item._id, e.target.value)}
            onClick={(e) => e.stopPropagation()}
            style={{
              padding: '4px 10px', borderRadius: '20px', fontSize: '11px',
              fontFamily: 'var(--font-label)', background: s.bg, color: s.color,
              border: `1px solid ${s.color}40`, cursor: 'pointer', outline: 'none',
            }}
          >
            {STATUS_OPTIONS.map((st) => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        );
      },
    },
    {
      key: 'createdAt', label: 'Date',
      render: (item) => item.createdAt
        ? new Date(item.createdAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })
        : '—',
    },
    {
      key: 'notes', label: 'Notes',
      render: (item) => (
        <span style={{ fontSize: '12px', color: '#999999' }}>
          {item.customer?.notes || '—'}
        </span>
      ),
    },
  ];

  return (
    <>
      <Head><title>Orders | Admin | Green Light House</title></Head>
      <AdminLayout title="Orders">

        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
          {['all', ...STATUS_OPTIONS].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              style={{
                padding: '7px 16px', borderRadius: '20px', fontSize: '11px',
                fontFamily: 'var(--font-label)', letterSpacing: '0.04em', cursor: 'pointer',
                border: filter === st ? '1px solid #1A4731' : '1px solid #E8E8E8',
                background: filter === st ? '#1A4731' : 'white',
                color: filter === st ? 'white' : '#6B6B6B',
                textTransform: 'capitalize',
              }}
            >
              {st}
            </button>
          ))}
        </div>

        {loading ? (
          <p style={{ fontFamily: 'var(--font-body)', color: '#999999' }}>Loading…</p>
        ) : (
          <AdminTable
            columns={columns}
            data={filtered}
            emptyMessage="No orders yet."
          />
        )}
      </AdminLayout>
    </>
  );
}
