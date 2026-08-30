import React, { useState } from 'react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import AdminLogin from './AdminLogin';

// Import View Tabs
import DashboardView from './views/DashboardView';
import WebsiteManagerView from './views/WebsiteManagerView';
import PortfolioManagerView from './views/PortfolioManagerView';
import GalleryManagerView from './views/GalleryManagerView';
import ServiceManagerView from './views/WebsiteManagerView'; // shares CMS or specialized view
import QuotesManagerView from './views/QuotesManagerView';
import MessagesInboxView from './views/MessagesInboxView';
import SettingsView from './views/SettingsView';

import {
  LayoutDashboard,
  Globe,
  Briefcase,
  Image,
  Layers,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Sun,
  Moon
} from 'lucide-react';

const AdminLayout = () => {
  const { adminUser, logoutAdmin, setActivePage, theme, toggleTheme, adminQuotes, adminMessages } = useThemeLanguage();
  const [activeAdminTab, setActiveAdminTab] = useState('dashboard');

  if (!adminUser) {
    return <AdminLogin />;
  }

  const navItems = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'website', label: 'Website CMS & SEO', icon: Globe },
    { id: 'portfolio', label: 'Portfolio Manager', icon: Briefcase },
    { id: 'quotes', label: 'Quote Requests', icon: FileText, badge: adminQuotes.length },
    { id: 'messages', label: 'Messages Inbox', icon: MessageSquare, badge: adminMessages.filter(m => !m.read).length },
    { id: 'settings', label: 'Settings & Security', icon: Settings }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--admin-sidebar-bg)' }}>
      {/* Admin Sidebar */}
      <aside style={{
        width: '260px',
        background: 'var(--admin-sidebar-bg)',
        borderRight: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.5rem 1rem',
        flexShrink: 0
      }}>
        <div>
          {/* Brand Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '2rem',
            padding: '0 0.5rem'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #E30613, #00A651)',
              color: '#FFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '900',
              fontSize: '1.1rem'
            }}>
              GS
            </div>
            <div>
              <strong style={{ color: '#FFF', fontSize: '1.1rem', display: 'block', lineHeight: 1 }}>GS Admin</strong>
              <span style={{ fontSize: '0.65rem', color: '#10B981', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Control Center
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {navItems.map(item => {
              const IconComp = item.icon;
              const isActive = activeAdminTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveAdminTab(item.id)}
                  style={{
                    background: isActive ? 'linear-gradient(135deg, #E30613 0%, #B3000C 100%)' : 'transparent',
                    color: isActive ? '#FFFFFF' : 'var(--text-muted)',
                    border: 'none',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.75rem 1rem',
                    fontWeight: isActive ? '700' : '500',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <IconComp size={18} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge > 0 && (
                    <span className="badge badge-red" style={{ background: isActive ? '#FFF' : 'rgba(227, 6, 19, 0.2)', color: isActive ? '#E30613' : '#FF4D58', fontSize: '0.7rem' }}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Bottom: Back to Website & Logout */}
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button
            onClick={() => setActivePage('home')}
            className="btn-secondary btn-sm"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <ExternalLink size={14} />
            <span>View Live Website</span>
          </button>

          <button
            onClick={logoutAdmin}
            style={{
              background: 'rgba(255, 77, 88, 0.1)',
              color: '#FF4D58',
              border: '1px solid rgba(255, 77, 88, 0.2)',
              borderRadius: 'var(--radius-md)',
              padding: '0.6rem 1rem',
              fontWeight: '600',
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <LogOut size={14} />
            <span>Logout Administrator</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '2rem', background: 'var(--bg-main)', overflowY: 'auto' }}>
        {/* Top Header Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <div>
            <h2 style={{ fontSize: '1.6rem', color: 'var(--text-main)', margin: 0 }}>
              {navItems.find(i => i.id === activeAdminTab)?.label}
            </h2>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Logged in as <strong style={{ color: 'var(--text-main)' }}>{adminUser.name}</strong> ({adminUser.role})
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={toggleTheme}
              className="btn-secondary btn-sm"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={16} style={{ color: '#FBBF24' }} /> : <Moon size={16} style={{ color: '#6366F1' }} />}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img
                src={adminUser.avatar}
                alt={adminUser.name}
                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-primary-red)' }}
              />
              <span className="badge badge-emerald">
                <ShieldCheck size={12} /> Authenticated Session
              </span>
            </div>
          </div>
        </div>

        {/* Tab View Component Rendering */}
        {activeAdminTab === 'dashboard' && <DashboardView setActiveAdminTab={setActiveAdminTab} />}
        {activeAdminTab === 'website' && <WebsiteManagerView />}
        {activeAdminTab === 'portfolio' && <PortfolioManagerView />}
        {activeAdminTab === 'quotes' && <QuotesManagerView />}
        {activeAdminTab === 'messages' && <MessagesInboxView />}
        {activeAdminTab === 'settings' && <SettingsView />}
      </main>
    </div>
  );
};

export default AdminLayout;
