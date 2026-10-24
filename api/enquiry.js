import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Default Supabase project URL for Charles Naveen Portfolio
const DEFAULT_SUPABASE_URL = 'https://eawlkwgsedswftjaqfaf.supabase.co';
const DEFAULT_TO_EMAIL = 'naveen.charles03@gmail.com';
const DEFAULT_FROM_EMAIL = 'Charles Portfolio <onboarding@resend.dev>';

/**
 * Generates plain-text representation of the enquiry for email clients
 */
function generateEmailText({ name, email, phone, businessName, projectType, budget, message, createdAt }) {
  return [
    `========================================`,
    `NEW PROJECT ENQUIRY — CHARLES NAVEEN`,
    `========================================`,
    ``,
    `Client Name:   ${name}`,
    `Email:         ${email}`,
    `Phone:         ${phone}`,
    `Business:      ${businessName || 'Not specified'}`,
    `Project Type:  ${projectType || 'General Enquiry'}`,
    `Budget:        ${budget || 'Flexible / Discussion'}`,
    `Submitted At:  ${createdAt || new Date().toISOString()}`,
    ``,
    `Project Brief / Message:`,
    `----------------------------------------`,
    message || 'No project description provided.',
    ``,
    `----------------------------------------`,
    `Direct WhatsApp: https://wa.me/${phone.replace(/[^0-9]/g, '')}`,
    `Direct Reply:    mailto:${email}`,
    `========================================`
  ].join('\n');
}

/**
 * Generates modern, high-contrast HTML email template matching the portfolio design language
 */
function generateEmailHtml({ name, email, phone, businessName, projectType, budget, message, createdAt }) {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const formattedTime = new Date(createdAt || Date.now()).toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'UTC'
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Project Enquiry from ${escapeHtml(name)}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #0E0F0D;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #F4F3EE;
    }
    .wrapper {
      max-width: 620px;
      margin: 30px auto;
      background: #141612;
      border: 1px solid #2B2F25;
      border-radius: 12px;
      overflow: hidden;
    }
    .header {
      background-color: #1A1D17;
      padding: 24px 32px;
      border-bottom: 2px solid #D8F33A;
    }
    .eyebrow {
      font-family: 'SF Mono', Consolas, Monaco, monospace;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.1em;
      color: #D8F33A;
      text-transform: uppercase;
      margin-bottom: 6px;
    }
    .title {
      font-size: 20px;
      font-weight: 800;
      letter-spacing: -0.02em;
      color: #F4F3EE;
      margin: 0;
    }
    .body-content {
      padding: 32px;
    }
    .field-grid {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
    }
    .field-grid td {
      padding: 10px 0;
      border-bottom: 1px solid #252820;
      font-size: 14px;
      vertical-align: top;
    }
    .field-label {
      width: 35%;
      color: #8E9285;
      font-family: 'SF Mono', Consolas, Monaco, monospace;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .field-val {
      width: 65%;
      color: #F4F3EE;
      font-weight: 600;
    }
    .field-val a {
      color: #D8F33A;
      text-decoration: none;
    }
    .message-block {
      background-color: #0E0F0D;
      border: 1px solid #2B2F25;
      border-left: 3px solid #D8F33A;
      border-radius: 6px;
      padding: 16px 20px;
      margin: 20px 0 28px 0;
    }
    .message-heading {
      font-family: 'SF Mono', Consolas, Monaco, monospace;
      font-size: 11px;
      font-weight: 700;
      color: #8E9285;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-top: 0;
      margin-bottom: 10px;
    }
    .message-text {
      font-size: 14px;
      line-height: 1.6;
      color: #E2E1DA;
      white-space: pre-wrap;
      margin: 0;
    }
    .btn-row {
      margin-top: 24px;
      display: flex;
      gap: 12px;
    }
    .btn-primary {
      display: inline-block;
      background-color: #D8F33A;
      color: #0E0F0D !important;
      font-weight: 700;
      font-size: 13px;
      text-decoration: none;
      padding: 12px 20px;
      border-radius: 9999px;
      margin-right: 10px;
    }
    .btn-secondary {
      display: inline-block;
      background-color: #22261E;
      color: #F4F3EE !important;
      border: 1px solid #3A3F32;
      font-weight: 600;
      font-size: 13px;
      text-decoration: none;
      padding: 12px 20px;
      border-radius: 9999px;
    }
    .footer {
      padding: 20px 32px;
      background-color: #0E0F0D;
      border-top: 1px solid #2B2F25;
      font-family: 'SF Mono', Consolas, Monaco, monospace;
      font-size: 11px;
      color: #6C7063;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <div class="eyebrow">PORTFOLIO CLIENT ENQUIRY</div>
      <h1 class="title">New Project Request from ${escapeHtml(name)}</h1>
    </div>
    <div class="body-content">
      <table class="field-grid">
        <tr>
          <td class="field-label">Name</td>
          <td class="field-val"><strong>${escapeHtml(name)}</strong></td>
        </tr>
        <tr>
          <td class="field-label">Email</td>
          <td class="field-val"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td>
        </tr>
        <tr>
          <td class="field-label">Mobile / WhatsApp</td>
          <td class="field-val"><a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></td>
        </tr>
        ${businessName ? `
        <tr>
          <td class="field-label">Business / Brand</td>
          <td class="field-val">${escapeHtml(businessName)}</td>
        </tr>` : ''}
        ${projectType ? `
        <tr>
          <td class="field-label">Project Type</td>
          <td class="field-val"><span style="color:#D8F33A;">●</span> ${escapeHtml(projectType)}</td>
        </tr>` : ''}
        ${budget ? `
        <tr>
          <td class="field-label">Estimated Budget</td>
          <td class="field-val">${escapeHtml(budget)}</td>
        </tr>` : ''}
        <tr>
          <td class="field-label">Submission Date</td>
          <td class="field-val">${formattedTime} UTC</td>
        </tr>
      </table>

      <div class="message-block">
        <div class="message-heading">Project Scope / Requirements</div>
        <p class="message-text">${escapeHtml(message || 'No additional details provided.')}</p>
      </div>

      <div class="btn-row">
        <a href="mailto:${escapeHtml(email)}?subject=${encodeURIComponent('Regarding your project enquiry — Charles Naveen')}" class="btn-primary">
          Reply via Email →
        </a>
        ${cleanPhone ? `
        <a href="https://wa.me/${cleanPhone}" target="_blank" class="btn-secondary">
          Message on WhatsApp ↗
        </a>` : ''}
      </div>
    </div>
    <div class="footer">
      Captured securely via Charles Naveen Portfolio · Supabase Database
    </div>
  </div>
</body>
</html>
  `.trim();
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Primary Vercel Serverless Function Handler
 */
export default async function handler(req, res) {
  // CORS Configuration
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Preflight check
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Method check
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Only POST enquiries are accepted.'
    });
  }

  try {
    const payload = req.body || {};

    // 1. Honeypot Spam Protection
    // Hidden bot fields: if populated, silently accept without executing side effects
    if (payload.hp_company || payload._gotcha || payload.honeypot || payload.website_url_hp) {
      console.warn('[SPAM_BLOCKED] Honeypot field was filled. Dropping submission silently.');
      return res.status(200).json({
        success: true,
        message: 'Enquiry received successfully.'
      });
    }

    // 2. Sanitize & Validate Inputs
    const name = typeof payload.name === 'string' ? payload.name.trim() : '';
    const email = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : '';
    const phone = typeof payload.phone === 'string' ? payload.phone.trim() : '';
    const businessName = typeof payload.businessName === 'string' ? payload.businessName.trim() : '';
    const projectType = typeof payload.projectType === 'string' ? payload.projectType.trim() : '';
    const budget = typeof payload.budget === 'string' ? payload.budget.trim() : '';
    const message = typeof payload.message === 'string' ? payload.message.trim() : '';
    const source = typeof payload.source === 'string' ? payload.source.trim() : 'portfolio-form';

    // Field Length & Validation Rules
    if (!name || name.length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid name (at least 2 characters).'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.'
      });
    }

    const cleanPhone = phone.replace(/[\s\-()]/g, '');
    if (!cleanPhone || !/^\+?[0-9]{7,18}$/.test(cleanPhone)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid mobile or WhatsApp number (7–18 digits).'
      });
    }

    // 3. Supabase Integration
    const supabaseUrl = process.env.SUPABASE_URL || DEFAULT_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

    if (!supabaseKey) {
      console.error('[CONFIG_ERROR] SUPABASE_SERVICE_ROLE_KEY environment variable is missing.');
      return res.status(503).json({
        success: false,
        error: 'Backend integration pending: Missing Supabase service-role secret key. Please configure SUPABASE_SERVICE_ROLE_KEY in your Vercel project environment variables.'
      });
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    });

    const enquiryRecord = {
      name,
      email,
      phone,
      business_name: businessName || null,
      project_type: projectType || null,
      budget: budget || null,
      message: message || null,
      source,
      status: 'new'
    };

    const { data: insertedData, error: dbError } = await supabase
      .from('enquiries')
      .insert([enquiryRecord])
      .select('id, created_at, name, email')
      .single();

    if (dbError) {
      console.error('[DATABASE_ERROR] Failed to insert enquiry into Supabase:', dbError);
      return res.status(500).json({
        success: false,
        error: `Database insertion error: ${dbError.message || 'Check database permissions or schema.'}`
      });
    }

    const enquiryId = insertedData?.id;
    const createdAt = insertedData?.created_at || new Date().toISOString();

    // 4. Resend Email Notification Integration
    let emailSent = false;
    let emailError = null;
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        const toEmail = process.env.NOTIFICATION_TO_EMAIL || DEFAULT_TO_EMAIL;
        const fromEmail = process.env.NOTIFICATION_FROM_EMAIL || DEFAULT_FROM_EMAIL;

        const emailResult = await resend.emails.send({
          from: fromEmail,
          to: toEmail,
          replyTo: email,
          subject: `New Project Enquiry: ${name}${businessName ? ` (${businessName})` : ''}`,
          html: generateEmailHtml({
            name,
            email,
            phone,
            businessName,
            projectType,
            budget,
            message,
            createdAt
          }),
          text: generateEmailText({
            name,
            email,
            phone,
            businessName,
            projectType,
            budget,
            message,
            createdAt
          })
        });

        if (emailResult?.error) {
          console.error('[RESEND_ERROR] Resend returned an error:', emailResult.error);
          emailError = emailResult.error.message || 'Resend error';
        } else {
          emailSent = true;
          console.log('[NOTIFICATION_SUCCESS] Resend email dispatched for enquiry:', enquiryId);
        }
      } catch (err) {
        console.error('[EMAIL_EXCEPTION] Failed to dispatch Resend notification:', err);
        emailError = err.message;
      }
    } else {
      console.warn('[CONFIG_NOTICE] RESEND_API_KEY not configured. Email notification skipped.');
    }

    // 5. Successful Response
    return res.status(200).json({
      success: true,
      message: 'Enquiry successfully submitted and recorded.',
      enquiryId,
      emailSent,
      emailNotice: !resendApiKey ? 'RESEND_API_KEY not set yet' : emailError ? emailError : undefined
    });
  } catch (err) {
    console.error('[SERVER_ERROR] Unexpected error in enquiry handler:', err);
    return res.status(500).json({
      success: false,
      error: 'An unexpected server error occurred while processing your enquiry.'
    });
  }
}
