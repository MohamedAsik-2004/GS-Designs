import React from 'react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { ShieldAlert, RefreshCw, Phone } from 'lucide-react';
import { BRAND_INFO } from '../data/agencyData';

const MaintenancePage = () => {
  const { setActivePage } = useThemeLanguage();

  return (
    <div style={{ padding: '8rem 0', textAlign: 'center' }}>
      <div className="container" style={{ maxWidth: '650px' }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'rgba(251, 191, 36, 0.15)',
          border: '2px solid #FBBF24',
          color: '#FBBF24',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem'
        }}>
          <ShieldAlert size={48} />
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
          Scheduled Printing Server Maintenance
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.6 }}>
          We are currently upgrading our pre-press color calibration server engines to support 2400 DPI solvent rendering. We will be back online shortly!
        </p>

        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '1.5rem',
          marginBottom: '2rem'
        }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
            Emergency Flex Printing or Signboard Assistance:
          </span>
          <strong style={{ fontSize: '1.2rem', color: 'var(--color-emerald)' }}>
            Call Desk: {BRAND_INFO.phone}
          </strong>
        </div>

        <button onClick={() => setActivePage('home')} className="btn-secondary">
          <RefreshCw size={18} />
          <span>Exit Maintenance View Mode</span>
        </button>
      </div>
    </div>
  );
};

export default MaintenancePage;
