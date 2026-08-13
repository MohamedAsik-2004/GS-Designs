import React, { useState } from 'react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { BLOG_POSTS } from '../data/agencyData';
import { Search, Calendar, User, Clock, ArrowRight } from 'lucide-react';

const BlogPage = () => {
  const { openBlogModal, adminBlog } = useThemeLanguage();
  const [selectedCat, setSelectedCat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Printing Tips', 'Branding Ideas', 'Agency News'];

  const postsToDisplay = adminBlog || BLOG_POSTS;

  const filteredPosts = postsToDisplay.filter(p => {
    const matchesCat = selectedCat === 'All' || p.category === selectedCat;
    const matchesQuery = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div style={{ padding: '4rem 0' }}>
      <div className="container">
        {/* Title */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
          <span className="badge badge-emerald" style={{ marginBottom: '0.75rem' }}>Knowledge & Trends</span>
          <h1 style={{ fontSize: '3rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
            GS Designs Insights & Printing Guide
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            Expert advice on solvent flex printing, high-converting retail signboards, and tactile logo finishes.
          </p>
        </div>

        {/* Filter Bar */}
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
              placeholder="Search articles by keyword (e.g. Flex, Spot UV, LED Sign)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.8rem' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
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

        {/* Articles Grid */}
        <div className="grid-3">
          {filteredPosts.map(post => (
            <div
              key={post.id}
              onClick={() => openBlogModal(post)}
              className="glass-card"
              style={{ cursor: 'pointer', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={post.image}
                  alt={post.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.08)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                />
                <span className="badge badge-red" style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                  {post.category}
                </span>
              </div>

              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '8px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={12} /> {post.date}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> {post.readTime}</span>
                  </div>

                  <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '8px', lineHeight: 1.35 }}>
                    {post.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                    {post.summary}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>By {post.author}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-primary-red)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Read Article <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
