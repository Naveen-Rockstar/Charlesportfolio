import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { services } from '../data/projects';
import { gsap, prefersReducedMotion } from '../utils/motion';

export default function Services({ onSelectServiceForContact }) {
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const rootRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from('.services-section .section-header-wrap', {
        scrollTrigger: {
          trigger: '.services-section .section-header-wrap',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 35,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out'
      });

      // Staggered capability rows reveal
      gsap.from('.capability-row', {
        scrollTrigger: {
          trigger: '.capabilities-container',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.75,
        ease: 'power3.out'
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const capabilities = [
    {
      number: '01',
      title: 'FRONTEND DEVELOPMENT',
      subtitle: 'Modular architecture, component systems, and sub-second rendering.',
      description: 'Custom React and modern CSS architectures built without template bloat. Every view is engineered for fluid scaling across mobile, tablet, and widescreen displays with rock-solid semantic structure.',
      tags: ['React 18', 'Modern CSS', 'Vite', 'Fluid Layouts', 'Semantic HTML5', 'Clean Code'],
      deliverables: ['Custom React Component Architecture', 'Fluid Mobile-First Responsive Layouts', 'Zero Framework UI Bloat', 'Accessible Navigation']
    },
    {
      number: '02',
      title: 'DIGITAL EXPERIENCES & UI/UX',
      subtitle: 'Editorial art direction, typographic clarity, and intuitive interaction.',
      description: 'Transforming complex business offerings into clear, beautiful digital narratives. Focused on thoughtful visual hierarchy, micro-interactions, and frictionless user flows that hold attention.',
      tags: ['Art Direction', 'Design Systems', 'Micro-interactions', 'Editorial Typography', 'Figma to Code'],
      deliverables: ['Editorial Typographic Hierarchy', 'Interactive Prototyping & Motion', 'Conversion-Focused Layouts', 'High-Trust Aesthetic Direction']
    },
    {
      number: '03',
      title: 'BACKEND & WORKFLOW INTEGRATIONS',
      subtitle: 'Direct communication channels, forms, and third-party integrations.',
      description: 'Connecting websites directly to business operational channels. Direct WhatsApp dispatch, resilient email routing, appointment bookings, and seamless API integrations with zero server maintenance headaches.',
      tags: ['WhatsApp Business', 'Direct Form Dispatch', 'REST APIs', 'Custom Webhooks', 'Third-Party Tools'],
      deliverables: ['Instant WhatsApp Click-to-Chat', 'Failsafe Form Routing', 'Custom Enquiry Dispatch', 'Operational Tool Hooks']
    },
    {
      number: '04',
      title: 'TECHNICAL SEO & PERFORMANCE',
      subtitle: 'Core Web Vitals, sub-second LCP, and indexability for Google.',
      description: 'Ensuring your website passes Google Core Web Vitals with flying colors. Clean semantic markup, optimized asset pipelines, Open Graph social cards, and crawl-friendly sitemaps.',
      tags: ['Core Web Vitals', 'Sub-second LCP', 'Lighthouse 90+', 'Clean Metadata', 'Open Graph'],
      deliverables: ['Google Core Web Vitals Auditing', 'Sub-second Initial Paint', 'Structured Schema & Open Graph', 'Zero Layout Shift (CLS)']
    },
    {
      number: '05',
      title: 'AI AUTOMATION & AGENTS',
      subtitle: 'Intelligent automation, autonomous agents, and smart workflows.',
      description: 'Practical AI integration for forward-looking businesses. Custom agents, automated enquiry qualification, and workflow integrations designed to save hours of manual repetitive work.',
      tags: ['AI Agents', 'Workflow Automation', 'Smart Dispatch', 'LLM Integrations'],
      deliverables: ['Custom AI Agent Architectures', 'Automated Lead Triage', 'Workflow Scripting', 'API-Driven Automations']
    }
  ];

  return (
    <section id="services" ref={rootRef} className="services-section" aria-label="Capabilities and Services">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-wrap">
          <div className="section-pretitle">
            <span className="studio-tag">WHAT I WORK WITH</span>
            <span style={{ color: 'var(--border-medium)' }}>/</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
              CORE DISCIPLINES
            </span>
          </div>
          <h2 className="section-title-large">
            WHAT I WORK WITH
          </h2>
          <p className="section-lead">
            A focused toolkit designed for modern businesses, founders, and digital marketing agencies.
            Every capability is built around clarity, speed, and real-world utility.
          </p>
        </div>

        {/* Interactive Capability Rows (Demo.mp4 Style) */}
        <div className="capabilities-container" role="list">
          {capabilities.map((item, idx) => {
            const isActive = activeServiceIndex === idx;
            return (
              <div
                key={item.number}
                className={`capability-row ${isActive ? 'is-active' : ''}`}
                onClick={() => setActiveServiceIndex(idx)}
                onMouseEnter={() => setActiveServiceIndex(idx)}
                tabIndex={0}
                role="listitem"
                aria-expanded={isActive}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveServiceIndex(idx);
                  }
                }}
              >
                <div className="capability-row-main">
                  <div className="capability-identity">
                    <span className="capability-num">{item.number}</span>
                    <h3 className="capability-title">{item.title}</h3>
                  </div>

                  <div className="capability-tags-strip" aria-label={`${item.title} technologies`}>
                    {item.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="capability-tag-pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Expanded Details Panel */}
                <div className="capability-expand-drawer">
                  <div className="capability-drawer-inner">
                    <div className="capability-drawer-content">
                      <p className="capability-drawer-desc">{item.description}</p>
                      
                      <div className="capability-deliverables-group">
                        <span className="capability-deliverables-title">WHAT I DELIVER:</span>
                        <div className="capability-deliverables-grid">
                          {item.deliverables.map((del, dIdx) => (
                            <div key={dIdx} className="capability-deliverable-item">
                              <CheckCircle2 size={14} className="capability-check-icon" aria-hidden="true" />
                              <span>{del}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="capability-drawer-action">
                      <button
                        type="button"
                        className="btn-capability-enquire"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onSelectServiceForContact) onSelectServiceForContact();
                        }}
                      >
                        <span>ENQUIRE ABOUT THIS</span>
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
