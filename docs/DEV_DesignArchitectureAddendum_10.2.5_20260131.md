# **DEV\_DesignArchitectureAddendum\_10.2.5\_20260131**

# **Marketing Site Archetype — fortunetell-site & simple-budget-site**

This addendum defines the shared structure and behavior of the two marketing sites:

* fortunetell-site (fortunetell.app)  
* simple-budget-site (simple-budget.app)

From this point forward, both sites MUST follow this archetype unless superseded by a later addendum.

---

## **0\. Scope**

1. Define the **route and directory archetype** that both sites share.  
2. Define the **content-source structure** (MDX locations) for trust \+ SEO content.  
3. Define the **minimum layout/component structure** that must exist in both repos.  
4. Define **styling constraints** for these sites relative to the token system.

This addendum does NOT define visual design details (tokens, spacing, typography); those remain governed by (or current equivalent):

* DEV\_DesignTokensSystem\_2.0\_20260130\*  
* tokens.yaml / tokens.css  
* V10.2.1  
* ASSET\_SeoAiDiscoveryArchitecturSpec\_1.0\_20260108

---

## **1\. Surfaces and Roles**

Covered surfaces:

* `fortunetell-site` → public marketing site for FortuneTell  
* `simple-budget-site` → public marketing site for SimpleBudget

Shared roles:

* Each site:  
  * Exposes a **home** page (`/`).  
  * Exposes a minimal set of **trust/marketing** pages.  
  * Hosts **SEO-oriented content** via `/guides` and `/guides/[slug]`.  
* Domain-specific content and SEO strategies may differ, but the **structure and capabilities** remain identical.

---

## **2\. Route Archetype (MUST match on both sites)**

Both sites share the same **canonical route set**.

### **2.1 Required routes**

The required **page routes**:

* `/`  
  Home/landing page.  
* `/about`  
  Company/brand explanation.  
* `/privacy`  
  Privacy policy.  
* `/terms`  
  Terms of service / terms of use.  
* `/contact`  
  Contact page.  
* `/guides`  
  Guides index page (SEO content index).  
* `/guides/[slug]`  
  Individual SEO/guide pages, one per slug.

### **2.2 Out-of-scope routes (for this addendum)**

Any other marketing/trust routes (e.g. `/how-it-works`, `/free-app`, `/accessibility`, `/ad-disclosure`, `/trust/**`) are **out of scope** for this addendum.

* They:  
  * MUST NOT be treated as canonical structure.  
  * MUST NOT be reintroduced without a future addendum explicitly authorizing them.

When this addendum and the code diverge, **this addendum is the target state** and code must be brought into alignment.

---

## **3\. Directory & File Structure (App Router \+ Content)**

The following structure MUST exist in **both** sites.

### **3.1 App directory**

Under `src/app/`:

* `src/app/layout.tsx`  
  Root layout (imports shell \+ tokens).  
* `src/app/page.tsx`  
  Route: `/`  
* `src/app/about/page.tsx`  
  Route: `/about`  
* `src/app/privacy/page.tsx`  
  Route: `/privacy`  
* `src/app/terms/page.tsx`  
  Route: `/terms`  
* `src/app/contact/page.tsx`  
  Route: `/contact`  
* `src/app/guides/page.tsx`  
  Route: `/guides`  
* `src/app/guides/[slug]/page.tsx`  
  Route: `/guides/[slug]`

Each page:

* Uses the shared site shell from `src/components/layout/SiteShell.tsx`.  
* Uses MDX-driven content where applicable (see below).  
* Exposes a `metadata` export consistent with the SEO architecture doc.

### **3.2 Content directories**

Under `content/`:

* `content/marketing/`  
  * `about.mdx`  
  * `privacy.mdx`  
  * `terms.mdx`  
  * `contact.mdx`  
* `content/seo/`  
  * One `*.mdx` per guide slug (names may differ per site; mechanism is the same).

Rules:

* Marketing pages (`/about`, `/privacy`, `/terms`, `/contact`) MUST render their body content from the corresponding `content/marketing/*.mdx` files.  
* Guides pages MUST source their body content from `content/seo/*.mdx`:  
  * `/guides` → lists available slugs (implementation details may evolve).  
  * `/guides/[slug]` → loads and renders the matching SEO MDX file.

Placeholders are acceptable until real content exists, but the structure must be present.

---

## **4\. Shared Layout & Components**

Both repos MUST provide the same **layout/component skeleton** and use the same responsibilities.

### **4.1 Site shell**

Components:

* `src/components/layout/SiteShell.tsx`  
* `src/components/layout/SiteShell.module.css`

Responsibilities:

* Wraps all pages with a consistent structure:  
  * `<html>` / `<body>` (via `layout.tsx`)  
  * `<header>`  
  * `<main>`  
  * `<footer>`  
* Hosts the **brand header** and **footer** across the site.  
* Uses only token-based CSS (no raw values).

### **4.2 Header (brand-only)**

Components:

* `src/components/layout/Header.tsx`  
* `src/components/layout/Header.module.css`  
* `src/components/layout/LogoF.tsx`  
* `src/components/layout/LogoF.module.css`

Responsibilities:

* Display the FortuneTell/SimpleBudget logotype and **F-logo glyph** (LogoF) consistently.  
* Provide structural layout for the top of the page (brand bar).

Constraints:

* The header, in the current framework, MUST NOT be used as a general navigation hub.  
* No marketing/trust/SEO links are required in the header; links are handled via the footer and page content.  
* Styling uses only tokens.css variables; no additional design tokens or semantic color families.

### **4.3 Footer (trust \+ utility links)**

Components:

* `src/components/layout/Footer.tsx`  
* `src/components/layout/Footer.module.css`

Responsibilities:

* Provide a consistent footer across both sites.  
* Expose links to the canonical trust/marketing pages:  
  * `/guides` (optional but recommended)  
  * `/about`  
  * `/privacy`  
  * `/terms`  
  * `/contact`

(Exact label text per link can differ by site; slugs must match this addendum.)

### **4.4 MDX content shell**

Components:

* `src/components/content/MdxPageShell.tsx`  
* `src/components/content/MdxPageShell.module.css`  
* `src/components/content/Prose.tsx`  
* `src/components/content/Prose.module.css`

Responsibilities:

* Provide a consistent **article-style layout** for any MDX-driven page (marketing pages and guides).  
* `MdxPageShell`:  
  * Wraps the page in appropriate `<main>` \+ heading structure.  
  * Accepts a title and children.  
* `Prose`:  
  * Applies typography and spacing to MDX-rendered HTML.  
  * Uses only tokens-based CSS.

---

## **5\. Styling & Tokens**

### **5.1 Token import**

In both repos:

`src/app/layout.tsx` MUST import tokens exactly once from:  
import '../docs/design-tokens/tokens.css';

* or the equivalent correct relative path for:  
  * `/docs/design-tokens/tokens.css` (synced from `fortunetell-docs/doc/design-tokens/tokens.css`).

No other file may import `tokens.css`.

### **5.2 CSS rules**

Across both repos:

* Styling MUST be via CSS Modules (`*.module.css`) only.  
* All colors, spacing, typography, radii, containers, and breakpoints MUST come from `var(--...)` tokens defined in `tokens.css`.  
* No raw design values (hex, rgb, px, rem) are allowed in app CSS, except:  
  * Minimal, spec-approved resets (e.g. `margin: 0` on `body` or headings), if present.

`globals.css` is not used by these sites in the current architecture; global behavior is limited to tokens.css and Next’s base stylesheet behavior.

---

## **6\. Metadata & SEO Alignment (High-Level)**

Both sites must:

* Use Next.js App Router metadata exports for:  
  * Root layout (`metadataBase`, site-wide title, description).  
  * Each page route listed in §2.1 (`/`, `/about`, `/privacy`, `/terms`, `/contact`, `/guides`, `/guides/[slug]`).  
* Align slugs and route existence with ASSET\_SeoAiDiscoveryArchitecturSpec\_1.0\_20260108 and subsequent SEO-specific docs.  
* Treat `/guides` and `/guides/[slug]` as the single SEO content surface:  
  * No parallel ad-hoc SEO routes.

Detailed metadata content (titles/descriptions/JSON-LD) remains governed by the SEO architecture spec; this addendum only fixes structure and capabilities.

---

## **7\. Synchronization Between fortunetell-site and simple-budget-site**

1. **Structure parity**  
   * Any structural change (routes, content directories, Mdx shell, header/footer behavior) applied to one site MUST be mirrored to the other, unless explicitly carved out by a future addendum.  
2. **Capability parity**  
   * If one site gains new capabilities (e.g., a new guide rendering pattern), the other must receive the same capability, even if the actual content set differs.  
3. **Spec precedence**  
   * When code and this document disagree, this document is the canonical target.  
   * Changes to structure must be made **first in docs**, then implemented in both repos.