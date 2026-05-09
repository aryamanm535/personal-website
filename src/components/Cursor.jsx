import { useEffect, useRef, useState } from 'react';

export default function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // Only show on true pointer devices
    if (!window.matchMedia('(pointer: fine) and (hover: hover)').matches) return;
    setVisible(true);

    let mouseX = -100, mouseY = -100;
    let ringX  = -100, ringY  = -100;
    let raf;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Detect hovering over interactive elements
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const interactive = el?.closest('a, button, input, textarea, select, label, [role="button"]');
      setHovering(!!interactive);
    };

    const onDown  = () => setClicking(true);
    const onUp    = () => setClicking(false);
    const onLeave = () => { mouseX = -200; mouseY = -200; };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup',   onUp);
    document.documentElement.addEventListener('mouseleave', onLeave);

    const animate = () => {
      ringX += (mouseX - ringX) * 0.10;
      ringY += (mouseY - ringY) * 0.10;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup',   onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 99999,
          pointerEvents: 'none',
          width: 6, height: 6,
          borderRadius: '50%',
          background: hovering ? 'var(--accent-bright)' : '#fff',
          boxShadow: `0 0 8px 2px rgba(192,132,252,${hovering ? 0.8 : 0.4})`,
          transition: 'background 0.2s, transform 0.05s, width 0.2s, height 0.2s',
          transform: clicking ? 'scale(0.6)' : 'scale(1)',
        }}
      />
      {/* Trailing ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 99998,
          pointerEvents: 'none',
          width: 40, height: 40,
          borderRadius: '50%',
          border: `1.5px solid rgba(168,85,247,${hovering ? 0.8 : 0.35})`,
          background: hovering ? 'rgba(168,85,247,0.07)' : 'transparent',
          transition: 'border-color 0.2s, background 0.2s, width 0.2s, height 0.2s',
          transform: clicking ? 'scale(0.8)' : 'scale(1)',
        }}
      />
    </>
  );
}
