import React, { useState } from 'react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { BRAND_INFO, SERVICES_LIST } from '../data/agencyData';
import { ArrowUp, Phone, Mail, MapPin, Clock, Send, ShieldAlert, AlertTriangle } from 'lucide-react';
import BrandLogo from './BrandLogo';

const Footer = () => {
  const { setActivePage, openQuoteModal, cmsBrand, adminServices } = useThemeLanguage();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const phoneNum = cmsBrand?.phone || BRAND_INFO.phone;
  const emailAddr = cmsBrand?.email || BRAND_INFO.email;
  const displayServicesList = (adminServices || SERVICES_LIST).slice(0, 8);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer style={{
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-color)',
      paddingTop: '4rem',
      paddingBottom: '2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Glow Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '2px',
        background: 'linear-gradient(90deg, transparent, #E30613, #00A651, transparent)'
      }} />

      <div className="container">
        <div className="grid-4" style={{ marginBottom: '3rem' }}>
          {/* Column 1: Brand & Bio */}
          <div>
            <div style={{ marginBottom: '1rem' }}>
              <BrandLogo size="medium" showCapsule={true} />
            </div>

            <p style={{
              color: 'var(--text-muted)',
              fontSize: '0.9rem',
              marginBottom: '1.5rem',
              lineHeight: 1.6
            }}>
              Ideas That Elevate Brands. Premium full-service advertising agency offering luxury logo design, 3D sign boards, solvent flex printing, and digital campaigns.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={16} style={{ color: 'var(--color-primary-red)', flexShrink: 0 }} />
                <span>{BRAND_INFO.cityState}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={16} style={{ color: 'var(--color-emerald)', flexShrink: 0 }} />
                <span>{phoneNum}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={16} style={{ color: 'var(--color-primary-red)', flexShrink: 0 }} />
                <span>{emailAddr}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={16} style={{ color: 'var(--color-emerald)', flexShrink: 0 }} />
                <span>Mon-Sat: {BRAND_INFO.businessHours.weekdays}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 style={{
              fontSize: '1.1rem',
              color: 'var(--text-main)',
              marginBottom: '1.25rem',
              position: 'relative'
            }}>
              Quick Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                { id: 'home', label: 'Home Page' },
                { id: 'about', label: 'About Agency' },
                { id: 'services', label: 'All Services (18)' },
                { id: 'portfolio', label: 'Creative Portfolio' },
                { id: 'careers', label: 'Careers & Hiring' },
                { id: 'contact', label: 'Contact Us' }
              ].map(link => (
                <li key={link.id}>
                  <button
                    onClick={() => { setActivePage(link.id); scrollToTop(); }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-muted)',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={e => e.target.style.color = 'var(--color-primary-red)'}
                    onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
                  >
                    • {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Featured Services */}
          <div>
            <h4 style={{
              fontSize: '1.1rem',
              color: 'var(--text-main)',
              marginBottom: '1.25rem'
            }}>
              Popular Services
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {displayServicesList.map(srv => (
                <li key={srv.id}>
                  <button
                    onClick={() => { setActivePage('services'); scrollToTop(); }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-muted)',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={e => e.target.style.color = 'var(--color-emerald)'}
                    onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
                  >
                    • {srv.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Studio Operations */}
          <div>
            <h4 style={{
              fontSize: '1.1rem',
              color: 'var(--text-main)',
              marginBottom: '1.25rem'
            }}>
              Studio Operations
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
              Our production hub operates daily with high-capacity solvent printing, laser cutting, and design consultation services.
            </p>

            <div style={{
              padding: '1rem',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)'
            }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: '700', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                System Status & Tools
              </span>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => { setActivePage('notfound'); scrollToTop(); }}
                  className="btn-secondary btn-sm"
                  style={{ fontSize: '0.75rem', padding: '4px 8px' }}
                >
                  <AlertTriangle size={12} /> 404 Page
                </button>
                <button
                  onClick={() => { setActivePage('maintenance'); scrollToTop(); }}
                  className="btn-secondary btn-sm"
                  style={{ fontSize: '0.75rem', padding: '4px 8px' }}
                >
                  <ShieldAlert size={12} /> Maintenance Mode
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'var(--border-color)', marginBottom: '2rem' }} />

        {/* Bottom Copyright & Back to Top */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.85rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            © 2026 <strong style={{ color: 'var(--text-main)' }}>GS Designs</strong>. All Rights Reserved. Designed with Excellence.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => { setActivePage('privacy'); scrollToTop(); }}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              Privacy Policy
            </button>
            <span>|</span>
            <button
              onClick={() => { setActivePage('terms'); scrollToTop(); }}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              Terms of Service
            </button>
            <span>|</span>
            <button
              onClick={() => { setActivePage('admin'); window.history.pushState(null, '', '/admin'); scrollToTop(); }}
              style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', fontSize: '0.8rem' }}
            >
              Admin
            </button>

            <button
              onClick={scrollToTop}
              title="Back to Top"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, var(--color-primary-red), #B3000C)',
                border: 'none',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-glow-red)',
                marginLeft: '1rem'
              }}
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
