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

      {/* Butterfly Nebula */}
      <div
        style={{
          position: 'absolute', top: 0, left: 0,
          width: '100%', height: '210vh',
          pointerEvents: 'none', zIndex: 0, overflow: 'hidden',
        }}
        className="nebula-wrap"
      >
        {/* ── Outer diffuse haze ── */}
        <div style={{ position:'absolute', borderRadius:'50%', width:'150vw', height:'85vh', left:'-25vw', top:'-5vh',
          background:'rgba(35,10,110,0.12)', filter:'blur(130px)',
          animation:'nebulaDrift1 48s ease-in-out infinite' }} />

        {/* ── LEFT WING — indigo-blue main lobe ── */}
        <div style={{ position:'absolute', borderRadius:'50%', width:'72vw', height:'28vh', left:'-18vw', top:'22vh',
          background:'rgba(60,55,220,0.22)', filter:'blur(52px)',
          transform:'rotate(-36deg)', transformOrigin:'right center',
          animation:'nebulaWing1 21s ease-in-out infinite' }} />
        {/* left wing inner bright (violet) */}
        <div style={{ position:'absolute', borderRadius:'50%', width:'42vw', height:'17vh', left:'-2vw', top:'20vh',
          background:'rgba(130,70,255,0.26)', filter:'blur(38px)',
          transform:'rotate(-36deg)', transformOrigin:'right center',
          animation:'nebulaWing1 17s ease-in-out infinite 2s' }} />
        {/* left wingtip — cyan */}
        <div style={{ position:'absolute', borderRadius:'50%', width:'26vw', height:'16vh', left:'-12vw', top:'5vh',
          background:'rgba(30,170,230,0.20)', filter:'blur(32px)',
          animation:'nebulaDrift3 19s ease-in-out infinite 1s' }} />

        {/* ── RIGHT WING — teal-blue main lobe ── */}
        <div style={{ position:'absolute', borderRadius:'50%', width:'72vw', height:'28vh', right:'-18vw', top:'22vh',
          background:'rgba(18,100,200,0.20)', filter:'blur(52px)',
          transform:'rotate(36deg)', transformOrigin:'left center',
          animation:'nebulaWing2 24s ease-in-out infinite' }} />
        {/* right wing inner bright (cyan-green) */}
        <div style={{ position:'absolute', borderRadius:'50%', width:'42vw', height:'17vh', right:'-2vw', top:'20vh',
          background:'rgba(10,190,160,0.20)', filter:'blur(38px)',
          transform:'rotate(36deg)', transformOrigin:'left center',
          animation:'nebulaWing2 19s ease-in-out infinite 3s' }} />
        {/* right wingtip — emerald */}
        <div style={{ position:'absolute', borderRadius:'50%', width:'26vw', height:'16vh', right:'-12vw', top:'5vh',
          background:'rgba(10,170,100,0.17)', filter:'blur(32px)',
          animation:'nebulaDrift2 22s ease-in-out infinite 2s' }} />

        {/* ── CENTER CORE — pulsing bright purple-white ── */}
        <div style={{ position:'absolute', borderRadius:'50%', width:'32vw', height:'26vh', left:'34vw', top:'22vh',
          background:'rgba(210,110,255,0.32)', filter:'blur(42px)',
          animation:'nebulaCore 11s ease-in-out infinite' }} />
        <div style={{ position:'absolute', borderRadius:'50%', width:'16vw', height:'13vh', left:'42vw', top:'26vh',
          background:'rgba(255,210,255,0.22)', filter:'blur(25px)',
          animation:'nebulaCore 7s ease-in-out infinite 1.5s' }} />

        {/* ── MAGENTA accent — left of core ── */}
        <div style={{ position:'absolute', borderRadius:'50%', width:'22vw', height:'16vh', left:'18vw', top:'30vh',
          background:'rgba(210,50,160,0.12)', filter:'blur(55px)',
          animation:'nebulaDrift4 26s ease-in-out infinite 5s' }} />

        {/* ── Lower lobes — fade into page ── */}
        <div style={{ position:'absolute', borderRadius:'50%', width:'50vw', height:'28vh', left:'-6vw', top:'70vh',
          background:'rgba(10,110,70,0.09)', filter:'blur(85px)',
          animation:'nebulaDrift2 36s ease-in-out infinite 8s' }} />
        <div style={{ position:'absolute', borderRadius:'50%', width:'44vw', height:'24vh', right:'0vw', top:'78vh',
          background:'rgba(25,65,200,0.08)', filter:'blur(80px)',
          animation:'nebulaDrift3 31s ease-in-out infinite 10s' }} />
        <div style={{ position:'absolute', borderRadius:'50%', width:'60vw', height:'45vh', left:'20vw', top:'100vh',
          background:'rgba(70,25,170,0.06)', filter:'blur(110px)',
          animation:'nebulaDrift1 42s ease-in-out infinite 4s' }} />
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
