import { expect, test, type Page } from "@playwright/test";

async function expectNoHorizontalOverflow(page: Page): Promise<void> {
  const overflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    viewportWidth: window.innerWidth,
  }));
  expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.viewportWidth + 1);
}

test("marketing home remains usable across target viewports", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Đừng chỉ đặt mục tiêu",
  );
  await expect(
    page.getByRole("link", { name: /Khởi tạo hành trình/i }),
  ).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("login form exposes accessible fields", async ({ page }) => {
  await page.goto("/dang-nhap");
  await expect(page.getByRole("textbox", { name: "Email" })).toBeVisible();
  await expect(page.getByLabel("Mật khẩu")).toBeVisible();
  await expect(page.getByRole("button", { name: "Đăng nhập" })).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("learner today dashboard keeps its primary action visible", async ({ page }) => {
  await page.goto("/app/hom-nay");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Chào buổi sáng",
  );
  await expect(page.getByRole("link", { name: /Tiếp tục học/i })).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("Video Lab validates a source and reveals the demo lesson", async ({ page }) => {
  await page.goto("/app/video-lab");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Biến transcript thành một bài học",
  );

  await page.getByLabel("Liên kết YouTube").fill("https://www.youtube.com/watch?v=demo");
  await page.getByRole("button", { name: "Xem bài học mẫu" }).click();

  await expect(
    page.getByRole("heading", {
      name: "How responsibility shapes difficult decisions",
    }),
  ).toBeVisible();
  await expect(page.getByText("conscience", { exact: true }).first()).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("admin dashboard renders an explicit API foundation state", async ({ page }) => {
  await page.goto("http://127.0.0.1:3001/admin");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Tổng quan hệ thống",
  );
  await expect(page.getByText("Admin foundation — chưa nối business logic")).toBeVisible();
  await expectNoHorizontalOverflow(page);
});
