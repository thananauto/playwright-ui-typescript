# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install                        # install dependencies
npx playwright test                # run all tests
npx playwright test --grep @e2e    # run tests tagged @e2e
npx playwright test e2e/tests/home.spec.ts  # run a single spec file
npx playwright test --ui           # open Playwright UI mode for debugging
npm run type:check                 # TypeScript type check (no emit)
npm run lint:check                 # ESLint check
npm run lint:fix                   # ESLint auto-fix
npm run prettier:check             # Prettier check
npm run prettier:format            # Prettier auto-format
```

Tests run against `https://www.saucedemo.com` (set `URL` in `.env` to override at runtime). Reports are written to
`./playwright-report/<timestamp>/`.

## Architecture

### Directory layout

```
e2e/
  init/       global-setup.ts / global-teardown.ts  (MongoDB lifecycle)
              global-setup-zap.ts / global-teardown-zap.ts  (OWASP ZAP; commented out by default)
  tests/      *.spec.ts  (test files)
page_objects/ one class per SauceDemo page, re-exported via page.ts barrel
utilities/    fixture.ts, mongoclient.ts, test.data.ts, datadog.rum.ts, stepdecorator.ts, read.yml.ts
custom_report/ customreporter.ts + influxdb.ts  (opt-in InfluxDB reporter)
```

### Path aliases (tsconfig.json)

| Alias            | Resolves to       |
| ---------------- | ----------------- |
| `@utilities/*`   | `utilities/*`     |
| `@pageobjects/*` | `page_objects/*`  |
| `@reporter/*`    | `custom_report/*` |
| `@tests/*`       | `e2e/*`           |

Always import via these aliases, not relative paths.

### Test fixture pattern

`utilities/fixture.ts` extends Playwright's `base` test with pre-built page-object fixtures (`homePage`, `checkoutPage`, `prodInfo`,
`prodCart`, `mongoclient`, `readData`). All spec files import `{ test, expect }` from `@utilities/fixture`, never directly from
`@playwright/test`.

### Page Object model

`page_objects/page.ts` is the barrel that re-exports all page classes. Each page class uses `@Steps()` decorator from
`utilities/stepdecorator.ts` to wrap methods as named Playwright steps in the HTML report.

### Optional integrations (all disabled by default via comments in `playwright.config.ts`)

- **InfluxDB reporter** — uncomment `['./custom_report/customreporter.ts']` in `reporter`. Requires InfluxDB running via
  `docker-compose.yml`.
- **ReportPortal** — uncomment `['@reportportal/agent-js-playwright', rpConfig]` in `reporter` and configure `rpConfig.ts` + `.env.rp`.
- **MongoDB global setup** — uncomment `globalSetup`/`globalTeardown` pointing to `e2e/init/global-setup.ts`. Requires `DB_CONN_STRING`,
  `DB_NAME`, `COLLECTION_NAME` in `.env`.
- **OWASP ZAP** — swap global setup/teardown to the `-zap` variants. Requires a running ZAP proxy (default `localhost:8080`).
- **Datadog RUM** — `utilities/datadog.rum.ts` + `utilities/datadog.fixture.ts`; wire into fixture when needed.

### Commit message format

Enforced by commitlint. Pattern: `[ENV][Tag] - message`

```
[QA][Smoke] - Fixed login test
[STAGE][Home|Cart] - Updated selectors
```

Valid ENV values: `QA`, `TEST`, `STAGE`. Tags correspond to test annotation names (e.g. `@home`, `@e2e`).

## graphify knowledge graph

This project has a knowledge graph at `graphify-out/` with god nodes, community structure, and cross-file relationships.

- For codebase questions, first run `graphify query "<question>"` when `graphify-out/graph.json` exists.
- Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts.
- Read `graphify-out/GRAPH_REPORT.md` for broad architecture review.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
