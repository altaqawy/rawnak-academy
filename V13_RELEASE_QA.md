# RAWNAK Academy V13 — No fabricated data + Arabic/English + motion

## Purpose
Remove fictitious, seeded learner/business data without fabricating real records or deleting user-authored work. Keep the Eductix-style public and role-specific visual identity, bilingual UX, and functional demo-navigation until a secure backend is connected.

## Removed from the code
- Seeded six fictional courses, four fictional lessons, sample rewards/credit prizes and manufactured weekly/monthly/season leaderboards.
- Artificial `420 credits`, `1,180 XP` and weekly XP defaults. The prototype now does not award verified points or show unverified achievements.
- Fabricated study roadmap, sample course quizzes, downloadable exercise files, QR companion books, mock question-bank entries and book-reading pages.
- Placeholder personal emails in role-preview profiles.
- Legacy sample book and question records with exact known seed IDs (`bk-design`, `bk-visual`, `q-seed-*`) are filtered from the existing browser-local draft storage. Other user-created drafts, study notes, student preferences and portfolio records are preserved.
- Remaining fake personal leaderboard ranking calculations are disabled.

## Empty states
Without a connected published course catalog or account database, the student course catalog, learning home, course details, classroom, smart-book library, split study, rewards and rankings explicitly state that verified data is not available. The static marketing course section shows an honest editorial empty state rather than invented course cards or completed-lesson progress.

The owner dashboard, analytics and finances, plus educator home, student insights and earnings, now display unconnected statuses rather than mock signups, students, payouts, conversion statistics or revenues. Draft editors still work as local authoring previews.

## Localization
- Existing bilingual interface and saved `rawnak-academy-language` preference preserved.
- Additional 98 useful Arabic translations for empty states, admin screens, course tools, settings, and navigation.
- Language switch remains in guest/public headers and all role top bars; Settings also has a language selector.
- RTL/LTR and document `lang` follow the selected language, with original English text restored when switching back.
- New live-data dashboards and public catalog states are authored directly in both languages.

## Animation
- Scroll progress rail, staggered entrance of major cards/sections, soft image drift, hover transitions and editorial details.
- Uses CSS and a small `IntersectionObserver`, no new framework.
- `prefers-reduced-motion` and existing motion-off options disable animation without hiding content. No animations on financial or form values.

## Verification performed
1. All main inline JS and every changed external JS parse successfully.
2. New CSS stylesheet has balanced braces.
3. Static source scan shows zero seeded course/lesson/reward/leaderboard/QR sample arrays and no fictitious preview contacts or old XP balances.
4. Browser-model language test confirms `English → Arabic → English → Arabic`, successful text retranslation, RTL/LTR, saved locale and re-render on switch.
5. Public bilingual templates produce 13 well-formed sections with no duplicated IDs, no fake course tiles/lesson progress, and working key section anchors.
6. Student empty-state function tested on ten routes, all returning safe links without invented progress.
7. Owner and educator pages rendered in Arabic and English with genuine disconnected-data labels and no fabricated values.
8. Previously existing owner/student/educator navigation, Smart Books authoring, local drafts and language components are still included.

## Still needed before production
- Visual review on actual browsers at phone, tablet and desktop widths; confirm animation performance and text wrapping.
- Confirm hosted deployment is serving the new CSS and JS, not a cached previous version.
- Connect secure identity, course publication database, lessons, enrollment entitlements, rewards and payment ledger. No UI update can invent these.
- Audit the remaining legacy instructional/form copy visually in Arabic; the translation dictionary is broad but full visual QA has not yet been run across every interactive state.
- Any locally stored preview data is still not a verified student enrollment or real financial record.

### Files
- `index.html` — removed seed fixtures, protected empty routes, migrated known sample book/question records.
- `academy-live-data-v13.js` — verified-data-only dashboards and first-load refresh.
- `academy-i18n.js` — expanded Arabic translations.
- `academy-eductix.js` — honest marketing course catalog and removal of fictitious example metrics.
- `academy-motion-v13.js` and `academy-motion-v13.css` — accessible motion and empty-state design.

**Privacy:** Do not use demo login or browser-local prototypes for real passwords, sensitive student records, payments or patient information.
