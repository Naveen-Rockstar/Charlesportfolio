import React from 'react';

export default function Marquee() {
  const items = [
    'BUSINESS WEBSITES',
    'MODERN REACT & VITE',
    'SUB-SECOND PERFORMANCE',
    'CORE WEB VITALS 90+',
    'CREATIVE DIGITAL EXPERIENCES',
    'AGENCY WHITE-LABEL DEV',
    'ZERO TEMPLATE BLOAT',
    'CLEAN CODE ARCHITECTURE'
  ];

  return (
    <div className="marquee-ribbon-stage" aria-hidden="true">
      <div className="marquee-track">
        <div className="marquee-inner-content">
          {items.map((item, idx) => (
            <span key={`m1-${idx}`} className="marquee-badge-unit">
              <span className="marquee-star">✦</span>
              <span className="marquee-text">{item}</span>
            </span>
          ))}
        </div>
        <div className="marquee-inner-content">
          {items.map((item, idx) => (
            <span key={`m2-${idx}`} className="marquee-badge-unit">
              <span className="marquee-star">✦</span>
              <span className="marquee-text">{item}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
