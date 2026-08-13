import React, { useState } from 'react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { X, Download, Share2, Eye, Play, SlidersHorizontal, Check } from 'lucide-react';

const PortfolioLightboxModal = () => {
  const { portfolioModalItem, closePortfolioModal, openQuoteModal } = useThemeLanguage();
  const [sliderPos, setSliderPos] = useState(50);
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!portfolioModalItem) return null;

  const handleShare = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadPDF = () => {
    alert(`Downloading Project Case Study PDF for "${portfolioModalItem.title}"...`);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(12px)',
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
        maxWidth: '850px',
        maxHeight: '92vh',
        overflowY: 'auto',
        position: 'relative',
        boxShadow: 'var(--shadow-lg)'
      }}>
        {/* Header Controls */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <span className="badge badge-red">{portfolioModalItem.category}</span>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginTop: '4px' }}>
              {portfolioModalItem.title}
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={handleShare}
              className="btn-secondary btn-sm"
              title="Share Project"
            >
              {copied ? <Check size={16} style={{ color: '#10B981' }} /> : <Share2 size={16} />}
              <span>{copied ? 'Link Copied!' : 'Share'}</span>
            </button>

            <button
              onClick={handleDownloadPDF}
              className="btn-secondary btn-sm"
              title="Download PDF Presentation"
            >
              <Download size={16} />
              <span>PDF Case Study</span>
            </button>

            <button
              onClick={closePortfolioModal}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                marginLeft: '8px'
              }}
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Media Preview Container */}
        <div style={{ padding: '1.5rem', background: '#07080B' }}>
          {portfolioModalItem.beforeImage && (
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
              <button
                onClick={() => setShowBeforeAfter(prev => !prev)}
                className={`btn-sm ${showBeforeAfter ? 'btn-emerald' : 'btn-secondary'}`}
              >
                <SlidersHorizontal size={14} />
                <span>{showBeforeAfter ? 'Viewing Before / After Comparison' : 'Toggle Before / After Redesign Comparison'}</span>
              </button>
            </div>
          )}

          {showBeforeAfter && portfolioModalItem.beforeImage ? (
            /* Interactive Before/After Split View */
            <div style={{
              position: 'relative',
              width: '100%',
              height: '380px',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              userSelect: 'none'
            }}>
              {/* After Image (Full width background) */}
              <img
                src={portfolioModalItem.image}
                alt="After Redesign"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span className="badge badge-emerald" style={{ position: 'absolute', bottom: '1rem', right: '1rem', zIndex: 10 }}>
                AFTER (GS DESIGNS REDESIGN)
              </span>

              {/* Before Image (Clipped) */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                width: `${sliderPos}%`,
                overflow: 'hidden'
              }}>
                <img
                  src={portfolioModalItem.beforeImage}
                  alt="Before Redesign"
                  style={{ width: '850px', height: '100%', objectFit: 'cover', maxWidth: 'none' }}
                />
                <span className="badge badge-dark" style={{ position: 'absolute', bottom: '1rem', left: '1rem', zIndex: 10 }}>
                  BEFORE (OLD BRANDING)
                </span>
              </div>

              {/* Drag Handle Bar */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPos}
                onChange={e => setSliderPos(e.target.value)}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  opacity: 0,
                  cursor: 'ew-resize',
                  zIndex: 20
                }}
              />
              <div style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: `${sliderPos}%`,
                width: '3px',
                background: '#FFFFFF',
                boxShadow: '0 0 10px rgba(0,0,0,0.8)',
                pointerEvents: 'none',
                zIndex: 15
              }}>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: '#E30613',
                  color: '#FFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}>
                  ↔
                </div>
              </div>
            </div>
          ) : (
            /* Regular High-Res Image */
            <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', maxHeight: '420px', display: 'flex', justifyContent: 'center' }}>
              <img
                src={portfolioModalItem.image}
                alt={portfolioModalItem.title}
                style={{ width: '100%', maxHeight: '420px', objectFit: 'cover' }}
              />
            </div>
          )}
        </div>

        {/* Info & Metadata */}
        <div style={{ padding: '1.5rem 2rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
            {portfolioModalItem.description}
          </p>

          <div className="grid-3" style={{ marginBottom: '1.5rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Client</span>
              <div style={{ fontWeight: '600', color: 'var(--text-main)' }}>{portfolioModalItem.client}</div>
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Year</span>
              <div style={{ fontWeight: '600', color: 'var(--text-main)' }}>{portfolioModalItem.year}</div>
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Service Category</span>
              <div style={{ fontWeight: '600', color: 'var(--color-primary-red)' }}>{portfolioModalItem.service}</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {portfolioModalItem.tags.map((tag, idx) => (
              <span key={idx} className="badge badge-dark">#{tag}</span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={() => {
                closePortfolioModal();
                openQuoteModal();
              }}
              className="btn-primary"
              style={{ flex: 1, justifyContent: 'center' }}
            >
              Get Similar Design for Your Brand
            </button>

            <button onClick={closePortfolioModal} className="btn-secondary">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioLightboxModal;
