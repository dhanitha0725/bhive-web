# BHive Design System

> **Official design system specification** reverse-engineered and aligned with Figma foundation boards:
> - `BHive / 01 · Identity & colour` (`152:58`)
> - `BHive / 02 · Typography` (`152:62`)
> - `BHive / 03 · Space & layout` (`152:66`)
> - `BHive / 04 · Application rules` (`152:71`)
> - `BHive / Website components` (`161:28`)
> - `BHive / 05 · Buttons` (`156:6`)

---

## 1. Core Principles

- **Less noise. More signal.** Minimal. Modern. Flat. A corporate blue foundation built around confident type and generous whitespace.
- **Type leads.** Inter, medium weight. Short copy. One idea per section.
- **Space matters.** Generous gaps. Very few shapes. No visual noise.
- **Blue is rare.** Around 90% neutrals and 10% blue. Use it with purpose.
- **Flat, by design.** No gradients, no glassmorphism/blur, no decorative drop shadows, no hexagon patterns. Surfaces and 1px hairlines do all the framing work.
- **One dark zone.** The bottom CTA band and footer share the dark `ink` canvas (`#0B1220`). Secondary text uses white at 64% opacity.

---

## 2. Colour Palette

Exactly eight colours. No color ramps, no amber "honey" scale, and no legacy navy.

| Token | Hex | Role & Usage | Contrast / WCAG |
| :--- | :--- | :--- | :--- |
| `ink` | `#0B1220` | Primary headlines, body text, dark CTA band, and footer canvas | 16.4:1 on white (AAA) |
| `blue` | `#3068F9` | Primary action buttons, links, one highlighted headline word | 4.69:1 on white (AA) |
| `blue-hover` | `#1F55E0` | Hover and pressed states for primary actions | 6.12:1 on white (AA) |
| `blue-tint` | `#EEF3FF` | Soft backgrounds, active service tabs, pill tags, hover fills | 1.1:1 on white |
| `surface` | `#F5F7FA` | Alternate section backgrounds and quiet card surfaces | Subtle grouping |
| `border` | `#E5E8EE` | 1px outlines, card strokes, dividers, and accordion rules | Structural framing |
| `muted` | `#5B6475` | Secondary text, captions, metadata, and subtitle copy | 5.8:1 on white (AA) |
| `white` | `#FFFFFF` | Main page background, primary button text, card backgrounds | Base canvas |

### Contextual Pairings
- **On Light Canvas (`#FFFFFF` / `#F5F7FA`)**:
  - Primary copy: `ink` (`#0B1220`)
  - Secondary copy: `muted` (`#5B6475`)
  - Outlines / dividers: `border` (`#E5E8EE`)
- **On Blue Canvas (`#3068F9`)**:
  - Primary text / icons: `white` (`#FFFFFF`)
- **On Ink Canvas (`#0B1220`)**:
  - Primary headlines: `white` (`#FFFFFF`)
  - Secondary copy: `white` at 64% opacity (`rgba(255, 255, 255, 0.64)`)
  - Dividers: `white` at 10% opacity (`rgba(255, 255, 255, 0.1)`)
  - Action button: `white` background with `blue` (`#3068F9`) text

---

## 3. Typography System

**Single Typeface**: `Inter` (no extra display face, nothing above 600 weight).  
**Fallbacks**: `Noto Sans Sinhala` $\rightarrow$ `Noto Sans Tamil` $\rightarrow$ `system-ui` $\rightarrow$ `sans-serif`.  
**Feature Flags**: Optional `cv11` and `ss01`.

### Type Scale (9 Canonical Styles)

| Style | Desktop Size | Weight | Line Height | Tracking | Purpose & Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `Display / H1` | 96px | 500 (Medium) | 100% (1.0) | −4% (`-0.04em`) | Hero display headline |
| `Heading / H2` | 60px | 500 (Medium) | 105% (1.05) | −3% (`-0.03em`) | Section headlines |
| `Heading / H3` | 32px | 500 (Medium) | 120% (1.2) | −2% (`-0.02em`) | Card and sub-section headers |
| `Heading / H4` | 20px | 500 (Medium) | 130% (1.3) | −1% (`-0.01em`) | Step titles and feature labels |
| `Body / Large` | 18px | 400 (Regular) | 160% (1.6) | 0 (`normal`) | Hero sub-copy, lead intros |
| `Body / Default` | 16px | 400 (Regular) | 160% (1.6) | 0 (`normal`) | General paragraph copy |
| `Body / Small` | 14px | 400 (Regular) | 150% (1.5) | 0 (`normal`) | Supporting details, captions |
| `Label / Eyebrow`| 13px | 500 (Medium) | 140% (1.4) | +2% (`+0.15em`) | Section badges, uppercase tags |
| `Action / Button`| 15px | 500 (Medium) | 100% (1.0) | 0 (`normal`) | Interactive button labels |

### Responsive & Fluid Typography

| Viewport | Reference Width | H1 | H2 | H3 |
| :--- | :--- | :--- | :--- | :--- |
| **Mobile** | 390px | 44px | 34px | 24px |
| **Tablet** | 800px | 56px | 36px | 24px |
| **Desktop** | 1440px | 96px | 60px | 32px |

**Fluid CSS Rules**:
- `H1`: `clamp(44px, 7vw, 96px)`
- `H2`: `clamp(34px, 4.5vw, 60px)`
- `H3`: `clamp(24px, 2.5vw, 32px)`

---

## 4. Spacing, Grids & Breakpoints

### 8px Spacing Scale (9 Values)
`space/4` (4px) · `space/8` (8px) · `space/16` (16px) · `space/24` (24px) · `space/32` (32px) · `space/48` (48px) · `space/64` (64px) · `space/96` (96px) · `space/128` (128px).

### 12-Column Stretch Grid
- **Maximum Content Width**: `1280px`, horizontally centred.
- **Outer Shell**: `max-w-[1440px]`.
- **Gutter**: `24px` (`gap-6`).
- **Column Width**: Fluid stretch ($\approx 84.67\text{px}$ at 1280px content).

### Responsive Layout Specifications

| Breakpoint | Viewport Width | Columns | Side Margins | Gutter | Section Padding (Y) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Mobile** | $< 640\text{px}$ | 4 | 20px–24px | 16px | 64px (`py-16`) |
| **Tablet** | $640\text{px} - 1023\text{px}$ | 8 | 40px | 24px | 96px (`py-24`) |
| **Desktop** | $\ge 1024\text{px}$ | 12 | 64px–80px | 24px | 128px (`py-32`) |

---

## 5. Shape & Corner Radii

- **Cards & Images**: `16px` (`rounded-2xl`).
- **Form Inputs**: `12px` (`rounded-xl`).
- **Buttons & Tags**: `999px` (`rounded-full`, pill).
- **Strokes / Borders**: Uniform `1px solid #E5E8EE`. No double borders, no heavy shadows.

---

## 6. Button System

BHive provides two button families:

### A. Fully Rounded Pill Buttons (`BHive / Pill button`) — Website Standard
- **Height**: `60px` (`h-[60px]`, mobile `h-13` to `h-14`)
- **Radius**: `999px` (`rounded-full`)
- **Typography**: 15px, weight 500 (Inter Medium), line-height 100%
- **Content Variants**: Text only, or Text + Icon (`ArrowRight`, 24px, 1.5px stroke)
- **Treatments**:
  1. `Primary`: Blue (`#3068F9`) background, White text. Hover: `#1F55E0`.
  2. `Outline`: White background, 1px border (`#E5E8EE`), Ink (`#0B1220`) text. Hover: border `#C5CBE0`.
  3. `Filled`: White background, Blue (`#3068F9`) text (used inside the dark Ink zone).
  4. `Faded`: Blue-tint (`#EEF3FF`) background, Blue-hover (`#1F55E0`) text.

### B. Standard Compact Buttons (`BHive / Button`)
- **Heights**: Small `36px` (16px side padding), Medium `44px` (24px side padding), Large `48px` (28px side padding).
- **Radius**: `12px` (`rounded-xl`).
- **Typography**: 15px, weight 500.

---

## 7. Motion & Interaction Rules

- **Duration & Easing**: `200ms ease-out` (standard transitions).
- **Allowed Movement**: Subtle opacity fade and a `12px` upward translate only.
- **Prohibited**: Bouncy spring physics, scale-ups $> 1.03$, continuous oscillating loops, decorative parallax.
- **Accessibility**: Under `prefers-reduced-motion: reduce`, all transitions, upward translations, and animated height changes are disabled (`transition: none !important`).

---

## 8. Prohibited & Deprecated Patterns (Design Strict Guardrails)

The following legacy patterns are **strictly prohibited** in the codebase:
- ❌ Amber / yellow / "honey" palettes
- ❌ Old saturated navy `#010071` or `#0066cc` (use `#3068F9`)
- ❌ Gradients, linear gradient backgrounds, and mesh blurs
- ❌ Glassmorphism / `backdrop-blur` on primary content
- ❌ Drop shadows on cards or buttons (flat surfaces and 1px borders only)
- ❌ Hexagon background patterns or decorative grid lines
- ❌ Dark mode or theme switchers (the site is light-first with a single dark footer/CTA zone)
- ❌ JetBrains Mono, Bricolage Grotesque, or Geist fonts (use `Inter` only)
