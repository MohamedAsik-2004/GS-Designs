import React from 'react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { AlertCircle, Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  const { setActivePage } = useThemeLanguage();

  return (
    <div style={{ padding: '8rem 0', textAlign: 'center' }}>
      <div className="container" style={{ maxWidth: '600px' }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'rgba(227, 6, 19, 0.15)',
          border: '2px solid #E30613',
          color: '#E30613',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem'
        }}>
          <AlertCircle size={48} />
        </div>
        <h1 style={{ fontSize: '4rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
          404
        </h1>
        <h2 style={{ fontSize: '1.8rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
          Design Page Not Found
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '2rem' }}>
          The advertising page or asset you are looking for has been moved, renamed, or deleted.
        </p>

        <button onClick={() => setActivePage('home')} className="btn-primary btn-lg">
          <Home size={20} />
          <span>Return to GS Designs Home</span>
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
