import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const routeFiles = [
  "app/(marketing)/page.tsx",
  "app/(marketing)/gioi-thieu/page.tsx",
  "app/(marketing)/cach-hoat-dong/page.tsx",
  "app/(marketing)/thu-thach/page.tsx",
  "app/(marketing)/bang-gia/page.tsx",
  "app/(auth)/dang-nhap/page.tsx",
  "app/(auth)/dang-ky/page.tsx",
  "app/app/hom-nay/page.tsx",
  "app/app/lo-trinh/page.tsx",
  "app/app/nhiem-vu/page.tsx",
  "app/app/luyen-tap/page.tsx",
  "app/app/video-lab/page.tsx",
  "app/app/tien-do/page.tsx",
  "app/app/thanh-tich/page.tsx",
  "app/app/cong-dong/page.tsx",
  "app/app/thong-bao/page.tsx",
  "app/app/ho-so/page.tsx",
  "app/app/cai-dat/page.tsx",
] as const;

describe("web route contract", () => {
  it.each(routeFiles)("keeps %s implemented", (routeFile) => {
    expect(existsSync(resolve(process.cwd(), routeFile))).toBe(true);
  });
});
