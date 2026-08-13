import React, { useState } from 'react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { BRAND_INFO } from '../data/agencyData';
import { X, Send, Bot, User, CheckCheck } from 'lucide-react';

const LiveChatModal = () => {
  const { liveChatOpen, setLiveChatOpen, openQuoteModal } = useThemeLanguage();

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: `Hello! 👋 Welcome to GS Designs. How can we help elevate your brand today?`,
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');

  if (!liveChatOpen) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    const query = inputText.toLowerCase();
    setInputText('');

    // Generate bot response after short delay
    setTimeout(() => {
      let botReplyText = "Thank you for reaching out! Our executive creative team is reviewing your message. For instant response, click 'Get Instant Quote' or call us at " + BRAND_INFO.phone;

      if (query.includes('price') || query.includes('cost') || query.includes('rate') || query.includes('quote')) {
        botReplyText = "Our services start at $149 for Logo Design, $15/sq.ft for HD Flex Printing, and $29 for 100 Spot UV Visiting Cards. Would you like a personalized instant quote?";
      } else if (query.includes('location') || query.includes('address') || query.includes('where')) {
        botReplyText = `Our agency & studio is located at: ${BRAND_INFO.address}, ${BRAND_INFO.cityState}. You are welcome to visit our sample lounge!`;
      } else if (query.includes('hours') || query.includes('time') || query.includes('open')) {
        botReplyText = `We are open Monday through Saturday: ${BRAND_INFO.businessHours.weekdays}. 24/7 digital support is available.`;
      } else if (query.includes('flex') || query.includes('print')) {
        botReplyText = "We utilize Roland High-Definition UV & Solvent Printers for weatherproof outdoor flex banners, hoardings, and indoor vinyls.";
      }

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: botReplyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 600);
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '90px',
      right: '24px',
      width: '380px',
      maxWidth: '90vw',
      height: '520px',
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-lg)',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      animation: 'float 0.3s ease-out'
    }}>
      {/* Chat Header */}
      <div style={{
        background: 'linear-gradient(135deg, #12151E 0%, #1A1F2C 100%)',
        padding: '1rem 1.25rem',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #E30613, #00A651)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFF'
          }}>
            <Bot size={20} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.95rem', color: '#FFF', margin: 0 }}>GS AI Assistant</h4>
            <span style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} /> Online & Ready
            </span>
          </div>
        </div>

        <button
          onClick={() => setLiveChatOpen(false)}
          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages Body */}
      <div style={{
        flex: 1,
        padding: '1rem',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.85rem'
      }}>
        {messages.map(msg => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start'
            }}
          >
            <div style={{
              maxWidth: '82%',
              padding: '0.75rem 1rem',
              borderRadius: msg.sender === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
              background: msg.sender === 'user'
                ? 'linear-gradient(135deg, var(--color-primary-red), #B3000C)'
                : 'rgba(255, 255, 255, 0.08)',
              color: '#FFF',
              fontSize: '0.88rem',
              lineHeight: 1.45,
              border: msg.sender === 'bot' ? '1px solid var(--border-color)' : 'none'
            }}>
              {msg.text}
            </div>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '2px' }}>
              {msg.time} {msg.sender === 'user' && <CheckCheck size={12} style={{ color: '#10B981' }} />}
            </span>
          </div>
        ))}
      </div>

      {/* Quick Action Pills */}
      <div style={{ padding: '0.5rem 1rem', display: 'flex', gap: '6px', overflowX: 'auto', borderTop: '1px solid var(--border-color)' }}>
        <button
          onClick={() => openQuoteModal()}
          className="btn-secondary btn-sm"
          style={{ fontSize: '0.75rem', whiteSpace: 'nowrap', padding: '4px 10px' }}
        >
          📋 Get Quote
        </button>
        <button
          onClick={() => setInputText('What is your flex printing price?')}
          className="btn-secondary btn-sm"
          style={{ fontSize: '0.75rem', whiteSpace: 'nowrap', padding: '4px 10px' }}
        >
          🖨️ Flex Printing Price
        </button>
      </div>

      {/* Chat Input */}
      <form onSubmit={handleSend} style={{
        padding: '0.75rem 1rem',
        borderTop: '1px solid var(--border-color)',
        display: 'flex',
        gap: '8px',
        background: 'var(--bg-main)'
      }}>
        <input
          type="text"
          placeholder="Ask GS AI Assistant..."
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          className="form-input"
          style={{ fontSize: '0.88rem', padding: '0.55rem 0.85rem' }}
        />
        <button type="submit" className="btn-emerald btn-sm" style={{ padding: '0.55rem 1rem' }}>
          <Send size={16} />
        </button>
      </form>
    </div>
  );
};

export default LiveChatModal;
