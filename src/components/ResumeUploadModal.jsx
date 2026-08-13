import React, { useState } from 'react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { X, Upload, CheckCircle2, FileText, Briefcase } from 'lucide-react';

const ResumeUploadModal = () => {
  const { resumeModalJob, closeResumeModal } = useThemeLanguage();
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [fileName, setFileName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!resumeModalJob) return null;

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFileName('');
      setApplicantName('');
      setApplicantEmail('');
      setApplicantPhone('');
      closeResumeModal();
    }, 3000);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(10px)',
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
        maxWidth: '580px',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        boxShadow: 'var(--shadow-lg)',
        padding: '2rem'
      }}>
        <button
          onClick={closeResumeModal}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer'
          }}
        >
          <X size={24} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(0, 166, 81, 0.15)',
              border: '2px solid #00A651',
              color: '#00A651',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem'
            }}>
              <CheckCircle2 size={36} />
            </div>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>Application Submitted!</h3>
            <p style={{ color: 'var(--text-muted)' }}>
              Thank you, <strong>{applicantName}</strong>. Our HR team has received your application for <strong>{resumeModalJob.title}</strong>.
            </p>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #00A651, #007036)',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Briefcase size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)' }}>Apply for {resumeModalJob.title}</h3>
                <span className="badge badge-emerald">{resumeModalJob.department} • {resumeModalJob.location}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anish Kumar"
                  value={applicantName}
                  onChange={e => setApplicantName(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="anish@example.com"
                    value={applicantEmail}
                    onChange={e => setApplicantEmail(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 00000"
                    value={applicantPhone}
                    onChange={e => setApplicantPhone(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Resume File Drag & Drop Simulation */}
              <div className="form-group">
                <label className="form-label">Upload Resume (PDF / DOCX) *</label>
                <div style={{
                  border: '2px dashed var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.5rem',
                  textAlign: 'center',
                  background: 'rgba(255, 255, 255, 0.02)',
                  cursor: 'pointer',
                  position: 'relative'
                }}>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    required
                    onChange={handleFileChange}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      opacity: 0,
                      width: '100%',
                      height: '100%',
                      cursor: 'pointer'
                    }}
                  />
                  <Upload size={28} style={{ color: 'var(--color-primary-red)', marginBottom: '8px' }} />
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', margin: 0 }}>
                    {fileName ? <strong>Selected: {fileName}</strong> : 'Click or Drag Resume File Here'}
                  </p>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Supports PDF, DOCX (Max 10MB)</span>
                </div>
              </div>

              <button type="submit" className="btn-emerald" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
                Submit Application
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeUploadModal;
