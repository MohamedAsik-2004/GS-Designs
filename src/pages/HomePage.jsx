import React, { useState } from 'react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { BRAND_INFO, SERVICES_LIST, PORTFOLIO_ITEMS, TESTIMONIALS_LIST, FAQ_ITEMS, BLOG_POSTS } from '../data/agencyData';
import { ArrowRight, Sparkles, CheckCircle2, Star, Play, ChevronDown, ChevronUp, SlidersHorizontal, ShieldCheck, Award, Zap, HeartHandshake, Printer, FileText, Palette, Trophy } from 'lucide-react';
import VisitingCard3D from '../components/VisitingCard3D';
import ClientLogoTicker from '../components/ClientLogoTicker';

const HomePage = () => {
  const { setActivePage, openQuoteModal, openServiceModal, openPortfolioModal, openBlogModal, adminServices, adminPortfolio, cmsHero, cmsSections } = useThemeLanguage();
  
  const [expandedFaq, setExpandedFaq] = useState(0);

  const displayServices = adminServices || SERVICES_LIST;
  const displayPortfolio = adminPortfolio || PORTFOLIO_ITEMS;

  const heroHeadline = cmsHero?.headline || "Ideas That Elevate Brands";
  const heroSubtext = cmsHero?.subtext || "Specializing in Invitation Cards, Solvent Flex Printing, Commercial Notices, Vector Logo Design, and Custom Shield & Mementos across Nagapattinam and beyond.";

  return (
    <div style={{ overflowX: 'hidden' }}>
      {/* HERO SECTION */}
      {cmsSections?.heroSection !== false && (
      <section style={{
        position: 'relative',
        padding: '5rem 0 6rem',
        background: 'radial-gradient(circle at 10% 20%, rgba(227, 6, 19, 0.15) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(0, 166, 81, 0.15) 0%, transparent 40%)',
        overflow: 'hidden'
      }}>
        {/* Floating Background Shapes */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '300px',
          height: '300px',
          background: 'rgba(227, 6, 19, 0.08)',
          filter: 'blur(80px)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: '350px',
          height: '350px',
          background: 'rgba(0, 166, 81, 0.08)',
          filter: 'blur(90px)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }} />

        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            {/* Hero Left Content */}
            <div>
              <div className="badge badge-red fade-up-1" style={{ marginBottom: '1.25rem' }}>
                <Sparkles size={14} /> Ln. G.Shaik Alaudeen's Creative Advertising Agency
              </div>

              <h1 className="fade-up-2" style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
                fontWeight: '900',
                color: 'var(--text-main)',
                marginBottom: '1.25rem',
                lineHeight: 1.1,
                letterSpacing: '-0.03em'
              }}>
                {heroHeadline}
              </h1>

              <p className="fade-up-3" style={{
                fontSize: '1.15rem',
                color: 'var(--text-muted)',
                marginBottom: '2rem',
                lineHeight: 1.6,
                maxWidth: '560px'
              }}>
                {heroSubtext}
              </p>

              <div className="fade-up-3" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
                <button
                  onClick={() => openQuoteModal()}
                  className="btn-primary btn-lg"
                >
                  <span>Get Instant Quote</span>
                  <ArrowRight size={20} />
                </button>

                <button
                  onClick={() => setActivePage('portfolio')}
                  className="btn-secondary btn-lg"
                >
                  View Portfolio
                </button>
              </div>

              {/* Trust Badges */}
              <div className="fade-up-3" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ display: 'flex', color: '#FBBF24' }}>
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#FBBF24" />)}
                  </div>
                  <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-main)' }}>5.0 Rating</span>
                </div>
                <span style={{ color: 'var(--text-dim)' }}>|</span>
                <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Nagapattinam's Trusted Creative Partner</span>
              </div>
            </div>

            {/* Hero Right Content: Custom Hero Banner Image or 3D Interactive Visiting Card Component */}
            <div className="fade-up-2">
              {cmsHero?.heroImage ? (
                <div className="glass-card" style={{ padding: '0.75rem', overflow: 'hidden', borderRadius: 'var(--radius-lg)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', border: '1px solid var(--border-color)' }}>
                  <img src={cmsHero.heroImage} alt="Hero Showcase Banner" style={{ width: '100%', height: 'auto', maxHeight: '440px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }} />
                </div>
              ) : (
                <VisitingCard3D />
              )}
            </div>
          </div>
        </div>
      </section>
      )}

      {/* STATS COUNTER BAR */}
      {cmsSections?.statsCounter !== false && (
        <section style={{
          background: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-color)',
          borderBottom: '1px solid var(--border-color)',
          padding: '2.5rem 0'
        }}>
          <div className="container">
            <div className="grid-4" style={{ textAlign: 'center' }}>
              <div style={{ padding: '1rem' }}>
                <div style={{ fontSize: '2.8rem', fontWeight: '900', color: 'var(--color-primary-red)', fontFamily: 'var(--font-heading)' }}>
                  5000+
                </div>
                <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontWeight: '600' }}>Projects Delivered</span>
              </div>

              <div style={{ padding: '1rem' }}>
                <div style={{ fontSize: '2.8rem', fontWeight: '900', color: 'var(--color-emerald)', fontFamily: 'var(--font-heading)' }}>
                  1000+
                </div>
                <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontWeight: '600' }}>Happy Business Clients</span>
              </div>

              <div style={{ padding: '1rem' }}>
                <div style={{ fontSize: '2.8rem', fontWeight: '900', color: 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>
                  10+
                </div>
                <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontWeight: '600' }}>Years Industry Leadership</span>
              </div>

              <div style={{ padding: '1rem' }}>
                <div style={{ fontSize: '2.8rem', fontWeight: '900', color: '#FBBF24', fontFamily: 'var(--font-heading)' }}>
                  24/7
                </div>
                <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontWeight: '600' }}>Dedicated Client Support</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* INFINITE CLIENT BRAND TICKER */}
      {cmsSections?.clientLogoTicker !== false && <ClientLogoTicker />}

      {/* SERVICES PREVIEW GRID */}
      {cmsSections?.servicesPreview !== false && (
        <section style={{ padding: '6rem 0' }}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 4rem' }}>
              <span className="badge badge-emerald" style={{ marginBottom: '0.75rem' }}>Full-Service Agency</span>
              <h2 style={{ fontSize: '2.4rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
                Comprehensive Advertising & Printing Services
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
                Everything your business needs to make a powerful visual impression, in physical print and digital spaces.
              </p>
            </div>

            <div className="grid-3">
              {displayServices.slice(0, 6).map(srv => (
                <div key={srv.id} className="glass-card glow-card-red" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(227, 6, 19, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary-red)' }}>
                      <Printer size={24} />
                    </div>
                    <span className="badge badge-dark">{srv.category}</span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>{srv.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', flex: 1, lineHeight: 1.6 }}>
                    {srv.description}
                  </p>

                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: 'auto' }}>
                    <button
                      onClick={() => openServiceModal(srv)}
                      className="btn-secondary"
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      View Service Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <button
                onClick={() => setActivePage('services')}
                className="btn-primary btn-lg"
              >
                Explore All {displayServices.length} Advertising Services
              </button>
            </div>
          </div>
        </section>
      )}

      {/* PORTFOLIO HIGHLIGHTS */}
      {cmsSections?.portfolioSpotlight !== false && (
        <section style={{ padding: '6rem 0' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span className="badge badge-red">Portfolio Spotlight</span>
                <h2 style={{ fontSize: '2.4rem', color: 'var(--text-main)', marginTop: '6px' }}>
                  Recent Creative Showcase
                </h2>
              </div>

              <button onClick={() => setActivePage('portfolio')} className="btn-secondary">
                View Full Gallery & Case Studies
              </button>
            </div>

            <div className="grid-3">
              {displayPortfolio.slice(0, 6).map(item => (
                <div
                  key={item.id}
                  onClick={() => openPortfolioModal(item)}
                  className="glass-card"
                  style={{ cursor: 'pointer', overflow: 'hidden' }}
                >
                  <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                      onMouseEnter={e => e.target.style.transform = 'scale(1.08)'}
                      onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                    />
                    <span className="badge badge-dark" style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                      {item.category}
                    </span>
                  </div>

                  <div style={{ padding: '1.25rem' }}>
                    <h3 style={{ fontSize: '1.15rem', color: 'var(--text-main)', marginBottom: '4px' }}>
                      {item.title}
                    </h3>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
                      Client: {item.client} • {item.year}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TESTIMONIALS SLIDER / GOOGLE REVIEWS */}
      {cmsSections?.testimonialsSection !== false && (
        <section style={{
          background: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-color)',
          padding: '6rem 0'
        }}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3.5rem' }}>
              <span className="badge badge-emerald" style={{ marginBottom: '0.5rem' }}>Client Testimonials</span>
              <h2 style={{ fontSize: '2.4rem', color: 'var(--text-main)' }}>What Business Leaders Say</h2>
            </div>

            <div className="grid-3">
              {TESTIMONIALS_LIST.map(t => (
                <div key={t.id} className="glass-card" style={{ padding: '2rem' }}>
                  <div style={{ display: 'flex', color: '#FBBF24', marginBottom: '1rem' }}>
                    {[...Array(t.rating)].map((_, i) => <Star key={i} size={18} fill="#FBBF24" />)}
                  </div>

                  <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                    "{t.review}"
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                      src={t.avatar}
                      alt={t.name}
                      style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-primary-red)' }}
                    />
                    <div>
                      <strong style={{ fontSize: '1rem', color: 'var(--text-main)', display: 'block' }}>{t.name}</strong>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{t.company}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA BANNER */}
      <section style={{
        background: 'linear-gradient(135deg, #12151E 0%, #1A1F2C 100%)',
        borderTop: '1px solid var(--border-color)',
        padding: '5rem 0',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '750px' }}>
          <h2 style={{ fontSize: '2.6rem', color: '#FFF', marginBottom: '1rem' }}>
            Ready to Elevate Your Brand to the Next Level?
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '1.1rem', marginBottom: '2rem' }}>
            Get custom graphic designs, premium flex printing, and 3D signages crafted by award-winning agency experts.
          </p>
          <button onClick={() => openQuoteModal()} className="btn-primary btn-lg">
            Request Free Instant Consultation
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
