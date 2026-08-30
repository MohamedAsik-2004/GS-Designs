import React, { useState, useRef } from 'react';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';
import { Plus, Trash2, Edit, Star, Image, X, Search, Upload } from 'lucide-react';

const processImageUpload = (file, callback) => {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (event) => {
    const dataUrl = event.target.result;
    const img = new window.Image();
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 400;
        const MAX_HEIGHT = 400;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const compressed = canvas.toDataURL('image/jpeg', 0.85);
        callback(compressed);
      } catch (err) {
        callback(dataUrl);
      }
    };
    img.onerror = () => callback(dataUrl);
    img.src = dataUrl;
  };
  reader.readAsDataURL(file);
};

const PortfolioManagerView = () => {
  const { adminPortfolio, setAdminPortfolio, notifyCrossTabSync } = useThemeLanguage();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Branding');
  const [client, setClient] = useState('');
  const [year, setYear] = useState('2026');
  const [image, setImage] = useState('');
  const [desc, setDesc] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processImageUpload(file, setImage);
  };

  const openAddModal = () => {
    setEditingId(null);
    setTitle('');
    setCategory('Branding');
    setClient('');
    setYear('2026');
    setImage('');
    setDesc('');
    setModalOpen(true);
  };

  const openEditModal = (proj) => {
    setEditingId(proj.id);
    setTitle(proj.title);
    setCategory(proj.category || 'Branding');
    setClient(proj.client || '');
    setYear(proj.year || '2026');
    setImage(proj.image || '');
    setDesc(proj.description || '');
    setModalOpen(true);
  };

  const handleSaveProject = (e) => {
    e.preventDefault();

    let updatedPortfolio;
    if (editingId) {
      // Update Existing
      updatedPortfolio = adminPortfolio.map(p => p.id === editingId ? {
        ...p,
        title,
        category,
        service: `${category} Design`,
        client: client || "Client Brand",
        year,
        image: image || "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1000&q=80",
        description: desc || p.description
      } : p);
    } else {
      // Add New
      const newProj = {
        id: Date.now(),
        title,
        category,
        service: `${category} Design`,
        client: client || "Client Brand",
        year,
        image: image || "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1000&q=80",
        description: desc || "New agency portfolio project added via Admin Panel.",
        tags: [category, "2026", "GS Designs"],
        featured: false
      };
      updatedPortfolio = [newProj, ...adminPortfolio];
    }

    setAdminPortfolio(updatedPortfolio);
    notifyCrossTabSync('gs_admin_portfolio', updatedPortfolio);
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this project item?")) {
      const updatedPortfolio = adminPortfolio.filter(p => p.id !== id);
      setAdminPortfolio(updatedPortfolio);
      notifyCrossTabSync('gs_admin_portfolio', updatedPortfolio);
    }
  };

  const toggleFeatured = (id) => {
    const updatedPortfolio = adminPortfolio.map(p => p.id === id ? { ...p, featured: !p.featured } : p);
    setAdminPortfolio(updatedPortfolio);
    notifyCrossTabSync('gs_admin_portfolio', updatedPortfolio);
  };

  const filteredProjects = adminPortfolio.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase()) ||
    (p.client && p.client.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)' }}>Portfolio Project Manager</h3>
          <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>{adminPortfolio.length} Live Showcase Items</span>
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '220px' }}>
            <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '32px', fontSize: '0.85rem' }}
            />
          </div>

          <button onClick={openAddModal} className="btn-primary">
            <Plus size={18} />
            <span>Add New Project</span>
          </button>
        </div>
      </div>

      {/* Portfolio Table */}
      <div className="glass-card" style={{ padding: '1rem', overflowX: 'auto' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Preview</th>
              <th>Project Title</th>
              <th>Category</th>
              <th>Client</th>
              <th>Year</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map(proj => (
              <tr key={proj.id}>
                <td>
                  <img src={proj.image} alt={proj.title} style={{ width: '50px', height: '40px', objectFit: 'cover', borderRadius: '6px' }} />
                </td>
                <td style={{ fontWeight: '600', color: 'var(--text-main)' }}>{proj.title}</td>
                <td><span className="badge badge-dark">{proj.category}</span></td>
                <td style={{ color: 'var(--text-muted)' }}>{proj.client}</td>
                <td style={{ color: 'var(--text-dim)' }}>{proj.year}</td>
                <td>
                  <button
                    onClick={() => toggleFeatured(proj.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: proj.featured ? '#FBBF24' : 'var(--text-dim)' }}
                    title={proj.featured ? "Featured Project" : "Click to Feature"}
                  >
                    <Star size={18} fill={proj.featured ? '#FBBF24' : 'none'} />
                  </button>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => openEditModal(proj)} className="btn-secondary btn-sm" title="Edit Project">
                      <Edit size={14} />
                    </button>
                    <button onClick={() => handleDelete(proj.id)} style={{ background: 'none', border: 'none', color: '#FF4D58', cursor: 'pointer', padding: '4px' }} title="Delete Project">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Project Modal */}
      {modalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 100000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', backdropFilter: 'blur(8px)' }}>
          <div className="glass-card" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', maxWidth: '540px', width: '100%', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', margin: 0 }}>
                {editingId ? 'Edit Portfolio Project' : 'Add New Portfolio Project'}
              </h3>
              <button onClick={() => setModalOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveProject}>
              <div className="form-group">
                <label className="form-label">Project Title *</label>
                <input type="text" required value={title} onChange={e => setTitle(e.target.value)} className="form-input" placeholder="e.g. Apex 3D LED Board" />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select value={category} onChange={e => setCategory(e.target.value)} className="form-select">
                    <option value="Branding">Branding</option>
                    <option value="Signage">Signage</option>
                    <option value="Packaging">Packaging</option>
                    <option value="Invitation">Invitation</option>
                    <option value="Flex">Flex</option>
                    <option value="Business Cards">Business Cards</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Client Name</label>
                  <input type="text" value={client} onChange={e => setClient(e.target.value)} className="form-input" placeholder="e.g. Apex Global" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Project Image (Upload File or Enter URL)</label>
                {image && (
                  <div style={{ position: 'relative', marginBottom: '10px', width: '100%', height: '140px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                    <img src={image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button
                      type="button"
                      onClick={() => setImage('')}
                      style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(239, 68, 68, 0.85)', color: '#fff', border: 'none', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      title="Remove Image"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <label
                    className="btn-secondary"
                    style={{ flex: 1, justifyContent: 'center', cursor: 'pointer', margin: 0, display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Upload size={16} />
                    <span>Upload Image File</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      onClick={(e) => { e.target.value = null; }}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>
                <input
                  type="text"
                  value={image}
                  onChange={e => setImage(e.target.value)}
                  className="form-input"
                  style={{ marginTop: '8px', fontSize: '0.85rem' }}
                  placeholder="Or paste image URL (https://...)"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Project Description</label>
                <textarea rows="3" value={desc} onChange={e => setDesc(e.target.value)} className="form-textarea" placeholder="Brief project summary..." />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                {editingId ? 'Save Changes' : 'Create Project'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioManagerView;
