# Repository Operating Contract

## Mission
Xây dựng nền tảng Việt Nam biến mục tiêu đời thật thành hành trình nhiệm vụ hằng ngày. Vertical đầu tiên: IELTS 7.5 trong 180 ngày.

## Rules
1. Làm theo phase, commit nhỏ, không gom toàn bộ hệ thống vào một lần.
2. Strict TypeScript; không dùng `any` nếu không có giải thích.
3. Business rules không nằm trong React components.
4. Admin mutation phải có permission và audit log.
5. XP, Gold và tiền dùng append-only ledger, có idempotency.
6. Không để secret trong repository hoặc log.
7. Không fake production data; demo data chỉ từ deterministic seed.
8. Mỗi feature phải có loading, empty, error, permission-denied và responsive states.
9. UI tiếng Việt qua i18n layer; không dùng lorem ipsum.
10. Legal content chỉ là draft cần chuyên gia pháp lý Việt Nam duyệt.
11. Marketplace mặc định tắt bằng feature flag.
12. Mỗi phase phải cập nhật tài liệu và chạy lint, typecheck, test, build.

## Target stack
- pnpm workspaces + Turborepo
- Next.js App Router cho web và admin
- NestJS + Fastify cho API
- PostgreSQL + Prisma
- Redis + BullMQ
- S3-compatible storage, MinIO local
- Tailwind CSS + shared design system
- Zod, React Hook Form, TanStack Table
- Vitest, Supertest, Playwright, Storybook
