"use client";

import type {
  SessionListResponse,
  SessionResponse,
  SessionRevokedResponse,
  SessionSummary,
} from "@levelup/contracts";
import {
  Alert,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
} from "@levelup/ui";
import {
  CircleAlert,
  CircleCheck,
  Clock,
  LogOut,
  RotateCcw,
  ShieldCheck,
} from "@levelup/ui/icons";
import { useCallback, useEffect, useState } from "react";

import { ApiClientError, apiRequest } from "../../lib/api-client";

interface Notice {
  tone: "success" | "danger";
  title: string;
  description: string;
}

const dateFormatter = new Intl.DateTimeFormat("vi-VN", {
  dateStyle: "medium",
  timeStyle: "short",
});

function formatTimestamp(value: string): string {
  return dateFormatter.format(new Date(value));
}

function errorMessage(error: unknown): string {
  return error instanceof ApiClientError
    ? error.message
    : "Không thể kết nối tới máy chủ. Hãy thử lại.";
}

export function SessionSettingsPanel() {
  const [sessions, setSessions] = useState<SessionSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [action, setAction] = useState<string>();
  const [notice, setNotice] = useState<Notice>();

  const loadSessions = useCallback(async (): Promise<void> => {
    setLoading(true);

    try {
      const response = await apiRequest<SessionListResponse>("/auth/sessions");
      setSessions(response.sessions);
    } catch (error: unknown) {
      setNotice({
        tone: "danger",
        title: "Không thể tải danh sách phiên",
        description: errorMessage(error),
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadSessions();
  }, [loadSessions]);

  async function rotateCurrentSession(): Promise<void> {
    setAction("rotate");
    setNotice(undefined);

    try {
      await apiRequest<SessionResponse>("/auth/sessions/rotate", {
        method: "POST",
      });
      setNotice({
        tone: "success",
        title: "Đã làm mới khóa phiên",
        description:
          "Token cũ đã bị thu hồi và trình duyệt đang dùng một token mới với cùng thời hạn.",
      });
      await loadSessions();
    } catch (error: unknown) {
      setNotice({
        tone: "danger",
        title: "Không thể làm mới phiên",
        description: errorMessage(error),
      });
    } finally {
      setAction(undefined);
    }
  }

  async function revokeSession(sessionId: string): Promise<void> {
    setAction(sessionId);
    setNotice(undefined);

    try {
      const response = await apiRequest<SessionRevokedResponse>(
        `/auth/sessions/${encodeURIComponent(sessionId)}/revoke`,
        { method: "POST" },
      );

      if (response.currentSessionRevoked) {
        window.location.assign("/dang-nhap");
        return;
      }

      setSessions((current) =>
        current.filter((session) => session.id !== sessionId),
      );
      setNotice({
        tone: "success",
        title: "Đã thu hồi phiên",
        description:
          "Thiết bị dùng phiên này sẽ phải đăng nhập lại ở lần truy cập tiếp theo.",
      });
    } catch (error: unknown) {
      setNotice({
        tone: "danger",
        title: "Không thể thu hồi phiên",
        description: errorMessage(error),
      });
    } finally {
      setAction(undefined);
    }
  }

  async function logoutEverywhere(): Promise<void> {
    setAction("logout-all");
    setNotice(undefined);

    try {
      await apiRequest<{ loggedOut: true }>("/auth/logout-all", {
        method: "POST",
      });
      window.location.assign("/dang-nhap");
    } catch (error: unknown) {
      setNotice({
        tone: "danger",
        title: "Không thể đăng xuất tất cả thiết bị",
        description: errorMessage(error),
      });
      setAction(undefined);
    }
  }

  return (
    <section className="session-settings" aria-labelledby="session-settings-title">
      <Card tone="elevated">
        <CardHeader>
          <div className="session-settings__heading">
            <span className="session-settings__icon" aria-hidden="true">
              <ShieldCheck size={22} />
            </span>
            <div>
              <span>ACCOUNT SECURITY</span>
              <h2 id="session-settings-title">Phiên đăng nhập</h2>
              <p>
                Kiểm tra các phiên còn hiệu lực, thu hồi thiết bị khác hoặc đổi token
                của phiên hiện tại.
              </p>
            </div>
          </div>
          <Badge tone="success">
            {loading ? "Đang tải" : `${sessions.length} phiên hoạt động`}
          </Badge>
        </CardHeader>

        <CardContent>
          {notice ? (
            <Alert
              tone={notice.tone}
              icon={
                notice.tone === "success" ? (
                  <CircleCheck size={19} aria-hidden="true" />
                ) : (
                  <CircleAlert size={19} aria-hidden="true" />
                )
              }
              title={notice.title}
              description={notice.description}
            />
          ) : null}

          {loading ? (
            <p className="session-settings__loading">Đang kiểm tra phiên đăng nhập…</p>
          ) : (
            <div className="session-settings__list">
              {sessions.map((session) => (
                <article className="session-settings__item" key={session.id}>
                  <div className="session-settings__item-copy">
                    <div>
                      <strong>
                        {session.current
                          ? "Trình duyệt hiện tại"
                          : "Phiên đăng nhập khác"}
                      </strong>
                      {session.current ? (
                        <Badge tone="primary">Hiện tại</Badge>
                      ) : null}
                    </div>
                    <span>
                      <Clock size={16} aria-hidden="true" />
                      Hoạt động gần nhất {formatTimestamp(session.lastSeenAt)}
                    </span>
                    <small>
                      Tạo {formatTimestamp(session.createdAt)} · hết hạn{" "}
                      {formatTimestamp(session.expiresAt)}
                    </small>
                  </div>

                  {session.current ? (
                    <Button
                      variant="outline"
                      size="sm"
                      loading={action === "rotate"}
                      disabled={Boolean(action) && action !== "rotate"}
                      onClick={() => void rotateCurrentSession()}
                    >
                      <RotateCcw size={16} aria-hidden="true" />
                      Đổi token
                    </Button>
                  ) : (
                    <Button
                      variant="danger"
                      size="sm"
                      loading={action === session.id}
                      disabled={Boolean(action) && action !== session.id}
                      onClick={() => void revokeSession(session.id)}
                    >
                      <LogOut size={16} aria-hidden="true" />
                      Thu hồi
                    </Button>
                  )}
                </article>
              ))}
            </div>
          )}

          <div className="session-settings__footer">
            <div>
              <strong>Thấy hoạt động đáng ngờ?</strong>
              <p>
                Thu hồi toàn bộ phiên rồi đăng nhập lại bằng mật khẩu chỉ bạn biết.
              </p>
            </div>
            <Button
              variant="danger"
              loading={action === "logout-all"}
              disabled={Boolean(action) && action !== "logout-all"}
              onClick={() => void logoutEverywhere()}
            >
              <LogOut size={18} aria-hidden="true" />
              Đăng xuất mọi thiết bị
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
