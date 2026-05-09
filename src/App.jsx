import StarField from './components/StarField.jsx';
import Navbar    from './components/Navbar.jsx';
import Hero      from './components/Hero.jsx';
import Skills    from './components/Skills.jsx';
import Experience from './components/Experience.jsx';
import Projects  from './components/Projects.jsx';
import Contact   from './components/Contact.jsx';

export default function App() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>

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
        {/* Purple — hero left glow */}
        <div style={{ position:'absolute', borderRadius:'50%', width:'80vw', height:'75vh', left:'-10vw', top:'2vh',
          background:'rgba(139,50,220,0.17)', filter:'blur(90px)',
          animation:'nebulaDrift1 26s ease-in-out infinite' }} />
        {/* Indigo-blue — hero right */}
        <div style={{ position:'absolute', borderRadius:'50%', width:'60vw', height:'65vh', right:'-6vw', top:'12vh',
          background:'rgba(59,100,230,0.13)', filter:'blur(100px)',
          animation:'nebulaDrift2 32s ease-in-out infinite' }} />
        {/* Teal-cyan — upper center */}
        <div style={{ position:'absolute', borderRadius:'50%', width:'40vw', height:'42vh', left:'30vw', top:'20vh',
          background:'rgba(14,130,150,0.10)', filter:'blur(80px)',
          animation:'nebulaDrift3 22s ease-in-out infinite' }} />
        {/* Deep green — mid left */}
        <div style={{ position:'absolute', borderRadius:'50%', width:'38vw', height:'38vh', left:'-4vw', top:'55vh',
          background:'rgba(6,120,90,0.09)', filter:'blur(95px)',
          animation:'nebulaDrift4 28s ease-in-out infinite 4s' }} />
        {/* Blue — mid right */}
        <div style={{ position:'absolute', borderRadius:'50%', width:'45vw', height:'45vh', right:'2vw', top:'70vh',
          background:'rgba(37,90,210,0.08)', filter:'blur(100px)',
          animation:'nebulaDrift1 35s ease-in-out infinite 8s' }} />
        {/* Purple fade — lower */}
        <div style={{ position:'absolute', borderRadius:'50%', width:'55vw', height:'50vh', left:'-5vw', top:'100vh',
          background:'rgba(120,50,220,0.07)', filter:'blur(110px)',
          animation:'nebulaDrift2 30s ease-in-out infinite 6s' }} />
        {/* Teal fade — lower right */}
        <div style={{ position:'absolute', borderRadius:'50%', width:'38vw', height:'36vh', right:'8vw', top:'145vh',
          background:'rgba(10,110,100,0.06)', filter:'blur(90px)',
          animation:'nebulaDrift3 40s ease-in-out infinite 12s' }} />
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
