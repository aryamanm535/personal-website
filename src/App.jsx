import StarField from './components/StarField.jsx';
import Navbar    from './components/Navbar.jsx';
import Hero      from './components/Hero.jsx';
import Skills    from './components/Skills.jsx';
import Experience from './components/Experience.jsx';
import Projects  from './components/Projects.jsx';
import Contact   from './components/Contact.jsx';
import Cursor    from './components/Cursor.jsx';

export default function App() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Cursor />

      {/* Fixed background layers */}
      <div className="bg-noise" />
      <StarField />

      {/* Nebula — absolute so it scrolls away naturally past the hero */}
      <div
        style={{
          position: 'absolute', top: 0, left: 0,
          width: '100%', height: '210vh',
          pointerEvents: 'none', zIndex: 0, overflow: 'hidden',
        }}
        className="nebula-wrap"
      >
        <div style={{ position:'absolute', borderRadius:'50%', width:'85vw', height:'80vh', left:'-12vw', top:'2vh',  background:'rgba(147,51,234,0.18)', filter:'blur(90px)' }} />
        <div style={{ position:'absolute', borderRadius:'50%', width:'65vw', height:'70vh', right:'-8vw', top:'18vh', background:'rgba(79,70,229,0.14)',  filter:'blur(100px)' }} />
        <div style={{ position:'absolute', borderRadius:'50%', width:'45vw', height:'50vh', left:'28vw',  top:'38vh', background:'rgba(192,132,252,0.10)', filter:'blur(80px)' }} />
        <div style={{ position:'absolute', borderRadius:'50%', width:'55vw', height:'55vh', left:'-5vw',  top:'90vh', background:'rgba(124,58,237,0.08)',  filter:'blur(100px)' }} />
        <div style={{ position:'absolute', borderRadius:'50%', width:'40vw', height:'40vh', right:'5vw',  top:'130vh',background:'rgba(79,70,229,0.05)',   filter:'blur(90px)' }} />
      </div>

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
