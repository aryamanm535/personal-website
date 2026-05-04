// Inline SVG logos for tech skill pills
export function TechIcon({ name, size = 14 }) {
  const s = size;

  const badge = (text, bg, fg = '#fff') => (
    <svg width={s} height={s} viewBox="0 0 24 24">
      <rect width="24" height="24" rx="4" fill={bg}/>
      <text x="12" y="17" textAnchor="middle" fontSize={text.length > 2 ? '7' : '12'}
        fontWeight="900" fontFamily="Arial Black,Arial,sans-serif" fill={fg}>{text}</text>
    </svg>
  );

  const icons = {
    'JavaScript': (
      <svg width={s} height={s} viewBox="0 0 24 24">
        <rect width="24" height="24" rx="3" fill="#F7DF1E"/>
        <text x="12" y="18" textAnchor="middle" fontSize="12" fontWeight="900"
          fontFamily="Arial Black,Arial,sans-serif" fill="#222">JS</text>
      </svg>
    ),
    'TypeScript': (
      <svg width={s} height={s} viewBox="0 0 24 24">
        <rect width="24" height="24" rx="3" fill="#3178C6"/>
        <text x="12" y="18" textAnchor="middle" fontSize="12" fontWeight="900"
          fontFamily="Arial Black,Arial,sans-serif" fill="#fff">TS</text>
      </svg>
    ),
    'Python': (
      <svg width={s} height={s} viewBox="0 0 24 24">
        <path fill="#3776AB" d="M12 2C9.5 2 7.8 3 7.8 4.7v1.7h4.2v.5H6.2C4.4 6.9 3 8.6 3 11s1.4 4.1 3.2 4.1H8v-1.8c0-2 1.5-2.9 4-2.9h3.5c1.6 0 3-1.3 3-2.8V4.7C18.5 3 16.8 2 14.5 2H12zm-1.2 1.6c.5 0 .8.3.8.8s-.3.8-.8.8-.8-.3-.8-.8.3-.8.8-.8z"/>
        <path fill="#FFD43B" d="M15.8 12.9H12c-2.5 0-4 .9-4 2.9V17.5h-1.7v1.8C6.3 21 8 22 10.3 22h3.4c2.3 0 5-1 5-2.7v-3.5c0-1.5-.8-2.9-2.9-2.9zm.9 1.6c-.5 0-.8-.3-.8-.8s.3-.8.8-.8.8.3.8.8-.3.8-.8.8z"/>
      </svg>
    ),
    'React': (
      <svg width={s} height={s} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="2.2" fill="#61DAFB"/>
        <g fill="none" stroke="#61DAFB" strokeWidth="1.1">
          <ellipse cx="12" cy="12" rx="10" ry="3.8"/>
          <ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(60 12 12)"/>
          <ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(120 12 12)"/>
        </g>
      </svg>
    ),
    'Next.js': (
      <svg width={s} height={s} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="11" fill="#000"/>
        <path fill="#fff" d="M7 7.5h1.5v6.5l7.2-9.5H17v9H15.5V7L8.3 16.5H7V7.5z"/>
      </svg>
    ),
    'Node.js': (
      <svg width={s} height={s} viewBox="0 0 24 24">
        <path fill="#3C873A" d="M12 1.5L2.5 7v10L12 22.5l9.5-5.5V7L12 1.5z"/>
        <path fill="#fff" d="M9 8.5v4.4l2.7 1.5 2.7-1.5V8.5h-1.5v4l-1.2.7-1.2-.7v-4H9z"/>
      </svg>
    ),
    'Git': (
      <svg width={s} height={s} viewBox="0 0 24 24">
        <path fill="#F05032" d="M21.5 10.6L13.4 2.5c-.7-.7-1.8-.7-2.5 0L8.4 5l2.8 2.8c.6-.3 1.4-.1 1.9.4.5.5.7 1.3.4 1.9l2.7 2.7c.6-.3 1.4-.2 1.9.4a1.5 1.5 0 01-2.1 2.1c-.6-.6-.7-1.4-.4-2.1l-2.5-2.5V18c.2.1.5.3.7.5a1.5 1.5 0 01-2.1 2.1 1.5 1.5 0 010-2.1c.2-.2.5-.4.8-.5v-7.1c-.3-.1-.6-.3-.8-.5-.6-.7-.7-1.7-.4-2.5L8.5 5 2.5 11c-.7.7-.7 1.8 0 2.5l9.1 9.1c.7.7 1.8.7 2.5 0l7.4-7.4c.7-.7.7-1.9 0-2.6z"/>
      </svg>
    ),
    'Docker': (
      <svg width={s} height={s} viewBox="0 0 24 24">
        <path fill="#2496ED" d="M22.3 10.9c-.5-.3-1.6-.5-2.9-.2-.3-1.5-1.2-2.8-2.5-3.7l-.5-.3-.4.5c-.4.7-.7 1.8-.6 2.7-.5-.3-.9-.6-1.3-1H4v4.3c0 2.6 1.1 5 3 6.7l.3.3c1.6 1.1 3.5 1.7 5.5 1.7h8c3.2 0 6.2-1.8 7.7-4.7 1.1-2 1.3-4.8.3-6l-.5.6zM9 14H7v-2h2v2zm3 0h-2v-2h2v2zm3 0h-2v-2h2v2zm3 0h-2v-2h2v2zm-3-3h-2v-2h2v2zm-3 0H9v-2h3v2zm0-3H9V6h3v2z"/>
      </svg>
    ),
    'MongoDB': (
      <svg width={s} height={s} viewBox="0 0 24 24">
        <path fill="#47A248" d="M12 2c-3 0-4.5 4.5-4.5 8 0 1.5.3 3 1 4.1-.3.3-.5.7-.5 1.2 0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2 0-.5-.2-.9-.5-1.2.7-1.1 1-2.6 1-4.1 0-3.5-1.5-8-4.5-8zm.6 19.8V15h-1.2v6.8c-3-.7-5.4-3.7-5.4-7.5V10h12v4.3c0 3.8-2.4 6.8-5.4 7.5z"/>
      </svg>
    ),
    'Firebase': (
      <svg width={s} height={s} viewBox="0 0 24 24">
        <path fill="#FFA000" d="M5.7 21.5l2.6-12.7 4.3 7.7z"/>
        <path fill="#F57F17" d="M16.3 21.5l-5.5-14.9-3.3 5.5z"/>
        <path fill="#FFCA28" d="M22 21.5l-5.2-15.7-3.3 6.3 4.3 7.4z"/>
        <path fill="#F57F17" d="M5.7 21.5l16.3.1-5.3-15.7z" opacity=".25"/>
      </svg>
    ),
    'HTML / CSS': (
      <svg width={s} height={s} viewBox="0 0 24 24">
        <path fill="#E34C26" d="M4.1 3l1.5 16.5L12 21.5l6.4-2L20 3H4.1zm12.6 5H8.3l.2 2.5h7.8l-.6 6-3.7 1-3.7-1-.3-2.5h2.2l.1 1.2 1.7.5 1.7-.5.2-2.2H8l-.5-5H16.9l-.2 1z"/>
      </svg>
    ),
    'Tailwind CSS': (
      <svg width={s} height={s} viewBox="0 0 24 24">
        <path fill="#38BDF8" d="M12 6c-3.2 0-5.3 1.6-6.3 4.8 1.3-1.6 2.7-2.2 4.3-1.8.9.2 1.6 1 2.3 1.7 1.2 1.2 2.6 2.6 5.6 2.6 3.2 0 5.3-1.6 6.3-4.8-1.3 1.6-2.7 2.2-4.3 1.8-.9-.2-1.6-1-2.3-1.7C16.4 7.4 15 6 12 6zM5.7 13.2c-3.2 0-5.3 1.6-6.3 4.8 1.3-1.6 2.7-2.2 4.3-1.8.9.2 1.6 1 2.3 1.7 1.2 1.2 2.6 2.6 5.6 2.6 3.2 0 5.3-1.6 6.3-4.8-1.3 1.6-2.7 2.2-4.3 1.8-.9-.2-1.6-1-2.3-1.7-1.2-1.2-2.6-2.6-5.6-2.6z"/>
      </svg>
    ),
    'Ethers.js': (
      <svg width={s} height={s} viewBox="0 0 24 24">
        <path fill="#627EEA" d="M12 2L5 12.5l7 4 7-4L12 2z" opacity=".8"/>
        <path fill="#627EEA" d="M12 18.5L5 12.5l7 4 7-4-7 6z"/>
        <path fill="#627EEA" d="M12 16.5l7-4L12 2 5 12.5l7 4z" opacity=".5"/>
      </svg>
    ),
    'Solidity': (
      <svg width={s} height={s} viewBox="0 0 24 24">
        <path fill="#555" d="M9.5 3L4 12l5.5 9H14l5.5-9-5.5-9H9.5z" opacity=".3"/>
        <path fill="#aaa" d="M14.5 3L20 12l-5.5 9H10L4.5 12l5.5-9H14.5z" opacity=".6"/>
        <path fill="#ccc" d="M12 7L8 13l4 7 4-7-4-6z"/>
      </svg>
    ),
    'LangChain': (
      <svg width={s} height={s} viewBox="0 0 24 24">
        <rect x="1" y="9" width="8" height="6" rx="3" fill="none" stroke="#1C3D5A" strokeWidth="2"/>
        <rect x="15" y="9" width="8" height="6" rx="3" fill="none" stroke="#1C3D5A" strokeWidth="2"/>
        <line x1="9" y1="12" x2="15" y2="12" stroke="#1C3D5A" strokeWidth="2"/>
      </svg>
    ),
    'SQL': (
      <svg width={s} height={s} viewBox="0 0 24 24">
        <ellipse cx="12" cy="7" rx="8" ry="3" fill="none" stroke="#E48E00" strokeWidth="1.8"/>
        <path fill="none" stroke="#E48E00" strokeWidth="1.8" d="M4 7v4c0 1.7 3.6 3 8 3s8-1.3 8-3V7"/>
        <path fill="none" stroke="#E48E00" strokeWidth="1.8" d="M4 11v4c0 1.7 3.6 3 8 3s8-1.3 8-3v-4"/>
      </svg>
    ),
    'Linux': badge('LNX', '#1a1a1a', '#FFD133'),
    'ANSYS Fluent': badge('ANS', '#FFB81C', '#000'),
    'SolidWorks': badge('SW', '#E00', '#fff'),
    'Java': badge('JV', '#007396'),
    'C / C++': badge('C++', '#00599C'),
    'Express': badge('EX', '#111'),
  };

  const icon = icons[name];
  if (!icon) return null;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0, opacity: 0.88 }}>
      {icon}
    </span>
  );
}
