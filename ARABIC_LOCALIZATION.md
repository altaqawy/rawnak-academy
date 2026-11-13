# RAWNAK Academy — Arabic / English localization

## Scope
Adds Egyptian-friendly Arabic interface text, a reversible English/Arabic switch, Cairo typography, and right-to-left layout support across the static Academy preview.

- Arabic is the default on a device unless English was explicitly selected before.
- Language choice is saved only in that browser's local storage; no backend is connected.
- The language toggle appears in the public header, mobile and desktop role headers, and in Settings for student, instructor and owner.
- Arabic uses RTL for layout. Emails, URLs, numbers, SVG graphics and QR content remain in a suitable LTR direction.
- The translation layer updates the visible UI following existing page renders; it does not change routes, account roles or course data.
- Academic roles display educator-appropriate names rather than assuming every educator is a school teacher.
- English remains available and restores the original English UI.

## Coverage and limitations
More than 1,100 interface phrases are mapped, including the academy landing page, signup/login, student learning spaces, courses, rewards, instructor and owner controls, smart books and QR-based study tools.

This remains a **static prototype**, not a connected learning platform. Current content, numbers, wallet and earnings are illustrative. A small number of dynamic demo strings and course-specific example content may still appear in English. For a production localization release, move UI strings into explicit language resource files instead of relying on DOM text substitution.

## Manual QA before release
1. Open the landing page in Arabic and switch to English and back; check both header and navigation.
2. Enter each demo role and inspect all tabs, settings, forms and every More menu link.
3. Inspect lesson player, quizzes, smart books, QR print sheet and download layouts.
4. Confirm the selected language stays after navigation and refresh.
5. Confirm forms preserve typed values when language changes, and that email/password fields remain LTR.
6. Check mobile widths 320, 360, 390, 430, 768, 820 px and desktop 1280 px.
7. Confirm owner-only and educator-only actions still use existing role checks and cannot be reached through translated controls.
8. Keep all preview-only and no-real-payment notices visible and accurately translated.

## Important
No databases, domains, production identity system, payment provider or deployment configuration is changed by this localization work.
