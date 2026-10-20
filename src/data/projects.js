/**
 * Project and Studio Data Store — Charles Naveen
 * 
 * Strict Verification Standards:
 * - Bexley LifeScience: Single confirmed completed client project.
 * - D-wings, Evara Aesthetics, LARA Smiles, Jeeva Jee Builders: Explicitly designated as demonstration concepts.
 * - No fabricated client testimonials, stats, or metrics.
 */

export const featuredProject = {
  id: 'bexley-lifescience',
  number: '01',
  title: 'Bexley LifeScience',
  category: 'PHARMACEUTICAL DISTRIBUTION · CORPORATE WEBSITE',
  status: 'COMPLETED CLIENT BUILD',
  isFeatured: true,
  url: 'https://bexleylifescience.com',
  image: '/images/projects/bexley-hero.png',
  imageAlt: 'Bexley LifeScience live corporate pharmaceutical distribution interface',
  tagline: 'Reliable pharmaceutical distribution across Tamil Nadu, presented with corporate clarity.',
  description:
    'A completed corporate website project focused on presenting the business, organizing pharmaceutical product information, and creating a professional online presence.',
  clientContext:
    'Bexley LifeScience required a modern, trustworthy digital presence to showcase their wholesale distribution network, pharmaceutical catalog, and hospital partnership workflows.',
  technicalHighlights: [
    'Modular React component architecture with zero external UI bloat',
    'Streamlined pharmaceutical product catalog information architecture',
    'Responsive interface engineered for seamless viewing on mobile, tablet, and desktop',
    'Direct business enquiry dispatch routing for retail pharmacists and hospital procurement'
  ],
  deliverables: [
    'Corporate online presence & brand presentation',
    'Pharmaceutical product information architecture',
    'Responsive cross-device interface',
    'Direct business enquiry routing'
  ],
  year: '2025 – 2026',
  badgeClass: 'status-completed'
};

export const demoProjects = [
  {
    id: 'dwings-fashion',
    number: '02',
    title: 'D-wings Fashion',
    category: 'FASHION · WEBSITE CONCEPT',
    status: 'DEMONSTRATION CONCEPT',
    url: 'https://d-wings.vercel.app',
    image: '/images/projects/dwings.png',
    imageAlt: 'D-wings Fashion boutique website concept showcase',
    tagline: 'The poetry of handcrafted bridal and stage couture presented through high-fashion editorial layouts.',
    description:
      'A fashion boutique website concept focused on product presentation, brand identity, and a clean browsing experience.',
    clientContext:
      'Designed to test how high-end bridal couture and bespoke stage atelier collections can be showcased with editorial whitespace and subtle typography.',
    focusAreas: [
      'Visual storytelling for designer atelier couture and bridal blouses',
      'Editorial lookbook & collection layout with cinematic hero framing',
      'Refined typographic hierarchy optimized for luxury apparel presentation'
    ],
    ctaText: 'VIEW LIVE DEMO ↗',
    badgeClass: 'status-demo'
  },
  {
    id: 'evara-aesthetics',
    number: '03',
    title: 'Evara Aesthetics',
    category: 'AESTHETICS · WHITE-THEME CONCEPT',
    status: 'DEMONSTRATION CONCEPT',
    url: 'https://demo-evara-aesthetic-white-theme.vercel.app/',
    image: '/images/projects/evara.png',
    imageAlt: 'Evara Aesthetics clinic white-theme minimalist website interface',
    tagline: 'Minimalist medical aesthetics balancing clinical authority with serene visual elegance.',
    description:
      'A premium aesthetics website concept exploring a clean visual identity, refined typography, and an elegant presentation of services.',
    clientContext:
      'An exploration of clean clinical aesthetics, organizing multidimensional dental, skin, and hair services into accessible, high-trust consultation pathways.',
    focusAreas: [
      'Minimalist medical aesthetic art direction with spacious white themes',
      'Structured dental, skin, and hair treatment pathways',
      'Frictionless patient consultation enquiry flow'
    ],
    ctaText: 'VIEW LIVE DEMO ↗',
    badgeClass: 'status-demo'
  },
  {
    id: 'lara-smiles',
    number: '04',
    title: 'LARA Smiles',
    category: 'DENTAL · WEBSITE CONCEPT',
    status: 'DEMONSTRATION CONCEPT',
    url: 'https://lara-smiles-dental-clinic.vercel.app',
    image: '/images/projects/lara.png',
    imageAlt: 'LARA Smiles dental clinic appointment and treatment portal concept',
    tagline: 'Modern dental healthcare presenting procedures clearly and inviting confident appointment bookings.',
    description:
      'A dental clinic website concept designed to present treatments clearly and make essential clinic information and appointment enquiries accessible.',
    clientContext:
      'A patient-first healthcare experience created to demystify complex orthodontic and cosmetic procedures while keeping appointment bookings front and center.',
    focusAreas: [
      'Clear dental treatment categorization & doctor profiles',
      'Appointment booking enquiry workflows and clinic contact routing',
      'Accessible, reassuring patient-first UX with clear contrast'
    ],
    ctaText: 'VIEW LIVE DEMO ↗',
    badgeClass: 'status-demo'
  },
  {
    id: 'jeeva-jee-builders',
    number: '05',
    title: 'Jeeva Jee Builders',
    category: 'CONSTRUCTION · OUTREACH CONCEPT',
    status: 'OUTREACH DEMONSTRATION CONCEPT',
    url: 'https://jeeva-jee-builders.vercel.app',
    image: '/images/projects/jeeva.png',
    imageAlt: 'Jeeva Jee Builders residential construction website concept',
    tagline: 'Bold, structured digital presence for residential villa builders and turnkey architectural projects.',
    description:
      'A construction business website concept focused on presenting building services, showcasing work, and establishing a professional digital presence.',
    clientContext:
      'Developed as an outreach concept for regional builders, proving how transparent pricing, 3D renderings, and direct WhatsApp integrations accelerate client inquiries.',
    focusAreas: [
      'Residential villa & construction service showcase',
      'Transparent specification presentation and warranty communication',
      'Direct WhatsApp and call enquiry integration for local homebuyers'
    ],
    ctaText: 'VIEW LIVE DEMO ↗',
    badgeClass: 'status-outreach'
  }
];

export const services = [
  {
    number: '01',
    title: 'BUSINESS WEBSITES',
    tag: 'Custom Development',
    description:
      'Professional websites for local businesses, service providers, and growing companies.',
    details:
      'Engineered from scratch using modern web standards. Structured to present your brand with authority, answer customer questions quickly, and convert traffic into qualified inquiries.',
    deliverables: ['Custom React / Modern Stack', 'Mobile-Perfect Layouts', 'Content Architecture', 'Deployment & Hosting Setup']
  },
  {
    number: '02',
    title: 'CAMPAIGN LANDING PAGES',
    tag: 'Conversion Focus',
    description:
      'Focused pages for campaigns, services, product launches, and lead generation.',
    details:
      'Built specifically around high-intent visitor action. Lightning-fast load times, distraction-free copywriting hierarchy, and seamless integration with your tracking and analytics.',
    deliverables: ['Rapid Turnaround', 'A/B Test Ready Structure', 'Direct WhatsApp / Form Hooks', 'Sub-second Load Times']
  },
  {
    number: '03',
    title: 'WEBSITE REDESIGN & MODERNIZATION',
    tag: 'Visual Upgrade',
    description:
      'Improvements to visual consistency, navigation, responsiveness, usability, and content structure.',
    details:
      'Transform outdated, slow, or cluttered websites into sleek, contemporary web assets that match the true quality of your business.',
    deliverables: ['Brand Consistency Audit', 'Mobile Usability Overhaul', 'Speed Optimization', 'Cleaner Information Flow']
  },
  {
    number: '04',
    title: 'TECHNICAL SEO & PERFORMANCE',
    tag: 'Core Web Vitals',
    description:
      'Technical website foundations, metadata, sitemap configuration, indexability, and performance improvements.',
    details:
      'Ensuring Google and modern crawlers can discover, index, and render your site with optimal Core Web Vitals (LCP, INP, CLS) and clean structured metadata.',
    deliverables: ['Semantic HTML5 Hierarchy', 'Open Graph / Meta Configuration', 'Asset Compression', 'Sitemap & Robots.txt']
  },
  {
    number: '05',
    title: 'WEBSITE INTEGRATIONS',
    tag: 'Frictionless Workflows',
    description:
      'Contact forms, WhatsApp integration, appointment enquiry workflows, and selected third-party integrations.',
    details:
      'Connecting your website directly to your daily communication channels so you never miss an incoming lead or booking.',
    deliverables: ['WhatsApp Click-to-Chat', 'Custom Form Validation', 'Appointment Scheduling Links', 'Analytics & Pixel Integration']
  }
];

export const agencyCollaboration = {
  eyebrow: 'FOR DIGITAL MARKETING AGENCIES',
  headline: 'Your strategy. My development. One reliable partnership.',
  body:
    'I collaborate with digital marketing agencies that need dependable website development support for their clients. From landing pages to complete business websites, I help turn project requirements and design direction into responsive, functional websites.',
  capabilities: [
    {
      title: 'White-Label Website Development',
      desc: 'Seamless execution under your agency brand with strict NDA compliance and zero client interference.'
    },
    {
      title: 'High-Conversion Campaign Pages',
      desc: 'Fast turnarounds on responsive landing pages built for paid media, ad funnels, and lead generation.'
    },
    {
      title: 'Client Website Redesigns',
      desc: 'Modernizing outdated client sites into contemporary, responsive web experiences that reinforce your agency pitch.'
    },
    {
      title: 'Responsive & Usability Bug Fixes',
      desc: 'Solving stubborn layout shifts, mobile responsiveness bugs, and cross-browser glitches across existing codebases.'
    },
    {
      title: 'Technical SEO Foundations',
      desc: 'Clean semantic markup, optimized Core Web Vitals, and accurate metadata to give your SEO campaigns a solid technical base.'
    },
    {
      title: 'Overflow Development Support',
      desc: 'On-demand bandwidth when your internal team is at capacity, delivered with clean git version control.'
    }
  ],
  partnershipValues: [
    {
      title: 'Direct & Honest Communication',
      desc: 'Realistic timelines, proactive status updates, and no sudden surprises.'
    },
    {
      title: 'Clean, Maintainable Code',
      desc: 'Modular, well-commented codebases that your agency team can easily maintain after handoff.'
    },
    {
      title: 'Strict Schedule Adherence',
      desc: 'Delivering milestones on agreed dates so your agency client relationships stay strong.'
    }
  ]
};

export const workingProcess = [
  {
    step: '01',
    phase: 'ALIGNMENT',
    title: 'Discover',
    description: 'Understand the business, audience, objectives, and requirements.',
    action: 'We clarify the target audience, brand personality, core conversion goals, and technical scope before touching code.'
  },
  {
    step: '02',
    phase: 'ARCHITECTURE',
    title: 'Plan',
    description: 'Establish the page structure, content hierarchy, and user journey.',
    action: 'We establish the information architecture, section blueprints, and key user actions to ensure clear communication.'
  },
  {
    step: '03',
    phase: 'CRAFT',
    title: 'Develop',
    description: 'Build the responsive website and implement the agreed functionality.',
    action: 'Writing semantic HTML, responsive CSS, and clean React component code with accessible, high-performance behavior.'
  },
  {
    step: '04',
    phase: 'DELIVERY',
    title: 'Refine',
    description: 'Test across devices, resolve agreed issues, and prepare the website for deployment.',
    action: 'Comprehensive viewport testing across real mobile, tablet, and desktop viewports, SEO validation, and deployment.'
  }
];

export const developerBio = {
  name: 'Charles Naveen',
  title: 'Freelance Web Developer',
  qualification: 'B.Sc. in Computer Science',
  location: 'Tamil Nadu, India',
  eyebrow: 'A LITTLE ABOUT ME',
  headline: 'Independent by choice. Collaborative by nature.',
  paragraphs: [
    "I'm Charles Naveen, a freelance web developer with a B.Sc. in Computer Science. I build websites for businesses that want a professional online presence and work with teams that need practical development support.",
    "My approach combines thoughtful design, responsive implementation, and a focus on the people who will actually use the website.",
    "I believe good websites should look considered, communicate clearly, and make everyday interactions easier."
  ],
  pillars: [
    {
      label: 'Design-Minded Engineering',
      desc: 'I bridge the gap between creative visual art direction and robust, maintainable React frontend development.'
    },
    {
      label: 'Performance & Accessibility First',
      desc: 'Fast initial rendering, semantic HTML tags, keyboard navigation, and zero unnecessary script bloat.'
    },
    {
      label: 'Pragmatic & Dependable Delivery',
      desc: 'Honest communication, transparent scope, and clean code that is easy to extend as a business grows.'
    }
  ]
};
