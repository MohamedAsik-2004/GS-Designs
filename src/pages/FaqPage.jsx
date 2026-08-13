import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/agencyData';
import { Search, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FaqPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIndex, setExpandedIndex] = useState(0);

  const filteredFaqs = FAQ_ITEMS.filter(f =>
    f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: '4rem 0' }}>
      <div className="container" style={{ maxWidth: '850px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="badge badge-emerald" style={{ marginBottom: '0.75rem' }}>Help & Knowledge Center</span>
          <h1 style={{ fontSize: '3rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
            Frequently Asked Questions
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            Everything you need to know about vector artwork files, flex printing turnaround, and LED signboard installations.
          </p>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: '3rem' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search questions (e.g. Turnaround, CMYK, LED board, Samples)..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '2.8rem' }}
          />
        </div>

        {/* Accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredFaqs.map((faq, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{ overflow: 'hidden' }}
            >
              <button
                onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                style={{
                  width: '100%',
                  padding: '1.5rem',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-main)',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span>{faq.q}</span>
                {expandedIndex === idx ? <ChevronUp size={22} style={{ color: 'var(--color-primary-red)' }} /> : <ChevronDown size={22} />}
              </button>

              {expandedIndex === idx && (
                <div style={{ padding: '0 1.5rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.6, borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
