import { useReveal } from '../hooks/useReveal.js';
import { TechIcon } from './TechIcons.jsx';

const C = 'var(--accent-bright)';

const SKILLS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
        <line x1="12" y1="5" x2="12" y2="19" strokeOpacity="0.45"/>
      </svg>
    ),
    title: 'Languages',
    desc: 'From systems-level C to modern TypeScript.',
    items: ['C / C++', 'C#', 'Java', 'Python', 'JavaScript', 'TypeScript', 'Solidity', 'HTML / CSS'],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
      </svg>
    ),
    title: 'Frameworks & Libraries',
    desc: 'Full-stack apps, Web3, and AI pipelines.',
    items: ['React', 'Next.js', 'Node.js', '.NET', 'Express', 'Tailwind CSS', 'Ethers.js', 'LangChain'],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    title: 'Tools & Platforms',
    desc: 'Ship with confidence, anywhere.',
    items: ['Git', 'Docker', 'MongoDB', 'SQL', 'Firebase', 'Jira', 'Regrello', 'Hadoop', 'Linux'],
  },
];

export default function Skills() {
  const ref = useReveal();

  return (
    <section id="skills" className="relative py-28 px-6" style={{ zIndex: 2 }}>
      <div className="max-w-5xl mx-auto">
        <div ref={ref} className="reveal">
          <h2 className="section-heading">What I work with</h2>
          <p className="section-sub">The tools and technologies I use to build.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {SKILLS.map((cat, i) => (
            <SkillCard key={cat.title} cat={cat} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({ cat, delay }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className="reveal card p-6 cursor-default"
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="skill-card-header">
        <div className="skill-card-icon">
          {cat.icon}
        </div>
        <span className="skill-card-title">{cat.title}</span>
      </div>
      <p className="skill-card-desc">{cat.desc}</p>
      <div className="flex flex-wrap gap-2">
        {cat.items.map(item => (
          <span key={item} className="tag" style={{ gap: '5px' }}>
            <TechIcon name={item} size={13} />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
