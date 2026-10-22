import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowUpRight,
  MessageSquare,
  Mail,
  Copy,
  Check,
  CheckCircle2,
  AlertCircle,
  Building2,
  Briefcase,
  FileCheck2
} from 'lucide-react';
import { projectEnquiryData } from '../data/projects';
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
  { code: '+966', country: 'SA', label: '+966 (Saudi Arabia)' },
  { code: '+60', country: 'MY', label: '+60 (Malaysia)' },
  { code: '+other', country: 'GL', label: 'Other' }
];

export default function StartProject() {
  const rootRef = useRef(null);
  const magneticSubmitBtnRef = useMagnetic(0.2);

  const [formData, setFormData] = useState({
    name: '',
    countryCode: '+91',
    phone: '',
    projectDetails: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from('.start-project-section .section-header-wrap', {
        scrollTrigger: {
          trigger: '.start-project-section .section-header-wrap',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out'
      });

      // Pillars stagger
      gsap.from('.engagement-pillar-card', {
        scrollTrigger: {
          trigger: '.engagement-pillars-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 35,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power3.out'
      });

      // Enquiry form card entrance
      gsap.from('.enquiry-form-card', {
        scrollTrigger: {
          trigger: '.enquiry-form-card',
          start: 'top 82%',
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

  const getEnquirySummaryText = () => {
    if (!submittedData) return '';
    const details = submittedData.projectDetails.trim()
      ? submittedData.projectDetails.trim()
      : 'Interested in discussing a website design / development project.';

    return (
      `Project Enquiry for Charles Naveen\n` +
      `===================================\n` +
      `• Name: ${submittedData.name.trim()}\n` +
      `• Mobile / WhatsApp: ${getFullPhone()}\n` +
      `• Project Details:\n${details}\n\n` +
      `Sent via Charles Naveen Portfolio`
    );
  };

  const handleCopyText = () => {
    const text = getEnquirySummaryText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const generateWhatsAppUrl = () => {
    if (!submittedData) return `https://wa.me/${contactConfig.whatsappPlaceholder}`;
    const details = submittedData.projectDetails.trim()
      ? submittedData.projectDetails.trim()
      : 'I would like to discuss a website development project.';

    const message =
      `Hi Charles, I am submitting an enquiry from your portfolio:\n\n` +
      `• Name: ${submittedData.name.trim()}\n` +
      `• Mobile / WhatsApp: ${getFullPhone()}\n` +
      `• Project Details: ${details}`;

    return `https://wa.me/${contactConfig.whatsappPlaceholder}?text=${encodeURIComponent(message)}`;
  };

  const generateMailtoUrl = () => {
    if (!submittedData) return `mailto:${contactConfig.emailPlaceholder}`;
    const subject = encodeURIComponent(`Project Enquiry from ${submittedData.name.trim()}`);
    const body = encodeURIComponent(getEnquirySummaryText());
    return `mailto:${contactConfig.emailPlaceholder}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="start-project"
      ref={rootRef}
      className="start-project-section"
      aria-label="Start a Project — Project Enquiries"
    >
      {/* Invisible anchor for backward compatibility */}
      <span id="pricing" style={{ display: 'block', position: 'relative', top: '-100px', visibility: 'hidden' }} aria-hidden="true"></span>

      <div className="container">
        {/* Section Header */}
        <div className="section-header-wrap" style={{ maxWidth: '960px' }}>
          <div className="section-pretitle">
            <span className="studio-tag">{projectEnquiryData.eyebrow}</span>
            <span style={{ color: 'var(--border-medium)' }}>/</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
              START A PROJECT
            </span>
          </div>
          <h2 className="section-title-large">
            {projectEnquiryData.headline}
          </h2>
          <p className="section-lead">
            {projectEnquiryData.supportingCopy}
          </p>
        </div>

        {/* Three Engagement Sections: Businesses, Agencies, Scope & Quotation */}
        <div className="engagement-pillars-grid">
          {projectEnquiryData.engagements.map((item, idx) => {
            const icons = [Building2, Briefcase, FileCheck2];
            const IconComp = icons[idx] || Building2;
            return (
              <div key={item.number} className="engagement-pillar-card">
                <div className="pillar-header">
                  <div className="pillar-tag-strip">
                    <span className="pillar-index-num">/{item.number}</span>
                    <span className="pillar-tag-pill">{item.tag}</span>
                  </div>
                  <div className="pillar-icon-box">
                    <IconComp size={18} aria-hidden="true" />
                  </div>
                </div>

                <h3 className="pillar-audience-title">{item.audience}</h3>

                <blockquote className="pillar-quote">
                  "{item.statement}"
                </blockquote>

                <p className="pillar-desc">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Simplified, Clean & Focused Project Enquiry Form Container */}
        <div className="enquiry-form-card" style={{ maxWidth: '680px', margin: '0 auto' }}>
          <div className="enquiry-card-header">
            <div>
              <span className="enquiry-card-eyebrow">DIRECT INQUIRY</span>
              <h3 className="enquiry-card-title">LET'S TALK ABOUT YOUR PROJECT</h3>
              <p className="enquiry-card-subtitle">
                Share your details and I'll get back to you.
              </p>
            </div>
            <span className="enquiry-response-tag">
              ● Direct response within 24h
            </span>
          </div>

          {submittedData ? (
            <div className="form-success-box" role="status" aria-live="polite">
              <div className="success-icon-wrap">
                <CheckCircle2 size={40} className="success-check-icon" aria-hidden="true" />
              </div>
              <h3 className="success-heading">Enquiry Ready to Dispatch</h3>
              <p className="success-subtext">
                Thank you, <strong>{submittedData.name}</strong>. Your enquiry details have been formatted.
                To ensure immediate delivery with zero lost messages or unmonitored queues, choose your direct contact route:
              </p>

              <div className="brief-preview-box">
                <pre className="brief-preview-pre">{getEnquirySummaryText()}</pre>
              </div>

              <div className="success-action-buttons">
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-success-primary"
                  style={{ textDecoration: 'none' }}
                >
                  <MessageSquare size={16} aria-hidden="true" />
                  <span>CONTINUE TO WHATSAPP ↗</span>
                </a>

                <a
                  href={generateMailtoUrl()}
                  className="btn-success-secondary"
                  style={{ textDecoration: 'none' }}
                >
                  <Mail size={16} aria-hidden="true" />
                  <span>SEND VIA EMAIL ({contactConfig.emailPlaceholder})</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyText}
                  className="btn-success-secondary"
                  style={{ border: '1.5px dashed var(--border-medium)' }}
                >
                  {copied ? <Check size={16} color="#D8F33A" /> : <Copy size={16} aria-hidden="true" />}
                  <span>{copied ? 'COPIED TO CLIPBOARD' : 'COPY ENQUIRY TEXT'}</span>
                </button>
              </div>

              <div className="success-reset-row" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn-reset-form"
                >
                  Edit or Submit Another Enquiry ↺
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="enquiry-form-body">
              {/* Field 1: Name (Required) */}
              <div className="form-group">
                <label htmlFor="enquiry-name" className="input-label">
                  Name <span className="req-star">*</span>
                </label>
                <input
                  type="text"
                  id="enquiry-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="editorial-input"
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  autoComplete="name"
                />
                {errors.name && (
                  <span className="error-note" role="alert">
                    {errors.name}
                  </span>
                )}
              </div>

              {/* Field 2: Mobile Number / WhatsApp (Required, with Country Code Support) */}
              <div className="form-group">
                <label htmlFor="enquiry-phone" className="input-label">
                  Mobile Number / WhatsApp <span className="req-star">*</span>
                </label>
                <div className="phone-input-row" style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                  <select
                    id="enquiry-country-code"
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    className="editorial-select phone-code-select"
                    style={{
                      width: 'auto',
                      minWidth: '120px',
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
                      id="enquiry-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="93849 59626"
                      className="editorial-input"
                      aria-required="true"
                      aria-invalid={!!errors.phone}
                      autoComplete="tel-national"
                    />
                  </div>
                </div>
                {errors.phone && (
                  <span className="error-note" role="alert">
                    {errors.phone}
                  </span>
                )}
              </div>

              {/* Field 3: Project Details (Optional) */}
              <div className="form-group">
                <label htmlFor="enquiry-details" className="input-label">
                  Project Details <span className="opt-tag">(Optional)</span>
                </label>
                <textarea
                  id="enquiry-details"
                  name="projectDetails"
                  value={formData.projectDetails}
                  onChange={handleChange}
                  placeholder="Briefly tell me what you need."
                  rows={4}
                  className="editorial-textarea"
                ></textarea>
              </div>

              {/* Single Prominent Lime-Green Submit Button */}
              <div className="enquiry-submit-row" style={{ marginTop: '0.75rem' }}>
                <button
                  ref={magneticSubmitBtnRef}
                  type="submit"
                  className="btn-enquiry-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span>PREPARING ENQUIRY...</span>
                  ) : (
                    <span>Send Enquiry ↗</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
