import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, ArrowDown, ExternalLink, Code2, Sparkles } from 'lucide-react';
import { featuredProject } from '../data/projects';
import { useMagnetic } from '../hooks/useMagnetic';

export default function Hero({ onOpenContact, onSelectProject }) {
  const magneticPrimaryRef = useMagnetic(0.25);
  const magneticSecondaryRef = useMagnetic(0.2);
  const badgeRef = useRef(null);

  const handleScrollToWork = (e) => {
    e.preventDefault();
    const el = document.querySelector('#work');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-editorial-section" aria-label="Charles Naveen — Portfolio Hero">
      <div className="container">
        {/* Top Metadata Bar */}
        <div className="hero-meta-bar">
          <div className="hero-meta-left">
            <span className="hero-meta-name">CHARLES NAVEEN</span>
            <span className="meta-sep" aria-hidden="true">/</span>
            <span className="hero-meta-role">Creative Web Developer</span>
            <span className="meta-sep" aria-hidden="true">/</span>
            <span className="hero-meta-loc">Tamil Nadu, India</span>
          </div>

          <div className="hero-availability-badge" role="status">
            <span className="pulse-dot" aria-hidden="true"></span>
            <span>AVAILABLE FOR Q1/Q2 PROJECTS</span>
          </div>
        </div>

        {/* Oversized Headline Stage with Circular DEV Badge & Editorial Visual */}
        <div className="hero-monument-stage">
          <div className="hero-typography-block">
            <div className="hero-line-row">
              <h1 className="hero-giant-heading">
                CHARLES
              </h1>
              {/* Circular Interactive DEV Badge (Demo.mp4 Style) */}
              <div ref={badgeRef} className="circular-dev-badge" aria-hidden="true">
                <svg className="badge-rotating-text" viewBox="0 0 100 100">
                  <path
                    id="circlePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text>
                    <textPath href="#circlePath" startOffset="0%">
                      ★ CREATIVE DEVELOPER ★ WEB CRAFT
                    </textPath>
                  </text>
                </svg>
                <div className="badge-center-core">
                  <span>DEV</span>
                </div>
              </div>
            </div>

            <div className="hero-line-row second-row">
              <h1 className="hero-giant-heading">
                NAVEEN
              </h1>
              <span className="hero-heading-tagline">
                [WEB ARCHITECT &amp; DIGITAL CRAFTSMAN]
              </span>
            </div>
          </div>

          {/* Right Visual Card Showcase (Editorial Frame) */}
          <div className="hero-visual-card-wrap">
            <div className="hero-visual-card">
              <div className="visual-card-image-box">
                <img
                  src={featuredProject.image}
                  alt={featuredProject.imageAlt}
                  className="visual-card-img"
                  loading="eager"
                  fetchPriority="high"
                  width="720"
                  height="450"
                />
                <div className="visual-card-overlay">
                  <div className="visual-card-pill">
                    <span className="visual-pill-dot" aria-hidden="true"></span>
                    <span>LATEST PRODUCTION BUILD</span>
                  </div>
                  <span className="visual-project-title">{featuredProject.title}</span>
                </div>
              </div>

              <div className="visual-card-caption">
                <div className="caption-text">
                  <span className="caption-client">Bexley LifeScience · Live Build</span>
                  <span className="caption-scope">Custom React · Corporate Distribution</span>
                </div>
                <a
                  href={featuredProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="visual-link-icon"
                  aria-label="Visit Bexley LifeScience live website"
                >
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Narrative & Action Cluster */}
        <div className="hero-lower-grid">
          <div className="hero-narrative-box">
            <p className="hero-lead-text">
              I build high-performance business websites, digital experiences, and AI-powered solutions.
              Combining sharp visual art direction, responsive React engineering, and dependable execution
              for ambitious businesses and agency partners.
            </p>
          </div>

          <div className="hero-cta-cluster">
            <button
              ref={magneticPrimaryRef}
              type="button"
              className="btn-hero-primary"
              onClick={() => onOpenContact && onOpenContact('direct')}
            >
              <span>DISCUSS A PROJECT</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </button>

            <a
              ref={magneticSecondaryRef}
              href="#work"
              className="btn-hero-secondary"
              onClick={handleScrollToWork}
            >
              <span>EXPLORE SELECTED WORK</span>
              <ArrowDown size={15} aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* At-a-glance Strip */}
        <div className="hero-fact-strip" aria-label="At a glance details">
          <div className="fact-item">
            <span className="fact-number">01</span>
            <div className="fact-info">
              <span className="fact-label">CORE STACK</span>
              <span className="fact-value">React · Vite · Modern CSS</span>
            </div>
          </div>

          <div className="fact-item">
            <span className="fact-number">02</span>
            <div className="fact-info">
              <span className="fact-label">PRIMARY FOCUS</span>
              <span className="fact-value">Business Sites &amp; Agency Partnerships</span>
            </div>
          </div>

          <div className="fact-item">
            <span className="fact-number">03</span>
            <div className="fact-info">
              <span className="fact-label">LOCATION</span>
              <span className="fact-value">Tamil Nadu, India · Global Remote</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
