# RAWNAK Academy — navigation and negative identity

## Design references

- [Glide Navigation — Framer Marketplace](https://www.framer.com/marketplace/components/glide-navigation/): compact pill navigation and a sliding hover/selected highlight.
- [Pill Nav Bar — Framer Marketplace](https://www.framer.com/marketplace/components/pill-nav-bar/): floating header and a separate responsive menu panel.

This is an original implementation for the existing repository, inspired by those interaction patterns. No template code, paid component or third-party brand artwork was copied.

## Changes

- `RAWNAK ACADEMY` remains English in both interface languages, including public headers, footers and workspace wordmarks.
- Public navigation now has a transparent fixed shell with white artwork and `mix-blend-mode: difference`, so its contents invert the actual backdrop while scrolling. Language and menu controls have no visible circles, borders or surfaces; their 44 px tap targets remain. The desktop active indicator is a thin sliding underline.
- Scroll changes the header's position and width. Section highlighting, pointer and keyboard focus share the same indicator.
- At narrower widths, a dedicated menu replaces the desktop links. It supports Escape, focus containment, background inertness, backdrop dismissal and closing before section navigation.
- The footer uses `assets/rawnak-academy-negative-hd.svg`, an alpha-preserving SVG treatment of the recovered 520 × 520 source emblem. Its light monochrome tones retain internal detail without a background rectangle. The English wordmark is white.
- The original transparent 520 × 520 WebP was recovered byte-for-byte from the earlier Academy visual demo, replacing the downscaled 64 × 64 source for all site logo uses and icons. No generative redraw or upscaling was used.
- The blending shell is separate from the normally composited menu and backdrop, preserving readable menu colors.
- Existing routes, preview roles, drafts and account behavior are unchanged.

## Validation

Run `npm run version-assets`, `npm run check` and `npm test` after changes. The regression suite now covers English brand persistence, the negative footer asset, modal menu state and restoration of background access.

Review the published result on desktop, 320 px and 390 px phones and tablet widths, including both languages, mobile panel links and the footer.
