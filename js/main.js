import { business } from './config/business.js';
import {
  about,
  faqs,
  features,
  gallery,
  services,
  steps,
  testimonials,
} from './config/content.js';
import { bookingMessage, enquiryMessage, getWhatsAppUrl } from './lib/whatsapp.js';

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

/** Prefix site assets with Vite base (needed for GitHub Pages `/crystal-web/`). */
function assetUrl(path) {
  if (!path) return '';
  if (/^(https?:|data:|blob:)/i.test(path)) return path;
  const base = import.meta.env.BASE_URL || '/';
  return `${base}${String(path).replace(/^\//, '')}`;
}

function iconSvg(name) {
  const icons = {
    users: `<path stroke-linecap="round" stroke-linejoin="round" d="M15 19.5a3.75 3.75 0 00-7.5 0M12 12.75a3 3 0 100-6 3 3 0 000 6zM19.5 19.5a3 3 0 00-2.4-2.94M4.5 19.5a3 3 0 012.4-2.94M16.5 9.75a2.25 2.25 0 10-2.12-3"/>`,
    check: `<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>`,
    calendar: `<path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 9.75h18M4.5 6.75h15A1.5 1.5 0 0121 8.25v11.25A1.5 1.5 0 0119.5 21h-15A1.5 1.5 0 013 19.5V8.25A1.5 1.5 0 014.5 6.75z"/>`,
    sparkle: `<path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"/>`,
    heart: `<path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>`,
    arrow: `<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>`,
  };

  return `<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true">${icons[name] || icons.sparkle}</svg>`;
}

function bindImageFallbacks(root = document) {
  root.querySelectorAll('img[data-fallback]').forEach((img) => {
    img.addEventListener('error', () => {
      img.classList.add('img-fallback');
      img.removeAttribute('src');
      img.alt = img.alt || 'Image unavailable';
    });
  });
}

function fillBrand() {
  document.querySelectorAll('[data-brand-name]').forEach((el) => {
    el.textContent = business.name;
  });
  document.querySelectorAll('[data-brand-tagline]').forEach((el) => {
    el.textContent = business.tagline;
  });
  document.querySelectorAll('[data-brand-description]').forEach((el) => {
    el.textContent = business.description;
  });
  document.querySelectorAll('[data-phone-display]').forEach((el) => {
    el.textContent = business.phoneDisplay;
  });
  document.querySelectorAll('a[data-phone-href]').forEach((el) => {
    el.href = business.phoneHref;
  });
  document.querySelectorAll('a[data-email-href]').forEach((el) => {
    el.href = `mailto:${business.email}`;
    if (el.dataset.emailText !== undefined) el.textContent = business.email;
  });
  document.querySelectorAll('[data-email-text]').forEach((el) => {
    el.textContent = business.email;
  });
  document.querySelectorAll('[data-address]').forEach((el) => {
    el.textContent = business.address;
  });
  document.querySelectorAll('[data-service-areas]').forEach((el) => {
    el.textContent = business.serviceAreas.join(' · ');
  });
  document.querySelectorAll('a[data-whatsapp-book]').forEach((el) => {
    const service = el.dataset.service || '';
    el.href = getWhatsAppUrl(bookingMessage(service));
    el.target = '_blank';
    el.rel = 'noopener noreferrer';
  });
  document.querySelectorAll('a[data-whatsapp-chat]').forEach((el) => {
    el.href = getWhatsAppUrl(`Hello ${business.name}, I have a question about your cleaning services.`);
    el.target = '_blank';
    el.rel = 'noopener noreferrer';
  });

  const socialMap = {
    facebook: business.social.facebook,
    instagram: business.social.instagram,
    linkedin: business.social.linkedin,
  };
  Object.entries(socialMap).forEach(([key, url]) => {
    document.querySelectorAll(`a[data-social="${key}"]`).forEach((el) => {
      if (url) {
        el.href = url;
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    });
  });
}

function renderServices() {
  const grid = document.getElementById('services-grid');
  if (!grid) return;

  grid.innerHTML = services
    .map((service, index) => {
      const number = String(index + 1).padStart(2, '0');
      const featuredClass = service.featured ? 'service-card--featured' : '';
      return `
      <article class="service-card group ${featuredClass}">
        <div class="service-media img-fallback">
          <img src="${escapeHtml(assetUrl(service.image))}" alt="${escapeHtml(service.alt)}" loading="lazy" data-fallback class="h-full w-full object-cover transition duration-700 group-hover:scale-110" width="800" height="600" />
        </div>
        <div class="service-body">
          <div class="service-meta">
            <span class="service-number">${number}</span>
            <span class="service-tag">${escapeHtml(service.tag || 'Cleaning')}</span>
          </div>
          <h3 class="service-title">${escapeHtml(service.title)}</h3>
          <p class="service-copy">${escapeHtml(service.description)}</p>
          <a href="${escapeHtml(getWhatsAppUrl(bookingMessage(service.title)))}" target="_blank" rel="noopener noreferrer" class="service-cta">
            Enquire now
            <span class="service-cta-icon" aria-hidden="true">${iconSvg('arrow')}</span>
          </a>
        </div>
      </article>`;
    })
    .join('');
}

function renderFeatures() {
  const grid = document.getElementById('features-grid');
  if (!grid) return;

  grid.innerHTML = features
    .map((feature, index) => {
      const number = String(index + 1).padStart(2, '0');
      const featuredClass = feature.featured ? 'why-card--featured' : '';
      return `
      <article class="why-card ${featuredClass}">
        <div class="why-card-top">
          <span class="why-card-number">${number}</span>
          <span class="why-card-icon" aria-hidden="true">${iconSvg(feature.icon)}</span>
        </div>
        <span class="why-card-tag">${escapeHtml(feature.tag || 'Crystal')}</span>
        <h3 class="why-card-title">${escapeHtml(feature.title)}</h3>
        <p class="why-card-copy">${escapeHtml(feature.description)}</p>
        <div class="why-card-line" aria-hidden="true"></div>
      </article>`;
    })
    .join('');
}

function renderAbout() {
  const copy = document.getElementById('about-copy');
  const image = document.getElementById('about-image');
  if (copy) {
    copy.innerHTML = about.paragraphs
      .map((p) => `<p class="text-base leading-relaxed text-navy-muted">${escapeHtml(p)}</p>`)
      .join('');
  }
  if (image) {
    image.src = assetUrl(about.image);
    image.alt = about.imageAlt;
  }
  const heading = document.getElementById('about-heading');
  if (heading) heading.textContent = about.heading;
}

function renderSteps() {
  const list = document.getElementById('steps-list');
  if (!list) return;

  list.innerHTML = steps
    .map(
      (step, index) => `
      <li class="process-card">
        <div class="process-index">${escapeHtml(step.number)}</div>
        <h3 class="process-title">${escapeHtml(step.title)}</h3>
        <p class="process-copy">${escapeHtml(step.description)}</p>
        ${index < steps.length - 1 ? '<span class="process-connector" aria-hidden="true"></span>' : ''}
      </li>`,
    )
    .join('');
}

function renderGallery() {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;

  grid.innerHTML = gallery
    .map(
      (item) => `
      <figure class="gallery-tile group ${escapeHtml(item.className)}">
        <img src="${escapeHtml(assetUrl(item.src))}" alt="${escapeHtml(item.alt)}" loading="lazy" data-fallback class="h-full w-full object-cover transition duration-700 group-hover:scale-110" width="800" height="600" />
        <figcaption class="gallery-caption">
          <span>${escapeHtml(item.alt)}</span>
        </figcaption>
      </figure>`,
    )
    .join('');
}

function renderTestimonials() {
  const grid = document.getElementById('testimonials-grid');
  if (!grid) return;

  grid.innerHTML = testimonials
    .map((item) => {
      const initials = item.name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase();
      return `
      <blockquote class="quote-card">
        <p class="quote-text">“${escapeHtml(item.quote)}”</p>
        <footer class="quote-footer">
          <span class="quote-avatar" aria-hidden="true">${escapeHtml(initials)}</span>
          <div>
            <cite class="quote-name">${escapeHtml(item.name)}</cite>
            <p class="quote-detail">${escapeHtml(item.detail)}</p>
          </div>
        </footer>
      </blockquote>`;
    })
    .join('');
}

function renderFaqs() {
  const list = document.getElementById('faq-list');
  if (!list) return;

  list.innerHTML = faqs
    .map(
      (faq, index) => `
      <div class="faq-item" data-faq-item data-open="false">
        <h3>
          <button type="button" class="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-bold text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal sm:px-6" aria-expanded="false" aria-controls="faq-panel-${index}" id="faq-button-${index}" data-faq-trigger>
            <span>${escapeHtml(faq.question)}</span>
            <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal to-lime-glow text-navy transition" data-faq-icon aria-hidden="true">+</span>
          </button>
        </h3>
        <div id="faq-panel-${index}" role="region" aria-labelledby="faq-button-${index}" hidden class="px-5 pb-5 text-sm leading-relaxed text-navy-muted sm:px-6">
          ${escapeHtml(faq.answer)}
        </div>
      </div>`,
    )
    .join('');

  list.querySelectorAll('[data-faq-trigger]').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest('[data-faq-item]');
      const panel = item.querySelector('[role="region"]');
      const icon = item.querySelector('[data-faq-icon]');
      const isOpen = button.getAttribute('aria-expanded') === 'true';

      list.querySelectorAll('[data-faq-item]').forEach((other) => {
        const otherButton = other.querySelector('[data-faq-trigger]');
        const otherPanel = other.querySelector('[role="region"]');
        const otherIcon = other.querySelector('[data-faq-icon]');
        other.setAttribute('data-open', 'false');
        otherButton.setAttribute('aria-expanded', 'false');
        otherPanel.hidden = true;
        otherIcon.textContent = '+';
      });

      if (!isOpen) {
        item.setAttribute('data-open', 'true');
        button.setAttribute('aria-expanded', 'true');
        panel.hidden = false;
        icon.textContent = '−';
      }
    });
  });
}

function renderServiceOptions() {
  const select = document.getElementById('service');
  if (!select) return;
  select.innerHTML =
    '<option value="">Select a service</option>' +
    services
      .map((service) => `<option value="${escapeHtml(service.title)}">${escapeHtml(service.title)}</option>`)
      .join('');
}

function renderFooterServices() {
  const list = document.getElementById('footer-services');
  if (!list) return;
  list.innerHTML = services
    .map(
      (service) =>
        `<li><a href="#services" class="text-sm text-cream/80 transition hover:text-white">${escapeHtml(service.title)}</a></li>`,
    )
    .join('');
}

function setupNavigation() {
  const header = document.getElementById('site-header');
  const toggle = document.getElementById('menu-toggle');
  const panel = document.getElementById('mobile-menu');
  const links = document.querySelectorAll('[data-nav-link]');

  const setOpen = (open) => {
    if (!toggle || !panel) return;
    toggle.setAttribute('aria-expanded', String(open));
    panel.classList.toggle('hidden', !open);
    document.body.classList.toggle('overflow-hidden', open);
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };

  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    setOpen(open);
  });

  links.forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });

  window.addEventListener('scroll', () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  });
}

function setupBackToTop() {
  const button = document.getElementById('back-to-top');
  if (!button) return;

  window.addEventListener('scroll', () => {
    button.classList.toggle('opacity-0', window.scrollY < 480);
    button.classList.toggle('pointer-events-none', window.scrollY < 480);
  });

  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function setupReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  items.forEach((item) => observer.observe(item));
}

function setupContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const fields = ['name', 'phone', 'email', 'service', 'message'];

  const showError = (name, message) => {
    const error = form.querySelector(`[data-error-for="${name}"]`);
    const input = form.querySelector(`#${name}`);
    if (error) error.textContent = message || '';
    if (input) input.setAttribute('aria-invalid', message ? 'true' : 'false');
  };

  const validate = () => {
    let valid = true;
    const values = Object.fromEntries(fields.map((field) => [field, form[field]?.value.trim() || '']));

    showError('name', values.name ? '' : 'Please enter your full name.');
    if (!values.name) valid = false;

    showError('phone', values.phone ? '' : 'Please enter a phone number.');
    if (!values.phone) valid = false;

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email);
    showError('email', emailOk ? '' : 'Please enter a valid email address.');
    if (!emailOk) valid = false;

    showError('service', values.service ? '' : 'Please select a service.');
    if (!values.service) valid = false;

    showError('message', '');
    return { valid, values };
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const { valid, values } = validate();
    if (!valid) return;

    const url = getWhatsAppUrl(enquiryMessage(values));
    window.open(url, '_blank', 'noopener,noreferrer');
  });
}

function injectStructuredData() {
  const siteUrl = business.siteUrl || `${window.location.origin}${import.meta.env.BASE_URL || '/'}`;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'CleaningService',
    name: business.name,
    alternateName: 'Crystal Cleaning',
    description: business.description,
    url: siteUrl,
    telephone: business.phoneDisplay,
    email: business.email,
    image: assetUrl(business.logo),
    logo: assetUrl(business.logo),
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Kerala',
      addressCountry: 'IN',
      streetAddress: business.address,
    },
    areaServed: business.serviceAreas.map((area) => ({
      '@type': 'AdministrativeArea',
      name: area,
    })),
    sameAs: Object.values(business.social || {}).filter(Boolean),
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

fillBrand();
renderServices();
renderFeatures();
renderAbout();
renderSteps();
renderGallery();
renderTestimonials();
renderFaqs();
renderServiceOptions();
renderFooterServices();
setupNavigation();
setupBackToTop();
setupReveal();
setupContactForm();
injectStructuredData();
bindImageFallbacks();
