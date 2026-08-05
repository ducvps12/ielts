# Repository Operating Contract

## Mission

Xây dựng LevelUp — nền tảng quốc tế biến mục tiêu đời thật thành hành trình nhiệm vụ hằng ngày. IELTS 7.5 là template tham chiếu đầu tiên, không phải ranh giới sản phẩm.

LevelUp Core phải hỗ trợ mục tiêu tổng quát. Language Studio là vertical ngôn ngữ cho tiếng Anh, Trung, Pháp và các ngôn ngữ khác. UI locale, ngôn ngữ đang học và ngôn ngữ giải thích là ba khái niệm độc lập.

## Rules

1. Làm theo phase, commit nhỏ, không gom toàn bộ hệ thống vào một lần.
2. Strict TypeScript; không dùng `any` nếu không có giải thích.
3. Business rules không nằm trong React components.
4. Admin mutation phải có permission và audit log.
5. XP, Gold, payment và entitlement dùng append-only facts/ledger, có idempotency.
6. Không để secret trong repository hoặc log.
7. Không fake production data; demo data phải tách riêng, được gắn nhãn và có cấu trúc deterministic.
8. Mỗi feature phải có loading, empty, error, permission-denied và responsive states.
9. Product copy đi qua i18n layer; không dùng lorem ipsum.
10. Legal content chỉ là draft cần chuyên gia phù hợp tại thị trường mục tiêu duyệt.
11. Marketplace, production payments và experimental providers mặc định tắt bằng feature flag.
12. Mỗi phase phải cập nhật tài liệu và chạy lint, typecheck, test, build.
13. Không scrape hoặc tải lại nội dung video/phụ đề khi chưa có quyền và provider policy rõ ràng.
14. UI locale, learning language và native/explanation language không được gộp thành một field.
15. Tiền dùng integer minor units + ISO currency. Return URL không chứng minh thanh toán thành công.
16. Provider webhook phải verify signature, lưu event idempotently và đi qua domain transition trước khi cấp entitlement.

## Target stack

- pnpm workspaces + Turborepo
- Next.js App Router cho web và admin
- NestJS + Fastify cho API
- PostgreSQL + Prisma
- Redis + BullMQ
- S3-compatible storage, MinIO local
- Shared design system
- Zod, React Hook Form, TanStack Table
- Vitest, Supertest, Playwright, Storybook

## Product layers

```text
LevelUp Core
├─ Goals / journeys / quests / evidence / progress
├─ Gamification / notification / entitlement
├─ Template library
└─ Admin and audit

Language Studio
├─ Language profiles
├─ Practice skills
├─ Video Lab
├─ Vocabulary and spaced review
└─ Exam templates such as IELTS, HSK and CEFR pathways
```

## Required references

Read before changing product boundaries:

- `docs/product-platform-v2.md`
- `docs/internationalization.md`
- `docs/video-learning-engine.md`
- `docs/payments-architecture.md`
- `docs/architecture.md`
- `docs/domain-model.md`
- `docs/route-map.md`
