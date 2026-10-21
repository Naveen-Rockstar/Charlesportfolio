import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useMagnetic } from '../hooks/useMagnetic';
import { gsap, prefersReducedMotion } from '../utils/motion';

export default function Statement({ onOpenContact }) {
  const rootRef = useRef(null);
  const magneticBtnRef = useMagnetic(0.2);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Animate the big statement lines with scrollTrigger
      gsap.from('.statement-line', {
        scrollTrigger: {
          trigger: '.statement-typography-wall',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0,
        stagger: 0.14,
        duration: 0.8,
        ease: 'power3.out'
      });

      // Animate the narrative and CTA
      gsap.from('.statement-footer-row', {
        scrollTrigger: {
          trigger: '.statement-footer-row',
          start: 'top 88%',
          toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out'
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="statement-band-section" aria-label="Philosophy and Craft">
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
