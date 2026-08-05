import type { SessionResponse } from "@levelup/contracts";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

function apiBaseUrl(): string {
  const internalApiUrl = process.env.API_URL;
  if (internalApiUrl) {
    return `${internalApiUrl.replace(/\/$/, "")}/api/v1`;
  }

  return (
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1"
  ).replace(/\/$/, "");
}

export async function requireServerSession(): Promise<SessionResponse> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  if (!cookieHeader) {
    redirect("/dang-nhap");
  }

  let response: Response;
  try {
    response = await fetch(`${apiBaseUrl()}/auth/session`, {
      headers: { cookie: cookieHeader },
      cache: "no-store",
    });
  } catch {
    throw new Error(
      "Không thể kết nối tới dịch vụ xác thực. Hãy kiểm tra API và thử lại.",
    );
  }

  if (response.status === 401) {
    redirect("/dang-nhap");
  }

  if (!response.ok) {
    throw new Error(
      `Dịch vụ xác thực trả về lỗi ${response.status}. Hãy thử lại sau.`,
    );
  }

  return (await response.json()) as SessionResponse;
}
