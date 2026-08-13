import React, { useState } from 'react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { X, Calendar, User, Clock, MessageSquare, Send } from 'lucide-react';

const BlogCommentModal = () => {
  const { blogModalPost, closeBlogModal } = useThemeLanguage();
  const [comments, setComments] = useState([
    { name: 'Karan Singhania', text: 'Excellent insights on CMYK printing profiles! This helped us fix color banding issues on our flex banners.', time: '2 days ago' }
  ]);
  const [commenterName, setCommenterName] = useState('');
  const [commentText, setCommentText] = useState('');

  if (!blogModalPost) return null;

  const handleAddComment = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      setComments(prev => [...prev, {
        name: commenterName || 'Anonymous Designer',
        text: commentText,
        time: 'Just now'
      }]);
      setCommenterName('');
      setCommentText('');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(12px)',
      zIndex: 100000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        width: '100%',
        maxWidth: '800px',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        boxShadow: 'var(--shadow-lg)'
      }}>
        {/* Cover Image */}
        <div style={{ position: 'relative', height: '280px' }}>
          <img
            src={blogModalPost.image}
            alt={blogModalPost.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, var(--bg-secondary) 0%, transparent 70%)'
          }} />
          <button
            onClick={closeBlogModal}
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.25rem',
              background: 'rgba(0,0,0,0.6)',
              border: 'none',
              color: '#FFF',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '2rem' }}>
          <span className="badge badge-red" style={{ marginBottom: '0.75rem' }}>{blogModalPost.category}</span>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--text-main)', marginBottom: '1rem', lineHeight: 1.25 }}>
            {blogModalPost.title}
          </h2>

          <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><User size={14} /> {blogModalPost.author}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={14} /> {blogModalPost.date}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> {blogModalPost.readTime}</span>
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem' }}>
            {blogModalPost.content}
          </p>

          {/* Comments Header */}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', marginTop: '2rem' }}>
            <h4 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MessageSquare size={18} style={{ color: 'var(--color-primary-red)' }} />
              Community Discussion ({comments.length})
            </h4>

            {/* Comments List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              {comments.map((c, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <strong style={{ color: 'var(--text-main)', fontSize: '0.9rem' }}>{c.name}</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{c.time}</span>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>{c.text}</p>
                </div>
              ))}
            </div>

            {/* Add Comment Form */}
            <form onSubmit={handleAddComment}>
              <div className="grid-2" style={{ gap: '0.75rem', marginBottom: '0.75rem' }}>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={commenterName}
                  onChange={e => setCommenterName(e.target.value)}
                  className="form-input"
                />
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <textarea
                  rows="2"
                  required
                  placeholder="Join the conversation..."
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                  className="form-textarea"
                />
                <button type="submit" className="btn-primary" style={{ padding: '0.5rem 1.25rem' }}>
                  <Send size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCommentModal;
