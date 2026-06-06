import { useEffect, useRef, useCallback } from 'react';

const NUM_STARS     = 200;
const MOBILE_STARS  = 80;
const LINE_FADE_MS  = 3500;
const LINE_DRAW_MS  = 400;
const CONNECT_R     = 140;
const MAX_CONNECT   = 5;
const SCROLL_FACTOR = 0.5;

export default function StarField() {
  const canvasRef     = useRef(null);
  const starsRef      = useRef([]);
  const linesRef      = useRef([]);
  const clickStarsRef = useRef([]);
  const rafRef        = useRef(null);
  const tRef          = useRef(0);

  const seedStars = useCallback((w, h) => {
    const isMobile = window.matchMedia('(pointer: coarse)').matches;
    const count = isMobile ? MOBILE_STARS : NUM_STARS;
    starsRef.current = Array.from({ length: count }, () => ({
      x:         Math.random() * w,
      y:         Math.random() * h,
      r:         Math.random() * 1.4 + 0.4,
      baseAlpha: Math.random() * 0.45 + 0.15,
      phase:     Math.random() * Math.PI * 2,
      speed:     Math.random() * 0.008 + 0.003,
      driftX:    (Math.random() - 0.5) * 0.25,
      driftY:    (Math.random() - 0.5) * 0.25,
      bright:    Math.random() < 0.08,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');

    // Set canvas resolution to match viewport — do NOT reseed on resize
    const setSize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    seedStars(canvas.width, canvas.height); // seed exactly once

    window.addEventListener('resize', setSize);

    const draw = (ts) => {
      tRef.current = ts * 0.001;
      const { width: W, height: H } = canvas;
      ctx.clearRect(0, 0, W, H);

      const scrollY   = window.scrollY;
      const scrollOff = (scrollY * SCROLL_FACTOR) % H;

      // ── Background stars ──
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      starsRef.current.forEach(s => {
        s.x += s.driftX;
        s.y += s.driftY;
        if (s.x < 0) s.x += W;
        if (s.x > W) s.x -= W;
        if (s.y < 0) s.y += H;
        if (s.y > H) s.y -= H;

        const alpha = s.baseAlpha + Math.sin(tRef.current * s.speed * 60 + s.phase) * 0.18;
        const r     = s.bright ? s.r * 2.2 : s.r;
        const drawY = ((s.y - scrollOff) % H + H) % H;

        if (s.bright) {
          const grd = ctx.createRadialGradient(s.x, drawY, 0, s.x, drawY, r * 4);
          grd.addColorStop(0, `rgba(220,180,255,${alpha * 0.9})`);
          grd.addColorStop(1, 'rgba(168,85,247,0)');
          ctx.fillStyle = grd;
          ctx.beginPath();
          ctx.arc(s.x, drawY, r * 4, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = `rgba(${
          s.bright
            ? (isLight ? '90,30,160'  : '230,200,255')
            : (isLight ? '110,50,180' : '200,170,240')
        },${Math.max(0.08, alpha)})`;
        ctx.beginPath();
        ctx.arc(s.x, drawY, r, 0, Math.PI * 2);
        ctx.fill();
      });

      const now = Date.now();

      // ── Constellation lines ──
      linesRef.current = linesRef.current.filter(l => now - l.born < LINE_FADE_MS + 500);

      linesRef.current.forEach(line => {
        const age     = now - line.born;
        const drawIn  = Math.min(1, age / LINE_DRAW_MS);
        const fadeOut = age > LINE_FADE_MS ? Math.max(0, 1 - (age - LINE_FADE_MS) / 500) : 1;
        const alpha   = 0.6 * drawIn * fadeOut;
        if (alpha < 0.01) return;

        // Both endpoints shift by the same delta so the line never stretches on scroll
        const delta  = (scrollY - line.scrollY) * SCROLL_FACTOR;
        const startX = line.cx;
        const startY = line.cy - delta;
        const endX   = line.ex;
        const endY   = line.ey - delta;

        const ex = startX + (endX - startX) * drawIn;
        const ey = startY + (endY - startY) * drawIn;

        ctx.save();
        ctx.shadowColor = 'rgba(168,85,247,0.8)';
        ctx.shadowBlur  = 6;
        ctx.strokeStyle = `rgba(192,132,252,${alpha * 0.9})`;
        ctx.lineWidth   = 1.1;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(ex, ey);
        ctx.stroke();
        ctx.restore();
      });

      // ── Click-spawned stars ──
      clickStarsRef.current = clickStarsRef.current.filter(
        s => now - s.born < LINE_FADE_MS + 500
      );

      clickStarsRef.current.forEach(s => {
        const age     = now - s.born;
        const fadeOut = age > LINE_FADE_MS ? Math.max(0, 1 - (age - LINE_FADE_MS) / 500) : 1;
        if (fadeOut < 0.01) return;

        const drawY = s.y - (scrollY - s.scrollY) * SCROLL_FACTOR;

        const grd = ctx.createRadialGradient(s.x, drawY, 0, s.x, drawY, 10);
        grd.addColorStop(0,    `rgba(255,255,255,${fadeOut * 0.9})`);
        grd.addColorStop(0.35, `rgba(192,132,252,${fadeOut * 0.6})`);
        grd.addColorStop(1,    'rgba(168,85,247,0)');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(s.x, drawY, 10, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(255,255,255,${fadeOut})`;
        ctx.beginPath();
        ctx.arc(s.x, drawY, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', setSize);
    };
  }, [seedStars]);

  useEffect(() => {
    const onClick = (e) => {
      if (e.target.closest('input, textarea, button, a, select, label, nav, form')) return;

      const stars = starsRef.current;
      if (!stars.length) return;

      const canvas    = canvasRef.current;
      const H         = canvas?.height || window.innerHeight;
      const scrollY   = window.scrollY;
      const scrollOff = (scrollY * SCROLL_FACTOR) % H;

      const vx   = e.clientX;
      const vy   = e.clientY;
      const born = Date.now();

      // Spawn glowing star at click position
      clickStarsRef.current.push({ x: vx, y: vy, scrollY, born });

      // Connect click star to nearby background stars via live refs
      const nearby = [];
      stars.forEach(s => {
        const drawnY = ((s.y - scrollOff) % H + H) % H;
        const d = Math.hypot(s.x - vx, drawnY - vy);
        if (d < CONNECT_R && d > 8) nearby.push({ s, d });
      });
      nearby.sort((a, b) => a.d - b.d);
      nearby.slice(0, MAX_CONNECT).forEach(({ s }) => {
        const drawnY = ((s.y - scrollOff) % H + H) % H;
        linesRef.current.push({
          cx: vx, cy: vy,   // click origin (viewport coords at click time)
          ex: s.x, ey: drawnY, // star endpoint (viewport coords at click time)
          scrollY,
          born,
        });
      });
    };

    window.addEventListener('click', onClick, { capture: true });
    return () => window.removeEventListener('click', onClick, { capture: true });
  }, []);

  return <canvas ref={canvasRef} id="star-canvas" aria-hidden="true" />;
}
