import React from 'react';
import { ArrowUpRight, Check, ShieldCheck, Clock, Layers } from 'lucide-react';
import { agencyCollaboration } from '../data/projects';
import { useMagnetic } from '../hooks/useMagnetic';

export default function Collaboration({ onOpenContact }) {
  const magneticAgencyBtnRef = useMagnetic(0.2);

  const handleCtaClick = (e) => {
    e.preventDefault();
    if (onOpenContact) {
      onOpenContact('agency');
    } else {
      const contactEl = document.querySelector('#contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="collaboration" className="agency-section" aria-label="Digital Marketing Agency Partnerships">
      <div className="container">
        <div className="section-header-wrap" style={{ maxWidth: '920px' }}>
          <div className="section-pretitle">
            <span className="studio-tag">{agencyCollaboration.eyebrow}</span>
            <span style={{ color: 'var(--border-medium)' }}>/</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
              DEV PARTNERSHIP
            </span>
          </div>
          <h2 className="section-title-large">
            Your strategy. My development. <span className="highlight-serif">One reliable partnership</span>.
          </h2>
          <p className="section-lead">
            {agencyCollaboration.body}
          </p>
        </div>

        {/* Bento Grid of Agency Capabilities */}
        <div className="agency-bento-grid">
          {agencyCollaboration.capabilities.map((item, idx) => (
            <div key={idx} className="agency-bento-card">
              <div className="agency-bento-header">
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--accent-primary)', fontWeight: 700 }}>
                  0{idx + 1}
                </span>
                <Check size={16} color="var(--accent-primary)" aria-hidden="true" />
              </div>
              <h3 className="agency-card-title">{item.title}</h3>
              <p className="agency-card-desc">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Agency Values Bar */}
        <div className="agency-values-banner">
          {agencyCollaboration.partnershipValues.map((val, idx) => (
            <div key={idx} className="agency-value-item">
              <h4>{val.title}</h4>
              <p>{val.desc}</p>
            </div>
          ))}
        </div>

        {/* Action Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <button
            ref={magneticAgencyBtnRef}
            type="button"
            className="btn-magnetic-primary"
            onClick={handleCtaClick}
          >
            <span>DISCUSS AN AGENCY PARTNERSHIP</span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </button>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
            Strict NDA confidentiality · Git version controlled · Fixed project or sprint retainers
          </span>
        </div>
      </div>
    </section>
  );
}
