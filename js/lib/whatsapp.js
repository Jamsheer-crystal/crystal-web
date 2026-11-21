import { business } from '../config/business.js';

function digitsOnly(value) {
  return String(value || '').replace(/\D/g, '');
}

function isMobileDevice() {
  return typeof navigator !== 'undefined' && /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
}

export function getWhatsAppUrl(message = '') {
  const number = digitsOnly(business.whatsappNumber);
  if (!number) return '#';

  const text = message ? encodeURIComponent(message) : '';
  const query = text ? `?phone=${number}&text=${text}` : `?phone=${number}`;

  // Deep link opens the WhatsApp app directly on phones
  if (isMobileDevice()) {
    return text
      ? `whatsapp://send?phone=${number}&text=${text}`
      : `whatsapp://send?phone=${number}`;
  }

  // Desktop / tablet → WhatsApp Web / API redirect (prefilled chat)
  return `https://api.whatsapp.com/send${query}`;
}

/** Open WhatsApp immediately from a user click (avoids popup blockers). */
export function openWhatsApp(message = '') {
  const number = digitsOnly(business.whatsappNumber);
  if (!number) return;

  const url = getWhatsAppUrl(message);
  const webFallback = `https://api.whatsapp.com/send?phone=${number}${
    message ? `&text=${encodeURIComponent(message)}` : ''
  }`;

  if (isMobileDevice()) {
    window.location.href = url;
    // If the app isn't installed, fall back to the web URL shortly after
    window.setTimeout(() => {
      window.location.href = webFallback;
    }, 1200);
    return;
  }

  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function bookingMessage(serviceName = '') {
  const intro = `Hello ${business.name}, I would like to book a cleaning.`;
  if (serviceName) {
    return `${intro}\n\nService: ${serviceName}\n\nPlease share availability and next steps.`;
  }
  return `${intro}\n\nPlease share availability and next steps.`;
}

export function enquiryMessage({ name, phone, email, service, message }) {
  return [
    `New cleaning enquiry for ${business.name}`,
    '',
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    `Service: ${service}`,
    message ? `Message: ${message}` : null,
  ]
    .filter(Boolean)
    .join('\n');
}
