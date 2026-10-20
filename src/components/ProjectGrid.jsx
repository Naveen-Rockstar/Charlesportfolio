import React from 'react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { demoProjects } from '../data/projects';

export default function ProjectGrid({ onSelectProject }) {
  return (
    <section className="projects-section" aria-label="Demonstration Concepts and Prototypes">
      <div className="container">
        <div className="section-header-wrap">
          <div className="section-pretitle">
            <span className="studio-tag">EXPLORATORY WORK</span>
            <span style={{ color: 'var(--border-medium)' }}>/</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
              FOUR CONCEPTS
            </span>
          </div>
          <h2 className="section-title-large">
            Demonstration Series & <span className="highlight-serif">Prototypes</span>
          </h2>
          <p className="section-lead">
            Curated web prototypes exploring diverse industries, brand aesthetics, and practical conversion
            pathways. Transparently categorized as non-client concept builds.
          </p>
        </div>

        <div className="concept-editorial-grid">
          {demoProjects.map((project) => (
            <article key={project.id} className="concept-card">
              {/* Visual Container */}
              <div className="concept-visual-wrap">
                <div className="concept-badges-bar">
                  <span className={`project-badge ${project.badgeClass}`}>
                    <span className="badge-dot" aria-hidden="true"></span>
                    <span>{project.status}</span>
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: '#FFFFFF', backgroundColor: 'rgba(0,0,0,0.6)', padding: '0.2rem 0.5rem', borderRadius: '2px' }}>
                    /{project.number}
                  </span>
                </div>

                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open live demo for ${project.title} in a new tab`}
                  style={{ display: 'block' }}
                >
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    className="concept-image"
                    loading="lazy"
                    decoding="async"
                    width="1440"
                    height="900"
                  />
                </a>
              </div>

              {/* Card Body */}
              <div className="concept-body">
                <div className="concept-meta-row">
                  <span className="concept-category-tag">{project.category}</span>
                  <span className="concept-index-num">PROJECT {project.number}</span>
                </div>

                <h3 className="concept-card-title">{project.title}</h3>
                <p className="concept-card-desc">{project.description}</p>

                {/* Focus Areas Box */}
                <div className="concept-focus-box">
                  <ul className="concept-focus-list">
                    {project.focusAreas.map((point, idx) => (
                      <li key={idx} className="concept-focus-item">
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Footer Actions */}
                <div className="concept-card-footer">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="kinetic-link"
                  >
                    <span>{project.ctaText}</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>

                  {onSelectProject && (
                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        padding: '0.35rem 0',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                    >
                      SPEC DETAILS
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
