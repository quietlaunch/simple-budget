# **DEV\_DesignArchitectureAddendum\_10.2.7\_20260203**

## **Minimum Viable Cybersecurity — Free Beta MVP**

**Status:** Active  
 **Scope:** Free Beta MVP only  
 **Supersedes:** None  
 **Defers:** Advanced security hardening to Essential-tier project

---

## **1\. Purpose**

This addendum defines the **minimum viable cybersecurity posture** required for the Free Beta MVP to be safely exposed to the public internet.

It establishes **explicit security controls** that must exist now, without introducing:

* new paid vendors,

* high operational overhead,

* or architectural redesign.

The goal is **risk reduction**, not comprehensive compliance.

---

## **2\. Security Philosophy (MVP Constraints)**

The Free Beta MVP security posture is based on the following principles:

1. **Reduce account takeover risk first**

2. **Limit abuse and cost amplification**

3. **Preserve strict user data isolation**

4. **Fail closed, visibly, and deterministically**

5. **Prefer small, explicit controls over broad frameworks**

This is not a SOC2, ISO, or enterprise security model.  
 It is a **practical, founder-operated baseline**.

---

## **3\. Threat Model (Explicit)**

The MVP must defend against:

* Credential stuffing and brute-force login attempts

* Automated abuse of projection endpoints

* JWT/session leakage via misconfiguration

* Cross-user data access due to missing scoping

* Corrupted or malicious payloads (imports, oversized requests)

Threats explicitly **out of scope** for MVP:

* Nation-state actors

* Zero-day browser exploits

* Advanced insider threats

---

## **4\. Backend Security Controls (Required)**

### **4.1 Authentication & Authorization**

**JWT-based authentication (locked)**

* All protected routes **must** require:

  * Valid JWT

  * Correct issuer

  * Non-expired token

* JWT verification is mandatory at the route boundary.

* No controller, service, or mapper may assume authentication implicitly.

**Password storage**

* Passwords **must never** be stored in plaintext.

* Required:

  * Argon2id (preferred), or

  * bcrypt (acceptable fallback).

* Password complexity rules are intentionally minimal:

  * Length-based enforcement only.

---

### **4.2 Rate Limiting (MVP Mandatory)**

Rate limiting **must** be applied to:

* `POST /api/v1/auth/*`

* `POST /api/v1/projection/run`

Characteristics:

* IP-based buckets

* Route-specific limits

* Block requests before DB or projection engine execution

Purpose:

* Prevent credential stuffing

* Prevent projection abuse

* Cap infrastructure cost exposure

---

### **4.3 Request Validation & Size Limits**

All backend endpoints must enforce:

* Schema validation (e.g., Zod or equivalent)

* Explicit request body size limits

* Upper bounds on:

  * Transaction array length

  * Date ranges

  * Numeric fields (amounts, balances)

Invalid requests:

* Are rejected early

* Return stable, non-leaky error envelopes

* Never reach domain logic

---

### **4.4 CORS Policy (Tightened)**

Backend CORS must move from permissive to **explicit allowlist**:

Allowed origins (minimum):

* `https://app.fortunetell.app`

* Approved preview domains (if applicable)

* Local development origins

Rules:

* Credentials disabled unless explicitly required

* Wildcard origins are prohibited in production

---

### **4.5 Security Headers**

The backend must enable standard security headers via a middleware such as Helmet:

* `X-Content-Type-Options`

* `X-Frame-Options`

* `Referrer-Policy`

* Sensible defaults for other headers

Content Security Policy (CSP):

* Explicitly deferred until post-AdSense stabilization

* Must not block app functionality during MVP

---

### **4.6 Logging & Audit Events**

The backend must record **non-sensitive security events**:

* Login success / failure

* Password reset requests

* Rate-limit triggers

* Invalid token usage

Rules:

* No JWTs, secrets, or passwords in logs

* Logs are diagnostic, not forensic

---

## **5\. Frontend Security Posture (MVP)**

### **5.1 Token Handling**

* JWT stored in `localStorage` is accepted for MVP.

* This is a **known tradeoff**.

* Mitigation is achieved by:

  * Eliminating dynamic HTML injection paths

  * Avoiding user-generated HTML rendering

Future migration to HttpOnly cookies is deferred.

---

### **5.2 Import / Restore Safety**

Backup import must be treated as **untrusted input**:

* File size limits enforced

* Schema validation required

* Partial failures handled deterministically

* No raw backend error messages surfaced to the user

---

## **6\. Operational Security (No New Vendors)**

### **6.1 Secrets Management**

* All secrets live only in:

  * Render environment variables

  * Vercel environment variables

* Secrets must never be committed to source control.

* JWT secrets must be rotated if exposure is suspected.

---

### **6.2 Availability & Recovery**

* Backend must expose:

  * `GET /api/v1/health`

* Automated database backups must be enabled.

* Recovery capability is considered part of security posture.

---

## **7\. Explicit Non-Goals (Deferred)**

The following are **intentionally deferred**:

* Full CSP hardening

* WAF or CDN security layers

* Advanced intrusion detection

* Formal compliance frameworks (SOC2, ISO)

* Client-side encrypted storage

These may be revisited during Essential-tier development.

---

## **8\. Implementation Discipline**

All security changes must follow:

`ANALYZE → VERIFY → PATCH → VERIFY`

Rules:

* Touch as few files as possible

* No refactors unless explicitly authorized

* No new paid services without approval

* No behavior changes outside this addendum

---

## **9\. Exit Criteria (MVP)**

The Free Beta MVP security posture is considered acceptable when:

1. Rate limiting is active on auth and projection endpoints

2. JWT verification is enforced on all protected routes

3. CORS is explicitly allowlisted

4. Request validation and size limits are enforced

5. Passwords are securely hashed

6. Security-relevant events are logged without leaking secrets

At this point, the MVP is considered **safe enough to operate publicly**, with known, documented tradeoffs.

---

**End of Addendum**

