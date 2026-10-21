import React, { useState } from 'react';
import { ArrowRight, Check, X, Zap, Shield, Smartphone } from 'lucide-react';

export default function ImpactComparison() {
  const [activeTab, setActiveTab] = useState('performance');

  const comparisons = {
    performance: {
      metric: 'INITIAL PAGE LOAD (LCP)',
      beforeVal: '4.8s',
      afterVal: '0.9s',
      badge: '-81% LOAD TIME',
      beforeTitle: 'Typical Bloated Template',
      beforePoints: [
        'Render-blocking CSS & script libraries',
        'Large uncompressed image payloads',
        'Cumulative Layout Shift (CLS) on mobile',
        'High bounce rate from impatient visitors'
      ],
      afterTitle: 'Custom Engineered React Build',
      afterPoints: [
        'Zero-bloat modular component architecture',
        'Lazy-loaded, optimized image assets',
        'Rock-solid sub-second Core Web Vitals',
        'Instant first visual paint on 4G networks'
      ]
    },
    mobile: {
      metric: 'MOBILE CORE WEB VITALS',
      beforeVal: '12%',
      afterVal: '93%',
      badge: '+81% CWV SCORE',
      beforeTitle: 'Fragmented Responsive Fixes',
      beforePoints: [
        'Broken horizontal margins & overflow clipping',
        'Touch targets too small or misaligned',
        'Clunky desktop navigation forced into mobile',
        'Unpredictable layout shifts across phone sizes'
      ],
      afterTitle: 'Fluid Responsive Architecture',
      afterPoints: [
        'Fluid clamp() typography & container queries',
        'Generous, ergonomically placed touch targets',
        'Full-screen accessible mobile navigation',
        'Tested across real mobile & tablet viewports'
      ]
    },
    architecture: {
      metric: 'CODEBASE & INTEGRATION',
      beforeVal: '15+ Plugins',
      afterVal: '0 Bloat',
      badge: '100% CLEAN CODE',
      beforeTitle: 'Fragile Template Systems',
      beforePoints: [
        'Vulnerable third-party plugins requiring updates',
        'Unreliable contact form mail server failures',
        'Messy spaghetti code difficult to hand off',
        'Slow and cumbersome client maintenance'
      ],
      afterTitle: 'Clean Modern Standards',
      afterPoints: [
        'Direct WhatsApp & failsafe client dispatch',
        'Modular, maintainable React component code',
        'Strict git version control & instant deployment',
        'Dependable documentation for agencies & clients'
      ]
    }
  };

  const current = comparisons[activeTab];

  return (
    <section className="impact-section" aria-label="Before and After Performance Impact">
      <div className="container">
        {/* Section Heading */}
        <div className="impact-header-row">
          <div>
            <div className="section-pretitle">
              <span className="studio-tag">MEASURABLE ENGINEERING</span>
              <span style={{ color: 'var(--border-medium)' }}>/</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                FRONTEND TRANSFORMATION
              </span>
            </div>
            <h2 className="impact-monument-title">
              BEFORE <span className="impact-symbol">⨂</span> AFTER
            </h2>
          </div>

          {/* Metric Selector Tabs */}
          <div className="impact-tabs-cluster" role="tablist" aria-label="Comparison Metric">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'performance'}
              className={`impact-tab-btn ${activeTab === 'performance' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('performance')}
            >
              <Zap size={14} aria-hidden="true" />
              <span>Page Speed</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'mobile'}
              className={`impact-tab-btn ${activeTab === 'mobile' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('mobile')}
            >
              <Smartphone size={14} aria-hidden="true" />
              <span>Mobile CWV</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'architecture'}
              className={`impact-tab-btn ${activeTab === 'architecture' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('architecture')}
            >
              <Shield size={14} aria-hidden="true" />
              <span>Clean Code</span>
            </button>
          </div>
        </div>

        {/* Big Numbers Display (Demo.mp4 Style) */}
        <div className="impact-numbers-bar">
          <div className="impact-metric-label-col">
            <span className="impact-metric-name">{current.metric}</span>
            <span className="impact-badge-tag">{current.badge}</span>
          </div>

          <div className="impact-stats-display">
            <div className="stat-unit before-unit">
              <span className="stat-sublabel">BEFORE</span>
              <span className="stat-number">{current.beforeVal}</span>
            </div>

            <div className="stat-arrow-divider" aria-hidden="true">
              <ArrowRight size={28} />
            </div>

            <div className="stat-unit after-unit">
              <span className="stat-sublabel">AFTER CHARLES'S BUILD</span>
              <span className="stat-number highlight-lime">{current.afterVal}</span>
            </div>
          </div>
        </div>

        {/* Split Comparison Cards */}
        <div className="impact-split-grid">
          {/* Before Card */}
          <div className="impact-card card-before">
            <div className="impact-card-head">
              <div className="impact-badge-status status-bad">
                <X size={14} aria-hidden="true" />
                <span>BEFORE REDESIGN</span>
              </div>
              <h3 className="impact-card-title">{current.beforeTitle}</h3>
            </div>

            <ul className="impact-points-list">
              {current.beforePoints.map((pt, idx) => (
                <li key={idx} className="impact-point-item point-negative">
                  <span className="point-icon-bad" aria-hidden="true">✕</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* After Card */}
          <div className="impact-card card-after">
            <div className="impact-card-head">
              <div className="impact-badge-status status-good">
                <Check size={14} aria-hidden="true" />
                <span>CHARLES NAVEEN ARCHITECTURE</span>
              </div>
              <h3 className="impact-card-title">{current.afterTitle}</h3>
            </div>

            <ul className="impact-points-list">
              {current.afterPoints.map((pt, idx) => (
                <li key={idx} className="impact-point-item point-positive">
                  <span className="point-icon-good" aria-hidden="true">✓</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
