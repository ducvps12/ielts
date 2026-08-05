"use client";

import { useEffect, useState } from "react";
import { Alert, LinkButton, Skeleton } from "@levelup/ui";
import { CircleAlert, CircleCheck, Mail } from "@levelup/ui/icons";

import { ApiClientError, withFreshCsrf } from "../../lib/api-client";

type VerificationState = "loading" | "success" | "error" | "missing";

export function VerifyEmailCard() {
  const [state, setState] = useState<VerificationState>("loading");
  const [message, setMessage] = useState("Đang xác minh liên kết...");

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    if (!token) {
      setState("missing");
      setMessage("Liên kết xác minh đang thiếu token.");
      return;
    }

    void withFreshCsrf<{ verified: true }>("/auth/verify-email", {
      method: "POST",
      body: JSON.stringify({ token }),
    })
      .then(() => {
        setState("success");
        setMessage("Email đã được xác minh. Tài khoản của bạn đã sẵn sàng.");
      })
      .catch((error: unknown) => {
        setState("error");
        setMessage(
          error instanceof ApiClientError
            ? error.message
            : "Không thể kết nối tới máy chủ xác thực.",
        );
      });
  }, []);

  return (
    <div className="auth-card auth-card--status">
      <div className="auth-card__icon" aria-hidden="true">
        <Mail size={24} />
      </div>
      <div className="auth-card__heading">
        <h1>Xác minh email</h1>
        <p>Liên kết chỉ được dùng một lần và có thời hạn ngắn.</p>
      </div>

      {state === "loading" ? (
        <div aria-live="polite">
          <Skeleton height={18} />
          <Skeleton height={18} width="72%" />
        </div>
      ) : (
        <Alert
          tone={state === "success" ? "success" : "danger"}
          icon={
            state === "success" ? (
              <CircleCheck size={20} aria-hidden="true" />
            ) : (
              <CircleAlert size={20} aria-hidden="true" />
            )
          }
          title={state === "success" ? "Xác minh thành công" : "Không thể xác minh"}
          description={message}
        />
      )}

      <div className="auth-card__actions">
        <LinkButton href="/dang-nhap" block disabled={state === "loading"}>
          Đăng nhập
        </LinkButton>
        <LinkButton href="/tro-giup" variant="outline" block>
          Xem trợ giúp
        </LinkButton>
      </div>
    </div>
  );
}
