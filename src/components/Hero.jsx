import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, ArrowDown, ExternalLink, Download } from 'lucide-react';
import { featuredProject } from '../data/projects';
import { useMagnetic } from '../hooks/useMagnetic';
import { gsap, prefersReducedMotion } from '../utils/motion';

export default function Hero({ onOpenContact, onSelectProject }) {
  const rootRef = useRef(null);
  const magneticPrimaryRef = useMagnetic(0.25);
  const magneticSecondaryRef = useMagnetic(0.2);
  const magneticPdfRef = useMagnetic(0.2);
  const badgeRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Meta bar entrance
      tl.from('.hero-meta-bar', {
        y: -20,
        opacity: 0,
        duration: 0.6
      });

      // Split monumental title reveal
      tl.from('.hero-giant-heading', {
        y: 60,
        opacity: 0,
        stagger: 0.12,
        duration: 0.85
      }, '-=0.3');

      // DEV Circular badge pop in
      tl.from('.circular-dev-badge', {
        scale: 0,
        rotation: -180,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.8)'
      }, '-=0.6');

      // Tagline reveal
      tl.from('.hero-heading-tagline', {
        x: -25,
        opacity: 0,
        duration: 0.5
      }, '-=0.5');

      // Right visual card reveal
      tl.from('.hero-visual-card', {
        y: 40,
        scale: 0.94,
        opacity: 0,
        duration: 0.85,
        ease: 'power2.out'
      }, '-=0.6');

      // Narrative text & CTAs
      tl.fromTo('.hero-lead-text', 
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        '-=0.5'
      );

      tl.fromTo('.hero-cta-cluster > *',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6 },
        '-=0.4'
      );

      // Fact items stagger
      tl.fromTo('.fact-item',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.5 },
        '-=0.3'
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToWork = (e) => {
    e.preventDefault();
    const el = document.querySelector('#work');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={rootRef} className="hero-editorial-section" aria-label="Charles Naveen — Portfolio Hero">
      <div className="container">
        {/* Top Metadata Bar */}
        <div className="hero-meta-bar">
          <div className="hero-meta-left">
            <span className="hero-meta-name">CHARLES NAVEEN</span>
            <span className="meta-sep" aria-hidden="true">/</span>
            <span className="hero-meta-role">Freelance Web Developer</span>
            <span className="meta-sep" aria-hidden="true">/</span>
            <span className="hero-meta-loc">Tamil Nadu, India</span>
          </div>

          <div className="hero-availability-badge" role="status">
            <span className="pulse-dot" aria-hidden="true"></span>
            <span>AVAILABLE FOR CLIENT BUILDS &amp; AGENCY PARTNERSHIPS</span>
          </div>
        </div>

        {/* Oversized Headline Stage with Circular DEV Badge & Editorial Visual */}
        <div className="hero-monument-stage">
          <div className="hero-typography-block">
            <div className="hero-line-row">
              <h1 className="hero-giant-heading">
                CHARLES
              </h1>
              {/* Circular Interactive DEV Badge */}
              <div ref={badgeRef} className="circular-dev-badge" aria-hidden="true">
                <svg className="badge-rotating-text" viewBox="0 0 100 100">
                  <path
                    id="circlePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text>
                    <textPath href="#circlePath" startOffset="0%">
                      ★ FREELANCE WEB DEV ★ CLEAN REACT
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
                [FREELANCE WEB DEVELOPER]
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
                    <span>CLIENT PROJECT · PRODUCTION BUILD</span>
                  </div>
                  <span className="visual-project-title">{featuredProject.title}</span>
                </div>
              </div>

              <div className="visual-card-caption">
                <div className="caption-text">
                  <span className="caption-client">Bexley LifeScience · Client Build</span>
                  <span className="caption-scope">Custom React · Corporate Distribution</span>
                </div>
                <a
                  href={featuredProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="visual-link-icon"
                  aria-label="Visit Bexley LifeScience live client website"
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
            <h2 className="hero-value-headline" style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)',
              color: 'var(--text-primary)',
              lineHeight: 1.25,
              marginBottom: '1rem',
              fontWeight: 800,
              letterSpacing: '-0.02em'
            }}>
              Websites built to turn business attention into enquiries.
            </h2>
            <p className="hero-lead-text">
              I design and develop modern, responsive websites for businesses and partner with marketing agencies
              to deliver polished digital experiences, reliable functionality, and performance-focused implementations.
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
              <span>EXPLORE WORK</span>
              <ArrowDown size={15} aria-hidden="true" />
            </a>

            <a
              ref={magneticPdfRef}
              href="/charles-naveen-portfolio.pdf"
              download="Charles-Naveen-Portfolio.pdf"
              className="btn-hero-secondary btn-hero-pdf"
              title="Download compact portfolio PDF for agency review"
            >
              <Download size={14} aria-hidden="true" />
              <span>PORTFOLIO PDF</span>
            </a>
          </div>
        </div>

        {/* At-a-glance Strip */}
        <div className="hero-fact-strip" aria-label="At a glance details">
          <div className="fact-item">
            <span className="fact-number">01</span>
            <div className="fact-info">
              <span className="fact-label">CORE STACK</span>
              <span className="fact-value">React 18 · Modern CSS · Vite</span>
            </div>
          </div>

          <div className="fact-item">
            <span className="fact-number">02</span>
            <div className="fact-info">
              <span className="fact-label">PRIMARY FOCUS</span>
              <span className="fact-value">Business Websites &amp; Agency Subcontracting</span>
            </div>
          </div>

          <div className="fact-item">
            <span className="fact-number">03</span>
            <div className="fact-info">
              <span className="fact-label">LOCATION</span>
              <span className="fact-value">Tamil Nadu, India · Remote Worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
