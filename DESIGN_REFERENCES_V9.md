# RAWNAK Academy — Visual Discovery V9.1

## Design direction
These are *visual references*, not imported templates or copied proprietary source code.

- Eductix, Framer: https://www.framer.com/marketplace/templates/eductix/ — education-specific landing page hierarchy, pathways, conversion and clear calls to action.
- Eloraa, Framer: https://www.framer.com/marketplace/templates/eloraa/ — cinematic editorial presentation, photography, restrained motion and immersive framing. **Eloraa is a tattoo-studio template**, so only transferable art direction applies.
- User-supplied gallery list: Bento Gallery, Filterable Gallery and Dynamic Lightbox used as experience references. Dome Gallery was intentionally not included because a heavy 3D gallery is unnecessary for the static Academy preview.
- User-supplied card list: Spotlight Card inspiration (soft pointer-reactive glows).
- User-supplied button animations: wave and arrow-fill inspiration, implemented as lightweight CSS micro-interactions.

## Implemented
- Bilingual Discovery Studio placed between the public course showcase and the practical-learning section.
- Filterable, image-first five-card bento grid using existing education-related images already present in this repository, rather than template artwork.
- Accessible native-dialog image previews: focusable tiles, prev/next arrows, Escape-to-close, close button, pointer backdrop dismissal, and return focus.
- Subtle mouse-following spotlight on selected cards across the guest and role-based dashboards.
- Restrained button motion and a more editorial aesthetic in the educator section.
- Arabic RTL and English LTR text are selected from existing saved locale; **no new settings**.
- IntersectionObserver-based entrances with reduced-motion fallback.

## Boundaries
- Static educational sample photos are illustrative, not claims about real students, real course catalog entries or certified faculty.
- Existing routes, local sample rewards, lesson player, accounts and owner permissions remain unchanged.
- No runtime frameworks, copied Framer components, or proprietary assets were introduced.
- Code additions: `academy-discovery.css`, `academy-discovery.js` and two references in `index.html`.

## Quality assurance checklist
1. Verify gallery appears on public Home after course cards and before practice, in English and Arabic.
2. Verify every filter, image preview, keyboard arrow navigation and close button.
3. Verify existing sign-up CTA is still routed through application navigation.
4. Check mobile sizes 320px, 375px, 430px and 820px, RTL text wrapping, focus order, and performance.
5. Check student, educator and owner role dashboards for card/button layering and no overflow.
6. Verify reduced-motion mode does not hide gallery or make interactions inaccessible.

Deployment still depends on how the hosted site is configured. GitHub changes alone do not guarantee the live deployment updated.
