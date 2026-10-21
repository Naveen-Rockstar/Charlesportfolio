import React, { useState, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Statement from './components/Statement';
import Services from './components/Services';
import ImpactComparison from './components/ImpactComparison';
import ProjectGrid from './components/ProjectGrid';
import Collaboration from './components/Collaboration';
import Process from './components/Process';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import CustomCursor from './components/CustomCursor';
import { useScrollReveal } from './hooks/useScrollReveal';

export default function App() {
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [contactIntent, setContactIntent] = useState('direct');
  const mainRef = useRef(null);
  useScrollReveal(mainRef);

  const handleOpenContact = (intent = 'direct') => {
    setContactIntent(intent);
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="portfolio-app-root">
      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* Primary Sticky Header & Fullscreen Menu */}
      <Navbar onOpenContact={handleOpenContact} />

      {/* Main Content Landmark */}
      <main id="main-content" ref={mainRef}>
        {/* Section 1: Hero — First Screen Impact with Circular DEV Badge & Editorial Frame */}
        <Hero
          onOpenContact={handleOpenContact}
          onSelectProject={setActiveModalProject}
        />

        {/* Section 2: Kinetic Studio Marquee Ribbon */}
        <Marquee />

        {/* Section 3: High-Contrast Ethos Statement ("I BUILD FRONT / I TEST EVERYTHING") */}
        <Statement onOpenContact={handleOpenContact} />

        {/* Section 4: Capabilities ("WHAT I WORK WITH" — Interactive Highlight Rows) */}
        <Services onSelectServiceForContact={() => handleOpenContact('direct')} />

        {/* Section 5: Measurable Engineering ("BEFORE ⨂ AFTER" — CWV & Speed Comparison) */}
        <div id="impact">
          <ImpactComparison />
        </div>

        {/* Section 6: Color-Blocked Editorial Showcase ("SELECTED WORK" — Real Projects) */}
        <ProjectGrid onSelectProject={setActiveModalProject} />

        {/* Section 7: Four-Stage Working Process ("HOW THE WORK GOES" — Numbered Badges) */}
        <Process />

        {/* Section 8: Digital Marketing Agency Collaboration */}
        <Collaboration onOpenContact={() => handleOpenContact('agency')} />

        {/* Section 9: About Charles Naveen (Values, Degree & Guiding Pillars) */}
        <About />

        {/* Section 10: Closing Screen ("WRITE ME →" / Let's Build Something Meaningful) */}
        <Contact defaultIntent={contactIntent} />
      </main>

      {/* Primary Master Footer */}
      <Footer />

      {/* Interactive Project Case Spec Modal */}
      {activeModalProject && (
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      )}
    </div>
  );
}
