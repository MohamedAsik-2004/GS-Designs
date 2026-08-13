import React, { useState } from 'react';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';
import { BRAND_INFO } from '../../data/agencyData';
import { Save, Download, Upload, ShieldAlert, CheckCircle2, Globe, FileCode } from 'lucide-react';

const WebsiteManagerView = () => {
  const { maintenanceMode, setMaintenanceMode, adminUser, cmsHero, setCmsHero, cmsSeo, setCmsSeo } = useThemeLanguage();

  const [heroHeadline, setHeroHeadline] = useState(cmsHero.headline);
  const [heroSubtext, setHeroSubtext] = useState(cmsHero.subtext);
  const [seoTitle, setSeoTitle] = useState(cmsSeo.title);
  const [seoDescription, setSeoDescription] = useState(cmsSeo.description);
  const [saved, setSaved] = useState(false);

  const handleSaveCMS = (e) => {
    e.preventDefault();
    setCmsHero({ headline: heroHeadline, subtext: heroSubtext });
    setCmsSeo({ title: seoTitle, description: seoDescription });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleBackupExport = () => {
    const backupData = {
      brand: BRAND_INFO,
      hero: { headline: heroHeadline, subtext: heroSubtext },
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {saved && (
        <div className="badge badge-emerald" style={{ padding: '1rem', width: '100%', justifyContent: 'center', fontSize: '0.95rem' }}>
          <CheckCircle2 size={18} /> Website CMS & Meta Tags Saved Successfully!
        </div>
      )}

      {/* Hero Content Editor */}
      <div className="glass-card" style={{ padding: '2rem' }}>
        <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '1.25rem' }}>Homepage Hero Section Manager</h3>
        <form onSubmit={handleSaveCMS}>
          <div className="form-group">
            <label className="form-label">Hero Main Headline</label>
            <input
              type="text"
              value={heroHeadline}
              onChange={e => setHeroHeadline(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Hero Subtext Description</label>
            <textarea
              rows="3"
              value={heroSubtext}
              onChange={e => setHeroSubtext(e.target.value)}
              className="form-textarea"
            />
          </div>

          <button type="submit" className="btn-primary">
            <Save size={18} />
            <span>Save Homepage Changes</span>
          </button>
        </form>
      </div>

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

      {/* Backup & System Controls */}
      <div className="grid-2">
        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '1rem' }}>Backup & Restore CMS Data</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Export a full JSON database snapshot of your website content, quotes, and services.
          </p>
          <button onClick={handleBackupExport} className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
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

export default WebsiteManagerView;
