import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Statement from './components/Statement';
import Services from './components/Services';
import ImpactComparison from './components/ImpactComparison';
import ProjectGrid from './components/ProjectGrid';
import Process from './components/Process';
import StartProject from './components/StartProject';
import Collaboration from './components/Collaboration';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import CustomCursor from './components/CustomCursor';
import { useScrollReveal } from './hooks/useScrollReveal';

export default function App() {
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [contactIntent, setContactIntent] = useState('direct');
  const [selectedProjectType, setSelectedProjectType] = useState(null);
  const [projectIntent, setProjectIntent] = useState('business');
  const mainRef = useRef(null);
  useScrollReveal(mainRef);

  useEffect(() => {
    if (window.location.hash) {
      setTimeout(() => {
        const el = document.querySelector(window.location.hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  const handleStartProject = (typeOrIntent = 'business') => {
    if (typeOrIntent === 'agency') {
      setProjectIntent('agency');
      setSelectedProjectType('agency-whitelabel');
    } else if (typeOrIntent && typeOrIntent !== 'business' && typeOrIntent !== 'direct') {
      setSelectedProjectType(typeOrIntent);
      setProjectIntent('business');
    } else {
      setProjectIntent('business');
    }
    const startSection = document.querySelector('#start-project');
    if (startSection) {
      startSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
        {/* Section 1: Hero — First Screen Impact */}
        <Hero
          onOpenContact={() => handleStartProject('business')}
          onSelectProject={setActiveModalProject}
        />

        {/* Section 2: Kinetic Studio Marquee Ribbon */}
        <Marquee />

        {/* Section 3: High-Contrast Ethos Statement */}
        <Statement onOpenContact={() => handleStartProject('business')} />

        {/* Section 4: Capabilities & Core Offerings */}
        <Services onSelectServiceForContact={(serviceId) => handleStartProject(serviceId)} />

        {/* Section 5: Engineering Standards & Production Benchmarks */}
        <div id="impact">
          <ImpactComparison />
        </div>

        {/* Section 6: Editorial Showcase (Selected Work) */}
        <ProjectGrid onSelectProject={setActiveModalProject} />

        {/* Section 7: Five-Stage Working Process */}
        <Process />

        {/* Section 8: Start a Project (Project Enquiry Experience) */}
        <StartProject
          preselectedType={selectedProjectType}
          defaultIntent={projectIntent}
        />

        {/* Section 9: Digital Marketing Agency Collaboration */}
        <Collaboration onOpenContact={() => handleStartProject('agency')} />

        {/* Section 10: About Charles Naveen */}
        <About />

        {/* Section 11: Closing Screen / Form */}
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
