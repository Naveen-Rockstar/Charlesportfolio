import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Mail, MessageSquare, CheckCircle2, Copy, Check } from 'lucide-react';
import { contactConfig } from '../data/contactConfig';
import { useMagnetic } from '../hooks/useMagnetic';
import { gsap, prefersReducedMotion } from '../utils/motion';

const COUNTRY_CODES = [
  { code: '+91', country: 'IN', label: '+91 (India)' },
  { code: '+1', country: 'US', label: '+1 (US / Canada)' },
  { code: '+44', country: 'UK', label: '+44 (UK)' },
  { code: '+971', country: 'AE', label: '+971 (UAE)' },
  { code: '+65', country: 'SG', label: '+65 (Singapore)' },
  { code: '+61', country: 'AU', label: '+61 (Australia)' },
  { code: '+49', country: 'DE', label: '+49 (Germany)' },
  { code: '+33', country: 'FR', label: '+33 (France)' },
  { code: '+other', country: 'GL', label: 'Other' }
];

export default function Contact() {
  const rootRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Banner headline reveal
      gsap.from('.contact-banner-head', {
        scrollTrigger: {
          trigger: '.contact-banner-head',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 35,
        opacity: 0,
        duration: 0.75,
        ease: 'power3.out'
      });

      // Animated arrow slide
      gsap.from('.contact-arrow-huge', {
        scrollTrigger: {
          trigger: '.contact-huge-title-row',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        x: -30,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out'
      });

      // Split layout: Channels & Form entrance
      gsap.from('.contact-info-card', {
        scrollTrigger: {
          trigger: '.contact-layout-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out'
      });

      gsap.from('.contact-form-container', {
        scrollTrigger: {
          trigger: '.contact-layout-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 35,
        opacity: 0,
        duration: 0.75,
        ease: 'power2.out'
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    countryCode: '+91',
    phone: '',
    projectDetails: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const magneticSubmitBtnRef = useMagnetic(0.2);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Please enter your name.';
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters.';
    }

    const cleanPhone = formData.phone.replace(/[\s\-()]/g, '');
    if (!cleanPhone) {
      errs.phone = 'Please enter your mobile or WhatsApp number.';
    } else if (!/^\+?[0-9]{7,15}$/.test(cleanPhone)) {
      errs.phone = 'Please enter a valid mobile number (7–15 digits).';
    }

    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedData({ ...formData });
    }, 200);
  };

  const handleReset = () => {
    setSubmittedData(null);
    setFormData({
      name: '',
      countryCode: '+91',
      phone: '',
      projectDetails: ''
    });
    setErrors({});
    setCopied(false);
  };

  const getFullPhone = () => {
    if (!submittedData) return '';
    const prefix = submittedData.countryCode === '+other' ? '' : `${submittedData.countryCode} `;
    return `${prefix}${submittedData.phone.trim()}`;
  };

  const getBriefSummaryText = () => {
    if (!submittedData) return '';
    const details = submittedData.projectDetails.trim()
      ? submittedData.projectDetails.trim()
      : 'Interested in discussing a website development project.';

    return (
      `Project Enquiry for Charles Naveen\n` +
      `----------------------------------\n` +
      `From: ${submittedData.name.trim()}\n` +
      `Mobile / WhatsApp: ${getFullPhone()}\n` +
      `Details:\n${details}`
    );
  };

  const handleCopyBrief = () => {
    const text = getBriefSummaryText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const generateMailtoLink = () => {
    if (!submittedData) return `mailto:${contactConfig.emailPlaceholder}`;
    const subject = encodeURIComponent(`Project Enquiry from ${submittedData.name.trim()}`);
    const body = encodeURIComponent(getBriefSummaryText());
    return `mailto:${contactConfig.emailPlaceholder}?subject=${subject}&body=${body}`;
  };

  const generateWhatsAppLink = () => {
    if (!submittedData) return `https://wa.me/${contactConfig.whatsappPlaceholder}`;
    const details = submittedData.projectDetails.trim()
      ? submittedData.projectDetails.trim()
      : 'Looking to discuss a website project.';

    const text =
      `Hi Charles, I am submitting an enquiry from your portfolio:\n\n` +
      `• Name: ${submittedData.name.trim()}\n` +
      `• Mobile / WhatsApp: ${getFullPhone()}\n` +
      `• Details: ${details}`;

    return `https://wa.me/${contactConfig.whatsappPlaceholder}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="contact" ref={rootRef} className="contact-dark-section" aria-label="Contact Charles Naveen">
      <div className="container">
        {/* Headline Banner */}
        <div className="contact-banner-head">
          <div className="contact-meta-eyebrow">
            <span className="contact-live-dot" aria-hidden="true"></span>
            <span>AVAILABLE FOR CLIENT BUILDS &amp; AGENCY PARTNERSHIPS</span>
          </div>

          <div className="contact-huge-title-row">
            <h2 className="contact-monument-heading">
              WRITE ME <span className="contact-arrow-huge">→</span>
            </h2>
          </div>
          <p className="contact-subheading">
            LET'S DISCUSS YOUR PROJECT REQUIREMENTS.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="contact-layout-grid">
          {/* Left Column: Direct Communication Channels */}
          <div className="contact-info-col">
            <div className="contact-info-card">
              <span className="contact-card-label">DIRECT COMMUNICATION CHANNELS</span>

              <p className="contact-editorial-copy">
                Have a project in mind, need an indicative quote, or want to discuss an ongoing agency partnership?
                Reach out directly via email or WhatsApp. I respond to all genuine inquiries within 24 business hours.
              </p>

              <div className="contact-channel-item">
                <span className="channel-tag-label">DIRECT EMAIL</span>
                <a
                  href={`mailto:${contactConfig.emailPlaceholder}`}
                  className="channel-value-link"
                >
                  <Mail size={16} aria-hidden="true" />
                  <span>{contactConfig.emailPlaceholder}</span>
                </a>
              </div>

              <div className="contact-channel-item">
                <span className="channel-tag-label">WHATSAPP DIRECT</span>
                <a
                  href={`https://wa.me/${contactConfig.whatsappPlaceholder}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="channel-value-link"
                >
                  <MessageSquare size={16} aria-hidden="true" />
                  <span>+{contactConfig.whatsappPlaceholder}</span>
                </a>
              </div>

              <div className="contact-channel-item">
                <span className="channel-tag-label">LOCATION &amp; BASE</span>
                <span className="channel-value-text">{contactConfig.location} · Remote Worldwide</span>
              </div>

              <div className="contact-channel-item">
                <span className="channel-tag-label">ESTIMATED RESPONSE</span>
                <span className="channel-value-text highlight-lime">{contactConfig.responseTime}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Simplified Consultation Form */}
          <div className="contact-form-col">
            <div className="contact-form-container">
              <div style={{ marginBottom: '1.25rem' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  color: 'var(--accent-lime)',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '0.25rem'
                }}>
                  FAST INQUIRY
                </span>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-xl)',
                  fontWeight: 800,
                  color: 'var(--bg-ivory)',
                  margin: 0
                }}>
                  LET'S TALK ABOUT YOUR PROJECT
                </h3>
                <p style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-inverse-muted)',
                  marginTop: '0.35rem',
                  marginBottom: 0
                }}>
                  Share your details and I'll get back to you.
                </p>
              </div>

              {submittedData ? (
                <div className="form-success-box" role="status" aria-live="polite">
                  <div className="success-icon-wrap">
                    <CheckCircle2 size={32} color="#D8F33A" />
                  </div>
                  <h3 className="success-heading">Enquiry Ready to Dispatch</h3>
                  <p className="success-subtext">
                    Thank you, <strong>{submittedData.name}</strong>. Your enquiry details are ready.
                    Select your preferred direct route below:
                  </p>

                  <div className="success-action-buttons">
                    <a
                      href={generateWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-success-primary"
                    >
                      <MessageSquare size={16} aria-hidden="true" />
                      <span>CONTINUE TO WHATSAPP ↗</span>
                    </a>
                    <a
                      href={generateMailtoLink()}
                      className="btn-success-secondary"
                    >
                      <Mail size={16} aria-hidden="true" />
                      <span>DISPATCH VIA EMAIL</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyBrief}
                      className="btn-success-secondary"
                      style={{ border: '1px dashed var(--border-medium)' }}
                    >
                      {copied ? <Check size={16} color="#D8F33A" /> : <Copy size={16} aria-hidden="true" />}
                      <span>{copied ? 'COPIED TO CLIPBOARD' : 'COPY ENQUIRY TEXT'}</span>
                    </button>
                  </div>

                  <div className="success-reset-row">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="btn-reset-form"
                    >
                      Edit or Submit Another Inquiry ↺
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="contact-form-element">
                  <div className="form-group">
                    <label htmlFor="contact-name" className="input-label">
                      Name <span className="req-star">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="dark-studio-input"
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      autoComplete="name"
                    />
                    {errors.name && <span className="error-note" role="alert">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-phone" className="input-label">
                      Mobile Number / WhatsApp <span className="req-star">*</span>
                    </label>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                      <select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleChange}
                        className="dark-studio-select"
                        style={{
                          width: 'auto',
                          minWidth: '115px',
                          flexShrink: 0,
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.85rem'
                        }}
                        aria-label="Country Code"
                      >
                        {COUNTRY_CODES.map((item) => (
                          <option key={item.code} value={item.code}>
                            {item.label}
                          </option>
                        ))}
                      </select>
                      <div style={{ flex: 1 }}>
                        <input
                          type="tel"
                          id="contact-phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="93849 59626"
                          className="dark-studio-input"
                          aria-required="true"
                          aria-invalid={!!errors.phone}
                          autoComplete="tel-national"
                        />
                      </div>
                    </div>
                    {errors.phone && <span className="error-note" role="alert">{errors.phone}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-details" className="input-label">
                      Project Details <span className="opt-tag">(Optional)</span>
                    </label>
                    <textarea
                      id="contact-details"
                      name="projectDetails"
                      value={formData.projectDetails}
                      onChange={handleChange}
                      placeholder="Briefly tell me what you need."
                      rows={4}
                      className="dark-studio-textarea"
                    ></textarea>
                  </div>

                  <button
                    ref={magneticSubmitBtnRef}
                    type="submit"
                    className="btn-dark-submit"
                    disabled={isSubmitting}
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    {isSubmitting ? (
                      <span>PREPARING ENQUIRY...</span>
                    ) : (
                      <span>Send Enquiry ↗</span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
