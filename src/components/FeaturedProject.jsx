import React from 'react';
import { ArrowUpRight, ExternalLink, FileText } from 'lucide-react';
import { featuredProject } from '../data/projects';
import { useMagnetic } from '../hooks/useMagnetic';

export default function FeaturedProject({ onSelectProject }) {
  const magneticBtnRef = useMagnetic(0.2);

  return (
    <section id="work" className="featured-showcase-section" aria-label="Featured Client Case Study">
      <div className="container">
        <div className="section-header-wrap">
          <div className="section-pretitle">
            <span className="studio-tag">COMMISSIONED CLIENT WORK</span>
            <span style={{ color: 'var(--border-medium)' }}>/</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
              PRIMARY SHOWCASE
            </span>
          </div>
          <h2 className="section-title-large">
            Verified Live <span className="highlight-serif">Production Build</span>
          </h2>
          <p className="section-lead">
            A production website commissioned, developed, and deployed for an active pharmaceutical
            distribution enterprise across Tamil Nadu.
          </p>
        </div>

        <article className="featured-spread-card">
          {/* Edge-to-Edge Cinematic Image Container */}
          <div className="spread-visual-container">
            <div className="spread-badge-overlay">
              <span className="project-badge status-completed">
                <span className="badge-dot" aria-hidden="true"></span>
                <span>{featuredProject.status}</span>
              </span>
              <span className="project-badge status-demo" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
                <span>YEAR: {featuredProject.year}</span>
              </span>
            </div>

            <a
              href={featuredProject.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open live site for ${featuredProject.title} in a new tab`}
              style={{ display: 'block' }}
            >
              <img
                src={featuredProject.image}
                alt={featuredProject.imageAlt}
                className="spread-image"
                loading="lazy"
                decoding="async"
                width="1440"
                height="900"
              />
            </a>
          </div>

          {/* Spread Content Layout */}
          <div className="spread-content-grid">
            <div className="spread-title-col">
              <span className="spread-category-label">{featuredProject.category}</span>
              <h3 className="spread-main-title">{featuredProject.title}</h3>
              <p className="spread-description">{featuredProject.description}</p>

              <div className="spread-actions-row">
                <a
                  ref={magneticBtnRef}
                  href={featuredProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-magnetic-primary"
                >
                  <span>VIEW LIVE WEBSITE</span>
                  <ExternalLink size={16} aria-hidden="true" />
                </a>

                {onSelectProject && (
                  <button
                    type="button"
                    className="btn-magnetic-secondary"
                    onClick={() => onSelectProject(featuredProject)}
                  >
                    <FileText size={15} aria-hidden="true" />
                    <span>INSPECT SPEC SHEET</span>
                  </button>
                )}
              </div>
            </div>

            {/* Delivered Scope Column */}
            <div className="spread-deliverables-col">
              <h4 className="spread-deliverables-title">Delivered Architecture & Scope</h4>
              <ul className="spread-deliverables-list">
                {featuredProject.deliverables.map((item, idx) => (
                  <li key={idx} className="spread-deliverable-item">
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
