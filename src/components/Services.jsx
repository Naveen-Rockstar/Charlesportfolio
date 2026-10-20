import React from 'react';
import { services } from '../data/projects';

export default function Services({ onSelectServiceForContact }) {
  return (
    <section id="services" className="services-section" aria-label="Services and Capabilities">
      <div className="container">
        <div className="section-header-wrap">
          <div className="section-pretitle">
            <span className="studio-tag">PRACTICE AREAS</span>
            <span style={{ color: 'var(--border-medium)' }}>/</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
              WHAT I DO
            </span>
          </div>
          <h2 className="section-title-large">
            Good websites start with <span className="highlight-serif">clear thinking</span>.
          </h2>
          <p className="section-lead">
            Every project has a different purpose. I focus on building websites that communicate clearly,
            work flawlessly across devices, and make it effortless for people to take the next step.
          </p>
        </div>

        <div className="services-architectural-list" role="list">
          {services.map((service) => (
            <div key={service.number} className="service-interactive-row" role="listitem">
              <span className="service-row-num" aria-hidden="true">
                /{service.number}
              </span>

              <div className="service-row-title-wrap">
                <span className="service-row-tag">{service.tag}</span>
                <h3 className="service-row-title">{service.title}</h3>
              </div>

              <div className="service-row-body">
                <p className="service-row-desc">{service.description}</p>
                <p className="service-row-details">{service.details}</p>

                {service.deliverables && (
                  <div className="service-chips-row">
                    {service.deliverables.map((item, idx) => (
                      <span key={idx} className="service-mini-chip">
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
