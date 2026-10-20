import React from 'react';
import { developerBio } from '../data/projects';

export default function About() {
  return (
    <section id="about" className="about-section" aria-label="About Charles Naveen">
      <div className="container">
        <div className="section-header-wrap">
          <div className="section-pretitle">
            <span className="studio-tag">{developerBio.eyebrow}</span>
            <span style={{ color: 'var(--border-medium)' }}>/</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
              BACKGROUND & VALUES
            </span>
          </div>
          <h2 className="section-title-large">
            Independent by choice. <span className="highlight-serif">Collaborative by nature</span>.
          </h2>
        </div>

        <div className="about-editorial-grid">
          {/* Main Narrative */}
          <div className="about-narrative-flow">
            {developerBio.paragraphs.map((para, idx) => (
              <p key={idx} style={{ color: idx === 0 ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                {para}
              </p>
            ))}
          </div>

          {/* Pillars & Academic Credentials */}
          <aside className="about-pillars-box" aria-label="Development Pillars">
            <div className="about-box-title">GUIDING PILLARS</div>

            <div className="pillars-stack">
              {developerBio.pillars.map((pillar, idx) => (
                <div key={idx} className="pillar-item">
                  <h3 className="pillar-item-label">{pillar.label}</h3>
                  <p className="pillar-item-desc">{pillar.desc}</p>
                </div>
              ))}
            </div>

            <div className="academic-credential-bar">
              <span className="deg-label">FORMAL QUALIFICATION</span>
              <span className="deg-val">{developerBio.qualification}</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
