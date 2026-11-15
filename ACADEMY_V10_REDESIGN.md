# RAWNAK Academy — V10 Full Visual Redesign

## Design brief
Rebuild the public Academy homepage as a coherent editorial education experience, not a collage of isolated animations. The visual direction combines the educational content hierarchy of the [Eductix](https://www.framer.com/marketplace/templates/eductix/) reference, the cinematic storytelling and confident typographic contrast of [Eloraa](https://www.framer.com/marketplace/templates/eloraa/), and the owner's supplied gallery, card and button-interaction inspiration. All markup, CSS, UI logic and illustration details are custom code, not copied Framer source.

## New public page
1. Editorial hero, organic photo treatment, two onboarding CTAs, and responsive nav.
2. Ticker of values, without fabricated courses, students, instructors or partner logos.
3. Mission and four-step learning philosophy.
4. Category-filterable sample pathways (creative, technology, business, health).
5. Interactive journey steps with changing educational imagery.
6. Cinematic learning story.
7. Student / Educator / Owner interactive role preview, linked to the existing demo login.
8. Bento-based study-tool presentation: classroom, rewards, smart books, roadmap.
9. Smart-book section with a **concept-only** QR illustration (not a scannable code).
10. Educator invitation connected to the existing owner-configured WhatsApp workflow.
11. Accessible FAQ and final sign-up CTA; a redesigned footer is included.

The whole homepage is implemented in `academy-v10.js` and `academy-v10.css`, loaded after existing design layers. All old public content is replaced when the route is `#/welcome`; the previous homepage's V7.6 scripts are harmless because their former root element no longer exists.

## Logged-in workspaces
- Shared new visual treatment for cards, navigation, spacing and role accents.
- A desktop welcome hub appears on the home route of each student, educator and owner role. It uses existing route-guarded buttons.
- Existing role-specific mobile app navigation (five tabs), permissions, course demos, settings, smart-book tools and financial placeholders are preserved.
- Existing English/Arabic switch and the three Arabic font families stay active.
- The mobile welcome hub remains the original mobile-optimized experience; new desktop-only hub is hidden on narrow screens.

## Functionality
- Interactive pathway filters, journey stage selection, role previews and native FAQ details.
- All visible account and workspace CTAs use existing `data-nav` routes.
- The teacher CTA continues to use the owner's official configured WhatsApp number; none is invented.
- Source photos reuse existing publicly linked Pexels images already in the project.
- Preview warnings remain prominent; production login, enrollment, pricing, transcripts, payment, actual student records and analytics are **not implemented** by this design change.

## Release checks
- Check public Home on phone (320, 375, 430 px), tablet (768, 820 px) and desktop (1280, 1920 px).
- Confirm English/Arabic toggle re-renders the right language and preserves RTL.
- Confirm each category filter, journey step, role tab, FAQ, navigation/scroll link and call to action.
- Confirm student/educator/owner demo login, route permissions and Settings still work.
- Check no overflow around long Arabic text, portal cards, bottom navigation, and teaching screens.
- Check reduced-motion preference, keyboard navigation, alt texts and color contrast.
- Confirm static hosts deployed all new CSS/JS files; a GitHub merge is not proof of live hosting propagation.
