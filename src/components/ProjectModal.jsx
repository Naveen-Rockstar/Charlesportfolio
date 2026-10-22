import React, { useEffect, useRef } from 'react';
import { X, ArrowUpRight, ExternalLink, ShieldCheck, CheckCircle2, Layers, Target, Compass, Award } from 'lucide-react';
import { useMagnetic } from '../hooks/useMagnetic';

export default function ProjectModal({ project, onClose }) {
  const modalRef = useRef(null);
  const magneticLiveBtnRef = useMagnetic(0.2);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className="spec-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-case-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div ref={modalRef} className="spec-modal-container" style={{
        maxWidth: '840px',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        {/* Close Button */}
        <button
          type="button"
          className="spec-modal-close-btn"
          onClick={onClose}
          aria-label="Close Case Spec Dialog"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: '1.5rem', paddingRight: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.65rem', flexWrap: 'wrap' }}>
            <span className={`project-badge ${project.badgeClass || 'status-completed'}`}>
              <span className="badge-dot" aria-hidden="true"></span>
              <span>{project.statusBadge || project.status}</span>
            </span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'var(--accent-primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              {project.category}
            </span>
          </div>

          <h3 id="modal-case-title" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
            color: 'var(--text-primary)',
            fontWeight: 800,
            lineHeight: 1.2
          }}>
            {project.title}
          </h3>
          {project.tagline && (
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginTop: '0.4rem', lineHeight: 1.5 }}>
              {project.tagline}
            </p>
          )}
        </div>

        {/* Screenshot View */}
        <div style={{
          marginBottom: '1.75rem',
          border: '1px solid var(--border-medium)',
          overflow: 'hidden',
          backgroundColor: '#000000'
        }}>
          <img
            src={project.image}
            alt={project.imageAlt}
            style={{ width: '100%', maxHeight: '420px', objectFit: 'cover', display: 'block' }}
          />
        </div>

        {/* 5-Part Structured Case Study Breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
          
          {/* 1. Overview */}
          <div style={{
            padding: '1.25rem',
            backgroundColor: 'var(--bg-surface-elevated)',
            borderLeft: '3px solid var(--accent-primary)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Compass size={16} style={{ color: 'var(--accent-primary)' }} />
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--text-primary)'
              }}>
                01 · OVERVIEW &amp; INTENDED AUDIENCE
              </span>
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: '0.5rem' }}>
              {project.description}
            </p>
            {project.audience && (
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', margin: 0 }}>
                <strong style={{ color: 'var(--text-primary)' }}>Target Audience:</strong> {project.audience}
              </p>
            )}
          </div>

          {/* 2. Challenge / Objective */}
          <div style={{
            padding: '1.25rem',
            backgroundColor: 'var(--bg-surface-elevated)',
            borderLeft: '3px solid var(--border-medium)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Target size={16} style={{ color: 'var(--accent-primary)' }} />
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--text-primary)'
              }}>
                {project.isClientProject ? '02 · CLIENT CHALLENGE & REQUIREMENTS' : '02 · CONCEPT PROBLEM & OBJECTIVE'}
              </span>
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
              {project.challenge || project.clientContext}
            </p>
          </div>

          {/* 3. Approach & Architecture */}
          <div style={{
            padding: '1.25rem',
            backgroundColor: 'var(--bg-surface-elevated)',
            borderLeft: '3px solid var(--border-medium)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Layers size={16} style={{ color: 'var(--accent-primary)' }} />
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--text-primary)'
              }}>
                03 · DESIGN DIRECTION &amp; RESPONSIVE ARCHITECTURE
              </span>
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
              {project.approach || 'Built using modular React component systems, semantic markup, and fluid mobile ergonomics.'}
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {(project.technicalHighlights || project.focusAreas || []).map((h, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={13} style={{ color: 'var(--accent-primary)', flexShrink: 0, marginTop: '2px' }} />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Contribution & Stack */}
          <div style={{
            padding: '1.25rem',
            backgroundColor: 'var(--bg-surface-elevated)',
            borderLeft: '3px solid var(--border-medium)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <ShieldCheck size={16} style={{ color: 'var(--accent-primary)' }} />
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--text-primary)'
              }}>
                04 · MY PERSONAL CONTRIBUTION &amp; TECH STACK
              </span>
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
              {project.contribution || 'Personally engineered the frontend architecture in React and modern CSS, ensuring responsive fidelity, keyboard accessibility, and direct communication dispatch.'}
            </p>
          </div>

          {/* 5. Outcome & Business Application */}
          <div style={{
            padding: '1.25rem',
            backgroundColor: 'var(--bg-surface-elevated)',
            borderLeft: '3px solid var(--accent-primary)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Award size={16} style={{ color: 'var(--accent-primary)' }} />
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--text-primary)'
              }}>
                {project.isClientProject ? '05 · DELIVERED OUTCOME & FEATURES' : '05 · DELIVERED FEATURES & INTENDED APPLICATION'}
              </span>
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
              {project.outcome}
            </p>
          </div>

        </div>

        {/* Action Row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid var(--border-hairline)'
        }}>
          <a
            ref={magneticLiveBtnRef}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-magnetic-primary"
          >
            <span>{project.isClientProject ? 'OPEN LIVE PRODUCTION WEBSITE' : 'OPEN LIVE DEMONSTRATION'}</span>
            <ExternalLink size={16} aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={onClose}
            className="btn-magnetic-secondary"
          >
            Close Sheet
          </button>
        </div>
      </div>
    </div>
  );
}
