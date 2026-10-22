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

/**
 * Utility to check if mobile viewport
 */
export const isMobileViewport = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

/**
 * Calibrated motion parameters based on screen size:
 * Shorter, lighter transitions on mobile; cinematic presence on desktop.
 */
export const getResponsiveMotion = () => {
  const isMob = isMobileViewport();
  return {
    isMobile: isMob,
    y: isMob ? 18 : 35,
    duration: isMob ? 0.45 : 0.75,
    stagger: isMob ? 0.06 : 0.12,
    ease: 'power3.out'
  };
};

export { gsap, ScrollTrigger };

