const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

async function fetchAPI(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  const token = typeof window !== 'undefined'
    ? localStorage.getItem('glh_admin_token')
    : null;
  try {
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      credentials: 'include',
      ...options,
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || `HTTP ${res.status}`);
    }
    return data;
  } catch (err) {
    throw err;
  }
}

// ── Categories ──────────────────────────────────────
export const categoriesAPI = {
  getTopLevel: () =>
    fetchAPI('/api/categories?parent=null'),

  getChildren: (parentSlug) =>
    fetchAPI(`/api/categories?parent=${encodeURIComponent(parentSlug)}`),

  getBySlug: (slug) =>
    fetchAPI(`/api/categories/${slug}`),
};

// ── Products ─────────────────────────────────────────
export const productsAPI = {
  getAll: (params = {}) => {
    const qs = new URLSearchParams(
      Object.fromEntries(
        Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== '')
      )
    ).toString();
    return fetchAPI(`/api/products${qs ? `?${qs}` : ''}`);
  },

  getBySlug: (slug) =>
    fetchAPI(`/api/products/slug/${slug}`),
};

// ── Reviews ──────────────────────────────────────────
export const reviewsAPI = {
  getForProduct: (productId) =>
    fetchAPI(`/api/reviews/product/${productId}`),

  submit: (productId, data) =>
    fetchAPI(`/api/reviews/product/${productId}`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// ── Orders ───────────────────────────────────────────
export const ordersAPI = {
  create: (data) =>
    fetchAPI('/api/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// ── Settings ─────────────────────────────────────────
export const settingsAPI = {
  get: () => fetchAPI('/api/settings'),
};

// ── Admin (authenticated) ─────────────────────────────
export const adminAPI = {
  login: (credentials) =>
    fetchAPI('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  logout: () =>
    fetchAPI('/api/auth/logout', { method: 'POST' }),

  getMe: () => fetchAPI('/api/auth/me'),

  // Categories
  getAllCategories: () => fetchAPI('/api/categories/admin/all'),
  createCategory:  (data) => fetchAPI('/api/categories', { method: 'POST', body: JSON.stringify(data) }),
  updateCategory:  (id, data) => fetchAPI(`/api/categories/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteCategory:  (id) => fetchAPI(`/api/categories/${id}`, { method: 'DELETE' }),

  // Products
  getAllProducts: () => fetchAPI('/api/products/admin/all'),
  createProduct:  (data) => fetchAPI('/api/products', { method: 'POST', body: JSON.stringify(data) }),
  updateProduct:  (id, data) => fetchAPI(`/api/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteProduct:  (id) => fetchAPI(`/api/products/${id}`, { method: 'DELETE' }),

  // Reviews
  getAllReviews:      () => fetchAPI('/api/reviews/admin/all'),
  getPendingReviews:  () => fetchAPI('/api/reviews/admin/pending'),
  approveReview:     (id) => fetchAPI(`/api/reviews/admin/${id}/approve`, { method: 'PUT' }),
  replyReview:       (id, reply) => fetchAPI(`/api/reviews/admin/${id}/reply`, { method: 'PUT', body: JSON.stringify({ reply }) }),
  deleteReview:      (id) => fetchAPI(`/api/reviews/admin/${id}`, { method: 'DELETE' }),

  // Orders
  getAllOrders:  (params = {}) => fetchAPI(`/api/orders/admin?${new URLSearchParams(params)}`),
  getOrderStats: () => fetchAPI('/api/orders/admin/stats'),
  updateOrder:  (id, status) => fetchAPI(`/api/orders/admin/${id}`, { method: 'PUT', body: JSON.stringify({ status }) }),

  // Settings
  getSettings:    () => fetchAPI('/api/settings'),
  updateSettings: (data) => fetchAPI('/api/settings', { method: 'PUT', body: JSON.stringify(data) }),

  // Upload
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const token = typeof window !== 'undefined' ? localStorage.getItem('glh_admin_token') : null;
    return fetch(`${API_URL}/api/upload`, {
      method: 'POST',
      credentials: 'include',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    }).then(async (res) => {
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      return data;
    });
  },

  deleteImage: (publicId) =>
    fetchAPI('/api/upload', {
      method: 'DELETE',
      body: JSON.stringify({ publicId }),
    }),
};
