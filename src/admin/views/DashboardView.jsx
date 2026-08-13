import React, { useState } from 'react';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';
import { INITIAL_ADMIN_QUOTES, INITIAL_ADMIN_MESSAGES } from '../../data/agencyData';
import { Users, FileText, ShoppingBag, DollarSign, MessageSquare, Briefcase, Eye, ArrowUpRight, TrendingUp, Trash2, Check, RotateCcw } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const DashboardView = ({ setActiveAdminTab }) => {
  const {
    adminQuotes,
    setAdminQuotes,
    adminMessages,
    setAdminMessages,
    clearAllDashboardData,
    dashboardCleared,
    setDashboardCleared
  } = useThemeLanguage();

  const [clearNotice, setClearNotice] = useState('');

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all quote requests, messages, and dashboard metrics?')) {
      clearAllDashboardData();
      setClearNotice('All dashboard quotes and inbox messages cleared successfully!');
      setTimeout(() => setClearNotice(''), 4000);
    }
  };

  const handleRestoreDemoData = () => {
    setAdminQuotes(INITIAL_ADMIN_QUOTES);
    setAdminMessages(INITIAL_ADMIN_MESSAGES);
    setDashboardCleared(false);
    setClearNotice('Demo data restored successfully!');
    setTimeout(() => setClearNotice(''), 4000);
  };

  const isCleared = dashboardCleared || (adminQuotes.length === 0 && adminMessages.length === 0);

  const totalVisitors = isCleared ? '0' : '142,850';
  const estimatedRevenue = isCleared ? '₹0' : '₹14,85,000';

  const trafficData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [
      {
        label: 'Website Visitors 2026',
        data: isCleared ? [0, 0, 0, 0, 0, 0, 0, 0] : [12400, 18500, 24000, 31000, 42000, 58000, 72000, 89000],
        borderColor: '#E30613',
        backgroundColor: 'rgba(227, 6, 19, 0.15)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Quote Requests',
        data: isCleared ? [0, 0, 0, 0, 0, 0, 0, 0] : [120, 190, 240, 310, 450, 590, 780, 940],
        borderColor: '#00A651',
        backgroundColor: 'rgba(0, 166, 81, 0.15)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const serviceDistributionData = {
    labels: ['Logo & Branding', 'Flex Printing', '3D LED Sign Boards', 'Invitation Suite', 'Social Media'],
    datasets: [
      {
        data: isCleared ? [0, 0, 0, 0, 0] : [35, 25, 20, 12, 8],
        backgroundColor: ['#E30613', '#00A651', '#3B82F6', '#FBBF24', '#8B5CF6'],
        borderWidth: 0
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { labels: { color: '#94A3B8', font: { family: 'Inter' } } }
    },
    scales: {
      x: { ticks: { color: '#94A3B8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
      y: { ticks: { color: '#94A3B8' }, grid: { color: 'rgba(255,255,255,0.05)' } }
    }
  };

  return (
    <div>
      {/* Admin Action Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)', margin: 0 }}>Executive Performance Dashboard</h3>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Real-time overview of quotes, client inquiries, and traffic</span>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {isCleared && (
            <button
              onClick={handleRestoreDemoData}
              className="btn-primary btn-sm"
            >
              <RotateCcw size={14} /> Restore Demo Data
            </button>
          )}
          <button
            onClick={handleClearData}
            className="btn-secondary btn-sm"
            style={{ border: '1px solid rgba(239, 68, 68, 0.4)', color: '#EF4444' }}
          >
            <Trash2 size={14} /> Clear All Dashboard Data
          </button>
        </div>
      </div>

      {clearNotice && (
        <div className="badge badge-emerald" style={{ padding: '0.85rem', width: '100%', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <Check size={16} /> {clearNotice}
        </div>
      )}

      {/* Top Stat Cards Grid */}
      <div className="grid-4" style={{ marginBottom: '2rem' }}>
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Total Visitors</span>
            <div style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--text-main)', marginTop: '4px' }}>{totalVisitors}</div>
            <span style={{ fontSize: '0.75rem', color: isCleared ? 'var(--text-dim)' : '#10B981', display: 'flex', alignItems: 'center', gap: '2px', marginTop: '4px' }}>
              <TrendingUp size={12} /> {isCleared ? '0% active tracking' : '+18.4% this month'}
            </span>
          </div>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(227, 6, 19, 0.15)', color: '#E30613', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={24} />
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Quote Requests</span>
            <div style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--color-primary-red)', marginTop: '4px' }}>{adminQuotes.length}</div>
            <span style={{ fontSize: '0.75rem', color: isCleared ? 'var(--text-dim)' : '#10B981', display: 'flex', alignItems: 'center', gap: '2px', marginTop: '4px' }}>
              <TrendingUp size={12} /> {adminQuotes.filter(q => q.status === 'Pending').length} Pending Review
            </span>
          </div>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(0, 166, 81, 0.15)', color: '#00A651', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FileText size={24} />
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Estimated Revenue</span>
            <div style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--color-emerald)', marginTop: '4px' }}>{estimatedRevenue}</div>
            <span style={{ fontSize: '0.75rem', color: isCleared ? 'var(--text-dim)' : '#10B981', display: 'flex', alignItems: 'center', gap: '2px', marginTop: '4px' }}>
              <TrendingUp size={12} /> {isCleared ? '0% revenue active' : '+24% YoY Growth'}
            </span>
          </div>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(59, 130, 246, 0.15)', color: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DollarSign size={24} />
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Unread Messages</span>
            <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#FBBF24', marginTop: '4px' }}>
              {adminMessages.filter(m => !m.read).length}
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '4px', display: 'block' }}>
              {adminMessages.length} Total Messages
            </span>
          </div>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(251, 191, 36, 0.15)', color: '#FBBF24', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MessageSquare size={24} />
          </div>
        </div>
      </div>

      {/* Analytics Charts Section */}
      <div className="grid-3" style={{ marginBottom: '2.5rem' }}>
        <div className="glass-card" style={{ padding: '1.5rem', gridColumn: 'span 2' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.15rem', color: 'var(--text-main)' }}>Monthly Traffic & Lead Growth</h3>
            <span className={`badge ${isCleared ? 'badge-dark' : 'badge-emerald'}`}>
              {isCleared ? 'Data Cleared' : 'Live 2026 Metrics'}
            </span>
          </div>
          <div style={{ height: '280px' }}>
            <Line data={trafficData} options={chartOptions} />
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.15rem', color: 'var(--text-main)', marginBottom: '1.5rem' }}>Service Demand Breakdown</h3>
          <div style={{ height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Doughnut data={serviceDistributionData} options={{ plugins: { legend: { position: 'bottom', labels: { color: '#94A3B8' } } } }} />
          </div>
        </div>
      </div>

      {/* Recent Quotes Table */}
      <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main)' }}>Latest Incoming Quote Requests</h3>
          <button onClick={() => setActiveAdminTab('quotes')} className="btn-secondary btn-sm">
            View All Quotes ({adminQuotes.length})
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Quote ID</th>
                <th>Client Name</th>
                <th>Company</th>
                <th>Requested Service</th>
                <th>Estimated Budget</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {adminQuotes.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--text-muted)' }}>
                    <FileText size={28} style={{ display: 'block', margin: '0 auto 0.75rem', opacity: 0.5 }} />
                    No incoming quote requests found. All dashboard data cleared.
                  </td>
                </tr>
              ) : (
                adminQuotes.slice(0, 5).map(q => (
                  <tr key={q.id}>
                    <td style={{ fontWeight: '700', color: 'var(--color-primary-red)' }}>{q.id}</td>
                    <td style={{ fontWeight: '600', color: 'var(--text-main)' }}>{q.clientName}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{q.company}</td>
                    <td style={{ color: 'var(--text-main)' }}>{q.service}</td>
                    <td style={{ fontWeight: '700', color: 'var(--color-emerald)' }}>{q.budget}</td>
                    <td style={{ color: 'var(--text-dim)', fontSize: '0.82rem' }}>{q.date}</td>
                    <td>
                      <span className={`badge ${q.status === 'Approved' ? 'badge-emerald' : q.status === 'Pending' ? 'badge-red' : 'badge-dark'}`}>
                        {q.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
