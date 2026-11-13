# RAWNAK Academy — mobile role workspaces

## Implemented in this preview

This is a **mobile-only presentation layer** for the existing static V7.6 demo. It reuses the existing session, role, route navigation, and permission checks. Desktop layout and backend behavior are unchanged.

| Signed-in role | Mobile experience | Primary tabs |
| --- | --- | --- |
| student | Student App; study-first hero and learning shortcuts | Home, Courses, Study, Rewards, More |
| instructor | Educator Studio; teacher/doctor/lecturer/professor-neutral title | Home, Courses, Learners, Earnings, More |
| owner | Owner Command Center; operational shortcuts | Home, Educators, Courses, Insights, More |

The **More** sheet includes settings and existing routes such as QR Studio and Question Bank. Pages remain routed through existing page functions rather than creating duplicate data.

## Responsive and accessibility rules

- Mobile shell activates at 820px and below. Existing desktop sidebar remains for larger screens.
- Bottom navigation stays thumb-reachable and accommodates phone safe areas.
- Keyboard focus indicators, Escape-to-close and reduced-motion styles are included.
- Mobile navigation is derived from the session role, and is checked against existing route permissions.
- Design retains the Academy's light visual systems; mobile accent distinguishes roles without replacing the selected theme.

## Future educator expansion

The **instructor** value is a backward-compatible internal permission category, **not** a claim that every educator is a school teacher. In production identity, separate these concepts:

- Authorization role: student / educator / owner.
- Educator type: school teacher / trainer / university lecturer / professor / medical doctor / other.
- Display title, institution, specialty, verification status, and verified credentials where applicable.

Show self-declared titles as unverified until they have been validated. Never grant owner capabilities based on an academic title. Academic ranks and authorization roles are independent.

## Production prerequisites

The repository is still a static demonstration. Local-browser session selection, course numbers, rewards, financial summaries, and preview workflows must **not** be treated as production authentication, accurate reports, or payment balances. Before launch:

1. Connect the central RAWNAK Group identity and enforce authorization on the server.
2. Add a database for educator profiles, specialties, course ownership and learner enrollment.
3. Add owner review for educator applications and credential verification, with privacy-aware storage.
4. Back dashboards with verified application data and financial ledger integrations.
5. Perform mobile browser/device QA on 320, 360, 390, 430, 768 and 820px layouts.
6. Add Arabic translation and RTL across dashboards when bilingual rollout begins.

## Manual acceptance checks

- Log into each demo role and confirm distinct greetings, shortcuts and bottom tabs.
- Navigate every tab and More-sheet item; verify the correct page opens.
- Open and close More via button, outside tap and Escape, and test sign out.
- Verify cross-role route URLs remain rejected by existing guards.
- Test classroom, course details, forms, books, QR tools, filters, and settings on mobile without horizontal clipping.
- Confirm the desktop sidebar remains unchanged above 820px.
- Confirm figures still clearly state preview-only status.
