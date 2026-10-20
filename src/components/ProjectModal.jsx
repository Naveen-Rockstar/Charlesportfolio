import React, { useEffect, useRef } from 'react';
import { X, ArrowUpRight, ExternalLink } from 'lucide-react';
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
      <div ref={modalRef} className="spec-modal-container">
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
            <span className={`project-badge ${project.badgeClass}`}>
              <span className="badge-dot" aria-hidden="true"></span>
              <span>{project.status}</span>
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--accent-primary)', textTransform: 'uppercase' }}>
              {project.category}
            </span>
          </div>

          <h3 id="modal-case-title" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', color: 'var(--text-primary)', fontWeight: 800 }}>
            {project.title}
          </h3>
          {project.tagline && (
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              {project.tagline}
            </p>
          )}
        </div>

        {/* Screenshot View */}
        <div style={{ marginBottom: '1.5rem', border: '1px solid var(--border-medium)', overflow: 'hidden' }}>
          <img
            src={project.image}
            alt={project.imageAlt}
            style={{ width: '100%', maxHeight: '440px', objectFit: 'cover' }}
          />
        </div>

        {/* Description & Client Context */}
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-primary)', lineHeight: 1.65, marginBottom: '0.75rem' }}>
            {project.description}
          </p>
          {project.clientContext && (
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              <strong>Context & Objective:</strong> {project.clientContext}
            </p>
          )}
        </div>

        {/* Deliverables / Highlights Box */}
        <div style={{ marginBottom: '2rem', padding: '1.25rem', backgroundColor: 'var(--bg-surface-elevated)', borderLeft: '2px solid var(--accent-primary)' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-primary)', display: 'block', marginBottom: '0.75rem' }}>
            {project.deliverables ? 'Delivered Scope & Implementation' : 'Key Focus Areas & Features'}
          </span>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {(project.technicalHighlights || project.deliverables || project.focusAreas || []).map((item, idx) => (
              <li key={idx} style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', display: 'flex', gap: '0.65rem', lineHeight: 1.5 }}>
                <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-hairline)' }}>
          <a
            ref={magneticLiveBtnRef}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-magnetic-primary"
          >
            <span>{project.isFeatured ? 'OPEN LIVE PRODUCTION WEBSITE' : 'OPEN LIVE DEMONSTRATION'}</span>
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
