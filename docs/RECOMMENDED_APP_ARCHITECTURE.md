# Recommended TalentisOS Architecture

## Navigation

```text
TALENTISOS
├── Today
│   ├── Morning Huddle (contextual routine)
│   ├── Today’s Work (embedded execution surface)
│   ├── Needs Attention
│   ├── Upcoming / Overdue / Completed / All (secondary tabs)
│   └── End of Day (contextual routine)
├── Performance
│   ├── Overview
│   ├── Scorecard
│   ├── Rocks
│   └── Management KPIs
├── L10
│   ├── Prepare
│   ├── Meeting flow
│   ├── Shared Scorecard/Rock review
│   ├── Task Engine To-Dos
│   ├── Contextual IDS
│   └── History
└── Settings
    ├── Workspace and routines
    ├── Performance configuration
    ├── Rock configuration
    ├── Appearance
    ├── Data
    └── About
```

IDS is contextual rather than primary navigation. Tasks are an invisible data layer rather than a public destination.

## Source-of-truth model

```text
EOD ───────────────┐
Morning Huddle ────┤
Rocks ─────────────┤
KPIs → IDS ────────┤ → Task Engine → Today’s Work → Completion → EOD
L10 ───────────────┤
Manual Today ──────┘
```

## Task Engine

`state.tasks` remains the canonical collection. Each record should converge on:

```js
{
  id,
  title,
  description,
  owner,
  status,
  priority,
  createdDate,
  due,
  committedDate,
  completedDate,
  source,
  sourceId,
  relatedRockId,
  createdDuringL10,
  carryOverCount,
  blockedReason,
  lastUpdated,
  history: [{ at, event, details }]
}
```

Existing fields such as `movedToTodayDate`, `movedToHuddleDate`, `carry`, and `source` should be retained during migration for compatibility, then treated as legacy projections rather than new sources of truth.

## Runtime layers

1. **State layer** — load, normalize, migrate, save, sync.
2. **Task Engine layer** — create/update/complete/carry/link helpers and selectors.
3. **View model layer** — Today, Performance, L10, Settings view models.
4. **Rendering layer** — one route map and one render entry point.
5. **Interaction layer** — one delegated event registry plus modal lifecycle.
6. **PWA layer** — service-worker app shell, update and offline policy.

The current app has these responsibilities mixed in `app.js`; this is the target separation for safe incremental refactoring.

## View ownership

- Today owns daily visibility and execution.
- Performance owns KPI/Rock outcome review.
- L10 owns meeting flow and reads shared Performance/Task/IDS data.
- Settings owns configuration and data operations.
- EOD/Huddle/IDS remain workflow components rendered contextually.

## Persistence rules

- Preserve task IDs on every transition.
- Save local state immediately after meaningful mutations.
- Debounce remote sync and serialize remote writes.
- Never write on every keystroke unless the field is explicitly autosaved.
- Keep export/import as a complete snapshot path.
- Add a migration version to future schema changes.

## Performance rules

- One render per user action.
- Derive Today tabs from one selector pass where practical.
- Avoid repeated full-state sorting inside one render.
- Avoid continuous JS animation loops.
- Keep CSS transitions short and reduced-motion aware.
- Precache the app shell and clean obsolete caches on activation.

## Compatibility

Legacy internal route names may remain as aliases during migration:

- `dashboard` → Today
- `huddle` → Today with Huddle context
- `eod` → Today with EOD context
- `rocks`, `scorecard`, `management-kpis` → Performance tab
- `tasks` → Today’s Work section
- `ids` → contextual IDS flow

These aliases should not produce separate public navigation items.
