import { business } from '../config/business.js';

export function getWhatsAppUrl(message = '') {
  const number = String(business.whatsappNumber || '').replace(/\D/g, '');
  const base = `https://wa.me/${number}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
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
