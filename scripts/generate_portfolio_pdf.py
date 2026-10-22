import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image as RLImage, KeepTogether, PageBreak, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super(NumberedCanvas, self).showPage()
        super(NumberedCanvas, self).save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        # Top accent bar on each page
        self.setFillColor(colors.HexColor("#11120D"))
        self.rect(0, 782, 612, 10, fill=1, stroke=0)
        self.setFillColor(colors.HexColor("#D8F33A"))
        self.rect(36, 782, 40, 10, fill=1, stroke=0)
        
        # Bottom footer bar
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#6B6960"))
        self.drawString(36, 25, "Charles Naveen — Freelance Web Developer | charlesportfolio-self.vercel.app")
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(612 - 36, 25, page_str)
        self.setStrokeColor(colors.HexColor("#DED9CE"))
        self.setLineWidth(0.5)
        self.line(36, 38, 612 - 36, 38)
        self.restoreState()

def build_pdf():
    pdf_path = "public/charles-naveen-portfolio.pdf"
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=42,
        bottomMargin=48
    )

    styles = getSampleStyleSheet()
    
    # Custom palette
    c_dark = colors.HexColor("#11120D")
    c_cream = colors.HexColor("#F5F0E8")
    c_lime = colors.HexColor("#D8F33A")
    c_lime_dark = colors.HexColor("#6B7A0E")
    c_gray_bg = colors.HexColor("#F9F7F2")
    c_gray_border = colors.HexColor("#E2DDD3")
    c_muted = colors.HexColor("#5C5A52")
    c_primary = colors.HexColor("#1A1A18")
    c_client_badge = colors.HexColor("#107E3E")

    # Typography styles
    style_kicker = ParagraphStyle(
        'Kicker',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=10,
        textColor=c_lime_dark,
        textTransform='uppercase',
        spaceAfter=4
    )
    
    style_h1 = ParagraphStyle(
        'MainTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=c_dark,
        spaceAfter=4
    )
    
    style_tagline = ParagraphStyle(
        'Tagline',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=c_dark,
        spaceAfter=10
    )

    style_body = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=c_primary,
        spaceAfter=8
    )
    
    style_body_muted = ParagraphStyle(
        'BodyMuted',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=c_muted,
        spaceAfter=4
    )

    style_section_h = ParagraphStyle(
        'SectionHeading',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=15,
        textColor=c_dark,
        spaceBefore=10,
        spaceAfter=6
    )

    style_box_title = ParagraphStyle(
        'BoxTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=13,
        textColor=c_dark,
        spaceAfter=3
    )

    story = []

    # ================= PAGE 1 =================
    # Header block table
    header_data = [
        [
            Paragraph("<b>CHARLES NAVEEN</b><br/><font size='10' color='#5C5A52'>Freelance Web Developer</font>", style_h1),
            Paragraph(
                "<b>Location:</b> Tamil Nadu, India · Remote Worldwide<br/>"
                "<b>Portfolio:</b> <a href='https://charlesportfolio-self.vercel.app' color='#107E3E'>charlesportfolio-self.vercel.app</a><br/>"
                "<b>Email:</b> charles.webdev@example.com<br/>"
                "<b>WhatsApp:</b> +91 90000 00000",
                style_body_muted
            )
        ]
    ]
    t_header = Table(header_data, colWidths=[320, 220])
    t_header.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_header)

    story.append(HRFlowable(width="100%", thickness=1, color=c_gray_border, spaceBefore=4, spaceAfter=12))

    # Core Positioning Headline
    story.append(Paragraph("CORE POSITIONING &amp; VALUE", style_kicker))
    story.append(Paragraph("Websites built to turn business attention into enquiries.", style_tagline))
    story.append(Paragraph(
        "I design and develop modern, responsive websites for businesses and partner with marketing agencies "
        "to deliver polished digital experiences, reliable functionality, and performance-focused implementations. "
        "Every project is crafted using clean, modular React and modern web standards with zero template bloat.",
        style_body
    ))

    story.append(Spacer(1, 8))

    # Two column: Core Services & Agency Partnership
    services_text = (
        "<b>01. Business Website Development</b><br/>"
        "<font size='8' color='#5C5A52'>Custom multi-page websites for companies, healthcare, and service providers. (Starting from ₹20,000 indicative)</font><br/><br/>"
        "<b>02. Campaign Landing Pages</b><br/>"
        "<font size='8' color='#5C5A52'>High-conversion single pages built for paid media, ad funnels, and product launches. (Custom quotation)</font><br/><br/>"
        "<b>03. Website Redesign &amp; UI Modernization</b><br/>"
        "<font size='8' color='#5C5A52'>Transform outdated or slow websites into sleek, responsive digital assets with clear information hierarchy.</font><br/><br/>"
        "<b>04. Technical SEO &amp; Core Web Vitals</b><br/>"
        "<font size='8' color='#5C5A52'>Sub-second load targets, zero layout shifts, semantic HTML5, and valid Open Graph / sitemap infrastructure.</font>"
    )

    agency_text = (
        "<b>WHITE-LABEL &amp; SUBCONTRACTING FOR AGENCIES</b><br/><br/>"
        "I provide reliable, behind-the-scenes web development support for digital marketing and creative agencies:<br/><br/>"
        "• <b>White-Label Development:</b> Clean delivery under your agency brand with strict NDA confidentiality.<br/>"
        "• <b>Rapid Ad Landing Pages:</b> Quick turnarounds on campaign pages built to convert your client traffic.<br/>"
        "• <b>Overflow Bandwidth:</b> Dependable subcontracting support when your in-house team is at capacity.<br/>"
        "• <b>Clean Handoffs:</b> Well-documented React component codebases with clean Git history.<br/><br/>"
        "<i>Quoted transparently by project scope, complexity, or ongoing workload.</i>"
    )

    col_table_data = [
        [
            Paragraph("<b>CORE SERVICE OFFERINGS</b>", style_box_title),
            Paragraph("<b>AGENCY PARTNERSHIPS</b>", style_box_title)
        ],
        [
            Paragraph(services_text, style_body_muted),
            Paragraph(agency_text, style_body_muted)
        ]
    ]
    t_cols = Table(col_table_data, colWidths=[265, 265])
    t_cols.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (0,-1), c_gray_bg),
        ('BACKGROUND', (1,0), (1,-1), colors.HexColor("#F3F5EB")),
        ('BOX', (0,0), (0,-1), 1, c_gray_border),
        ('BOX', (1,0), (1,-1), 1, colors.HexColor("#C9D49C")),
        ('PADDING', (0,0), (-1,-1), 10),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_cols)

    story.append(Spacer(1, 10))

    # Disciplined 5-Stage Project Process
    story.append(Paragraph("DISCIPLINED 5-STAGE WORKING PROCESS", style_kicker))
    process_data = [
        [
            Paragraph("<b>01. Discovery</b><br/><font size='7.5' color='#5C5A52'>Audience, objectives &amp; requirements.</font>", style_body_muted),
            Paragraph("<b>02. Scope &amp; Plan</b><br/><font size='7.5' color='#5C5A52'>Information flow &amp; deliverables.</font>", style_body_muted),
            Paragraph("<b>03. Build &amp; Craft</b><br/><font size='7.5' color='#5C5A52'>Responsive React &amp; CSS development.</font>", style_body_muted),
            Paragraph("<b>04. QA &amp; Test</b><br/><font size='7.5' color='#5C5A52'>Viewport, SEO &amp; speed validation.</font>", style_body_muted),
            Paragraph("<b>05. Deployment</b><br/><font size='7.5' color='#5C5A52'>Launch, live checks &amp; code handoff.</font>", style_body_muted)
        ]
    ]
    t_process = Table(process_data, colWidths=[106, 106, 108, 106, 108])
    t_process.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#FFFFFF")),
        ('BOX', (0,0), (-1,-1), 1, c_gray_border),
        ('INNERGRID', (0,0), (-1,-1), 0.5, c_gray_border),
        ('PADDING', (0,0), (-1,-1), 6),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_process)

    # Transparent quotation & timeline note
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        "<i>* Note on Quotations &amp; Timelines: Every proposal is tailored to project requirements, deliverables, and timeline. Delivery schedules (typically 1–3 weeks) depend on scope complexity, feature requirements, content readiness, and feedback cycles.</i>",
        style_body_muted
    ))

    # ================= PAGE 2 =================
    story.append(PageBreak())

    story.append(Paragraph("SELECTED WORK &amp; VERIFIED PROJECT CLASSIFICATIONS", style_kicker))
    story.append(Paragraph("Transparent Portfolio &amp; Case Evidence", style_h1))
    
    notice_text = (
        "<b>VERIFICATION INTEGRITY STANDARD:</b> Bexley LifeScience is my confirmed completed client build. "
        "All other featured projects are self-initiated concepts and demonstration systems designed to show "
        "domain-specific UX architecture, interaction craft, and responsive engineering without fabricating client claims."
    )
    t_notice = Table([[Paragraph(notice_text, style_body_muted)]], colWidths=[540])
    t_notice.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#EBF3FA")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#BCD6F0")),
        ('PADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_notice)
    story.append(Spacer(1, 10))

    # Project 1: Bexley LifeScience
    bexley_img = "public/images/projects/bexley-hero.png"
    bexley_desc = (
        "<b>01. BEXLEY LIFESCIENCE</b> &nbsp;&nbsp; "
        "<font color='#107E3E'><b>[ COMPLETED CLIENT BUILD ]</b></font><br/>"
        "<b>Industry:</b> Pharmaceutical Distribution &amp; Healthcare Supply<br/>"
        "<b>Live Site:</b> <a href='https://bexleylifescience.com' color='#107E3E'><b>bexleylifescience.com ↗</b></a><br/>"
        "<b>Challenge:</b> Required a modern, authoritative corporate web presence to showcase regional wholesale distribution across Tamil Nadu, organize a large pharmaceutical catalog, and route B2B procurement enquiries from retail pharmacists and hospital networks.<br/>"
        "<b>Delivered Scope:</b> Custom React component architecture, zero external UI bloat, clean product categorization, fully responsive cross-device layout, and verified direct inquiry dispatch."
    )
    
    p1_row = [
        RLImage(bexley_img, width=170, height=95) if os.path.exists(bexley_img) else Paragraph("Image", style_body),
        Paragraph(bexley_desc, style_body_muted)
    ]
    t_p1 = Table([p1_row], colWidths=[180, 360])
    t_p1.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BACKGROUND', (0,0), (-1,-1), c_gray_bg),
        ('BOX', (0,0), (-1,-1), 1, c_gray_border),
        ('PADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_p1)
    story.append(Spacer(1, 8))

    # Project 2: D-wings Fashion
    dwings_img = "public/images/projects/dwings.png"
    dwings_desc = (
        "<b>02. D-WINGS FASHION</b> &nbsp;&nbsp; "
        "<font color='#8A6200'><b>[ WEBSITE CONCEPT ]</b></font><br/>"
        "<b>Industry:</b> Haute Couture, Bridal Atelier &amp; Designer Apparel<br/>"
        "<b>Live Demo:</b> <a href='https://d-wings.vercel.app' color='#8A6200'><b>d-wings.vercel.app ↗</b></a><br/>"
        "<b>Concept Objective:</b> Showcase how artisanal bridal wear and stage couture can be presented with high-fashion editorial layouts, cinematic hero framing, and refined typographic contrast.<br/>"
        "<b>Implementation:</b> Lookbook gallery architecture, mobile-first luxury browsing flow, and direct WhatsApp customer consultation routing."
    )
    p2_row = [
        RLImage(dwings_img, width=170, height=95) if os.path.exists(dwings_img) else Paragraph("Image", style_body),
        Paragraph(dwings_desc, style_body_muted)
    ]
    t_p2 = Table([p2_row], colWidths=[180, 360])
    t_p2.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BACKGROUND', (0,0), (-1,-1), c_gray_bg),
        ('BOX', (0,0), (-1,-1), 1, c_gray_border),
        ('PADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_p2)
    story.append(Spacer(1, 8))

    # Project 3: Evara Aesthetics
    evara_img = "public/images/projects/evara.png"
    evara_desc = (
        "<b>03. EVARA AESTHETICS</b> &nbsp;&nbsp; "
        "<font color='#8A6200'><b>[ WEBSITE CONCEPT ]</b></font><br/>"
        "<b>Industry:</b> Clinical Aesthetics, Dermatology &amp; Cosmetic Care<br/>"
        "<b>Live Demo:</b> <a href='https://demo-evara-aesthetic-white-theme.vercel.app/' color='#8A6200'><b>demo-evara-aesthetic-white-theme.vercel.app ↗</b></a><br/>"
        "<b>Concept Objective:</b> Explore minimalist clinical aesthetics balancing medical authority with soothing visual elegance for dental, skin, and hair therapies.<br/>"
        "<b>Implementation:</b> Spacious white-theme art direction, structured multi-treatment pathways, and frictionless patient appointment consultation enquiry flows."
    )
    p3_row = [
        RLImage(evara_img, width=170, height=95) if os.path.exists(evara_img) else Paragraph("Image", style_body),
        Paragraph(evara_desc, style_body_muted)
    ]
    t_p3 = Table([p3_row], colWidths=[180, 360])
    t_p3.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BACKGROUND', (0,0), (-1,-1), c_gray_bg),
        ('BOX', (0,0), (-1,-1), 1, c_gray_border),
        ('PADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_p3)
    story.append(Spacer(1, 8))

    # Project 4: LARA Smiles Dental Clinic
    lara_img = "public/images/projects/lara.png"
    lara_desc = (
        "<b>04. LARA SMILES DENTAL CLINIC</b> &nbsp;&nbsp; "
        "<font color='#8A6200'><b>[ WEBSITE DEMO ]</b></font><br/>"
        "<b>Industry:</b> Modern Dental Healthcare &amp; Orthodontics<br/>"
        "<b>Live Demo:</b> <a href='https://lara-smiles-dental-clinic.vercel.app' color='#8A6200'><b>lara-smiles-dental-clinic.vercel.app ↗</b></a><br/>"
        "<b>Concept Objective:</b> Patient-first healthcare experience created to demystify complex dental treatments, highlight doctor credentials, and invite confident bookings.<br/>"
        "<b>Implementation:</b> Procedure categorization, accessible typography, high contrast, and direct appointment enquiry dispatch."
    )
    p4_row = [
        RLImage(lara_img, width=170, height=95) if os.path.exists(lara_img) else Paragraph("Image", style_body),
        Paragraph(lara_desc, style_body_muted)
    ]
    t_p4 = Table([p4_row], colWidths=[180, 360])
    t_p4.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BACKGROUND', (0,0), (-1,-1), c_gray_bg),
        ('BOX', (0,0), (-1,-1), 1, c_gray_border),
        ('PADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_p4)

    # ================= PAGE 3 =================
    story.append(PageBreak())

    story.append(Paragraph("TECHNICAL FOUNDATIONS &amp; COLLABORATION", style_kicker))
    story.append(Paragraph("Engineering Standards &amp; Contact", style_h1))
    
    # Project 5: Jeeva Jee Builders
    jeeva_img = "public/images/projects/jeeva.png"
    jeeva_desc = (
        "<b>05. JEEVA JEE BUILDERS</b> &nbsp;&nbsp; "
        "<font color='#8A6200'><b>[ WEBSITE CONCEPT ]</b></font><br/>"
        "<b>Industry:</b> Residential Construction, Architecture &amp; Turnkey Villas<br/>"
        "<b>Live Demo:</b> <a href='https://jeeva-jee-builders.vercel.app' color='#8A6200'><b>jeeva-jee-builders.vercel.app ↗</b></a><br/>"
        "<b>Concept Objective:</b> Demonstrate how transparent construction specifications, villa project galleries, and upfront warranty communication establish trust with regional prospective homeowners.<br/>"
        "<b>Implementation:</b> Structured project showcase cards, specification matrix, and instant WhatsApp enquiry integration."
    )
    p5_row = [
        RLImage(jeeva_img, width=170, height=95) if os.path.exists(jeeva_img) else Paragraph("Image", style_body),
        Paragraph(jeeva_desc, style_body_muted)
    ]
    t_p5 = Table([p5_row], colWidths=[180, 360])
    t_p5.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BACKGROUND', (0,0), (-1,-1), c_gray_bg),
        ('BOX', (0,0), (-1,-1), 1, c_gray_border),
        ('PADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_p5)
    story.append(Spacer(1, 14))

    # Technical Capabilities Box
    tech_data = [
        [
            Paragraph("<b>FRONTEND ENGINEERING</b><br/><font size='8' color='#5C5A52'>• React 18, Vite, ES6+ JavaScript<br/>• Semantic HTML5 &amp; WAI-ARIA standards<br/>• Modern responsive CSS (Grid, Flexbox, Clamp)<br/>• GSAP smooth motion &amp; scroll triggers<br/>• Zero framework UI bloat or fragile templates</font>", style_body_muted),
            Paragraph("<b>PERFORMANCE &amp; TECHNICAL SEO</b><br/><font size='8' color='#5C5A52'>• Sub-second Largest Contentful Paint target<br/>• Zero Cumulative Layout Shift (CLS)<br/>• Optimized image pipelines (WebP/PNG)<br/>• Open Graph / Twitter Card social metadata<br/>• XML sitemaps, robots.txt &amp; schema markup</font>", style_body_muted),
            Paragraph("<b>WORKFLOW &amp; HANDOFF</b><br/><font size='8' color='#5C5A52'>• Git version control &amp; clean commits<br/>• Vercel / Netlify / Custom DNS deployment<br/>• Direct WhatsApp &amp; Email inquiry hooks<br/>• Agency NDA confidentiality compliance<br/>• Transparent milestones &amp; async updates</font>", style_body_muted)
        ]
    ]
    t_tech = Table(tech_data, colWidths=[175, 185, 180])
    t_tech.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), c_gray_bg),
        ('BOX', (0,0), (-1,-1), 1, c_gray_border),
        ('INNERGRID', (0,0), (-1,-1), 0.5, c_gray_border),
        ('PADDING', (0,0), (-1,-1), 8),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(Paragraph("<b>CORE TECHNICAL CAPABILITIES</b>", style_box_title))
    story.append(t_tech)
    story.append(Spacer(1, 14))

    # Contact & Next Steps Box
    contact_box = [
        [
            Paragraph(
                "<b>READY TO DISCUSS A PROJECT OR AGENCY PARTNERSHIP?</b><br/><br/>"
                "Whether you are a business owner looking for a high-performing website or an agency needing dependable "
                "subcontracting development, let's schedule an initial discussion.<br/><br/>"
                "<b>Direct Email:</b> <a href='mailto:charles.webdev@example.com' color='#107E3E'>charles.webdev@example.com</a><br/>"
                "<b>WhatsApp Direct:</b> <a href='https://wa.me/919000000000' color='#107E3E'>+91 90000 00000</a><br/>"
                "<b>Live Web Portfolio:</b> <a href='https://charlesportfolio-self.vercel.app' color='#107E3E'>https://charlesportfolio-self.vercel.app</a><br/>"
                "<b>Response Time:</b> Within 24 business hours.",
                style_body
            )
        ]
    ]
    t_contact = Table(contact_box, colWidths=[540])
    t_contact.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F2F5E6")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#B5C478")),
        ('PADDING', (0,0), (-1,-1), 12),
    ]))
    story.append(t_contact)

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Successfully generated {pdf_path}")

if __name__ == "__main__":
    build_pdf()
