\*\*DEV\_DesignArchitecture\_10.2.1\_20260128\*\*  
    
\*\*Last Updated: 2026-01-28\*\*  

\*\*Status: Locked / Production-Ready\*\* 

\*\*Supersedes: DEV\_DesignArchitecture\_10.2\_20260120, DEV\_DesignArchitectureAddendum\_10.2.1\_20260122, DEV\_DesignArchitectureAddendum\_10.2.2\_20260126, DEV\_DesignArchitectureAddendum\_10.2.3\_20260128\*\*

\---

\#\#\# \*\*0. Document Change Log & Supersession Notice\*\*

\*\*This V10.2.1 document is a complete consolidation of the frozen V10.0 architecture and all subsequent normative addenda through 10.2.3.\*\* All prior documents are hereby deprecated and replaced by this single source of truth.

\*\*Superseded Documents:\*\*  
\- ASSET\_DesignArchitecture\_10.0\_20251109.txt (base architecture)  
\- DEV\_DesignArchitectureAddendum\_10.4\_20251222.txt (superseded by 10.4.1)  
\- DEV\_DesignArchitectureAddendum\_10.7.1\_\* (superseded by 10.7.2)  
\- DEV\_DesignArchitectureAddendum\_10.10.txt (superseded by 10.10.2)  
\- DEV\_DesignArchitectureAddendum\_10.9\_20251226.txt (clarified and subsumed by 10.11)  
\- DEV\_StorageSpecFreeTier\_1.0\_20251221.txt (subsumed by Section 19\)  
\- DEV\_AdPlacementSpecFreeTier\_1.0\_20251221.txt (subsumed by Section 20\)  
\- All other addendums from the 10.1–10.11 series  
\- DEV\_DesignArchitectureAddendum\_10.1.1\_20251230.txt (integrated into Section 19.5)  
\- DEV\_DesignArchitectureAddendum\_10.1.2\_20260101.txt (integrated into Section 20\)  
\- DEV\_DesignArchitectureAddendum\_10.1.3\_20260104.txt (\*\*obsolete; superseded by 10.2.2\*\*)  
\- DEV\_DesignArchitectureAddendum\_10.1.4\_20260104.txt (added as Section 31\)  
\- DEV\_DesignArchitectureAddendum\_10.1.5\_20260108.txt (added as Section 32\)  
\- DEV\_DesignArchitectureAddendum\_10.1.6\_20260109.txt (integrated into Section 18.2)  
\- DEV\_DesignArchitectureAddendum\_10.1.7\_20260111.txt (replaced Section 21\)  
\- DEV\_DesignArchitectureAddendum\_10.1.8\_20260112.txt (added as Section 33\)  
\- DEV\_DesignArchitectureAddendum\_10.1.9\_20260115.txt (integrated into Section 21.4)  
\- DEV\_DesignArchitectureAddendum\_10.1.10\_20260118.txt (added as Section 34\)  
\- DEV\_DesignArchitectureAddendum\_10.2.1\_20260122.txt (integrated into Section 21.6)  
\- DEV\_DesignArchitectureAddendum\_10.2.2\_20260126.txt (corrective; integrated into Section 6.4)  
\- DEV\_DesignArchitectureAddendum\_10.2.3\_20260128.txt (documentary; integrated into Sections 5, 10, 18.2)

\*\*Critical Production Corrections (from V10.1 base):\*\*  
\- Database Backend: Render → Render PostgreSQL (hosting platform change, see Section 5.1)  
\- CSS Framework: Tailwind → CSS Modules (see Section 21\)

\---

\#\#\# \*\*0.1 Addendum Integration Log (2025-12-30 → 2026-01-28)\*\*

| Addendum | Date | Integration Type | Target Section |  
|----------|------|------------------|----------------|  
| 10.1.1 | 2025-12-30 | \*\*Addition\*\* | 19.5 Import/Export/Auto-Export Semantics |  
| 10.1.2 | 2026-01-01 | \*\*Replacement\*\* | Section 20 (Ad Placement) \- Complete rewrite with AdSense specification |  
| 10.1.3 | 2026-01-04 | \*\*Addition\*\* | 6.4 Days Remaining Semantics (\*\*obsolete; superseded by 10.2.2\*\*) |  
| 10.1.4 | 2026-01-04 | \*\*Addition\*\* | Section 31 Design Tokens System & Domain Strategy |  
| 10.1.5 | 2026-01-08 | \*\*Addition\*\* | Section 32 AI Discovery & Semantic Integrity |  
| 10.1.6 | 2026-01-09 | \*\*Addition\*\* | 18.2 Repository Separation Model |  
| 10.1.7 | 2026-01-11 | \*\*Replacement\*\* | Section 21 CSS Implementation Doctrine \- Complete replacement with Token-Only, Component-Scoped Styling |  
| 10.1.8 | 2026-01-12 | \*\*Addition\*\* | Section 33 Frontend Layout System & View Architecture |  
| 10.1.9 | 2026-01-15 | \*\*Addition\*\* | 21.4 Button Semantics & CSS Cleanup Protocol |  
| 10.1.10 | 2026-01-18 | \*\*Addition\*\* | Section 34 Frontend Implementation Status & Patterns |  
| 10.2.1 | 2026-01-22 | \*\*Addition\*\* | Section 21.6 Icon System (canonical infrastructure) |  
| 10.2.2 | 2026-01-26 | \*\*Corrective Replacement\*\* | Section 6.4 Days Remaining Semantics (restores V10.1 zero-line behavior) |  
| 10.2.3 | 2026-01-28 | \*\*Documentation\*\* | Sections 5, 10, 18.2 (frontend-backend wiring, auth, test state) |

\---

\#\#\# \*\*1. Purpose\*\*

FortuneTell is a cash-flow-first budgeting system for people with irregular income. It combines the control of zero-based budgeting with the foresight of dynamic cash-flow projection.

\*\*Core Goal:\*\* Show users when shortfalls will happen—not tell them what to cut.

The app uses a minimal model architecture that can flex from simple monthly budgeting to complex, multi-account cash-flow forecasting.

\---

\#\#\# \*\*2. Design Rationale\*\*

Traditional budgeting tools assume fixed monthly income and predictable expenses. FortuneTell assumes volatility—income, expenses, and timing all vary.

Design choices emphasize flexibility, data integrity, and low cognitive load:  
1\. Cash-flow centric: Budgets and projections share the same data model.  
2\. Low input friction: Most actions take one tap; color cues replace text alerts.  
3\. Predictive clarity: Visual warnings show when users must act, not what to do.  
4\. Time-agnostic budgeting: Any start/end period, not locked to calendar months.  
5\. Adaptable domain model: Minimal core classes reused across features.

\---

\#\#\# \*\*3. Model Design Philosophy\*\*

Models are intentionally few and multi-purpose:  
\- Each represents a data container that can be configured for many workflows.  
\- New capabilities are added by extending properties, not creating new entities.  
\- Query logic treats categories and subcategories uniformly, enabling flexible envelopes.  
\- The system behaves consistently even as users add, rename, or delete envelopes mid-cycle.

\---

\#\#\# \*\*4. Core Domain Model\*\*

\#\#\#\# \*\*4.1 Entity Relationships\*\*  
\`\`\`  
UserProfile → Budgets → Categories → Transactions  
             ↑  
UserProfile → Accounts → Transactions  
\`\`\`

\#\#\#\# \*\*4.2 Entities & Core Fields\*\*

| Model | Core Fields (Summary) |  
|-------|----------------------|  
| UserProfile | id, email, preferences, accessibilityPreferences |  
| Account | id, userId, name, type, accountNature, startBalance, currentBalance, includeInProjection |  
| Transaction | id, accountId, categoryId, amount, direction, date, postedDate, transType, recurrenceId, externalRef, matchScore, reconciliationState |  
| Category | id, userId, name, type, parentId, budgeted, spent, rolloverMode |  
| Budget | id, userId, name, type, startDate, endDate, durationMonths, isTemplate |  
| RecurrenceRule | id, userId, frequency, anchorDate, duration, endDate |  
| ReconciliationLog | id, userId, accountId, manualTxId, linkedTxId, action, timestamp |

\#\#\#\# \*\*4.3 Enums\*\*  
\- AccountType: operating, savings, investment, credit, cash  
\- AccountNature: asset, liability, equity, contra  
\- Direction: credit, debit  
\- TransType: account, budget, transfer  
\- TxState: created, planned, posted, reconciled, voided  
\- CategoryType: income, expense, saving, debt  
\- RolloverMode: none, carryover, accumulate, reset  
\- BudgetType: monthly, duration, template, scenario  
\- Frequency: weekly, biweekly, monthly, quarterly, annual

\---

\#\#\# \*\*5. System Architecture\*\*

\#\#\#\# \*\*5.1 Deployment Platform \[Updated per Addendum 10.1 \+ Production Correction\]\*\*  
\*\*Backend Hosting:\*\* Render (Node 20+ runtime)  
\- Persistent process, auto-deploy from GitHub main/staging  
\- Zero-downtime redeploy, built-in logging \+ metrics  
\- Stateless (no file-system persistence)  
\- Environment variables managed via Render dashboard

\*\*Database:\*\* Render PostgreSQL  
\- \*\*Correction:\*\* Production system migrated from Supabase to Render PostgreSQL for cost predictability and simplified infrastructure  
\- All references to "Supabase DB" in original V10.0 documents are superseded by this specification

\*\*Auth Service:\*\* JWT Auth (Supabase style) \- retained for authentication

\#\#\#\# \*\*5.2 Technology Stack\*\*

| Layer | Tech | Purpose |  
|-------|------|---------|  
| Backend Runtime | Node 20+, Fastify | Lightweight API server |  
| ORM / DB | Prisma \+ Render PostgreSQL | Strong typing, stable hosting |  
| Frontend | Next.js 14 \+ CSS Modules \[Updated from Tailwind per the v10 styling addendum (internally tracked as "10.3"); now codified in this specification's CSS doctrine (Section 21).\] | Fast, responsive, AI-generable UI |  
| Auth | JWT | Single sign-on & session mgmt |  
| Testing | Jest \+ Playwright | Full automated CI coverage |  
| Deployment | Vercel (frontend) \+ Render (backend) | Click-deploy, rollback capable |  
| Monitoring | Automated logs, p95 latency, error rate | \<0.5% error rate target |

\#\#\#\# \*\*5.3 Architecture Diagram\*\*  
\`\`\`  
Frontend (Next.js \+ CSS Modules)  
        ↓ fetch  
Fastify API Controllers (Render)  
        ↓ call  
Service Layer (ProjectionEngine, TransactionService, BudgetService)  
        ↓ ORM  
Prisma \+ Render PostgreSQL  
\`\`\`

\#\#\#\# \*\*5.4 Frontend-Backend Runtime Integration \[New per Addendum 10.2.3\]\*\*

\*\*5.4.1 Repositories and Environments\*\*

\* \*\*Frontend:\*\* \`fortunetell-frontend\`    
  \* Next.js application.    
  \* Contains unit tests (Vitest) and E2E tests (Playwright).    
\* \*\*Backend:\*\* \`fortunetell-backend\`    
  \* Fastify-based API server.    
  \* Uses Prisma and PostgreSQL.    
  \* Exposes all HTTP routes under a global \`/api/v1\` prefix.  

\*\*Repositories are fully separated.\*\* There is \*\*no monorepo\*\* and \*\*no filesystem coupling\*\* (no \`cd ../backend\` / shared node\_modules / shared build).

\* \*\*Local Development\*\*    
  \* Frontend: \`http://localhost:3000\`    
  \* Backend: \`http://localhost:5000/api/v1\`    
  \* E2E tests: run against \`http://localhost:3000\` (frontend) which in turn calls \`http://localhost:5000/api/v1\` (backend).    
\* \*\*Production\*\*    
  \* Frontend: Vercel (final domain planned: \`https://app.fortunetell.app\`)    
  \* Backend: Render at \`https://fortunetell.onrender.com/api/v1\`    
  \* Frontend communicates directly with the Render backend over HTTPS using the configured API base URL.  

\*\*5.4.2 Runtime Frontend → Backend Contract\*\*

The frontend treats the backend as a \*\*pure HTTP service\*\* at a configured base URL. All backend routes exist under a \*\*single API base path\*\*: \`/api/v1\`. No client-side proxying or Next.js API routes are used for application data; the browser calls the backend directly.

\*\*5.4.3 API Base URL and Environment Variable\*\*

\*\*Single critical env var:\*\* \`NEXT\_PUBLIC\_API\_BASE\_URL\` (frontend)

\* \*\*Scope:\*\* Public (exposed to browser via Next).    
\* \*\*Required:\*\* Yes.    
\* \*\*Meaning:\*\* The \*\*full backend base URL, including \`/api/v1\`\*\*.    
\* \*\*Examples:\*\*    
  \* Local: \`http://localhost:5000/api/v1\`    
  \* Production: \`https://fortunetell.onrender.com/api/v1\`  

All API calls are constructed as: \`\<value of NEXT\_PUBLIC\_API\_BASE\_URL\> \+ \<endpoint path\>\`

Examples:  
\* Auth login: \`https://fortunetell.onrender.com/api/v1/auth/login\`  
\* Forecast run: \`https://fortunetell.onrender.com/api/v1/projection/run\`

\*\*5.4.4 Authentication Model\*\*

\*\*Frontend Auth State\*\*  
\* Implementation: Custom React context (not next-auth / not OAuth).    
\* Storage:    
  \* Token: \`localStorage\["fortuneTell.authToken"\]\`    
  \* User profile: \`localStorage\["fortuneTell.authUser"\]\`    
\* Transport: All authenticated requests send \`Authorization: Bearer \<JWT\>\`. No auth cookies are used; this is \*\*pure bearer-token auth\*\*.

\*\*Backend JWT Behavior\*\*  
\* Secrets / Issuer (environment variables on backend):    
  \* \`SUPABASE\_JWT\_SECRET\` – secret used to sign / verify tokens.    
  \* \`SUPABASE\_JWT\_ISSUER\` – expected \`iss\` claim.    
\* Algorithm: HS256 via \`jsonwebtoken\`.    
\* Lifetime: \*\*7 days\*\* (\`"7d"\` in signing options).    
\* Claims: \`{ "sub": "\<user-id\>", "email": "\<user-email\>", "iss": "\<issuer\>", "iat": \<issued-at\>, "exp": \<expires-at\> }\`  
\* Validation: Header must be \`Authorization: Bearer \<token\>\`. Token must be valid JWT, signed with \`SUPABASE\_JWT\_SECRET\`, matching \`SUPABASE\_JWT\_ISSUER\`. Failure returns error envelope with types: \`AUTH\_INVALID\`, \`AUTH\_EXPIRED\`, \`AUTH\_REQUIRED\`.

\*\*Auth Endpoints\*\* (All paths include \`/api/v1\` prefix):  
\* \`POST /auth/register\` \- Body: \`{ email, password }\`, public, creates user  
\* \`POST /auth/login\` \- Body: \`{ email, password }\`, public, returns \`{ data: { token: "\<JWT\>" } }\`  
\* \`GET /auth/me\` \- Requires \`Authorization: Bearer \<JWT\>\`, returns user object

\*\*5.4.5 Frontend Auth Flow (Normal)\*\*  
1\. User submits credentials to \`/auth/login\`  
2\. Backend returns signed JWT  
3\. Frontend stores token in \`localStorage\` and user profile  
4\. All subsequent API calls include \`Authorization: Bearer \<token\>\` header  
5\. On token expiry or invalidation, backend returns \`AUTH\_EXPIRED\` / \`AUTH\_INVALID\` and frontend clears auth state

\---

\#\#\# \*\*6. Key Service Logic\*\*

\#\#\#\# \*\*6.1 ProjectionEngine\*\*  
\- Deterministic day-by-day balance projection.  
\- Dynamic opening balance \= sum(startBalance \+ postedBeforeStart).  
\- \*\*Color Logic:\*\*  
  \- Red: balance \< 0  
  \- Yellow: balance \< threshold (default $100)  
  \- Green: ≥ threshold  
  \- Blank: no events that day  
\- Dirty-suffix cache per user; recomputes only from changed date forward.  
\- Performance Target: p95 ≤ 200 ms for 180-day horizon, 2,000 tx.  
\- \*\*Free Tier Model:\*\* \[New per Addendum 10.10.2\] Window-correct rolling anchor model (see Section 28).

\#\#\#\# \*\*6.2 TransactionService\*\*  
\- Defines state machine (created → planned → posted → reconciled → voided) \[Clarified: enforcement deferred to frontend, see Section 24\].  
\- Supports single / future / all recurrence editing.  
\- Manages transfer pairing (net zero).  
\- Triggers projection invalidation on save/delete.

\#\#\#\# \*\*6.3 BudgetService\*\*  
\- Clones budgets using rolloverMode (none, carryover, accumulate, reset).  
\- Manages template, duration, and scenario budgets.  
\- Summarizes allocations and variances.

\#\#\#\# \*\*6.4 Days Remaining Semantics — Zero-Line Cash Exhaustion \[Corrected per Addendum 10.2.2\]\*\*

\*\*Authoritative Definition\*\*  
\`daysOfCashRemaining\` represents: The number of days from the projection window start until the first forecasted date where balance \< 0\.

It does NOT represent:  
\- days until crossing an arbitrary warning threshold  
\- a user-tunable "safety buffer"  
\- a soft risk or "low balance" indicator

\*\*Zero-line semantics are authoritative:\*\* Cash exhaustion is defined strictly as balance \< 0\. This restores the V10.1 behavior and invalidates the threshold-driven definition previously introduced in DEV\_DesignArchitectureAddendum\_10.1.3.

\*\*Computation Semantics\*\*  
\*\*Input domain:\*\*  
\- Projection window \[startDate, endDate\] as defined in the main V10.x spec  
\- Per-day balances produced by ProjectionEngine  
\- Threshold (warningThreshold) value in the request: still accepted, used for colorState and "low balance" messaging only, NOT used for daysOfCashRemaining

\*\*Algorithm (logical contract):\*\*  
1\. Let P be the ordered list of projection points for dates d ∈ \[startDate, endDate\], each with balance b(d).  
2\. Find the earliest date d\* in P where b(d\*) \< 0\.  
   \- If such a date exists: daysOfCashRemaining \= daysBetween(startDate, d\*)  
   \- If no such date exists within the window: daysOfCashRemaining \= the current "no shortfall in horizon" sentinel value

\*\*Edge cases:\*\*  
\- If b(startDate) \< 0: daysOfCashRemaining \= 0 (cash is already exhausted at the start of the window)  
\- Free-tier rolling anchor behavior remains unchanged: this addendum does not alter opening balance selection or projection window construction

\*\*Implementation Directive (MVP / V10.2)\*\*  
To minimize change surface and preserve tested behavior:  
\- ProjectionEngine SHALL compute daysOfCashRemaining as if the effective threshold for Days Remaining were 0, regardless of the warningThreshold supplied in the request payload  
\- threshold in the request continues to drive: colorState (red / yellow / green) and any "low balance" messaging  
\- daysOfCashRemaining MUST be computed solely against the zero-line (balance \< 0), not against warningThreshold  
\- No other service or controller may override or post-process daysOfCashRemaining  
\- Any refactor MUST preserve the observable behavior of "days until balance \< 0" for all existing fixtures

\*\*Threshold Semantics (Clarified for V10.2)\*\*  
\*\*warningThreshold:\*\*  
\- User-defined  
\- Drives: colorState \= yellow for 0 ≤ balance \< warningThreshold, associated narration / "low balance" messages  
\- Does NOT affect: daysOfCashRemaining, firstNegativeDate, minBalance

\*\*danger condition:\*\*  
\- Defined strictly as balance \< 0  
\- Drives: colorState \= red, cash exhaustion semantics, daysOfCashRemaining computation, firstNegativeDate and minBalance

\*\*Frontend Responsibility\*\*  
Frontend MUST:  
\- Treat summary.daysOfCashRemaining as "days until projected balance goes negative" and ensure copy and labels reflect this meaning  
\- Continue to respect: threshold-driven color semantics (yellow/green), red for balance \< 0

Frontend MUST NOT:  
\- Describe daysOfCashRemaining as "days until low balance" or "days until crossing your warning threshold"  
\- Re-derive or adjust daysOfCashRemaining using threshold

\*\*Relationship to V10.1 and V10.2\*\*  
\- Restores the V10.1 zero-line interpretation of daysOfCashRemaining  
\- Supersedes and nullifies DEV\_DesignArchitectureAddendum\_10.1.3 and any text in V10.2 that defines or implies threshold-driven Days Remaining  
\- Until the V10.2 Design Architecture document is updated, this addendum is the controlling definition for daysOfCashRemaining

\---

\#\#\# \*\*7. Reconciliation System\*\*

\#\#\#\# \*\*7.1 30-Day Baseline\*\*  
\- Syncs latest 30 days of linked bank transactions.  
\- Matching key: (amount, date ±1 day, accountId, direction).  
\- Auto-reconcile identical matches → lock \+ exclude from edits.  
\- Needs-review items queued in "Reconciliation" screen.  
\- Merge / ignore actions update ReconciliationLog.  
\- ProjectionEngine re-anchors from merge date forward.

\#\#\#\# \*\*7.2 Rolling Anchor Model (Free Tier) \[New per Addendum 10.10.2\]\*\*  
\*\*Governing Principle:\*\* Free-tier projections are window-correct, not inception-correct.

\*\*Frontend Behavior:\*\*  
1\. Identify pre-window posted transactions (date \< projectionWindowStart).  
2\. Fold into opening balance: openingBalance \= baseBalance \+ sum(preWindowPosted).  
3\. Send only in-window transactions to backend.  
4\. Treat backend result as authoritative (no post-processing).

\*\*User Notification:\*\* When creating posted transactions dated before window base:    
"This transaction will be included in the balance you're seeing."

\---

\#\#\# \*\*8. Calendar Semantics \[New Section per Addendum 10.2\]\*\*

\#\#\#\# \*\*8.1 Authority & Responsibility\*\*  
\- \*\*ProjectionEngine:\*\* Effects-only, stateless cash-flow engine. Returns balance points and aggregates only. Does not interpret intent.  
\- \*\*Calendar:\*\* Primary temporal inspection surface. Interprets and surfaces:  
  \- Scheduled intent (planned transactions)  
  \- Coming-due awareness (7-day pre-date window)  
  \- Realized events (posted transactions)  
  \- Archived/voided history  
\- \*\*Invariant:\*\* Calendar never mutates financial semantics or creates causality from balance deltas.

\#\#\#\# \*\*8.2 Event Day Definition\*\*  
A calendar "event day" is any date containing one or more scheduled transactions—of any amount, including zero—within the normalized transaction input set used for projection, evaluated relative to the currently selected scope.

\#\#\#\# \*\*8.3 Scope & Boundaries\*\*  
\- Calendar semantics are evaluated relative to an explicit, user-selectable scope (account scope in Phase 2).  
\- Transfers mark event days based on existence in input set, not net balance effect.  
\- Calendar navigation honors projection horizon limits (Free: 30 days; Essential: 90 days).  
\- Any highlighted event day must be inspectable (read-only) in Phase 2\.

\---

\#\#\# \*\*9. Accessibility Model\*\*

Built-in, not plugin.

| Preference | Function |  
|------------|----------|  
| fontScale | Resizes all text (0.8–1.5×) |  
| highContrast | Toggles WCAG-compliant palette |  
| narrationEnabled | Screen-reader announcements |  
| motionReduced | Disables animations |

\*\*Requirements:\*\*  
\- Each projection point includes {colorState, label, message} for narration.  
\- Contrast ≥ 4.5:1.  
\- Zero critical Axe violations required.

\---

\#\#\# \*\*10. Testing Architecture\*\*

Automated via CI:

| Layer | Tools | Scope |  
|-------|-------|-------|  
| Unit | Jest \+ Vitest | Services \+ helpers, React components, hooks |  
| Integration | Jest \+ Supertest | API contracts |  
| E2E | Playwright | Full UI flows |  
| Contract | openapi-enforcer | Schema drift detection |  
| Perf | tinybench | Projection latency |  
| Accessibility | axe-core | Color/ARIA compliance |

All six oracle fixtures must pass exactly.    
\*\*Pipeline:\*\* lint → unit → integration → contract → perf → e2e → deploy.

\#\#\#\# \*\*10.1 E2E Testing State and CI Integration \[New per Addendum 10.2.3\]\*\*

\*\*Current E2E Status (as of 2026-01-28)\*\*  
\- \*\*Local runs:\*\* All functional E2E tests pass, including account ledger ordering, posted-date semantics, and account-page transaction persistence  
\- \*\*Remaining failures are accessibility-only:\*\* Color-contrast violations (red vs white) detected by axe-core  
\- \*\*CI Behavior:\*\* E2E tests are \*\*intentionally disabled\*\* in frontend CI to avoid blocking on non-critical accessibility contrast issues

\*\*Backend CI\*\*  
\- Runs in \`fortunetell-backend\` only  
\- Behavior: Uses backend directory as root, runs backend install, build, and tests  
\- No references to \`fortunetell-frontend\` repo or frontend tests

\*\*Frontend CI\*\*  
\- Runs in \`fortunetell-frontend\` only  
\- Current pipeline: \`npm ci\` → \`npm run test:unit\` → E2E intentionally omitted  
\- Rationale: E2E tests are sensitive to backend availability and accessibility contrast rules. To avoid blocking CI, E2E runs are currently \*\*developer-triggered\*\* on local machines only.

\#\#\#\# \*\*10.2 Known Gaps and Planned Future Work \[New per Addendum 10.2.3\]\*\*

This section is intentionally forward-looking to prevent future misinterpretation of the current state as "final."

1\. \*\*Accessibility contrast\*\*  
   \- Current UI red/white combinations fail WCAG AA color-contrast  
   \- E2E axe tests correctly flag these  
   \- Plan: resolve during \*\*token / semantic color system\*\* work, then confirm all axe tests pass locally and re-enable E2E in CI (in full or as a smoke subset)

2\. \*\*E2E in CI\*\*  
   \- Long-term goal: run at least a \*\*smoke subset\*\* of E2E tests in CI with predictable backend (dedicated CI backend instance or container) and stable test auth story  
   \- Until then, E2E is \*\*local-only\*\* and must be run manually before high-risk changes

3\. \*\*CORS tightening\*\*  
   \- Production backend should only allow specific frontend origins  
   \- Requires introducing env-based origin configuration and updating deployment runbooks

4\. \*\*Auth in tests\*\*  
   \- E2E should standardize on one of:  
     \* Real login during test setup (preferred for fidelity)  
     \* Clearly documented, test-specific JWT minting utility shared with backend  
   \- Whatever approach is canonical must be documented here and kept in sync with backend auth changes

\---

\#\#\# \*\*11. DevOps\*\*

\- \*\*Hosting:\*\* Vercel (frontend) \+ Render (backend) \+ Render PostgreSQL \+ JWT Auth  
\- \*\*Branches:\*\* dev, staging, main  
\- \*\*CI/CD:\*\* GitHub Actions auto-deploy on merge; prod deploy requires approval  
\- \*\*Healthcheck:\*\* /health endpoint with version \+ DB status  
\- \*\*Rollback:\*\* One-click revert to previous Vercel deploy  
\- \*\*Backups:\*\* Daily PostgreSQL backups; 7-day retention  
\- \*\*Monitoring:\*\* p95 latency, error rate \<0.5%, a11y regression \= 0

\---

\#\#\# \*\*12. Refinement Loop\*\*

Weekly evidence-based cycle:  
1\. \*\*Observe\*\* – collect logs, feedback, metrics  
2\. \*\*Summarize\*\* – Claude generates 1-page report  
3\. \*\*Propose\*\* – AI owners create issue PRs  
4\. \*\*Approve\*\* – you mark approved / deferred  
5\. \*\*Implement\*\* – AI owners patch \+ test  
6\. \*\*Verify\*\* – CI \+ staging confirmation

\*\*Gate for merge\*\* \= all tests green. Version bumps auto-tagged (v1.0.1, v1.0.2, …).

\---

\#\#\# \*\*13. Phase Gates\*\*

| Gate | Focus | Key Metrics |  
|------|-------|-------------|  
| A – Testing MVP | Functional validation | 6/6 oracles pass, p95 ≤ 300 ms |  
| B – Soft Launch | Usability & retention | crash \<1%, projection ±5%, retention ≥25% |  
| C – Public Ready (Pro) | Feature & scale | reconciliation stable, JWT rotation verified |  
| D – Scale & Optimize | Economics | cost/user ≤ $0.40/mo, uptime ≥99.5% |

All gates documented in /reports/gate\_\*.md.

\---

\#\#\# \*\*14. Security and Data Integrity\*\*

\- All queries scoped by userId.  
\- JWT verification middleware on every route.  
\- AES-encrypted storage for sensitive fields.  
\- HTTPS enforced; no PII beyond email.  
\- Audit trail via ReconciliationLog \+ service events.

\---

\#\#\# \*\*15. Accessibility Appendix\*\*

"Data, not decoration."    
Minimal screens, strong color contrast, narration, full keyboard navigation.    
Preference screen appears during onboarding and editable anytime.    
Ensures usability even for visually impaired users seeking a Mint replacement.

\---

\#\#\# \*\*16. Future Extensions\*\*

\- AI transaction reconciliation (match suggestions)  
\- Multi-user shared projections (account sharing)  
\- Scenario forecasting ("what-if" income or rate changes)  
\- Machine-learning spending predictions  
\- Progressive Web App offline mode

\---

\#\#\# \*\*17. Performance Envelope\*\*

| Target | Limit |  
|--------|-------|  
| Projection p95 | ≤200 ms @ 180 days, 2,000 tx |  
| Memory | ≤256 MB |  
| API error rate | \<0.5% |  
| Uptime | ≥99.5% |

\---

\#\#\# \*\*18. File Structure Summary\*\*

\`\`\`  
/spec                → frozen design source  
/backend             → API \+ services  
/frontend            → Next.js UI (CSS Modules only)  
/tests               → fixtures \+ oracles  
/docs                → architecture, gate reports, changelogs  
.github/workflows    → CI/CD  
\`\`\`

\#\#\#\# \*\*18.2 Repository Separation Model \[Updated per Addendum 10.2.3\]\*\*

\*\*Authoritative Repository Model (Locked)\*\*

\*\*FortuneTell is separated into four repositories:\*\*  
1\. \*\*fortunetell-backend\*\* – Frozen core (deterministic forecasting, domain logic)  
2\. \*\*fortunetell-frontend\*\* – Primary product runtime (app.fortunetell.app)  
3\. \*\*fortunetell-site\*\* – Canonical authority surface (fortunetell.app)  
4\. \*\*simple-budget-site\*\* – Front-door discovery surface (simple-budget.app)

\*\*Intent of Each Repo (Binding):\*\*  
\- \*\*fortunetell-backend:\*\* Backend scope is closed for Free \+ Essential MVP semantics. Changes allowed only when: A user-visible correctness bug is proven, or A gated architecture prerequisite is explicitly opened.  
\- \*\*fortunetell-frontend:\*\* Must remain compliant with the lifecycle, storage, and UI doctrine defined in the current architecture specification (this V10.2.x series), including the corrections introduced in Addendum 10.2.3.  
\- \*\*fortunetell-site:\*\* Allowed: forecasting explanations, methodology, pricing, tiers, schema. Prohibited: budgeting workflow ownership, content that creates semantic drift.  
\- \*\*simple-budget-site:\*\* Allowed: budgeting problem framing, workflows, explanatory links to fortunetell.app. Explicitly Forbidden: pricing/tier definitions, SoftwareApplication schema, forecasting mechanics presented as owned.

\*\*Unified Design Tokens Handling:\*\*    
Only one repo may edit tokens directly. All others must treat tokens as read-only inputs to prevent drift, duplication, and high-contrast regressions.

\---

\#\#\# \*\*19. Storage Specification (Free Tier) \[New Section per File 16\]\*\*

\#\#\#\# \*\*19.1 Core Principles\*\*  
\- FortuneTell is local-first for Free tier.  
\- Transactions and accounts are durable inputs.  
\- Forecasts are never stored—derived at view/render time only.  
\- Storage behavior must be explicit, inspectable, and recoverable.

\#\#\#\# \*\*19.2 Storage Domains\*\*

\*\*Profile Domain (Persistent, Client-Side)\*\*  
\- Stores: accessibility preferences, UX settings  
\- Local-first, persists across sessions, safe to backup

\*\*Financial Domain (Persistent, Client-Side)\*\*  
\- Stores: accounts, transactions (posted \+ future)  
\- Single source of truth for forecasts  
\- UI display/window limits never delete underlying data; all transactions persist until explicitly deleted by the user.  
\- Changes trigger re-derivation, not forecast mutation

\*\*Forecast Domain (Non-Persistent)\*\*  
\- Nothing stored, no caching, no history  
\- Derived on: page render, refresh, tier change, transaction change

\#\#\#\# \*\*19.3 Backup & Restore\*\*

\*\*Manual Export (Primary)\*\*  
\- User-initiated JSON export  
\- Contains: accounts, transactions, preferences  
\- Excludes: forecasts, auth tokens

\*\*Auto-Export (Convenience)\*\*  
\- OFF by default, silent failure, non-blocking  
\- Single latest snapshot, local only  
\- Not a guarantee of data safety

\#\#\#\# \*\*19.4 Storage Guardrail\*\*  
If storage behavior ever compromises forecast correctness or user trust, storage must be simplified, not expanded.

\#\#\#\# \*\*19.5 Import, Export, and Auto-Export Operational Semantics \[New per Addendum 10.1.1\]\*\*

\*\*Governing Principle:\*\* Manual import and manual export are explicit, user-controlled operations. Auto-export is a best-effort convenience only and must never be treated as a safety mechanism or durability guarantee.

\*\*Manual Import Authoritative Semantics:\*\*  
\- \*\*Meaning:\*\* A successful manual import establishes authoritative application data state. It is explicit, destructive/replacing, and user-initiated. It is not a preview, partial state, or background operation.  
\- \*\*Accessibility:\*\* Must be accessible from the Account screen with accessibility-critical controls in interaction order. Not gated behind onboarding-only flows.  
\- \*\*Application Readiness:\*\* Successful import establishes readiness, persisting across refresh and sessions, tracked in Profile domain.

\*\*Manual Export:\*\*    
Remains as defined in V10.1: explicit, user-initiated, deterministic, produces full snapshot payload.

\*\*Auto-Export Operational Contract (Clarified & Locked):\*\*  
\- \*\*Trigger Timing:\*\* Only on application lifecycle boundaries (app close, tab close, background/unload events). Must not trigger on data writes, timers, during import processing, or active form interaction.  
\- \*\*Relationship to Manual Import:\*\* Manual import must NOT trigger auto-export to avoid recursion.  
\- \*\*Snapshot Scope:\*\* Uses identical payload to manual export; single latest snapshot retained and silently overwritten.  
\- \*\*Storage Target:\*\* Local-only, using same storage class as manual export.  
\- \*\*Failure Semantics:\*\* Silent, non-blocking, non-retrying, non-guaranteed. Optional internal logging allowed but must not surface to user.  
\- \*\*User-Facing Contract:\*\* Settings toggle must explicitly state auto-export is not a substitute for manual backup, is best-effort only, and provides no durability guarantee.

\---

\#\#\# \*\*20. Ad Placement Specification (Free Tier) \[New Section per Addendum 10.1.2\]\*\*

\#\#\#\# \*\*20.1 Core Principles\*\*  
\- Ads exist solely to fund Free tier sustainability.  
\- Non-intrusive, non-manipulative, peripheral, predictable.  
\- Apply to Free tier only; removed automatically on tier upgrade (immediate, no refresh required).  
\- No behavioral targeting based on financial state.

\#\#\#\# \*\*20.2 Ad Provider & Privacy Policy (AdSense)\*\*  
\*\*Provider:\*\* Google AdSense (primary), configured in non-personalized mode.    
\*\*Targeting Mode:\*\* Limited to contextual signals (page/screen type) and coarse non-user-specific information (approximate location, device type) only for fraud prevention/compliance.    
\*\*Prohibited:\*\* Behavioral targeting based on browsing history, user-level interest profiles from FortuneTell usage.    
\*\*Technical Tracking:\*\* Cookies permitted strictly for frequency capping, fraud detection, and aggregate analytics/billing. No user-level behavioral profiles.    
\*\*Data Sharing:\*\* FortuneTell does not sell or share user-identifiable financial data (transactions, balances, forecasts) with AdSense.    
\*\*Future Partners:\*\* Any partner must support context-first targeting and meet UX, accessibility, and performance requirements below.

\#\#\#\# \*\*20.3 Ad Partner Acceptance Criteria\*\*  
\*\*Legal/Compliance:\*\* Must support US-focused monetization and comply with US federal/state privacy laws.    
\*\*Privacy:\*\* Non-personalized ads as default; allow disabling of interest-based targeting.    
\*\*Content Controls:\*\* Support blocking adult/gambling/predatory lending categories.    
\*\*UX/Performance:\*\* No interstitials, pop-ups, auto-playing audio, layout shifts, screen-reader interference. Scripts must be lightweight.    
\*\*Reporting:\*\* Must expose impressions, clicks, revenue by placement.    
\*\*Economics:\*\* Must plausibly support infrastructure costs at realistic MAU levels.

\#\#\#\# \*\*20.4 Breakpoints & Global Placement Rules\*\*

\*\*Breakpoints:\*\* Mobile (base), Tablet (mirrors mobile, no side-rail), Desktop (inherits mobile \+ right-side panel).

\*\*Global Prohibitions:\*\* Ads never placed on:  
\- Landing pages, onboarding steps, accessibility gates  
\- Top headers, back buttons, bottom navigation (DockBar)  
\- Inside core forecast outputs (days-remaining headline, balance headline, calendar visualization)  
\- Inside form bodies or primary action areas  
\- Inside transaction lists between rows  
\- Inside settings control groups or error/alert banners

\#\#\#\# \*\*20.5 Ad Surfaces — Mobile & Tablet\*\*  
\*\*Main Forecast View (F1):\*\*    
\- Location: Below all primary content (days-remaining, balance, calendar, upcoming list).  
\- Rules: Upcoming list must appear before F1. Max 1 ad unit.

\*\*Account View (A1, A2):\*\*    
\- A1: Between balance card and posted transactions list.  
\- A2: Bottom of scrollable account content.  
\- Cap: Max 2 ads visible (A1 \+ A2). No ads inside transaction list.

\*\*Settings View (S-dividers, S-bottom):\*\*    
\- S-dividers: Between major settings sections only (not inside control groups).  
\- S-bottom: Bottom of settings content.  
\- Cap: Multiple allowed due to low frequency, but must preserve clarity and accessibility.

\*\*Add Transaction Modal (T1):\*\*    
\- Location: Below all inputs and primary submit button, with strong visual separation.  
\- May be suppressed if viewport too small.  
\- Cap: Max 1 ad unit.

\*\*Transaction History Panel (H1):\*\*    
\- Location: Sticky bottom banner inside panel.  
\- List scrolls above H1; close controls unobstructed.  
\- Cap: Max 1 ad unit.

\*\*Daily Bottom Panel (D1):\*\*    
\- Location: Below date heading, expected balance, inflows/outflows lists.  
\- Any day-specific messages appear above D1.  
\- Cap: Max 1 ad unit.

\#\#\#\# \*\*20.6 Ad Surfaces — Desktop Extensions\*\*  
\*\*Right-Side Ad Panel (RightRailAd-\*):\*\*    
\- Per eligible view: RightRailAd-Main, RightRailAd-Account, RightRailAd-Settings.  
\- Visually separate, does not overlap core content, respects accessibility.

\*\*Overlay Behavior:\*\*    
\- History panel open → right-side panel must not be visible (only H1 allowed).  
\- Transaction modal open → right-side panel remains visible (T1 may display concurrently).  
\- Daily panel open → right-side panel remains visible (D1 may display concurrently).

\*\*Desktop Density Guideline:\*\* Target ≤3 ads visible at once (including inline banners, modals, right rail). Settings may tolerate 3–4 due to low usage. Lowest-priority inline banners suppressed when overlays would exceed target.

\#\#\#\# \*\*20.7 Load & Refresh Behavior\*\*  
\*\*Initial Load:\*\* Single load \+ one retry on transient failure. Must stay within performance budget; views must not hang.

\*\*Refresh:\*\*    
\- Persistent surfaces (F1, A1, A2, S-bottom, RightRailAd-\*): Optional time-based refresh (fixed interval, 60–120s, default 90s). No refresh on user interaction or data changes.  
\- Modal/panel surfaces (T1, H1, D1): No refresh while open; new load only on reopen.

\#\#\#\# \*\*20.8 Error Handling & Fallback Behavior\*\*  
\*\*Core Principles:\*\* No user-facing errors, layout stability, no retry spam, no behavioral linkage, internal-only logging.

\*\*Failure Behavior by Surface:\*\*    
\- \*\*Inline banners:\*\* Reserve layout space. On failure: collapse to spacer or neutral empty state. Optional house fallback ("Upgrade to remove ads") permitted.  
\- \*\*Modal/panel banners:\*\* On failure, collapse completely (no placeholder).  
\- \*\*Desktop right rail:\*\* On failure, show house content or collapse to neutral column.

\*\*User Communication:\*\* App UI does not mention ad errors. Free-tier disclosure may state: "Some ad areas may appear empty if an ad cannot be loaded or if ads are blocked. This does not affect how FortuneTell works."

\#\#\#\# \*\*20.9 Telemetry & Monitoring (Internal)\*\*  
\*\*Requirements:\*\* Instrumentation must record:  
\- Slot identifier (F1, A1, etc.)  
\- Outcome per load attempt (loaded, blocked, network, no\_fill, render\_error)  
\- Timestamp (server-side)  
\- View context (main, account, settings, etc.)  
\- Optional: coarse device class (mobile/tablet/desktop)

\*\*Purpose:\*\* Verify impressions, identify broken placements, support optimization decisions.

\*\*MVP Implementation (Minimum):\*\*    
1\. Define canonical slot ID string constants.    
2\. Implement \`logAdEvent(slotId, outcome)\` helper.    
3\. Call from each ad wrapper on success/failure.    
4\. Backend endpoint writes to simple log or DB table (timestamp, slotId, outcome, view, deviceClass).    
No user identifiers or financial data permitted.

\*\*"Good MVP" Extension:\*\* Add view and deviceClass, inspect impressions/failure rates per slot via basic queries/dashboards.

\*\*Explicit Non-Goals for MVP:\*\* No per-user tracking, no joining with AdSense revenue data, no complex analytics pipeline, no click tracking.

\---

\#\#\# \*\*21. Frontend Styling Architecture — Token-Only, Component-Scoped Styling \[Complete Replacement per Addendum 10.1.7\]\*\*

\#\#\#\# \*\*21.1 Core Principle (MUST)\*\*  
FortuneTell uses \*\*Token-Only, Component-Scoped Styling\*\*:  
1\. \*\*All concrete style values MUST come from tokens.css.\*\*  
   \- Colors, backgrounds, borders, radii, shadows, fonts, spacing  
2\. \*\*No raw style values allowed.\*\*  
   \- No hex colors (\#123456), rgb()/hsl() literals, hard-coded shadows, ad-hoc fonts  
3\. \*\*Components MAY define their own classes\*\* but MUST only reference tokens.

\*\*Example (Allowed):\*\*  
\`\`\`css  
/\* CalendarMonth.module.css \*/  
.eventDaySafe {  
  background-color: var(--bg-safe);  
  color: var(--text-on-safe);  
}  
\`\`\`

\*\*Example (Forbidden):\*\*  
\`\`\`css  
.eventDaySafe {  
  background-color: \#00ff00; /\* raw value — forbidden \*/  
}  
\`\`\`

\*\*Priority:\*\* This principle overrides all other styling rules.

\#\#\#\# \*\*21.2 Layers & Responsibilities\*\*

\*\*21.2.1 Tokens (tokens.css)\*\*  
\- Single source of truth for style values.  
\- MAY define brand, app, structural, and semantic tokens.  
\- MUST NOT contain component-specific class names or layout structure.  
\- All other CSS MUST use these tokens.

\*\*21.2.2 Global CSS (globals.css)\*\*  
\*\*Purpose:\*\*  
\- App-wide primitives: base typography, root surfaces, cards, dividers, shell chrome  
\- Global state behaviors: high contrast mode (remaps structural tokens only)  
\- Global utilities that are truly cross-cutting

\*\*Rules:\*\*  
\- MAY define global classes mapping directly to tokens.  
\- MUST NOT introduce raw style values.  
\- MUST NOT be a dumping ground for one-off component styling.

\*\*21.2.3 Component CSS Modules (\*.module.css)\*\*  
\*\*Primary home for component styling.\*\* MAY contain:  
\- Layout & structure (display, flex, grid, position, dimensions, overflow)  
\- Spacing & sizing via tokens (var(--space-\*), var(--radius-\*), etc.)  
\- Component-local visual semantics via tokens (backgrounds, borders, text colors)  
\- Component-root structural styling (cards, surfaces)

\*\*MUST NOT:\*\*  
\- Use raw (non-token) style values.  
\- Define large, generic utility classes used across many unrelated components.  
\- Override HC behavior by redefining tokens.

\#\#\#\# \*\*21.3 Semantics & Logic vs Styling\*\*  
1\. \*\*Domain logic lives in TSX/TypeScript.\*\*  
   \- Calendar semantics, transaction polarity, event-day gating enforced in code.  
2\. \*\*Styling lives in CSS (globals or modules) and uses tokens.\*\*  
   \- Classes map semantic states to tokens (e.g., \`.eventDaySafe\`, \`.creditAmount\`).  
3\. \*\*Calendar event days:\*\* Only event days MAY use semantic color for day cells. Non-event days MUST remain visually neutral. Mobile "signal dots" follow same rule.  
4\. \*\*High contrast:\*\* HC MAY remap structural tokens (surfaces, borders, accents). HC MUST NOT neutralize semantic tokens (calendar states, financial polarity, error semantics). Semantic distinctions MUST remain visible.

\#\#\#\# \*\*21.4 Button Semantics, Token Usage, and CSS Cleanup Protocol \[New per Addendum 10.1.9\]\*\*

\*\*21.4.1 Button Semantic Assignment Rules (Primary/Secondary/Danger)\*\*  
Every interactive \`\<button\>\` that looks like a button MUST be classified as exactly one of:

\*\*(A) Primary – btn btn-primary (green)\*\*    
\*Criteria:\* Single main forward action on surface, advances core flow, commits important positive change.    
\*Examples:\* "Get started", "Sign In", "Add Payout", "Save Transaction"    
\*Implementation:\* \`className="btn btn-primary …"\` → background from \`--button-primary-bg\`

\*\*(B) Danger – btn btn-danger (red)\*\*    
\*Criteria:\* Destructive/scary action, hard to undo, user must pause.    
\*Examples:\* "Delete", "Remove", "Clear", "Reset", "Log out"    
\*Implementation:\* \`className="btn btn-danger …"\` → background from \`--button-danger-bg\`

\*\*(C) Secondary – btn btn-secondary (white/neutral)\*\*    
\*Criteria:\* All other true buttons (navigation, toggles, settings controls, Cancel, Edit, Skip).    
\*Implementation:\* Preferred: \`className="btn btn-secondary …"\` → background from \`--button-secondary-bg\`. If a module wants different neutral semantics, it MUST still use \`btn\` plus local class with appropriate token.

\*\*21.4.2 Button Implementation Constraints\*\*

\*\*Tokens:\*\*    
\- All concrete values for button backgrounds are defined in tokens.css via button role tokens (\`--button-primary-\*\`, \`--button-secondary-\*\`, \`--button-danger-\*\`).    
\- No raw color literals allowed.

\*\*Global CSS (globals.css):\*\*    
\- button reset: Clears browser defaults, does not introduce semantic colors.  
\- \`.btn\`: Provides shared layout, border, typography, interaction primitives. May set text/border using secondary tokens. Must be paired with variant for primary/danger.  
\- Variants (\`.btn-primary\`, \`.btn-secondary\`, \`.btn-danger\`, \`.btn-icon\`) MUST only reference button role tokens or neutral surface/shadow tokens. Must not remap to different semantic meanings.

\*\*Modules (\*.module.css):\*\*    
\- Responsible for layout, contextual spacing, local variants using tokenized colors.  
\- MUST NOT introduce raw color literals for button backgrounds or fight global button semantics.

\*\*21.4.3 Calendar Day Buttons and Tier Semantics\*\*  
Calendar day \`\<button\>\` elements representing event days use \*\*calendar semantic tokens\*\* (\`--bg-safe\`, \`--bg-warning\`, \`--bg-danger\`) NOT button role tokens. This intentional distinction is permitted under the "1% exception" carve-out.

\*\*Tier semantics:\*\* Calendar is tier-agnostic. Free and Essential share same event-day model; differences are horizon \+ storage only. Comments must not state "Calendar is Free tier only."

\*\*21.4.4 Icon Buttons\*\*    
Icon-only buttons must use dedicated pattern (\`.btn-icon\` or helper) that:  
\- Sizes icons using icon size tokens (\`--icon-size-sm/md/lg\`).  
\- Uses neutral/secondary tokens for color/background.  
\- Should not use \`.btn-primary\`/\`.btn-danger\` unless action is truly primary/destructive.

\*\*21.4.5 CSS Cleanup Protocol\*\*  
1\. \*\*Empty rule blocks\*\* (no declarations or only comments) may be deleted.  
2\. \*\*Removing unused classes (modules):\*\* Allowed only if not referenced in TS/TSX as \`styles.\<Name\>\` or string class names.  
3\. \*\*Removing unused classes (globals):\*\* Allowed only if no references in TS/TSX/tests and not a documented design-system utility.  
4\. \*\*Markup and CSS must be cleaned together.\*\* Dead references to deleted rules are not allowed.  
5\. \*\*No "blind" full-CSS cleanups.\*\* Must first run usage analysis and be constrained to empty/proven-unused rules.

\*\*21.4.6 Media Query Breakpoints (Restated)\*\*    
\- Layout breakpoints use hard-coded pixel values (e.g., 480px, 768px) for browser compatibility.  
\- MUST remain aligned with breakpoint values documented in tokens.css.  
\- Must not introduce new breakpoint values not represented in token set.

\#\#\#\# \*\*21.5 AI Execution Rules (Non-Negotiable)\*\*  
Any AI coding assistant MUST obey:  
1\. \*\*Token-Only Rule:\*\* Never add raw style values. If new value required, add as token first.  
2\. \*\*Component-Scoped Styling Rule:\*\* Prefer editing component's \`\*.module.css\`. Do not move component-specific styles to globals "for convenience."  
3\. \*\*Logic vs Styling Separation:\*\* Do not change domain logic when task is purely styling. If change appears to require logic changes, halt and surface as separate task.  
4\. \*\*No Deletion Without Replacement:\*\* Never delete styling without ensuring same semantic meaning is preserved elsewhere.  
5\. \*\*Escalate Gaps:\*\* If needed token does not exist, explicitly note: "Required token is missing for X; update tokens.css first."

Any output violating these rules is non-compliant, even if it builds and passes lint.

\#\#\#\# \*\*21.6 Icon Infrastructure Canonicalization & Token Correction \[New per Addendum 10.2.1\]\*\*

\*\*21.6.1 Icon Source and Location (Canonical)\*\*  
\* Icons are based on Material Design glyphs, represented as inline SVG paths.  
\* All icons use \`viewBox="0 0 24 24"\` (standard Material 24×24 grid).  
\* All UI icons live under \`src/icons/\`, one component per file.  
\* Naming convention: \`src/icons/\[Name\]Icon.tsx\` (e.g., \`HomeIcon\`, \`WalletIcon\`, \`SettingsIcon\`).  
\* \*\*No runtime dependency\*\* on Material Icon fonts or external libraries (no webfont, no sprite sheet). Icon glyphs are stored as inline \`\<path\>\` data.

\*\*21.6.2 Wrapper Component Pattern (Canonical)\*\*  
Every icon component follows:  
\`\`\`tsx  
import type React from 'react';

export function \[IconName\](props: React.SVGProps\<SVGSVGElement\>) {  
  return (  
    \<svg  
      viewBox="0 0 24 24"  
      fill="currentColor"  
      aria-hidden="true"  
      {...props}  
    \>  
      \<path d="\[Material Design icon path data\]" /\>  
    \</svg\>  
  );  
}  
\`\`\`

\*\*Normative characteristics:\*\*  
\- \*\*Typing:\*\* Signature \`export function \[IconName\](props: React.SVGProps\<SVGSVGElement\>)\`  
\- \*\*Props:\*\* Forwarded onto \`\<svg\>\` via \`{...props}\`  
\- \*\*Geometry:\*\* \`viewBox="0 0 24 24"\` required for all icons  
\- \*\*Color:\*\* \`fill="currentColor"\` must be used so color is controlled by CSS/tokens  
\- \*\*Accessibility:\*\* \`aria-hidden="true"\` required by default (icons are decorative; semantics provided by surrounding elements)  
\- \*\*Glyph embedding:\*\* One or more \`\<path\>\` elements from Material glyph data  
\- \*\*Base component:\*\* No base icon component exists in current code; standalone wrappers are canonical for 10.2

\*\*21.6.3 Sizing – Tokens and Utilities\*\*  
Size controlled exclusively by design tokens via global utilities in \`src/styles/globals.css\`:  
\`\`\`css  
.icon-sm { width: var(--icon-size-sm); height: var(--icon-size-sm); }  
.icon-md { width: var(--icon-size-md); height: var(--icon-size-md); }  
.icon-lg { width: var(--icon-size-lg); height: var(--icon-size-lg); }  
\`\`\`

\*\*Normative rules:\*\*  
\- Icons must derive width/height only via \`.icon-sm\`, \`.icon-md\`, or \`.icon-lg\`  
\- Dock icons and system-scale surfaces use \`.icon-lg\` as canonical size  
\- Inline width, height, or \`style={{ width/height }}\` on icons are \*\*disallowed\*\*

\*\*21.6.4 Color – High-Level Rules and Token Hierarchy Correction\*\*

\*\*High-level rules:\*\*  
\- Icon color must be driven by design tokens, not hard-coded values  
\- Color applied via token-backed global utilities (e.g., \`.icon-default\`, \`.icon-strong\`) or inheriting \`currentColor\` from token-based parent

\*\*Design Error (Existing Implementation):\*\*  
Analysis exposed that \`--icon-color-default\` and related icon color tokens currently derive from app-level text tokens (e.g., \`--app-text-secondary\`). This is architecturally incorrect: color semantics should be defined at the root theme layer, and app-level tokens should derive from theme tokens, not the other way around.

\*\*Correct Token Architecture (Canonical Spec):\*\*  
For the 10.2 line, the correct architectural rule is:  
1\. \*\*Root theme tokens are the authoritative source of color\*\*  
   \- Theme-level tokens (e.g., \`--color-fg-default\`, \`--color-fg-muted\`) defined at \`:root\`  
2\. \*\*App-level and icon-level tokens must derive from theme tokens\*\*  
   \- App text tokens: \`--app-text-\*\` → \`--color-fg-\*\` (theme)  
   \- Icon color tokens: \`--icon-color-\*\` → \`--color-fg-\*\` (theme)  
   \- \`--icon-color-\*\` must not depend on \`--app-text-\*\`. Both are peers under the theme palette.

\*\*Required Correction (Architectural, Not Executed Here):\*\*  
This addendum records that:  
\- Current encoded values deriving icon color tokens from app text tokens are architecturally wrong  
\- A small, focused correction is required to: introduce proper root theme tokens, re-point \`--icon-color-\*\` to theme tokens, ensure app text tokens derive from theme  
\- This change is not executed here; only the correct architecture is defined

\*\*21.6.5 Canonical Usage Examples\*\*  
\- \*\*DockBar:\*\* Uses \`.icon-lg\` for dock icons, relies on \`fill="currentColor"\` and button/text tokens for color  
\- \*\*Header Actions:\*\* Uses \`.icon-lg .icon-default\` for header-scale controls  
\- \*\*Panels/Overlays:\*\* Close icons use \`.icon-md .icon-default\` \+ module positioning; destructive actions use \`.icon-lg\` with color context (e.g., \`.icon-danger\`)

\---

\#\#\# \*\*22. Transaction Lifecycle & Frontend Workflow Semantics \[New Section per Addendum 10.4.1\]\*\*

\#\#\#\# \*\*22.1 Canonical User Intents (Locked)\*\*  
\*\*Intent A — Record something that already happened\*\*    
\- Entry: Global "Add / Record transaction" or Account view    
\- Result: Posted transaction created

\*\*Intent B — Resolve something that was planned\*\*    
\- Entry: Calendar day detail view only    
\- Result: New posted transaction created, planned transaction archived

\#\#\#\# \*\*22.2 Scope & View Requirements (Lifecycle Framing)\*\*  
\- No new views required. Calendar \+ Account \+ Planned Transactions List surfaces express all lifecycle semantics.  
\- \*\*Calendar is the only surface allowed to resolve planned intent.\*\* This separation is intentional and enforced.

\#\#\#\# \*\*22.3 Two-Record Model (Authoritative)\*\*  
When posting planned transaction:  
\- Planned record is NOT mutated → archived/voided  
\- \*\*New posted record is created\*\*  
\- Logical linkage possible, records remain distinct

\#\#\#\# \*\*22.4 Variance & Editing\*\*  
\- Amount/date variance on posting is always allowed.  
\- Editing available from Calendar day detail and Account view.  
\- \*\*Undo is explicitly rejected as primary mechanism.\*\* May exist as immediate, short-lived UI affordance only, never relied on for correctness.  
\- \*\*Transaction History Surface\*\* is canonical mechanism for discovery, inspection, correction, and reconciliation.  
  \- Persistent across sessions, derives from durable transaction data.  
  \- Ordered by workflow activity (not financial date).  
  \- Deleted transactions leave trace; voided planned transactions remain visible.

\#\#\#\# \*\*22.5 Future-Dated Posted Flow\*\*  
If future date entered in "posted" flow:  
\- Auto-convert to planned state  
\- Inline, non-blocking notice appears (no modal)    
  Example copy: "This date is in the future. This will appear as an upcoming transaction."

\#\#\#\# \*\*22.6 Language Rules (Locked)\*\*  
\*\*Forbidden:\*\* "Post transaction," "Lifecycle," "State," "Convert"    
\*\*Approved:\*\* "Record expense," "Mark as paid," "Confirm payment," "Upcoming"

\---

\#\#\# \*\*23. Projection Correctness & Planned Transaction Semantics \[New Section per Addendum 10.5\]\*\*

\#\#\#\# \*\*23.1 Transaction States & Projection Impact\*\*

| State | Meaning | Projection Impact |  
|-------|---------|------------------|  
| posted | Realized financial event | Included |  
| reconciled | Confirmed posted transaction | Included |  
| planned (future-dated) | Intended future event | Included |  
| planned (past-date, unresolved) | Intent not yet resolved | Excluded |  
| voided | Archived/voided intent | Excluded |

\#\#\#\# \*\*23.2 Opening Balance Calculation (Corrected)\*\*  
\`\`\`css  
OpeningBalance \=   
  account.startBalance  
\+ sum(posted \+ reconciled transactions with postedDate \< projectionStartDate)  
\`\`\`  
\*\*Exclusions:\*\* Planned transactions, voided transactions, transfers (net-zero handled separately)

\#\#\#\# \*\*23.3 Projection Input Rules\*\*  
\*\*Included:\*\* state ∈ {posted, reconciled} OR state \= planned AND date ≥ today()    
\*\*Excluded:\*\* state \= voided OR state \= planned AND date \< today()

\#\#\#\# \*\*23.4 Lifecycle Constraints (MVP)\*\*  
\- No automatic lifecycle resolution in backend.  
\- Past-date planned transactions are not auto-voided.  
\- Late posting is explicitly allowed.  
\- Projection correctness enforced at read time, not via mutation.

\---

\#\#\# \*\*24. Transaction State Handling — Current Enforcement Status \[New Section per Addendum 10.6\]\*\*

\#\#\#\# \*\*24.1 Implemented Behavior (Authoritative)\*\*  
\- \*\*State Storage:\*\* Both \`state\` (enum) and \`isPlanned\` (boolean) persisted  
\- \*\*State Machine Enforcement:\*\* NOT IMPLEMENTED — backend accepts valid enum values but does not validate transitions  
\- \*\*Frontend Responsibility:\*\* Must respect lifecycle semantics  
\- \*\*Projection Logic:\*\* Relies on \`state\`, not \`isPlanned\`, as authoritative signal

\#\#\#\# \*\*24.2 Two-Record Model\*\*  
When planned → posted:  
\- New posted record created  
\- Planned record transitions to voided (archived)  
\- Projection recomputes from posted date  
\- \*\*Relied upon for correctness ✓\*\*

\#\#\#\# \*\*24.3 Projection Semantics\*\*  
All rules in Section 23 are fully implemented and locked:  
\- Opening balance accuracy ✓  
\- Past-date planned exclusion ✓  
\- Two-record model reliance ✓

\---

\#\#\# \*\*25. Planned Intent Awareness Semantics (Coming-Due Model) \[New Section per Addendum 10.7.2\]\*\*

\#\#\#\# \*\*25.1 Terminology (Locked)\*\*  
\*\*VOIDED:\*\* Correct lifecycle term for resolved non-event

\#\#\#\# \*\*25.2 Coming-Due Discovery Surfaces\*\*  
Planned transactions within \*\*7 days before scheduled date\*\* receive neutral visual cue in:  
1\. Calendar (primary surface)  
2\. Planned Transactions List (near-below-fold)  
3\. Account View (explicitly excluded in Free tier; may apply in future multi-account setups)

\#\#\#\# \*\*25.3 Timing & Resolution\*\*  
\- \*\*Window:\*\* 7 calendar days before scheduled date (UI constant, non-configurable)  
\- \*\*Post-date:\*\* If date passes without action → transaction remains planned (past-date, unresolved) and is excluded from projections per Section 23\.  
\- \*\*No separate late-status state:\*\* No escalation, guilt-signaling, or persistent flags

\#\#\#\# \*\*25.4 Visual Treatment\*\*  
Informational only. Must not imply urgency, priority, or obligation.

\---

\#\#\# \*\*26. Transaction State Contract & Projection Eligibility \[New Section per Addendum 10.8\]\*\*

\#\#\#\# \*\*26.1 Authoritative States\*\*

| State | Meaning |  
|-------|---------|  
| posted | Finalized, realized financial event |  
| reconciled | Posted and externally verified |  
| planned | Future intent, scheduled |  
| voided | Explicitly resolved non-event |  
| created | Internal staging only (non-authoritative) |

\#\#\#\# \*\*26.2 Projection Eligibility\*\*  
Transaction is eligible iff:  
\- state ∈ {posted, reconciled}, OR  
\- state \= planned AND date ≥ projectionStartDate

\#\#\#\# \*\*26.3 Public API Contract (Mandatory)\*\*  
\- \`txState\` REQUIRED on all transaction creation/update requests  
\- Backend MUST NOT infer state from date, amount, or direction  
\- Backend MUST NOT auto-transition created state  
\- Omission of txState is invalid input

\---

\#\#\# \*\*27. Posted Transaction Date Semantics \[New Section per Addendum 10.11\]\*\*

\*\*Authoritative Rule (Global, All Tiers):\*\*  
\- \*\*\`postedDate\`:\*\* Sole authoritative date for system behavior. Determines: balance application, ledger ordering, projection eligibility, opening-balance folding, system logic.  
\- \*\*\`tx.date\`:\*\* Informational reference only. Represents real-world occurrence date. MUST NOT affect balances, projections, ordering, or system logic.

\*\*Rationale:\*\* FortuneTell is manual-entry and forecasting-first. Posted transactions are often entered late. System effects are based on when recorded (postedDate), not when occurred (tx.date).

\---

\#\#\# \*\*28. Free Tier Projection Window & Rolling Anchor Model \[New Section per Addendum 10.10.2\]\*\*

\#\#\#\# \*\*28.1 Governing Principle\*\*  
Free-tier projections are \*\*window-correct, not inception-correct\*\*. The user operates within a bounded forecast context.

\#\#\#\# \*\*28.2 Frontend Responsibilities (Locked)\*\*  
1\. Compute rolling anchor balance while preparing \`/projection/run\` payload  
2\. Identify pre-window posted transactions (date \< projectionWindowStart)  
3\. Fold into opening balance: \`openingBalance \= baseBalance \+ sum(preWindowPosted)\`  
4\. Send only in-window transactions to backend  
5\. Treat backend result as authoritative (no UI-layer adjustments)

\#\#\#\# \*\*28.3 Prohibitions\*\*  
\- No anchor logic in view-models, UI components, or repositories  
\- No post-projection balance "fixing"  
\- No duplicate anchor logic across call sites

\#\#\#\# \*\*28.4 Recalculation Timing\*\*  
Immediate on save (no batching, no explicit "update forecast" action). Cause → effect must be direct and observable.

\#\#\#\# \*\*28.5 Essential Tier Compatibility\*\*  
Same mathematical model; Essential tier adds anchor persistence and backend authority without changing frontend semantics.

\---

\#\#\# \*\*29. Essential Tier Projection Stability & Balance Anchoring \[New Section per Addendum 10.E.1\]\*\*

\#\#\#\# \*\*29.1 Status: DEFERRED (Mandatory before Essential Release)\*\*  
\*\*Non-Negotiable Principle:\*\* Essential tier projection MUST NOT replay from account inception. Must operate from persisted balance anchors with bounded forward replay.

\#\#\#\# \*\*29.2 Requirements (Deferred)\*\*  
\- \*\*Balance Anchors:\*\* Persisted, immutable records at monthly/reconciliation/sync boundaries  
\- \*\*Projection Base:\*\* Use most recent anchor ≤ windowStartDate  
\- \*\*Opening Balance:\*\* anchor.balance \+ sum(posted between anchor and window start)  
\- \*\*Forward Application:\*\* Only within projection window  
\- \*\*Roll-Forward:\*\* New anchor derived monthly; prior anchors remain immutable  
\- \*\*Cache Invalidation:\*\* Account-scoped, date-range-aware, anchor-aware

\*\*Free Tier vs Essential Contrast:\*\*

| Aspect | Free Tier | Essential Tier |  
|--------|-----------|----------------|  
| Anchor | Rolling / ephemeral | Persisted |  
| History | Bounded window | Full |  
| Projection Authority | Payload / hybrid | Backend authoritative |  
| Replay Scope | Window only | Anchor → window |

\---

\#\#\# \*\*30. Versioning\*\*

\*\*Architecture Version:\*\* V10.2    
\*\*Status:\*\* Locked / Production-Ready    
\*\*Effective:\*\* Immediately    
\*\*Next Revision:\*\* V10.3 (post–Public MVP Gate C)

\---

\#\#\# \*\*31. Design Tokens System & Domain Strategy \[New Section per Addendum 10.1.4\]\*\*

\#\#\#\# \*\*31.1 Purpose and Scope\*\*  
This section formally incorporates the unified design tokens system as authoritative, shared foundation for:  
\- The FortuneTell app (app.fortunetell.app)  
\- The FortuneTell marketing/SEO surfaces (fortunetell.app and interim simple-budget.app)

It captures technical decisions regarding:  
\- Landing page and marketing content management  
\- Connection between content domains and app domain  
\- Use of MDX/content files, React layouts, shared styling  
\- Interim use of simple-budget.app routing

\#\#\#\# \*\*31.2 DEV\_DesignTokensSystem (current version) is the normative token specification for the product. Whenever this architecture spec refers to “the token system,” it means the most recent DEV\_DesignTokensSystem document in the project docs. This architecture spec MUST NOT hard-code a specific token system version; implementers must always consult the current DEV\_DesignTokensSystem document.\*\*

The entire content of the current token specification is incorporated without modification.    
\*\*Source:\*\* \`/docs/DEV\_DesignTokensSystem\` (latest version)    
\*\*Principles:\*\* V10.1 minimalism, clarity, no duplication, HC-safe

\*\*Token Set is Single Source of Truth for:\*\*  
\- Brand colors (app \+ landing)  
\- Semantic colors (safe / caution / danger)  
\- Neutrals, shadows, radii, typography, spacing, z-index scales, etc.

\*\*Shared Across:\*\*  
\- App shell, app internal components, marketing shell and MDX-backed pages  
\- No other color or typography primitives may be introduced without subsequent addendum

\*\*Future Changes:\*\* Must update both the token file and this section's reference to point to new version.

\#\#\#\# \*\*31.3 Domain and Routing Strategy\*\*

\*\*31.3.1 Application host (locked)\*\*  
\- Production app runs at: \`app.fortunetell.app\`  
\- Only canonical host for: forecast engine, accounts/transactions, history, settings, ads, all app-lifetime flows

\*\*31.3.2 Marketing / content host (target state)\*\*  
Long-term canonical marketing host: \`fortunetell.app\`    
Hosts:  
\- Primary landing page (conversion-focused)  
\- Trust pages: /about, /how-it-works, /free-app, /accessibility, /ad-disclosure, /privacy, /terms, /contact  
\- SEO pillar articles and question-matched pages

\*\*31.3.3 Interim state (current, explicit decision)\*\*  
Until React-based marketing shell on fortunetell.app is implemented:  
\- simple-budget.app serves as temporary landing/lead-generation surface  
\- All CTAs must link directly to \`https://app.fortunetell.app/\` (optionally with \`?source=simple-budget\`)  
\- Once marketing shell is live, traffic should move from simple-budget.app to fortunetell.app via 301-redirect or campaign-specific use

\#\#\#\# \*\*31.4 Content Management Strategy\*\*  
\*\*Constraints:\*\*  
1\. Stable App UX must not destabilize with marketing copy changes  
2\. Ability to add SEO pages \+ refine copy easily  
3\. No additional cost (prefer file-based content in Git)  
4\. Human-readable representation for review/editing

\*\*Decision:\*\* File-based content in repo:  
\- Markdown/MDX for rich text pages (\`content/marketing/\*.mdx\`, \`content/seo/\*.mdx\`)  
\- JSON/TS config for structured sections (hero, CTAs, etc.)  
\- Update workflow: Edit file → commit → deploy marketing deployment (app unchanged unless logic changes)

\*\*Assumption:\*\* Separate deployment artifacts for fortunetell.app (marketing) and app.fortunetell.app (app), even if initially single repo.

\#\#\#\# \*\*31.5 Landing Page vs. MDX Pages\*\*

\*\*Landing Page: React-first, MDX-optional\*\*    
\- Implemented as React layout with CSS Modules (not generic MDX article)  
\- Controls hero structure, responsive grid, motion (respecting reduced-motion), trust signals  
\- MDX allowed only for specific text-heavy sections (FAQ) embedded in controlled containers  
\- Conversion and visual control take precedence

\*\*Secondary Marketing/SEO Pages: MDX-friendly\*\*    
\- Informational pages (/about, /how-it-works, /free-app, accessibility, ad-disclosure, SEO pages) may be MDX-first  
\- Rendered through shared marketing layout (header/footer/container) and \`MarketingMdx\` wrapper applying brand typography/spacing  
\- MDX is content carrier, not styling system. May embed branded React components (\`\<FeatureGrid\>\`, \`\<Callout\>\`).

\#\#\#\# \*\*31.6 Styling and Tokens Integration\*\*  
\*\*Single design tokens system\*\* is authoritative for app surfaces and marketing surfaces.

\*\*Key Implications:\*\*  
\- All colors, typography, spacing, radii, shadows must come from token set  
\- No ad-hoc colors, gradients, or "marketing-only" palettes allowed  
\- Semantic rules inherited: neutral palette as base, brand colors reserved for safe/caution/danger, HC mode maintains semantic mapping

\*\*Styling MDX-backed pages:\*\*    
MDX output styled via React \+ CSS Modules, not raw global CSS.    
\`MarketingMdx\` wrapper applies:  
\- Max-width (e.g., 720px), page padding, spacing, typography scale  
\- Styling for \`h1, h2, h3, p, ul, ol, a, blockquote\` using tokens  
\- No inline style objects or alternative style systems

\#\#\#\# \*\*31.7 Current vs Future Architecture State\*\*

\*\*Current (interim):\*\*  
\- App: app.fortunetell.app (only production app host)  
\- Marketing: simple-budget.app (temporary landing)  
\- Connection: CTAs link to app with optional source tags  
\- Tokens: the currently published DEV\_DesignTokensSystem specification is adopted as the single source of truth for tokens, even if the marketing shell is not yet live. When that spec is versioned, implementations are expected to track the latest published version; this architecture document does not pin to a specific token version number.

\*\*Target:\*\*  
\- App: app.fortunetell.app (unchanged)  
\- Marketing: React-driven shell at fortunetell.app using unified tokens and MDX-backed content  
\- CI/CD able to deploy marketing shell independently from app

\#\#\#\# \*\*31.8 Enforcement\*\*  
Any new surface must use tokens defined in the current DEV\_DesignTokensSystem specification (no local, ad-hoc colors or spacing outside that spec). Any proposal adding new styling technology, non-token colors/typography, or changing domain routing must be captured in future DEV\_DesignArchitectureAddendum\_10.1.x

\---

\#\#\# \*\*32. AI Discovery & Semantic Integrity Constraints \[New Section per Addendum 10.1.5\]\*\*

\#\#\#\# \*\*32.1 Non-Goals (Explicit)\*\*  
This section does not change forecast logic, introduce new APIs, modify storage, add AI computation, alter tier functionality, or require immediate code changes. V10.1 remains single source of truth for system behavior.

\#\#\#\# \*\*32.2 Determinism as External Contract\*\*  
\*\*Existing V10.1 Reality (Restated):\*\*  
\- Deterministic projection given identical inputs  
\- Bounded forward replay  
\- No probabilistic inference  
\- No heuristic mutation of user data

\*\*New Clarification:\*\* These properties are externally visible guarantees, not just internal behavior. Public descriptions, AI-facing explanations, schema definitions, pricing copy, and feature descriptions must not imply behavior beyond V10.1 determinism.

\#\#\#\# \*\*32.3 AI Discovery Semantics Binding\*\*  
Per ASSET\_SeoAiDiscoveryArchitecturSpec\_1.0\_20260108, AI systems infer product behavior from JSON-LD, FAQ answers, page structure, and repeated phrasing.

\*\*Binding Rule:\*\* Any AI-extractable description of FortuneTell must:  
1\. Describe \*\*projection, not prediction\*\*  
2\. Describe \*\*known inputs, not inferred behavior\*\*  
3\. Describe \*\*cash-flow forecasting, not budgeting optimization\*\*  
4\. Avoid any implication of: advice, intelligence, automation, recommendation, probabilistic outcomes

\#\#\#\# \*\*32.4 Tier Semantics Consistency\*\*  
Tier differences must be expressed \*\*only\*\* as:  
\- forecast horizon  
\- account count  
\- persistence scope  
\- access convenience

Tier differences must \*\*NOT\*\* be expressed as:  
\- correctness changes  
\- algorithmic differences  
\- intelligence level  
\- feature "unlocking" of core logic

\#\#\#\# \*\*32.5 Domain Responsibility Annotation\*\*  
Architecture does not enforce domains, but documentation must:

| Domain | Allowed Architectural Representation |  
|--------|--------------------------------------|  
| simple-budget.app | Problem framing, budgeting failure explanation, high-level workflow |  
| fortunetell.app | Forecasting mechanics, tier semantics, guarantees, schema |

\*\*Prohibited:\*\* Describing internal projection mechanics on simple-budget.app; publishing pricing schema outside fortunetell.app

\#\#\#\# \*\*32.6 Pricing & Architecture Alignment\*\*  
Pricing language must reflect architectural truth:  
\- Free / Essential / Plus tiers share same core projection engine  
\- Differences are bounded by configuration  
\- No tier runs a different algorithm  
Any pricing copy implying otherwise is architecturally false.

\#\#\#\# \*\*32.7 Enforcement Guidance (Documentation-Only)\*\*  
When reviewing/generating SEO pages, FAQ answers, AI prompts, pricing copy, help docs, or app store descriptions, verify:  
\- No violation of deterministic guarantees  
\- No implied intelligence  
\- No tier-based algorithm claims  
\- No domain misuse

This section is reference for that review.

\---

\#\#\# \*\*33. Frontend Layout System & View Architecture \[New Section per Addendum 10.1.8\]\*\*

\#\#\#\# \*\*33.1 Canonical View Names & Routes\*\*  
\*\*Standardized names for all documentation, prompts, and code:\*\*  
\- \*\*Views:\*\* Main view, Account view, Settings view (NOT "profile")  
\- \*\*Routes:\*\*  
  \- Main view → \`/\`  
  \- Account view → \`/account\`  
  \- Settings view → \`/settings\`

\*\*Legacy route \`/profile\` must be fully refactored to \`/settings\` during development.\*\* No redirects required or desired. Any "profile" usage is incorrect and must be replaced.

\#\#\#\# \*\*33.2 Shell Layout Responsibilities\*\*  
\*\*Shell layout\*\* (conceptual component under \`src/app/\_shell\`) provides outer frame:  
\- Full-height flex column, hosts routed content  
\- \*\*Does NOT own:\*\* max-width, margin-inline, padding-inline, DockBar-specific padding

\*\*Required CSS contract:\*\*  
\`\`\`css  
.shell {  
  min-height: 100vh;  
  display: flex;  
  flex-direction: column;  
}

.content {  
  flex: 1;  
}  
\`\`\`  
All view layout (width, centering, padding) delegated to global utilities and view roots.

\#\#\#\# \*\*33.3 Global Layout Utilities\*\*

\*\*33.3.1 Canonical container: .appMainContainer\*\*  
\*\*Single authority for horizontal container behavior:\*\*  
\- Container width (max-width)  
\- Horizontal centering  
\- Responsive horizontal padding

\*\*Required behavior:\*\*  
\`\`\`css  
.appMainContainer {  
  max-width: var(--container-xl);  
  margin-inline: auto;  
  padding-inline: var(--space-md);  
}

@media (min-width: var(--bp-sm)) {  
  .appMainContainer { padding-inline: var(--space-lg); }  
}

@media (min-width: var(--bp-lg)) {  
  .appMainContainer { padding-inline: var(--space-xl); }  
}  
\`\`\`

\*\*Rules:\*\*  
1\. Single authority for max-width, horizontal centering, tokenized padding  
2\. View CSS modules must not define max-width, margin-inline, or padding-inline at view root  
3\. Generic container usable by app views and other surfaces (e.g., login)

\*\*33.3.2 App view framing: .appView\*\*  
\*\*Framing utility for docked app views, controlling:\*\*  
\- Vertical framing and minimum height  
\- View-level vertical padding  
\- DockBar clearance  
\- Base column/gap layout

\*\*Required behavior:\*\*  
\`\`\`css  
.appView {  
  min-height: 100vh;  
  padding-block: var(--space-lg);  
  padding-bottom: calc(var(--space-xl) \* 3); /\* DockBar clearance \*/  
  display: flex;  
  flex-direction: column;  
  gap: var(--space-xl);  
}

@media (min-width: var(--bp-lg)) {  
  .appView { padding-block: var(--space-xl); }  
}  
\`\`\`

\*\*Rules:\*\*  
1\. Required for docked in-app views: Main, Account, Settings  
2\. Must not set max-width or padding-inline  
3\. Owns min-height, padding-block, DockBar clearance, primary vertical layout

\#\#\#\# \*\*33.4 View Root Contract\*\*

\*\*33.4.1 Required root for Main, Account, Settings\*\*  
Inside shell, all three core views must share same pattern:  
\`\`\`tsx  
\<div className="appMainContainer appView"\>  
  {/\* view-specific content \*/}  
\</div\>  
\`\`\`

\*\*Applies to:\*\*  
\- \`src/app/page.tsx\` (Main)  
\- \`src/app/account/page.tsx\` (Account)  
\- \`src/app/settings/page.tsx\` (Settings, replacing profile)

\*\*Rules:\*\*  
1\. Outermost view container must include both \`appMainContainer\` and \`appView\`  
2\. No ancestor may set max-width, margin-inline, or padding-inline for content  
3\. View CSS modules must not define page-level containers with independent width/centering or DockBar-specific padding at root

\*\*33.4.2 Exceptions: Login/Auth/Onboarding\*\*  
\- May use \`.appMainContainer\` without \`.appView\`, or with separate login-specific utility  
\- Must still use tokens for all values  
\- Must not assume DockBar is present

\#\#\#\# \*\*33.5 Flat vs Card Layout Rules\*\*

\*\*33.5.1 Definitions\*\*  
\- \*\*Flat section:\*\* background: transparent, box-shadow: none, no page-spanning card radius. Uses spacing and optional dividers for separation.  
\- \*\*Card:\*\* background-color: var(--app-card), border-radius: var(--radius-card), optional box-shadow: var(--shadow-card)

\*\*33.5.2 Allowed card contexts\*\*  
Cards \*\*only\*\* allowed for:  
1\. Overlays / modals / panels (History, Add/Edit transaction, Daily panel, Beta notice, A11yPanel, CategoryEditor)  
2\. Widget surfaces inside Main view (Calendar container, Forecast banner, Planned item cards)

\*\*No other page-frame-level card usage allowed.\*\*

\*\*33.5.3 Flat core layout for Main, Account, Settings\*\*  
\*\*Main view:\*\* Column stack is flat; widget surfaces may use cards; view itself is not a card.

\*\*Account view:\*\*    
\- Top-level sections (header, balance, posted transactions) must be flat.  
\- Any root container wrapping posted transactions must NOT use \`--app-card\`, \`--radius-card\`, or \`--shadow-card\`.  
\- Structural separation between balance and posted list via spacing and dividers.

\*\*Settings view:\*\*    
\- Top-level sections must be flat.  
\- Separation between logical groups via spacing and dividers.  
\- Localized cards inside sections allowed (e.g., warning card), but entire view must not be a card.

\#\#\#\# \*\*33.6 Divider System & Requirements\*\*  
\*\*Dedicated Divider component\*\* at \`src/components/Divider\` (TSX \+ CSS module).

\*\*33.6.1 Divider tokens\*\*    
Must use existing tokens:  
\- Thickness: \`--divider-thickness\`, \`--divider-thickness-bold\`  
\- Colors: \`--divider-color\`, \`--divider-color-soft\`  
\- No raw border values (e.g., \`1px solid \#...\`) allowed

\*\*33.6.2 Divider usage rules\*\*    
\*\*General:\*\* Used for structural separation in flat layouts when visual separation requires more than spacing. Not used where card boundary is sufficient.

\*\*Main view:\*\* When separating sections (forecast, calendar, planned), use vertical spacing as primary tool and optional horizontal dividers via Divider component or consistent token-based border.

\*\*Account view (explicit requirement):\*\*    
\- Must restore dividers removed during CSS passes, using tokenized approach.  
\- Use Divider (or border with \`--divider-thickness\` / \`--divider-color-soft\`) to:  
  \- Separate current balance section from posted transactions section  
  \- Optionally separate logical groups within posted list  
\- Do not reintroduce card boundaries.

\*\*Settings view:\*\* Use dividers between major Settings sections (e.g., Account, Preferences, Accessibility) to avoid making each section a card.

\#\#\#\# \*\*33.7 Ads and Secondary Surfaces Within App Views\*\*  
When ad slots or secondary content appear inside Main, Account, or Settings:  
\- Must be children of \`appMainContainer appView\` root  
\- Must not define alternative max-width or separate centered container  
\- May be flat sections or card widgets following card rules  
\- Must respect same horizontal container, vertical framing, and tokenized spacing/borders

\---

\#\#\# \*\*34. Frontend Implementation Status & Patterns \[New Section per Addendum 10.1.10\]\*\*

\#\#\#\# \*\*34.1 Purpose of This Section\*\*  
This section:  
1\. Accurately documents frontend architecture as it exists today (post Account \+ Settings refactors)  
2\. Normalizes language around patterns already in use without introducing new naming conventions  
3\. Records architectural work that is \*\*explicitly deferred\*\* for discussion during Essential tier development

\*\*This document is descriptive, not prescriptive.\*\*

\#\#\#\# \*\*34.2 Current Frontend Architectural Pattern (Observed)\*\*  
Across refactored areas, frontend follows this rule:  
\- \*\*Routes (or route-adjacent logic) own domain state, data loading, and service calls\*\*  
\- \*\*View components are responsible only for composition and rendering, receiving all data and callbacks via props\*\*

This principle is implemented in specific areas (documented below) but is \*\*not universal across the app.\*\*

\#\#\#\# \*\*34.3 Documented Compliant Areas\*\*

\*\*Account Screen\*\*    
Files: \`app/account/page.tsx\`, \`components/AccountView.tsx\`    
\- \*\*Route (page.tsx):\*\* Owns all domain hooks (useAuth, useTier, useForecast), service calls (account, transactions, history), state/refresh chains, overlay orchestration  
\- \*\*View (AccountView.tsx):\*\* Pure composer, receives data \+ callbacks only, no domain hooks, no service calls, uses useAdScheduler only for placement    
\*\*Status:\*\* Implemented and stable

\*\*Settings Screen (Route \+ Overlay)\*\*    
Files: \`lib/settings/useSettingsController.ts\`, \`components/SettingsView.tsx\`, \`app/settings/page.tsx\`, overlay usage in \`app/page.tsx\`    
\- Domain logic centralized in shared module (\`useSettingsController\`)  
\- Both standalone route and overlay consume same logic  
\- \*\*SettingsView is pure composer:\*\* No domain hooks, no service calls, all data/handlers via props    
\*\*Important Clarification:\*\* Structure exists because Settings has two entry points (route \+ overlay). This does \*\*not establish universal requirement\*\* for controller hooks elsewhere.    
\*\*Status:\*\* Implemented and stable

\*\*Ad Integration Rule (Implemented)\*\*    
In Account and Settings:  
\- \*\*Ads are placement-only\*\*  
\- No runtime adsBlocked logic  
\- No ad visibility toggling based on overlay state  
\- Overlays naturally cover ads via \`position: fixed\` and z-index  
\- Tier gating (adsEnabled) computed only in routes or route-adjacent logic  
\- Views and panels never call useTier    
\*\*This rule is documented baseline for new work.\*\*

\#\#\#\# \*\*34.4 Non-Uniform / Legacy Areas (As-Is)\*\*

\*\*Main Forecast Screen (\`app/page.tsx\`)\*\*    
\- Current State: Large, monolithic route file. Owns onboarding, forecast rendering, domain hooks, service calls, overlay orchestration.    
\- \*\*Status:\*\* Intentional as of now. No refactor is approved or scheduled.

\*\*LoginForm\*\*    
\- Current State: View component owns authentication hooks and auth service calls.    
\- \*\*Status:\*\* Accepted as-is for Phase 6\. No architectural change approved.

\*\*EditTransactionPanel\*\*    
\- Current State: View makes direct service call for update.    
\- \*\*Status:\*\* Accepted as-is for Phase 6\. No change approved.

\#\#\#\# \*\*34.5 Deferred Architectural Topics (Explicitly Not Approved)\*\*  
The following are \*\*recorded for discussion only\*\* during Essential tier development. \*\*Not approved, not implied, not scheduled.\*\*

1\. \*\*Main Forecast Screen Structural Review\*\*  
   \- Possible separation of rendering and domain logic  
   \- Possible reuse considerations  
   \- Must align with existing codebase constraints and doctrine

2\. \*\*Authentication Flow Normalization\*\*  
   \- Possible relocation of auth service calls  
   \- Only if justified by future scope

3\. \*\*Panel Consistency Adjustments\*\*  
   \- Potential cleanup of remaining mixed patterns  
   \- Only if behavior or maintainability demands it

\#\#\#\# \*\*34.6 Explicit Non-Goals of This Section\*\*  
This document does \*\*not:\*\*  
\- Introduce MVC or MVVM as adopted architecture  
\- Mandate controller hooks across the app  
\- Redefine tier differences (Free vs Essential)  
\- Propose feature gating beyond storage and forecast horizon  
\- Imply future architectural direction

\#\#\#\# \*\*34.7 Relationship to Prior Documents\*\*  
This section codifies the patterns previously documented in DEV\_DesignArchitecture\_10.1.1 and its related addenda; it does not override previously documented constraints unless explicitly stated here.

\#\#\#\# \*\*34.8 Summary\*\*  
\- Account and Settings share consistent, documented pattern  
\- That pattern is local, observed, and not globally mandated  
\- Major architectural changes are deferred by design  
\- Essential tier development is correct phase for revisiting larger structural questions

This section freezes architectural understanding at this point to prevent drift, misinterpretation, or accidental direction-setting.

\---

\#\#\# \*\*Document Change Summary (V10.0 → V10.1 → V10.1.10 → V10.2 → V10.2.1)\*\*

\#\#\#\# \*\*Major Changes & Additions (V10.0 → V10.1)\*\*  
1\. \*\*Storage Model Revolution\*\*  
   \- Free tier: Local-first (IndexedDB/LocalStorage) \+ stateless API calls  
   \- Essential tier: Full Render PostgreSQL persistence  
   \- Forecast domain: Explicitly non-persistent

2\. \*\*Deployment Platform Migration\*\*  
   \- Backend: Vercel → Render (persistent process, zero cold starts)  
   \- Database: Supabase → Render PostgreSQL (cost predictability)  
   \- Frontend: Remains Vercel

3\. \*\*CSS Architecture Overhaul\*\*  
   \- Mandated CSS Modules, prohibited Tailwind  
   \- Single global CSS file for reset/variables only  
   \- Deterministic state→style mapping required

4\. \*\*Transaction Lifecycle Formalization\*\*  
   \- Locked two-record model (planned → posted creates new record)  
   \- Explicit user intent A/B pathways  
   \- Language rules: system mechanics hidden from user

5\. \*\*Projection Correctness Fixes\*\*  
   \- Past-date planned transactions excluded from projections  
   \- Opening balance calculation corrected to exclude planned  
   \- postedDate is authoritative; tx.date is informational only

6\. \*\*Rolling Anchor Model (Free Tier)\*\*  
   \- Window-correct projections (not inception-correct)  
   \- Rolling anchor reconciliation lives in frontend input assembly  
   \- Immediate recalculation on save

7\. \*\*Coming-Due Model\*\*  
   \- Replaced "overdue" framing with 7-day pre-date awareness  
   \- Voided is authoritative term  
   \- Non-prescriptive, non-anxiety-inducing visual cues

8\. \*\*API Contract Hardening\*\*  
   \- txState REQUIRED on all transaction requests  
   \- No state inference allowed  
   \- created state is internal-only

9\. \*\*Ad Specification Integration\*\*  
   \- Explicitly defined surfaces, refresh rules, content restrictions  
   \- Non-intrusive, non-manipulative, predictable

10\. \*\*Essential Tier Deferred Requirements\*\*  
    \- Balance anchoring system defined for future implementation  
    \- Full state machine enforcement deferred  
    \- Tier transition: zero breaking changes

\#\#\#\# \*\*Major Additions (V10.1 → V10.1.10)\*\*  
1\. \*\*Import/Export Operational Clarity\*\* (10.1.1)  
2\. \*\*AdSense Integration & Privacy Posture\*\* (10.1.2)  
3\. \*\*Days Remaining Threshold Semantics\*\* (10.1.3) \*\*- now obsolete\*\*  
4\. \*\*Design Tokens System & Domain Strategy\*\* (10.1.4)  
5\. \*\*AI Discovery & Semantic Integrity\*\* (10.1.5)  
6\. \*\*Repository Separation for AI-Risk Containment\*\* (10.1.6)  
7\. \*\*Token-Only, Component-Scoped Styling\*\* (10.1.7)  
8\. \*\*Frontend Layout & Container System\*\* (10.1.8)  
9\. \*\*Button Semantics & CSS Cleanup Protocol\*\* (10.1.9)  
10\. \*\*Frontend Implementation Status Documentation\*\* (10.1.10)

\#\#\#\# \*\*V10.2: Consolidation Release\*\*  
\- No behavioral changes beyond V10.1.10  
\- Consolidates V10.1 \+ all 10.1.x addenda into single spec  
\- Corrects version/metadata and token-file references from 1.0 → 1.3  
\- Updates repository naming from fortunetell-app → fortunetell-frontend

\#\#\#\# \*\*V10.2.1: Integration and Correction Release\*\*  
1\. \*\*Icon Infrastructure Canonicalization\*\* (10.2.1)  
   \- Fills previous gaps in V10.2 about icon library, patterns, and location  
   \- Freezes Material-based inline SVG wrapper pattern as canonical  
   \- Specifies sizing via tokens and global utilities  
   \- Documents design error in icon token hierarchy and correct architecture  
   \- Provides canonical usage examples

2\. \*\*Days Remaining Semantics Restoration\*\* (10.2.2)  
   \- \*\*Corrective:\*\* Restores V10.1 zero-line behavior for daysOfCashRemaining  
   \- Reverts threshold-driven definition from 10.1.3 (now obsolete)  
   \- daysOfCashRemaining \= days until balance \< 0, independent of warningThreshold  
   \- Threshold only drives colorState and messaging  
   \- Updates implementation directives and frontend responsibility

3\. \*\*Frontend-Backend Test Wiring & Auth\*\* (10.2.3)  
   \- Documents current, working integration between fortunetell-frontend and fortunetell-backend  
   \- Specifies repo separation, no monorepo, no filesystem coupling  
   \- Details runtime contract, API base URL, and NEXT\_PUBLIC\_API\_BASE\_URL env var  
   \- Documents JWT auth model, token storage, and validation  
   \- Clarifies testing architecture: unit tests mock, E2E requires running backend  
   \- Notes E2E intentionally disabled in CI due to contrast issues  
   \- Records known gaps and future work (contrast fixes, E2E re-enabling, CORS tightening, auth standardization)

4\. \*\*Repository Naming Alignment\*\*  
   \- Global correction: fortunetell-app → fortunetell-frontend throughout document

\#\#\#\# \*\*Omissions & Removals (V10.0 → V10.1)\*\*  
1\. Tailwind CSS – All references removed; explicitly prohibited  
2\. Vague State Semantics – Removed ambiguous "lifecycle" language; replaced with intent-based workflows  
3\. Local Storage for Free Tier – No longer writes budgeting data to cloud; local-only  
4\. Implicit State Inference – Backend no longer infers transaction state from date/amount  
5\. "Overdue" Terminology – Completely removed, replaced with "coming-due" model  
6\. Multiple CSS Systems – Architectural prohibition on mixed styling approaches

\#\#\#\# \*\*Clarifications & Corrections (V10.0 → V10.1)\*\*  
1\. \*\*isPlanned Field\*\* – Documented as transitional; \`state\` is authoritative source  
2\. \*\*Projection Input Selection\*\* – Explicitly excludes past-date planned; includes future planned  
3\. \*\*State Machine Enforcement\*\* – Reality documented: not implemented in MVP, frontend-responsible  
4\. \*\*Transfer Semantics\*\* – Net-zero handling explicitly excluded from opening balance  
5\. \*\*Date Field Authority\*\* – postedDate vs tx.date unambiguously defined  
6\. \*\*Reconciliation Scope\*\* – Limited to 30-day lookback window

\#\#\#\# \*\*Tier-Specific Behaviors (Newly Explicit)\*\*

| Feature | Free Tier | Essential Tier |  
|---------|-----------|----------------|  
| Storage | Local device | Render PostgreSQL \+ sync |  
| Ads | Yes (per Section 20\) | None |  
| Forecast Horizon | 30 days | 90 days |  
| Projection Authority | Frontend assembles payload | Backend authoritative |  
| Balance Anchor | Rolling/ephemeral | Persisted (deferred) |  
| Reconciliation | Manual 30-day | Enhanced (future) |  
| Multi-device | No | Yes |

\---

\*\*End of DEV\_DesignArchitecture\_10.2.1\_20260128\*\*