# TalentisOS Optimization Roadmap

## Phase 1 — Safety and broken functionality

Affected areas: `app.js`, `sw.js`, `index.html`, `TalentisOS-X.html`

- Add smoke checks for syntax and required DOM anchors.
- Verify Today, Performance, L10, and Settings are the only primary destinations.
- Verify Today’s Work card scrolls to the embedded section.
- Verify EOD → Huddle → Today preserves task IDs.
- Verify Rock-created work appears in Today.
- Fix service-worker app-shell precaching.
- Record browser console errors and storage failures during manual QA.

Exit criteria: no known broken primary navigation, no data-loss path, and critical daily workflow survives refresh.

## Phase 2 — Dead code removal

Affected area: `app.js`, `styles.css`

- Select the current final implementations of `render`, `todayView`, `huddle`, `tasks`, and timeline helpers.
- Remove earlier duplicate definitions and compatibility wrappers only after their behaviour is covered.
- Remove obsolete `data-view="tasks"` and `Open Tasks` strings.
- Remove dashboard-only markup that is no longer reachable.
- Consolidate duplicated responsive rules.

Exit criteria: each runtime function has one definition and one clear owner.

## Phase 3 — Architecture consolidation

Affected area: `app.js`

- Introduce `taskEngine.create`, `taskEngine.update`, `taskEngine.complete`, `taskEngine.carry`, and `taskEngine.selectors`.
- Migrate producers incrementally without changing existing IDs.
- Add task schema version and migration tests.
- Make route aliases explicit rather than relying on late render overrides.

Exit criteria: all actionable work uses the same mutation/history path.

## Phase 4 — Performance and storage

Affected areas: `app.js`, `sw.js`

- Debounce cloud saves and serialize remote writes.
- Avoid deep cloning for read-only selectors.
- Cache safe derived values during one render.
- Add history retention/export guidance.
- Use an explicit network/cache strategy for app assets.

Exit criteria: no repeated save storm during ordinary input and offline startup loads the app shell.

## Phase 5 — UX simplification

Affected areas: Today, Performance, L10, Settings views

- Keep exception-first Today content.
- Surface Huddle and EOD contextually according to routine state/time.
- Put advanced filters behind a Filter action.
- Add focused empty/success/error states.
- Ensure one primary CTA per workflow.

Exit criteria: a normal workday can run from Today without hunting through modules.

## Phase 6 — Visual refinement and motion

Affected area: `styles.css`

- Consolidate design tokens for spacing, radii, surfaces, and status colors.
- Keep the editorial Today hierarchy and metric-strip interaction.
- Add scroll margins for anchored Today sections.
- Keep transitions CSS-based and reduced-motion aware.
- Remove purely decorative heavy effects if profiling identifies repaint cost.

Exit criteria: visual hierarchy is consistent at 320px, 768px, 1024px, and desktop widths.

## Phase 7 — Responsive and accessibility

Affected areas: HTML, CSS, modal/event helpers

- Test 320, 375, 390, 430, 768, 1024, 1280, and 1440 widths.
- Verify keyboard focus, modal focus restoration, visible focus, labels, and contrast.
- Verify 44px touch targets for primary actions.
- Verify reduced motion and print layouts.

Exit criteria: no clipped primary content, inaccessible controls, or hidden focus states.

## Phase 8 — Verification and documentation

- Add a lightweight browser smoke suite when a test runner is introduced.
- Capture before/after bundle, DOM, and interaction measurements where tooling supports it.
- Re-run daily, Rock, IDS, L10, backup/restore, offline, and print workflows.
- Update audit and architecture docs with completed work and residual risk.

## Safe execution rules

- Work only in `/Users/n365mr/Desktop/GitHub/TalentisOS-X`.
- Do not delete IndexedDB/localStorage data.
- Preserve IDs and legacy fields during migration.
- Make each phase independently syntax-checkable and reversible.
- Avoid broad rewrites until duplicate behavior is covered by smoke checks.
