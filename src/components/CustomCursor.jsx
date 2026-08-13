import React, { useEffect, useState } from 'react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';

const CustomCursor = () => {
  const { cursorEnabled } = useThemeLanguage();
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    if (!cursorEnabled) return;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorEnabled]);

  useEffect(() => {
    if (!cursorEnabled) return;

    const animationFrame = requestAnimationFrame(() => {
      setTrailingPos(prev => ({
        x: prev.x + (position.x - prev.x) * 0.2,
        y: prev.y + (position.y - prev.y) * 0.2
      }));
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [position, cursorEnabled]);

  if (!cursorEnabled) return null;

  return (
    <>
      <div
        className="custom-cursor"
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`
        }}
      />
      <div
        className="custom-cursor-dot"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`
        }}
      />
    </>
  );
};

export default CustomCursor;
