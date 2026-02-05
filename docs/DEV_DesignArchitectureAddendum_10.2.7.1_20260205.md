DEV\_DesignArchitectureAddendum\_10.2.7.1\_20260205  
Minimum Viable Cybersecurity — Free Beta MVP (Revised 2026-02-05)  
Status: Active  
Scope: Free Beta MVP only  
Supersedes: DEV\_DesignArchitectureAddendum\_10.2.7\_20260203

Defers: Advanced security hardening to Essential-tier project

---

## **1\. Purpose**

This addendum defines the minimum viable cybersecurity posture required for the Free Beta MVP to be safely exposed to the public internet.

It establishes explicit security controls that must exist now, without introducing:

* New paid vendors  
* High operational overhead  
* Architectural redesign

Goal: reduce realistic risk for a solo-founder product, not achieve formal compliance.

---

## **2\. Security Philosophy (MVP Constraints)**

The Free Beta MVP security posture is based on:

1. Reduce account takeover risk first  
2. Limit abuse and cost amplification  
3. Preserve strict user data isolation  
4. Fail closed, visibly, and deterministically  
5. Prefer small, explicit controls over broad frameworks

This is not a SOC2/ISO/enterprise model. It is a constrained, founder-operated baseline aligned with 10.2.

---

## **3\. Threat Snapshot (MVP)**

In scope for this addendum:

* Credential stuffing / password reuse  
* Abuse of expensive projection endpoints  
* Cross-origin data exfiltration via misconfigured CORS  
* Accidental secret exposure in logs or source  
* Raw error leakage that reveals stack traces or internal structure  
* Reasonable database integrity and survivability for Free Beta

Explicitly out of scope for MVP (deferred to Essential-tier or later):

* Advanced client-side compromise scenarios  
* Targeted nation-state level attacks  
* Formal compliance frameworks  
* Sophisticated insider threat modeling

---

## **4\. Backend Security Controls (Required)**

### **4.1 Authentication & Authorization**

**Requirement**

* All protected routes must require:  
  * Valid JWT  
  * Correct issuer  
  * Non-expired token  
* JWT verification is mandatory at the route boundary.  
* No controller, service, or mapper may assume authentication implicitly.

**Password storage**

* Passwords must never be stored in plaintext.  
* Algorithm policy:  
  * Argon2id (preferred)  
  * bcrypt (acceptable fallback)  
* Complexity: length-based enforcement only (MVP), aligned with 10.2.

**Current implementation (MVP)**

* Authentication is JWT-based.  
* A centralized auth context plugin verifies:  
  * Signature using `JWT_SECRET`  
  * Issuer using `JWT_ISSUER` (legacy `SUPABASE_JWT_*` naming is being removed)  
  * Expiration  
* Protected routes (projection, CRUD, categories, tier, etc.) are wired through this context and enforce authentication at the Fastify layer.  
* Passwords are hashed with `bcryptjs` with a cost factor of 10\.

**Differences vs original spec (and rationale)**

* Argon2id is not used for MVP; bcrypt is used instead.  
  * Rationale: bcrypt is battle-tested, already integrated in the codebase, and avoids introducing new crypto dependencies and complexity at this stage. Argon2id is reserved for a later upgrade when operational load and migration can be planned.  
* JWT issuer environment naming is normalized to `JWT_ISSUER` instead of `SUPABASE_JWT_ISSUER`.  
  * Rationale: Supabase is no longer used for auth; keeping Supabase-specific env names created confusion and mis-implementation risk.

**Deferred / known gaps**

* Migration from bcrypt to Argon2id (including rehash-on-login path) is deferred to Essential-tier.  
* Authorization logic still relies on tier information derived from claims established earlier in the stack; full “tier from JWT only, never from client-supplied fields” hardening belongs in a later hardening addendum.

---

### **4.2 Rate Limiting (MVP Mandatory)**

**Requirement**

Rate limiting must be applied to:

* `POST /api/v1/auth/*`  
* `POST /api/v1/projection/run`

Characteristics:

* IP-based buckets  
* Route-specific limits  
* Blocks requests before DB or projection engine execution

Purpose:

* Reduce credential-stuffing risk  
* Prevent projection abuse and cost spikes  
* Bound blast radius for automated abuse

**Current implementation (MVP)**

* `@fastify/rate-limit` is registered once at the app level with `global: false`.  
* Per-route rate limits are configured via `config.rateLimit` on:  
  * `POST /api/v1/auth/register`  
  * `POST /api/v1/auth/login`  
  * `POST /api/v1/projection/run`  
* Limits are env-driven:  
  * `RATE_LIMIT_MAX_AUTH`, `RATE_LIMIT_WINDOW_AUTH_MS`  
  * `RATE_LIMIT_MAX_PROJECTION`, `RATE_LIMIT_WINDOW_PROJECTION_MS`  
* In test environments: `.env.test` sets high limits (e.g., 1000 requests / 60s) so contract tests can exercise behavior without tripping security controls.

**Differences vs original spec (and rationale)**

* Original addendum implicitly assumed rate limiting would behave identically in all environments.  
  * Actual behavior: production/staging/dev use strict limits; test environment uses relaxed limits to keep tests deterministic and focused on domain behavior.  
  * Rationale: tests must validate projection/auth contracts without being accidentally blocked by rate limiting. Security behavior is still validated via dedicated tests and configuration.

**Deferred / follow-ups**

* Additional tier-aware rate limits (e.g., tighter for Free vs Essential) are deferred to Essential-tier.  
* Central reporting/alerting on repeated 429s is explicitly out of scope for MVP.

---

### **4.3 Request Validation & Size Limits**

**Requirement**

All backend endpoints must enforce:

* Schema validation (Zod or equivalent)  
* Explicit request body size limits

Validation must cover:

* Shape and required fields  
* Date ranges  
* Numeric fields (amounts, balances, thresholds)

Invalid requests:

* Are rejected early  
* Return stable, non-leaky error envelopes  
* Never reach domain logic

**Current implementation (MVP)**

* All public API routes are wired through Zod-based validators or equivalent schema validation modules.  
* Projection controller enforces:  
  * Valid date formats and boundaries  
  * Free tier window constraints  
  * Required accounts/transactions for import payloads  
  * Threshold constraints (e.g., negative thresholds rejected with `PROJECTION_INVALID_REQUEST`)  
* Fastify/global config enforces explicit `bodyLimit` for JSON payloads so oversized requests are rejected at the framework boundary.  
* Error responses use the existing envelope (`{ error: { type, message } }`), not raw Zod errors.

**Differences vs original spec (and rationale)**

* Original addendum did not distinguish between domain-level validation errors and framework-level `VALIDATION_FAILED` errors.  
  * Implementation now uses:  
    * Framework validation errors → `VALIDATION_FAILED`  
    * Projection-specific request issues → `PROJECTION_INVALID_REQUEST`  
  * Rationale: clearer taxonomy, keeps projection semantics separate from generic validation noise.

**Deferred / follow-ups**

* Central, documented error taxonomy unification across all controllers is ongoing in separate hardening work.  
* Extra defense-in-depth (e.g., stricter numeric bounds beyond business requirements) is deferred.

---

### **4.4 CORS Policy (Tightened)**

**Requirement**

Backend CORS must move from permissive to explicit allowlist.

Allowed origins (minimum):

* `https://app.fortunetell.app`  
* Approved preview domains (if used)  
* Local development origins

Rules:

* Wildcard origins are prohibited in production.  
* Credentials may only be enabled when strictly required.

**Current implementation (MVP)**

* CORS is centralized and env-driven via `CORS_ALLOWED_ORIGINS` (comma-separated) and applied at the Fastify layer.  
* Production configuration allowlists:  
  * Primary app domain(s)  
  * Any explicitly configured preview domains  
* Local dev origins (e.g., `http://localhost:3000`) are allowed only in non-production environments.  
* `credentials` is enabled to support the current frontend behavior, but is bounded by the origin allowlist.

**Differences vs original spec (and rationale)**

* Original spec stated “credentials disabled unless explicitly required.”  
  * Implementation enables credentials for MVP due to existing frontend dependencies.  
  * Rationale: changing this now would require refactoring frontend networking and potentially authentication flows. The risk is mitigated by a strict allowlist and the limited scope of the Free Beta.

**Deferred / follow-ups**

* Revisiting credential requirements (with a shift toward cookie-based auth) will be handled in the HttpOnly-cookie migration thread.  
* Adding environment-specific presets (e.g., “production only these two origins”) is a future convenience, not an MVP requirement.

---

### **4.5 Security Headers**

**Requirement**

Backend must enable standard security headers via middleware such as Helmet:

* `X-Content-Type-Options`  
* `X-Frame-Options`  
* `Referrer-Policy`  
* Reasonable defaults for other core headers

Content Security Policy (CSP):

* Explicitly deferred until AdSense and other marketing integration is stable  
* Must not block app functionality during MVP

**Current implementation (MVP)**

* `@fastify/helmet` (or equivalent integration) is enabled globally with:  
  * Core headers active (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, etc.)  
  * CSP disabled for MVP to avoid breakage of front-end and ad integrations.

**Differences vs original spec (and rationale)**

* No difference in intent; CSP remains explicitly deferred.  
* Implementation deliberately does not attempt “half-CSP” rules that would be fragile under layout or asset changes.

**Deferred / follow-ups**

* A dedicated CSP design and rollout (post-AdSense) is required in a separate hardening thread.  
* Any future third-party scripts must be explicitly considered during CSP design.

---

### **4.6 Logging & Audit Events**

**Requirement**

Security-relevant events must be logged without leaking sensitive data.

Examples:

* Authentication failures  
* Rate-limit triggers  
* Repeated 4xx/5xx patterns that indicate abuse  
* Serious infrastructure or DB failures

Rules:

* No JWTs, secrets, or passwords in logs  
* Logs are diagnostic, not forensic

**Current implementation (MVP)**

* Global error handling centralizes unexpected errors and maps them into the public error envelope; logs are written via Fastify’s logger with non-sensitive context.  
* Rate limiting:  
  * `onExceeded` handler on `@fastify/rate-limit` emits a structured `rate_limit_exceeded` log entry containing: method, URL, IP, key, and relevant limit context.  
  * No request body, headers, tokens, or secrets are logged.  
* Authentication and projection failures are logged at appropriate levels (info/warn/error) with stable, non-sensitive metadata.

**Differences vs original spec (and rationale)**

* Original doc did not explicitly call out rate-limit logging; MVP now explicitly logs rate-limit exceed events to support operational visibility.  
* The current logging strategy intentionally avoids building a full “audit log” feature; it focuses on operational diagnostics.

**Deferred / follow-ups**

* Centralized, queryable security log aggregation (e.g., external log service) is deferred.  
* Per-user or per-session audit trails are deferred to Essential-tier.

---

## **5\. Frontend Security Posture (MVP)**

### **5.1 Token Handling**

**Requirement**

* JWT stored in `localStorage` is accepted for MVP with explicit acknowledgment of risk.  
* No new token storage model for MVP.  
* Mitigation via reduction of XSS surface, not via storage relocation.

**Current implementation (MVP)**

* Frontend continues to store the JWT in `localStorage`.  
* UI and rendering paths avoid dynamic HTML injection and user-generated HTML rendering.

**Differences vs original spec (and rationale)**

* No change from original addendum; this is an explicitly accepted trade-off given current scope and resources.

**Deferred / follow-ups**

* Migration to HttpOnly cookies and corresponding backend changes is deferred to a separately scoped project.

---

### **5.2 Import / Restore Safety**

**Requirement**

* All import/restore flows must validate:  
  * Overall payload size  
  * Transaction and account counts  
  * Field types and required fields  
* Malformed payloads must be rejected with safe, user-facing errors.  
* No raw JSON parse errors or stack traces should surface.

**Current implementation (MVP)**

* Frontend import flows implement:  
  * Size and shape validation (array length, required keys, reasonable limits)  
  * Defensive parsing around imported JSON  
  * Clear, user-facing error messages instead of raw exceptions  
* Backend validates imported data when sent to the projection API (see 4.3).

**Differences vs original spec (and rationale)**

* None at the high-level; this area was brought into alignment with the addendum during the current implementation work.

**Deferred / follow-ups**

* Additional UX improvements (e.g., per-field error display for imports) are product concerns, not security requirements.

---

### **5.3 No Raw Error Leakage**

**Requirement**

* User-visible UI must never show:  
  * Stack traces  
  * Raw backend exception messages  
  * Database errors  
  * Internal error codes intended only for logs  
* All errors shown to the user must be mapped to stable, non-leaky messages consistent with the brand messaging framework.

**Current implementation (MVP)**

* Login, registration, and projection flows have been updated so that:  
  * Backend errors are mapped to user-safe messages (e.g., “Invalid email or password”, “We couldn’t run your forecast right now”).  
  * Known earlier raw errors (including on the login page) have been removed.  
* Global error boundaries catch unexpected errors and show a generic, branded error message rather than raw exception text.

**Differences vs original spec (and rationale)**

* Original addendum stated “No raw backend error messages surfaced to the user” but did not enumerate specific pages.  
  * Implementation now brings the login flow and other known offenders into compliance, aligning reality with the original intent.

**Deferred / follow-ups**

* Full audit of all edge UI states (rare branches) is recommended, but not required for MVP; any raw error discovered later must be treated as a regression against this addendum.

---

## **6\. Operational Security (No New Vendors)**

### **6.1 Secrets Management**

**Requirement**

* All secrets must live only in:  
  * Render environment variables (backend)  
  * Vercel environment variables (frontend)  
* Secrets must never be committed to source control.  
* Any suspected exposure must trigger rotation.

**Current implementation (MVP)**

* Backend and frontend configuration rely on Render/Vercel env vars for:  
  * `DATABASE_URL`  
  * `JWT_SECRET`, `JWT_ISSUER`  
  * Other app secrets and keys  
* `.env.example` (and similar template files) **only** document variable names and non-secret defaults; they do not contain real secrets.  
* Real `.env`/`.env.local` files used for development are excluded via `.gitignore`.

**Differences vs original spec (and rationale)**

* Original state of the repo had historical secret exposure (committed `.env` files).  
  * Cleanup and rotation steps have been defined and partially executed; the normative policy is “no secrets in git, ever.”

**Deferred / follow-ups**

* Any remaining legacy secrets that were exposed historically must be rotated (JWT, DB, any third-party keys), even if current code no longer references them.  
* A short operational checklist (“steps to rotate JWT and DB credentials”) is recommended but tracked outside this addendum.

---

## **7\. Database Backups & Health**

**Requirement**

* The production database must not be a single point of irreversible failure.  
* Health endpoints must exist and be callable without exposing sensitive information.

**Current implementation (MVP)**

* Backend exposes health endpoints (e.g., `/api/v1/health`, `/api/v1/health/auth`) that:  
  * Return narrowly scoped status (up/down, basic checks)  
  * Do not leak sensitive internals in the payload  
* Render Postgres provides baseline durability and automatic backups as part of the managed service; no additional vendors or heavy data pipelines are introduced.

**Differences vs original spec (and rationale)**

* Original addendum implied more explicit backup strategy (scheduled exports, additional guarantees).  
  * Current implementation relies on Render’s managed behavior for Free Beta to avoid plan upgrades and additional operational complexity.  
  * Rationale: MVP scope, non-critical volume of production data, and cost constraints.

**Deferred / follow-ups**

* Formal backup policy (including scheduled exports, off-platform snapshots, and tested restore playbooks) requires a paid tier and belongs to the Essential-tier project.  
* Health checks integrated with monitoring/alerting remain out of scope for Free Beta.

---

## **8\. Implementation Discipline**

The following development discipline is mandatory for any future changes within this scope:

* Authority:  
  * V10.2 remains the source of truth.  
  * This addendum refines scope for MVP security; it does not override V10.2’s core principles.  
* Process:  
  * For each control: **ANALYZE → VERIFY → PATCH → VERIFY**  
  * No bundling of unrelated changes.  
  * Touch as few files as possible.  
  * No refactors, renames, or architectural changes in the name of “security” without explicit design work in a separate thread.  
* Environment awareness:  
  * Security controls may be parameterized per environment (e.g., relaxed limits in tests) but production/staging must always reflect the intended posture described in this addendum.

---

## **9\. MVP Security Exit Criteria (Revised)**

The Free Beta MVP is considered to meet the minimum security bar described here when all of the following are true in production:

1. Rate limiting is active on `POST /api/v1/auth/*` and `POST /api/v1/projection/run`, with per-route, IP-based limits configured via environment variables.  
2. JWT verification (signature, issuer, expiry) is enforced on all protected routes at the Fastify boundary, using `JWT_SECRET` and `JWT_ISSUER`.  
3. CORS is explicitly allowlisted via `CORS_ALLOWED_ORIGINS`, with no wildcard origins in production.  
4. Request validation and body size limits are enforced, and invalid requests return stable, non-leaky error envelopes.  
5. Passwords are securely hashed using bcrypt (with a clear path to Argon2id upgrade in later work).  
6. Security headers are enabled via Helmet (or equivalent) with CSP intentionally deferred.  
7. Security-relevant events (including rate-limit triggers) are logged without including request bodies, headers, tokens, or secrets.  
8. Secrets are stored only in Render/Vercel env vars, not in source control; any historical exposures have been or will be rotated.  
9. Frontend does not surface raw error messages or stack traces to end users; errors are mapped to stable, brand-aligned messages.  
10. Import/restore flows enforce size and schema validation both on the frontend and backend.

At that point, the MVP is “secure enough” to operate as a Free Beta with documented, deliberate trade-offs. Any control listed as “Deferred / follow-ups” remains explicitly out of scope for this addendum and must be handled in future security threads.

