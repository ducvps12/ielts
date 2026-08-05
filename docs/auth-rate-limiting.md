# Authentication rate limiting

## Purpose

The authentication API uses Redis-backed counters to reduce automated account creation, credential stuffing and password-reset abuse across horizontally scaled API instances.

This layer complements CSRF, Argon2id password hashing and server-side sessions. It is not a replacement for an upstream CDN/WAF limit.

## Protected flows

| Flow | Subject | Default quota |
| --- | --- | --- |
| Registration | IP | 10 requests / 1 hour |
| Login requests | IP | 30 requests / 5 minutes |
| Invalid login credentials | normalized email + IP | lock at 5 failures / 15 minutes |
| Password reset | IP | 10 requests / 1 hour |
| Password reset | normalized email | 3 requests / 1 hour |

A successful login clears only the failed-credential counter for that email/IP subject. It does not clear the general login request quota.

## Redis data model

- Keys are namespaced by `AUTH_RATE_LIMIT_PREFIX`.
- Raw email addresses and IP values are never written into Redis keys.
- Subjects are converted to HMAC-SHA256 fingerprints using `SESSION_SECRET`.
- Counter increment and first-expiry assignment happen in one Lua script.
- Counters expire automatically; there is no background cleanup job.

## Failure behavior

When a quota is exceeded, the API returns HTTP `429` with:

```json
{
  "code": "AUTH_RATE_LIMITED",
  "message": "Bạn thao tác quá nhanh. Vui lòng chờ một lúc trước khi thử lại.",
  "scope": "LOGIN_FAILURE",
  "retryAfterSeconds": 900
}
```

When Redis cannot be reached, protected authentication operations fail closed with HTTP `503` and code `AUTH_RATE_LIMIT_UNAVAILABLE`. This prevents one API replica from silently accepting unlimited attempts while the distributed guard is unavailable.

## Environment settings

```dotenv
AUTH_RATE_LIMIT_ENABLED=true
AUTH_RATE_LIMIT_PREFIX=levelup:auth-rate
AUTH_LOGIN_REQUEST_LIMIT=30
AUTH_LOGIN_REQUEST_WINDOW_SECONDS=300
AUTH_LOGIN_FAILURE_LIMIT=5
AUTH_LOGIN_FAILURE_WINDOW_SECONDS=900
AUTH_REGISTER_LIMIT=10
AUTH_REGISTER_WINDOW_SECONDS=3600
AUTH_PASSWORD_RESET_IP_LIMIT=10
AUTH_PASSWORD_RESET_EMAIL_LIMIT=3
AUTH_PASSWORD_RESET_WINDOW_SECONDS=3600
```

Security settings remain environment-managed rather than editable as ordinary admin settings. Changing them requires a deployment and should be reviewed together with traffic patterns, support load and upstream protection.

## Operational notes

- Redis must be reachable from every API replica.
- Use an isolated key prefix per environment.
- Alert on sustained `AUTH_RATE_LIMIT_UNAVAILABLE` responses.
- Track aggregate `429` counts without logging raw passwords, reset tokens, session tokens or full rate-limit keys.
- Add CDN/WAF limits before public launch; keep application limits as the identity-aware inner layer.
