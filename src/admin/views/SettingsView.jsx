import React, { useState } from 'react';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';
import { BRAND_INFO } from '../../data/agencyData';
import { Save, ShieldCheck, Mail, Phone, Lock, Key, Check } from 'lucide-react';

const SettingsView = () => {
  const { cmsBrand, setCmsBrand } = useThemeLanguage();

  const [phone, setPhone] = useState(cmsBrand?.phone || BRAND_INFO.phone);
  const [email, setEmail] = useState(cmsBrand?.email || BRAND_INFO.email);
  const [whatsapp, setWhatsapp] = useState(cmsBrand?.whatsapp || BRAND_INFO.whatsapp);
  const [address, setAddress] = useState(cmsBrand?.address || BRAND_INFO.address);
  const [twoFactor, setTwoFactor] = useState(true);
  const [captcha, setCaptcha] = useState(true);
  const [rateLimit, setRateLimit] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setCmsBrand(prev => ({
      ...prev,
      phone,
      email,
      whatsapp,
      address
    }));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {saved && (
        <div className="badge badge-emerald" style={{ padding: '0.85rem', width: '100%', justifyContent: 'center' }}>
          <Check size={16} /> Admin System Settings & Security Configurations Saved!
        </div>
      )}

      {/* General Agency Settings */}
      <div className="glass-card" style={{ padding: '2rem' }}>
        <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '1.25rem' }}>Global Agency Contact & WhatsApp Configuration</h3>
        <form onSubmit={handleSave}>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Phone Desk</label>
              <input type="text" value={phone} onChange={e => setPhone(e.target.value)} className="form-input" />
            </div>

            <div className="form-group">
              <label className="form-label">Official Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-input" />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">WhatsApp Hotline Number (With Country Code)</label>
            <input type="text" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} className="form-input" />
          </div>

          <button type="submit" className="btn-primary">
            <Save size={18} />
            <span>Save Settings</span>
          </button>
        </form>
      </div>

      {/* Security & 2FA Toggles */}
      <div className="glass-card" style={{ padding: '2rem' }}>
        <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Lock size={20} style={{ color: 'var(--color-primary-red)' }} /> Security & Access Controls
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)' }}>
            <div>
              <strong style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>Two-Factor Authentication (2FA)</strong>
              <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Require SMS/App OTP for admin dashboard access</span>
            </div>
            <button onClick={() => setTwoFactor(!twoFactor)} className={`btn-sm ${twoFactor ? 'btn-emerald' : 'btn-secondary'}`}>
              {twoFactor ? 'ENABLED' : 'DISABLED'}
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)' }}>
            <div>
              <strong style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>Form CAPTCHA Bot Protection</strong>
              <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Prevent spam quote and contact form submissions</span>
            </div>
            <button onClick={() => setCaptcha(!captcha)} className={`btn-sm ${captcha ? 'btn-emerald' : 'btn-secondary'}`}>
              {captcha ? 'ENABLED' : 'DISABLED'}
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)' }}>
            <div>
              <strong style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>API Rate Limiting & DDOS Protection</strong>
              <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Limit excessive HTTP requests from single IP addresses</span>
            </div>
            <button onClick={() => setRateLimit(!rateLimit)} className={`btn-sm ${rateLimit ? 'btn-emerald' : 'btn-secondary'}`}>
              {rateLimit ? 'ENABLED' : 'DISABLED'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
