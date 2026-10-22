import React from 'react';
import { ArrowUp, Download } from 'lucide-react';
import { contactConfig } from '../data/contactConfig';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'Standards', href: '#impact' },
    { label: 'Start a Project', href: '#start-project' },
    { label: 'Agencies', href: '#collaboration' },
    { label: 'Process', href: '#process' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <footer className="master-footer" role="contentinfo">
      <div className="container">
        <div className="footer-top-row">
          <div className="footer-identity-col">
            <div className="footer-monument-brand">
              <span>CHARLES NAVEEN</span>
              <span className="brand-dot-lime" aria-hidden="true"></span>
            </div>
            <p className="footer-mission-statement">
              Freelance Web Developer crafting high-performance websites for businesses and dependable white-label development for marketing agencies.
            </p>
            <div className="footer-contact-fast">
              <a href={`mailto:${contactConfig.emailPlaceholder}`} className="footer-fast-link">
                {contactConfig.emailPlaceholder}
              </a>
              <span className="footer-sep">·</span>
              <span className="footer-loc-text">{contactConfig.location}</span>
            </div>
          </div>

          <nav aria-label="Footer Navigation" className="footer-nav-col">
            <span className="footer-col-title">NAVIGATION</span>
            <ul className="footer-links-list">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="footer-nav-anchor">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/charles-naveen-portfolio.pdf"
                  download="Charles-Naveen-Portfolio.pdf"
                  className="footer-nav-anchor"
                  style={{ color: 'var(--accent-primary)', fontWeight: 600 }}
                >
                  Portfolio PDF ↓
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="footer-bottom-row">
          <p className="footer-legal-copy">
            © {currentYear} Charles Naveen. Freelance Web Developer. Engineered with custom React &amp; modern CSS.
          </p>

          <button
            type="button"
            className="footer-top-btn"
            onClick={handleScrollToTop}
            aria-label="Scroll back to top of page"
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={13} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
