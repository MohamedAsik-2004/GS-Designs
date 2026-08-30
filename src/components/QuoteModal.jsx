import React, { useState, useEffect } from 'react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { SERVICES_LIST } from '../data/agencyData';
import { X, FileText, CheckCircle2, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

const QuoteModal = () => {
  const { quoteModalOpen, closeQuoteModal, selectedQuoteService, submitQuoteRequest, adminServices } = useThemeLanguage();

  const servicesList = adminServices || SERVICES_LIST;
  const [serviceId, setServiceId] = useState('logo-design');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (selectedQuoteService) {
      setServiceId(selectedQuoteService.id || 'logo-design');
    }
  }, [selectedQuoteService]);

  if (!quoteModalOpen) return null;

  const currentService = servicesList.find(s => s.id === serviceId) || servicesList[0] || SERVICES_LIST[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    submitQuoteRequest({
      name,
      company,
      email,
      phone,
      service: currentService.title,
      budget: 'Custom Scope',
      details
    });

    setSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      setSubmitted(false);
      closeQuoteModal();
      setName('');
      setCompany('');
      setEmail('');
      setPhone('');
      setDetails('');
    }, 3000);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.75)',
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
        maxWidth: '650px',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        boxShadow: 'var(--shadow-lg)',
        padding: '2rem'
      }}>
        {/* Close Button */}
        <button
          onClick={closeQuoteModal}
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
          <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <div style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              background: 'rgba(0, 166, 81, 0.15)',
              border: '2px solid #00A651',
              color: '#00A651',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem'
            }}>
              <CheckCircle2 size={40} />
            </div>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Quote Request Sent!</h3>
            <p style={{ color: 'var(--text-muted)', maxWidth: '420px', margin: '0 auto' }}>
              Thank you, <strong>{name}</strong>. Our senior advertising consultant will review your specifications and contact you on <strong>{phone || email}</strong> within 2 hours.
            </p>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #E30613, #B3000C)',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <FileText size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)' }}>Request Instant Custom Quote</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Get free design consultation & expert project estimation</p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Service Select */}
              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label className="form-label">Select Advertising Service</label>
                <select
                  value={serviceId}
                  onChange={e => setServiceId(e.target.value)}
                  className="form-select"
                >
                  {servicesList.map(s => (
                    <option key={s.id} value={s.id} style={{ background: '#12151E' }}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* User Info Fields */}
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Company / Brand Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Apex Enterprises"
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="rahul@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Project Details & Custom Requirements</label>
                <textarea
                  rows="3"
                  placeholder="Specify dimensions, colors, paper weight, or special finishes..."
                  value={details}
                  onChange={e => setDetails(e.target.value)}
                  className="form-textarea"
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}>
                <Send size={18} />
                <span>Submit Quote Request</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuoteModal;
