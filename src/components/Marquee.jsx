import React from 'react';

export default function Marquee() {
  const items = [
    'REACT ARCHITECTURE',
    'PERFORMANCE-OBSESSED',
    '100% RESPONSIVE CRAFT',
    'AGENCY WHITE-LABEL',
    'SEMANTIC HTML5',
    'SUB-SECOND RENDERING',
    'TAMIL NADU & GLOBAL CLIENTS',
    'EDITORIAL TYPOGRAPHY'
  ];

  return (
    <div className="marquee-ribbon" aria-hidden="true">
      <div className="marquee-track">
        <div className="marquee-content">
          {items.map((item, idx) => (
            <span key={`m1-${idx}`} className="marquee-item">
              {item}
            </span>
          ))}
        </div>
        <div className="marquee-content">
          {items.map((item, idx) => (
            <span key={`m2-${idx}`} className="marquee-item">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
