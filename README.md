# Private Photos — Landing Site

Static website for the **Private Photos** Android app, ready to upload to any
host (cPanel, GitHub Pages, Netlify, Vercel, Cloudflare Pages, S3, etc.).

**Domain:** privatepappa.in  
**Developer:** privatepappa.in

---

## File structure

```
website/
├── index.html        # Landing page (hero, features, CTA, footer)
├── about.html        # About the app + developer
├── faq.html          # Frequently Asked Questions
├── privacy.html      # Privacy Policy + Terms of Use
└── assets/
    ├── styles.css    # Shared stylesheet (dark theme, responsive)
    ├── script.js     # Mobile nav toggle, smooth scroll, year auto-update
    ├── logo.png      # App logo (copy of app-logo.png)
    ├── icon.png      # App icon (high-res, used for OG + apple-touch)
    └── favicon.png   # Browser tab favicon
```

## How to deploy

### Option A — Static host (recommended)
Simply drag-and-drop the entire `website/` folder contents to your host:

* **cPanel / shared hosting:** upload to `public_html/`
* **Netlify / Vercel / Cloudflare Pages:** drop the folder in their dashboard
* **GitHub Pages:** commit the folder to a `gh-pages` branch or `docs/` folder

No build step required — it’s pure HTML, CSS and vanilla JavaScript.

### Option B — Local preview
```bash
cd website
python3 -m http.server 8080
# Open http://localhost:8080
```

## Updating the Play Store link

When your app goes live on Google Play, search-and-replace the placeholder
in all four HTML files:

```
Replace:  <a href="#" class="btn-store" data-store="google-play"
With:     <a href="https://play.google.com/store/apps/details?id=com.privatephotos.app" class="btn-store" data-store="google-play" target="_blank" rel="noopener"
```

Also update the `Coming soon on` micro-copy inside the button to just
`Get it on` once the app is live.

## Updating the privacy policy date

Edit the `<span id="upd">January 2025</span>` line in `privacy.html` whenever
you make material changes.

## SEO & social previews

* Open Graph + Twitter Card meta tags are set on every page.
* JSON-LD structured data is included for the `SoftwareApplication` and
  `FAQPage` types.
* The canonical URLs assume `https://privatepappa.in/` — update them if you
  ever deploy to a different domain.

## Customization tips

* Brand colors live as CSS variables at the top of `assets/styles.css`
  (`--accent`, `--accent-2`, `--bg`, etc.) — change them in one place.
* The mobile menu auto-closes when a link is tapped. To change the breakpoint,
  edit the `@media (max-width: 820px)` rule in `styles.css`.
* All copy lives directly in the HTML files — no CMS needed.
