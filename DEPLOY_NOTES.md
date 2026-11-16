# Deployment

Repository: `altaqawy/rawnak-academy`, branch `main`.

This release remains a static preview. Do not market it as live registration, enrollment or payments until the services in `LAUNCH_READINESS.md` are implemented and tested.

Deploy `index.html`, every root `.js`/`.css` file and the full `assets/` folder together. Previous instructions to upload only `index.html` and `assets/` are obsolete. No build step is required. npm packages are test-only.

The entry document has a script policy allowing only same-origin external scripts. Keep scripts out of inline HTML and do not add inline event handlers. When introducing an API, explicitly review and update `connect-src`; it intentionally allows no API connections in this disconnected preview.

GitHub Pages ignores `_headers`; the HTML CSP still applies. Hosts that support `_headers` additionally receive frame, MIME and referrer headers. Server-side authorization must be introduced before real educator or owner access exists.

After deployment, check a cache-bypassed load, mobile layout, both languages, role previews, local draft creation, backup download and information-page navigation. Confirm all assets return successfully and no CSP errors occur.
