# **DEV\_DesignArchitectureAddendum\_10.2.6\_20260203**

FortuneTell Frontend — Header Actions, DockBar, and History Surface Clarifications

---

## **1\. Header vs `headerActions` Responsibilities**

This addendum refines the per-view header model introduced in 10.2.2.

### **1.1 Header container**

Each primary view (`/`, `/account`, `/settings`) has a header container (e.g. `.header`, `.pageHeader`) that:

* Owns the **view title** (e.g. “Forecast”, “Account”, “Settings”).

* Provides the **structural layout** (title on the left, nav/action zone on the right).

* **Does not participate in sticky behavior**.

Rules:

* The header container scrolls with the view content.

* The header container must not be positioned sticky or fixed relative to the viewport or shell.

* The header container may include supporting non-sticky elements (subtitles, badges, etc.), but those elements are not sticky.

### **1.2 `headerActions` strip**

Each primary view exposes a `headerActions` container that:

* Is the **navigation-only icon strip** for the view.

* Lives inside the header container (usually aligned to the right).

* Is the **only sticky element** in the header region.

Semantic rules:

* `headerActions` contains **only navigation icons** between primary views:

  * Home

  * Account

  * Settings

* `headerActions` must not contain:

  * Transactional actions (Add Bill, Add Income, Record Transaction).

  * History controls (see §2).

  * Ads or secondary controls.

Behavioral rules:

* `headerActions` is positioned sticky beneath the global `AppHeader`:

  * `position: sticky`

  * `top: var(--app-header-height)`

  * Sits above scrollable content (`z-index` as required).

  * Uses an appropriate background to avoid translucency artifacts over scrolled content.

* The **title scrolls, the icon strip sticks**:

  * When scrolling, the title may scroll offscreen.

  * `headerActions` remains pinned just under `AppHeader` so navigation is always accessible.

---

## **2\. DockBar, Transaction History, and Action Semantics**

This section clarifies the relationship between DockBar, high-intent actions, navigation, and the Transaction History Panel.

### **2.1 DockBar responsibilities**

DockBar continues to be the **shell-level, bottom-fixed, high-intent action surface**.

Role:

* Lives within the shell layout as defined in 10.2.2 (no change).

* Appears on all primary views (`/`, `/account`, `/settings`) when app state allows (tier/stage/gating rules unchanged from 10.2.2).

* Hosts **frequent, user-intent actions**, not primary navigation.

Canonical action set:

* Add Bill

* Add Income

* Record Transaction

* Open Transaction History Panel (History)

Constraints:

* DockBar must not contain:

  * View navigation icons (Home, Account, Settings).

  * Ads.

  * Rare or low-frequency controls that belong in Settings or secondary menus.

### **2.2 Transaction History Panel entry point**

The Transaction History Panel is a **global, cross-view surface** for discovery, inspection, and correction of cashflow events.

Entry point rules:

* The **canonical, global entry point** for the Transaction History Panel is a single **History control in the DockBar**.

* History control is:

  * Present in DockBar on all primary views where DockBar is visible.

  * Semantically grouped with Add Bill / Add Income / Record Transaction as a high-frequency, user-intent action.

* Header regions (`headerActions`) **must not** include a History icon or any other entry to the Transaction History Panel.

Implications:

* History access is consistent across Main, Account, and Settings:

  * Same location (DockBar).

  * Same visual and interaction pattern.

* This maintains and clarifies the cross-view intent from 10.2.2 while simplifying the mental model:

  * “Actions live in DockBar.”

  * “Navigation lives in `headerActions`.”

---

## **3\. Scope and Non-Changes**

This addendum is deliberately narrow. It clarifies responsibilities and semantics without changing the underlying shell architecture.

### **3.1 Behaviors explicitly unchanged**

The following remain as defined in 10.2.2 and existing addenda:

* Shell layout and view composition:

  * `AppHeader` (top).

  * `appView` / content container.

  * DockBar (bottom) and its clearance.

* DockBar positioning and visibility rules:

  * Still governed by app state (e.g. tier, stage, onboarding/gating completion).

  * No change to its fixed/sticky behavior.

* Transaction and forecast logic:

  * No change to how transactions are computed, displayed, or persisted.

* Ad placement rules:

  * DockBar remains an ad-free surface.

  * Existing in-view ad slot definitions are unchanged.

### **3.2 Intent summary**

* **Navigation**:

  * Lives in `headerActions`.

  * Sticky icon strip: Home, Account, Settings.

* **High-intent actions (including History)**:

  * Live in DockBar.

  * DockBar is the single, global History entry surface on primary views.

* **Sticky behavior**:

  * Only `headerActions` is sticky beneath `AppHeader`.

  * Header titles scroll with the content.

These rules are now the authoritative interpretation for implementing and reviewing header/DockBar behavior in 10.2.2-compliant frontends.

