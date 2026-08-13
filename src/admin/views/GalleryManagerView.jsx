import React, { useState, useRef } from 'react';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';
import { Upload, Image as ImageIcon, Trash2, Shield, Plus, Check, FolderPlus, X } from 'lucide-react';

const GalleryManagerView = () => {
  const { adminGallery, setAdminGallery } = useThemeLanguage();
  const [selectedAlbumId, setSelectedAlbumId] = useState(adminGallery?.[0]?.id || 'printing');
  const [watermark, setWatermark] = useState(true);
  const [dragActive, setDragActive] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [newAlbumTitle, setNewAlbumTitle] = useState('');
  const [showNewAlbumModal, setShowNewAlbumModal] = useState(false);
  const fileInputRef = useRef(null);

  const albums = adminGallery || [];

  const handleFilesSelected = (files) => {
    if (!files || files.length === 0) return;

    const fileList = Array.from(files);
    const newImageItems = [];

    let processedCount = 0;
    fileList.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        newImageItems.push({
          id: 'img_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
          url: dataUrl,
          caption: file.name.replace(/\.[^/.]+$/, "") + (watermark ? ' (GS Watermarked)' : '')
        });
        processedCount++;

        if (processedCount === fileList.length) {
          // Append to target album
          setAdminGallery(prevAlbums => {
            return prevAlbums.map(alb => {
              if (alb.id === selectedAlbumId) {
                return {
                  ...alb,
                  images: [...(alb.images || []), ...newImageItems]
                };
              }
              return alb;
            });
          });

          setStatusMsg(`Successfully uploaded ${fileList.length} image(s) to selected album!`);
          setTimeout(() => setStatusMsg(''), 4000);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesSelected(e.dataTransfer.files);
    }
  };

  const handleDeleteImage = (albumId, imageId) => {
    if (window.confirm('Are you sure you want to delete this photo from the album?')) {
      setAdminGallery(prevAlbums =>
        prevAlbums.map(alb => {
          if (alb.id === albumId) {
            return {
              ...alb,
              images: (alb.images || []).filter(img => img.id !== imageId)
            };
          }
          return alb;
        })
      );
      setStatusMsg('Photo deleted from gallery.');
      setTimeout(() => setStatusMsg(''), 3000);
    }
  };

  const handleCreateAlbum = (e) => {
    e.preventDefault();
    if (!newAlbumTitle.trim()) return;

    const newId = newAlbumTitle.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const newAlbumObj = {
      id: newId,
      title: newAlbumTitle.trim(),
      images: []
    };

    setAdminGallery(prev => [...prev, newAlbumObj]);
    setSelectedAlbumId(newId);
    setNewAlbumTitle('');
    setShowNewAlbumModal(false);
    setStatusMsg(`New Album "${newAlbumTitle.trim()}" created!`);
    setTimeout(() => setStatusMsg(''), 4000);
  };

  const activeAlbumObj = albums.find(a => a.id === selectedAlbumId) || albums[0];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)' }}>Gallery & Album Manager</h3>
          <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Upload photos, manage studio albums, and sync directly with the public visual archive.
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setShowNewAlbumModal(true)}
            className="btn-secondary btn-sm"
          >
            <FolderPlus size={14} />
            <span>Create New Album</span>
          </button>

          <button
            onClick={() => setWatermark(!watermark)}
            className={`btn-sm ${watermark ? 'btn-emerald' : 'btn-secondary'}`}
          >
            <Shield size={14} />
            <span>Auto Watermark: {watermark ? 'ENABLED' : 'DISABLED'}</span>
          </button>
        </div>
      </div>

      {statusMsg && (
        <div className="badge badge-emerald" style={{ padding: '0.85rem', width: '100%', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <Check size={16} /> {statusMsg}
        </div>
      )}

      {/* Target Album Selection */}
      <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px', fontWeight: '600' }}>
          Select Destination Album for New Uploads:
        </label>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {albums.map(alb => (
            <button
              key={alb.id}
              onClick={() => setSelectedAlbumId(alb.id)}
              className={`btn-sm ${selectedAlbumId === alb.id ? 'btn-primary' : 'btn-secondary'}`}
            >
              {alb.title} ({(alb.images || []).length})
            </button>
          ))}
        </div>
      </div>

      {/* File Input Hidden */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => handleFilesSelected(e.target.files)}
        accept="image/*"
        multiple
        style={{ display: 'none' }}
      />

      {/* Drag & Drop Upload Zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current && fileInputRef.current.click()}
        className="glass-card"
        style={{
          padding: '2.5rem',
          textAlign: 'center',
          border: dragActive ? '2px dashed #E30613' : '2px dashed var(--border-color)',
          marginBottom: '2.5rem',
          cursor: 'pointer',
          background: dragActive ? 'rgba(227, 6, 19, 0.05)' : 'var(--bg-card)'
        }}
      >
        <Upload size={42} style={{ color: 'var(--color-primary-red)', marginBottom: '0.75rem' }} />
        <h4 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '4px' }}>
          Click or Drag & Drop Photos into "{activeAlbumObj?.title || 'Selected Album'}"
        </h4>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Upload JPG, PNG, WEBP files from your computer. Uploaded photos will instantly appear on the website.
        </p>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); fileInputRef.current && fileInputRef.current.click(); }}
          className="btn-primary btn-sm"
        >
          Browse & Select Files from Device
        </button>
      </div>

      {/* Albums & Photo Grid Preview */}
      <div style={{ marginBottom: '2rem' }}>
        <h4 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
          Current Album Photos ({activeAlbumObj?.title})
        </h4>

        {activeAlbumObj?.images && activeAlbumObj.images.length > 0 ? (
          <div className="grid-4">
            {activeAlbumObj.images.map(img => (
              <div key={img.id} className="glass-card" style={{ padding: '0.75rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ height: '160px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', position: 'relative', marginBottom: '8px' }}>
                  <img src={img.url} alt={img.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button
                    onClick={() => handleDeleteImage(activeAlbumObj.id, img.id)}
                    style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      background: 'rgba(239, 68, 68, 0.9)',
                      color: '#FFF',
                      border: 'none',
                      borderRadius: '50%',
                      width: '28px',
                      height: '28px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
                    }}
                    title="Delete Image"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', margin: 0, fontWeight: '600', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                  {img.caption}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            <ImageIcon size={36} style={{ marginBottom: '0.5rem', color: 'var(--text-dim)' }} />
            <p style={{ margin: 0 }}>No photos uploaded to this album yet. Upload photos above!</p>
          </div>
        )}
      </div>

      {/* Create New Album Modal */}
      {showNewAlbumModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(6px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}>
          <div className="glass-card" style={{ maxWidth: '450px', width: '100%', padding: '2rem', position: 'relative' }}>
            <button
              onClick={() => setShowNewAlbumModal(false)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '1rem' }}>Create New Gallery Album</h3>

            <form onSubmit={handleCreateAlbum}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">Album Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Storefront Signage 2026"
                  value={newAlbumTitle}
                  onChange={e => setNewAlbumTitle(e.target.value)}
                  className="form-input"
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setShowNewAlbumModal(false)} className="btn-secondary btn-sm">
                  Cancel
                </button>
                <button type="submit" className="btn-primary btn-sm">
                  Create Album
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryManagerView;
