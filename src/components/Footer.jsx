import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'Agencies', href: '#collaboration' },
    { label: 'Process', href: '#process' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="footer-wrap" role="contentinfo">
      <div className="container">
        <div className="footer-top-grid">
          <div>
            <div className="footer-brand-title">
              <span>CHARLES NAVEEN</span>
              <span className="brand-dot" aria-hidden="true"></span>
            </div>
            <p className="footer-substatement">
              Freelance Web Developer · Engineering high-performance websites and dependable agency partnerships.
            </p>
          </div>

          <nav aria-label="Footer Quick Links">
            <ul className="footer-links-list">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="footer-link-anchor">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="footer-bottom-bar">
          <p>© {currentYear} Charles Naveen. Designed and developed with care.</p>
          
          <button
            type="button"
            className="top-return-btn"
            onClick={handleScrollToTop}
            aria-label="Scroll back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp size={13} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
