"use client";

import { useState, type FormEvent } from "react";
import {
  Alert,
  Button,
  Checkbox,
  Input,
} from "@levelup/ui";
import { CircleAlert, LockKeyhole } from "@levelup/ui/icons";

export type AuthMode = "login" | "register" | "forgot" | "reset";

interface AuthFormProps {
  mode: AuthMode;
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

export function AuthForm({ mode }: AuthFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const copy = content[mode];
  const showName = mode === "register";
  const showPassword = mode === "login" || mode === "register" || mode === "reset";
  const showConfirmPassword = mode === "register" || mode === "reset";

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setSubmitted(true);
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

      {submitted ? (
        <Alert
          tone="info"
          icon={<CircleAlert size={20} aria-hidden="true" />}
          title="UI đã sẵn sàng, API xác thực chưa được nối"
          description="Biểu mẫu đang chạy ở chế độ giao diện nền. Không có dữ liệu đăng nhập nào được gửi hoặc lưu."
        />
      ) : null}

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        {showName ? (
          <Input
            label="Tên hiển thị"
            name="displayName"
            autoComplete="name"
            placeholder="Ví dụ: Minh Đức"
            required
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
          />
        ) : null}

        {showPassword ? (
          <Input
            label={mode === "reset" ? "Mật khẩu mới" : "Mật khẩu"}
            name="password"
            type="password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            hint="Tối thiểu 8 ký tự trong bản UI; quy tắc thật sẽ do API xác thực quyết định."
            required
          />
        ) : null}

        {showConfirmPassword ? (
          <Input
            label="Nhập lại mật khẩu"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
          />
        ) : null}

        {mode === "login" ? (
          <div className="auth-form__options">
            <Checkbox label="Ghi nhớ phiên đăng nhập" name="remember" />
            <a href="/quen-mat-khau">Quên mật khẩu?</a>
          </div>
        ) : null}

        {mode === "register" ? (
          <Checkbox
            label="Tôi đồng ý với điều khoản dự thảo"
            description="Điều khoản và chính sách quyền riêng tư phải được rà soát pháp lý trước khi sản phẩm mở chính thức."
            name="terms"
            required
          />
        ) : null}

        <Button type="submit" size="lg" block>
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
