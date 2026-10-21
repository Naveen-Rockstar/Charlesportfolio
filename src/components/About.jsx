import React from 'react';
import { developerBio } from '../data/projects';
import { Award, GraduationCap, MapPin, Compass } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="about-editorial-section" aria-label="About Charles Naveen">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-wrap">
          <div className="section-pretitle">
            <span className="studio-tag">{developerBio.eyebrow}</span>
            <span style={{ color: 'var(--border-medium)' }}>/</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
              BACKGROUND &amp; VALUES
            </span>
          </div>
          <h2 className="about-monument-title">
            Precision in craft. <span className="highlight-serif">Partnership in practice</span>.
          </h2>
        </div>

        <div className="about-editorial-grid">
          {/* Main Narrative */}
          <div className="about-narrative-flow">
            <p className="about-lead-paragraph">
              {developerBio.paragraphs[0]}
            </p>
            <p className="about-body-paragraph">
              {developerBio.paragraphs[1]}
            </p>
            <p className="about-body-paragraph">
              {developerBio.paragraphs[2]}
            </p>

            {/* Quick Credentials Strip */}
            <div className="about-creds-strip">
              <div className="cred-badge">
                <GraduationCap size={16} className="cred-icon" aria-hidden="true" />
                <span>{developerBio.qualification}</span>
              </div>
              <div className="cred-badge">
                <MapPin size={16} className="cred-icon" aria-hidden="true" />
                <span>{developerBio.location}</span>
              </div>
              <div className="cred-badge">
                <Compass size={16} className="cred-icon" aria-hidden="true" />
                <span>Web Architecture &amp; Creative Tech</span>
              </div>
            </div>
          </div>

          {/* Pillars Column */}
          <aside className="about-pillars-box" aria-label="Development Pillars">
            <div className="about-box-title">GUIDING PILLARS</div>

            <div className="pillars-stack">
              {developerBio.pillars.map((pillar, idx) => (
                <div key={idx} className="pillar-item">
                  <span className="pillar-item-num">0{idx + 1}</span>
                  <h3 className="pillar-item-label">{pillar.label}</h3>
                  <p className="pillar-item-desc">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
