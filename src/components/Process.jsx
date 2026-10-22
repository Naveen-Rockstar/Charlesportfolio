import React, { useEffect, useRef } from 'react';
import { workingProcess } from '../data/projects';
import { Clock, ShieldCheck } from 'lucide-react';
import { gsap, prefersReducedMotion } from '../utils/motion';

export default function Process() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from('.process-workflow-section .section-header-wrap', {
        scrollTrigger: {
          trigger: '.process-workflow-section .section-header-wrap',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 35,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out'
      });

      // Stepper horizontal line expand
      gsap.from('.stepper-horizontal-line', {
        scrollTrigger: {
          trigger: '.process-stepper-track',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.2,
        ease: 'power3.inOut'
      });

      // Circular step badges and descriptions sequential reveal
      gsap.from('.process-step-node', {
        scrollTrigger: {
          trigger: '.process-stepper-track',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 45,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'back.out(1.4)'
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={rootRef} className="process-workflow-section" aria-label="Development Process">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-wrap">
          <div className="section-pretitle">
            <span className="studio-tag">METHODOLOGY</span>
            <span style={{ color: 'var(--border-medium)' }}>/</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
              FIVE DISCIPLINED STAGES
            </span>
          </div>
          <h2 className="process-monument-title">
            HOW THE WORK GOES
          </h2>
          <p className="section-lead">
            Every website project follows a transparent five-stage progression from initial requirements
            to final deployment and handoff. Clear milestones, continuous visibility, and zero guesswork.
          </p>
        </div>

        {/* Circular Stepper Row */}
        <div className="process-stepper-track" role="list">
          <div className="stepper-horizontal-line" aria-hidden="true"></div>

          {workingProcess.map((item, idx) => (
            <div key={item.step} className="process-step-node" role="listitem">
              {/* Circular Number Badge */}
              <div className={`process-circle-badge ${idx === 2 ? 'is-highlighted' : ''}`}>
                <span className="badge-step-num">{item.step}</span>
                <span className="badge-step-sub">{item.phase}</span>
              </div>

              {/* Step Info */}
              <div className="process-node-body">
                <h3 className="process-node-title">{item.title}</h3>
                <p className="process-node-desc">{item.description}</p>
                <div className="process-node-action-box">
                  <span className="process-action-label">EXECUTION:</span>
                  <p className="process-action-text">{item.action}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Realistic Timeline & Maintenance Guidance Notes */}
        <div style={{
          marginTop: '2.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.25rem',
          maxWidth: '960px'
        }}>
          <div style={{
            padding: '1rem 1.25rem',
            backgroundColor: 'var(--bg-white)',
            border: '1.5px solid var(--text-near-black)',
            boxShadow: '4px 4px 0px var(--text-near-black)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem'
          }}>
            <Clock size={18} style={{ color: 'var(--text-near-black)', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ display: 'block', fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--text-near-black)', marginBottom: '0.25rem', letterSpacing: '0.04em' }}>
                REALISTIC DELIVERY SCHEDULES:
              </strong>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary-ivory)', lineHeight: 1.5, margin: 0 }}>
                Standard business websites and landing page builds typically launch within 1 to 3 weeks. Turnaround depends on scope complexity, content readiness, and feedback cycles.
              </p>
            </div>
          </div>

          <div style={{
            padding: '1rem 1.25rem',
            backgroundColor: 'var(--bg-white)',
            border: '1.5px solid var(--text-near-black)',
            boxShadow: '4px 4px 0px var(--text-near-black)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem'
          }}>
            <ShieldCheck size={18} style={{ color: 'var(--text-near-black)', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ display: 'block', fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--text-near-black)', marginBottom: '0.25rem', letterSpacing: '0.04em' }}>
                POST-LAUNCH &amp; MAINTENANCE:
              </strong>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary-ivory)', lineHeight: 1.5, margin: 0 }}>
                All agreed project assets and documentation are handed over at launch. Ongoing technical maintenance, regular content updates, and future enhancements can be discussed separately.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
