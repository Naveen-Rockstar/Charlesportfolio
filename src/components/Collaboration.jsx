import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Check, ShieldCheck, Clock, Layers, Sparkles } from 'lucide-react';
import { agencyCollaboration } from '../data/projects';
import { useMagnetic } from '../hooks/useMagnetic';
import { gsap, prefersReducedMotion } from '../utils/motion';

export default function Collaboration({ onOpenContact }) {
  const rootRef = useRef(null);
  const magneticAgencyBtnRef = useMagnetic(0.2);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from('.agency-collaboration-section .section-header-wrap', {
        scrollTrigger: {
          trigger: '.agency-collaboration-section .section-header-wrap',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 35,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out'
      });

      // Bento cards staggered entrance
      gsap.from('.agency-bento-card', {
        scrollTrigger: {
          trigger: '.agency-bento-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.75,
        ease: 'power3.out'
      });

      // Agency values banner
      gsap.from('.agency-values-banner', {
        scrollTrigger: {
          trigger: '.agency-values-banner',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.75,
        ease: 'power2.out'
      });

      // Agency action row
      gsap.from('.agency-action-row', {
        scrollTrigger: {
          trigger: '.agency-action-row',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 25,
        opacity: 0,
        duration: 0.65,
        ease: 'power2.out'
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

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
    <section id="collaboration" ref={rootRef} className="agency-collaboration-section" aria-label="Digital Marketing Agency Partnerships">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-wrap" style={{ maxWidth: '920px' }}>
          <div className="section-pretitle">
            <span className="studio-tag">{agencyCollaboration.eyebrow}</span>
            <span style={{ color: 'var(--border-medium)' }}>/</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
              DEV PARTNERSHIP
            </span>
          </div>
          <h2 className="collaboration-monument-title">
            Your strategy. My development. One reliable partnership.
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
                <span className="agency-step-num">0{idx + 1}</span>
                <span className="agency-check-badge">
                  <Check size={14} color="#11120D" aria-hidden="true" />
                </span>
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
              <h4 className="agency-val-title">{val.title}</h4>
              <p className="agency-val-desc">{val.desc}</p>
            </div>
          ))}
        </div>

        {/* Action Row */}
        <div className="agency-action-row">
          <button
            ref={magneticAgencyBtnRef}
            type="button"
            className="btn-agency-cta"
            onClick={handleCtaClick}
          >
            <span>DISCUSS AN AGENCY PARTNERSHIP</span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </button>
          <span className="agency-nda-note">
            Strict NDA confidentiality · Git version controlled · Fixed project or sprint retainers
          </span>
        </div>
      </div>
    </section>
  );
}
