import React from 'react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { X, CheckCircle, ArrowRight, Clock, ShieldCheck, Tag } from 'lucide-react';

const ServiceDetailModal = () => {
  const { serviceModalItem, closeServiceModal, openQuoteModal } = useThemeLanguage();

  if (!serviceModalItem) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(10px)',
      zIndex: 100000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        width: '100%',
        maxWidth: '750px',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        boxShadow: 'var(--shadow-lg)'
      }}>
        {/* Header Image Cover */}
        <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
          <img
            src={serviceModalItem.image}
            alt={serviceModalItem.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, var(--bg-secondary) 0%, transparent 80%)'
          }} />
          
          <button
            onClick={closeServiceModal}
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.25rem',
              background: 'rgba(0,0,0,0.6)',
              border: 'none',
              color: '#FFF',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>

          <div style={{
            position: 'absolute',
            bottom: '1.5rem',
            left: '2rem',
            right: '2rem'
          }}>
            <span className="badge badge-red" style={{ marginBottom: '0.5rem' }}>{serviceModalItem.category}</span>
            <h2 style={{ fontSize: '2rem', color: '#FFF' }}>{serviceModalItem.title}</h2>
          </div>
        </div>

        {/* Content Body */}
        <div style={{ padding: '2rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            {serviceModalItem.description}
          </p>

          <div className="grid-2" style={{ marginBottom: '2rem' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)'
            }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Starting Price</span>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--color-emerald)', marginTop: '4px' }}>
                {serviceModalItem.startingPrice}
              </div>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)'
            }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Expected Turnaround</span>
              <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-main)', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={18} style={{ color: 'var(--color-primary-red)' }} /> 24 - 48 Hours Express
              </div>
            </div>
          </div>

          <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-main)' }}>What's Included in Package</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
            {serviceModalItem.features.map((feat, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                <CheckCircle size={18} style={{ color: 'var(--color-emerald)', flexShrink: 0 }} />
                <span>{feat}</span>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={() => {
                closeServiceModal();
                openQuoteModal(serviceModalItem);
              }}
              className="btn-primary"
              style={{ flex: 1, justifyContent: 'center' }}
            >
              <span>Book / Request Quote For This Service</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={closeServiceModal}
              className="btn-secondary"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailModal;
