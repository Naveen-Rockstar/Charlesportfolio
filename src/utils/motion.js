import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins globally once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  window.gsap = gsap;
  window.ScrollTrigger = ScrollTrigger;
  
  // Set default config
  ScrollTrigger.config({
    limitCallbacks: true,
    ignoreMobileResize: true
  });
}

/**
 * Utility to check if user prefers reduced motion
 */
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export { gsap, ScrollTrigger };

