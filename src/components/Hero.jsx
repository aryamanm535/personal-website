import { useTypewriter } from '../hooks/useTypewriter.js';

const ROLES = [
  'Software Engineer',
  'ECE Junior @ UT Austin',
  'Blockchain Developer',
  'Incoming Dell SWE Intern',
  'Systems Builder',
];

export default function Hero() {
  const role = useTypewriter(ROLES, { typeSpeed: 70, deleteSpeed: 35, pauseMs: 1800 });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 pt-20"
      style={{ zIndex: 2 }}
    >

      <div className="max-w-3xl w-full mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-14">

          {/* Photo — left */}
          <div className="hero-photo-wrap flex-shrink-0">
            <div className="hero-photo-frame">
              <img src="me.jpeg" alt="Aryaman Modi" />
            </div>
          </div>

          {/* Text */}
          <div className="flex-1 text-center md:text-left">

            <h1
              className="font-extrabold tracking-tight mb-2"
              style={{ fontSize: 'clamp(2.4rem, 7vw, 4rem)', lineHeight: 1.05, letterSpacing: '-0.03em' }}
            >
              <span style={{ color: 'var(--text-primary)' }}>Aryaman </span>
              <span className="gradient-text">Modi</span>
            </h1>

            {/* ECE label — visible, right under name */}
            <p className="font-semibold text-base mb-4" style={{ color: 'var(--accent-bright)', letterSpacing: '0.01em' }}>
              ECE @ UT Austin
            </p>

            {/* Typewriter */}
            <div className="flex items-center justify-center md:justify-start gap-0 mb-5 h-7">
              <span className="text-base font-medium" style={{ color: 'var(--text-muted)' }}>
                {role}
              </span>
              <span className="cursor" />
            </div>

            <p className="text-sm leading-relaxed mb-8 max-w-md mx-auto md:mx-0" style={{ color: 'var(--text-muted)', lineHeight: '1.75' }}>
              Building at the intersection of AI, blockchain, and systems.
              I love hard problems, fast cars, and elegant code.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-8">
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
              >
                Explore my work ↓
              </button>
              <a href="mailto:aryamanmodi@utexas.edu" className="btn-outline">
                Let's connect
              </a>
            </div>

            {/* Socials */}
            <div className="flex items-center justify-center md:justify-start gap-3">
              <a href="https://github.com/aryamanm535" target="_blank" rel="noreferrer" className="social-btn" title="GitHub">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/aryamanmodi5" target="_blank" rel="noreferrer" className="social-btn" title="LinkedIn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>
              <a href="mailto:aryamanmodi@utexas.edu" className="social-btn" title="Email">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator — horizontal line + label */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 opacity-35"
          style={{ animation: 'fadeIn 1.5s ease 1s forwards', opacity: 0 }}
        >
          <div style={{ width: 32, height: 1, background: 'var(--accent)' }} />
          <span className="text-xs font-mono tracking-widest" style={{ color: 'var(--text-muted)' }}>scroll</span>
          <div style={{ width: 32, height: 1, background: 'var(--accent)' }} />
        </div>
      </div>
    </section>
  );
}
