import React from 'react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { BRAND_INFO } from '../data/agencyData';
import { Phone, MessageCircle, MessageSquare } from 'lucide-react';

const FloatingActions = () => {
  const { setLiveChatOpen } = useThemeLanguage();

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hello GS Designs! I would like to inquire about your advertising & printing services.");
    window.open(`https://wa.me/${BRAND_INFO.whatsapp}?text=${message}`, '_blank');
  };

  const handleCall = () => {
    window.open(`tel:${BRAND_INFO.phone}`);
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 9990,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      alignItems: 'flex-end'
    }}>
      {/* Live Chat Modal Trigger Button */}
      <button
        onClick={() => setLiveChatOpen(true)}
        title="Start Live Assistant Chat"
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #10B981, #00A651)',
          color: '#FFFFFF',
          border: 'none',
          boxShadow: '0 8px 25px rgba(0, 166, 81, 0.4)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.2s ease'
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        <MessageSquare size={22} />
      </button>

      {/* Direct Call Button */}
      <button
        onClick={handleCall}
        title={`Call GS Designs: ${BRAND_INFO.phone}`}
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
          color: '#FFFFFF',
          border: 'none',
          boxShadow: '0 8px 25px rgba(59, 130, 246, 0.4)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.2s ease'
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        <Phone size={22} />
      </button>

      {/* WhatsApp Button */}
      <button
        onClick={handleWhatsApp}
        title="Chat on WhatsApp"
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: '#25D366',
          color: '#FFFFFF',
          border: 'none',
          boxShadow: '0 10px 30px rgba(37, 211, 102, 0.5)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          transition: 'transform 0.2s ease'
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        <MessageCircle size={28} />
        {/* Pulse Dot */}
        <span style={{
          position: 'absolute',
          top: '2px',
          right: '2px',
          width: '14px',
          height: '14px',
          background: '#FF3B47',
          borderRadius: '50%',
          border: '2px solid #FFF',
          animation: 'pulseGlow 2s infinite'
        }} />
      </button>
    </div>
  );
};

export default FloatingActions;
