import React from 'react';
import { workingProcess } from '../data/projects';

export default function Process() {
  return (
    <section id="process" className="process-workflow-section" aria-label="Development Process">
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
