import React, { useState, useRef } from 'react';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';
import { BRAND_INFO } from '../../data/agencyData';
import { Save, Download, Upload, ShieldAlert, CheckCircle2, Globe, FileCode, Image, X, Layers, Eye, EyeOff, Sliders, BookOpen, MapPin, Briefcase, Plus, Calendar, Users } from 'lucide-react';

// Reliable, lightweight Image Upload Processor with Instant Preview & Background Canvas Compression
const processImageUpload = (file, onImageReady) => {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (event) => {
    const rawDataUrl = event.target.result;
    if (!rawDataUrl) return;

    // 1. Immediately provide raw base64 data URL for instant UI preview feedback
    onImageReady(rawDataUrl);

    // 2. Asynchronously scale down image to max 250px at 0.75 quality for lightweight localStorage (~10KB)
    const img = new window.Image();
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const MAX_DIM = 250;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_DIM) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          }
        } else {
          if (height > MAX_DIM) {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        const compressed = canvas.toDataURL('image/jpeg', 0.75);
        if (compressed && compressed.length < rawDataUrl.length) {
          onImageReady(compressed);
        }
      } catch (e) {
        // Fallback: rawDataUrl already set
      }
    };
    img.onerror = () => {
      // Fallback: rawDataUrl already set
    };
    img.src = rawDataUrl;
  };
  reader.readAsDataURL(file);
};

const WebsiteManagerView = () => {
  const { maintenanceMode, setMaintenanceMode, adminUser, cmsHero, setCmsHero, cmsSeo, setCmsSeo, cmsSections, setCmsSections, notifyCrossTabSync } = useThemeLanguage();

  const [heroHeadline, setHeroHeadline] = useState(cmsHero.headline);
  const [heroSubtext, setHeroSubtext] = useState(cmsHero.subtext);
  const [heroImage, setHeroImage] = useState(cmsHero.heroImage || '');
  const [seoTitle, setSeoTitle] = useState(cmsSeo.title);
  const [seoDescription, setSeoDescription] = useState(cmsSeo.description);
  const [saved, setSaved] = useState(false);

  const heroFileInputRef = useRef(null);

  const handleHeroImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processImageUpload(file, setHeroImage);
  };

  const handleSaveCMS = (e) => {
    e.preventDefault();
    const updatedHero = { headline: heroHeadline, subtext: heroSubtext, heroImage };
    const updatedSeo = { title: seoTitle, description: seoDescription };
    setCmsHero(updatedHero);
    setCmsSeo(updatedSeo);
    notifyCrossTabSync('gs_cms_hero', updatedHero);
    notifyCrossTabSync('gs_cms_seo', updatedSeo);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleBackupExport = () => {
    const backupData = {
      brand: BRAND_INFO,
      hero: { headline: heroHeadline, subtext: heroSubtext, heroImage },
      seo: { title: seoTitle, description: seoDescription },
      exportedAt: new Date().toISOString()
    };
    const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", jsonStr);
    downloadAnchor.setAttribute("download", `GS_Designs_Backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const SECTION_CONFIG_LIST = [
    { key: 'heroSection', page: 'Homepage', title: 'Homepage Hero Banner & Showcase', desc: 'Hero headline, subtext, CTA buttons, and interactive 3D card or banner image.' },
    { key: 'statsCounter', page: 'Homepage', title: 'Agency Metrics & Achievements Counter Bar', desc: '5000+ Projects, 1000+ Clients, 10+ Years experience counter bar.' },
    { key: 'clientLogoTicker', page: 'Homepage', title: 'Infinite Client Brand Logo Marquee Ticker', desc: 'Auto-scrolling continuous brand ticker displaying top business clients.' },
    { key: 'servicesPreview', page: 'Homepage', title: 'Popular Services Showcase Grid', desc: 'Featured service cards and instant modal previews.' },
    { key: 'portfolioSpotlight', page: 'Homepage', title: 'Portfolio Creative Spotlight Section', desc: 'Recent creative showcases, logos, banners, and invitation samples.' },
    { key: 'testimonialsSection', page: 'Homepage', title: 'Client Reviews & Testimonials', desc: 'Verified client reviews and rating showcase.' },
    { key: 'faqSection', page: 'FAQ Page', title: 'Frequently Asked Questions (FAQ) Accordion', desc: 'Expandable Q&A accordion addressing common client questions.' },
    { key: 'aboutStory', page: 'About Page', title: 'Agency Mission, Vision & Core Strengths', desc: 'Mission statement, vision, and core value cards.' },
    { key: 'agencyTimeline', page: 'About Page', title: 'Multi-Year Agency Growth Timeline', desc: 'Historical milestones from 2014 founding to 2026 expansion.' },
    { key: 'leadershipTeam', page: 'About Page', title: 'Leadership Team & Executives Grid', desc: 'Profiles, photos, and roles of key creative directors.' },
    { key: 'contactInfo', page: 'Contact Page', title: 'Agency Headquarters Contact Cards & Map', desc: 'Studio address, direct phone lines, email desk, operating hours & Google Maps link.' }
  ];

  const handleToggleSection = (key) => {
    const currentVal = cmsSections?.[key] !== false; // default true
    const updated = { ...(cmsSections || {}), [key]: !currentVal };
    setCmsSections(updated);
    try {
      localStorage.setItem('gs_cms_sections', JSON.stringify(updated));
    } catch (e) {}
    notifyCrossTabSync();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {saved && (
        <div className="badge badge-emerald" style={{ padding: '1rem', width: '100%', justifyContent: 'center', fontSize: '0.95rem' }}>
          <CheckCircle2 size={18} /> Website CMS & Meta Tags Saved Successfully!
        </div>
      )}

      {/* Website Sections Master Control Panel */}
      <div className="glass-card" style={{ padding: '2rem', border: '1px solid rgba(227, 6, 19, 0.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div className="badge badge-red" style={{ marginBottom: '8px' }}>
              <Layers size={14} /> Full Page Section Control
            </div>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', margin: 0 }}>
              Website Pages & Sections Visibility Manager
            </h3>
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Toggle switches ON/OFF to instantly show or hide sections across all pages in real-time.
          </span>
        </div>

        <div className="grid-2" style={{ gap: '1rem' }}>
          {[
            { key: 'heroStats', page: 'Homepage', title: 'Live Stats Counter', desc: 'Display statistics counter on homepage' },
            { key: 'creativeProcess', page: 'Homepage', title: '4-Step Production Process', desc: 'Show visual workflow process' },
            { key: 'clientLogos', page: 'Homepage', title: 'Client Logos Showcase', desc: 'Display partner and corporate logos' },
            { key: 'aboutStory', page: 'About Page', title: 'Our Agency Story', desc: 'Show mission, vision, and core values' },
            { key: 'agencyTimeline', page: 'About Page', title: '12-Year Timeline', desc: 'Display milestone timeline' },
            { key: 'leadershipTeam', page: 'About Page', title: 'Leadership Team Grid', desc: 'Show leadership team members' }
          ].map((item) => {
            const isVisible = cmsSections?.[item.key] !== false;
            return (
              <div
                key={item.key}
                style={{
                  background: 'var(--bg-secondary)',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-md)',
                  border: isVisible ? '1px solid rgba(0, 166, 81, 0.4)' : '1px solid var(--border-color)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span className="badge badge-dark" style={{ fontSize: '0.7rem', padding: '2px 6px' }}>{item.page}</span>
                    <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>{item.title}</strong>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
                    {item.desc}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => toggleSection(item.key)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    border: 'none',
                    background: isVisible ? 'var(--color-emerald)' : 'rgba(255, 255, 255, 0.1)',
                    color: isVisible ? '#FFF' : 'var(--text-muted)',
                    fontWeight: 'bold',
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  {isVisible ? <Eye size={15} /> : <EyeOff size={15} />}
                  <span>{isVisible ? 'Active' : 'Hidden'}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hero Banner Editor */}
      <div className="glass-card" style={{ padding: '2rem' }}>
        <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FileCode size={20} style={{ color: 'var(--color-primary-red)' }} /> Homepage Hero Banner Editor
        </h3>

        <form onSubmit={handleSaveCMS}>
          <div className="form-group">
            <label className="form-label">Hero Headline Title</label>
            <input
              type="text"
              value={heroHeadline}
              onChange={e => setHeroHeadline(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Hero Subtitle & Tagline</label>
            <textarea
              rows="3"
              value={heroSubtext}
              onChange={e => setHeroSubtext(e.target.value)}
              className="form-textarea"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Hero Banner Image (Upload / URL)</label>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <input
                type="file"
                accept="image/*"
                ref={heroFileInputRef}
                style={{ display: 'none' }}
                onChange={handleHeroImageUpload}
              />
              <button
                type="button"
                onClick={() => heroFileInputRef.current?.click()}
                className="btn-secondary"
              >
                <Upload size={16} /> Upload
              </button>
              <input
                type="text"
                value={heroImage}
                onChange={e => setHeroImage(e.target.value)}
                className="form-input"
                placeholder="Or paste image URL..."
              />
            </div>
          </div>

          <button type="submit" className="btn-primary">
            <Save size={18} />
            <span>Save Homepage Hero Banner</span>
          </button>
        </form>
      </div>

      {/* Agency Story CMS Controls */}
      <AgencyStoryManager />

      {/* Contact Information & Google Maps URL Controls */}
      <ContactInfoAndMapManager />

      {/* SEO & Meta Tags Manager */}
      <div className="glass-card" style={{ padding: '2rem' }}>
        <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Globe size={20} style={{ color: 'var(--color-emerald)' }} /> SEO & Meta Tags Controls
        </h3>

        <div className="form-group">
          <label className="form-label">Global Meta Title</label>
          <input
            type="text"
            value={seoTitle}
            onChange={e => setSeoTitle(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Global Meta Description</label>
          <textarea
            rows="2"
            value={seoDescription}
            onChange={e => setSeoDescription(e.target.value)}
            className="form-textarea"
          />
        </div>

        <button onClick={handleSaveCMS} className="btn-emerald">
          <Save size={18} />
          <span>Update SEO Settings</span>
        </button>
      </div>

      {/* Services Catalog Manager */}
      <ServicesCatalogManager />

      {/* Careers Catalog CRUD Manager */}
      <CareersManager />

      {/* Growth & Milestones Timeline CRUD Manager */}
      <TimelineManager />

      {/* Creative Minds Leadership Team Photo Upload CRUD Manager */}
      <LeadershipTeamManager />

      {/* Backup & System Controls */}
      <div className="grid-2">
        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '1rem' }}>Backup & Restore CMS Data</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Export a full JSON database snapshot of your website content, quotes, and services.
          </p>
          <button onClick={() => {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ cmsHero, cmsSeo, cmsSections }));
            const downloadAnchor = document.createElement('a');
            downloadAnchor.setAttribute("href", dataStr);
            downloadAnchor.setAttribute("download", `GS_CMS_Backup_${Date.now()}.json`);
            document.body.appendChild(downloadAnchor);
            downloadAnchor.click();
            downloadAnchor.remove();
          }} className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
            <Download size={18} />
            <span>Download JSON Backup</span>
          </button>
        </div>

        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '1rem' }}>Maintenance Mode Switch</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Toggle maintenance mode overlay for visitors during pre-press system updates.
          </p>
          <button
            onClick={() => setMaintenanceMode(!maintenanceMode)}
            className={maintenanceMode ? 'btn-emerald' : 'btn-secondary'}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <ShieldAlert size={18} />
            <span>{maintenanceMode ? 'Disable Maintenance Mode' : 'Enable Maintenance Mode'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Sub-component for editing/adding Services in CMS
const ServicesCatalogManager = () => {
  const { adminServices, setAdminServices } = useThemeLanguage();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Branding');
  const [turnaround, setTurnaround] = useState('24-48 Hours');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  const serviceFileInputRef = useRef(null);

  const handleServiceImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processImageUpload(file, setImage);
  };

  const services = adminServices || [];

  const handleEditClick = (srv) => {
    setEditingId(srv.id);
    setTitle(srv.title);
    setCategory(srv.category || 'Branding');
    setTurnaround(srv.turnaround || '24 Hours');
    setImage(srv.image || '');
    setDescription(srv.description || '');
    setShowAddForm(true);
  };

  const handleAddNewClick = () => {
    setEditingId(null);
    setTitle('');
    setCategory('Branding');
    setTurnaround('24 Hours');
    setImage('');
    setDescription('');
    setShowAddForm(true);
  };

  const handleSaveService = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    let updatedServices;
    if (editingId) {
      // Update existing
      updatedServices = adminServices.map(s => s.id === editingId ? {
        ...s,
        title,
        category,
        turnaround,
        image,
        description
      } : s);
    } else {
      // Add new
      const newSrv = {
        id: 'service_' + Date.now(),
        title,
        category,
        icon: 'Palette',
        turnaround,
        image,
        description,
        features: ['Premium Quality Output', 'Custom Specifications', 'Fast Turnaround']
      };
      updatedServices = [newSrv, ...adminServices];
    }

    setAdminServices(updatedServices);
    notifyCrossTabSync('gs_admin_services', updatedServices);
    setShowAddForm(false);
  };

  const handleDeleteService = (id) => {
    if (window.confirm('Delete this service from the public catalog?')) {
      const updatedServices = adminServices.filter(s => s.id !== id);
      setAdminServices(updatedServices);
      notifyCrossTabSync('gs_admin_services', updatedServices);
    }
  };

  return (
    <div className="glass-card" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)' }}>Services Catalog Control</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Manage service images, descriptions & website catalog items</p>
        </div>
        <button onClick={handleAddNewClick} className="btn-emerald">
          + Add New Service
        </button>
      </div>

      {showAddForm && (
        <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '2rem' }}>
          <h4 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>{editingId ? 'Edit Service' : 'Add New Service'}</h4>
          <form onSubmit={handleSaveService}>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Service Title</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select value={category} onChange={e => setCategory(e.target.value)} className="form-select">
                  <option value="Branding">Branding</option>
                  <option value="Printing">Printing</option>
                  <option value="Signage">Signage</option>
                  <option value="Print & Digital">Print & Digital</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Custom Printing">Custom Printing</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Turnaround Time</label>
                <input type="text" value={turnaround} onChange={e => setTurnaround(e.target.value)} className="form-input" />
              </div>
            </div>

            {/* Service Image Upload Option */}
            <div className="form-group">
              <label className="form-label">Service Image / Banner (Upload File or Enter URL)</label>
              {image && (
                <div style={{ position: 'relative', marginBottom: '10px', width: '100%', height: '140px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                  <img src={image} alt="Service Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                  <span>Upload Service Image File</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleServiceImageUpload}
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
                placeholder="Or paste Image URL (https://...)"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea rows="2" value={description} onChange={e => setDescription(e.target.value)} className="form-textarea" />
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" className="btn-primary">Save Service</button>
              <button type="button" onClick={() => setShowAddForm(false)} className="btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Services List Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)' }}>
              <th style={{ padding: '0.75rem' }}>Image</th>
              <th style={{ padding: '0.75rem' }}>Service Title</th>
              <th style={{ padding: '0.75rem' }}>Category</th>
              <th style={{ padding: '0.75rem' }}>Turnaround</th>
              <th style={{ padding: '0.75rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map(srv => (
              <tr key={srv.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ padding: '0.75rem' }}>
                  {srv.image ? (
                    <img src={srv.image} alt={srv.title} style={{ width: '45px', height: '36px', objectFit: 'cover', borderRadius: '6px' }} />
                  ) : (
                    <div style={{ width: '45px', height: '36px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                      <Image size={18} />
                    </div>
                  )}
                </td>
                <td style={{ padding: '0.75rem', fontWeight: '600', color: 'var(--text-main)' }}>{srv.title}</td>
                <td style={{ padding: '0.75rem' }}><span className="badge badge-red">{srv.category}</span></td>
                <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>{srv.turnaround}</td>
                <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                  <button onClick={() => handleEditClick(srv)} className="btn-secondary" style={{ padding: '0.4rem 0.75rem', marginRight: '8px', fontSize: '0.8rem' }}>Edit</button>
                  <button onClick={() => handleDeleteService(srv.id)} className="btn-danger" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Sub-component for Our Agency Story CMS Editor
const AgencyStoryManager = () => {
  const { cmsStory, setCmsStory, notifyCrossTabSync } = useThemeLanguage();
  const [headline, setHeadline] = useState(cmsStory?.headline || '');
  const [description, setDescription] = useState(cmsStory?.description || '');
  const [mission, setMission] = useState(cmsStory?.mission || '');
  const [vision, setVision] = useState(cmsStory?.vision || '');
  const [whyUs, setWhyUs] = useState(cmsStory?.whyUs || '');
  const [bannerImage, setBannerImage] = useState(cmsStory?.bannerImage || '');
  const [saved, setSaved] = useState(false);
  const storyFileInputRef = useRef(null);

  const handleBannerUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processImageUpload(file, setBannerImage);
  };

  const handleSaveStory = (e) => {
    e.preventDefault();
    const updatedStory = {
      ...cmsStory,
      headline,
      description,
      mission,
      vision,
      whyUs,
      bannerImage
    };
    setCmsStory(updatedStory);
    notifyCrossTabSync('gs_cms_story', updatedStory);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="glass-card" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
          <BookOpen size={20} style={{ color: 'var(--color-primary-red)' }} /> Our Agency Story CMS Editor
        </h3>
        {saved && (
          <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <CheckCircle2 size={14} /> Story Updated!
          </span>
        )}
      </div>

      <form onSubmit={handleSaveStory}>
        <div className="form-group">
          <label className="form-label">Story Headline Title</label>
          <input
            type="text"
            value={headline}
            onChange={e => setHeadline(e.target.value)}
            className="form-input"
            placeholder="Main headline on About page"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Agency Story Description</label>
          <textarea
            rows="3"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="form-textarea"
            placeholder="Agency history overview description"
          />
        </div>

        <div className="grid-3" style={{ gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Our Mission</label>
            <textarea
              rows="3"
              value={mission}
              onChange={e => setMission(e.target.value)}
              className="form-textarea"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Our Vision</label>
            <textarea
              rows="3"
              value={vision}
              onChange={e => setVision(e.target.value)}
              className="form-textarea"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Why Choose Us</label>
            <textarea
              rows="3"
              value={whyUs}
              onChange={e => setWhyUs(e.target.value)}
              className="form-textarea"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Agency Story Banner Image (Upload File / Paste URL)</label>
          {bannerImage && (
            <div style={{ position: 'relative', marginBottom: '10px', width: '100%', height: '160px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
              <img src={bannerImage} alt="Story Banner Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <button
                type="button"
                onClick={() => setBannerImage('')}
                style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(239, 68, 68, 0.85)', color: '#fff', border: 'none', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={16} />
              </button>
            </div>
          )}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <label
              className="btn-secondary"
              style={{ flex: 1, justifyContent: 'center', cursor: 'pointer', margin: 0, display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <Upload size={16} />
              <span>Upload Story Banner Graphic</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleBannerUpload}
                onClick={(e) => { e.target.value = null; }}
                style={{ display: 'none' }}
              />
            </label>
          </div>
          <input
            type="text"
            value={bannerImage}
            onChange={e => setBannerImage(e.target.value)}
            className="form-input"
            style={{ marginTop: '8px', fontSize: '0.85rem' }}
            placeholder="Or paste Story Banner URL (https://...)"
          />
        </div>

        <button type="submit" className="btn-primary">
          <Save size={18} />
          <span>Save Agency Story Content</span>
        </button>
      </form>
    </div>
  );
};

// Sub-component for Contact Info & Google Maps URL Controls
const ContactInfoAndMapManager = () => {
  const { cmsBrand, setCmsBrand, notifyCrossTabSync } = useThemeLanguage();
  const [address, setAddress] = useState(cmsBrand?.address || '');
  const [phone, setPhone] = useState(cmsBrand?.phone || '');
  const [email, setEmail] = useState(cmsBrand?.email || '');
  const [whatsapp, setWhatsapp] = useState(cmsBrand?.whatsapp || '');
  const [googleMapsUrl, setGoogleMapsUrl] = useState(cmsBrand?.googleMapsUrl || '');
  const [mapEmbedUrl, setMapEmbedUrl] = useState(cmsBrand?.mapEmbedUrl || '');
  const [saved, setSaved] = useState(false);

  const handleSaveContact = (e) => {
    e.preventDefault();
    const cleanEmbed = mapEmbedUrl ? (mapEmbedUrl.match(/src=["']([^"']+)["']/i)?.[1] || mapEmbedUrl) : '';
    const updatedBrand = {
      ...cmsBrand,
      address,
      phone,
      email,
      whatsapp,
      googleMapsUrl,
      mapEmbedUrl: cleanEmbed
    };
    setCmsBrand(updatedBrand);
    setMapEmbedUrl(cleanEmbed);
    notifyCrossTabSync();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="glass-card" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
          <MapPin size={20} style={{ color: 'var(--color-emerald)' }} /> Contact Section & Google Maps URL Controls
        </h3>
        {saved && (
          <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <CheckCircle2 size={14} /> Contact Settings Saved!
          </span>
        )}
      </div>

      <form onSubmit={handleSaveContact}>
        <div className="grid-2" style={{ gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Studio & Print Workshop Address</label>
            <input
              type="text"
              value={address}
              onChange={e => setAddress(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Studio Phone Numbers</label>
            <input
              type="text"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="form-input"
            />
          </div>
        </div>

        <div className="grid-2" style={{ gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Official Email Desk</label>
            <input
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">WhatsApp Helpline Number</label>
            <input
              type="text"
              value={whatsapp}
              onChange={e => setWhatsapp(e.target.value)}
              className="form-input"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Google Maps Direct URL (Upload Link)</label>
          <input
            type="text"
            value={googleMapsUrl}
            onChange={e => setGoogleMapsUrl(e.target.value)}
            className="form-input"
            placeholder="e.g. https://maps.app.goo.gl/xyz or https://google.com/maps?q=..."
          />
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
            Visitors clicking "Open in Google Maps" will be directed to this exact URL.
          </span>
        </div>

        <div className="form-group">
          <label className="form-label">Optional Interactive Google Maps Embed URL</label>
          <input
            type="text"
            value={mapEmbedUrl}
            onChange={e => setMapEmbedUrl(e.target.value)}
            className="form-input"
            placeholder="e.g. https://www.google.com/maps/embed?pb=..."
          />
        </div>

        <button type="submit" className="btn-emerald">
          <Save size={18} />
          <span>Save Contact & Google Maps Link</span>
        </button>
      </form>
    </div>
  );
};

// Sub-component for Careers & Openings Catalog CRUD Manager
const CareersManager = () => {
  const { adminCareers, setAdminCareers, notifyCrossTabSync } = useThemeLanguage();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('Creative Studio');
  const [location, setLocation] = useState('Nagapattinam (On-site)');
  const [type, setType] = useState('Full-Time');
  const [experience, setExperience] = useState('2+ Years');
  const [description, setDescription] = useState('');

  const careers = adminCareers || [];

  const handleOpenAdd = () => {
    setEditingId(null);
    setTitle('');
    setDepartment('Creative Studio');
    setLocation('Nagapattinam (On-site)');
    setType('Full-Time');
    setExperience('2+ Years');
    setDescription('');
    setShowAddForm(true);
  };

  const handleEditClick = (job) => {
    setEditingId(job.id);
    setTitle(job.title || '');
    setDepartment(job.department || 'Creative Studio');
    setLocation(job.location || 'Nagapattinam (On-site)');
    setType(job.type || 'Full-Time');
    setExperience(job.experience || '2+ Years');
    setDescription(job.description || '');
    setShowAddForm(true);
  };

  const handleSaveJob = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    let updatedList;
    if (editingId) {
      updatedList = careers.map(j => j.id === editingId ? {
        ...j, title, department, location, type, experience, description
      } : j);
    } else {
      const newJob = {
        id: Date.now(),
        title,
        department,
        location,
        type,
        experience,
        description
      };
      updatedList = [newJob, ...careers];
    }

    setAdminCareers(updatedList);
    notifyCrossTabSync('gs_admin_careers', updatedList);
    setShowAddForm(false);
    setEditingId(null);
  };

  const handleDeleteJob = (id) => {
    if (window.confirm("Are you sure you want to delete this job opening posting?")) {
      const updatedList = careers.filter(j => j.id !== id);
      setAdminCareers(updatedList);
      notifyCrossTabSync('gs_admin_careers', updatedList);
    }
  };

  return (
    <div className="glass-card" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
            <Briefcase size={20} style={{ color: 'var(--color-primary-red)' }} /> Careers & Join GS Designs Manager (CRUD)
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>
            Add, edit, or remove career job openings displayed on Join GS Designs section
          </p>
        </div>
        <button onClick={handleOpenAdd} className="btn-primary">
          <Plus size={18} />
          <span>Add New Job Opening</span>
        </button>
      </div>

      {showAddForm && (
        <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
            {editingId ? 'Edit Career Opening' : 'Create New Career Opening'}
          </h4>
          <form onSubmit={handleSaveJob}>
            <div className="grid-2" style={{ gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Job Title</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="form-input" required placeholder="e.g. Senior Brand Designer" />
              </div>
              <div className="form-group">
                <label className="form-label">Department</label>
                <input type="text" value={department} onChange={e => setDepartment(e.target.value)} className="form-input" placeholder="e.g. Creative Studio" />
              </div>
            </div>

            <div className="grid-3" style={{ gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Location</label>
                <input type="text" value={location} onChange={e => setLocation(e.target.value)} className="form-input" placeholder="e.g. Nagapattinam (On-site)" />
              </div>
              <div className="form-group">
                <label className="form-label">Job Type</label>
                <input type="text" value={type} onChange={e => setType(e.target.value)} className="form-input" placeholder="Full-Time / Part-Time" />
              </div>
              <div className="form-group">
                <label className="form-label">Experience Required</label>
                <input type="text" value={experience} onChange={e => setExperience(e.target.value)} className="form-input" placeholder="e.g. 2+ Years" />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Job Description & Qualifications</label>
              <textarea rows="3" value={description} onChange={e => setDescription(e.target.value)} className="form-textarea" required />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" className="btn-primary">Save Career Opening</button>
              <button type="button" onClick={() => setShowAddForm(false)} className="btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Careers List Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)' }}>
              <th style={{ padding: '0.75rem' }}>Job Position</th>
              <th style={{ padding: '0.75rem' }}>Department</th>
              <th style={{ padding: '0.75rem' }}>Location</th>
              <th style={{ padding: '0.75rem' }}>Type</th>
              <th style={{ padding: '0.75rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {careers.map(job => (
              <tr key={job.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ padding: '0.75rem', fontWeight: '600', color: 'var(--text-main)' }}>{job.title}</td>
                <td style={{ padding: '0.75rem' }}><span className="badge badge-emerald">{job.department}</span></td>
                <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>{job.location}</td>
                <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>{job.type}</td>
                <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                  <button onClick={() => handleEditClick(job)} className="btn-secondary" style={{ padding: '0.4rem 0.75rem', marginRight: '8px', fontSize: '0.8rem' }}>Edit</button>
                  <button onClick={() => handleDeleteJob(job.id)} className="btn-danger" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TimelineManager = () => {
  const { adminTimeline, setAdminTimeline, notifyCrossTabSync } = useThemeLanguage();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [year, setYear] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState('');

  const photoInputRef = useRef(null);

  const rawTimeline = adminTimeline || [];
  const timeline = rawTimeline.map((item, idx) => ({
    ...item,
    id: item.id || `tl-${idx}`
  }));

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processImageUpload(file, setImage);
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setYear(new Date().getFullYear().toString());
    setTitle('');
    setDesc('');
    setImage('');
    setShowAddForm(true);
  };

  const handleEditClick = (item) => {
    setEditingId(item.id);
    setYear(item.year || '');
    setTitle(item.title || '');
    setDesc(item.desc || '');
    setImage(item.image || '');
    setShowAddForm(true);
  };

  const handleSaveTimeline = (e) => {
    e.preventDefault();
    if (!title.trim() || !year.trim()) return;

    let updatedList;
    if (editingId !== null && editingId !== undefined) {
      updatedList = timeline.map(item => String(item.id) === String(editingId) ? {
        ...item, year, title, desc, image
      } : item);
    } else {
      const newItem = {
        id: `tl-${Date.now()}`,
        year,
        title,
        desc,
        image
      };
      updatedList = [...timeline, newItem];
    }

    setAdminTimeline(updatedList);
    notifyCrossTabSync('gs_admin_timeline', updatedList);
    setShowAddForm(false);
    setEditingId(null);
  };

  const handleDeleteTimeline = (id) => {
    if (!id) return;
    if (window.confirm("Are you sure you want to delete this timeline milestone?")) {
      const updatedList = timeline.filter(item => String(item.id) !== String(id));
      setAdminTimeline(updatedList);
      notifyCrossTabSync('gs_admin_timeline', updatedList);
    }
  };

  return (
    <div className="glass-card" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
            <Calendar size={20} style={{ color: 'var(--color-emerald)' }} /> Growth & Milestones Timeline Manager (CRUD)
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>
            Add, edit, or remove agency journey milestones displayed on the About Page with photo attachment
          </p>
        </div>
        <button onClick={handleOpenAdd} className="btn-emerald">
          <Plus size={18} />
          <span>Add New Milestone</span>
        </button>
      </div>

      {showAddForm && (
        <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
            {editingId ? 'Edit Growth Milestone' : 'Create New Growth Milestone'}
          </h4>
          <form onSubmit={handleSaveTimeline}>
            <div className="grid-2" style={{ gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Year / Time Period</label>
                <input type="text" value={year} onChange={e => setYear(e.target.value)} className="form-input" required placeholder="e.g. 2026" />
              </div>
              <div className="form-group">
                <label className="form-label">Milestone Title</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="form-input" required placeholder="e.g. Smart NFC & AI Branding Launch" />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Milestone Description & Details</label>
              <textarea rows="3" value={desc} onChange={e => setDesc(e.target.value)} className="form-textarea" required placeholder="Describe key achievements or expansion details..." />
            </div>

            {/* Photo Upload & Preview for Timeline */}
            <div className="form-group">
              <label className="form-label">Milestone Photo / Badge (Upload or Image URL)</label>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  value={image}
                  onChange={e => setImage(e.target.value)}
                  className="form-input"
                  style={{ flex: 1 }}
                  placeholder="Paste Image URL or upload below..."
                />
                <label
                  className="btn-secondary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer', margin: 0 }}
                >
                  <Upload size={16} />
                  <span>Upload Local Photo</span>
                  <input
                    type="file"
                    onChange={handlePhotoUpload}
                    onClick={(e) => { e.target.value = null; }}
                    accept="image/*"
                    style={{ display: 'none' }}
                  />
                </label>
              </div>

              {image && (
                <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <img
                    src={image}
                    alt="Preview"
                    style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover', border: '2px solid var(--color-emerald)' }}
                  />
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-emerald)', fontWeight: 'bold' }}>✓ Photo preview ready</span>
                  <button
                    type="button"
                    onClick={() => setImage('')}
                    className="btn-danger"
                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                  >
                    Remove Photo
                  </button>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" className="btn-emerald">Save Milestone</button>
              <button type="button" onClick={() => setShowAddForm(false)} className="btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Timeline List Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)' }}>
              <th style={{ padding: '0.75rem', width: '100px' }}>Year</th>
              <th style={{ padding: '0.75rem' }}>Milestone Title</th>
              <th style={{ padding: '0.75rem' }}>Description</th>
              <th style={{ padding: '0.75rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {timeline.map(item => (
              <tr key={item.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ padding: '0.75rem', fontWeight: '900', color: 'var(--color-primary-red)' }}>{item.year}</td>
                <td style={{ padding: '0.75rem', fontWeight: '600', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ width: '32px', height: '32px', borderRadius: '6px', objectFit: 'cover' }}
                    />
                  )}
                  <span>{item.title}</span>
                </td>
                <td style={{ padding: '0.75rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>{item.desc}</td>
                <td style={{ padding: '0.75rem', textAlign: 'right', whiteSpace: 'nowrap' }}>
                  <button onClick={() => handleEditClick(item)} className="btn-secondary" style={{ padding: '0.4rem 0.75rem', marginRight: '8px', fontSize: '0.8rem' }}>Edit</button>
                  <button onClick={() => handleDeleteTimeline(item.id)} className="btn-danger" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const LeadershipTeamManager = () => {
  const { adminTeam, setAdminTeam, notifyCrossTabSync } = useThemeLanguage();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [experience, setExperience] = useState('5+ Years');
  const [skills, setSkills] = useState('');
  const [image, setImage] = useState('');

  const photoInputRef = useRef(null);
  
  const rawTeam = adminTeam || [];
  const team = rawTeam.map((m, idx) => ({
    ...m,
    id: m.id || `tm-${idx}`
  }));

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processImageUpload(file, setImage);
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setName('');
    setPosition('');
    setExperience('5+ Years');
    setSkills('Creative Direction, Brand Strategy');
    setImage('');
    setShowAddForm(true);
  };

  const handleEditClick = (member) => {
    setEditingId(member.id);
    setName(member.name || '');
    setPosition(member.position || '');
    setExperience(member.experience || '');
    setSkills(Array.isArray(member.skills) ? member.skills.join(', ') : (member.skills || ''));
    setImage(member.image || '');
    setShowAddForm(true);
  };

  const handleSaveMember = (e) => {
    e.preventDefault();
    if (!name.trim() || !position.trim()) return;

    const skillsArray = typeof skills === 'string' 
      ? skills.split(',').map(s => s.trim()).filter(Boolean) 
      : (skills || []);

    let updatedList;
    if (editingId !== null && editingId !== undefined) {
      updatedList = team.map(m => String(m.id) === String(editingId) ? {
        ...m, name, position, experience, skills: skillsArray, image
      } : m);
    } else {
      const newMember = {
        id: `tm-${Date.now()}`,
        name,
        position,
        experience,
        skills: skillsArray,
        image: image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
      };
      updatedList = [...team, newMember];
    }

    setAdminTeam(updatedList);
    notifyCrossTabSync('gs_admin_team', updatedList);
    setShowAddForm(false);
    setEditingId(null);
  };

  const handleDeleteMember = (id) => {
    if (!id) return;
    if (window.confirm("Are you sure you want to remove this leadership team member?")) {
      const updatedList = team.filter(m => String(m.id) !== String(id));
      setAdminTeam(updatedList);
      notifyCrossTabSync('gs_admin_team', updatedList);
    }
  };

  return (
    <div className="glass-card" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
            <Users size={20} style={{ color: 'var(--color-primary-red)' }} /> Creative Minds / Meet Our Leadership Team Manager (CRUD)
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>
            Add, edit, or remove executive leadership team members with custom photo upload for About Page
          </p>
        </div>
        <button onClick={handleOpenAdd} className="btn-primary">
          <Plus size={18} />
          <span>Add New Executive</span>
        </button>
      </div>

      {showAddForm && (
        <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
            {editingId ? 'Edit Leadership Team Member' : 'Add New Leadership Team Member'}
          </h4>
          <form onSubmit={handleSaveMember}>
            <div className="grid-2" style={{ gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="form-input" required placeholder="e.g. Gaurav Sharma" />
              </div>
              <div className="form-group">
                <label className="form-label">Designation / Role</label>
                <input type="text" value={position} onChange={e => setPosition(e.target.value)} className="form-input" required placeholder="e.g. Lead Art Director & 3D Artist" />
              </div>
            </div>

            <div className="grid-2" style={{ gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Experience Badge</label>
                <input type="text" value={experience} onChange={e => setExperience(e.target.value)} className="form-input" placeholder="e.g. 10+ Years" />
              </div>
              <div className="form-group">
                <label className="form-label">Core Skills (Comma Separated)</label>
                <input type="text" value={skills} onChange={e => setSkills(e.target.value)} className="form-input" placeholder="e.g. Brand Strategy, Signage Engineering" />
              </div>
            </div>

            {/* Photo Upload & Preview */}
            <div className="form-group">
              <label className="form-label">Executive Profile Photo (Upload or Image URL)</label>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  value={image}
                  onChange={e => setImage(e.target.value)}
                  className="form-input"
                  style={{ flex: 1 }}
                  placeholder="Paste Image URL or upload below..."
                />
                <label
                  className="btn-secondary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer', margin: 0 }}
                >
                  <Upload size={16} />
                  <span>Upload Local Photo</span>
                  <input
                    type="file"
                    onChange={handlePhotoUpload}
                    onClick={(e) => { e.target.value = null; }}
                    accept="image/*"
                    style={{ display: 'none' }}
                  />
                </label>
              </div>

              {image && (
                <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <img
                    src={image}
                    alt="Preview"
                    style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-emerald)' }}
                  />
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-emerald)', fontWeight: 'bold' }}>✓ Profile photo preview ready</span>
                  <button
                    type="button"
                    onClick={() => setImage('')}
                    className="btn-danger"
                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                  >
                    Remove Photo
                  </button>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" className="btn-primary">Save Executive Member</button>
              <button type="button" onClick={() => setShowAddForm(false)} className="btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Leadership Team Grid Cards Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)' }}>
              <th style={{ padding: '0.75rem' }}>Executive Photo & Name</th>
              <th style={{ padding: '0.75rem' }}>Designation / Role</th>
              <th style={{ padding: '0.75rem' }}>Experience</th>
              <th style={{ padding: '0.75rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {team.map(member => (
              <tr key={member.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ padding: '0.75rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img
                    src={member.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                    alt={member.name}
                    style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border-color)' }}
                  />
                  <strong style={{ color: 'var(--text-main)' }}>{member.name}</strong>
                </td>
                <td style={{ padding: '0.75rem' }}><span className="badge badge-emerald">{member.position}</span></td>
                <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>{member.experience || 'N/A'}</td>
                <td style={{ padding: '0.75rem', textAlign: 'right', whiteSpace: 'nowrap' }}>
                  <button onClick={() => handleEditClick(member)} className="btn-secondary" style={{ padding: '0.4rem 0.75rem', marginRight: '8px', fontSize: '0.8rem' }}>Edit</button>
                  <button onClick={() => handleDeleteMember(member.id)} className="btn-danger" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WebsiteManagerView;
