import React, { useEffect, useRef } from 'react';
import { workingProcess } from '../data/projects';
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
        stagger: 0.18,
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
              FOUR DISCIPLINED STAGES
            </span>
          </div>
          <h2 className="process-monument-title">
            HOW THE WORK GOES
          </h2>
          <p className="section-lead">
            Every project follows a transparent four-stage progression from discovery to final cross-device
            refinement. Clear milestones, continuous visibility, and zero guesswork.
          </p>
        </div>

        {/* Circular Stepper Row (Demo.mp4 Style) */}
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
      </div>
    </section>
  );
}
