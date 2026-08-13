import React, { useState } from 'react';
import BrandLogo from './BrandLogo';
import { BRAND_INFO } from '../data/agencyData';
import { Phone, Mail, MapPin, RotateCw, Sparkles, CheckCircle2 } from 'lucide-react';

const VisitingCard3D = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div style={{ perspective: '1000px', width: '100%', maxWidth: '480px', margin: '0 auto' }}>
      {/* Action Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
          <Sparkles size={16} color="var(--primary-red)" /> Official Business Card Preview
        </div>
        <button
          onClick={() => setIsFlipped(!isFlipped)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'var(--glass-bg)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            padding: '6px 14px',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--primary-red)'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
        >
          <RotateCw size={14} className={isFlipped ? 'spin-once' : ''} /> Flip Card ({isFlipped ? 'Back' : 'Front'})
        </button>
      </div>

      {/* 3D Flip Container */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        style={{
          width: '100%',
          aspectRatio: '1.75 / 1',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1)',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          cursor: 'pointer',
          borderRadius: '16px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
        }}
      >
        {/* ================= FRONT OF CARD ================= */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '4px solid #E30613',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            justify: 'space-between',
            boxSizing: 'border-box',
            overflow: 'hidden',
            color: '#0B0D12'
          }}
        >
          {/* Top Bar: Founder Name & Phone Numbers */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#333333', fontFamily: "'Poppins', sans-serif" }}>
                {BRAND_INFO.founder}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#666666', fontWeight: 600 }}>Founder & Managing Director</div>
            </div>

            <div style={{ textAlign: 'right', fontSize: '0.85rem', fontWeight: 800, color: '#222222', fontFamily: "'Poppins', sans-serif" }}>
              <div>{BRAND_INFO.phone.replace('+91 ', '')}</div>
              <div>{BRAND_INFO.altPhone.replace('+91 ', '')}</div>
            </div>
          </div>

          {/* Center: Brand Emblem Logo */}
          <div style={{ alignSelf: 'center', margin: '8px 0' }}>
            <BrandLogo size="medium" showCapsule={true} />
          </div>

          {/* Key Services Line */}
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#444444', textAlign: 'center', letterSpacing: '0.2px' }}>
            Invitation &nbsp;|&nbsp; Flex &nbsp;|&nbsp; Notice &nbsp;|&nbsp; LOGO &nbsp;|&nbsp; Shield & Mementos
          </div>

          {/* Bottom Signature 50/50 Red-Green Ribbon Bar */}
          <div style={{ display: 'flex', height: '6px', width: '100%', position: 'absolute', bottom: 0, left: 0, right: 0 }}>
            <div style={{ flex: 1, backgroundColor: '#E30613' }}></div>
            <div style={{ flex: 1, backgroundColor: '#00A651' }}></div>
          </div>
        </div>

        {/* ================= BACK OF CARD ================= */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            backgroundColor: '#E30613',
            borderRadius: '16px',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            justify: 'space-between',
            boxSizing: 'border-box',
            overflow: 'hidden',
            color: '#FFFFFF'
          }}
        >
          {/* Top Row: Logo & White Quote Inset Card */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '32px', height: '32px', background: '#FFFFFF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#E30613', fontWeight: 900, fontSize: '0.9rem' }}>GS</span>
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, fontFamily: "'Poppins', sans-serif", color: '#FFFFFF' }}>
                GS Designs
              </span>
            </div>

            {/* White Quote Box (From Visiting Card Back) */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                color: '#E30613',
                padding: '8px 12px',
                borderRadius: '8px',
                textAlign: 'right',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
            >
              <div style={{ fontSize: '0.85rem', fontWeight: 900, fontFamily: "'Poppins', sans-serif", lineHeight: 1.1 }}>
                IDEAS
              </div>
              <div style={{ fontSize: '0.65rem', fontStyle: 'italic', color: '#00A651', fontWeight: 700 }}>
                That Elevate
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: 900, fontFamily: "'Poppins', sans-serif", lineHeight: 1.1 }}>
                BRANDS
              </div>
            </div>
          </div>

          {/* Middle: Studio Address */}
          <div style={{ margin: '8px 0', fontSize: '0.8rem', fontWeight: 700, lineHeight: 1.35, color: '#FFFFFF', maxWidth: '85%' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
              <MapPin size={16} style={{ flexShrink: 0, marginTop: '2px', color: '#FFFFFF' }} />
              <div>
                1/31, Public Office Road, Next to CRC Depot, Velippalayam, Nagapattinam - 611001.
              </div>
            </div>
          </div>

          {/* Bottom Row: White Pill Badge Email */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div
              style={{
                backgroundColor: '#FFFFFF',
                color: '#333333',
                padding: '4px 14px',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Mail size={12} color="#E30613" /> gsdesignsngt@gmail.com
            </div>

            <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.85)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle2 size={12} /> Verified Agency
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitingCard3D;
