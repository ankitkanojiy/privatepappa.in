# Deploying to GitHub Pages with Custom Domain (privatepappa.in)

This guide walks through the **two issues** you ran into:
1. **CSS not loading** ("the site looks weird")
2. **GitHub "Enforce HTTPS — Unavailable"**

Both are deployment / DNS issues, not bugs in the site itself. Follow these steps carefully.

---

## ✅ Step 1 — Verify EVERY file is pushed to your repo

The unstyled look you saw means `assets/styles.css` is returning **404**. Open
in a new browser tab:

```
https://privatepappa.in/assets/styles.css
```

* If you see CSS code → the file loaded. The 404 is elsewhere (skip to Step 4).
* If you see "404 — File not found" → the `assets/` folder was NOT pushed.

### Push checklist
Your repo root must contain **all of these**, exactly as named (lowercase):

```
your-repo/
├── .nojekyll               ← MUST be present (see Step 2)
├── CNAME                   ← MUST contain: privatepappa.in
├── index.html
├── about.html
├── faq.html
├── privacy.html
├── README.md
└── assets/                 ← THIS FOLDER MUST BE PUSHED
    ├── styles.css          ← lowercase, exact filename
    ├── script.js
    ├── logo.png
    ├── icon.png
    └── favicon.png
```

In your repo's GitHub page, click into the `assets/` folder and confirm
`styles.css` is listed. If it's missing, run locally:

```bash
git add assets/
git commit -m "Add missing assets folder"
git push origin main
```

GitHub Pages typically takes **30–90 seconds** to redeploy after a push.

---

## ✅ Step 2 — The `.nojekyll` file (already included in this ZIP)

GitHub Pages runs **Jekyll** by default on every site. Jekyll silently ignores:
* Folders starting with `_`
* Files with certain Unicode characters
* Some edge-case filenames

A **`.nojekyll`** file (empty or with a comment) at the repo root tells GitHub
to skip Jekyll and serve files as-is. This ZIP includes `.nojekyll` — make sure
git actually committed it (dotfiles can be skipped by `.gitignore`).

```bash
# Verify it was pushed
git ls-files | grep -i nojekyll
# Should print: .nojekyll
```

If missing:
```bash
touch .nojekyll
git add -f .nojekyll
git commit -m "Disable Jekyll for static site"
git push
```

---

## ✅ Step 3 — The `CNAME` file (already included in this ZIP)

GitHub Pages needs a `CNAME` file at the repo root containing **only your bare
domain**, no `https://`, no trailing slash. We included one with:

```
privatepappa.in
```

In your repo's GitHub Settings → Pages, the **Custom domain** field should
show `privatepappa.in`. If empty, paste it there and click **Save**.

---

## ✅ Step 4 — DNS records (THIS is what fixes the HTTPS warning)

Your warning says:

> Enforce HTTPS — Unavailable for your site because your domain is not properly
> configured to support HTTPS (privatepappa.in)

This means **DNS is wrong**. GitHub needs to verify it owns the domain before
issuing a free Let's Encrypt certificate. Fix by setting these DNS records at
your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.):

### Required DNS records for `privatepappa.in`

| Type  | Host / Name        | Value                  | TTL  |
|-------|--------------------|------------------------|------|
| A     | `@` (or blank)     | `185.199.108.153`      | 3600 |
| A     | `@`                | `185.199.109.153`      | 3600 |
| A     | `@`                | `185.199.110.153`      | 3600 |
| A     | `@`                | `185.199.111.153`      | 3600 |
| CNAME | `www`              | `<username>.github.io.` | 3600 |

Replace `<username>` with **your GitHub username** (e.g. if your username is
`ankitsharma` then the CNAME value is `ankitsharma.github.io.`). The trailing
dot is intentional — some DNS panels require it.

### How long it takes
* DNS records propagate in **5 minutes to 24 hours** (usually 10–60 min).
* Once GitHub detects correct DNS, it requests a Let's Encrypt certificate
  (another 10–60 min).
* After the cert is issued, the **Enforce HTTPS** checkbox becomes clickable.

### How to check progress
1. Open https://www.whatsmydns.net/#A/privatepappa.in
2. Confirm at least one of the 4 GitHub IPs (185.199.108–111.153) is visible
   from most locations.
3. In your repo Settings → Pages, GitHub will say:
   * ❌ "Your site's DNS settings are using a custom subdomain" — keep waiting
   * ✅ "Your site is published at https://privatepappa.in" — cert is ready

### After the cert is issued
Go to repo **Settings → Pages → tick "Enforce HTTPS"**. From that point on,
all HTTP requests get a 301 redirect to HTTPS automatically.

---

## ✅ Step 5 — Verify everything works

After the steps above, open these URLs in an Incognito / Private window to
bypass any cache:

| URL                                            | Expected             |
|-----------------------------------------------|----------------------|
| `https://privatepappa.in/`                    | Styled landing page  |
| `https://privatepappa.in/assets/styles.css`   | CSS source code      |
| `https://privatepappa.in/assets/script.js`    | JS source code       |
| `https://privatepappa.in/assets/logo.png`     | Logo image           |
| `https://privatepappa.in/about.html`          | About page (styled)  |
| `https://privatepappa.in/faq.html`            | FAQ with accordion   |
| `https://privatepappa.in/privacy.html`        | Privacy Policy       |
| `http://privatepappa.in/`                     | Should redirect to https:// |

If all green, you're done. 🎉

---

## 🆘 Still having issues?

Open the **Browser DevTools → Network tab**, reload the page, and look for
`styles.css`:

* If it shows **404** → file isn't deployed (re-push the `assets/` folder)
* If it shows **200 but the page is still unstyled** → MIME-type issue
  (rare on GitHub Pages — paste me the response headers)
* If it shows **CORS error** → check that you're loading the page from the
  same domain that hosts the CSS (don't open `file://` locally)

Email yourself the DevTools screenshot and reach out.
