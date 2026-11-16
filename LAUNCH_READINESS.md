# RAWNAK Academy release review — 16 November 2026

## Completed in V14

- Added staggered word entrance to the public hero, preserving joined Arabic letters, a complete accessible heading label, and readable reduced-motion/off states.
- Preserved the approved public/workspace visual direction. Fixed CSS conflicts that would otherwise override word layout and HTML `hidden` states.
- Removed the email/password imitation login and signup forms and their local signup submission logic. Both routes now offer clearly described, credential-free workspace previews.
- Added bilingual platform status, preview privacy and support pages, plus footer links and an honest prelaunch notice.
- Fixed section navigation from other public pages: navigate home, render the correct section, scroll and focus its heading.
- Added a skip link, focus handling for dialogs/mobile workspace navigation, Escape dismissal, route focus and image fallback.
- Extended localization to modals and status toasts, and fixed page-title restoration when switching back to English.
- Hardened malformed route decoding and invalid locally stored preview session shapes.
- Fixed educator book/question creation while the course catalog is empty: authors can save unlinked local drafts. QR lesson linking still requires a real lesson.
- Added local JSON draft backup in every workspace's Settings, excluding old profile/contact/signup/session data.
- Extracted the former 690 KB inline entry page into a 6 KB entry document and separately cacheable application/style files, preserving script order.
- Added a same-origin script policy, disabled accidental external form submission/API requests, added a no-JavaScript message, and retained `noindex` during preview.
- Added repository quality checks and CI.

## Automated verification

`npm run check` validates all twelve browser scripts, entry assets and CSS block structure.

`npm test` contains twelve regression checks covering both locales, information and malformed routes, all three role workspaces, unlinked draft persistence, cross-page section navigation, modal translation, backup data scope, invalid sessions, escaped draft markup and motion preferences. These run in a DOM model. They do not measure real rendering, keyboard focus geometry or browser accessibility behavior.

## Browser verification

- Verified the public release in Chrome after successful GitHub Pages deployment of commit `1942fb9faa1166e1c032fed3f50b03e27c15d2b8`.
- Reviewed the desktop public page at 1363 px, student workspace and study planner, educator overview and book authoring, preview entry and privacy information.
- Exercised Arabic/English switching and section navigation from the privacy page to Smart Books. The destination settled at the expected header offset (about 110 px).
- Reviewed real iframe viewports of 320, 390 and 768 px. Their document widths matched their available viewport widths (305, 375 and 753 px after scrollbars), with no horizontal page overflow. Checked the 320 px Arabic menu opening, section navigation and automatic closing.
- Browser review found clipped header controls on a small phone, tight English word spacing, font-dependent arrow glyphs and cached earlier release assets. These were corrected, deployed and checked again. Arrow icons now render as SVG and script/style URLs include content hashes.
- Checked that translated option labels preserve the original form values and that user-authored draft cells are not translated.
- No site-origin errors or CSP violations appeared in the final desktop browser error log. An unrelated browser-extension metadata error was excluded from this result.

## Hosting and CI status

GitHub Pages successfully published the updated application. The custom `Academy quality` workflow did not start because GitHub returned: “The job was not started because your account is locked due to a billing issue.” Local checks were rerun from a clean `npm ci --ignore-scripts`; script/asset/CSS checks and all twelve tests passed. Resolve the account billing status before relying on automated GitHub CI. Backend authorization, payment-provider verification and end-to-end enrollment are outside this static release and remain launch prerequisites.

## Required for an operational release

| Priority | Work | Acceptance condition |
| --- | --- | --- |
| P0 | Connect Rawnak Group identity | Verified sign-in, recovery, session expiry and server-enforced student/educator/owner permissions |
| P0 | Content and publishing database | Owner approves courses, educator ownership is enforced, content survives device changes, backups can be restored |
| P0 | Lesson access and enrollment | Only authorized students receive protected lesson/media URLs; changing a local role or ID grants no access |
| P0 | Payments and ledger | Server-side price checks and verified webhooks, idempotency, refund handling and financial reconciliation |
| P0 | Official contact and policies | Confirm a shared Academy business number/contact, publish launch privacy/terms/refund policy and teacher agreements |
| P1 | Monitoring and operations | Error reporting, uptime checks, recovery drill and a tested support process |
| P1 | Rewards and certificates | Server-verified learning events, anti-abuse rules, issuance and public certificate verification |
| P1 | Live teaching | Approved meeting/streaming service, protected attendance and an agreed operating budget |

The static preview deliberately supplies no new production service, account, payment provider or secret credential. A number saved by a local owner preview does not configure a shared service for other visitors.

## Suggested service improvements

1. A placement/goal questionnaire that sends the student to one useful first course after the real catalog is published.
2. A first-week learning plan with a weekly goal and a clear “continue learning” action tied to actual lesson progress.
3. An educator onboarding checklist: credentials, sample lesson, course outline, review feedback, publication state.
4. A genuine free sample lesson per paid course, with outcomes, prerequisites, real educator details and transparent pricing.
5. An exam revision space combining question banks, lesson notes and spaced revision using real course content.
6. Verifiable certificates and a portfolio of applied projects rather than rewards based only on viewing time.

Build those on the same identity/content foundation so saved work and access stay consistent across devices.
