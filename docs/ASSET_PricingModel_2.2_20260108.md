# **ASSET\_PricingModel\_2.2**

**FortuneTell Pricing Model**  
**Status:** Active  
**Supersedes:** ASSET\_PricingModel\_2.1 (and earlier)

## **0\. Purpose**

Define a sustainable, ethical, and operationally controlled pricing model for FortuneTell that:

1. Provides a fully functional **Free tier** for users with financial stress.  
2. Requires **user accounts for all tiers** (cost control \+ governance).  
3. Uses **local storage** for Free-tier budgeting data (no cloud cost).  
4. Uses **API access** for Free-tier forecasting operations.  
5. Allows **manual backup/restore** for data persistence without server cost.  
6. Includes **minimally invasive, privacy-friendly advertising** in Free tier only.  
7. Monetizes advanced forecasting capability through paid tiers.  
8. Matches validated market demand from irregular-income research.  
9. Aligns with V10 architecture and all addenda.

This document governs **tier boundaries** and **what must not exist** at each tier.

---

## **1\. Strategic Pricing Principles (Non-Negotiable)**

### **1.1 Ethical Support for Low-Income Users**

The Free tier must be:

* a real, working solution  
* never manipulative  
* never feature-crippled in a way that harms financial stability

### **1.2 Mandatory User Accounts (All Tiers)**

All users—Free and paid—must create an account (email only).

Purpose:

* control operational load  
* monitor infrastructure cost  
* prevent unlimited anonymous usage  
* enable future free-user caps if required

No personal financial data is collected beyond what the user enters manually.

### **1.3 Free Tier \= Local Storage \+ API Access**

* Budgeting/transaction data stored locally (browser storage)  
* API used for computing Free-tier projections  
* No cloud database usage for Free-tier financial data  
* No sync or multi-device access

### **1.4 Paid Tiers Monetize Depth, Not Access**

Paid tiers provide deeper forecasting \+ convenience:

* longer horizons  
* multi-account projection  
* cloud sync / multi-device  
* optional advanced features only when validated

### **1.5 Zero Exploitation of User Data**

* No selling, brokering, or analyzing user financial data for profit  
* Ads allowed only if:  
  * ethical  
  * privacy-friendly  
  * minimal and static  
  * **Free tier only**

### **1.6 Operational Sustainability**

Pricing must offset:

* runtime \+ infrastructure  
* cloud storage for paid tiers  
* support load  
* optional third-party integrations (only where explicitly allowed)

---

## **2\. Tier Overview (Authoritative)**

| Tier | Price | Positioning | Forecast Horizon | Accounts | Storage | Ads | Sync | Target Niches |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| **Free** | $0 | Short-term clarity | 30 days | 1 | Local storage | Yes | No | Low-income \+ irregular-income basics |
| **Essential** | $7.99–$8.99 | 3-month stability | 90 days | 3 | Cloud | No | Yes | Primary paying tier; freelancers, overdraft prevention |
| **Plus** *(Gate C only)* | $14.99 | 12-month forecasting | 12 months | 6+ | Cloud | No | Yes \+ bank sync (optional) | Advanced planners; only after demand |

**Plus is not a launch tier.**  
It is **explicitly deferred** until paying-customer demand is proven.

---

## **3\. Tier Definitions**

### **3.1 Free Tier — “Short-Term Cash Clarity”**

**Price:** $0

**Purpose:**  
Provide a meaningful and reliable tool for users living with income instability.

**Included Features**

* Email-based account  
* 1 account  
* Manual transactions (unlimited)  
* Planned future-income entries  
* 30-day forecast via API  
* Week-by-week view  
* Days-of-cash-remaining indicator  
* Local-only data storage (browser)  
* Fully functional without cloud  
* Manual backup/export (JSON)  
* Manual restore (JSON import)  
* Minimal, non-invasive ethical ads  
* Privacy-first operation (no tracking)

**Excluded**

* Cloud sync  
* Multi-device  
* CSV import/export  
* Multi-account  
* Long-term forecasting  
* Scenario modeling  
* Bank sync

**Cost Impact**

* Minimal API compute load  
* No database storage  
* Ads offset operational cost

**Upgrade Rationale**  
Users upgrade for:

* longer clarity (90 days)  
* multi-device access  
* multi-account management

---

### **3.2 Essential Tier — “Three-Month Stability” (Primary Launch Tier)**

**Price:** $7.99–$8.99 / month

**Purpose:**  
Provide reliable medium-horizon forecasting and continuity (multi-device) for irregular-income users who keep using the product.

**Included Features**

* Everything in Free, plus:  
* 90-day forecast  
* Up to 3 accounts  
* Cloud persistence  
* Sync / multi-device access  
* No ads  
* Category-level summaries (where implemented) consistent with V10 semantics

**Excluded**

* 12-month horizon  
* Scenarios  
* Bank sync  
* CSV import/export  
* Consolidated multi-account forecast across more than 3 accounts

**Upgrade Rationale**  
Users upgrade for:

* longer horizon  
* heavier usage patterns  
* optional advanced planning needs (only if/when Plus exists)

---

### **3.3 Plus Tier — “Professional Cash-Flow Command” (Gate C Only — Not Launching Yet)**

**Price:** $14.99 / month

**Launch Condition (Hard Rule)**

* Only after demonstrated demand from paying customers (Gate C).

**Purpose**  
Capture high-value professional planners and heavy forecasting users **after** Essential is validated.

**Included Features**

* Everything in Essential, plus:  
* 12-month projections  
* Scenario modeling (late-payment simulation)  
* Quarterly tax planning tooling (if built)  
* CSV import/export  
* Multi-account consolidated views  
* Optional bank sync (Plaid/Teller) **only if** added post-validation

**Non-negotiable:**  
Do not build Plus until demand is validated.

---

## **4\. Upgrade Philosophy**

### **4.1 Free → Essential**

Upgrade messaging focuses on capability:

* “See the next 3 months instead of 30 days.”  
* “Sync across devices.”  
* “Plan income months in advance.”

### **4.2 Essential → Plus**

Only after demand emerges:

* “Run full-year scenarios.”  
* “Simulate late invoices.”  
* “Forecast taxes.”

### **4.3 Absolutely NO Dark Patterns**

* No surprise feature locks  
* No forced limits  
* No degraded experience  
* No guilt-based messaging

---

## **5\. Cost Model Alignment**

| Component | Free | Essential | Plus | Cost Impact |
| ----- | ----- | ----- | ----- | ----- |
| API Projection | ✔ | ✔ | ✔ | Minimal |
| Local Storage | ✔ | – | – | $0 |
| Cloud Storage | – | ✔ | ✔ | DB cost |
| Sync | – | ✔ | ✔ | Light |
| Bank Sync | – | – | (Optional) ✔ | Moderate |
| Ads | ✔ | – | – | Revenue offset |

---

## **6\. Governance & Caps**

### **6.1 Account Requirement**

All tiers require an email-based account for:

* usage control  
* abuse prevention  
* cost monitoring  
* readiness for global free-user caps

### **6.2 Free-User Caps (Optional)**

Admin controls may include:

* hard global cap  
* soft cap (waitlist)  
* ratio-based caps (free:paid threshold)  
* inactivity purge after X months

No caps are enforced at launch unless operational necessity requires it.

---

## **7\. AI Discovery \+ Domain Constraints (Binding)**

### **7.1 Pricing Surface Rule**

Pricing, tier definitions, and plan comparisons must live only on the **canonical product domain**.

* **Allowed:** FortuneTell pricing and tier schema on FortuneTell canonical domain  
* **Forbidden:** pricing schema or tier definitions on **simple-budget.app**

### **7.2 AI Hallucination Prevention Rule**

All public pricing copy must:

* state tier names exactly as defined here  
* explicitly state major exclusions (e.g., “No bank sync in Essential”)  
* avoid ambiguous terms like “everything,” “full access,” “unlimited forecasting” unless literally true

---

## **8\. Versioning**

All future pricing changes require:

* documented justification  
* tier-boundary decisions  
* updated marketing messaging  
* sync with Product / Tech / Marketing owners

---

**End of Document — ASSET\_PricingModel\_2.2**

