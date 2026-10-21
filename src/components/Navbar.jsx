import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X, ArrowRight } from 'lucide-react';
import { useMagnetic } from '../hooks/useMagnetic';
import { contactConfig } from '../data/contactConfig';

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
    { label: 'Work', href: '#work', number: '01' },
    { label: 'Capabilities', href: '#services', number: '02' },
    { label: 'Impact', href: '#impact', number: '03' },
    { label: 'Agencies', href: '#collaboration', number: '04' },
    { label: 'Process', href: '#process', number: '05' },
    { label: 'About', href: '#about', number: '06' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
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
    <>
      <header className={`navbar ${scrolled ? 'is-scrolled' : ''}`} role="banner">
        <div className="container navbar-inner">
          {/* Brand Link */}
          <a href="#" className="brand-link" aria-label="Charles Naveen — Portfolio Homepage">
            <span className="brand-name">CHARLES NAVEEN</span>
            <span className="brand-lime-dot" aria-hidden="true"></span>
          </a>

          {/* Desktop Nav Links */}
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

          {/* Right Header Cluster */}
          <div className="nav-right-cluster">
            <div className="nav-status-indicator" role="status">
              <span className="nav-pulse-dot" aria-hidden="true"></span>
              <span className="nav-status-text">Available</span>
            </div>

            <a
              ref={magneticCtaRef}
              href="#contact"
              className="nav-cta-pill"
              onClick={handleTalkClick}
              aria-label="Contact Charles Naveen — Let's Talk"
            >
              <span>WRITE ME</span>
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>

            {/* Menu Hamburger Toggle */}
            <button
              type="button"
              className="menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Editorial Menu Overlay (animation.mp4 Style) */}
      <div
        className={`fullscreen-menu-overlay ${mobileMenuOpen ? 'is-open' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="container menu-overlay-inner">
          <div className="menu-overlay-header">
            <span className="overlay-brand">CHARLES NAVEEN</span>
            <button
              type="button"
              className="overlay-close-btn"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close Navigation"
            >
              <X size={24} />
            </button>
          </div>

          <div className="menu-overlay-grid">
            <nav className="overlay-nav-column" aria-label="Overlay Navigation Links">
              <ul className="overlay-links-list">
                {navLinks.map((item) => (
                  <li key={item.label} className="overlay-link-item">
                    <a
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item.href)}
                      className="overlay-anchor"
                    >
                      <span className="overlay-link-num">{item.number}</span>
                      <span className="overlay-link-text">{item.label}</span>
                      <ArrowRight size={24} className="overlay-link-arrow" aria-hidden="true" />
                    </a>
                  </li>
                ))}
                <li className="overlay-link-item contact-item">
                  <a
                    href="#contact"
                    onClick={handleTalkClick}
                    className="overlay-anchor highlight"
                  >
                    <span className="overlay-link-num">07</span>
                    <span className="overlay-link-text">WRITE ME</span>
                    <ArrowUpRight size={24} className="overlay-link-arrow" aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </nav>

            <div className="overlay-meta-column">
              <div className="overlay-meta-group">
                <span className="overlay-meta-title">DIRECT INQUIRIES</span>
                <a href={`mailto:${contactConfig.emailPlaceholder}`} className="overlay-meta-link">
                  {contactConfig.emailPlaceholder}
                </a>
                <a href={`https://wa.me/${contactConfig.whatsappPlaceholder}`} target="_blank" rel="noopener noreferrer" className="overlay-meta-link">
                  +{contactConfig.whatsappPlaceholder} (WhatsApp)
                </a>
              </div>

              <div className="overlay-meta-group">
                <span className="overlay-meta-title">LOCATION</span>
                <p className="overlay-meta-text">{contactConfig.location}</p>
                <p className="overlay-meta-subtext">Open to remote projects worldwide.</p>
              </div>

              <div className="overlay-meta-group">
                <span className="overlay-meta-title">AVAILABILITY</span>
                <p className="overlay-meta-text highlight-lime">● Taking on selected client builds for Q1/Q2</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
