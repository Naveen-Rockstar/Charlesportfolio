import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, CheckCircle2, HelpCircle } from 'lucide-react';
import { services } from '../data/projects';
import { gsap, prefersReducedMotion } from '../utils/motion';

export default function Services({ onSelectServiceForContact }) {
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const rootRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from('.services-section .section-header-wrap', {
        scrollTrigger: {
          trigger: '.services-section .section-header-wrap',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 35,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out'
      });

      // Staggered capability rows reveal
      gsap.from('.capability-row', {
        scrollTrigger: {
          trigger: '.capabilities-container',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power3.out'
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={rootRef} className="services-section" aria-label="Capabilities and Services">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-wrap">
          <div className="section-pretitle">
            <span className="studio-tag">SERVICES &amp; SOLUTIONS</span>
            <span style={{ color: 'var(--border-medium)' }}>/</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
              CORE OFFERINGS
            </span>
          </div>
          <h2 className="section-title-large">
            SERVICES &amp; CAPABILITIES
          </h2>
          <p className="section-lead">
            Straightforward web development services for business owners who need high-performing websites
            and marketing agencies looking for a dependable subcontracting partner.
          </p>
        </div>

        {/* Interactive Capability Rows */}
        <div className="capabilities-container" role="list">
          {services.map((item, idx) => {
            const isActive = activeServiceIndex === idx;
            return (
              <div
                key={item.number}
                className={`capability-row ${isActive ? 'is-active' : ''}`}
                onClick={() => setActiveServiceIndex(idx)}
                onMouseEnter={() => setActiveServiceIndex(idx)}
                tabIndex={0}
                role="listitem"
                aria-expanded={isActive}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveServiceIndex(idx);
                  }
                }}
              >
                <div className="capability-row-main">
                  <div className="capability-identity">
                    <span className="capability-num">{item.number}</span>
                    <div>
                      <h3 className="capability-title">{item.title}</h3>
                      {item.subtitle && (
                        <p className="capability-subtitle" style={{
                          fontSize: 'var(--text-xs)',
                          color: 'var(--text-secondary)',
                          marginTop: '0.2rem',
                          fontFamily: 'var(--font-sans)'
                        }}>
                          {item.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="capability-tags-strip" aria-label={`${item.title} tag`}>
                    <span className="capability-tag-pill">
                      {item.tag}
                    </span>
                  </div>
                </div>

                {/* Expanded Details Panel */}
                <div className="capability-expand-drawer">
                  <div className="capability-drawer-inner">
                    <div className="capability-drawer-content">
                      <p className="capability-drawer-desc">{item.description}</p>
                      
                      {item.whenAppropriate && (
                        <div style={{
                          margin: '0.75rem 0',
                          padding: '0.65rem 0.85rem',
                          backgroundColor: 'rgba(216, 243, 58, 0.05)',
                          borderLeft: '2px solid var(--accent-primary)',
                          borderRadius: '0 4px 4px 0'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
                            <HelpCircle size={13} style={{ color: 'var(--accent-primary)' }} />
                            <span style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '11px',
                              letterSpacing: '0.05em',
                              fontWeight: 700,
                              color: 'var(--text-primary)',
                              textTransform: 'uppercase'
                            }}>
                              WHEN THIS IS APPROPRIATE:
                            </span>
                          </div>
                          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                            {item.whenAppropriate}
                          </p>
                        </div>
                      )}

                      <div className="capability-deliverables-group">
                        <span className="capability-deliverables-title">WHAT YOU RECEIVE:</span>
                        <div className="capability-deliverables-grid">
                          {(item.whatYouReceive || item.deliverables).map((del, dIdx) => (
                            <div key={dIdx} className="capability-deliverable-item">
                              <CheckCircle2 size={14} className="capability-check-icon" aria-hidden="true" />
                              <span>{del}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {item.demonstratedIn && (
                        <div style={{
                          marginTop: '1rem',
                          padding: '0.5rem 0.75rem',
                          backgroundColor: 'rgba(17, 18, 13, 0.05)',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          flexWrap: 'wrap'
                        }}>
                          <span style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '10px',
                            fontWeight: 800,
                            letterSpacing: '0.06em',
                            color: 'var(--text-near-black)',
                            textTransform: 'uppercase'
                          }}>
                            WORK REFERENCE:
                          </span>
                          <span style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '11px',
                            color: 'var(--text-near-black)',
                            fontWeight: 600
                          }}>
                            {item.demonstratedIn}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="capability-drawer-action">
                      <button
                        type="button"
                        className="btn-capability-enquire"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onSelectServiceForContact) onSelectServiceForContact(item.id);
                        }}
                      >
                        <span>DISCUSS THIS SERVICE</span>
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
