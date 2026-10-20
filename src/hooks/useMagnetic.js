import { useRef, useEffect } from 'react';

/**
 * useMagnetic Hook
 * Adds subtle magnetic cursor attraction on desktop pointer interactions.
 * Automatically disabled on touchscreens and when prefers-reduced-motion is active.
 */
export function useMagnetic(strength = 0.3) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check for touch device or reduced motion
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      el.style.transition = 'transform 0.1s ease-out';
    };

    const handleMouseLeave = () => {
      el.style.transform = 'translate(0px, 0px)';
      el.style.transition = 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      if (el) el.style.transform = '';
    };
  }, [strength]);

  return ref;
}
