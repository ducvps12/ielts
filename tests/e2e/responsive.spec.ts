import { randomUUID } from "node:crypto";

import { expect, test, type Page } from "@playwright/test";

const API_BASE_URL = "http://localhost:4000/api/v1";

async function expectNoHorizontalOverflow(page: Page): Promise<void> {
  const overflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    viewportWidth: window.innerWidth,
  }));
  expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.viewportWidth + 1);
}

async function issueCsrf(page: Page): Promise<string> {
  const response = await page.context().request.get(`${API_BASE_URL}/auth/csrf`);
  expect(response.ok()).toBe(true);
  const body = (await response.json()) as { csrfToken: string };
  return body.csrfToken;
}

async function authenticateLearner(page: Page, label: string): Promise<void> {
  const email = `e2e-${label}-${randomUUID()}@levelup.local`;
  const password = "e2e-secure-password-2026";
  const csrfToken = await issueCsrf(page);
  const registration = await page.context().request.post(
    `${API_BASE_URL}/auth/register`,
    {
      headers: { "X-CSRF-Token": csrfToken },
      data: {
        displayName: "E2E Learner",
        email,
        password,
        acceptedTerms: true,
      },
    },
  );

  expect(registration.ok()).toBe(true);
  const registrationBody = (await registration.json()) as {
    developmentVerificationToken?: string;
  };
  expect(registrationBody.developmentVerificationToken).toBeTruthy();

  const verification = await page.context().request.post(
    `${API_BASE_URL}/auth/verify-email`,
    {
      headers: { "X-CSRF-Token": csrfToken },
      data: { token: registrationBody.developmentVerificationToken },
    },
  );
  expect(verification.ok()).toBe(true);

  const loginCsrfToken = await issueCsrf(page);
  const login = await page.context().request.post(`${API_BASE_URL}/auth/login`, {
    headers: { "X-CSRF-Token": loginCsrfToken },
    data: { email, password, remember: false },
  });
  expect(login.ok()).toBe(true);
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

test("anonymous learner routes redirect to login", async ({ page }) => {
  await page.goto("/app/hom-nay");
  await expect(page).toHaveURL(/\/dang-nhap$/);
});

test("learner today dashboard keeps its primary action visible", async ({
  page,
}) => {
  await authenticateLearner(page, "today");
  await page.goto("/app/hom-nay");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Chào buổi sáng",
  );
  await expect(page.getByRole("link", { name: /Tiếp tục học/i })).toBeVisible();
  await expect(page.getByText("E2E Learner")).toBeAttached();
  await expectNoHorizontalOverflow(page);
});

test("Video Lab validates a source and reveals the demo lesson", async ({ page }) => {
  await authenticateLearner(page, "video-lab");
  await page.goto("/app/video-lab");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Biến transcript thành một bài học",
  );

  await page
    .getByLabel("Liên kết YouTube")
    .fill("https://www.youtube.com/watch?v=demo");
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
  await page.goto("http://localhost:3001/admin");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Tổng quan hệ thống",
  );
  await expect(page.getByText("Admin foundation — chưa nối business logic")).toBeVisible();
  await expectNoHorizontalOverflow(page);
});
