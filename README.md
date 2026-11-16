# RAWNAK Academy

Bilingual, responsive Academy preview for Rawnak Group. The public website and student, educator and management workspaces share an Eductix-inspired green editorial design.

**Release state:** static preview, not an operational learning platform. Live identity, enrollment, publishing, payments and rewards are not connected. No password is requested by this preview. A selected preview role is a local UI preference, never an authorization boundary.

## Run and check

Serve this directory with a static server, for example `python3 -m http.server 4317`, then open `http://localhost:4317`.

```sh
npm ci --ignore-scripts
npm run check
npm test
```

The regression suite loads the complete script chain in a DOM model and checks routes, Arabic/English switching, malformed links, draft persistence, safe markup and credential-free entry. It is not a substitute for a real browser or backend security test.

## Files

- `index.html`: small entry document, shared SVG icons and ordered script/style references
- `academy-bootstrap.js`: saved locale, motion preference and initial route
- `academy-core.js` / `academy-core.css`: existing application and visual foundations extracted from the former inline document
- `academy-v10.*`, `academy-eductix.*`, `academy-workspaces-v12.*`: approved public and role-specific design
- `academy-i18n.*`: Arabic/English translation and direction
- `academy-live-data-v13.js`: verified-data-only empty dashboards
- `academy-motion-v13.*`: section entrance and progress motion
- `academy-release.*`: navigation, accessibility, information pages and draft backup
- `assets/`: local brand asset
- `LAUNCH_READINESS.md`: completed changes, validation limits and launch prerequisites

## Data and privacy

Notes, content drafts, study preferences and preview sessions are stored on the current browser. Existing user-authored drafts are preserved. Workspace Settings can export draft JSON without including old contact lists, signup records or sessions. The privacy page describes this behavior and external photo/font requests.

Do not enter real passwords, payment details or sensitive student records. Drafts and local owner previews do not grant real privileges or publish content. Never commit tokens, production records or service credentials.

## Hosting

Deploy `index.html`, **all root `.js` and `.css` files**, and `assets/` together. GitHub Pages can serve the repository root. No build step or production npm dependency is required. Other static hosts must preserve relative file paths. `_headers` adds response headers on hosts supporting that format; the HTML also includes a script CSP.

The preview is marked `noindex, nofollow`. Review privacy, legal terms and operational readiness before changing that setting. Photography comes from Pexels and fonts from Google Fonts; review their use and hosting before launch.
