import StarField from './components/StarField.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Skills from './components/Skills.jsx';
import Experience from './components/Experience.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';

export default function App() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Background layers */}
      <div className="bg-noise" />
      <StarField />

      {/* Ambient page-wide glow — fixed so it never cuts off */}
      <div
        className="fixed pointer-events-none"
        style={{
          inset: 0,
          background: `
            radial-gradient(ellipse 70% 55% at 15% 25%, rgba(147,51,234,0.22) 0%, transparent 70%),
            radial-gradient(ellipse 55% 70% at 85% 75%, rgba(79,70,229,0.16) 0%, transparent 70%),
            radial-gradient(ellipse 45% 40% at 60% 50%, rgba(168,85,247,0.11) 0%, transparent 65%)
          `,
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <Navbar />
        <main>
          <Hero />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </main>
      </div>
    </div>
  );
}
