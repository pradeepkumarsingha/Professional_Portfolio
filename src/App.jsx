import React, { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loader from './components/Loader';
import ParticleField from './components/ParticleField';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);

  const handleLoaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <Loader onComplete={handleLoaderComplete} />}
      </AnimatePresence>

      <div className={`bg-[#0f172a] text-slate-200 min-h-screen font-sans overflow-x-hidden selection:bg-purple-500/30 selection:text-white ${loading ? 'overflow-hidden h-screen' : ''}`}>
        <ParticleField />
        <Navbar />
        <main className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Achievements />
          <Gallery />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
