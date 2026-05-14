// Private Photos — landing site behaviors
// Mobile nav toggle + smooth-scroll + current-year footer
(function () {
  'use strict';

  // ---- Mobile menu toggle ----
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    // Close menu when a link inside it is clicked (mobile)
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        if (nav.classList.contains('open')) {
          nav.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // ---- Auto current year in footer ----
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  // ---- Smooth-scroll anchor links WITHOUT polluting the URL bar ----
  // By default `<a href="#download">` adds "#download" to the URL after a
  // click which looks like "index.html#download" in the address bar.
  // We intercept the click, scroll programmatically and prevent the
  // default behavior so the URL stays clean. External / cross-page
  // anchors are left untouched. Pure "#" placeholders (e.g. the Play
  // Store button before launch) are also intercepted to prevent a "#"
  // trailing in the URL bar.
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    const href = a.getAttribute('href') || '';
    if (href === '#') {
      // Pure placeholder — block default to keep URL clean.
      a.addEventListener('click', function (e) { e.preventDefault(); });
      return;
    }
    if (href.length < 2) return;
    a.addEventListener('click', function (e) {
      const id = href.slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ---- Highlight active nav link based on current page filename ----
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav a').forEach(function (a) {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();
