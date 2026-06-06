import { useReveal } from '../hooks/useReveal.js';
import { TechIcon } from './TechIcons.jsx';

const SKILLS = [
  {
    icon: '</>',
    title: 'Languages',
    desc: 'From systems-level C to modern TypeScript.',
    items: ['C / C++', 'C#', 'Java', 'Python', 'JavaScript', 'TypeScript', 'Solidity', 'HTML / CSS'],
  },
  {
    icon: '⚙',
    title: 'Frameworks & Libraries',
    desc: 'Full-stack apps, Web3, and AI pipelines.',
    items: ['React', 'Next.js', 'Node.js', '.NET', 'Express', 'Tailwind CSS', 'Ethers.js', 'LangChain'],
  },
  {
    icon: '🛠',
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
          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.8rem', color: 'var(--accent-bright)' }}>
            {cat.icon}
          </span>
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
