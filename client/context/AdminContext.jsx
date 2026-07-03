import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { adminAPI } from '../lib/api';

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const data = await adminAPI.getMe();
      setAdmin(data);
    } catch {
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    const data = await adminAPI.login({ username, password });
    setAdmin(data.admin);
    if (data.token) {
      localStorage.setItem('glh_admin_token', data.token);
    }
    return data;
  };

  const logout = async () => {
    try {
      await adminAPI.logout();
    } catch {
      // ignore
    }
    localStorage.removeItem('glh_admin_token');
    setAdmin(null);
    router.push('/admin/login');
  };

  return (
    <AdminContext.Provider value={{ admin, loading, login, logout, checkAuth }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);
