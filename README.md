# Basmala Cleaning Solutions

Premium static marketing website for Basmala Cleaning Solutions. Built with HTML, CSS (Tailwind CSS v4), and vanilla JavaScript. No React, no backend.

Brand assets:
- Horizontal logo (header, footer, About/Why sections, social previews): [`public/images/logo.png`](public/images/logo.png)
- Square logo (structured data): [`public/images/logo-stacked.png`](public/images/logo-stacked.png)
- Favicon and app icon: [`public/favicon.ico`](public/favicon.ico), [`public/favicon.png`](public/favicon.png), [`public/apple-touch-icon.png`](public/apple-touch-icon.png)

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

Production build:

```bash
npm run build
npm run preview
```

## Customize business details

Edit [`js/config/business.js`](js/config/business.js):

| Field | Purpose |
| --- | --- |
| `name` | Company name (logo text and page branding) |
| `tagline` | Short tagline |
| `phoneDisplay` / `phoneHref` | Visible phone and click-to-call link |
| `whatsappNumber` | Digits only for WhatsApp (`wa.me`), country code included |
| `email` | Click-to-email address |
| `address` | Business location text |
| `serviceAreas` | Areas listed on the contact section and footer |
| `social` | Facebook / Instagram / LinkedIn URLs (empty hides the link) |
| `description` | Short company blurb |

Page copy (services, FAQ, testimonials, gallery captions, about text) lives in [`js/config/content.js`](js/config/content.js).

## Replace images

Put files in [`public/images/`](public/images/) using the same filenames referenced in `js/config/content.js` and `index.html`, or update those paths after renaming.

## Image sources (Unsplash)

All photos are royalty-free Unsplash images downloaded into `public/images/`:

| File | Source |
| --- | --- |
| `hero-cleaner.jpg` | https://unsplash.com/photos/person-holding-black-and-yellow-cordless-vacuum-cleaner-gFad1oWCmDX (photo-1581578731548) |
| `service-home.jpg` | https://images.unsplash.com/photo-1628177142898-93e36e4e3a50 |
| `service-deep.jpg` | https://images.unsplash.com/photo-1556911220-bff31c812dba |
| `service-office.jpg` | https://images.unsplash.com/photo-1497366216548-37526070297c |
| `service-kitchen.jpg` | https://images.unsplash.com/photo-1556912173-46c336c7fd55 |
| `service-bathroom.jpg` | https://images.unsplash.com/photo-1552321554-5fefe8c9ef14 |
| `service-sofa.jpg` | https://images.unsplash.com/photo-1555041469-a586c61ea9bc |
| `service-move.jpg` | https://images.unsplash.com/photo-1502672260266-1c1ef2d93688 |
| `about-team.jpg` | https://images.unsplash.com/photo-1584622650111-993a426fbf0a |
| `gallery-living.jpg` | https://images.unsplash.com/photo-1618221195710-dd6b41faaea6 |
| `gallery-kitchen.jpg` | https://images.unsplash.com/photo-1600585154340-be6161a56a0c |
| `gallery-bathroom.jpg` | https://images.unsplash.com/photo-1620626011761-996317b8d101 |
| `gallery-office.jpg` | https://images.unsplash.com/photo-1497215728101-856f4ea42174 |
| `gallery-bedroom.jpg` | https://images.unsplash.com/photo-1616594039964-ae9021a400a0 |
| `gallery-team.jpg` | https://images.unsplash.com/photo-1527515637462-cff94eecc1ac |
| `cta-background.jpg` | https://images.unsplash.com/photo-1600210492486-724fe5c67fb0 |

## Notes

- Contact form validation runs in the browser and opens a prefilled WhatsApp chat.
- Testimonials are sample placeholders, clearly labeled — replace with real feedback before launch.
- Placeholder phone, email, address, and service areas must be replaced before publishing.
