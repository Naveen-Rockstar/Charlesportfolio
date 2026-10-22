import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import PageHeader from './components/PageHeader';
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

function getInitialRoute() {
  if (typeof window === 'undefined') return '/';

  const path = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
  const hash = window.location.hash.toLowerCase();

  if (path === '/work' || hash === '#/work') return '/work';
  if (path === '/services' || hash === '#/services') return '/services';
  if (path === '/contact' || hash === '#/contact') return '/contact';
  return '/';
}

export default function App() {
  const [currentRoute, setCurrentRoute] = useState(getInitialRoute);
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [contactIntent, setContactIntent] = useState('direct');
  const [selectedProjectType, setSelectedProjectType] = useState(null);
  const [projectIntent, setProjectIntent] = useState('business');
  const mainRef = useRef(null);
  useScrollReveal(mainRef);

  // Sync route on popstate and hashchange
  useEffect(() => {
    const handlePopState = () => {
      const newRoute = getInitialRoute();
      setCurrentRoute(newRoute);
      if (window.location.hash && !window.location.hash.startsWith('#/')) {
        setTimeout(() => {
          const el = document.querySelector(window.location.hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Handle cross-page and intra-page navigation
  const navigateTo = (toRoute, targetHash = null) => {
    let route = toRoute.toLowerCase().replace(/\/$/, '') || '/';
    if (route === '/home') route = '/';

    setCurrentRoute(route);

    const newUrl = targetHash ? `${route}${targetHash}` : route;
    if (window.location.pathname !== route || window.location.hash !== (targetHash || '')) {
      window.history.pushState(null, '', newUrl);
    }

    if (targetHash) {
      setTimeout(() => {
        const el = document.querySelector(targetHash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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

    if (currentRoute === '/') {
      const el = document.querySelector('#start-project');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    navigateTo('/contact', '#start-project');
  };

  const handleOpenContact = (intent = 'direct') => {
    setContactIntent(intent);
    if (currentRoute === '/') {
      const el = document.querySelector('#contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    navigateTo('/contact', '#contact');
  };

  return (
    <div className="portfolio-app-root">
      {/* Desktop Custom Magnetic Cursor */}
      <CustomCursor />

      {/* Primary Fixed Header with 4 Navigation Links */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={navigateTo}
        onOpenContact={handleOpenContact}
      />

      {/* Main Content Landmark */}
      <main id="main-content" ref={mainRef}>
        {/* =========================================================================
            PAGE 1: HOME (Route: /)
            Complete portfolio landing page containing ALL sections
            ========================================================================= */}
        {currentRoute === '/' && (
          <div className="page-view page-home">
            {/* Section 1: Hero — First Screen Impact */}
            <Hero
              onOpenContact={() => handleOpenContact('direct')}
              onNavigate={navigateTo}
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
          </div>
        )}

        {/* =========================================================================
            PAGE 2: SELECTED WORK (Route: /work)
            Dedicated portfolio showcase page
            ========================================================================= */}
        {currentRoute === '/work' && (
          <div className="page-view page-work">
            <PageHeader
              breadcrumb="SELECTED WORK"
              pageNumber="02 / 04"
              title="Selected Work & Demonstrations"
              description="A curated index of production client engineering and bespoke concept demonstrations. Engineered with custom React, modern typography, and responsive craftsmanship."
              onBackToHome={() => navigateTo('/')}
            />

            <div id="work">
              <ProjectGrid onSelectProject={setActiveModalProject} />
            </div>
          </div>
        )}

        {/* =========================================================================
            PAGE 3: SERVICES & PROCESS (Route: /services)
            Dedicated services and methodology page
            ========================================================================= */}
        {currentRoute === '/services' && (
          <div className="page-view page-services">
            <PageHeader
              breadcrumb="SERVICES & PROCESS"
              pageNumber="03 / 04"
              title="Practice Areas & Delivery Methodology"
              description="Custom business websites, high-intent landing pages, performance re-engineering, and dependable white-label development for digital marketing agencies."
              onBackToHome={() => navigateTo('/')}
            />

            <div id="services">
              <Services onSelectServiceForContact={(serviceId) => handleStartProject(serviceId)} />
            </div>

            <div id="process">
              <Process />
            </div>

            <div id="collaboration">
              <Collaboration onOpenContact={() => handleStartProject('agency')} />
            </div>
          </div>
        )}

        {/* =========================================================================
            PAGE 4: CONTACT & START A PROJECT (Route: /contact)
            Dedicated enquiry, estimator & contact page
            ========================================================================= */}
        {currentRoute === '/contact' && (
          <div className="page-view page-contact">
            <PageHeader
              breadcrumb="CONTACT & START A PROJECT"
              pageNumber="04 / 04"
              title="Start a Project or Partner Up"
              description="Direct communication channels, interactive scope blueprint, and prompt developer turnaround. Open to business builds and marketing agency subcontracting worldwide."
              onBackToHome={() => navigateTo('/')}
            />

            <div id="start-project">
              <StartProject
                preselectedType={selectedProjectType}
                defaultIntent={projectIntent}
              />
            </div>

            <div id="contact">
              <Contact defaultIntent={contactIntent} />
            </div>
          </div>
        )}
      </main>

      {/* Primary Master Footer */}
      <Footer onNavigate={navigateTo} />

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
