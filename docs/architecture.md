# Architecture

## Style
Modular monolith trong monorepo, gồm bốn deployable apps:

- `apps/web`: marketing và client application.
- `apps/admin`: admin control panel tách biệt.
- `apps/api`: REST API và domain authority.
- `apps/worker`: queue, lịch nhắc, Telegram và background jobs.

Dữ liệu dùng PostgreSQL; Redis cho queue/cache; S3-compatible storage cho evidence và assets.

## Module boundaries

- identity
- authorization
- goals
- campaigns
- quests
- gamification
- evidence
- community
- notifications
- commerce
- cms
- settings
- moderation
- audit

UI không truy cập database trực tiếp. Mọi business rule quan trọng nằm trong API/domain services và được kiểm thử.

## Configuration hierarchy

1. Environment variables: secrets và infrastructure.
2. Typed database settings: cấu hình sản phẩm có thể đổi từ admin.
3. Feature flags: rollout và emergency shutdown.
4. Campaign-template rules.
5. User preferences.

## Delivery phases

0. Architecture và domain map.
1. Monorepo, infrastructure và CI.
2. Design system và responsive shells.
3. Auth, RBAC và audit.
4. Goal Engine và gamification.
5. Client application.
6. Admin control panel.
7. Telegram/notifications.
8. Commerce foundation.
9. CMS, legal và support.
10. Security/performance/release hardening.
