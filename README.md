# Kirsty and Damian's wedding website

A static [Astro](https://astro.build/) site for the wedding information and RSVP form.

## Requirements

- Node 26 (see `.nvmrc` and `package.json`)
- npm 11 or newer

## Local development

```sh
npm ci
npm run dev
```

Invitation links use the existing `?g=` query parameter to select a guest group. Guest records remain in `src/data/guests.json`; do not expose them in logs, test output, or documentation.

## Validation

```sh
npm test
npm run build
npm run test:build
npm run test:smoke # uses the locally installed /usr/bin/chromium
npm audit --audit-level=low
```

The browser smoke test intercepts the RSVP POST and never sends it to Netlify.

## Build and deployment

`npm run build` writes the static site to `dist/` and then generates `dist/sw.js` with the complete build artifact list for offline use. Netlify should run `npm run build` and publish `dist`; these settings and the Node runtime are declared in `netlify.toml`.

The static `data-netlify` form retains the `rsvp` form name, posts to `/success`, and submits a hidden `values` field containing the existing JSON payload shape. The PWA manifest source is in `public/manifest.webmanifest`.

Do not deploy generated `dist/` directly from a workstation. CI performs install, unit tests, build-output tests, and a full dependency audit.
