import { useEffect, useRef, useState, useCallback } from 'react';
import { useReveal } from '../hooks/useReveal.js';

const JOBS = [
  {
    company: 'Dell Technologies',
    role: 'SWE Intern — Global Operations',
    period: 'May - Aug 2026',
    location: 'Austin, TX',
    desc: 'Joining the Global Operations engineering team to build software that powers enterprise operations at scale.',
    tags: ['Incoming'],
    status: 'upcoming',
    icon: '/icons/dell.png'
  },
  {
    company: 'X Digital Capital Solutions',
    role: 'Software Development Engineer',
    period: 'May - Aug 2025',
    location: 'Austin, TX',
    desc: 'Built ValidNFT — a full-stack NFT staking marketplace on the XDC network. Redesigned smart contract architecture to a per-collection model, cutting gas costs significantly.',
    tags: ['Solidity', 'React', 'Node.js', 'MongoDB', 'Ethers.js'],
    icon: '/icons/xdcs.jpeg'
  },
  {
    company: 'University of Texas at Austin',
    role: 'IT Assistant',
    period: 'Aug 2024 – Present',
    location: 'Austin, TX',
    desc: 'Resolving enterprise networking issues and automating repetitive IT workflows using generative AI tools.',
    tags: ['Networking', 'Automation', 'GenAI'],
    icon: '/icons/cns.png'
  },
  {
    company: 'Yodaplus Technologies',
    role: 'SWE Intern',
    period: 'May - Aug 2024',
    location: 'India',
    desc: 'Developed a hospital CRM system and deployed scalable microservices. Built robust REST APIs with Node.js.',
    tags: ['Node.js', 'REST APIs', 'Microservices'],
    icon: '/icons/yp.jpeg'
  },
  {
    company: 'Longhorn Racing',
    role: 'Aerodynamics Engineer',
    period: 'Aug 2023 – Sep 2024',
    location: 'Austin, TX',
    desc: 'Used SolidWorks & ANSYS Fluent to optimize vehicle downforce for Formula SAE. Published peer-reviewed research on F1 rear wing aerodynamics — proved a 19% centripetal force increase.',
    tags: ['ANSYS Fluent', 'SolidWorks', 'Research'],
    icon: '/icons/lhr.jpg'
  },
];

export default function Experience() {
  const headRef     = useRef(null);
  const containerRef = useRef(null);
  const nodeRefs    = useRef([]);
  const [orbTop, setOrbTop]           = useState(null);
  const [activeIdx, setActiveIdx]     = useState(0);
  const [nodePositions, setNodePositions] = useState([]);

  const snapOrb = useCallback(() => {
    const container = containerRef.current;
    if (!container || nodeRefs.current.length === 0) return;

    const containerRect = container.getBoundingClientRect();
    const trigger = window.innerHeight * 0.55;

    let foundIdx = 0;
    for (let i = 0; i < nodeRefs.current.length; i++) {
      const el = nodeRefs.current[i];
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top + rect.height / 2 <= trigger) foundIdx = i;
    }

    // Compute center position of every node relative to the container
    const positions = nodeRefs.current.map(el => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        x: r.left - containerRect.left + r.width / 2,
        y: r.top  - containerRect.top  + r.height / 2,
      };
    }).filter(Boolean);

    const activeEl = nodeRefs.current[foundIdx];
    if (!activeEl) return;
    const r   = activeEl.getBoundingClientRect();
    const pos = r.top - containerRect.top + r.height / 2;

    setActiveIdx(foundIdx);
    setOrbTop(pos);
    setNodePositions(positions);
  }, []);

  useEffect(() => {
    const raf = requestAnimationFrame(snapOrb);
    window.addEventListener('scroll', snapOrb, { passive: true });
    window.addEventListener('resize', snapOrb, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', snapOrb);
      window.removeEventListener('resize', snapOrb);
    };
  }, [snapOrb]);

  // Reveal for the heading block
  const headRevealRef = useReveal();

  return (
    <section id="experience" className="relative py-28 px-6" style={{ zIndex: 2 }}>
      <div className="max-w-3xl mx-auto">
        <div ref={headRevealRef} className="reveal mb-16">
          <h2 className="section-heading">Career History</h2>
          <p className="section-sub">Where I've built, shipped, and learned.</p>
        </div>

        {/* Timeline container */}
        <div className="relative" ref={containerRef}>
          {/* Background rail */}
          <div className="timeline-rail hidden md:block" />

          {/* SVG constellation lines between visited nodes */}
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
                <filter id="line-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2.5" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>

              {/* Lines from node 0 → activeIdx */}
              {nodePositions.slice(0, activeIdx).map((from, i) => {
                const to = nodePositions[i + 1];
                if (!to) return null;
                return (
                  <line key={i}
                    x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                    stroke="rgba(192,132,252,0.55)"
                    strokeWidth="1.2"
                    filter="url(#line-glow)"
                  />
                );
              })}

              {/* Visited node dots */}
              {nodePositions.slice(0, activeIdx + 1).map((pos, i) => (
                <circle key={i}
                  cx={pos.x} cy={pos.y} r="3.5"
                  fill="rgba(220,180,255,0.9)"
                  filter="url(#line-glow)"
                />
              ))}
            </svg>
          )}

          {/* Star orb — snaps to active node */}
          {orbTop !== null && (
            <div
              className="hidden md:block"
              style={{
                position: 'absolute',
                left: `${nodePositions[activeIdx]?.x ?? 20}px`,
                top: `${orbTop}px`,
                transform: 'translate(-50%, -50%)',
                transition: 'top 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), left 0.45s ease',
                zIndex: 10,
                pointerEvents: 'none',
              }}
            >
              <svg width="24" height="24" viewBox="-12 -12 24 24" style={{ overflow: 'visible' }} aria-hidden="true">
                {/* Outer glow rings */}
                <circle cx="0" cy="0" r="14" fill="rgba(168,85,247,0.15)"/>
                <circle cx="0" cy="0" r="9"  fill="rgba(192,132,252,0.22)"/>
                {/* 4-point star */}
                <polygon
                  points="0,-8 1.6,-1.6 8,0 1.6,1.6 0,8 -1.6,1.6 -8,0 -1.6,-1.6"
                  fill="white"
                  opacity="0.92"
                />
                {/* Bright core */}
                <circle cx="0" cy="0" r="2.2" fill="white"/>
              </svg>
            </div>
          )}

          <div className="flex flex-col gap-10">
            {JOBS.map((job, i) => (
              <TimelineItem
                key={job.company + job.period}
                job={job}
                index={i}
                nodeRef={(el) => { nodeRefs.current[i] = el; }}
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
      {/* Node dot — used for position tracking; hidden behind SVG dots */}
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
    <div
      className="card p-6 group cursor-default"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Left accent bar on hover */}
      <div
        className="absolute left-0 top-0 bottom-0 w-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--accent), transparent)' }}
      />

      <div className="flex items-start gap-3 mb-3">
        <div
          className="flex-shrink-0 rounded-lg overflow-hidden"
          style={{
            width: 40, height: 40,
            background: 'rgba(168,85,247,0.08)',
            border: '1px solid rgba(168,85,247,0.18)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {job.icon
            ? <img src={job.icon} alt={job.company} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : <span style={{ fontSize: '1rem', opacity: 0.3 }}>🏢</span>
          }
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-base leading-tight" style={{ color: 'var(--text-primary)' }}>
              {job.role}
            </h3>
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

      <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-muted)', paddingLeft: '52px' }}>
        {job.desc}
      </p>

      <div className="flex flex-wrap gap-1.5" style={{ paddingLeft: '52px' }}>
        {job.tags.map(t => <span key={t} className="tag">{t}</span>)}
      </div>
    </div>
  );
}
