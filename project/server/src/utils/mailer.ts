import nodemailer from 'nodemailer';

// Simple mailer using SMTP (can be configured for SendGrid/SES/Mailgun SMTP)
// Configure in server/.env:
// SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM, MAIL_FROM_NAME

export function createTransport() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error('SMTP is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for others
    auth: { user, pass },
  });
}

export function getFrom() {
  const fromEmail = process.env.MAIL_FROM || 'no-reply@example.com';
  const fromName = process.env.MAIL_FROM_NAME || 'Tinku & Co.';
  return `${fromName} <${fromEmail}>`;
}