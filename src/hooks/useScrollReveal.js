import { useEffect } from 'react';

/**
 * useScrollReveal
 * Attaches an IntersectionObserver to elements with .reveal-on-scroll
 * and adds .is-visible when they enter the viewport.
 * Safe with prefers-reduced-motion (CSS handles disabling).
 */
export function useScrollReveal(containerRef, options = {}) {
  useEffect(() => {
    const container = containerRef?.current ?? document;
    const els = container.querySelectorAll('.reveal-on-scroll');
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px', ...options }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [containerRef, options]);
}
