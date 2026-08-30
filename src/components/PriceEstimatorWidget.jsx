import React, { useState } from 'react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { Calculator, MessageCircle, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

const SERVICE_CALC_OPTIONS = [
  { id: 'flex', name: 'Solvent Flex Banner Printing', basePrice: 15, unit: 'sq.ft', defaultSize: { w: 10, h: 4 }, qtyLabel: 'Banners' },
  { id: 'logo', name: 'Vector Logo & Brand Package', basePrice: 1500, unit: 'package', defaultSize: { w: 1, h: 1 }, qtyLabel: 'Concepts' },
  { id: 'led', name: '3D Acrylic & LED Signboard', basePrice: 120, unit: 'sq.ft', defaultSize: { w: 8, h: 3 }, qtyLabel: 'Boards' },
  { id: 'invitation', name: 'Luxury Wedding Invitation Card', basePrice: 25, unit: 'card', defaultSize: { w: 1, h: 1 }, qtyLabel: 'Cards (Min 100)' },
  { id: 'visiting', name: 'Premium Velvet Business Cards', basePrice: 3, unit: 'card', defaultSize: { w: 1, h: 1 }, qtyLabel: 'Cards (Min 500)' },
  { id: 'nfc', name: 'NFC Metal Smart Business Card', basePrice: 799, unit: 'card', defaultSize: { w: 1, h: 1 }, qtyLabel: 'Cards' },
];

const PriceEstimatorWidget = () => {
  const { cmsBrand } = useThemeLanguage();

  const [selectedService, setSelectedService] = useState(SERVICE_CALC_OPTIONS[0]);
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(4);
  const [quantity, setQuantity] = useState(1);

  const calculateTotal = () => {
    if (selectedService.unit === 'sq.ft') {
      const sqft = Math.max(1, width) * Math.max(1, height);
      return Math.round(sqft * selectedService.basePrice * Math.max(1, quantity));
    } else if (selectedService.id === 'invitation') {
      return Math.max(100, quantity) * selectedService.basePrice;
    } else if (selectedService.id === 'visiting') {
      return Math.max(500, quantity) * selectedService.basePrice;
    } else {
      return Math.max(1, quantity) * selectedService.basePrice;
    }
  };

  const estimatedTotal = calculateTotal();
  const whatsappNum = cmsBrand?.whatsapp || '919443456789';

  const handleSendWhatsAppEstimate = () => {
    let specText = `${selectedService.name} (Qty: ${quantity})`;
    if (selectedService.unit === 'sq.ft') {
      specText = `${selectedService.name} [Size: ${width}ft x ${height}ft = ${width * height} sq.ft, Qty: ${quantity}]`;
    }
    const msg = encodeURIComponent(`Hello GS Designs! I calculated an instant estimate on your website:\n\n*Service:* ${specText}\n*Estimated Price:* ₹${estimatedTotal.toLocaleString('en-IN')}\n\nPlease confirm availability & turnaround timeline.`);
    window.open(`https://wa.me/${whatsappNum}?text=${msg}`, '_blank');
  };

  return (
    <section style={{ padding: '5rem 0', background: 'radial-gradient(circle at 50% 50%, rgba(227, 6, 19, 0.08) 0%, transparent 60%)' }}>
      <div className="container">
        <div className="glass-card" style={{ padding: '2.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)' }}>
          <div className="grid-2" style={{ alignItems: 'center', gap: '3rem' }}>
            
            {/* Left Controls Column */}
            <div>
              <div className="badge badge-red" style={{ marginBottom: '1rem' }}>
                <Calculator size={14} /> Instant Order Price Estimator
              </div>
              <h2 style={{ fontSize: '2.2rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
                Calculate Estimated Price in Seconds
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', marginBottom: '2rem', lineHeight: 1.6 }}>
                Select your service requirements below to get an instant cost calculation with 1-click WhatsApp order confirmation.
              </p>

              <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* Select Service */}
                <div>
                  <label className="form-label" style={{ fontWeight: '600', color: 'var(--text-main)', marginBottom: '6px' }}>Select Service Material</label>
                  <select
                    className="form-select"
                    value={selectedService.id}
                    onChange={e => {
                      const found = SERVICE_CALC_OPTIONS.find(s => s.id === e.target.value);
                      if (found) {
                        setSelectedService(found);
                        setWidth(found.defaultSize.w);
                        setHeight(found.defaultSize.h);
                        if (found.id === 'invitation') setQuantity(100);
                        else if (found.id === 'visiting') setQuantity(500);
                        else setQuantity(1);
                      }
                    }}
                    style={{ background: 'var(--bg-secondary)', fontSize: '0.95rem' }}
                  >
                    {SERVICE_CALC_OPTIONS.map(s => (
                      <option key={s.id} value={s.id}>{s.name} ({s.unit === 'sq.ft' ? `₹${s.basePrice}/sq.ft` : `From ₹${s.basePrice}`})</option>
                    ))}
                  </select>
                </div>

                {/* Dimension inputs if sq.ft */}
                {selectedService.unit === 'sq.ft' && (
                  <div className="grid-2" style={{ gap: '1rem' }}>
                    <div>
                      <label className="form-label">Width (Feet)</label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={width}
                        onChange={e => setWidth(Math.max(1, parseInt(e.target.value) || 1))}
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label className="form-label">Height (Feet)</label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={height}
                        onChange={e => setHeight(Math.max(1, parseInt(e.target.value) || 1))}
                        className="form-input"
                      />
                    </div>
                  </div>
                )}

                {/* Quantity input */}
                <div>
                  <label className="form-label">{selectedService.qtyLabel}</label>
                  <input
                    type="number"
                    min={selectedService.id === 'invitation' ? 100 : selectedService.id === 'visiting' ? 500 : 1}
                    value={quantity}
                    onChange={e => setQuantity(parseInt(e.target.value) || 1)}
                    className="form-input"
                  />
                </div>
              </form>
            </div>

            {/* Right Display & CTA Column */}
            <div style={{
              background: 'linear-gradient(145deg, rgba(227, 6, 19, 0.12) 0%, rgba(0, 166, 81, 0.12) 100%)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '2.5rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: 'var(--shadow-lg)'
            }}>
              <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700' }}>
                Estimated Price Total
              </span>

              <div style={{ fontSize: '3.5rem', fontWeight: '900', color: 'var(--text-main)', margin: '1rem 0 0.5rem', fontFamily: 'var(--font-heading)' }}>
                ₹{estimatedTotal.toLocaleString('en-IN')}
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '2rem' }}>
                {selectedService.unit === 'sq.ft' ? `(${width * height} sq.ft @ ₹${selectedService.basePrice}/sq.ft)` : 'Includes custom design & high-resolution printing'}
              </div>

              <button
                onClick={handleSendWhatsAppEstimate}
                className="btn-emerald btn-lg"
                style={{ width: '100%', justifyContent: 'center', boxShadow: '0 10px 25px rgba(0, 166, 81, 0.4)' }}
              >
                <MessageCircle size={20} />
                <span>Order via WhatsApp Now</span>
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '1.25rem', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                <CheckCircle2 size={14} style={{ color: 'var(--color-emerald)' }} /> Fast Turnaround & Local Nagapattinam Delivery
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceEstimatorWidget;
