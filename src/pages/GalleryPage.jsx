import React, { useState } from 'react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { Image, Maximize2, Share2, Download, X } from 'lucide-react';

const GalleryPage = () => {
  const { adminGallery } = useThemeLanguage();
  const [selectedAlbum, setSelectedAlbum] = useState('All');
  const [lightboxImg, setLightboxImg] = useState(null);

  const galleryList = adminGallery || [];

  const allImages = galleryList.flatMap(album =>
    (album.images || []).map(img => ({ ...img, albumTitle: album.title, albumId: album.id }))
  );

  const displayedImages = selectedAlbum === 'All'
    ? allImages
    : allImages.filter(img => img.albumId === selectedAlbum);

  return (
    <div style={{ padding: '4rem 0' }}>
      <div className="container">
        {/* Page Title */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
          <span className="badge badge-emerald" style={{ marginBottom: '0.75rem' }}>Visual Archive</span>
          <h1 style={{ fontSize: '3rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
            Printing Works & Studio Gallery
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            Behind-the-scenes look at our high-speed Roland plotters, spot UV machinery, acrylic laser cutting, and installed storefront signages.
          </p>
        </div>

        {/* Album Selector Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '3rem' }}>
          <button
            onClick={() => setSelectedAlbum('All')}
            className={`btn-sm ${selectedAlbum === 'All' ? 'btn-primary' : 'btn-secondary'}`}
          >
            All Photos ({allImages.length})
          </button>

          {galleryList.map(alb => (
            <button
              key={alb.id}
              onClick={() => setSelectedAlbum(alb.id)}
              className={`btn-sm ${selectedAlbum === alb.id ? 'btn-primary' : 'btn-secondary'}`}
            >
              {alb.title} ({(alb.images || []).length})
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid-3">
          {displayedImages.map(img => (
            <div
              key={img.id}
              onClick={() => setLightboxImg(img)}
              className="glass-card"
              style={{ cursor: 'pointer', overflow: 'hidden', position: 'relative' }}
            >
              <div style={{ height: '280px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={img.url}
                  alt={img.caption}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.08)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '1.25rem'
                }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: '700', textTransform: 'uppercase' }}>
                      {img.albumTitle}
                    </span>
                    <h4 style={{ fontSize: '1rem', color: '#FFF', margin: 0 }}>{img.caption}</h4>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Simple Lightbox Modal for Gallery */}
        {lightboxImg && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.9)',
            backdropFilter: 'blur(10px)',
            zIndex: 100000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
          }}>
            <div style={{ position: 'relative', maxWidth: '900px', width: '100%', textAlign: 'center' }}>
              <button
                onClick={() => setLightboxImg(null)}
                style={{
                  position: 'absolute',
                  top: '-40px',
                  right: '0',
                  background: 'none',
                  border: 'none',
                  color: '#FFF',
                  cursor: 'pointer'
                }}
              >
                <X size={30} />
              </button>
              <img
                src={lightboxImg.url}
                alt={lightboxImg.caption}
                style={{ width: '100%', maxHeight: '75vh', objectFit: 'contain', borderRadius: 'var(--radius-md)' }}
              />
              <p style={{ color: '#FFF', marginTop: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>
                {lightboxImg.caption}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;
