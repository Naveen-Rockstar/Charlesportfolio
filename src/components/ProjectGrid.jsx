import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, ExternalLink, FileText, Sparkles } from 'lucide-react';
import { featuredProject, demoProjects } from '../data/projects';
import { useMagnetic } from '../hooks/useMagnetic';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../utils/motion';

export default function ProjectGrid({ onSelectProject }) {
  const [filter, setFilter] = useState('all');
  const rootRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from('.work-header-row', {
        scrollTrigger: {
          trigger: '.work-header-row',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 35,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out'
      });

      // Individual project card reveals
      const cards = gsap.utils.toArray('.work-panel-card');
      cards.forEach((card) => {
        const img = card.querySelector('.panel-project-img');
        const content = card.querySelector('.panel-content-col');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        });

        tl.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.85,
          ease: 'power3.out'
        });

        if (img) {
          tl.from(img, {
            scale: 1.15,
            duration: 1.2,
            ease: 'power2.out'
          }, '-=0.6');
        }

        if (content) {
          tl.from(content.children, {
            y: 20,
            opacity: 0,
            stagger: 0.08,
            duration: 0.6,
            ease: 'power2.out'
          }, '-=0.8');
        }
      });
    }, rootRef);

    return () => ctx.revert();
  }, [filter]); // Re-run when filter changes so new cards animate nicely

  const allProjects = [
    {
      ...featuredProject,
      theme: 'theme-obsidian',
      accentColor: '#D8F33A',
      cardType: 'flagship'
    },
    {
      ...demoProjects[0], // D-wings
      theme: 'theme-lime',
      accentColor: '#11120D',
      cardType: 'editorial'
    },
    {
      ...demoProjects[1], // Evara
      theme: 'theme-ivory',
      accentColor: '#11120D',
      cardType: 'editorial'
    },
    {
      ...demoProjects[2], // LARA
      theme: 'theme-yellow',
      accentColor: '#11120D',
      cardType: 'editorial'
    },
    {
      ...demoProjects[3], // Jeeva Jee
      theme: 'theme-charcoal',
      accentColor: '#D8F33A',
      cardType: 'editorial'
    }
  ];

  const filteredProjects = filter === 'all'
    ? allProjects
    : filter === 'client'
      ? allProjects.filter((p) => p.status.includes('CLIENT'))
      : allProjects.filter((p) => !p.status.includes('CLIENT'));

  return (
    <section id="work" ref={rootRef} className="selected-work-section" aria-label="Selected Projects and Client Work">
      <div className="container">
        {/* Section Header */}
        <div className="work-header-row">
          <div>
            <div className="section-pretitle">
              <span className="studio-tag">PORTFOLIO</span>
              <span style={{ color: 'var(--border-medium)' }}>/</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                VERIFIED BUILDS &amp; CONCEPTS
              </span>
            </div>
            <h2 className="work-monument-title">
              SELECTED WORK
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="work-filter-pills" role="tablist" aria-label="Filter Projects">
            <button
              type="button"
              role="tab"
              aria-selected={filter === 'all'}
              className={`filter-pill ${filter === 'all' ? 'is-active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Projects ({allProjects.length})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={filter === 'client'}
              className={`filter-pill ${filter === 'client' ? 'is-active' : ''}`}
              onClick={() => setFilter('client')}
            >
              Client Builds (1)
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={filter === 'demo'}
              className={`filter-pill ${filter === 'demo' ? 'is-active' : ''}`}
              onClick={() => setFilter('demo')}
            >
              Demonstration Series (4)
            </button>
          </div>
        </div>

        {/* Color-Blocked Editorial Project Cards (Demo.mp4 Style) */}
        <div className="work-panels-grid">
          {filteredProjects.map((project, idx) => (
            <article
              key={project.id}
              className={`work-panel-card ${project.theme} ${project.cardType === 'flagship' ? 'is-flagship-card' : ''}`}
            >
              {/* Card Header Bar */}
              <div className="panel-header-bar">
                <div className="panel-meta-left">
                  <span className="panel-badge-status">
                    <span className="panel-badge-dot" aria-hidden="true"></span>
                    <span>{project.status}</span>
                  </span>
                  <span className="panel-category-label">{project.category}</span>
                </div>
                <span className="panel-index-num">/{project.number}</span>
              </div>

              {/* Card Body: Split or Stacked */}
              <div className="panel-inner-body">
                <div className="panel-content-col">
                  <h3 className="panel-project-title">{project.title}</h3>
                  <p className="panel-tagline">{project.tagline}</p>
                  <p className="panel-desc">{project.description}</p>

                  {/* Highlights / Deliverables */}
                  <div className="panel-focus-box">
                    <div className="panel-focus-title">FOCUS &amp; ARCHITECTURE:</div>
                    <ul className="panel-focus-list">
                      {(project.technicalHighlights || project.focusAreas || []).slice(0, 3).map((item, fIdx) => (
                        <li key={fIdx} className="panel-focus-item">
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Dotted Separator Line (Demo.mp4 Style) */}
                  <div className="panel-dotted-line" aria-hidden="true"></div>

                  {/* Actions Row */}
                  <div className="panel-actions-row">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="panel-btn-live"
                      aria-label={`Open live link for ${project.title}`}
                    >
                      <span>VIEW LIVE SITE</span>
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </a>

                    {onSelectProject && (
                      <button
                        type="button"
                        className="panel-btn-spec"
                        onClick={() => onSelectProject(project)}
                      >
                        <FileText size={14} aria-hidden="true" />
                        <span>SPEC DETAILS</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Visual Preview Frame */}
                <div className="panel-visual-col">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="panel-image-anchor"
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <div className="panel-image-frame">
                      <img
                        src={project.image}
                        alt={project.imageAlt}
                        className="panel-project-img"
                        loading="eager"
                        decoding="async"
                        width="1200"
                        height="750"
                      />
                      <div className="panel-image-hover-indicator">
                        <span>OPEN LIVE DEMO ↗</span>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
