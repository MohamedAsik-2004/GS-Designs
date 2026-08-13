import React, { useState } from 'react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { PRICING_PACKAGES } from '../data/agencyData';
import { Check, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';

const PricingPage = () => {
  const { openQuoteModal } = useThemeLanguage();

  const matrixFeatures = [
    { name: "Vector Logo Design Concepts", basic: "3 Concepts", standard: "5 Concepts", premium: "Unlimited", enterprise: "Bespoke" },
    { name: "Visiting Cards Quantity", basic: "500 Cards", standard: "1,000 Cards", premium: "2,500 Cards", enterprise: "Bulk Wholesale" },
    { name: "Spot UV & Gold Foil Options", basic: "—", standard: "Included", premium: "Included", enterprise: "Custom Finishes" },
    { name: "Social Media Launch Kit", basic: "5 Posts", standard: "15 Posts + Reels", premium: "30 Posts + Reels", enterprise: "Dedicated Team" },
    { name: "Roll-Up Standee Banner", basic: "—", standard: "1 Standee", premium: "3 Standees", enterprise: "Custom Size Banners" },
    { name: "3D Acrylic LED Sign Board", basic: "—", standard: "—", premium: "Included (20 sq.ft)", enterprise: "Multi-Storefront" },
    { name: "Turnaround Speed", basic: "3 Days", standard: "48 Hours", premium: "24 Hours Priority", enterprise: "Dedicated SLA" }
  ];

  return (
    <div style={{ padding: '4rem 0' }}>
      <div className="container">
        {/* Title */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 4rem' }}>
          <span className="badge badge-red" style={{ marginBottom: '0.75rem' }}>Transparent Investment</span>
          <h1 style={{ fontSize: '3rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
            Flexible Advertising & Printing Packages
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            Clear pricing tailored for startups, expanding brands, and corporate enterprises. No hidden fees.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid-4" style={{ marginBottom: '5rem' }}>
          {PRICING_PACKAGES.map(pkg => (
            <div
              key={pkg.id}
              className="glass-card"
              style={{
                padding: '2rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: pkg.popular ? '2px solid var(--color-primary-red)' : '1px solid var(--border-color)',
                position: 'relative'
              }}
            >
              {pkg.popular && (
                <span className="badge badge-red" style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)' }}>
                  <Sparkles size={12} /> Most Popular Package
                </span>
              )}

              <div>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '4px' }}>{pkg.name}</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>{pkg.description}</p>

                <div style={{ marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: '900', color: pkg.popular ? 'var(--color-primary-red)' : 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>
                    {pkg.price}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginLeft: '4px' }}>/{pkg.period}</span>
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                  {pkg.features.map((f, i) => (
                    <li key={i} style={{ fontSize: '0.88rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Check size={16} style={{ color: 'var(--color-emerald)', flexShrink: 0 }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => openQuoteModal()}
                className={pkg.popular ? 'btn-primary' : 'btn-secondary'}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Choose {pkg.name}
              </button>
            </div>
          ))}
        </div>

        {/* Detailed Feature Comparison Matrix */}
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '2.2rem', color: 'var(--text-main)' }}>Detailed Package Comparison Table</h2>
          </div>

          <div style={{ overflowX: 'auto', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: '30%' }}>Features & Deliverables</th>
                  <th style={{ textAlign: 'center' }}>Basic ($299)</th>
                  <th style={{ textAlign: 'center', color: 'var(--color-primary-red)' }}>Standard ($699)</th>
                  <th style={{ textAlign: 'center' }}>Premium ($1,499)</th>
                  <th style={{ textAlign: 'center' }}>Enterprise (Custom)</th>
                </tr>
              </thead>
              <tbody>
                {matrixFeatures.map((row, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: '600', color: 'var(--text-main)' }}>{row.name}</td>
                    <td style={{ textAlign: 'center', color: 'var(--text-muted)' }}>{row.basic}</td>
                    <td style={{ textAlign: 'center', color: 'var(--color-emerald)', fontWeight: '600' }}>{row.standard}</td>
                    <td style={{ textAlign: 'center', color: 'var(--text-muted)' }}>{row.premium}</td>
                    <td style={{ textAlign: 'center', color: 'var(--text-muted)' }}>{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
