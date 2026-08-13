import React, { useState } from 'react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { BRAND_INFO } from '../data/agencyData';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, CheckCircle2, Navigation } from 'lucide-react';

const ContactPage = () => {
  const { submitContactMessage } = useThemeLanguage();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitContactMessage({
      name,
      email,
      phone,
      subject,
      message
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    }, 4000);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent("Hello GS Designs! I found your contact page and would like to connect.");
    window.open(`https://wa.me/${BRAND_INFO.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <div style={{ padding: '4rem 0' }}>
      <div className="container">
        {/* Title */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem' }}>
          <span className="badge badge-red" style={{ marginBottom: '0.75rem' }}>Let's Connect</span>
          <h1 style={{ fontSize: '3rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
            Get in Touch With Our Creative Agency Team
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            Have a custom flex printing job, logo rebrand, or 3D LED signboard project? Visit our studio lounge or send us a message.
          </p>
        </div>

        <div className="grid-2" style={{ marginBottom: '4rem', gap: '3rem' }}>
          {/* Contact Details & Info Cards */}
          <div>
            <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)' }}>Agency Headquarters</h3>
                <span className="badge badge-emerald">
                  <Clock size={12} /> OPEN NOW
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', color: 'var(--text-muted)', fontSize: '0.98rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <MapPin size={22} style={{ color: 'var(--color-primary-red)', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--text-main)', display: 'block' }}>Studio & Print Workshop Address</strong>
                    <span>{BRAND_INFO.address}, {BRAND_INFO.cityState}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <Phone size={22} style={{ color: 'var(--color-emerald)', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--text-main)', display: 'block' }}>Direct Phone Numbers</strong>
                    <span>{BRAND_INFO.phone} / {BRAND_INFO.altPhone}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <Mail size={22} style={{ color: 'var(--color-primary-red)', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--text-main)', display: 'block' }}>Official Email Desk</strong>
                    <span>{BRAND_INFO.email}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <Clock size={22} style={{ color: 'var(--color-emerald)', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--text-main)', display: 'block' }}>Studio Operating Hours</strong>
                    <span>Mon - Sat: {BRAND_INFO.businessHours.weekdays}</span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                <button onClick={handleWhatsApp} className="btn-emerald" style={{ flex: 1, justifyContent: 'center' }}>
                  <MessageCircle size={18} />
                  <span>WhatsApp Live</span>
                </button>

                <a href={`tel:${BRAND_INFO.phone}`} className="btn-secondary" style={{ flex: 1, justifyContent: 'center', textDecoration: 'none' }}>
                  <Phone size={18} />
                  <span>Call Studio</span>
                </a>
              </div>
            </div>

            {/* Simulated Interactive Map Frame */}
            <div style={{
              height: '240px',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              position: 'relative',
              background: 'linear-gradient(135deg, #12151E, #1E2433)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <Navigation size={36} style={{ color: 'var(--color-primary-red)', marginBottom: '8px' }} />
                <h4 style={{ color: '#FFF', fontSize: '1.1rem' }}>GS Heights Interactive Map</h4>
                <p style={{ fontSize: '0.85rem', color: '#94A3B8', margin: '4px 0 12px' }}>
                  Creative Avenue, Metro Station Road, New Delhi
                </p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(BRAND_INFO.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary btn-sm"
                  style={{ textDecoration: 'none' }}
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-card" style={{ padding: '2.5rem' }}>
            <h3 style={{ fontSize: '1.6rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              Send Direct Message
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
              Fill out the form below and our account desk will respond within 60 minutes.
            </p>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
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
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Message Dispatched!</h3>
                <p style={{ color: 'var(--text-muted)' }}>
                  Thank you, <strong>{name}</strong>. Your message has been saved to our inbox and emailed to our desk.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Malhotra"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="vikram@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
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
                  <label className="form-label">Subject</label>
                  <input
                    type="text"
                    placeholder="e.g. Flex Printing Inquiry for 500 sq.ft"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Your Message *</label>
                  <textarea
                    rows="4"
                    required
                    placeholder="Describe your design specifications, material preferences, or project timeline..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    className="form-textarea"
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}>
                  <Send size={18} />
                  <span>Send Contact Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
