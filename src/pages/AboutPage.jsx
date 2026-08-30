import React from 'react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { TEAM_MEMBERS } from '../data/agencyData';
import { Target, Compass, Award, Briefcase, MapPin, Clock, ArrowRight, Sparkles } from 'lucide-react';

const AboutPage = () => {
  const { cmsStory, adminCareers, openResumeModal, setActivePage, cmsSections, adminTimeline, adminTeam } = useThemeLanguage();

  const timelineEvents = adminTimeline || [];
  const teamMembers = adminTeam || [];

  const careerList = adminCareers || [];

  return (
    <div style={{ padding: '4rem 0' }}>
      <div className="container">
        {/* Header / Main Story */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
          <span className="badge badge-red" style={{ marginBottom: '0.75rem' }}>Our Agency Story</span>
          <h1 style={{ fontSize: '3rem', color: 'var(--text-main)', marginBottom: '1rem', lineHeight: 1.2 }}>
            {cmsStory?.headline || "Elevating Brands Through Exceptional Design & Precision Printing"}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.6 }}>
            {cmsStory?.description || "Since 2014, GS Designs has been the silent engine behind iconic corporate identities, retail signages, and mass printing campaigns."}
          </p>
        </div>

        {/* Optional Agency Story Banner Image */}
        {cmsStory?.bannerImage && (
          <div style={{
            marginBottom: '4rem',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            maxHeight: '400px',
            border: '1px solid var(--border-color)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
          }}>
            <img
              src={cmsStory.bannerImage}
              alt="GS Designs Agency Story Banner"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}

        {/* Mission / Vision / Why Choose Us Cards */}
        {cmsSections?.aboutStory !== false && (
          <div className="grid-3" style={{ marginBottom: '5rem' }}>
            <div className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(227, 6, 19, 0.15)', color: '#E30613', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Target size={24} />
              </div>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '0.75rem' }}>Our Mission</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                {cmsStory?.mission || "To empower every business with visual branding that commands attention, instills trust, and drives measurable revenue growth."}
              </p>
            </div>

            <div className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(0, 166, 81, 0.15)', color: '#00A651', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Compass size={24} />
              </div>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '0.75rem' }}>Our Vision</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                {cmsStory?.vision || "To remain the most trusted full-service advertising agency in the region, bridging physical craftsmanship with modern digital innovation."}
              </p>
            </div>

            <div className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(251, 191, 36, 0.15)', color: '#FBBF24', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Award size={24} />
              </div>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '0.75rem' }}>Why Choose Us</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                {cmsStory?.whyUs || "Zero compromise on paper GSM, color calibration, and installation safety. 24/7 dedicated support for emergency printing."}
              </p>
            </div>
          </div>
        )}

        {/* Timeline Section */}
        {cmsSections?.agencyTimeline !== false && (
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
                  <div style={{ borderLeft: '2px solid var(--border-color)', paddingLeft: '1.5rem', flex: 1 }}>
                    <h4 style={{ fontSize: '1.15rem', color: 'var(--text-main)', marginBottom: '4px' }}>{ev.title}</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>{ev.desc}</p>
                  </div>
                  {ev.image && (
                    <img
                      src={ev.image}
                      alt={ev.title}
                      style={{ width: '70px', height: '70px', borderRadius: '12px', objectFit: 'cover', border: '1px solid var(--border-color)', flexShrink: 0 }}
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Team Members Grid */}
        {cmsSections?.leadershipTeam !== false && (
          <div style={{ marginBottom: '6rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <span className="badge badge-red">Creative Minds</span>
              <h2 style={{ fontSize: '2.2rem', color: 'var(--text-main)' }}>Meet Our Leadership Team</h2>
            </div>

            <div className="grid-4">
              {teamMembers.map((m, idx) => (
                <div key={m.id || idx} className="glass-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
                  <img
                    src={m.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                    alt={m.name}
                    style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
                    }}
                  />
                  <h4 style={{ fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '2px' }}>{m.name}</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-emerald)', fontWeight: '600', display: 'block', marginBottom: '8px' }}>
                    {m.position}
                  </span>
                  {m.experience && <span className="badge badge-dark" style={{ marginBottom: '1rem' }}>{m.experience} Experience</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Join GS Designs - Careers Showcase Section */}
        <div className="glass-card" style={{ padding: '3rem', border: '1px solid rgba(0, 166, 81, 0.4)', background: 'linear-gradient(135deg, var(--bg-secondary), rgba(0, 166, 81, 0.05))' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div>
              <span className="badge badge-emerald" style={{ marginBottom: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={14} /> Careers & Opportunities
              </span>
              <h2 style={{ fontSize: '2.2rem', color: 'var(--text-main)', margin: 0 }}>Join GS Designs Team</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', marginTop: '6px' }}>
                We are actively hiring creative artists, pre-press specialists, and flex printing technicians.
              </p>
            </div>
            <button onClick={() => setActivePage('careers')} className="btn-emerald">
              <span>View All Careers ({careerList.length})</span>
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid-3" style={{ gap: '1.5rem' }}>
            {careerList.slice(0, 3).map((job) => (
              <div key={job.id} style={{ background: 'var(--bg-main)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span className="badge badge-dark" style={{ fontSize: '0.75rem' }}>{job.department}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-emerald)', fontWeight: 'bold' }}>{job.type}</span>
                  </div>
                  <h4 style={{ fontSize: '1.15rem', color: 'var(--text-main)', marginBottom: '8px' }}>{job.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {job.description}
                  </p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '10px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={12} style={{ color: 'var(--color-primary-red)' }} /> {job.location}
                  </span>
                  <button onClick={() => openResumeModal(job)} className="btn-primary btn-sm" style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}>
                    <span>Apply Now</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
