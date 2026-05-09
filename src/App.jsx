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

      {/* Nebula */}
      <div
        style={{
          position: 'absolute', top: 0, left: 0,
          width: '100%', height: '210vh',
          pointerEvents: 'none', zIndex: 0, overflow: 'hidden',
        }}
        className="nebula-wrap"
      >
        {/* Large purple base — left */}
        <div style={{ position:'absolute', borderRadius:'50%', width:'80vw', height:'72vh', left:'-12vw', top:'4vh',
          background:'rgba(100,30,200,0.16)', filter:'blur(100px)',
          animation:'nebulaDrift1 12s ease-in-out infinite' }} />
        {/* Large indigo-blue — right */}
        <div style={{ position:'absolute', borderRadius:'50%', width:'70vw', height:'65vh', right:'-8vw', top:'8vh',
          background:'rgba(30,70,210,0.14)', filter:'blur(110px)',
          animation:'nebulaDrift2 14s ease-in-out infinite 1s' }} />
        {/* Teal-cyan — center left */}
        <div style={{ position:'absolute', borderRadius:'50%', width:'48vw', height:'48vh', left:'4vw', top:'14vh',
          background:'rgba(15,160,200,0.18)', filter:'blur(75px)',
          animation:'nebulaDrift3 10s ease-in-out infinite 0.5s' }} />
        {/* Emerald green — center right */}
        <div style={{ position:'absolute', borderRadius:'50%', width:'42vw', height:'42vh', right:'8vw', top:'18vh',
          background:'rgba(10,155,100,0.15)', filter:'blur(80px)',
          animation:'nebulaDrift4 11s ease-in-out infinite 2s' }} />
        {/* Bright violet — center */}
        <div style={{ position:'absolute', borderRadius:'50%', width:'38vw', height:'36vh', left:'31vw', top:'16vh',
          background:'rgba(170,60,240,0.20)', filter:'blur(65px)',
          animation:'nebulaDrift2 9s ease-in-out infinite 0.8s' }} />
        {/* Cyan accent — upper left */}
        <div style={{ position:'absolute', borderRadius:'50%', width:'28vw', height:'28vh', left:'-4vw', top:'2vh',
          background:'rgba(20,190,220,0.16)', filter:'blur(55px)',
          animation:'nebulaDrift1 8s ease-in-out infinite 1.5s' }} />
        {/* Magenta accent — upper right */}
        <div style={{ position:'absolute', borderRadius:'50%', width:'26vw', height:'24vh', right:'2vw', top:'5vh',
          background:'rgba(200,40,150,0.12)', filter:'blur(60px)',
          animation:'nebulaDrift3 9s ease-in-out infinite 3s' }} />
        {/* Deep blue-green — lower left */}
        <div style={{ position:'absolute', borderRadius:'50%', width:'55vw', height:'32vh', left:'-8vw', top:'68vh',
          background:'rgba(10,110,75,0.10)', filter:'blur(90px)',
          animation:'nebulaDrift4 13s ease-in-out infinite 4s' }} />
        {/* Blue — lower right */}
        <div style={{ position:'absolute', borderRadius:'50%', width:'48vw', height:'28vh', right:'-4vw', top:'75vh',
          background:'rgba(25,60,200,0.09)', filter:'blur(85px)',
          animation:'nebulaDrift1 11s ease-in-out infinite 6s' }} />
        {/* Purple fade — lower center */}
        <div style={{ position:'absolute', borderRadius:'50%', width:'65vw', height:'50vh', left:'18vw', top:'100vh',
          background:'rgba(80,20,170,0.07)', filter:'blur(115px)',
          animation:'nebulaDrift2 15s ease-in-out infinite 3s' }} />
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
