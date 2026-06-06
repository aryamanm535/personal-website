import { useEffect, useRef, useState, useCallback } from 'react';
import { useReveal } from '../hooks/useReveal.js';

const JOBS = [
  {
    company: 'Dell Technologies',
    role: 'SWE Intern — Global Test Engineering',
    period: 'May - Aug 2026',
    location: 'Austin, TX',
    desc: 'Building an agentic testing solution in an MVC environment.',
    tags: ['Current'],
    icon: '/icons/dell.png',
  },
  {
    company: 'X Digital Capital Solutions',
    role: 'Software Development Engineer',
    period: 'May - Aug 2025',
    location: 'Austin, TX',
    desc: 'Built ValidNFT — a full-stack NFT staking marketplace on the XDC network. Redesigned smart contract architecture to a per-collection model, cutting gas costs significantly.',
    tags: ['Solidity', 'React', 'Node.js', 'MongoDB', 'Ethers.js'],
    icon: '/icons/xdcs.jpeg',
  },
  {
    company: 'University of Texas at Austin',
    role: 'IT Assistant',
    period: 'Aug 2024 – Present',
    location: 'Austin, TX',
    desc: 'Resolving enterprise networking issues and automating repetitive IT workflows using generative AI tools.',
    tags: ['Networking', 'Automation', 'GenAI'],
    icon: '/icons/cns.png',
  },
  {
    company: 'Yodaplus Technologies',
    role: 'SWE Intern',
    period: 'May - Aug 2024',
    location: 'India',
    desc: 'Developed a hospital CRM system and deployed scalable microservices. Built robust REST APIs with Node.js.',
    tags: ['Node.js', 'REST APIs', 'Microservices'],
    icon: '/icons/yp.jpeg',
  },
  {
    company: 'Longhorn Racing',
    role: 'Aerodynamics Engineer',
    period: 'Aug 2023 – Sep 2024',
    location: 'Austin, TX',
    desc: 'Used SolidWorks & ANSYS Fluent to optimize vehicle downforce for Formula SAE. Published peer-reviewed research on F1 rear wing aerodynamics — proved a 19% centripetal force increase.',
    tags: ['ANSYS Fluent', 'SolidWorks', 'Research'],
    icon: '/icons/lhr.jpg',
  },
];

// Container-relative position via offsetParent chain.
// The node uses translate(-50%,-50%) so offsetLeft/offsetTop (transform-unaware)
// already equal the visual center — don't add half-dimensions on top.
function offsetRelativeTo(el, container) {
  let x = 0, y = 0;
  let curr = el;
  while (curr && curr !== container) {
    x += curr.offsetLeft;
    y += curr.offsetTop;
    curr = curr.offsetParent;
  }
  return { x, y };
}

// Absolute page Y — same reasoning: offsetTop already is the visual center Y.
function pageY(el) {
  let y = 0;
  let curr = el;
  while (curr) { y += curr.offsetTop; curr = curr.offsetParent; }
  return y;
}

export default function Experience() {
  const containerRef  = useRef(null);
  const nodeRefs      = useRef([]);
  const headRevealRef = useReveal();

  // Each entry: { x, y } (container-relative) + absY (page-absolute)
  const [nodePositions, setNodePositions] = useState([]);
  // Float 0..N-1: how far through the timeline the viewport centre has scrolled
  const [scrollProgress, setScrollProgress] = useState(0);
  // Interpolated orb position in container-relative coords
  const [orb, setOrb] = useState(null);

  const computePositions = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const positions = nodeRefs.current.map(el => {
      if (!el) return null;
      const rel = offsetRelativeTo(el, container);
      return { ...rel, absY: pageY(el) };
    }).filter(Boolean);
    setNodePositions(positions);
  }, []);

  useEffect(() => {
    const t = setTimeout(computePositions, 150);
    window.addEventListener('resize', computePositions);
    return () => { clearTimeout(t); window.removeEventListener('resize', computePositions); };
  }, [computePositions]);

  // Scroll-driven progress — runs every scroll tick
  useEffect(() => {
    if (nodePositions.length === 0) return;

    let rafPending = false;
    const compute = () => {
      rafPending = false;
      const mid = window.scrollY + window.innerHeight * 0.50;
      const absYs = nodePositions.map(p => p.absY);
      const n = nodePositions.length;

      let prog = 0;
      if (mid <= absYs[0]) {
        prog = 0;
      } else if (mid >= absYs[n - 1]) {
        prog = n - 1;
      } else {
        for (let i = 0; i < n - 1; i++) {
          if (mid >= absYs[i] && mid < absYs[i + 1]) {
            prog = i + (mid - absYs[i]) / (absYs[i + 1] - absYs[i]);
            break;
          }
        }
      }

      setScrollProgress(prog);

      const lo = Math.min(Math.floor(prog), n - 2);
      const t  = prog <= 0 ? 0 : prog >= n - 1 ? 1 : prog - lo;
      const a  = nodePositions[lo];
      const b  = nodePositions[Math.min(lo + 1, n - 1)];
      setOrb({
        x: a.x + t * (b.x - a.x),
        y: a.y + t * (b.y - a.y),
      });
    };

    const update = () => {
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(compute);
    };

    window.addEventListener('scroll', update, { passive: true });
    compute();
    return () => window.removeEventListener('scroll', update);
  }, [nodePositions]);

  return (
    <section id="experience" className="relative py-28 px-6" style={{ zIndex: 2 }}>
      <div className="max-w-3xl mx-auto">
        <div ref={headRevealRef} className="reveal mb-16">
          <h2 className="section-heading">Career History</h2>
          <p className="section-sub">Where I've built, shipped, and learned.</p>
        </div>

        <div className="relative" ref={containerRef}>
          <div className="timeline-rail hidden md:block" />

          {nodePositions.length > 1 && (
            <svg
              className="hidden md:block"
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                pointerEvents: 'none', zIndex: 8,
                overflow: 'visible',
              }}
              aria-hidden="true"
            >
              <defs>
                <filter id="exp-glow" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur stdDeviation="3" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>

              {/* Lines — strokeDashoffset decreases as scrollProgress passes each segment */}
              {nodePositions.slice(0, -1).map((from, i) => {
                const to       = nodePositions[i + 1];
                const len      = Math.hypot(to.x - from.x, to.y - from.y);
                const fraction = Math.max(0, Math.min(1, scrollProgress - i));
                if (fraction <= 0) return null;
                return (
                  <line key={i}
                    x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                    stroke="rgba(192,132,252,0.6)"
                    strokeWidth="1.2"
                    strokeDasharray={len}
                    strokeDashoffset={len * (1 - fraction)}
                    filter="url(#exp-glow)"
                  />
                );
              })}

              {/* Dots — fade in as orb approaches each node */}
              {nodePositions.map((pos, i) => {
                const alpha = Math.max(0, Math.min(1, (scrollProgress - i + 0.35) / 0.35));
                if (alpha <= 0) return null;
                return (
                  <circle key={i}
                    cx={pos.x} cy={pos.y} r="3.5"
                    fill="rgba(220,180,255,0.95)"
                    opacity={alpha}
                    filter="url(#exp-glow)"
                  />
                );
              })}
            </svg>
          )}

          {/* Star orb — directly scroll-driven, no CSS transition lag */}
          {orb && (
            <div
              className="hidden md:block"
              style={{
                position: 'absolute',
                left: `${orb.x}px`,
                top:  `${orb.y}px`,
                transform: 'translate(-50%, -50%)',
                zIndex: 10,
                pointerEvents: 'none',
              }}
            >
              <svg width="24" height="24" viewBox="-12 -12 24 24" overflow="visible" aria-hidden="true">
                <circle cx="0" cy="0" r="16" fill="rgba(168,85,247,0.12)"/>
                <circle cx="0" cy="0" r="10" fill="rgba(192,132,252,0.20)"/>
                <polygon
                  points="0,-9 1.8,-1.8 9,0 1.8,1.8 0,9 -1.8,1.8 -9,0 -1.8,-1.8"
                  fill="white" opacity="0.93"
                />
                <circle cx="0" cy="0" r="2.5" fill="white"/>
              </svg>
            </div>
          )}

          <div className="flex flex-col gap-10">
            {JOBS.map((job, i) => (
              <TimelineItem
                key={job.company + job.period}
                job={job}
                index={i}
                nodeRef={el => { nodeRefs.current[i] = el; }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ job, index, nodeRef }) {
  const ref = useReveal(0.1);
  return (
    <div
      ref={ref}
      className="reveal relative md:pl-14"
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      <div
        ref={nodeRef}
        className="timeline-node hidden md:block"
        style={{ top: '50%', transform: 'translate(-50%, -50%)' }}
      />
      <JobCard job={job} />
    </div>
  );
}

function JobCard({ job }) {
  return (
    <div className="card p-6 group cursor-default" style={{ position: 'relative', overflow: 'hidden' }}>
      <div
        className="absolute left-0 top-0 bottom-0 w-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--accent), transparent)' }}
      />

      <div className="flex items-start gap-3 mb-3">
        <div className="flex-shrink-0 rounded-lg overflow-hidden" style={{
          width: 40, height: 40,
          background: 'rgba(168,85,247,0.08)',
          border: '1px solid rgba(168,85,247,0.18)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {job.icon
            ? <img src={job.icon} alt={job.company} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : <span style={{ fontSize: '1rem', opacity: 0.3 }}>🏢</span>}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-base leading-tight" style={{ color: 'var(--text-primary)' }}>{job.role}</h3>
            {job.status === 'upcoming' && (
              <span className="text-xs px-2 py-0.5 rounded font-medium"
                style={{ background: 'rgba(10,6,20,0.72)', color: 'var(--accent-bright)', border: '1px solid rgba(168,85,247,0.35)', backdropFilter: 'blur(8px)' }}>
                Upcoming
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
            <p className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>{job.company}</p>
            <span style={{ color: 'var(--text-dim)', fontSize: '0.7rem' }}>·</span>
            <p className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{job.period}</p>
            <span style={{ color: 'var(--text-dim)', fontSize: '0.7rem' }}>·</span>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{job.location}</p>
          </div>
        </div>
      </div>

      <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-muted)', paddingLeft: '52px' }}>{job.desc}</p>
      <div className="flex flex-wrap gap-1.5" style={{ paddingLeft: '52px' }}>
        {job.tags.map(t => <span key={t} className="tag">{t}</span>)}
      </div>
    </div>
  );
}
