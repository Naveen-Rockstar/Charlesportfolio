import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useMagnetic } from '../hooks/useMagnetic';

export default function Statement({ onOpenContact }) {
  const magneticBtnRef = useMagnetic(0.2);

  return (
    <section className="statement-band-section" aria-label="Philosophy and Craft">
      <div className="container">
        <div className="statement-inner-wrap">
          <div className="statement-meta-tag">
            <span className="statement-dot" aria-hidden="true"></span>
            <span>DEVELOPMENT ETHOS · ZERO BLOAT</span>
          </div>

          <div className="statement-typography-wall">
            <div className="statement-line">
              <span>I BUILD </span>
              <span className="statement-highlight">FRONT.</span>
            </div>
            <div className="statement-line">
              <span>I BUILD </span>
              <span className="statement-outline">BACK.</span>
            </div>
            <div className="statement-line">
              <span>I CRAFT </span>
              <span className="statement-highlight-yellow">EXPERIENCES.</span>
            </div>
            <div className="statement-line">
              <span>I TEST </span>
              <span className="statement-highlight">EVERYTHING.</span>
            </div>
          </div>

          <div className="statement-footer-row">
            <p className="statement-narrative">
              The purpose of a modern website is straightforward: present your business with unquestionable
              authority, paint the first pixel without delay, and convert visitor attention into qualified
              enquiries. No bloated WordPress themes, no fragile templates — just clean, modular, and maintainable
              engineering.
            </p>

            <div className="statement-action-cluster">
              <button
                ref={magneticBtnRef}
                type="button"
                className="btn-statement-cta"
                onClick={() => onOpenContact && onOpenContact('direct')}
              >
                <span>LET'S BUILD TOGETHER</span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
