# RAWNAK Academy — Eductix-aligned visual redesign (V11)

## Reference and implementation
Source inspiration: [Eductix by Pixcut Studio LLC on Framer](https://www.framer.com/marketplace/templates/eductix/); its live demo is at https://eductix.framer.website/ . The marketplace listing describes a clean green-and-white education landing page with a conversion-focused hero, course tiles, outcomes, plans and FAQ.

We follow **the visual language and layout composition**, not proprietary Framer component code or imagery.

### Matching details
- Bright white and mint-green geometric background, fine grid lines and glass-white pill navigation.
- Left-aligned oversized dark-green editorial heading, green rounded primary CTA, descriptive intro and compact growth note.
- Right-hand photo and information mosaic (two staggered columns, portrait photo, classroom photo, promise card, dark-green learning-category card, second portrait).
- Organized light-background courses, feature cards, learning outcomes, future-format comparison and FAQ.
- White surfaces, small green pills, rounded corners, consistent green call-to-action buttons.
- Responsive two-column hero on desktop that stacks on tablets and phones.
- Arabic RTL and English LTR using the existing three-family typography system.

### Content and claims
Instead of Eductix's sample real-looking enrollment figures, reviews, certificates, partner logos and pricing tiers, RAWNAK Academy displays four **illustrative** fields, its genuine planned feature list and sample future learning formats with clear statements that these are not live paid products. Pexels photos are sourced independently from pages describing free-to-use photos and do not use the template's images.

### Technical
- `academy-eductix.js`: restyles and structurally replaces the V10 public hero; adds learning outcomes and non-priced option cards; updates the top-level navigation while preserving `data-v7-scroll` and `data-nav` route behavior.
- `academy-eductix.css`: new white/green typography, hero collage, responsive navigation, course and product card treatments, and role workspace harmonization.
- `index.html`: references to the new CSS and JS, loaded *after* V10 so the active presentation is V11.
- Existing owner, educator and student workspaces, Arabic dictionary, QR tools, prototype accounts and local drafts are not deleted or replaced.

### Release checklist
1. Visit `#/welcome` on desktop and mobile. Confirm hero shows its five distinct tiles without missing images.
2. Check navbar Home / Courses / Programs / About Us and green CTA all scroll to their correct sections.
3. Check sign-up, log-in, course categories, journey steps, role tabs and teacher contact button.
4. Switch between Arabic and English. Confirm RTL alignment and the saved language setting.
5. Check at 320 / 375 / 430 / 768 / 820 / 1280 and 1920 px; inspect for horizontal overflow, image cropping and collision of mosaic cards.
6. Verify student, educator and owner mobile bottom navigation and Settings remain functional.
7. Respect reduced-motion settings and keyboard focus.
8. Confirm deployed host includes `academy-eductix.js` and `academy-eductix.css`.

This remains a **front-end prototype**; no production user authentication, actual paid plans, official student results or external partner endorsements are represented as live.
