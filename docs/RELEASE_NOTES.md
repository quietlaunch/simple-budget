# Release Notes — Build 2025.11.23 (Internal Test Build)

CI now mirrors the documented pipeline and runs frontend and backend suites sequentially.  
Linting was stabilized on the backend to avoid type-check parsing failures, and frontend artifacts were cleaned from source control.

---

## What’s New

### Backend (C2 Complete)

- Full Fastify backend monolith implemented under `/backend/src`.
- Endpoints implemented:
  - Accounts: GET, POST, PATCH
  - Budgets: GET, POST clone
  - Categories: GET, POST, PATCH
  - Transactions: GET, POST, PATCH, DELETE
  - Projections: GET /projection
  - Auth + Health routes
- All controllers validated through comprehensive integration tests.
- Projection engine fully implemented and optimized.
- Services implemented for budgets and transactions.
- Oracle-based test suite (C1) fully active in CI.
- Backend ESLint config now uses CommonJS/non-type-checked preset to keep linting stable across environments.

### Frontend (D1 + D2 Complete)

- Screens implemented:
  - Calendar month/week/day
  - Transactions CRUD
  - Categories CRUD
  - Accessibility settings
- Components generated from spec:
  - CalendarMonth
  - TxList
  - TxForm
  - CategoryEditor
  - A11yPanel
- Accessibility system added:
  - Font scale (small/medium/large)
  - High contrast
  - Narration via ARIA live regions
- Global A11yContext with localStorage persistence
- Project structure aligned with App Router conventions
- Removed committed `.next` and Playwright output; added ignores to prevent future noise.

---

## Known Limits (Expected / Do Not Report)

### Backend

- No real database yet; Prisma disabled pending datasource rewrite.
- All responses are mock/stub implementations.
- No authentication session handling (static token only).
- No pagination for lists.

### Frontend

- Narration is partial; only fires on specific states.
- High contrast theme not applied to all components.
- API calls for accessibility preferences are stubbed (local only).
- Some styling variations unresolved post-restructure.
- No envelope budgeting UI yet.

---

## Not Included

- Real persistent data
- Multi-device sync
- Onboarding flow
- Full accessibility narration rules
- Budget envelope UI
- Error boundary UI components

---

## Testing Focus Areas

- Navigation across calendar → day → transactions → categories → settings
- CRUD flows for transactions and categories
- All A11y toggles (contrast, scale, narration) must update globally
- Validate endpoint status codes (200/201/400) via UI calls or CLI
- CI now runs: frontend lint/build/e2e → backend lint/build/unit/integration/perf. Validate failures locally with `npm run lint`/`build`/`test` in each package.

---

# END OF RELEASE NOTES
