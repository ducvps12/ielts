# LevelUp IELTS Platform

Nền tảng biến mục tiêu IELTS 7.5 thành hành trình nhiệm vụ hằng ngày, có website người dùng, admin control panel, Goal Engine, gamification, Telegram notifications và nền móng thương mại.

> Biến mục tiêu đời thật thành nhiệm vụ mỗi ngày.

## Monorepo

```text
apps/
  web/       Marketing website và client app
  admin/     Admin control panel
  api/       NestJS + Fastify API
  worker/    BullMQ jobs và notification delivery
packages/
  config/    Typed environment configuration
  database/  Prisma schema, client và deterministic seed
```

## Chạy local

Yêu cầu Node.js 22+, pnpm 10+ và Docker.

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

Địa chỉ:

- Web: `http://localhost:3000`
- Admin: `http://localhost:3001`
- API health: `http://localhost:4000/api/v1/health`
- MinIO console: `http://localhost:9001`
- Mailpit: `http://localhost:8025`

## Quality gates

```bash
pnpm typecheck
pnpm build
pnpm test
```

## Nguyên tắc

- API là nơi duy nhất thực thi business rules.
- React không truy cập database trực tiếp.
- XP/Gold và tiền thật phải dùng ledger/idempotency.
- Admin mutation về sau phải có permission và audit log.
- Marketplace và commerce mặc định tắt cho tới khi hoàn tất security/legal gate.
- Hệ thống không cam kết người dùng chắc chắn đạt IELTS 7.5.

Xem thêm `AGENTS.md`, `docs/architecture.md` và `docs/phase-1-foundation.md`.
