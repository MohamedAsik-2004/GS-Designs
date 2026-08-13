import React, { useState } from 'react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { Lock, Mail, ShieldCheck } from 'lucide-react';

const AdminLogin = () => {
  const { loginAdmin } = useThemeLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginAdmin(email, password)) {
      setError('');
    } else {
      setError('Invalid credentials. Please enter valid email & password.');
    }
  };

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div className="glass-card" style={{
        width: '100%',
        maxWidth: '440px',
        padding: '2.5rem',
        borderRadius: 'var(--radius-lg)'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #E30613 0%, #00A651 100%)',
            color: '#FFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            fontSize: '1.5rem',
            fontWeight: '900'
          }}>
            GS
          </div>
          <h2 style={{ fontSize: '1.6rem', color: 'var(--text-main)', margin: '4px 0' }}>Admin Portal Login</h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Authenticate to manage website content & leads</span>
        </div>

        {error && (
          <div className="badge badge-red" style={{ width: '100%', justifyContent: 'center', padding: '0.75rem', marginBottom: '1.25rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Administrator Email</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="email"
                required
                placeholder="admin@gsdesigns.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.8rem' }}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.8rem' }}
              />
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
            <ShieldCheck size={18} />
            <span>Sign In to Admin Portal</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
