export interface AuthenticatedUser {
  id: string;
  email: string;
  displayName: string;
  status: "PENDING" | "ACTIVE" | "SUSPENDED" | "DELETED";
  emailVerifiedAt?: string;
  locale: string;
  timezone: string;
}

export interface CsrfResponse {
  csrfToken: string;
}

export interface RegisterRequest {
  displayName: string;
  email: string;
  password: string;
  acceptedTerms: boolean;
}

export interface RegisterResponse {
  user: AuthenticatedUser;
  verificationRequired: true;
  developmentVerificationToken?: string;
}

export interface VerifyEmailRequest {
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  remember?: boolean;
}

export interface SessionResponse {
  user: AuthenticatedUser;
  csrfToken: string;
  expiresAt: string;
}

export interface SessionSummary {
  id: string;
  current: boolean;
  createdAt: string;
  lastSeenAt: string;
  expiresAt: string;
}

export interface SessionListResponse {
  sessions: SessionSummary[];
}

export interface SessionRevokedResponse {
  revoked: boolean;
  currentSessionRevoked: boolean;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetRequestedResponse {
  accepted: true;
  developmentResetToken?: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

export interface ApiErrorPayload {
  code: string;
  message: string;
  requestId?: string;
  fieldErrors?: Record<string, string[]>;
}
