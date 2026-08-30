import React, { useState } from 'react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { SERVICES_LIST } from '../data/agencyData';
import { Search, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';

const ServicesPage = () => {
  const { openServiceModal, openQuoteModal, adminServices } = useThemeLanguage();
  const [selectedCat, setSelectedCat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Branding', 'Printing', 'Signage', 'Print & Digital', 'Digital Marketing', 'Custom Printing'];

  const servicesToDisplay = adminServices || SERVICES_LIST;

  const filteredServices = servicesToDisplay.filter(srv => {
    const matchesCat = selectedCat === 'All' || srv.category === selectedCat;
    const matchesQuery = srv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         srv.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div style={{ padding: '4rem 0' }}>
      <div className="container">
        {/* Page Title */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem' }}>
          <span className="badge badge-red" style={{ marginBottom: '0.75rem' }}>18 Specialist Services</span>
          <h1 style={{ fontSize: '3rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
            Full-Spectrum Advertising & Custom Printing Solutions
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            From high-end vector logo design to 3D LED storefront signboards, solvent flex banners, and NFC smart cards.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          marginBottom: '3rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {/* Search Input */}
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search services (e.g. Logo, Flex, LED Sign, Visiting Card)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.8rem' }}
            />
          </div>

          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`btn-sm ${selectedCat === cat ? 'btn-primary' : 'btn-secondary'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid-3">
          {filteredServices.map(srv => (
            <div key={srv.id} className="glass-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={srv.image || "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80"}
                  alt={srv.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.08)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                />
                <span className="badge badge-dark" style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                  {srv.category}
                </span>
                {srv.popular && (
                  <span className="badge badge-red" style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                    Popular
                  </span>
                )}
              </div>

              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '8px' }}>
                    {srv.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                    {srv.description}
                  </p>

                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '1.25rem' }}>
                    {srv.features.slice(0, 3).map((f, i) => (
                      <li key={i} style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <CheckCircle size={14} style={{ color: 'var(--color-emerald)', flexShrink: 0 }} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.85rem' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => openServiceModal(srv)}
                      className="btn-secondary btn-sm"
                      style={{ flex: 1, justifyContent: 'center' }}
                    >
                      Details
                    </button>
                    <button
                      onClick={() => openQuoteModal(srv)}
                      className="btn-primary btn-sm"
                      style={{ flex: 1, justifyContent: 'center' }}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)' }}>
            No advertising services matched your search term "{searchQuery}".
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
