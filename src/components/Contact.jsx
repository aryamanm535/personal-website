import { useState } from 'react';
import { useReveal } from '../hooks/useReveal.js';

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/>
  </svg>
);

const SOCIALS = [
  { href: 'https://github.com/aryamanm535', label: 'GitHub', Icon: GithubIcon },
  { href: 'https://www.linkedin.com/in/aryamanmodi5', label: 'LinkedIn', Icon: LinkedInIcon },
  { href: 'mailto:aryamanmodi@utexas.edu', label: 'Email', Icon: EmailIcon },
];

export default function Contact() {
  const ref = useReveal();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = form;
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:aryamanmodi@utexas.edu?subject=Portfolio message from ${encodeURIComponent(name)}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="relative py-28 px-6" style={{ zIndex: 2 }}>
      <div className="max-w-5xl mx-auto">
        <div ref={ref} className="reveal">

          {/* Two-column layout on desktop */}
          <div className="flex flex-col md:flex-row gap-16 md:gap-20 items-start">

            {/* Left — info + socials */}
            <div className="md:w-[42%] md:sticky md:top-28">
              <h2 className="section-heading">Let's build something</h2>
              <p className="text-sm leading-relaxed mb-10" style={{ color: 'var(--text-muted)', lineHeight: '1.8', maxWidth: '30ch' }}>
                I'm always open to interesting problems, collaborations, and conversations.
                Whether it's a role, a project, or just a chat — reach out.
              </p>

              {/* Direct email link */}
              <a
                href="mailto:aryamanmodi@utexas.edu"
                className="inline-flex items-center gap-2 mb-8 group"
                style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem' }}
                onMouseOver={e => e.currentTarget.style.color = 'var(--accent-bright)'}
                onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}
              >
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.7rem', opacity: 0.6 }}>→</span>
                aryamanmodi@utexas.edu
              </a>

              <div className="flex items-center gap-3 mb-16">
                {SOCIALS.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    title={label}
                    className="social-btn"
                  >
                    <Icon />
                  </a>
                ))}
              </div>

              {/* Footer inside left col */}
              <div className="border-t pt-6 hidden md:block" style={{ borderColor: 'rgba(139,92,246,0.1)' }}>
                <p className="text-xs font-mono" style={{ color: 'var(--text-dim)' }}>
                  © 2026 Aryaman Modi · React + Vite
                </p>
                <p className="text-xs mt-1.5 font-mono" style={{ color: 'var(--text-dim)', opacity: 0.5 }}>
                  Click the stars ✦
                </p>
              </div>
            </div>

            {/* Right — form */}
            <div className="flex-1 w-full">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono tracking-widest" style={{ color: 'var(--text-dim)' }}>NAME</label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        className="contact-input"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono tracking-widest" style={{ color: 'var(--text-dim)' }}>EMAIL</label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                        className="contact-input"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono tracking-widest" style={{ color: 'var(--text-dim)' }}>MESSAGE</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={7}
                      placeholder="What's on your mind?"
                      className="contact-input resize-none"
                    />
                  </div>
                  <div>
                    <button type="submit" className="btn-primary text-base px-8 py-4">
                      {sent ? 'Opening mail app…' : 'Send message'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Mobile footer */}
          <div className="border-t mt-16 pt-6 md:hidden text-center" style={{ borderColor: 'rgba(139,92,246,0.1)' }}>
            <p className="text-xs font-mono" style={{ color: 'var(--text-dim)' }}>
              © 2026 Aryaman Modi · React + Vite
            </p>
            <p className="text-xs mt-1.5 font-mono" style={{ color: 'var(--text-dim)', opacity: 0.5 }}>
              Click the stars ✦
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
