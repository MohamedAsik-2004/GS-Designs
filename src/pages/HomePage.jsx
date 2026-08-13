import React, { useState } from 'react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { BRAND_INFO, SERVICES_LIST, PORTFOLIO_ITEMS, TESTIMONIALS_LIST, FAQ_ITEMS, BLOG_POSTS } from '../data/agencyData';
import { ArrowRight, Sparkles, CheckCircle2, Star, Play, ChevronDown, ChevronUp, SlidersHorizontal, ShieldCheck, Award, Zap, HeartHandshake, Printer, FileText, Palette, Trophy } from 'lucide-react';
import VisitingCard3D from '../components/VisitingCard3D';

const HomePage = () => {
  const { setActivePage, openQuoteModal, openServiceModal, openPortfolioModal, openBlogModal, adminServices, adminPortfolio } = useThemeLanguage();
  
  // Interactive Before/After slider state for Hero/Showcase
  const [sliderVal, setSliderVal] = useState(50);
  const [expandedFaq, setExpandedFaq] = useState(0);

  const displayServices = adminServices || SERVICES_LIST;
  const displayPortfolio = adminPortfolio || PORTFOLIO_ITEMS;

  return (
    <div style={{ overflowX: 'hidden' }}>
      {/* HERO SECTION */}
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
              <div className="badge badge-red" style={{ marginBottom: '1.25rem' }}>
                <Sparkles size={14} /> Ln. G.Shaik Alaudeen's Creative Advertising Agency
              </div>

              <h1 style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
                fontWeight: '900',
                color: 'var(--text-main)',
                marginBottom: '1.25rem',
                lineHeight: 1.1,
                letterSpacing: '-0.03em'
              }}>
                Ideas That <span className="text-gradient-red">Elevate Brands</span>
              </h1>

              <p style={{
                fontSize: '1.15rem',
                color: 'var(--text-muted)',
                marginBottom: '2rem',
                lineHeight: 1.6,
                maxWidth: '560px'
              }}>
                Specializing in Invitation Cards, Solvent Flex Printing, Commercial Notices, Vector Logo Design, and Custom Shield & Mementos across Nagapattinam and beyond.
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
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

            {/* Hero Right Content: 3D Interactive Visiting Card Component */}
            <div>
              <VisitingCard3D />
            </div>
          </div>
        </div>
      </section>

      {/* STATS COUNTER BAR */}
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

      {/* SERVICES PREVIEW GRID */}
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
            {displayServices.slice(0, 6).map((srv) => (
              <div key={srv.id} className="glass-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '180px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={srv.image}
                    alt={srv.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    onMouseEnter={e => e.target.style.transform = 'scale(1.08)'}
                    onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                  />
                  {srv.popular && (
                    <span className="badge badge-red" style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                      Popular Choice
                    </span>
                  )}
                </div>

                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--color-emerald)', fontWeight: '700', textTransform: 'uppercase' }}>
                      {srv.category}
                    </span>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', margin: '4px 0 8px' }}>
                      {srv.title}
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                      {srv.description}
                    </p>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.85rem' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Starting From</span>
                      <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary-red)' }}>{srv.startingPrice}</strong>
                    </div>

                    <button
                      onClick={() => openServiceModal(srv)}
                      className="btn-secondary"
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      View Details & Pricing
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button
              onClick={() => setActivePage('services')}
              className="btn-primary btn-lg"
            >
              Explore All 18 Advertising Services
            </button>
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER COMPARISON HIGHLIGHT */}
      <section style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
        padding: '6rem 0'
      }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <span className="badge badge-red" style={{ marginBottom: '0.75rem' }}>Visual Transformation</span>
              <h2 style={{ fontSize: '2.2rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
                See How We Elevate Outdated Branding
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                Drag the interactive slider to compare old client branding against our modern luxury redesign. Notice how typography, contrast, and color palette completely redefine brand authority.
              </p>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--color-emerald)' }} /> 300% Higher Visual Retention & Recall
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--color-emerald)' }} /> Weatherproof Outdoor Durability Guarantee
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--color-emerald)' }} /> Vector Master Source Files Included
                </li>
              </ul>

              <button onClick={() => openQuoteModal()} className="btn-emerald">
                Redesign Your Brand Today
              </button>
            </div>

            {/* Slider Widget */}
            <div style={{
              position: 'relative',
              width: '100%',
              height: '360px',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--border-color)'
            }}>
              <img
                src={displayPortfolio[0]?.image}
                alt="New GS Designs Branding"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span className="badge badge-emerald" style={{ position: 'absolute', bottom: '1rem', right: '1rem', zIndex: 10 }}>
                AFTER (GS DESIGNS REDESIGN)
              </span>

              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                width: `${sliderVal}%`,
                overflow: 'hidden'
              }}>
                <img
                  src={displayPortfolio[0]?.beforeImage}
                  alt="Old Branding"
                  style={{ width: '600px', height: '100%', objectFit: 'cover', maxWidth: 'none' }}
                />
                <span className="badge badge-dark" style={{ position: 'absolute', bottom: '1rem', left: '1rem', zIndex: 10 }}>
                  BEFORE (OLD BRANDING)
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={sliderVal}
                onChange={e => setSliderVal(e.target.value)}
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
                left: `${sliderVal}%`,
                width: '3px',
                background: '#FFF',
                zIndex: 15
              }}>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: 'var(--color-primary-red)',
                  color: '#FFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '0.85rem'
                }}>
                  ↔
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO HIGHLIGHTS */}
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

      {/* TESTIMONIALS SLIDER / GOOGLE REVIEWS */}
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
