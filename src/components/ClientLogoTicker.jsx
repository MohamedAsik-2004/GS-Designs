import React from 'react';
import { Award, ShieldCheck, Building2, ShoppingBag, HeartHandshake, Utensils, GraduationCap, Truck } from 'lucide-react';

const CLIENT_BRANDS = [
  { name: 'Apex Global', icon: Building2, tag: 'Corporate Signage' },
  { name: 'Royal Weddings', icon: HeartHandshake, tag: 'Luxury Invitations' },
  { name: 'Nagai Supermarket', icon: ShoppingBag, tag: 'Branding & Flex' },
  { name: 'City Hospital', icon: ShieldCheck, tag: 'Acrylic Boards' },
  { name: 'Star Events & Expo', icon: Award, tag: 'Solvent Banners' },
  { name: 'Al-Ameen Jewels', icon: Building2, tag: 'NFC Cards & Signs' },
  { name: 'Grand Palace Hotel', icon: Utensils, tag: 'Menu Cards & LED' },
  { name: 'Nagapattinam Academy', icon: GraduationCap, tag: 'Certificates & Flex' },
  { name: 'Green Logistics', icon: Truck, tag: 'Vehicle Branding' },
];

const ClientLogoTicker = () => {
  // Duplicate array to achieve seamless infinite loop
  const tickerItems = [...CLIENT_BRANDS, ...CLIENT_BRANDS];

  return (
    <div style={{
      background: 'rgba(0, 0, 0, 0.4)',
      borderTop: '1px solid var(--border-color)',
      borderBottom: '1px solid var(--border-color)',
      padding: '1.25rem 0',
      overflow: 'hidden'
    }}>
      <div className="marquee-container">
        <div className="marquee-track">
          {tickerItems.map((item, index) => {
            const IconComp = item.icon;
            return (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'var(--bg-card)',
                  padding: '0.6rem 1.25rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-color)',
                  whiteSpace: 'nowrap',
                  backdropFilter: 'blur(6px)'
                }}
              >
                <IconComp size={16} style={{ color: 'var(--color-primary-red)' }} />
                <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-main)' }}>{item.name}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: '10px' }}>
                  {item.tag}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ClientLogoTicker;
