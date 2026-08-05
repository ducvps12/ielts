import type {
  ApiErrorPayload,
  CsrfResponse,
} from "@levelup/contracts";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1";
const CSRF_COOKIE_NAME = "levelup_csrf";

export class ApiClientError extends Error {
  readonly status: number;
  readonly code: string;
  readonly fieldErrors?: Record<string, string[]>;

  constructor(status: number, payload: ApiErrorPayload) {
    super(payload.message);
    this.name = "ApiClientError";
    this.status = status;
    this.code = payload.code;
    this.fieldErrors = payload.fieldErrors;
  }
}

function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") {
    return undefined;
  }

  const encodedName = `${encodeURIComponent(name)}=`;
  const item = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(encodedName));

  return item ? decodeURIComponent(item.slice(encodedName.length)) : undefined;
}

async function parseError(response: Response): Promise<ApiClientError> {
  let payload: ApiErrorPayload = {
    code: "REQUEST_FAILED",
    message: "Không thể hoàn tất yêu cầu. Hãy thử lại.",
  };

  try {
    const body = (await response.json()) as
      | ApiErrorPayload
      | { message?: string | string[]; error?: string };

    if ("code" in body && typeof body.code === "string") {
      payload = body;
    } else if (Array.isArray(body.message)) {
      payload.message = body.message.join(" ");
    } else if (typeof body.message === "string") {
      payload.message = body.message;
    }
  } catch {
    // Keep the safe generic payload when the response is not JSON.
  }

  return new ApiClientError(response.status, payload);
}

export async function apiRequest<TResponse>(
  path: string,
  init: RequestInit = {},
): Promise<TResponse> {
  const headers = new Headers(init.headers);
  const method = (init.method ?? "GET").toLocaleUpperCase();

  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (!["GET", "HEAD", "OPTIONS"].includes(method)) {
    const csrfToken = readCookie(CSRF_COOKIE_NAME);
    if (csrfToken && !headers.has("X-CSRF-Token")) {
      headers.set("X-CSRF-Token", csrfToken);
    }
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers,
    credentials: "include",
  });

  if (!response.ok) {
    throw await parseError(response);
  }

  if (response.status === 204) {
    return undefined as TResponse;
  }

  return (await response.json()) as TResponse;
}

export async function issueCsrfToken(): Promise<string> {
  const response = await apiRequest<CsrfResponse>("/auth/csrf");
  return response.csrfToken;
}

export async function withFreshCsrf<TResponse>(
  path: string,
  init: RequestInit,
): Promise<TResponse> {
  const csrfToken = await issueCsrfToken();
  const headers = new Headers(init.headers);
  headers.set("X-CSRF-Token", csrfToken);
  return apiRequest<TResponse>(path, { ...init, headers });
}
