# CHANGELOG

This changelog reflects all merges and structural changes from the project reset on Nov 13, 2025 through the latest accessibility update on Nov 22, 2025.

---

## 2026-01-20 — E2E Test Infrastructure Fixes (Frontend)

### Fixed

- Fixed Playwright E2E test failures caused by DockBar visibility race condition
  - Added forecast loading check in `assertAppReady()` helper to wait up to 30s for home page forecast to complete before checking DockBar visibility
  - Root cause: Home page sets `stage='done'` only after async forecast API call completes, which controls DockBar visibility
- Fixed Playwright `webServer` startup failures
  - Added explicit PATH configuration with nvm node location to backend and frontend startup commands
  - Ensures `npm` and `node` binaries are found during test server initialization

### Changed

- Updated `tests/helpers/e2eSetup.ts` to detect home page and wait for forecast completion
- Updated `playwright.config.ts` webServer commands to include explicit PATH environment variable

---

## 2025-11-23 — CI Consolidation + Lint Stabilization (Frontend + Backend)

### Added

- Unified CI job that runs frontend lint/build/e2e and backend lint/build/unit/integration/perf sequentially to mirror the documented pipeline.

### Changed

- Backend ESLint config switched to CommonJS and non-type-checked preset to eliminate parser errors from missing project references.
- Updated gitignore to drop committed Next.js artifacts (`frontend/.next`, `frontend/test-results`) and keep them out going forward.

---

## 2025-11-22 — Accessibility Pass (Frontend)

### Added

- Added global accessibility system:
  - Font scale (`small`, `medium`, `large`)
  - High contrast mode
  - Narration toggle with ARIA live region support
- Added A11yContext provider with localStorage persistence
- Integrated accessibility panel into `settings/accessibility` screen

---

## 2025-11-20 — Complete Project Restructure (Frontend + Backend)

### Added

- Rebuilt frontend file structure under Next.js App Router
- Integrated Calendar (month/week/day) screens
- Integrated Transactions, Categories, and Settings screens
- Added all components generated from D1: CalendarMonth, TxList, TxForm, CategoryEditor, A11yPanel

### Changed

- Updated layout to wrap with A11yProvider
- Cleaned up directory structure to align with V10 architecture

---

## 2025-11-19 — Backend Restructure + Full Integration Test Pass (C2)

### Added

- Completed backend monolith structure under Fastify
- Full controller implementations:
  - Accounts, Budgets, Categories, Transactions, Projection, Auth, Health
- Added route prefixes and strict relative imports
- Added full integration test suite:
  - accounts.controller.test.ts
  - budgets.controller.test.ts
  - categories.controller.test.ts
  - transactions.controller.test.ts
  - projection.controller.test.ts
  - health-auth.controller.test.ts
- Full pass of all integration tests

### Changed

- Updated controllers for correct validation (400 on invalid IDs, payloads)
- Rewired budgets routes to global prefix

---

## 2025-11-18 — Backend Package + Setup

### Added

- Introduced `/backend/package.json` with isolated backend dependencies

---

## 2025-11-16 — Backend Core Features (C1 to Pre-C2)

### Added

- Added complete projection engine
- Added budget and transaction services
- Optimized projection engine hot paths for performance
- Added oracle tests for projection engine (C1)
- Added GitHub Action for C1 oracle CI
- Added scripts:
  - `test:c1-oracles`
  - CI workflow for oracles

---

## 2025-11-15 — Route Stubs + OpenAPI

### Added

- Added backend route stubs for all major entities
- Added `openapi.yaml` definition file
- Added early scripts and utilities

### Changed

- Pre-cleanup restructure before second major architecture pass

---

## 2025-11-13 — Project Reset + Migrations

### Added

- Reset app structure to prepare for V10 architecture
- Added initial backend and frontend folder structure
- Added Prisma migration (initial schema)
- Added first version of `/docs` folder structure

### Removed

- Deleted old README and outdated app code

---

# END OF CHANGELOG
