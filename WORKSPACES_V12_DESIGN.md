# RAWNAK Academy — Eductix-style workspaces V12

## Goal
Bring every Academy experience into the same design family as the new Eductix-aligned public website, while keeping three distinct workflows for **Students**, **Educators** (including doctors, university lecturers and professors) and the **Owner**.

The Eductix template is a *visual reference*. The implementation consists of original CSS and JavaScript and does not import template files, proprietary artwork or third-party component code.

## Complete UI coverage

### Shared visual system
- Emerald/white default workspace, pale-green grid and bright cards, soft pill CTAs, editorial headings, tidy spacing, coherent sidebar/topbar and navigation.
- Responsive, accessible tables; status ribbons and empty states; consistent search, filter, settings and forms.
- English and Arabic RTL using existing Alexandria, IBM Plex Sans Arabic and El Messiri fonts.
- Previous built-in Light / Dark / System appearance choices remain functional. Custom or alternate palette selections are not forcibly overwritten.

### Student
- Eductix-style desktop welcome mosaic and shortcuts to course discovery, classroom, tools and rewards.
- Existing learning roadmap, course cards, sample course details, videos, quizzes, notes, rewards, leaderboard and Smart Books receive matching shared styles.
- Mobile retains the original five-item bottom navigation, redesigned in the white/green visual language.

### Educator
- Own introductory mosaic and shortcuts to courses, student insights, question bank and earnings.
- Consistent management cards, content forms, student tables, empty states and future financial reporting.
- Educator positioning intentionally includes physicians and university lecturers, not just school teachers.

### Owner
- Own introductory mosaic and shortcuts to educator administration, course catalog, analytics and finance.
- Consistent forms, responsive tables and dashboard cards.
- Financial fields remain honest placeholders until a payment backend exists.

### Account entry
- Login, free student registration, educator onboarding information and demo role-switching pages share the same green/white appearance.

## Implementation
- New `academy-workspaces-v12.css` (responsive, role-aware design layer)
- New `academy-workspaces-v12.js` (safe UI-only overview covers, breadcrumbs, shortcuts and table scroll wrappers)
- `index.html` includes CSS and deferred JS after the existing V11 Eductix enhancement.

The established role-navigation events and their permission checks remain authoritative. UI shortcuts only navigate through existing permitted routes. No accounts, permissions, payments, course data or GitHub deployment configuration are modified.

## Important QA
- Desktop: all three overview pages; course/student/teacher/owner subpages, tables and Settings.
- Mobile at 320, 360, 375, 430, 768 and 820 px: bottom navigation visible, no horizontal overflow, More sheet and RTL alignment.
- All three roles in Arabic and English; refresh after saving language selection.
- Switch Light, Dark, System and curated themes; verify inputs and menus have readable contrast.
- Check free registration, demo role selection, class video/quiz, rewards and smart-book routes.
- Review 100% and 200% text zoom, keyboard focus and table scrolling.
- On the deployed site, confirm `academy-workspaces-v12.css` and `academy-workspaces-v12.js` actually load.

**Caveat:** This is still a browser-only design prototype. Real accounts, enrolments, financial reports and payments need backend integrations. GitHub merge alone does not confirm hosted deployment or cross-device browser verification.
