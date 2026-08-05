# Phase 1 — Engineering foundation

## Scope delivered

This phase turns the initial landing-page repository into a deployable modular-monolith foundation.

- `apps/web`: public website and future authenticated client.
- `apps/admin`: isolated admin control panel on port 3001.
- `apps/api`: NestJS/Fastify API on port 4000.
- `apps/worker`: BullMQ background worker.
- `packages/config`: typed environment validation.
- `packages/database`: Prisma schema, client and deterministic seed.
- PostgreSQL, Redis, MinIO and Mailpit through Docker Compose.
- GitHub Actions quality workflow.

## Local startup

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

Services:

- Web: http://localhost:3000
- Admin: http://localhost:3001
- API health: http://localhost:4000/api/v1/health
- MinIO console: http://localhost:9001
- Mailpit: http://localhost:8025

## Boundary rules

1. React applications never query PostgreSQL directly.
2. Domain mutations belong to the API and later require authorization and audit logging.
3. Background delivery and scheduled work belong to the worker.
4. Environment variables are for secrets and infrastructure; editable product behavior will live in typed, versioned system settings.
5. Wallet values are not edited directly. Future balance changes will be append-only ledger transactions.

## Deferred intentionally

Authentication, RBAC, Goal Engine business services, payment providers and Telegram delivery are not implemented in this foundation phase. Their modules will be layered on top of this structure.
