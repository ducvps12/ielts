"use client";

import { useState, type FormEvent } from "react";
import type {
  LoginRequest,
  PasswordResetRequestedResponse,
  RegisterRequest,
  RegisterResponse,
  SessionResponse,
} from "@levelup/contracts";
import {
  Alert,
  Button,
  Checkbox,
  Input,
} from "@levelup/ui";
import { CircleAlert, CircleCheck, LockKeyhole } from "@levelup/ui/icons";

import {
  ApiClientError,
  withFreshCsrf,
} from "../../lib/api-client";

export type AuthMode = "login" | "register" | "forgot" | "reset";

interface AuthFormProps {
  mode: AuthMode;
}

interface FormNotice {
  tone: "info" | "success" | "danger";
  title: string;
  description: string;
  href?: string;
  hrefLabel?: string;
}

const content = {
  login: {
    title: "Đăng nhập",
    description: "Tiếp tục hành trình và xem nhiệm vụ hôm nay.",
    submit: "Đăng nhập",
  },
  register: {
    title: "Tạo tài khoản",
    description: "Bắt đầu với một mục tiêu và lịch học phù hợp.",
    submit: "Tạo tài khoản",
  },
  forgot: {
    title: "Quên mật khẩu",
    description: "Nhập email để nhận hướng dẫn đặt lại mật khẩu.",
    submit: "Gửi hướng dẫn",
  },
  reset: {
    title: "Đặt lại mật khẩu",
    description: "Tạo mật khẩu mới cho tài khoản của bạn.",
    submit: "Cập nhật mật khẩu",
  },
} as const;

function formString(form: FormData, key: string): string {
  const value = form.get(key);
  return typeof value === "string" ? value : "";
}

export function AuthForm({ mode }: AuthFormProps) {
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<FormNotice>();
  const copy = content[mode];
  const showName = mode === "register";
  const showPassword = mode === "login" || mode === "register" || mode === "reset";
  const showConfirmPassword = mode === "register" || mode === "reset";

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setNotice(undefined);
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const password = formString(form, "password");
    const confirmPassword = formString(form, "confirmPassword");

    if (showConfirmPassword && password !== confirmPassword) {
      setNotice({
        tone: "danger",
        title: "Mật khẩu chưa khớp",
        description: "Hãy nhập lại cùng một mật khẩu ở cả hai ô.",
      });
      setLoading(false);
      return;
    }

    try {
      if (mode === "login") {
        const payload: LoginRequest = {
          email: formString(form, "email"),
          password,
          remember: form.get("remember") === "on",
        };
        await withFreshCsrf<SessionResponse>("/auth/login", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        window.location.assign("/app/hom-nay");
        return;
      }

      if (mode === "register") {
        const payload: RegisterRequest = {
          displayName: formString(form, "displayName"),
          email: formString(form, "email"),
          password,
          acceptedTerms: form.get("terms") === "on",
        };
        const response = await withFreshCsrf<RegisterResponse>("/auth/register", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        const token = response.developmentVerificationToken;
        setNotice({
          tone: "success",
          title: "Tài khoản đã được tạo",
          description: token
            ? "Môi trường phát triển đã tạo liên kết xác minh cục bộ."
            : "Hãy kiểm tra email để xác minh tài khoản trước khi đăng nhập.",
          ...(token
            ? {
                href: `/xac-minh-email?token=${encodeURIComponent(token)}`,
                hrefLabel: "Xác minh tài khoản",
              }
            : {}),
        });
        return;
      }

      if (mode === "forgot") {
        const response = await withFreshCsrf<PasswordResetRequestedResponse>(
          "/auth/forgot-password",
          {
            method: "POST",
            body: JSON.stringify({ email: formString(form, "email") }),
          },
        );
        const token = response.developmentResetToken;
        setNotice({
          tone: "success",
          title: "Đã tiếp nhận yêu cầu",
          description:
            "Nếu email tồn tại, hệ thống sẽ gửi hướng dẫn đặt lại mật khẩu.",
          ...(token
            ? {
                href: `/dat-lai-mat-khau?token=${encodeURIComponent(token)}`,
                hrefLabel: "Mở liên kết phát triển",
              }
            : {}),
        });
        return;
      }

      const token = new URLSearchParams(window.location.search).get("token");
      if (!token) {
        throw new ApiClientError(400, {
          code: "RESET_TOKEN_MISSING",
          message: "Liên kết đặt lại mật khẩu đang thiếu token.",
        });
      }

      await withFreshCsrf<{ reset: true }>("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ token, password }),
      });
      setNotice({
        tone: "success",
        title: "Mật khẩu đã được cập nhật",
        description: "Tất cả phiên cũ đã bị thu hồi. Bạn có thể đăng nhập lại.",
        href: "/dang-nhap",
        hrefLabel: "Đăng nhập",
      });
    } catch (error: unknown) {
      setNotice({
        tone: "danger",
        title: "Không thể hoàn tất yêu cầu",
        description:
          error instanceof ApiClientError
            ? error.message
            : "Kết nối tới máy chủ thất bại. Hãy kiểm tra API và thử lại.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-card">
      <div className="auth-card__icon" aria-hidden="true">
        <LockKeyhole size={24} />
      </div>
      <div className="auth-card__heading">
        <h1>{copy.title}</h1>
        <p>{copy.description}</p>
      </div>

      {notice ? (
        <div>
          <Alert
            tone={notice.tone}
            icon={
              notice.tone === "success" ? (
                <CircleCheck size={20} aria-hidden="true" />
              ) : (
                <CircleAlert size={20} aria-hidden="true" />
              )
            }
            title={notice.title}
            description={notice.description}
          />
          {notice.href ? (
            <p className="auth-card__notice-action">
              <a href={notice.href}>{notice.hrefLabel}</a>
            </p>
          ) : null}
        </div>
      ) : null}

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        {showName ? (
          <Input
            label="Tên hiển thị"
            name="displayName"
            autoComplete="name"
            placeholder="Ví dụ: Minh Đức"
            required
            disabled={loading}
          />
        ) : null}

        {mode !== "reset" ? (
          <Input
            label="Email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="ban@example.com"
            required
            disabled={loading}
          />
        ) : null}

        {showPassword ? (
          <Input
            label={mode === "reset" ? "Mật khẩu mới" : "Mật khẩu"}
            name="password"
            type="password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            hint="Tối thiểu 10 ký tự, tối đa 128 ký tự."
            minLength={10}
            maxLength={128}
            required
            disabled={loading}
          />
        ) : null}

        {showConfirmPassword ? (
          <Input
            label="Nhập lại mật khẩu"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            minLength={10}
            maxLength={128}
            required
            disabled={loading}
          />
        ) : null}

        {mode === "login" ? (
          <div className="auth-form__options">
            <Checkbox label="Ghi nhớ phiên đăng nhập" name="remember" disabled={loading} />
            <a href="/quen-mat-khau">Quên mật khẩu?</a>
          </div>
        ) : null}

        {mode === "register" ? (
          <Checkbox
            label="Tôi đồng ý với điều khoản dự thảo"
            description="Điều khoản và chính sách quyền riêng tư phải được rà soát pháp lý trước khi sản phẩm mở chính thức."
            name="terms"
            required
            disabled={loading}
          />
        ) : null}

        <Button type="submit" size="lg" block loading={loading}>
          {copy.submit}
        </Button>
      </form>

      <div className="auth-card__footer">
        {mode === "login" ? (
          <p>
            Chưa có tài khoản? <a href="/dang-ky">Đăng ký miễn phí</a>
          </p>
        ) : null}
        {mode === "register" ? (
          <p>
            Đã có tài khoản? <a href="/dang-nhap">Đăng nhập</a>
          </p>
        ) : null}
        {mode === "forgot" || mode === "reset" ? (
          <p>
            Quay lại <a href="/dang-nhap">trang đăng nhập</a>
          </p>
        ) : null}
      </div>
    </div>
  );
}
