import React from 'react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { BRAND_INFO, TEAM_MEMBERS } from '../data/agencyData';
import { Target, Compass, Award, ShieldCheck, Globe, Share2, Sparkles } from 'lucide-react';

const AboutPage = () => {
  const { openQuoteModal } = useThemeLanguage();

  const timelineEvents = [
    { year: "2014", title: "Agency Founded", desc: "Started as a boutique graphic design studio in New Delhi with 2 printing presses." },
    { year: "2017", title: "Large Format Expansion", desc: "Acquired Roland solvent & UV printers for commercial outdoor flex hoardings." },
    { year: "2020", title: "Digital Campaign Unit", desc: "Expanded into 3D motion design, reels, and digital advertising blitzes." },
    { year: "2023", title: "5000+ Milestone", desc: "Crossed 5,000 completed corporate projects and expanded client lounge." },
    { year: "2026", title: "Smart NFC & AI Branding", desc: "Introduced NFC visiting cards, security certificates & AI packaging renders." }
  ];

  return (
    <div style={{ padding: '4rem 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem' }}>
          <span className="badge badge-red" style={{ marginBottom: '0.75rem' }}>Our Agency Story</span>
          <h1 style={{ fontSize: '3rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
            Elevating Brands Through Exceptional Design & Precision Printing
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            Since 2014, GS Designs has been the silent engine behind iconic corporate identities, retail signages, and mass printing campaigns.
          </p>
        </div>

        {/* Mission / Vision Cards */}
        <div className="grid-3" style={{ marginBottom: '5rem' }}>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(227, 6, 19, 0.15)', color: '#E30613', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Target size={24} />
            </div>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '0.75rem' }}>Our Mission</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              To empower every business with visual branding that commands attention, instills trust, and drives measurable revenue growth.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(0, 166, 81, 0.15)', color: '#00A651', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Compass size={24} />
            </div>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '0.75rem' }}>Our Vision</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              To remain the most trusted full-service advertising agency in the region, bridging physical craftsmanship with modern digital innovation.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(251, 191, 36, 0.15)', color: '#FBBF24', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Award size={24} />
            </div>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '0.75rem' }}>Why Choose Us</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Zero compromise on paper GSM, color calibration, and installation safety. 24/7 dedicated support for emergency printing.
            </p>
          </div>
        </div>

        {/* Timeline Section */}
        <div style={{ marginBottom: '6rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="badge badge-emerald">Growth & Milestones</span>
            <h2 style={{ fontSize: '2.2rem', color: 'var(--text-main)', marginTop: '4px' }}>Our 12-Year Agency Journey</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
            {timelineEvents.map((ev, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--color-primary-red)', fontFamily: 'var(--font-heading)', width: '80px', flexShrink: 0 }}>
                  {ev.year}
                </div>
                <div style={{ borderLeft: '2px solid var(--border-color)', paddingLeft: '1.5rem' }}>
                  <h4 style={{ fontSize: '1.15rem', color: 'var(--text-main)', marginBottom: '4px' }}>{ev.title}</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>{ev.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Members Grid */}
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="badge badge-red">Creative Minds</span>
            <h2 style={{ fontSize: '2.2rem', color: 'var(--text-main)' }}>Meet Our Leadership Team</h2>
          </div>

          <div className="grid-4">
            {TEAM_MEMBERS.map((m, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
                <img
                  src={m.image}
                  alt={m.name}
                  style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}
                />
                <h4 style={{ fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '2px' }}>{m.name}</h4>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-emerald)', fontWeight: '600', display: 'block', marginBottom: '8px' }}>
                  {m.position}
                </span>
                <span className="badge badge-dark" style={{ marginBottom: '1rem' }}>{m.experience} Experience</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
