import React, { useEffect, useState } from 'react';
import BrandLogo from './BrandLogo';

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing Creative Engine...');

  useEffect(() => {
    const statusMessages = [
      { at: 15, text: 'Initializing Creative Engine...' },
      { at: 40, text: 'Loading Luxury Brand Assets...' },
      { at: 70, text: 'Rendering Interactive UI & FX...' },
      { at: 95, text: 'Welcome to GS Designs' }
    ];

    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.floor(Math.random() * 8 + 6);
        if (next >= 100) {
          clearInterval(interval);
          setStatusText('Welcome to GS Designs');
          setTimeout(() => setExiting(true), 400);
          setTimeout(() => setLoading(false), 900);
          return 100;
        }

        const msg = statusMessages.find(m => next >= m.at);
        if (msg) setStatusText(msg.text);

        return next;
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  if (!loading) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        background: '#07090E',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        transform: exiting ? 'translateY(-100%)' : 'translateY(0)',
        opacity: exiting ? 0 : 1,
        transition: 'transform 0.8s cubic-bezier(0.77, 0, 0.175, 1), opacity 0.7s ease',
        pointerEvents: exiting ? 'none' : 'auto'
      }}
    >
      {/* Background Animated Glowing Ambient Orbs */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '25%',
        width: '350px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(227, 6, 19, 0.25) 0%, rgba(0,0,0,0) 70%)',
        filter: 'blur(60px)',
        borderRadius: '50%',
        animation: 'pulseGlowLeft 4s ease-in-out infinite alternate'
      }} />

      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '25%',
        width: '350px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(0, 166, 81, 0.25) 0%, rgba(0,0,0,0) 70%)',
        filter: 'blur(60px)',
        borderRadius: '50%',
        animation: 'pulseGlowRight 4s ease-in-out infinite alternate'
      }} />

      {/* Subtle Background Grid Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        opacity: 0.6
      }} />

      {/* Main Preloader Content Card */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '2.5rem',
        maxWidth: '460px',
        width: '90%'
      }}>
        {/* Animated Brand Logo Container */}
        <div style={{
          marginBottom: '2rem',
          transform: 'scale(1.1)',
          animation: 'logoBreath 2.5s ease-in-out infinite'
        }}>
          <BrandLogo size="medium" />
        </div>

        {/* Tagline Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 16px',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '30px',
          marginBottom: '2rem',
          backdropFilter: 'blur(10px)'
        }}>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'var(--color-emerald)',
            boxShadow: '0 0 10px var(--color-emerald)',
            animation: 'blink 1.2s infinite'
          }} />
          <span style={{
            fontSize: '0.82rem',
            color: '#E2E8F0',
            fontWeight: '600',
            letterSpacing: '0.08em',
            textTransform: 'uppercase'
          }}>
            Ideas That Elevate Brands
          </span>
        </div>

        {/* Progress Bar Container */}
        <div style={{
          width: '100%',
          height: '6px',
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '20px',
          overflow: 'hidden',
          position: 'relative',
          marginBottom: '1rem',
          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)'
        }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #E30613 0%, #FF3342 50%, #00A651 100%)',
            borderRadius: '20px',
            transition: 'width 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 0 16px rgba(227, 6, 19, 0.6)'
          }} />
        </div>

        {/* Status Text & Numeric Counter */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          fontSize: '0.85rem'
        }}>
          <span style={{
            color: '#94A3B8',
            fontWeight: '500',
            letterSpacing: '0.02em',
            transition: 'all 0.3s ease'
          }}>
            {statusText}
          </span>
          <span style={{
            color: '#FFFFFF',
            fontWeight: '800',
            fontFamily: 'monospace',
            fontSize: '1rem'
          }}>
            {progress}%
          </span>
        </div>
      </div>

      {/* Keyframe Animations */}
      <style>{`
        @keyframes pulseGlowLeft {
          0% { transform: scale(1) translate(0, 0); opacity: 0.2; }
          100% { transform: scale(1.3) translate(20px, 20px); opacity: 0.45; }
        }
        @keyframes pulseGlowRight {
          0% { transform: scale(1) translate(0, 0); opacity: 0.2; }
          100% { transform: scale(1.3) translate(-20px, -20px); opacity: 0.45; }
        }
        @keyframes logoBreath {
          0%, 100% { transform: scale(1.05); filter: drop-shadow(0 4px 15px rgba(227, 6, 19, 0.3)); }
          50% { transform: scale(1.1); filter: drop-shadow(0 8px 25px rgba(0, 166, 81, 0.4)); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};

export default Preloader;
