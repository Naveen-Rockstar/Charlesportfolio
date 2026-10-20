import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import FeaturedProject from './components/FeaturedProject';
import ProjectGrid from './components/ProjectGrid';
import Services from './components/Services';
import Collaboration from './components/Collaboration';
import Process from './components/Process';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';

export default function App() {
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [contactIntent, setContactIntent] = useState('direct');

  const handleOpenContact = (intent = 'direct') => {
    setContactIntent(intent);
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="portfolio-app-root">
      {/* Primary Sticky Header */}
      <Navbar onOpenContact={handleOpenContact} />

      {/* Main Content Landmark */}
      <main id="main-content">
        {/* Section 1: Hero — First Screen Impact */}
        <Hero
          onOpenContact={handleOpenContact}
          onSelectProject={setActiveModalProject}
        />

        {/* Section 2: Kinetic Studio Marquee */}
        <Marquee />

        {/* Section 3: Primary Featured Production Client Build (Bexley LifeScience) */}
        <FeaturedProject onSelectProject={setActiveModalProject} />

        {/* Section 4: Selected Demonstration Series (D-wings, Evara, LARA, Jeeva) */}
        <ProjectGrid onSelectProject={setActiveModalProject} />

        {/* Section 5: Services & Practice Areas */}
        <Services onSelectServiceForContact={() => handleOpenContact('direct')} />

        {/* Section 6: Digital Marketing Agency Collaboration */}
        <Collaboration onOpenContact={() => handleOpenContact('agency')} />

        {/* Section 7: Four-Stage Working Process */}
        <Process />

        {/* Section 8: About Charles Naveen */}
        <About />

        {/* Section 9: High-Contrast Closing Contact Screen */}
        <Contact defaultIntent={contactIntent} />
      </main>

      {/* Primary Footer */}
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
