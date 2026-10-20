import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Mail, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { contactConfig } from '../data/contactConfig';
import { useMagnetic } from '../hooks/useMagnetic';

export default function Contact({ defaultIntent = 'direct' }) {
  const [intent, setIntent] = useState(defaultIntent);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: 'business-website',
    description: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const magneticSubmitBtnRef = useMagnetic(0.2);

  useEffect(() => {
    if (defaultIntent) {
      setIntent(defaultIntent);
      setFormData((prev) => ({
        ...prev,
        projectType: defaultIntent === 'agency' ? 'agency-collaboration' : 'business-website'
      }));
    }
  }, [defaultIntent]);

  const handleIntentChange = (newIntent) => {
    setIntent(newIntent);
    setFormData((prev) => ({
      ...prev,
      projectType: newIntent === 'agency' ? 'agency-collaboration' : 'business-website'
    }));
  };

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
      errs.name = 'Please provide your name.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please provide an email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.description.trim()) {
      errs.description = 'Please include a brief description of your requirements.';
    } else if (formData.description.trim().length < 10) {
      errs.description = 'Please write at least a few words about your project.';
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
      setSubmittedData({ ...formData, intent });
    }, 350);
  };

  const handleReset = () => {
    setSubmittedData(null);
    setFormData({
      name: '',
      email: '',
      company: '',
      projectType: intent === 'agency' ? 'agency-collaboration' : 'business-website',
      description: ''
    });
    setErrors({});
  };

  // Generate mailto link
  const generateMailtoLink = () => {
    if (!submittedData) return `mailto:${contactConfig.emailPlaceholder}`;
    const subject = encodeURIComponent(`Project Inquiry from ${submittedData.name} [${submittedData.projectType}]`);
    const body = encodeURIComponent(
      `Name: ${submittedData.name}\n` +
      `Email: ${submittedData.email}\n` +
      `Company: ${submittedData.company || 'N/A'}\n` +
      `Type: ${submittedData.projectType}\n\n` +
      `Project Brief:\n${submittedData.description}`
    );
    return `mailto:${contactConfig.emailPlaceholder}?subject=${subject}&body=${body}`;
  };

  // Generate WhatsApp link
  const generateWhatsAppLink = () => {
    if (!submittedData) return `https://wa.me/${contactConfig.whatsappPlaceholder}`;
    const text = encodeURIComponent(
      `Hi Charles Naveen, I submitted a project enquiry from your portfolio:\n` +
      `Name: ${submittedData.name}\n` +
      `Company: ${submittedData.company || 'N/A'}\n` +
      `Type: ${submittedData.projectType}\n` +
      `Brief: ${submittedData.description}`
    );
    return `https://wa.me/${contactConfig.whatsappPlaceholder}?text=${text}`;
  };

  return (
    <section id="contact" className="contact-section" aria-label="Contact Charles Naveen">
      <div className="container">
        <div className="contact-layout-grid">
          {/* Left Column: Direct Inquiries Info */}
          <div>
            <div className="section-pretitle">
              <span className="studio-tag">GET IN TOUCH</span>
              <span style={{ color: 'var(--border-medium)' }}>/</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                INITIATE PROJECT
              </span>
            </div>

            <h2 className="contact-hero-title">
              Have a good project in mind?{' '}
              <span className="italic-glow">Let's build it</span>.
            </h2>

            <p className="contact-lead-text">
              Whether you're looking to develop an authoritative business website or seeking a dependable
              white-label development partner for your agency, I'd be glad to discuss the project.
            </p>

            <div className="direct-channels-card">
              <span className="direct-channels-title">Direct Communication Channels</span>

              <div className="channel-entry">
                <span className="channel-tag">Direct Email</span>
                <a
                  href={`mailto:${contactConfig.emailPlaceholder}`}
                  className="channel-link-text"
                >
                  {contactConfig.emailPlaceholder}
                </a>
              </div>

              <div className="channel-entry">
                <span className="channel-tag">WhatsApp Direct</span>
                <a
                  href={`https://wa.me/${contactConfig.whatsappPlaceholder}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="channel-link-text"
                >
                  +{contactConfig.whatsappPlaceholder}
                </a>
              </div>

              <div className="channel-entry">
                <span className="channel-tag">Response Window</span>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', fontWeight: 600 }}>
                  {contactConfig.responseTime}
                </span>
              </div>

              <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-surface-elevated)', border: '1px dashed var(--border-medium)', marginTop: '0.5rem' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                  <strong>Developer Note:</strong> Contact email & WhatsApp are configured in{' '}
                  <code>src/data/contactConfig.js</code> for instant replacement with verified credentials.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="contact-form-card">
            {/* Intent Switcher Tabs */}
            <div className="form-intent-switch" role="tablist" aria-label="Enquiry Intent">
              <button
                type="button"
                role="tab"
                aria-selected={intent === 'direct'}
                className={`intent-pill-btn ${intent === 'direct' ? 'active' : ''}`}
                onClick={() => handleIntentChange('direct')}
              >
                Direct Client Project
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={intent === 'agency'}
                className={`intent-pill-btn ${intent === 'agency' ? 'active' : ''}`}
                onClick={() => handleIntentChange('agency')}
              >
                Agency Collaboration
              </button>
            </div>

            {submittedData ? (
              <div className="form-success-card" role="status" aria-live="polite">
                <h3 className="success-lead-title">Enquiry Ready for Dispatch</h3>
                <p className="success-message-text">
                  Thank you, <strong>{submittedData.name}</strong>. Your enquiry details have been formatted.
                  To ensure 100% delivery without reliance on server mail queues, dispatch directly through
                  your preferred channel:
                </p>

                <div className="success-fallbacks-row">
                  <a
                    href={generateMailtoLink()}
                    className="btn-magnetic-primary"
                  >
                    <Mail size={16} aria-hidden="true" />
                    <span>Send via Email Client</span>
                  </a>
                  <a
                    href={generateWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-magnetic-secondary"
                  >
                    <MessageSquare size={16} aria-hidden="true" />
                    <span>Open on WhatsApp</span>
                  </a>
                </div>

                <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-medium)' }}>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="kinetic-link"
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    Submit Another Inquiry ↺
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-split-row">
                  <div className="form-field-group">
                    <label htmlFor="name" className="field-label">
                      Your Name <span className="required-dot">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Morgan"
                      className="studio-input"
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && (
                      <span id="name-error" className="field-error-feedback">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div className="form-field-group">
                    <label htmlFor="email" className="field-label">
                      Email Address <span className="required-dot">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alex@company.com"
                      className="studio-input"
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <span id="email-error" className="field-error-feedback">
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-split-row">
                  <div className="form-field-group">
                    <label htmlFor="company" className="field-label">
                      Company or Brand
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Apex Digital / Studio"
                      className="studio-input"
                    />
                  </div>

                  <div className="form-field-group">
                    <label htmlFor="projectType" className="field-label">
                      Requirement Type
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="studio-select"
                    >
                      {intent === 'direct' ? (
                        <>
                          <option value="business-website">New Business Website</option>
                          <option value="landing-page">High-Conversion Landing Page</option>
                          <option value="website-redesign">Website Redesign & Speed</option>
                          <option value="technical-seo">Technical SEO & Core Web Vitals</option>
                          <option value="custom-inquiry">Custom Development</option>
                        </>
                      ) : (
                        <>
                          <option value="agency-collaboration">White-Label Development Partnership</option>
                          <option value="agency-landing-pages">Agency Client Landing Pages</option>
                          <option value="agency-redesigns">Client Redesigns</option>
                          <option value="agency-overflow">Overflow Development Bandwidth</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>

                <div className="form-field-group">
                  <label htmlFor="description" className="field-label">
                    Project Brief <span className="required-dot">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder={
                      intent === 'agency'
                        ? "Tell me about your agency, your typical client project scope, and what development support you are looking for..."
                        : "Describe your business, current website status, project goals, and estimated timeline..."
                    }
                    rows={5}
                    className="studio-textarea"
                    aria-required="true"
                    aria-invalid={!!errors.description}
                    aria-describedby={errors.description ? 'description-error' : undefined}
                  ></textarea>
                  {errors.description && (
                    <span id="description-error" className="field-error-feedback">
                      {errors.description}
                    </span>
                  )}
                </div>

                <button
                  ref={magneticSubmitBtnRef}
                  type="submit"
                  className="btn-magnetic-primary"
                  style={{ width: '100%' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span>FORMATTING INQUIRY...</span>
                  ) : (
                    <>
                      <span>{intent === 'agency' ? 'DISCUSS A PARTNERSHIP' : 'START A PROJECT'}</span>
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
