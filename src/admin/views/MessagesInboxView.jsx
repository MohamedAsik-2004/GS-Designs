import React, { useState } from 'react';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';
import { Mail, Trash2, Reply, CheckCircle2, Archive, Send, X } from 'lucide-react';

const MessagesInboxView = () => {
  const { adminMessages, setAdminMessages } = useThemeLanguage();
  const [replyMsgItem, setReplyMsgItem] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [replied, setReplied] = useState(false);

  const toggleRead = (id) => {
    setAdminMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const handleDelete = (id) => {
    setAdminMessages(prev => prev.filter(m => m.id !== id));
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    setReplied(true);
    setTimeout(() => {
      setReplied(false);
      setReplyMsgItem(null);
      setReplyText('');
    }, 2500);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)' }}>Contact Messages Inbox</h3>
          <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            {adminMessages.filter(m => !m.read).length} Unread Messages
          </span>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '1rem' }}>
        {adminMessages.map(msg => (
          <div
            key={msg.id}
            onClick={() => toggleRead(msg.id)}
            style={{
              padding: '1.25rem',
              borderBottom: '1px solid var(--border-color)',
              background: msg.read ? 'transparent' : 'rgba(227, 6, 19, 0.05)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer'
            }}
          >
            <div style={{ maxWidth: '70%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <strong style={{ color: 'var(--text-main)', fontSize: '1rem' }}>{msg.sender}</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>({msg.email})</span>
                {!msg.read && <span className="badge badge-red" style={{ fontSize: '0.65rem' }}>NEW</span>}
              </div>
              <h4 style={{ fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '4px' }}>{msg.subject}</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {msg.text}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={(e) => { e.stopPropagation(); setReplyMsgItem(msg); }}
                className="btn-secondary btn-sm"
              >
                <Reply size={14} /> Reply
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleDelete(msg.id); }}
                style={{ background: 'none', border: 'none', color: '#FF4D58', cursor: 'pointer' }}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Reply Modal */}
      {replyMsgItem && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 100000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div style={{ background: 'var(--bg-secondary)', padding: '2rem', borderRadius: 'var(--radius-lg)', maxWidth: '500px', width: '100%', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main)' }}>Reply to {replyMsgItem.sender}</h3>
              <button onClick={() => setReplyMsgItem(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            {replied ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <CheckCircle2 size={40} style={{ color: '#00A651', marginBottom: '1rem' }} />
                <h4>Email Response Sent!</h4>
              </div>
            ) : (
              <form onSubmit={handleSendReply}>
                <div className="form-group">
                  <label className="form-label">To Email</label>
                  <input type="text" readOnly value={replyMsgItem.email} className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Your Response Message</label>
                  <textarea rows="4" required value={replyText} onChange={e => setReplyText(e.target.value)} className="form-textarea" placeholder="Type your response to the client inquiry..." />
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  <Send size={16} /> Send Email Reply
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesInboxView;
