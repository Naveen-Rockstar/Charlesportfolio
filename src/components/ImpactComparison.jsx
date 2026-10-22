import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Check, X, Zap, Shield, Smartphone, Award, ExternalLink } from 'lucide-react';
import { gsap, prefersReducedMotion } from '../utils/motion';

export default function ImpactComparison() {
  const [activeTab, setActiveTab] = useState('performance');
  const rootRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Header and numbers bar reveal
      gsap.from('.impact-header-row', {
        scrollTrigger: {
          trigger: '.impact-header-row',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.65,
        ease: 'power3.out'
      });

      gsap.from('.impact-numbers-bar', {
        scrollTrigger: {
          trigger: '.impact-numbers-bar',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        scale: 0.96,
        y: 35,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      // Split cards entrance
      gsap.from('.impact-split-grid > *', {
        scrollTrigger: {
          trigger: '.impact-split-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out'
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const comparisons = {
    performance: {
      metric: 'TARGET INITIAL LOAD (LCP BENCHMARK)',
      beforeVal: '4.8s+',
      afterVal: '< 1.2s',
      badge: 'TARGET: SUB-SECOND',
      beforeTitle: 'Typical Bloated Template',
      beforePoints: [
        'Render-blocking external CSS & unoptimized libraries',
        'Heavy uncompressed image payloads without responsive sizing',
        'Noticeable Cumulative Layout Shift (CLS) as assets pop in',
        'Higher mobile bounce rate due to delayed first visual paint'
      ],
      afterTitle: 'Custom Engineered React Build',
      afterPoints: [
        'Modular component architecture with zero framework bloat',
        'Lazy-loaded, optimized image assets with explicit dimensions',
        'Engineered to meet Google Core Web Vitals thresholds',
        'Immediate first paint designed for mobile 4G network speeds'
      ]
    },
    mobile: {
      metric: 'MOBILE RESPONSIVENESS & ERGONOMICS',
      beforeVal: 'Fragmented',
      afterVal: 'Fluid Clamp',
      badge: 'TESTED ACROSS VIEWPORTS',
      beforeTitle: 'Fragmented Responsive Fixes',
      beforePoints: [
        'Horizontal scroll overflow and clipped mobile containers',
        'Touch targets too small or misaligned on smaller phones',
        'Clunky desktop navigation forcibly crammed into mobile screens',
        'Unpredictable layout reflows across varying aspect ratios'
      ],
      afterTitle: 'Fluid Responsive Architecture',
      afterPoints: [
        'Fluid clamp() typography scaling smoothly across any width',
        'Generous, ergonomically placed touch targets for thumb reach',
        'Full-screen accessible mobile drawer navigation',
        'Verified across iPhone, Android, tablet, and wide desktop viewports'
      ]
    },
    architecture: {
      metric: 'CODEBASE MAINTAINABILITY & INTEGRATIONS',
      beforeVal: '15+ Plugins',
      afterVal: '0 Bloat',
      badge: 'CLEAN ARCHITECTURE',
      beforeTitle: 'Fragile Template Systems',
      beforePoints: [
        'Fragile third-party plugins that break upon CMS updates',
        'Unreliable contact form mail server queues that lose inquiries',
        'Opaque codebases that are frustrating for agencies to extend',
        'Heavy runtime baggage slowing down browser execution'
      ],
      afterTitle: 'Clean Modern Standards',
      afterPoints: [
        'Direct WhatsApp and verified email inquiry routing hooks',
        'Modular, maintainable React component code with clean props',
        'Strict Git version control for transparent client and agency handoff',
        'Sub-second build times with modern Vite tooling'
      ]
    }
  };

  const current = comparisons[activeTab];

  return (
    <section ref={rootRef} className="impact-section" aria-label="Engineering Standards and Benchmarks">
      <div className="container">
        {/* Section Heading */}
        <div className="impact-header-row">
          <div>
            <div className="section-pretitle">
              <span className="studio-tag">ENGINEERING STANDARDS</span>
              <span style={{ color: 'var(--border-medium)' }}>/</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                PRODUCTION BENCHMARKS
              </span>
            </div>
            <h2 className="impact-monument-title">
              STANDARDS <span className="impact-symbol">⨂</span> REALITY
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
              <span>Page Speed Targets</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'mobile'}
              className={`impact-tab-btn ${activeTab === 'mobile' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('mobile')}
            >
              <Smartphone size={14} aria-hidden="true" />
              <span>Mobile Architecture</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'architecture'}
              className={`impact-tab-btn ${activeTab === 'architecture' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('architecture')}
            >
              <Shield size={14} aria-hidden="true" />
              <span>Clean Code vs Bloat</span>
            </button>
          </div>
        </div>

        {/* Big Numbers Display */}
        <div className="impact-numbers-bar">
          <div className="impact-metric-label-col">
            <span className="impact-metric-name">{current.metric}</span>
            <span className="impact-badge-tag">{current.badge}</span>
          </div>

          <div className="impact-stats-display">
            <div className="stat-unit before-unit">
              <span className="stat-sublabel">COMMON CMS / TEMPLATE</span>
              <span className="stat-number">{current.beforeVal}</span>
            </div>

            <div className="stat-arrow-divider" aria-hidden="true">
              <ArrowRight size={28} />
            </div>

            <div className="stat-unit after-unit">
              <span className="stat-sublabel">ENGINEERED REACT STANDARD</span>
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
                <span>UNOPTIMIZED TEMPLATES</span>
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

        {/* Genuine Audit Verification Badge */}
        <div style={{
          marginTop: '2rem',
          padding: '1.25rem 1.5rem',
          backgroundColor: 'var(--bg-surface-elevated)',
          border: '1px solid var(--border-medium)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Award size={20} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
            <div>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--text-primary)',
                display: 'block',
                marginBottom: '0.2rem'
              }}>
                VERIFIED LIGHTHOUSE AUDIT STANDARDS
              </span>
              <p style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--text-secondary)',
                lineHeight: 1.5,
                margin: 0
              }}>
                Production build verified via Chrome Lighthouse CLI: Performance 99/100 · Accessibility 100/100 · Best Practices 100/100 · SEO 100/100 · LCP 0.9s · CLS 0.036 · TBT 0ms.
              </p>
            </div>
          </div>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--text-muted)',
            padding: '4px 8px',
            border: '1px solid var(--border-hairline)'
          }}>
            VERIFIED LOCAL AUDIT · OCT 2026
          </span>
        </div>
      </div>
    </section>
  );
}
