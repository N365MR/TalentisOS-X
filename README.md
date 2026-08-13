# TalentisOS

TalentisOS is a local-first leadership playbook built as a dependency-free vanilla web app.

## Run locally

From this folder, run:

```sh
python3 -m http.server 4173
```

Then open [http://localhost:4173](http://localhost:4173).

The app stores working data in IndexedDB, falls back to localStorage when IndexedDB is unavailable, and supports JSON export/import from Settings. An optional secure GitHub OAuth sync backend is scaffolded in `worker/`; see [worker/README.md](worker/README.md) for setup.

## Verify changes

Run the dependency-free checks before publishing changes:

```sh
node --check app.js
node --check sw.js
node tests/source-integrity.test.mjs
git diff --check
```

The current product architecture and staged simplification work are documented in [docs/RADICAL_SIMPLIFICATION_AUDIT.md](docs/RADICAL_SIMPLIFICATION_AUDIT.md) and [docs/IMPLEMENTATION_STATUS.md](docs/IMPLEMENTATION_STATUS.md).
