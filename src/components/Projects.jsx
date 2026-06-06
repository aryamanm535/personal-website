import { useRef, useState, useCallback } from 'react';
import { useReveal } from '../hooks/useReveal.js';

const FEATURED = [
  {
    name: 'Hoot AI',
    subtitle: 'AI Market Tutor',
    desc: 'Educational finance platform that explains stock price movements via AI-generated insights grounded in real headlines. Drag across chart windows to get sourced explanations, then practice with quizzes and a conversational owl-themed chatbot tutor.',
    tags: ['Next.js', 'TypeScript', 'Gemini API', 'Groq', 'Recharts', 'Yahoo Finance'],
    github: 'https://github.com/aryamanm535/hootAI',
    live: "https://use-hoot.vercel.app/",
    img: '/icons/hoot.png',
    badge: 'Hackathon',
  },
  {
    name: 'ValidNFT',
    subtitle: 'XDC Staking Marketplace',
    desc: 'Primary project from my internship at X Digital Capital Solutions. Redesigned smart contract architecture to a per-collection model for gas optimization and built the full-stack marketplace workflow — from contract deployment to React frontend.',
    tags: ['Solidity', 'Node.js', 'React', 'MongoDB', 'Ethers.js', 'XDC'],
    github: 'https://github.com/aryamanm535/ValidNFT',
    live: null,
    img: '/icons/validnft.png',
    imgStyle: { objectFit: 'contain', padding: '1.25rem' },
    badge: null,
  },
  {
    name: 'Focus Bubble',
    subtitle: 'Productivity Boosted Focus Rooms',
    desc: 'Create or join a room, declare your task, and lock in together. Users can use a synced pomodoro clock, voice/video, enable attention tracking, and connect to Spotify!',
    tags: ['Node.js', 'React', 'Tailwind', 'JavaScript', 'SpotifyAPI'],
    github: 'https://github.com/aryamanm535/focus-bubble',
    live: "https://focus-bubble-henna.vercel.app/",
    img: '/icons/focus.png',
    imgStyle: { objectFit: 'contain', padding: '1rem' },
    badge: 'Releasing Update Soon!',
  },
];

const MORE = [
  {
    name: 'Space Invaders',
    subtitle: 'Embedded Systems',
    desc: 'Full game engine in C on an MSPM0G3507 microcontroller — bare metal. Sprites, collision, game logic, user input, all without an OS.',
    tags: ['C', 'Embedded', 'Hardware'],
    github: 'https://github.com/aryamanm535/space-invaders',
    link: 'https://www.youtube.com/watch?v=mgJ2n2XCgT4',
    linkLabel: 'Watch Demo',
    emoji: '👾',
  },
  {
    name: 'F1 Aerodynamics',
    subtitle: 'Published Research',
    desc: 'Co-authored peer-reviewed research on a split dihedral/anhedral rear wing arrangement on an F1 car. Proved a 19% centripetal force increase via ANSYS simulation.',
    tags: ['ANSYS Fluent', 'SolidWorks', 'Research'],
    link: 'https://ijournals.in/wp-content/uploads/2022/10/12.IJSHRE-101015-Aryaman.pdf',
    linkLabel: 'Read Paper',
    emoji: '📄',
    badge: 'Published',
  },
  {
    name: 'Blip Language',
    subtitle: 'Toy Programming Language',
    desc: 'Built a fully-functional programming language from scratch just to see if I could. Custom lexer, parser, and interpreter in C++.',
    tags: ['C++', 'Compilers', 'Side Project'],
    github: 'https://github.com/aryamanm535/Blip',
    link: null,
    emoji: '⚙️',
  },
  {
    name: 'Sudoku Solver',
    subtitle: 'Java Swing + AI',
    desc: 'Playable Sudoku GUI with a built-in AI solver. Backtracking algorithm solves any valid board instantly from within the game.',
    tags: ['Java', 'Swing', 'Algorithms'],
    github: 'https://github.com/aryamanm535/Sudoku-GUI-Game-AI-Solver',
    emoji: '🧩',
  },
  {
    name: 'Mastermind',
    subtitle: 'Java GUI Game',
    desc: 'Classic code-breaking board game built as a Java GUI app. Full game logic, color pegs, and feedback indicators.',
    tags: ['Java', 'Swing', 'Game'],
    github: 'https://github.com/aryamanm535/Mastermind-GUI',
    emoji: '🎯',
  },
  {
    name: 'Monty Hall Sim',
    subtitle: 'Probability Visualizer',
    desc: 'Interactive simulation of the Monty Hall paradox using Java GUI. Run thousands of trials and watch the win rates converge.',
    tags: ['Java', 'Swing', 'Statistics'],
    github: 'https://github.com/aryamanm535/montyhallsimulation',
    emoji: '🚪',
  },
  {
    name: 'Impossible Tic-Tac-Toe',
    subtitle: 'Unbeatable AI',
    desc: 'Tic-tac-toe with a minimax AI that cannot be beaten. Play, draw, or lose — winning is not an option.',
    tags: ['Java', 'Minimax', 'Game'],
    github: 'https://github.com/aryamanm535/impossible-tictactoe',
    emoji: '❌',
  },
  {
    name: 'Hospital Manager',
    subtitle: 'Full-Stack App',
    desc: 'Web application for managing hospital records — patients, doctors, and appointments in one dashboard.',
    tags: ['JavaScript', 'Node.js', 'Full-Stack'],
    github: 'https://github.com/aryamanm535/hospital_manager',
    emoji: '🏥',
  },
  {
    name: 'Wordle',
    subtitle: 'Java Game',
    desc: 'Terminal-style Wordle clone with a word bank, color-coded feedback, and six attempts to guess the hidden word.',
    tags: ['Java', 'Game'],
    github: 'https://github.com/aryamanm535/hangman',
    emoji: '🟩',
  },
];

const MAX_TILT = 8; // degrees

function useTilt() {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, mx: 0, my: 0, active: false });

  const onMouseMove = useCallback((e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({
      x: -dy * MAX_TILT,
      y:  dx * MAX_TILT,
      mx: e.clientX - rect.left,
      my: e.clientY - rect.top,
      active: true,
    });
  }, []);

  const onMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0, mx: 0, my: 0, active: false });
  }, []);

  return { cardRef, tilt, onMouseMove, onMouseLeave };
}

export default function Projects() {
  const headRef = useReveal();

  return (
    <section id="projects" className="relative py-28 px-6" style={{ zIndex: 2 }}>
      <div className="max-w-5xl mx-auto">
        <div ref={headRef} className="reveal mb-14">
          <h2 className="section-heading">Things I've built</h2>
          <p className="section-sub">A selection of projects — shipped, hacked, and researched.</p>
        </div>

        {/* Featured — horizontal cards */}
        <div className="flex flex-col gap-5 mb-16">
          {FEATURED.map((p, i) => <FeaturedCard key={p.name} project={p} delay={i * 0.1} />)}
        </div>

        {/* More projects */}
        <div>
          <h3 className="text-xs font-mono tracking-widest uppercase mb-6" style={{ color: 'var(--text-muted)' }}>
            More projects
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {MORE.map((p, i) => <SmallCard key={p.name} project={p} delay={i * 0.08} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({ project: p, delay }) {
  const revealRef = useReveal(0.1);
  const { cardRef, tilt, onMouseMove, onMouseLeave } = useTilt();

  return (
    <div
      ref={(el) => { revealRef.current = el; cardRef.current = el; }}
      className="reveal group flex flex-col md:flex-row overflow-hidden"
      style={{
        transitionDelay: `${delay}s`,
        borderRadius: '12px',
        border: '1px solid var(--border)',
        background: tilt.active
          ? `radial-gradient(380px at ${tilt.mx}px ${tilt.my}px, rgba(168,85,247,0.12), transparent 70%), var(--bg-card)`
          : 'var(--bg-card)',
        transform: tilt.active
          ? `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.01)`
          : 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)',
        transition: tilt.active
          ? 'transform 0.08s linear, border-color 0.25s ease, background 0.15s ease, box-shadow 0.25s ease'
          : 'transform 0.55s cubic-bezier(0.23,1,0.32,1), border-color 0.25s ease, background 0.15s ease, box-shadow 0.25s ease',
        boxShadow: tilt.active
          ? '0 20px 60px rgba(168,85,247,0.15), 0 8px 32px rgba(0,0,0,0.5)'
          : '0 4px 16px rgba(0,0,0,0.3)',
        willChange: 'transform',
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Shine overlay */}
      {tilt.active && (
        <div
          style={{
            position: 'absolute', inset: 0, borderRadius: '12px',
            background: `radial-gradient(180px at ${tilt.mx}px ${tilt.my}px, rgba(255,255,255,0.06), transparent 70%)`,
            pointerEvents: 'none', zIndex: 1,
          }}
        />
      )}

      {/* Image — full width on mobile, left column on desktop */}
      <div
        className="aspect-video md:aspect-auto md:w-[38%] md:flex-shrink-0 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a0f2e 0%, #0e0a18 50%, #130c22 100%)', minHeight: '160px' }}
      >
        {p.img
          ? <><img src={p.img} alt={p.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', ...p.imgStyle }} /><div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(168,85,247,0.2) 0%, transparent 60%)' }} /></>
          : (
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, position: 'absolute', inset: 0 }}>
              <span style={{ fontSize: '2.8rem' }}>{p.emoji}</span>
              <span style={{ fontSize: '0.65rem', fontFamily: 'Space Mono, monospace', color: 'rgba(168,85,247,0.3)', letterSpacing: '0.1em' }}>screenshot coming soon</span>
            </div>
          )
        }
        {p.badge && (
          <div
            className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium"
            style={{
              background: 'rgba(10,6,20,0.72)',
              border: '1px solid rgba(168,85,247,0.35)',
              color: 'var(--accent-bright)',
              backdropFilter: 'blur(8px)',
              letterSpacing: '0.01em',
              borderRadius: '6px',
            }}
          >
            {p.badge === 'In Progress' && (
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse flex-shrink-0" />
            )}
            {p.badge}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1" style={{ position: 'relative', zIndex: 2 }}>
        <div className="mb-3">
          <h3 className="font-bold text-lg leading-snug mb-0.5" style={{ color: p.img ? '#fff' : 'var(--text-primary)' }}>
            {p.name}
          </h3>
          <p className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>{p.subtitle}</p>
        </div>

        <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: 'var(--text-muted)' }}>
          {p.desc}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
        </div>

        <div className="flex gap-4 mt-auto">
          {p.github && (
            <a href={p.github} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
              style={{ color: 'var(--text-muted)' }}
              onMouseOver={e => e.currentTarget.style.color = 'var(--accent-bright)'}
              onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              Code
            </a>
          )}
          {p.live && (
            <a href={p.live} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
              style={{ color: 'var(--text-muted)' }}
              onMouseOver={e => e.currentTarget.style.color = 'var(--accent-bright)'}
              onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
              </svg>
              Live Website
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function SmallCard({ project: p, delay }) {
  const revealRef = useReveal(0.1);
  const { cardRef, tilt, onMouseMove, onMouseLeave } = useTilt();

  return (
    <div
      ref={(el) => { revealRef.current = el; cardRef.current = el; }}
      className="reveal p-5 flex flex-col gap-3 group cursor-default"
      style={{
        transitionDelay: `${delay}s`,
        borderRadius: '12px',
        border: '1px solid var(--border)',
        background: tilt.active
          ? `radial-gradient(260px at ${tilt.mx}px ${tilt.my}px, rgba(168,85,247,0.13), transparent 70%), var(--bg-card)`
          : 'var(--bg-card)',
        transform: tilt.active
          ? `perspective(700px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)`
          : 'perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)',
        transition: tilt.active
          ? 'transform 0.08s linear, border-color 0.25s ease, background 0.15s ease'
          : 'transform 0.55s cubic-bezier(0.23,1,0.32,1), border-color 0.25s ease, background 0.15s ease',
        boxShadow: tilt.active ? '0 16px 40px rgba(168,85,247,0.12), 0 4px 20px rgba(0,0,0,0.4)' : 'none',
        willChange: 'transform',
        position: 'relative',
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {tilt.active && (
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '12px',
          background: `radial-gradient(140px at ${tilt.mx}px ${tilt.my}px, rgba(255,255,255,0.05), transparent 70%)`,
          pointerEvents: 'none', zIndex: 1,
        }} />
      )}

      <div className="flex items-start justify-between gap-2" style={{ position: 'relative', zIndex: 2 }}>
        <span className="text-2xl">{p.emoji}</span>
        {p.badge && (
          <span className="text-xs px-2 py-0.5 font-medium"
            style={{ background: 'rgba(10,6,20,0.72)', color: 'var(--accent-bright)', border: '1px solid rgba(168,85,247,0.35)', backdropFilter: 'blur(8px)', letterSpacing: '0.01em', borderRadius: '4px' }}>
            {p.badge}
          </span>
        )}
      </div>

      <div style={{ position: 'relative', zIndex: 2 }}>
        <h4 className="font-bold text-sm mb-0.5" style={{ color: 'var(--text-primary)' }}>{p.name}</h4>
        <p className="text-xs font-semibold" style={{ color: 'var(--accent)' }}>{p.subtitle}</p>
      </div>

      <p className="text-xs leading-relaxed flex-1" style={{ color: 'var(--text-muted)', position: 'relative', zIndex: 2 }}>{p.desc}</p>

      <div className="flex flex-wrap gap-1.5" style={{ position: 'relative', zIndex: 2 }}>
        {p.tags.map(t => (
          <span key={t} className="tag" style={{ fontSize: '0.62rem', padding: '2px 6px' }}>{t}</span>
        ))}
      </div>

      <div className="flex items-center gap-4" style={{ position: 'relative', zIndex: 2 }}>
        {p.github && (
          <a
            href={p.github} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold transition-colors"
            style={{ color: 'var(--text-dim)' }}
            onMouseOver={e => e.currentTarget.style.color = 'var(--accent-bright)'}
            onMouseOut={e => e.currentTarget.style.color = 'var(--text-dim)'}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            Code
          </a>
        )}
        {p.link && (
          <a
            href={p.link} target="_blank" rel="noreferrer"
            className="text-xs font-semibold transition-colors"
            style={{ color: 'var(--text-dim)' }}
            onMouseOver={e => e.currentTarget.style.color = 'var(--accent-bright)'}
            onMouseOut={e => e.currentTarget.style.color = 'var(--text-dim)'}
          >
            {p.linkLabel} ↗
          </a>
        )}
      </div>
    </div>
  );
}
