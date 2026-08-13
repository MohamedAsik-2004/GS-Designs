import React, { useState } from 'react';
import { HardDrive, Upload, Folder, Image, Video, FileText, Search, Trash2, Copy, Check, Plus, X } from 'lucide-react';

const MediaLibraryView = () => {
  const [selectedFolder, setSelectedFolder] = useState('All');
  const [search, setSearch] = useState('');
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [uploadModal, setUploadModal] = useState(false);

  const [fileName, setFileName] = useState('');
  const [fileFolder, setFileFolder] = useState('Images');
  const [fileType, setFileType] = useState('PNG Image');
  const [fileSize, setFileSize] = useState('4.2 MB');

  const [mediaFiles, setMediaFiles] = useState([
    { name: "GS_Designs_Logo_Vector_Master.ai", type: "Vector AI", size: "14.2 MB", folder: "Vectors", date: "2026-08-10", url: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1000&q=80" },
    { name: "Aura_Packaging_Mockup_Render.psd", type: "Photoshop PSD", size: "84.5 MB", folder: "PSD", date: "2026-08-08", url: "https://images.unsplash.com/photo-1542744094-3a31b272c490?auto=format&fit=crop&w=1000&q=80" },
    { name: "Apex_Building_Signboard_LED_3D.png", type: "PNG Image", size: "6.8 MB", folder: "Images", date: "2026-08-05", url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80" },
    { name: "Royal_Wedding_Gold_Invite_Video.mp4", type: "MP4 Video", size: "45.0 MB", folder: "Videos", date: "2026-08-01", url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80" },
    { name: "GS_Designs_Master_Agency_Catalog.pdf", type: "PDF Document", size: "28.4 MB", folder: "PDFs", date: "2026-07-28", url: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1000&q=80" }
  ]);

  const handleUpload = (e) => {
    e.preventDefault();
    const newFile = {
      name: fileName || `Media_Asset_${Date.now()}.png`,
      type: fileType,
      size: fileSize,
      folder: fileFolder,
      date: new Date().toISOString().split('T')[0],
      url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80"
    };
    setMediaFiles(prev => [newFile, ...prev]);
    setUploadModal(false);
    setFileName('');
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this media asset?")) {
      setMediaFiles(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleCopyUrl = (url, index) => {
    navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const filtered = mediaFiles.filter(f => {
    const matchesFolder = selectedFolder === 'All' || f.folder === selectedFolder;
    const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  return (
    <div>
      {/* Storage usage bar */}
      <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.15rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HardDrive size={20} style={{ color: 'var(--color-primary-red)' }} /> Central Cloud Media Storage
          </h3>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {(mediaFiles.length * 12.4).toFixed(1)} GB Used of 100 GB High Speed Cloud Storage
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ width: '200px' }}>
            <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${Math.min(100, mediaFiles.length * 12)}%`, height: '100%', background: 'linear-gradient(90deg, #E30613, #00A651)' }} />
            </div>
          </div>

          <button onClick={() => setUploadModal(true)} className="btn-emerald btn-sm">
            <Upload size={14} /> Upload Media
          </button>
        </div>
      </div>

      {/* Filter and Search */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['All', 'Images', 'Vectors', 'PSD', 'Videos', 'PDFs'].map(fol => (
            <button
              key={fol}
              onClick={() => setSelectedFolder(fol)}
              className={`btn-sm ${selectedFolder === fol ? 'btn-primary' : 'btn-secondary'}`}
            >
              {fol}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', width: '250px' }}>
          <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input type="text" placeholder="Search media..." value={search} onChange={e => setSearch(e.target.value)} className="form-input" style={{ paddingLeft: '30px', fontSize: '0.85rem' }} />
        </div>
      </div>

      {/* Grid */}
      <div className="grid-3">
        {filtered.map((f, i) => (
          <div key={i} className="glass-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', overflow: 'hidden' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(227, 6, 19, 0.15)', color: '#E30613', display: 'flex', alignItems: 'center', justifyContent: 'center', shrink: 0 }}>
                {f.folder === 'Videos' ? <Video size={20} /> : f.folder === 'Images' ? <Image size={20} /> : <FileText size={20} />}
              </div>
              <div style={{ overflow: 'hidden' }}>
                <strong style={{ color: 'var(--text-main)', fontSize: '0.88rem', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.name}</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{f.type} • {f.size}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '4px' }}>
              <button
                onClick={() => handleCopyUrl(f.url, i)}
                style={{ background: 'none', border: 'none', color: copiedIndex === i ? '#10B981' : 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
                title="Copy Asset URL"
              >
                {copiedIndex === i ? <Check size={16} /> : <Copy size={16} />}
              </button>
              <button
                onClick={() => handleDelete(i)}
                style={{ background: 'none', border: 'none', color: '#FF4D58', cursor: 'pointer', padding: '4px' }}
                title="Delete Media File"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {uploadModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 100000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', backdropFilter: 'blur(8px)' }}>
          <div className="glass-card" style={{ maxWidth: '480px', width: '100%', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', margin: 0 }}>Upload New Media Asset</h3>
              <button onClick={() => setUploadModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleUpload}>
              <div className="form-group">
                <label className="form-label">Asset File Name *</label>
                <input type="text" required value={fileName} onChange={e => setFileName(e.target.value)} className="form-input" placeholder="e.g. GS_Designs_Banner.png" />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Folder</label>
                  <select value={fileFolder} onChange={e => setFileFolder(e.target.value)} className="form-select">
                    <option value="Images">Images</option>
                    <option value="Vectors">Vectors</option>
                    <option value="PSD">PSD</option>
                    <option value="Videos">Videos</option>
                    <option value="PDFs">PDFs</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Format Type</label>
                  <select value={fileType} onChange={e => setFileType(e.target.value)} className="form-select">
                    <option value="PNG Image">PNG Image</option>
                    <option value="Vector AI">Vector AI</option>
                    <option value="Photoshop PSD">Photoshop PSD</option>
                    <option value="MP4 Video">MP4 Video</option>
                    <option value="PDF Document">PDF Document</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">File Size</label>
                <input type="text" value={fileSize} onChange={e => setFileSize(e.target.value)} className="form-input" placeholder="e.g. 5.4 MB" />
              </div>

              <button type="submit" className="btn-emerald" style={{ width: '100%', justifyContent: 'center' }}>
                <Upload size={16} /> Confirm Asset Upload
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaLibraryView;
