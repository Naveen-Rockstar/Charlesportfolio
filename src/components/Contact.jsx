import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, ArrowRight, Mail, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { contactConfig } from '../data/contactConfig';
import { useMagnetic } from '../hooks/useMagnetic';
import { gsap, prefersReducedMotion } from '../utils/motion';

export default function Contact({ defaultIntent = 'direct' }) {
  const rootRef = useRef(null);
  const [intent, setIntent] = useState(defaultIntent);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Banner headline reveal (WRITE ME ->)
      gsap.from('.contact-banner-head', {
        scrollTrigger: {
          trigger: '.contact-banner-head',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      // Animated arrow slide
      gsap.from('.contact-arrow-huge', {
        scrollTrigger: {
          trigger: '.contact-huge-title-row',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        x: -40,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.7)'
      });

      // Split layout: Channels & Form entrance
      gsap.from('.contact-info-card', {
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

      gsap.from('.contact-form-container', {
        scrollTrigger: {
          trigger: '.contact-layout-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 45,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);
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
    <section id="contact" ref={rootRef} className="contact-dark-section" aria-label="Contact Charles Naveen">
      <div className="container">
        {/* Massive Headline Banner (Demo.mp4 Style: WRITE ME ->) */}
        <div className="contact-banner-head">
          <div className="contact-meta-eyebrow">
            <span className="contact-live-dot" aria-hidden="true"></span>
            <span>AVAILABLE FOR COMMISSIONED WORK &amp; AGENCY PARTNERSHIPS</span>
          </div>

          <div className="contact-huge-title-row">
            <h2 className="contact-monument-heading">
              WRITE ME <span className="contact-arrow-huge">→</span>
            </h2>
          </div>
          <p className="contact-subheading">
            LET'S BUILD SOMETHING MEANINGFUL.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="contact-layout-grid">
          {/* Left Column: Direct Communication Channels */}
          <div className="contact-info-col">
            <div className="contact-info-card">
              <span className="contact-card-label">DIRECT COMMUNICATION CHANNELS</span>
              
              <p className="contact-editorial-copy">
                Have a project in mind, need a quote, or want to discuss an ongoing agency partnership?
                Reach out directly via email or WhatsApp for a response within 24 business hours.
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
                <span className="channel-value-text">{contactConfig.location} · Global Remote</span>
              </div>

              <div className="contact-channel-item">
                <span className="channel-tag-label">ESTIMATED RESPONSE</span>
                <span className="channel-value-text highlight-lime">{contactConfig.responseTime}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Consultation Form */}
          <div className="contact-form-col">
            <div className="contact-form-container">
              {/* Intent Switcher Tabs */}
              <div className="form-intent-tabs" role="tablist" aria-label="Enquiry Intent">
                <button
                  type="button"
                  role="tab"
                  aria-selected={intent === 'direct'}
                  className={`intent-tab-pill ${intent === 'direct' ? 'is-active' : ''}`}
                  onClick={() => handleIntentChange('direct')}
                >
                  Direct Client Project
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={intent === 'agency'}
                  className={`intent-tab-pill ${intent === 'agency' ? 'is-active' : ''}`}
                  onClick={() => handleIntentChange('agency')}
                >
                  Agency Collaboration
                </button>
              </div>

              {submittedData ? (
                <div className="form-success-box" role="status" aria-live="polite">
                  <div className="success-icon-wrap">
                    <CheckCircle2 size={32} color="#D8F33A" />
                  </div>
                  <h3 className="success-heading">Inquiry Formatted &amp; Ready</h3>
                  <p className="success-subtext">
                    Thank you, <strong>{submittedData.name}</strong>. To guarantee direct delivery without
                    relying on server queues, select your preferred dispatch route below:
                  </p>

                  <div className="success-action-buttons">
                    <a
                      href={generateMailtoLink()}
                      className="btn-success-primary"
                    >
                      <Mail size={16} aria-hidden="true" />
                      <span>DISPATCH VIA EMAIL</span>
                    </a>
                    <a
                      href={generateWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-success-secondary"
                    >
                      <MessageSquare size={16} aria-hidden="true" />
                      <span>OPEN IN WHATSAPP</span>
                    </a>
                  </div>

                  <div className="success-reset-row">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="btn-reset-form"
                    >
                      Submit Another Inquiry ↺
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="contact-form-element">
                  <div className="form-fields-row">
                    <div className="form-group">
                      <label htmlFor="name" className="input-label">
                        Your Name <span className="req-star">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Alex Morgan"
                        className="dark-studio-input"
                        aria-required="true"
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && <span className="error-note">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="email" className="input-label">
                        Email Address <span className="req-star">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="alex@company.com"
                        className="dark-studio-input"
                        aria-required="true"
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && <span className="error-note">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="form-fields-row">
                    <div className="form-group">
                      <label htmlFor="company" className="input-label">
                        Company or Brand
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="e.g. Acme Studio"
                        className="dark-studio-input"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="projectType" className="input-label">
                        Requirement Type
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className="dark-studio-select"
                      >
                        {intent === 'direct' ? (
                          <>
                            <option value="business-website">New Business Website</option>
                            <option value="landing-page">High-Conversion Landing Page</option>
                            <option value="website-redesign">Website Redesign &amp; Speed</option>
                            <option value="technical-seo">Technical SEO &amp; Core Web Vitals</option>
                            <option value="ai-automation">AI Automation / Integration</option>
                            <option value="custom-inquiry">Custom Development</option>
                          </>
                        ) : (
                          <>
                            <option value="agency-collaboration">White-Label Development Partnership</option>
                            <option value="agency-landing-pages">Agency Client Landing Pages</option>
                            <option value="agency-redesigns">Client Website Redesigns</option>
                            <option value="agency-overflow">Overflow Development Bandwidth</option>
                          </>
                        )}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="description" className="input-label">
                      Project Brief <span className="req-star">*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder={
                        intent === 'agency'
                          ? "Tell me about your agency, your typical client projects, and what development support you need..."
                          : "Describe your business, current website status, project goals, and estimated timeline..."
                      }
                      rows={5}
                      className="dark-studio-textarea"
                      aria-required="true"
                      aria-invalid={!!errors.description}
                    ></textarea>
                    {errors.description && <span className="error-note">{errors.description}</span>}
                  </div>

                  <button
                    ref={magneticSubmitBtnRef}
                    type="submit"
                    className="btn-dark-submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span>FORMATTING INQUIRY...</span>
                    ) : (
                      <>
                        <span>{intent === 'agency' ? 'DISCUSS AGENCY PARTNERSHIP' : 'SEND PROJECT INQUIRY'}</span>
                        <ArrowUpRight size={16} aria-hidden="true" />
                      </>
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
