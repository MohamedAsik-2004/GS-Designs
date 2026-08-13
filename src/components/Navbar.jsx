import React, { useState, useEffect } from 'react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { Sun, Moon, Globe, Menu, X, ArrowRight, MousePointer, ChevronDown, Sparkles } from 'lucide-react';
import BrandLogo from './BrandLogo';

const Navbar = () => {
  const {
    theme,
    toggleTheme,
    language,
    setLanguage,
    activePage,
    setActivePage,
    openQuoteModal,
    cursorEnabled,
    toggleCursor
  } = useThemeLanguage();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Primary navigation links for main desktop header
  const primaryLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services', badge: '18' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  // Secondary navigation links inside "More" dropdown
  const secondaryLinks = [
    { id: 'gallery', label: 'Gallery Showcase' },
    { id: 'blog', label: 'Agency Insights & Blog' },
    { id: 'careers', label: 'Careers (Join Us)' },
    { id: 'faq', label: 'FAQ & Guarantees' }
  ];

  // All links for mobile drawer
  const allLinks = [...primaryLinks, ...secondaryLinks];

  const handleNavClick = (id) => {
    setActivePage(id);
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (id === 'home') {
      window.history.pushState(null, '', '/');
    } else {
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 9999,
      background: scrolled ? 'var(--bg-nav)' : 'var(--bg-nav)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border-color)',
      boxShadow: scrolled ? '0 10px 30px rgba(0, 0, 0, 0.25)' : 'none',
      transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '72px',
        position: 'relative'
      }}>
        {/* Brand Logo - Scaled & Centered Vertically */}
        <div
          onClick={() => handleNavClick('home')}
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            padding: '4px 0'
          }}
          className="brand-logo-container"
        >
          <BrandLogo size="medium" />
        </div>

        {/* Desktop Nav Links */}
        <nav style={{ display: 'none', gap: '0.4rem', alignItems: 'center' }} className="desktop-nav">
          {primaryLinks.map((link) => {
            const isActive = activePage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`nav-link-btn ${isActive ? 'active' : ''}`}
                style={{
                  background: isActive ? 'rgba(227, 6, 19, 0.1)' : 'transparent',
                  border: 'none',
                  color: isActive ? 'var(--color-primary-red)' : 'var(--text-main)',
                  fontWeight: isActive ? '700' : '500',
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-sm)',
                  position: 'relative',
                  transition: 'all 0.25s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span style={{
                    fontSize: '0.65rem',
                    background: 'linear-gradient(135deg, var(--color-primary-red), #B3000C)',
                    color: '#FFF',
                    padding: '2px 6px',
                    borderRadius: '10px',
                    fontWeight: '800',
                    letterSpacing: '0.02em',
                    boxShadow: '0 2px 6px rgba(227, 6, 19, 0.3)'
                  }}>
                    {link.badge}
                  </span>
                )}
                {isActive && (
                  <span style={{
                    position: 'absolute',
                    bottom: '2px',
                    left: '12px',
                    right: '12px',
                    height: '2px',
                    background: 'var(--color-primary-red)',
                    borderRadius: '2px',
                    boxShadow: '0 0 8px var(--color-primary-red)'
                  }} />
                )}
              </button>
            );
          })}

          {/* "More" Dropdown Menu */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setMoreDropdownOpen(prev => !prev)}
              onBlur={() => setTimeout(() => setMoreDropdownOpen(false), 200)}
              className="nav-link-btn"
              style={{
                background: secondaryLinks.some(l => l.id === activePage) ? 'rgba(0, 166, 81, 0.1)' : 'transparent',
                border: 'none',
                color: secondaryLinks.some(l => l.id === activePage) ? 'var(--color-emerald)' : 'var(--text-muted)',
                fontWeight: '600',
                fontSize: '0.9rem',
                cursor: 'pointer',
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'all 0.25s ease'
              }}
            >
              <span>More</span>
              <ChevronDown size={14} style={{
                transform: moreDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.25s ease'
              }} />
            </button>

            {moreDropdownOpen && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                width: '220px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)',
                padding: '0.5rem',
                zIndex: 10000,
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                backdropFilter: 'blur(16px)',
                animation: 'navDropdownFade 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards'
              }}>
                {secondaryLinks.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    style={{
                      background: activePage === item.id ? 'rgba(227, 6, 19, 0.12)' : 'transparent',
                      border: 'none',
                      color: activePage === item.id ? 'var(--color-primary-red)' : 'var(--text-main)',
                      fontWeight: activePage === item.id ? '700' : '500',
                      fontSize: '0.88rem',
                      textAlign: 'left',
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      transition: 'background 0.2s ease, color 0.2s ease'
                    }}
                    onMouseEnter={e => {
                      if (activePage !== item.id) {
                        e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                      }
                    }}
                    onMouseLeave={e => {
                      if (activePage !== item.id) {
                        e.target.style.background = 'transparent';
                      }
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Header Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {/* Custom Cursor Toggle */}
          <button
            onClick={toggleCursor}
            title={cursorEnabled ? "Disable Interactive Cursor" : "Enable Interactive Cursor"}
            className="action-icon-btn"
            style={{
              background: cursorEnabled ? 'rgba(0, 166, 81, 0.15)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${cursorEnabled ? 'rgba(0, 166, 81, 0.4)' : 'var(--border-color)'}`,
              color: cursorEnabled ? 'var(--color-emerald)' : 'var(--text-muted)',
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.25s ease'
            }}
          >
            <MousePointer size={17} />
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            className="action-icon-btn"
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            {theme === 'dark' ? (
              <Sun size={18} style={{ color: '#FBBF24', transition: 'transform 0.4s ease' }} />
            ) : (
              <Moon size={18} style={{ color: '#6366F1', transition: 'transform 0.4s ease' }} />
            )}
          </button>

          {/* Language Selector */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Globe size={15} style={{ position: 'absolute', left: '10px', pointerEvents: 'none', color: 'var(--text-muted)' }} />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-main)',
                padding: '6px 10px 6px 30px',
                borderRadius: '12px',
                fontSize: '0.8rem',
                fontWeight: '700',
                cursor: 'pointer',
                outline: 'none',
                transition: 'all 0.25s ease'
              }}
            >
              <option value="EN" style={{ background: '#12151E', color: '#FFF' }}>EN</option>
              <option value="HI" style={{ background: '#12151E', color: '#FFF' }}>HI</option>
              <option value="ES" style={{ background: '#12151E', color: '#FFF' }}>ES</option>
            </select>
          </div>

          {/* Get Quote CTA Button */}
          <button
            onClick={() => openQuoteModal()}
            className="btn-primary btn-sm hide-mobile glowing-btn"
            style={{
              padding: '0.65rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: '700',
              letterSpacing: '0.01em'
            }}
          >
            <Sparkles size={15} />
            <span>Get Quote</span>
            <ArrowRight size={15} />
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              color: 'var(--text-main)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px'
            }}
            className="mobile-hamburger"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-color)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          animation: 'navDropdownFade 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}>
          {allLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              style={{
                background: activePage === link.id ? 'rgba(227, 6, 19, 0.12)' : 'transparent',
                border: 'none',
                color: activePage === link.id ? 'var(--color-primary-red)' : 'var(--text-main)',
                fontWeight: '600',
                fontSize: '1rem',
                textAlign: 'left',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className="badge badge-red">{link.badge} Services</span>
              )}
            </button>
          ))}

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openQuoteModal();
            }}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', marginTop: '0.75rem' }}
          >
            <Sparkles size={16} />
            <span>Get Instant Quote</span>
          </button>
        </div>
      )}

      {/* Signature 50/50 Red-Green Split Ribbon Bar */}
      <div className="split-ribbon-bar">
        <div className="ribbon-red" />
        <div className="ribbon-green" />
      </div>

      {/* Responsive & Animation Styles */}
      <style>{`
        @keyframes navDropdownFade {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .nav-link-btn:hover {
          color: var(--color-primary-red) !important;
          background: rgba(227, 6, 19, 0.08) !important;
        }
        .action-icon-btn:hover {
          transform: translateY(-2px);
          border-color: var(--color-primary-red) !important;
        }
        .glowing-btn {
          position: relative;
          overflow: hidden;
        }
        .glowing-btn::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(60deg, transparent, rgba(255,255,255,0.25), transparent);
          transform: rotate(30deg);
          animation: btnShine 4s infinite;
        }
        @keyframes btnShine {
          0% { transform: translateX(-100%) rotate(30deg); }
          20%, 100% { transform: translateX(100%) rotate(30deg); }
        }
        @media (min-width: 1025px) {
          .desktop-nav { display: flex !important; }
          .mobile-hamburger { display: none !important; }
        }
        @media (max-width: 640px) {
          .hide-mobile { display: none !important; }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
