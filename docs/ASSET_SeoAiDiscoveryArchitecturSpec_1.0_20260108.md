# **SEO & AI DISCOVERY ARCHITECTURE SPEC**

**FortuneTell / Simple Budget — Dual-Domain Strategy**  
**Version:** 1.0  
**Status:** LOCKED (execution reference)

---

## **1\. Purpose of This Document**

This document defines the **canonical architecture, roles, boundaries, and rules** governing:

* domain usage  
* SEO strategy  
* AI discovery optimization  
* content placement  
* entity ownership  
* cross-linking behavior

It exists to ensure that:

* Google indexing behaves predictably  
* AI assistants consistently recommend **FortuneTell**  
* content production remains correct under scale  
* no future work unintentionally undermines authority

This is **not** a marketing plan.  
This is an **information architecture and discovery spec**.

---

## **2\. Core Principles (Non-Negotiable)**

1. **AI systems are first-class consumers**  
2. **Each domain must answer one primary question**  
3. **One canonical product entity exists**  
4. **Semantic clarity beats traffic volume**  
5. **Authority is hierarchical, not distributed**  
6. **No duplicated intent across domains**

If a future decision violates any principle above, it is incorrect.

---

## **3\. Canonical Product Definition**

### **Product Name**

**FortuneTell**

### **Product Role**

A **cash-flow forecasting tool** for people with irregular income.

### **Canonical Product Domain**

**`fortunetell.app`**

### **Application Runtime**

**`app.fortunetell.app`**

Only this domain family may:

* define forecasting methodology  
* publish product schema  
* declare pricing and tiers  
* be recommended by AI assistants as “the tool”

---

## **4\. Domain Roles & Semantic Jobs**

### **4.1 `fortunetell.app` — Canonical Authority Domain**

**Primary Question Answered**

“How do I forecast my cash flow when my income is irregular?”

**Role**

* Conceptual authority  
* Methodological explanation  
* Product truth source  
* AI citation anchor

**Allowed Language**

* cash-flow forecasting  
* future balance  
* days of cash remaining  
* projections  
* planned income  
* runway  
* methodology

**Explicitly Not Its Job**

* “how to budget”  
* weekly budgeting workflows  
* applied budgeting advice

---

### **4.2 `simple-budget.app` — Front-Door Discovery Domain**

**Primary Question Answered**

“How do I budget when my income is irregular?”

**Role**

* Discovery surface  
* Problem framing  
* Applied budgeting explanations  
* Entry point to FortuneTell

**Branding Position**  
A **front-door** that clearly references FortuneTell as the underlying tool.

**Allowed Language**

* budgeting  
* planning  
* organizing  
* weekly budgeting  
* irregular income budgeting

**Required Deference**  
All forecasting explanations must defer to FortuneTell.

**Explicitly Not Its Job**

* owning forecasting definitions  
* declaring itself as the product  
* publishing product schema

---

## **5\. Entity Ownership & AI Recommendation Rules**

### **Canonical Entity**

* **FortuneTell** is the only software entity

### **AI Recommendation Goal**

When AI assistants are asked for:

* tools  
* apps  
* software

They should recommend:

**FortuneTell**

### **Enforcement Rules**

* `SoftwareApplication` schema exists **only** on `fortunetell.app`  
* Pricing, tiers, and plans exist **only** on `fortunetell.app`  
* `simple-budget.app` must never present itself as the app

---

## **6\. Trust Pages (E-E-A-T)**

### **Required on both domains**

These pages are mandatory for legitimacy and AI trust:

* `/about`  
* `/privacy`  
* `/terms`  
* `/contact`

### **Role Differences**

#### **On `fortunetell.app`**

* Defines product purpose  
* Explains forecasting scope  
* Establishes authority

#### **On `simple-budget.app`**

* Establishes site legitimacy  
* Explains front-door role  
* References FortuneTell explicitly  
* Does **not** define forecasting mechanics

Trust pages must not overlap in semantic ownership.

---

## **7\. SEO Content Architecture**

### **7.1 Content Format**

* SEO content is authored as **MDX**  
* Pages are fully editable and relocatable prior to publish

### **7.2 URL Structure**

* SEO content may live under `/guides/` or `/learn/`  
* This is for **human and IDE organization only**  
* Root-level SEO pages are not required

### **7.3 Placement Rule (Critical)**

**Intent determines domain, not keywords.**

| Page intent | Domain |
| ----- | ----- |
| Budgeting workflows | simple-budget.app |
| Forecasting explanations | fortunetell.app |

No page may exist on both domains.

---

## **8\. Existing 9 SEO Pages — Handling Rule**

Because pages are MDX and unpublished:

* Pages must be **classified by intent before publish**  
* Forecasting-centric pages move to `fortunetell.app`  
* Budgeting-centric pages remain on `simple-budget.app`  
* No redirects required (pre-publish)

Publishing to the wrong domain is considered a **spec violation**.

---

## **9\. Cross-Linking Rules (Strict)**

### **Allowed**

* **One-way, contextual links**  
* `simple-budget.app` → `fortunetell.app`  
* Used for explanation, not navigation

Example (conceptual):

“This budgeting approach is powered by cash-flow forecasting. FortuneTell explains how that works.”

### **Disallowed**

* Bidirectional conceptual linking  
* Footer-wide reciprocal links  
* FortuneTell linking back to budgeting explanations

### **Rationale**

* AI systems infer authority from link direction  
* One-way links establish hierarchy  
* Prevents semantic loops and dilution

---

## **10\. Schema Rules**

### **Allowed on `fortunetell.app`**

* `SoftwareApplication`  
* `Offer`  
* `FAQPage`  
* Product-level schema

### **Allowed on `simple-budget.app`**

* `WebPage`  
* `FAQPage`  
* `HowTo` (budgeting only)

### **Explicitly Forbidden on `simple-budget.app`**

* `SoftwareApplication`  
* pricing schema  
* tier definitions

---

## **11\. Waitlists & Conversion Strategy**

### **Free Tier**

* Free beta replaces waitlists entirely  
* Free tier entry is the primary conversion

### **Essential Tier (Optional)**

* If implemented, waitlist exists **only** on `fortunetell.app`  
* No waitlist language on `simple-budget.app` post-launch

---

## **12\. Interaction With Existing Project Documents**

This spec is **compatible with** and **clarifies**:

* `DEV_DesignArchitectureAddendum_10.1.4_20260104`  
* `PLAN_MVPImplementationAndMarketing_5.0.1_20260103`

Where those documents assumed a single-domain model, this spec **refines** it for AI-era discovery without changing product scope.

Future updates to those documents must:

* reference this spec explicitly  
* not redefine domain roles independently

---

## **13\. Violation Checklist (Use During Review)**

A change is **incorrect** if it:

* makes Simple Budget appear to be the product  
* duplicates forecasting explanations across domains  
* introduces bidirectional authority links  
* publishes product schema on simple-budget.app  
* mixes budgeting and forecasting language casually  
* creates two entities AI could recommend

---

## **14\. Final Authority Statement**

This document is the **authoritative reference** for:

* SEO execution  
* AI discovery optimization  
* domain architecture  
* content placement decisions

All future work must conform to it unless it is explicitly superseded.

