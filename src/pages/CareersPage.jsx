import React from 'react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { CAREER_OPENINGS } from '../data/agencyData';
import { Briefcase, MapPin, Clock, ArrowRight, Sparkles } from 'lucide-react';

const CareersPage = () => {
  const { openResumeModal } = useThemeLanguage();

  return (
    <div style={{ padding: '4rem 0' }}>
      <div className="container">
        {/* Title Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem' }}>
          <span className="badge badge-red" style={{ marginBottom: '0.75rem' }}>Join GS Designs</span>
          <h1 style={{ fontSize: '3rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
            Build the Future of Creative Advertising With Us
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            We are always seeking visionaries, 3D render artists, pre-press specialists, and master flex machine technicians.
          </p>
        </div>

        {/* Job Listings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '850px', margin: '0 auto' }}>
          {CAREER_OPENINGS.map(job => (
            <div key={job.id} className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <span className="badge badge-emerald" style={{ marginBottom: '6px' }}>{job.department}</span>
                  <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)' }}>{job.title}</h3>
                </div>
                <button
                  onClick={() => openResumeModal(job)}
                  className="btn-primary"
                >
                  <span>Apply Now</span>
                  <ArrowRight size={18} />
                </button>
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                {job.description}
              </p>

              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.85rem', color: 'var(--text-dim)', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={14} style={{ color: 'var(--color-primary-red)' }} /> {job.location}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={14} style={{ color: 'var(--color-emerald)' }} /> {job.type}
                </span>
                <span>Experience: {job.experience}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareersPage;
