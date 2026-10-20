import React from 'react';
import { workingProcess } from '../data/projects';

export default function Process() {
  return (
    <section id="process" className="process-section" aria-label="Development Process">
      <div className="container">
        <div className="section-header-wrap">
          <div className="section-pretitle">
            <span className="studio-tag">METHODOLOGY</span>
            <span style={{ color: 'var(--border-medium)' }}>/</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
              FOUR STAGES
            </span>
          </div>
          <h2 className="section-title-large">
            A transparent, <span className="highlight-serif">four-stage journey</span>.
          </h2>
          <p className="section-lead">
            Every build follows a clear progression from initial alignment to cross-device refinement.
            No guesswork, no sudden delays, and zero surprises.
          </p>
        </div>

        <div className="process-steps-grid" role="list">
          {workingProcess.map((item) => (
            <div key={item.step} className="process-step-card" role="listitem">
              <div className="process-step-indicator">
                <span className="process-number">/{item.step}</span>
                <span className="process-phase">{item.phase}</span>
              </div>
              <h3 className="process-step-title">{item.title}</h3>
              <p className="process-step-desc">{item.description}</p>
              <p className="process-step-action">{item.action}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
