import React, { useState } from 'react';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';
import { Download, Printer, CheckCircle, Clock, XCircle, UserCheck, Eye, Trash2, Phone, MessageSquare, X, ShieldCheck, Mail } from 'lucide-react';

const QuotesManagerView = () => {
  const { adminQuotes, setAdminQuotes, notifyCrossTabSync } = useThemeLanguage();
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedQuote, setSelectedQuote] = useState(null);

  const filteredQuotes = filterStatus === 'All'
    ? adminQuotes
    : adminQuotes.filter(q => q.status === filterStatus);

  const handleStatusChange = (id, newStatus) => {
    const updated = adminQuotes.map(q => q.id === id ? { ...q, status: newStatus } : q);
    setAdminQuotes(updated);
    notifyCrossTabSync('gs_admin_quotes', updated);
    if (selectedQuote && selectedQuote.id === id) {
      setSelectedQuote(prev => ({ ...prev, status: newStatus }));
    }
  };

  const handleStaffChange = (id, staffName) => {
    const updated = adminQuotes.map(q => q.id === id ? { ...q, assignedStaff: staffName } : q);
    setAdminQuotes(updated);
    notifyCrossTabSync('gs_admin_quotes', updated);
    if (selectedQuote && selectedQuote.id === id) {
      setSelectedQuote(prev => ({ ...prev, assignedStaff: staffName }));
    }
  };

  const handleDeleteQuote = (id) => {
    if (window.confirm(`Are you sure you want to delete quote request ${id}?`)) {
      const updated = adminQuotes.filter(q => q.id !== id);
      setAdminQuotes(updated);
      notifyCrossTabSync('gs_admin_quotes', updated);
      if (selectedQuote?.id === id) setSelectedQuote(null);
    }
  };

  const handleExportCSV = () => {
    const headers = ['Quote ID', 'Client Name', 'Phone', 'Email', 'Company', 'Service', 'Budget', 'Details', 'Date', 'Status', 'Assigned Staff'];
    const rows = adminQuotes.map(q => [
      q.id,
      `"${q.clientName}"`,
      `"${q.phone || 'N/A'}"`,
      `"${q.email || 'N/A'}"`,
      `"${q.company || 'N/A'}"`,
      `"${q.service}"`,
      `"${q.budget}"`,
      `"${(q.details || '').replace(/"/g, '""')}"`,
      `"${q.date}"`,
      `"${q.status}"`,
      `"${q.assignedStaff || 'Unassigned'}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `GS_Designs_Quotes_Export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handlePrintPdf = () => {
    window.print();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)' }}>Quote Requests Inbox</h3>
          <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>{adminQuotes.length} Total Client Quote Inquiries</span>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={handleExportCSV} className="btn-emerald btn-sm">
            <Download size={14} /> Export CSV Excel
          </button>
          <button onClick={handlePrintPdf} className="btn-secondary btn-sm">
            <Printer size={14} /> Print PDF Report
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {['All', 'Pending', 'In Progress', 'Approved', 'Rejected'].map(st => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`btn-sm ${filterStatus === st ? 'btn-primary' : 'btn-secondary'}`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="glass-card" style={{ padding: '1rem', overflowX: 'auto' }}>
        {filteredQuotes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
            <Clock size={40} style={{ opacity: 0.4, marginBottom: '1rem' }} />
            <h4>No Quote Requests Found</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>User quote submissions from the website will appear here in real-time.</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Quote ID</th>
                <th>Client & Contact</th>
                <th>Company</th>
                <th>Service</th>
                <th>Budget</th>
                <th>Date</th>
                <th>Assign Staff</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuotes.map(q => (
                <tr key={q.id}>
                  <td style={{ fontWeight: '700', color: 'var(--color-primary-red)' }}>{q.id}</td>
                  <td>
                    <strong style={{ color: 'var(--text-main)', display: 'block' }}>{q.clientName}</strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', display: 'block' }}>{q.phone || 'No phone'}</span>
                    {q.email && <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{q.email}</span>}
                  </td>
                  <td style={{ color: 'var(--text-muted)' }}>{q.company || 'Individual'}</td>
                  <td style={{ color: 'var(--text-main)', fontWeight: '600' }}>{q.service}</td>
                  <td style={{ color: 'var(--color-emerald)', fontWeight: '700' }}>{q.budget}</td>
                  <td style={{ color: 'var(--text-dim)', fontSize: '0.82rem' }}>{q.date}</td>
                  <td>
                    <select
                      value={q.assignedStaff || 'Gaurav'}
                      onChange={e => handleStaffChange(q.id, e.target.value)}
                      className="form-select"
                      style={{ fontSize: '0.8rem', padding: '4px 8px' }}
                    >
                      <option value="Gaurav">Gaurav Sharma</option>
                      <option value="Siddharth">Siddharth Verma</option>
                      <option value="Ananya">Ananya Roy</option>
                      <option value="Vikram">Vikram Malhotra</option>
                    </select>
                  </td>
                  <td>
                    <select
                      value={q.status}
                      onChange={e => handleStatusChange(q.id, e.target.value)}
                      className="form-select"
                      style={{
                        fontSize: '0.8rem',
                        padding: '4px 8px',
                        fontWeight: '700',
                        color: q.status === 'Approved' ? '#10B981' : q.status === 'Pending' ? '#FF3B47' : '#3B82F6'
                      }}
                    >
                      <option value="Pending" style={{ background: '#12151E' }}>Pending</option>
                      <option value="In Progress" style={{ background: '#12151E' }}>In Progress</option>
                      <option value="Approved" style={{ background: '#12151E' }}>Approved</option>
                      <option value="Rejected" style={{ background: '#12151E' }}>Rejected</option>
                    </select>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        onClick={() => setSelectedQuote(q)}
                        className="btn-secondary btn-sm"
                        title="View Full Details"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteQuote(q.id)}
                        style={{ background: 'none', border: 'none', color: '#FF4D58', cursor: 'pointer', padding: '4px' }}
                        title="Delete Quote"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Quote Detailed Modal */}
      {selectedQuote && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.85)',
          zIndex: 100000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
          backdropFilter: 'blur(8px)'
        }}>
          <div className="glass-card" style={{
            maxWidth: '560px',
            width: '100%',
            padding: '2rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <span className="badge badge-red" style={{ marginBottom: '4px' }}>{selectedQuote.id}</span>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', margin: 0 }}>Quote Request Details</h3>
              </div>
              <button onClick={() => setSelectedQuote(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Client Contact Information</span>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--text-main)', margin: '4px 0' }}>{selectedQuote.clientName}</h4>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-dim)' }}>
                  Company: <strong style={{ color: 'var(--text-main)' }}>{selectedQuote.company || 'Individual'}</strong>
                </div>
                {selectedQuote.email && (
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                    Email: <strong style={{ color: 'var(--text-main)' }}>{selectedQuote.email}</strong>
                  </div>
                )}
                {selectedQuote.phone && (
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                    Phone/WhatsApp: <strong style={{ color: 'var(--color-emerald)' }}>{selectedQuote.phone}</strong>
                  </div>
                )}
              </div>

              <div className="grid-2">
                <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Requested Service</span>
                  <div style={{ fontSize: '0.98rem', fontWeight: '700', color: 'var(--text-main)', marginTop: '4px' }}>
                    {selectedQuote.service}
                  </div>
                </div>

                <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Estimated Budget</span>
                  <div style={{ fontSize: '0.98rem', fontWeight: '700', color: 'var(--color-emerald)', marginTop: '4px' }}>
                    {selectedQuote.budget}
                  </div>
                </div>
              </div>

              {selectedQuote.details && (
                <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Project Requirements / Custom Details</span>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginTop: '6px', whiteSpace: 'pre-line' }}>
                    {selectedQuote.details}
                  </p>
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                {selectedQuote.phone && (
                  <a
                    href={`https://wa.me/${selectedQuote.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(selectedQuote.clientName)},%20this%20is%20GS%20Designs%20regarding%20your%20quote%20request%20(${selectedQuote.id})%20for%20${encodeURIComponent(selectedQuote.service)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-emerald"
                    style={{ flex: 1, justifyContent: 'center', fontSize: '0.85rem' }}
                  >
                    <MessageSquare size={16} /> WhatsApp Client
                  </a>
                )}
                {selectedQuote.email && (
                  <a
                    href={`mailto:${selectedQuote.email}?subject=GS%20Designs%20-%20Quote%20Request%20${selectedQuote.id}`}
                    className="btn-secondary"
                    style={{ flex: 1, justifyContent: 'center', fontSize: '0.85rem' }}
                  >
                    <Mail size={16} /> Email Client
                  </a>
                )}
                {selectedQuote.phone && (
                  <a
                    href={`tel:${selectedQuote.phone}`}
                    className="btn-secondary"
                    style={{ flex: 1, justifyContent: 'center', fontSize: '0.85rem' }}
                  >
                    <Phone size={16} /> Call Phone
                  </a>
                )}
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setSelectedQuote(null)} className="btn-secondary btn-sm">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuotesManagerView;
