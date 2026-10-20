import React from 'react';
import { ArrowUpRight, ArrowDown, ExternalLink } from 'lucide-react';
import { featuredProject } from '../data/projects';
import { useMagnetic } from '../hooks/useMagnetic';

export default function Hero({ onOpenContact, onSelectProject }) {
  const magneticPrimaryRef = useMagnetic(0.2);
  const magneticSecondaryRef = useMagnetic(0.2);

  const handleScrollToWork = (e) => {
    e.preventDefault();
    const el = document.querySelector('#work');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToAgency = (e) => {
    e.preventDefault();
    const el = document.querySelector('#collaboration');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section" aria-label="Charles Naveen Introduction">
      <div className="container">
        {/* Top Metadata Bar */}
        <div className="hero-meta-bar">
          <div className="hero-meta-left">
            <span className="meta-identity">CHARLES NAVEEN</span>
            <span style={{ color: 'var(--border-medium)' }}>/</span>
            <span className="meta-role">FREELANCE WEB DEVELOPER</span>
            <span style={{ color: 'var(--border-medium)' }}>/</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
              TAMIL NADU, INDIA
            </span>
          </div>

          <div className="hero-availability-signal" role="status">
            <span className="ping-dot" aria-hidden="true"></span>
            <span>AVAILABLE FOR SELECT PROJECTS & AGENCIES</span>
          </div>
        </div>

        {/* Monumental Headline Composition */}
        <div className="hero-headline-wrapper">
          <h1 className="hero-monument-headline">
            I turn business ideas into{' '}
            <span className="highlight-serif">digital experiences</span>.
          </h1>
        </div>

        {/* Narrative & Strategic Pillars Grid */}
        <div className="hero-narrative-grid">
          <div>
            <p className="hero-narrative-copy">
              I design and engineer modern, performance-focused websites that help ambitious
              brands, founders, and digital marketing agencies make an undeniable impression online.
              Thoughtful design, responsive development, and reliable delivery.
            </p>

            <div className="hero-actions-cluster">
              <button
                ref={magneticPrimaryRef}
                type="button"
                className="btn-magnetic-primary"
                onClick={() => onOpenContact && onOpenContact('direct')}
              >
                <span>START A PROJECT</span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </button>

              <a
                ref={magneticSecondaryRef}
                href="#work"
                className="btn-magnetic-secondary"
                onClick={handleScrollToWork}
              >
                <span>EXPLORE SELECTED WORK</span>
                <ArrowDown size={15} aria-hidden="true" />
              </a>

              <a
                href="#collaboration"
                className="kinetic-link"
                onClick={handleScrollToAgency}
                style={{ marginLeft: '0.5rem' }}
              >
                <span>FOR AGENCIES ↗</span>
              </a>
            </div>
          </div>

          {/* Quick Studio Pillars Card */}
          <aside className="hero-pillars-card" aria-label="Development Focus">
            <div className="pillars-card-title">ENGINEERING CAPABILITIES</div>
            <ul className="pillars-specs-list">
              <li className="pillar-spec-item">
                <span className="pillar-spec-label">CLIENTELE</span>
                <span className="pillar-spec-value">Direct Businesses & Digital Agencies</span>
              </li>
              <li className="pillar-spec-item">
                <span className="pillar-spec-label">CORE STACK</span>
                <span className="pillar-spec-value">React, Modern CSS, Semantic HTML5</span>
              </li>
              <li className="pillar-spec-item">
                <span className="pillar-spec-label">CRAFT VALUES</span>
                <span className="pillar-spec-value">Speed, Clean Typography, Zero Bloat</span>
              </li>
              <li className="pillar-spec-item" style={{ borderBottom: 'none', paddingBottom: 0 }}>
                <span className="pillar-spec-label">LOCATION</span>
                <span className="pillar-spec-value">Tamil Nadu, India · Global Remote</span>
              </li>
            </ul>
          </aside>
        </div>

        {/* Hero Cinematic Showcase Stage: Live Build Preview */}
        <div className="hero-showcase-stage" aria-label="Featured Production Website Preview">
          <div className="stage-top-bar">
            <div className="stage-window-controls" aria-hidden="true">
              <span className="win-dot"></span>
              <span className="win-dot"></span>
              <span className="win-dot"></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', overflow: 'hidden' }}>
              <span className="project-badge status-completed">
                <span className="badge-dot" aria-hidden="true"></span>
                <span>VERIFIED BUILD</span>
              </span>
              <span className="desktop-only-meta" style={{ color: 'var(--text-muted)' }}>https://bexleylifescience.com</span>
            </div>
            <span style={{ color: 'var(--accent-primary)', fontWeight: 600, flexShrink: 0 }}>01 / 05</span>
          </div>

          <a
            href={featuredProject.url}
            target="_blank"
            rel="noopener noreferrer"
            className="stage-image-link"
            aria-label={`Open live production site for ${featuredProject.title}`}
          >
            <img
              src={featuredProject.image}
              alt={featuredProject.imageAlt}
              className="stage-preview-img"
              loading="eager"
              fetchPriority="high"
              width="1440"
              height="900"
            />

            <div className="stage-floating-overlay">
              <div className="stage-case-meta">
                <span className="stage-case-category">{featuredProject.category}</span>
                <span className="stage-case-title">{featuredProject.title}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span className="kinetic-link">
                  <span>VISIT LIVE WEBSITE</span>
                  <ExternalLink size={14} aria-hidden="true" />
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
