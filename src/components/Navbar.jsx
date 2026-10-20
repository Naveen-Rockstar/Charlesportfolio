import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useMagnetic } from '../hooks/useMagnetic';

export default function Navbar({ onOpenContact }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const magneticCtaRef = useMagnetic(0.25);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'Agencies', href: '#collaboration' },
    { label: 'Process', href: '#process' },
    { label: 'About', href: '#about' },
  ];

  const handleLinkClick = (e, href) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTalkClick = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onOpenContact) {
      onOpenContact('direct');
    } else {
      const contactSection = document.querySelector('#contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={`navbar ${scrolled ? 'is-scrolled' : ''}`} role="banner">
      <div className="container navbar-inner">
        {/* Brand Link */}
        <a href="#" className="brand-link" aria-label="Charles Naveen — Portfolio Homepage">
          <span>CHARLES NAVEEN</span>
          <span className="brand-dot" aria-hidden="true"></span>
        </a>

        {/* Desktop Nav */}
        <nav className="nav-desktop" aria-label="Primary Navigation">
          <ul className="nav-links-desktop">
            {navLinks.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="nav-item-link"
                  onClick={(e) => handleLinkClick(e, item.href)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Primary CTA */}
        <div className="nav-actions-desktop">
          <a
            ref={magneticCtaRef}
            href="#contact"
            className="nav-cta-btn"
            onClick={handleTalkClick}
            aria-label="Contact Charles Naveen — Let's Talk"
          >
            <span>LET'S TALK</span>
            <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button
          type="button"
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`mobile-drawer ${mobileMenuOpen ? 'is-open' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <ul className="mobile-nav-links">
          {navLinks.map((item) => (
            <li key={item.label} className="mobile-nav-item">
              <a
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mobile-drawer-footer">
          <button
            type="button"
            className="btn-magnetic-primary"
            style={{ width: '100%' }}
            onClick={handleTalkClick}
          >
            <span>START A PROJECT</span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </button>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Tamil Nadu, India
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-primary)' }}>
              ● Available
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
