# LevelUp — Global Goal Operating System

LevelUp biến một kết quả đời thật thành hành trình có mục tiêu, checkpoint, nhiệm vụ, bằng chứng và tiến độ. IELTS 7.5 là template tham chiếu đầu tiên, không phải ranh giới của sản phẩm.

> Biến mục tiêu đời thật thành nhiệm vụ mỗi ngày.

## Product layers

- **LevelUp Core** — custom goals, journeys, quests, evidence, progress and accountability.
- **Language Studio** — English, Mandarin Chinese, French and other language profiles.
- **Video Lab** — lesson workspace for transcripts and sources the learner is permitted to use.
- **Commerce foundation** — provider-neutral product, plan, checkout, subscription and entitlement models; production payments remain disabled.

## Monorepo

```text
apps/
  web/       Marketing website and learner client
  admin/     Isolated admin control panel foundation
  api/       NestJS + Fastify REST API
  worker/    BullMQ jobs and future notification delivery
packages/
  config/    Typed environment configuration
  contracts/ Shared API and domain contracts
  database/  Prisma schema, client and deterministic seed
  i18n/      Locale catalogue and formatters
  ui/        Shared design tokens, icons and components
```

## Local development

Requirements: Node.js 22+, pnpm 10+ and Docker.

```bash
cp .env.example .env
corepack enable
pnpm install
pnpm infra:up
pnpm db:generate
pnpm db:migrate
pnpm db:seed
pnpm dev
```

For an ephemeral local or CI database, `pnpm db:sync` may be used instead of creating a migration. It is **not** the production release command. Production releases must use reviewed, committed migrations through `pnpm db:deploy`.

Services:

- Web: `http://localhost:3000`
- Admin: `http://localhost:3001/admin`
- API health: `http://localhost:4000/api/v1/health`
- MinIO console: `http://localhost:9001`
- Mailpit: `http://localhost:8025`

## Current real product slice

The repository now contains server-backed identity and custom goals:

- account registration and one-time email verification;
- Argon2id password hashes;
- opaque, revocable, database-backed sessions;
- httpOnly session cookie and double-submit CSRF protection;
- login, logout, forgot-password and reset-password flows;
- private custom-goal create/list/detail/status APIs;
- separate language profiles for UI, learning and explanation languages;
- audit entries for goal creation and status changes;
- client forms connected to the API;
- database-backed integration coverage in CI.

Development-only verification and reset tokens are returned only when `AUTH_DEV_TOKENS_ENABLED=true`. Production must keep this flag disabled and deliver links through the notification worker.

## Quality gates

```bash
pnpm db:validate
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

GitHub Actions also synchronizes an ephemeral PostgreSQL schema before running integration tests.

## Non-negotiable rules

- The API is the authority for business rules.
- React applications never access PostgreSQL directly.
- Goal reads and mutations are scoped to the authenticated owner.
- Raw passwords, session tokens, verification tokens and reset tokens are never persisted.
- XP, Gold and real money use ledger/idempotency designs.
- Admin mutations require permission and audit coverage before activation.
- Marketplace, production payments and arbitrary video ingestion remain disabled until security, legal and operational gates are complete.
- LevelUp does not guarantee IELTS bands, language levels, revenue, weight loss or any other external outcome.

Read `AGENTS.md`, `docs/architecture.md`, `docs/ROADMAP.md`, `docs/product-platform-v2.md`, `docs/route-map.md` and `docs/phase-auth-goals-plan.md` before implementing another phase.
