import React, { useState } from 'react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { PORTFOLIO_ITEMS } from '../data/agencyData';
import { Search, Download, Eye, SlidersHorizontal, Sparkles } from 'lucide-react';

const PortfolioPage = () => {
  const { openPortfolioModal, openQuoteModal, adminPortfolio } = useThemeLanguage();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Branding', 'Signage', 'Packaging', 'Invitation', 'Flex', 'Business Cards', 'Social Media'];

  const itemsToDisplay = adminPortfolio || PORTFOLIO_ITEMS;

  const filteredItems = itemsToDisplay.filter(item => {
    const matchesCat = activeCategory === 'All' || item.category === activeCategory;
    const matchesQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  const handleDownloadFullPortfolio = () => {
    alert("Downloading GS Designs Master Agency PDF Portfolio (45MB)...");
  };

  return (
    <div style={{ padding: '4rem 0' }}>
      <div className="container">
        {/* Title Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <span className="badge badge-red" style={{ marginBottom: '0.75rem' }}>Creative Showcase</span>
            <h1 style={{ fontSize: '3rem', color: 'var(--text-main)' }}>Agency Portfolio</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginTop: '6px' }}>
              Explore real client case studies across packaging, 3D LED sign boards, royal invites, and branding identities.
            </p>
          </div>

          <button onClick={handleDownloadFullPortfolio} className="btn-emerald btn-lg">
            <Download size={20} />
            <span>Download Master PDF Portfolio</span>
          </button>
        </div>

        {/* Filter Controls */}
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
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search by project name, client, or tag (e.g. Gold Foil, LED, Packaging)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.8rem' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`btn-sm ${activeCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Masonry Grid */}
        <div className="grid-3">
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => openPortfolioModal(item)}
              className="glass-card"
              style={{ cursor: 'pointer', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ height: '260px', overflow: 'hidden', position: 'relative' }}>
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

                {item.beforeImage && (
                  <span className="badge badge-emerald" style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <SlidersHorizontal size={12} /> Before/After Split
                  </span>
                )}
              </div>

              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '6px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.5 }}>
                    {item.description}
                  </p>
                </div>

                <div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '1rem' }}>
                    {item.tags.map((t, idx) => (
                      <span key={idx} className="badge badge-dark" style={{ fontSize: '0.7rem' }}>#{t}</span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', fontSize: '0.82rem', color: 'var(--text-dim)' }}>
                    <span>Client: {item.client}</span>
                    <span style={{ color: 'var(--color-primary-red)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Eye size={14} /> View Case Study
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)' }}>
            No portfolio projects matched search filter.
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioPage;
