# UI Delivery Checklist

This checklist is the sequential execution plan for the frontend and design-system work. A checked item means source code exists; release readiness still depends on the repository quality workflow.

## Phase A — Repository audit

- [x] Read repository contracts and architecture documents.
- [x] Inventory public, client and admin routes.
- [x] Identify the former large marketing page and global CSS debt.
- [x] Document responsive, accessibility and component gaps.
- [x] Separate production facts from explicitly labelled demo data.

## Phase B — Design foundation

- [x] Create reusable design tokens.
- [x] Establish light-first theme and dark-ready token override.
- [x] Define typography, spacing, radius, shadow, container, z-index and motion scales.
- [x] Create shared action, form, feedback, overlay, navigation and table components.
- [x] Centralize the icon library.
- [x] Add loading, empty, error and permission-denied foundations.

## Phase C — Public web

- [x] Split marketing page into section components.
- [x] Add responsive header and mobile drawer.
- [x] Implement hero, product preview, benefits, process, journeys, proof placeholder, FAQ, CTA and footer.
- [x] Implement public content routes.
- [x] Implement authentication UI routes without fake API behavior.
- [x] Implement legal draft pages with review warnings.

## Phase D — Learner client

- [x] Create desktop sidebar and topbar.
- [x] Create tablet compact navigation.
- [x] Create mobile header, bottom navigation and secondary drawer.
- [x] Implement Today dashboard.
- [x] Implement journey map.
- [x] Implement quest list, filters and detail view.
- [x] Implement progress and skill views.
- [x] Add route-level loading, error and not-found states.
- [ ] Replace demo reads with authenticated API queries.
- [ ] Implement idempotent quest completion and ledger updates.

## Phase E — Admin UI

- [x] Mount admin under `/admin`.
- [x] Create responsive shell and permission-aware navigation.
- [x] Add breadcrumb, command foundation and operator menu.
- [x] Add dashboard empty metric states and chart placeholder.
- [x] Add filter, table, pagination and confirmation patterns.
- [x] Add users, goals, campaigns, quests, content, community, reports, notifications, settings and audit routes.
- [x] Add loading, error and not-found states.
- [ ] Connect server-enforced RBAC.
- [ ] Connect admin queries and audited mutations.

## Phase F — Quality gates

- [x] Replace deprecated `next lint` scripts.
- [x] Add ESLint flat configuration.
- [x] Add focused Vitest tests for data, routes, environment, schema, API health and worker connection parsing.
- [x] Add Playwright projects for 375, 430, 768, 1024, 1280 and 1440 widths.
- [x] Add horizontal-overflow and critical-route smoke tests.
- [x] Configure GitHub Actions to run install, Prisma generation, lint, typecheck, unit tests, build and E2E.
- [ ] Resolve every failure from the first complete CI run.
- [ ] Commit and enforce a generated `pnpm-lock.yaml`.
- [ ] Add visual regression baselines after layouts stabilize.

## Next vertical slice

1. Inspect the first complete quality workflow and repair failures without disabling rules.
2. Implement Identity and RBAC contracts at API level.
3. Replace Today-page demo reads with a read-only campaign endpoint.
4. Add one quest-completion transaction with idempotency, audit and XP/Gold ledger entries.
5. Connect the admin user table to a permission-protected paginated endpoint.
