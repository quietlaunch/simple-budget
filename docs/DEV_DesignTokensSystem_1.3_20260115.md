/\* \-------------------------------------------------------------------------  
   FORTUNETELL DESIGN TOKENS — UNIFIED SYSTEM (Landing \+ App)  
   Authoritative: 2026-01-15 — Version 1.3  
   Principles: V10.1 minimalism, single source of truth, no duplication,  
               HC-safe, landing \+ app visually unified  
   \------------------------------------------------------------------------- \*/

/\* \=========================================================================  
   1\. CORE BASE VALUES (SINGLE SOURCE OF TRUTH)  
   All other tokens MUST alias these. No other raw color/shadow values  
   are allowed elsewhere in this file.  
   \========================================================================= \*/

:root {  
  /\* \----------------------------------------------------------------------  
     1.1 Brand semantic bases (used everywhere)  
     \---------------------------------------------------------------------- \*/  
  \--brand-green:  \#10b981;  /\* canonical green \*/  
  \--brand-yellow: \#f6e823;  /\* canonical yellow (improved white contrast) \*/  
  \--brand-red:    \#ff1a1a;  /\* canonical red \*/

  /\* \----------------------------------------------------------------------  
     1.2 Neutral palette (landing-derived, shared by app)  
     \---------------------------------------------------------------------- \*/  
  /\* Backgrounds \*/  
  \--neutral-bg-0: \#ffffff;  /\* page \+ card base \*/  
  \--neutral-bg-1: \#f9fafb;  /\* subtle surface \*/  
  \--neutral-bg-2: \#f3f4f6;  /\* stronger muted surface \*/

  /\* Dark surfaces (landing hero/sections) \*/  
  \--neutral-bg-dark-0: \#0b1120; /\* page-level dark \*/  
  \--neutral-bg-dark-1: \#020617; /\* panel-level dark \*/

  /\* Borders \*/  
  \--neutral-border-subtle: \#e2e8f0; /\* card/divider border \*/  
  \--neutral-border-strong: \#cbd5f5; /\* stronger emphasis border \*/

  /\* Text on light surfaces \*/  
  \--neutral-text-strong: \#0f172a; /\* headings, high-importance \*/  
  \--neutral-text-body:   \#334155; /\* primary body copy \*/  
  \--neutral-text-muted:  \#475569; /\* secondary body copy \*/  
  \--neutral-text-low:    \#64748b; /\* low-contrast labels \*/

  /\* Text on dark/brand surfaces \*/  
  \--neutral-text-on-dark:  \#f9fafb; /\* light text on dark backgrounds \*/  
  \--neutral-text-on-brand: \#ffffff; /\* text on green/yellow/red \*/

  /\* \----------------------------------------------------------------------  
     1.3 Shadows (landing-derived)  
     \---------------------------------------------------------------------- \*/  
  \--shadow-soft-base: 0 10px 15px \-3px rgba(0, 0, 0, 0.10),  
                      0 4px 6px \-4px rgba(0, 0, 0, 0.10);

  \--shadow-card-base: 0 10px 15px \-3px rgba(15, 23, 42, 0.14),  
                      0 4px 6px \-4px rgba(15, 23, 42, 0.12);

  \--shadow-banner-base: 0 20px 40px rgba(15, 23, 42, 0.45);

  /\* \----------------------------------------------------------------------  
     1.4 Focus \+ misc base values  
     \---------------------------------------------------------------------- \*/  
  \--focus-ring-base: 0 0 0 3px rgba(5, 150, 105, 0.20); /\* emerald focus \*/  
  \--text-placeholder-base: \#94a3b8; /\* input placeholders \*/  
}

/\* \=========================================================================  
   2\. TYPOGRAPHY & SPACING TOKENS (SHARED)  
   These are abstract scales; usage is defined in design docs.  
   \========================================================================= \*/

:root {  
  /\* Font families \*/  
  \--font-family-sans: system-ui, \-apple-system, BlinkMacSystemFont,  
    "Segoe UI", sans-serif;

  /\* Type scale \*/  
  \--font-size-xs: 0.75rem;   /\* 12px \*/  
  \--font-size-sm: 0.875rem;  /\* 14px \*/  
  \--font-size-md: 1rem;      /\* 16px \*/  
  \--font-size-lg: 1.125rem;  /\* 18px \*/  
  \--font-size-xl: 1.25rem;   /\* 20px \*/  
  \--font-size-2xl: 1.5rem;   /\* 24px \*/  
  \--font-size-3xl: 1.875rem; /\* 30px \*/

  /\* Line-heights (landing-aligned roles) \*/  
  \--line-height-body:       1.7;  /\* base p on light \*/  
  \--line-height-body-tight: 1.6;  /\* par-sm \*/  
  \--line-height-body-md:    1.625;/\* par-md \*/  
  \--line-height-h1:         1.2;  
  \--line-height-h2:         1.25;  
  \--line-height-h3:         1.5;  
  \--line-height-h4:         1.4;

  /\* Weights \*/  
  \--font-weight-normal:   400;  
  \--font-weight-medium:   500;  
  \--font-weight-semibold: 600;  
  \--font-weight-bold:     700;

  /\* Spacing scale \*/  
  \--space-0:  0;  
  \--space-1:  0.25rem;  /\* 4px \*/  
  \--space-2:  0.5rem;   /\* 8px \*/  
  \--space-3:  0.75rem;  /\* 12px \*/  
  \--space-4:  1rem;     /\* 16px \*/  
  \--space-5:  1.25rem;  /\* 20px \*/  
  \--space-6:  1.5rem;   /\* 24px \*/  
  \--space-8:  2rem;     /\* 32px \*/  
  \--space-10: 2.5rem;   /\* 40px \*/  
  \--space-12: 3rem;     /\* 48px \*/

  /\* Layout primitives derived from landing \*/  
  \--page-width-main:      80rem;   /\* .container-xl max-width \*/  
  \--page-padding-inline-sm: 1.5rem;  
  \--page-padding-inline-md: 2rem;  
  \--page-padding-inline-lg: 3rem;

  \--section-padding-y-base: 5rem;  /\* .section base \*/  
  \--section-padding-y-lg:   6rem;  /\* .section ≥1024px \*/  
}

/\* \=========================================================================  
   3\. ICON TOKENS   \========================================================================= \*/

:root {  
  /\* Icon primitives  
     IMPORTANT:  
     \- \--icon-size-lg is defined as the current dock icon size.  
     \- Dock icons are the canonical icon usage.  
     \- Do NOT change \--icon-size-lg’s value unless you intentionally redesign the dock.  
  \*/

  /\* Small inline icons (labels, tight UI) \*/  
  \--icon-size-sm: var(--font-size-md);   /\* 16px at medium scale \*/

  /\* Secondary icons (inline actions, controls) \*/  
  \--icon-size-md: var(--font-size-xl);   /\* 20px at medium scale \*/

  /\* Canonical icon size (DOCK SIZE) \*/  
  \--icon-size-lg: var(--font-size-2xl);  /\* 1.5rem \-\> 30px at medium scale \*/

  /\* Icon colors \*/  
  \--icon-color-default: var(--app-text-muted);  
  \--icon-color-strong:  var(--app-text-primary);  
  \--icon-color-inverse: var(--text-on-dark);  
}

/\* \=========================================================================  
   4\. SEMANTIC TOKENS (FINANCIAL \+ STATES)  
   These alias brand bases so green/yellow/red are defined once.  
   \========================================================================= \*/

:root {  
  /\* Financial semantics: single shades everywhere \*/  
  \--financial-green:  var(--brand-green);  
  \--financial-yellow: var(--brand-yellow);  
  \--financial-red:    var(--brand-red);

  /\* Calendar / state semantics (backgrounds) \*/  
  \--bg-safe:          var(--brand-green);  
  \--bg-warning:       var(--brand-yellow);  
  \--bg-danger:        var(--brand-red);

  /\* Hover/focus variants MAY differ; they are the only variations. \*/  
  \--bg-safe-hover:    \#22c664;  /\* unique hover tone, not reused elsewhere \*/  
  \--bg-warning-hover: \#f5e50a;  /\* slightly darker yellow \*/  
  \--bg-danger-hover:  \#e60000;  /\* slightly darker red \*/

  /\* Foreground on sematic backgrounds \*/  
  \--text-on-semantic: var(--neutral-text-on-brand); /\* white in normal mode \*/  
}

/\* \=========================================================================  
   5\. SURFACE & TEXT ROLES (LANDING \+ APP UNIFIED)  
   Role tokens for surfaces, borders, and text; all alias base neutrals.  
   \========================================================================= \*/

:root {  
  /\* 5.1 Global text roles \*/  
  \--text-strong:    var(--neutral-text-strong); /\* headings, high-emphasis \*/  
  \--text-body:      var(--neutral-text-body);   /\* primary body copy \*/  
  \--text-muted:     var(--neutral-text-muted);  /\* secondary text \*/  
  \--text-low:       var(--neutral-text-low);    /\* labels, helper \*/  
  \--text-on-dark:   var(--neutral-text-on-dark);  
  \--text-on-brand:  var(--neutral-text-on-brand);  
  \--text-placeholder: var(--text-placeholder-base);

  /\* 5.2 Global surface roles \*/  
  \--surface-page:        var(--neutral-bg-0);        /\* default light page \*/  
  \--surface-subtle:      var(--neutral-bg-1);        /\* subtle sections \*/  
  \--surface-muted:       var(--neutral-bg-2);        /\* cards-on-cards \*/  
  \--surface-dark-page:   var(--neutral-bg-dark-0);   /\* dark landing background \*/  
  \--surface-dark-panel:  var(--neutral-bg-dark-1);   /\* dark panels \*/

  /\* Borders & dividers \*/  
  \--border-subtle:  var(--neutral-border-subtle);  
  \--border-strong:  var(--neutral-border-strong);  
  \--divider-strong: var(--neutral-border-subtle);  
  \--divider-soft:   var(--neutral-bg-2);

  /\* 5.3 Landing roles (aliases only; no new values) \*/  
  \--landing-bg:           var(--surface-dark-page);  
  \--landing-surface:      var(--surface-dark-panel);  
  \--landing-text-primary: var(--text-on-dark);  
  \--landing-text-muted:   var(--text-muted);  
  \--landing-card-bg:      var(--surface-dark-panel);  
  \--landing-card-border:  var(--border-subtle);  
  \--landing-card-shadow:  var(--shadow-card-base);

  /\* 5.4 App roles (aliases only; no new values) \*/  
  \--app-surface-0:        var(--surface-page);    /\* primary background \*/  
  \--app-surface-1:        var(--surface-subtle);  /\* muted/extruded \*/

  \--app-border:           var(--border-subtle);

  \--app-text-primary:     var(--text-strong);  
  \--app-text-secondary:   var(--text-body);  
  \--app-text-muted:       var(--text-muted);

  \--app-card:             var(--surface-page);  
  \--app-card-muted:       var(--surface-muted);  
  \--app-card-border:      var(--border-subtle);

  \--divider-color:        var(--divider-strong);  
  \--divider-color-soft:   var(--divider-soft);

  /\* Accent behavior: brand green by default \*/  
  \--app-accent:           var(--brand-green);  
  \--app-accent-foreground: var(--text-on-brand);  
}

/\* \=========================================================================  
   6\. COMPONENT ROLE TOKENS (CARDS, BUTTONS, INPUTS)  
   These are composable roles for app \+ landing; all use base tokens.  
   \========================================================================= \*/

:root {  
  /\* 6.1 Card primitives \*/  
  \--radius-card:     1rem;         /\* rounded-2xl \*/  
  \--radius-sharp:    0.75rem;      /\* rounded-xl \*/

  \--shadow-card:     var(--shadow-card-base);  
  \--shadow-soft:     var(--shadow-soft-base);  
  \--shadow-banner:   var(--shadow-banner-base);

  /\* 6.2 Buttons \*/  
  \--button-radius:        0.75rem;  
  \--button-font-size:     var(--font-size-lg);  
  \--button-padding-y:     0.5rem;  
  \--button-padding-x:     1rem;  
  \--button-primary-bg:        var(--brand-green);  
  \--button-primary-bg-hover:  var(--brand-green-dark);  
  \--button-primary-text:      var(--text-on-brand);

  /\* If you need a dedicated button shadow, alias or define here once \*/  
  \--button-primary-shadow:    0 10px 20px rgba(16, 185, 129, 0.25);

  \--button-secondary-bg:      transparent;  
  \--button-secondary-border:  var(--border-subtle);  
  \--button-secondary-text:    var(--text-strong);

  /\* 6.2.x Danger / destructive buttons (semantic red) \*/  
  \--button-danger-bg:           var(--bg-danger);  
  \--button-danger-bg-hover:     var(--bg-danger-hover);  
  \--button-danger-text:         var(--text-on-semantic);  
  \--button-danger-border:       var(--bg-danger);  
  \--button-danger-shadow:       var(--button-primary-shadow);

/\* 6.3 Inputs \*/  
  \--input-bg:              var(--surface-page);  
  \--input-border:          var(--border-subtle);  
  \--input-radius:          0.75rem;  
  \--input-padding-y:       0.5rem;  
  \--input-padding-x:       1rem;  
  \--input-font-size:       var(--font-size-lg);  
  \--input-text:            var(--text-body);  
  \--input-placeholder:     var(--text-placeholder);  
  \--input-focus-border:    var(--brand-green);  
  \--input-focus-ring:      var(--focus-ring-base);

/\* 6.x Form controls (checkbox / radio) \*/  
  \--control-checkbox-size: 1.1rem;  
  \--control-radio-size:    1.1rem;  
}

\=========================================================================  
   7\. APP HIGH CONTRAST (HC) MODE  
   ONLY structural/text tokens change. Semantic colors (brand green/  
   yellow/red and anything derived from them) MUST remain unchanged.  
   \========================================================================= \*/

:root.ft-high-contrast {  
  /\* Surfaces \*/  
  \--surface-page:       \#000000;  
  \--surface-subtle:     \#050816;  
  \--surface-muted:      \#020617;

  \--app-surface-0:      var(--surface-page);  
  \--app-surface-1:      var(--surface-subtle);

  /\* Borders & dividers \*/  
  \--border-subtle:      \#94a3b8;  
  \--border-strong:      \#e5e7eb;  
  \--divider-strong:     \#94a3b8;  
  \--divider-soft:       \#3a3a3a;

  \--app-border:         var(--border-subtle);  
  \--divider-color:      var(--divider-strong);  
  \--divider-color-soft: var(--divider-soft);

  /\* Text \*/  
  \--text-strong:        \#ffffff;  
  \--text-body:          \#e5e7eb;  
  \--text-muted:         \#cbd5f5;  
  \--text-low:           \#9ca3af;  
  \--text-on-dark:       \#ffffff;  
  \--text-on-brand:      \#000000;

  \--app-text-primary:   var(--text-strong);  
  \--app-text-secondary: var(--text-body);  
  \--app-text-muted:     var(--text-muted);

  /\* Accent (structural only; semantic greens/yellows/reds stay as-is) \*/  
  \--app-accent:           \#ffffff;  
  \--app-accent-foreground: \#000000;

  /\* Shadows (optional HC tuning) \*/  
  \--shadow-soft:  0 1px 2px rgba(255,255,255,0.10);  
  \--shadow-card:  0 1px 3px rgba(255,255,255,0.15);  
  \--shadow-banner:0 4px 6px rgba(255,255,255,0.20);  
}

/\* \=========================================================================  
   END OF UNIFIED TOKENS — VERSION 1.1 (2026-01-11)  
   All new color, border, or shadow values MUST be added ONLY by extending  
   the base section (1.1–1.3) and then aliased from role tokens.  
   \========================================================================= \*/

