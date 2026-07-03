import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAdmin } from '../../context/AdminContext';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAdmin();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
      router.push('/admin');
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fieldStyle = {
    width: '100%', padding: '11px 14px',
    background: 'rgba(255,255,255,0.05)',
    border: '0.5px solid rgba(255,255,255,0.15)',
    borderRadius: '4px', color: 'white',
    fontFamily: 'var(--font-body)', fontSize: '14px',
    outline: 'none', boxSizing: 'border-box',
  };

  return (
    <>
      <Head>
        <title>Admin Login | Green Light House</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div style={{
        minHeight: '100vh',
        background: '#0E0E0E',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}>
        <div style={{ width: '100%', maxWidth: '380px' }}>

          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <p style={{
              fontFamily: 'var(--font-heading)', fontSize: '28px',
              color: 'white', letterSpacing: '0.25em', margin: 0,
            }}>
              GLH
            </p>
            <p style={{
              fontFamily: 'var(--font-label)', fontSize: '10px',
              color: 'rgba(255,255,255,0.35)', letterSpacing: '0.20em',
              marginTop: '6px', textTransform: 'uppercase',
            }}>
              Admin Panel
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{
            background: 'rgba(255,255,255,0.03)',
            border: '0.5px solid rgba(255,255,255,0.08)',
            borderRadius: '10px',
            padding: '32px',
          }}>
            <h2 style={{
              fontFamily: 'var(--font-heading)', fontSize: '20px',
              fontWeight: 400, color: 'white', marginBottom: '24px',
              textAlign: 'center',
            }}>
              Sign in to continue
            </h2>

            {error && (
              <div style={{
                background: 'rgba(217,64,64,0.10)',
                border: '0.5px solid rgba(217,64,64,0.30)',
                borderRadius: '6px', padding: '10px 14px',
                marginBottom: '20px', color: '#F87171',
                fontFamily: 'var(--font-body)', fontSize: '13px',
              }}>
                {error}
              </div>
            )}

            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block', fontFamily: 'var(--font-label)',
                fontSize: '10px', color: 'rgba(255,255,255,0.45)',
                letterSpacing: '0.08em', textTransform: 'uppercase',
                marginBottom: '6px',
              }}>
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoFocus
                autoComplete="username"
                style={fieldStyle}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block', fontFamily: 'var(--font-label)',
                fontSize: '10px', color: 'rgba(255,255,255,0.45)',
                letterSpacing: '0.08em', textTransform: 'uppercase',
                marginBottom: '6px',
              }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                style={fieldStyle}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', background: '#C9A84C', color: '#111',
                padding: '13px', borderRadius: '4px', border: 'none',
                fontFamily: 'var(--font-label)', fontSize: '12px',
                letterSpacing: '0.10em', textTransform: 'uppercase',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

        </div>
      </div>
    </>
  );
}
