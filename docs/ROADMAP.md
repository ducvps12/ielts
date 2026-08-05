# LevelUp IELTS — Delivery Roadmap

This roadmap is the execution contract for humans and coding agents. Work proceeds in order. A later phase must not hide missing foundations from an earlier phase.

## Product boundary for v1

The first release helps a Vietnamese learner define an IELTS target, receive a daily study plan, submit evidence, maintain streaks, and review progress. Admin users manage content, campaigns, users, moderation, settings, and audit history.

Out of scope until the core loop is proven: marketplace, cash rewards, social feed, live classes, native mobile apps, and multi-tenant white-labeling.

## Phase 0 — Product and architecture contract

### Deliverables
- Product scope and non-goals.
- Domain map and invariants.
- Route map for web, admin, and API.
- Repository rules and quality gates.
- Architecture decision records for major choices.

### Done when
- Every planned module has one clear owner.
- Business-critical invariants are written before implementation.
- Coding agents can identify where a new feature belongs without guessing.

## Phase 1 — Workspace and local infrastructure

### Deliverables
- Four deployable apps: `web`, `admin`, `api`, `worker`.
- Shared packages: `config`, `contracts`, `database`, `ui`, `testing`.
- Docker Compose for PostgreSQL, Redis, MinIO, and Mailpit.
- Typed environment validation.
- Prisma schema, deterministic seed, and migration workflow.
- CI for format check, lint, typecheck, unit tests, and build.

### Done when
- A new developer can run the stack from the README.
- `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build` pass.
- API health check verifies process, database, and Redis connectivity.
- No app imports source code from another app.

## Phase 2 — Design system and responsive shells

### Deliverables
- Design tokens: color, typography, spacing, radius, shadow, motion, and breakpoints.
- Shared accessible primitives in `packages/ui`.
- Marketing, authenticated client, and admin shells.
- Responsive navigation for desktop, tablet, and mobile.
- Loading, empty, error, forbidden, and offline states.
- Storybook or equivalent component catalogue.

### Done when
- Keyboard navigation and visible focus work throughout shells.
- Core pages pass mobile, tablet, laptop, and wide desktop review.
- No page invents one-off colors or spacing outside tokens without explanation.

## Phase 3 — Identity, sessions, RBAC, and audit

### Deliverables
- Email/password registration and login.
- Email verification, password reset, session rotation, and logout-all.
- Roles, permissions, user-role assignment, and route guards.
- Admin audit log for all privileged mutations.
- Rate limiting and brute-force protection.

### Done when
- Anonymous, learner, moderator, content editor, support, and super-admin paths are tested.
- Permission checks live in the API, not only in UI visibility.
- Sensitive tokens are hashed, expire, and cannot be reused.

## Phase 4 — Goal Engine and gamification ledger

### Deliverables
- Goal onboarding and IELTS diagnostic baseline.
- Campaign templates and generated learner campaigns.
- Quest templates, assignments, recurrence, prerequisites, and deadlines.
- Submission/evidence workflow.
- XP and Gold append-only ledgers with idempotency.
- Streak calculation, freeze rules, and reconciliation jobs.

### Done when
- Replaying an API request cannot duplicate rewards.
- Historical balances can be recomputed from ledgers.
- Timezone and missed-day behavior are covered by tests.

## Phase 5 — Learner client application

### Deliverables
- `/app/hom-nay` daily command center.
- Plan, skill practice, quest detail, submission, calendar, progress, achievements, and profile pages.
- IELTS skill views for Listening, Reading, Writing, and Speaking.
- Notification preferences and accessibility preferences.

### Done when
- A learner can complete the full daily loop without admin intervention.
- Every async surface has loading, empty, error, and retry behavior.
- Mobile completion flow is no more than the required number of steps.

## Phase 6 — Admin control panel

### Deliverables
- Operational dashboard with real aggregates.
- User search, status changes, role management, and support notes.
- Campaign and quest template editors with versioning.
- Evidence moderation queues and bulk actions.
- Typed settings and feature flags with validation and audit history.
- CMS for static pages, FAQs, announcements, and legal drafts.

### Done when
- Product settings can be changed safely without direct database edits.
- Dangerous actions require explicit confirmation and appropriate permission.
- Tables support filtering, sorting, pagination, export policy, and saved views where needed.

## Phase 7 — Notifications and worker reliability

### Deliverables
- Email, in-app, and optional Telegram delivery.
- Outbox pattern, retries, dead-letter handling, and idempotent consumers.
- Scheduled daily-plan generation and reminders.
- Admin visibility into failed jobs.

### Done when
- Queue retries never duplicate user-visible effects.
- Failed jobs can be inspected and replayed safely.
- Users can control channel and quiet-hour preferences.

## Phase 8 — Content and IELTS practice engine

### Deliverables
- Question banks, passages, audio metadata, rubrics, and answer explanations.
- Practice sessions, autosave, timers, scoring, and review.
- Writing and Speaking submission workflows prepared for human or AI-assisted feedback.
- Content licensing and provenance fields.

### Done when
- Copyright/source metadata is mandatory for publishable content.
- Scoring logic is versioned and reproducible.
- Interrupted practice sessions can be resumed safely.

## Phase 9 — Legal, privacy, support, and operations

### Deliverables
- Terms, privacy, cookies, community rules, refund policy if commerce is enabled, and data request process.
- Consent records and retention jobs.
- Support tickets, incident banner, and status communication.
- Backup/restore runbook and admin access review.

### Done when
- Legal text is marked as draft until reviewed by qualified Vietnamese counsel.
- Account export/deletion behavior is documented and tested.
- Restore procedure has been rehearsed outside production.

## Phase 10 — Security, performance, and release hardening

### Deliverables
- Threat model, dependency scanning, secret scanning, SAST, and security headers.
- Load tests for core APIs and worker queues.
- Observability: structured logs, metrics, traces, and alert rules.
- Staging deployment, smoke tests, rollback, and release checklist.

### Done when
- Critical paths meet agreed performance budgets.
- Production release can be rolled back without data corruption.
- No unresolved critical or high-severity security finding remains.

## Execution rule

Each implementation pull or direct-main commit must state: phase, scope, files changed, migrations, tests run, known limitations, and next smallest slice. A phase is not complete because screens look finished; it is complete only when its definition of done is demonstrably met.
