# Design System Document: The Precision Editorial

This design system is a high-end framework for mobile financial management, moving away from "utilitarian" spreadsheets toward a "Signature Editorial" experience. It balances the authority of a premium bank with the approachability of a boutique digital concierge. 

## 1. Overview & Creative North Star
**Creative North Star: "The Financial Curator"**
The system rejects the cluttered, line-heavy aesthetic of traditional banking. Instead, it treats financial data as editorial content. We achieve this through **Organic Asymmetry** and **Tonal Depth**. By using wide margins, staggered card heights, and varying typographic scales, we transform a "budget tracker" into a sophisticated personal dashboard that feels custom-tailored, not mass-produced.

## 2. Colors & Surface Philosophy
The palette is rooted in deep Indigo (`primary: #1e3093`) and Teal (`secondary: #006b5e`), creating a sense of stable, growing wealth.

### The "No-Line" Rule
To achieve a premium, modern feel, **1px solid borders are strictly prohibited** for sectioning. Structural boundaries must be defined solely through background shifts. For example, a `surface_container_low` section sitting on a `surface` background creates a clear but soft distinction.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of semi-transparent layers. 
- **Base Layer:** `surface` (#fbf8ff)
- **Content Blocks:** `surface_container_low` (#f5f2fb)
- **Elevated Cards:** `surface_container_lowest` (#ffffff)
- **Deep Inset/Navigation:** `surface_container_high` (#e9e7f0)

### The "Glass & Gradient" Rule
For high-impact areas (e.g., Total Balance cards), use a "Signature Gradient" transitioning from `primary` (#1e3093) to `primary_container` (#3949ab) at a 135-degree angle. For floating navigation or modals, utilize **Glassmorphism**: apply `surface_container_lowest` at 70% opacity with a `20px` backdrop-blur to allow the background hues to bleed through.

## 3. Typography
The system utilizes two distinct typefaces to separate "Action/Data" from "Narrative."

*   **Display & Headlines (Manrope):** A geometric sans-serif used for numerical data and high-level summaries. It is wide and authoritative, ensuring financial figures feel substantial.
*   **Body & Labels (Inter):** A highly legible, neutral face for transactional details and micro-copy.

**Hierarchy Strategy:**
- **Display LG (Manrope, 3.5rem):** Reserved exclusively for the primary account balance. 
- **Headline SM (Manrope, 1.5rem):** Used for category headers (e.g., "Monthly Spend").
- **Label MD (Inter, 0.75rem):** Used for meta-data like timestamps or "Pending" statuses, always set in `on_surface_variant` (#454652).

## 4. Elevation & Depth
We eschew the "Material Design" standard of heavy shadows in favor of **Tonal Layering**.

*   **The Layering Principle:** Depth is achieved by stacking. A `surface_container_lowest` card placed on a `surface_container_low` background creates a "natural lift" that feels architectural rather than artificial.
*   **Ambient Shadows:** If a card must "float" (e.g., a critical alert), use a shadow with a blur of `24px`, an Y-offset of `8px`, and 6% opacity using a color derived from `on_surface` (#1b1b21).
*   **The "Ghost Border" Fallback:** For accessibility in input fields, use a "Ghost Border" using `outline_variant` (#c6c5d4) at **15% opacity**. Never use a 100% opaque border.

## 5. Components

### Buttons
- **Primary:** Rounded (`full`), using the Signature Gradient (Indigo). Label color is `on_primary` (#ffffff).
- **Secondary:** Rounded (`full`), `secondary_container` (#94f0df) background with `on_secondary_container` (#006f62) text. No border.
- **Tertiary:** Text-only in `primary`, used for low-priority actions like "View All."

### Cards & Lists
**Strict Rule:** No dividers. Separate list items using `spacing: 2` (0.5rem) of vertical white space or by alternating background tones between `surface_container_low` and `surface_container_lowest`. 
- **Card Corners:** Use `xl` (1.5rem) for main dashboard cards to emphasize the "friendly yet trustworthy" feel.
- **Inner Content:** Use `md` (0.75rem) for elements nested inside cards.

### Financial Inputs
- **Amount Entry:** Uses `display-md` (Manrope) for the number. The currency symbol should be `surface_tint` (#4555b7) to keep focus on the digits.
- **Input Fields:** Container-style (no bottom-line only) with `xl` (1.5rem) corners and `surface_container_highest` background.

### Context-Specific Components
- **The "Growth Gauge":** A custom progress bar for budgets using a `secondary` fill on a `secondary_fixed_dim` track to show health.
- **Transaction Micro-Cards:** Small `lg` (1rem) rounded blocks that use `on_tertiary_fixed_variant` (#733500) for "Warning/Overspent" categories.

## 6. Do's and Don'ts

### Do
- **Do** use asymmetrical spacing (e.g., `spacing: 8` on the top and `spacing: 4` on the bottom) to create an editorial flow.
- **Do** use `secondary` (Teal) for positive financial growth and `error` (Red) for overages.
- **Do** emphasize numbers by increasing their weight or size relative to their labels.

### Don't
- **Don't** use black (#000000). Use `on_surface` (#1b1b21) for text to maintain a premium, softened contrast.
- **Don't** use standard 1px lines to separate data. Use whitespace or tonal shifts.
- **Don't** use sharp corners. Every interactive element must have at least a `sm` (0.25rem) radius, but ideally `lg` (1rem) or higher.