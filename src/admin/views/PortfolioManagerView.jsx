import React, { useState } from 'react';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';
import { Plus, Trash2, Edit, Star, Image, X, Search } from 'lucide-react';

const PortfolioManagerView = () => {
  const { adminPortfolio, setAdminPortfolio } = useThemeLanguage();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Branding');
  const [client, setClient] = useState('');
  const [year, setYear] = useState('2026');
  const [image, setImage] = useState('');
  const [desc, setDesc] = useState('');

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

    if (editingId) {
      // Update Existing
      setAdminPortfolio(prev => prev.map(p => p.id === editingId ? {
        ...p,
        title,
        category,
        service: `${category} Design`,
        client: client || "Client Brand",
        year,
        image: image || "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1000&q=80",
        description: desc || p.description
      } : p));
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
      setAdminPortfolio(prev => [newProj, ...prev]);
    }

    setModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this project item?")) {
      setAdminPortfolio(prev => prev.filter(p => p.id !== id));
    }
  };

  const toggleFeatured = (id) => {
    setAdminPortfolio(prev => prev.map(p => p.id === id ? { ...p, featured: !p.featured } : p));
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
                <label className="form-label">Image URL</label>
                <input type="url" value={image} onChange={e => setImage(e.target.value)} className="form-input" placeholder="https://images.unsplash.com/..." />
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
