# CloudSkinAdmin - Design System Documentation

## Overview
This document outlines the complete design system for the CloudSkinAdmin application, including color palette, typography, spacing, and component patterns.

---

## 🎨 Color Palette

### Primary Colors (Light Mode - Default)
- **Primary:** `#030213` (Deep Black/Navy)
- **Background:** `#ffffff` (White)
- **Foreground:** `#000000` (Black)

### Brand Colors (Used in Admin)
- **Primary Blue:** `#2D6A9F` (Buttons, Links, Interactive Elements)
- **Light Blue Background:** `#F0F6FC` (Secondary Buttons, Hover States)
- **Border Blue:** `#D0E8F5` (Borders, Dividers)
- **Muted Text:** `#5A7A96` (Secondary Text)
- **Light Text:** `#9BBAD4` (Placeholder, Disabled Text)
- **Dark Text:** `#1A2E40` (Primary Text)

### Status & Semantic Colors
- **Success:** `#15803D` (Green - Used Stock, Active)
- **Success Light:** `#DCFCE7` (Success Background)
- **Warning:** `#F59E0B` (Orange/Amber - Warning, Archive)
- **Warning Light:** `#FEF3C7` (Warning Background)
- **Error/Danger:** `#DC2626` (Red - Delete, Low Stock)
- **Error Light:** `#FEE2E2` (Error Background)
- **Critical Red:** `#d4183d` (Destructive Actions)
- **Muted:** `#ececf0` (Disabled, Muted States)

### Dark Mode Colors (Optional Support)
- **Background Dark:** `oklch(0.145 0 0)` (Very Dark Gray)
- **Foreground Dark:** `oklch(0.985 0 0)` (Nearly White)
- **Primary Dark:** `oklch(0.985 0 0)` (White)
- **Card Dark:** `oklch(0.145 0 0)` (Dark Gray)

---

## 📝 Typography

### Fonts Used
1. **DM Sans** - Primary font for headings and UI labels
   - Weights: 400, 500, 600, 700
   - Used for: Headers, Button Labels, UI Text, Navigation
   - Import: Google Fonts
   - URL: `https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400`

2. **Inter** - Secondary font for body content
   - Weights: 400, 500, 600
   - Used for: Body Text, Form Inputs, Descriptions, Content
   - Import: Google Fonts

3. **JetBrains Mono** - Monospace font for codes
   - Weights: 400, 500
   - Used for: Voucher Codes, SKU, Alphanumeric Values
   - Import: Google Fonts

### Font Sizes & Hierarchy
```
Base Size: 16px (--font-size)

Headlines:
- h1: --text-2xl (Large Headings)
- h2: --text-xl (Section Headers)
- h3: --text-lg (Subsection Headers)
- h4: --text-base (Small Headers)

Body:
- Label: --text-base (Form Labels)
- Button: --text-base (Button Text)
- Input: --text-base (Form Input Text)
- p: Standard paragraph size
```

### Line Heights
- All headings, labels, buttons: `1.5` (150%)
- Body text: Standard `1.6` (160%)

### Font Weights
- **Regular/Normal:** 400 (Body text, inputs)
- **Medium:** 500 (Labels, UI elements)
- **Semibold:** 600 (Emphasis, important text)
- **Bold:** 700 (Headers, strong emphasis)

---

## 🔲 Spacing & Layout

### Spacing Scale
- **xs:** 4px
- **sm:** 8px
- **md:** 12px
- **lg:** 16px
- **xl:** 20px
- **2xl:** 24px
- **3xl:** 32px

### Padding Standards
- **Cards/Sections:** `24px` (Large padding)
- **Table Cells:** `14px 16px` (Vertical 14px, Horizontal 16px)
- **Buttons:** `0 16px` to `0 18px` with height `40px`
- **Inputs/Fields:** `0 12px` with height `40px`

### Gaps & Margins
- **Component gaps:** `12px` (Most common)
- **Section gaps:** `16px` to `20px`
- **Item spacing:** `6px` to `8px` (Small items)

### Border Radius
- **Base Radius:** `0.625rem` (10px)
- **Variants:**
  - Small: `6px`
  - Medium: `8px`
  - Large: `12px`
  - Extra Large: `16px` (Modal corners)
  - Full: `9999px` (Badges, pills)

### Layout Method Priority
1. **Flexbox** (Most layouts)
   - Navigation, Toolbars, Button Groups
   - Row-based layouts with `gap`
   - Example: `display: "flex", gap: "12px", alignItems: "center"`

2. **CSS Grid** (Complex 2D layouts)
   - Tables with specific column widths
   - Example: `display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px"`

3. **Fixed/Absolute** (Only when necessary)
   - Dropdowns, Modals, Popovers
   - Used sparingly

---

## 🧩 Component Patterns

### Buttons
**Primary Button (CTA)**
```
Background: #2D6A9F
Border: none
Color: #FFFFFF
Height: 40px
Padding: 0 18px
Font: DM Sans, 13px, Weight 600
Border Radius: 8px
```

**Secondary Button**
```
Background: #F0F6FC
Border: 1.5px solid #D0E8F5
Color: #2D6A9F
Height: 40px
Padding: 0 16px
Font: DM Sans, 13px, Weight 600
Border Radius: 8px
```

**Icon Button (Small)**
```
Background: #F0F6FC
Border: none
Color: #2D6A9F
Size: 28px to 32px
Border Radius: 6px
```

### Input Fields
```
Height: 40px
Border: 1.5px solid #D0E8F5
Background: #FFFFFF
Padding: 0 12px
Font: Inter, 13px
Color: #1A2E40
Border Radius: 8px
Focus: Blue border (#2D6A9F)
```

### Tables
**Header Row**
```
Background: #F0F6FC
Border Bottom: 1px solid #D0E8F5
Font: DM Sans, 11px, Weight 600, Uppercase
Color: #5A7A96
Padding: 10px 16px
```

**Data Row**
```
Border Bottom: 1px solid #D0E8F5
Padding: 14px 16px
Hover: Background #F8FBFF
Font: Inter, 13px
```

### Status Badges
```
Border Radius: 9999px (Pill Shape)
Padding: 3px 10px
Font: DM Sans, 11px, Weight 600, Uppercase
Letter Spacing: 0.04em

Active Status:
  Background: #DCFCE7
  Color: #15803D

Used Status:
  Background: #FEF2F2
  Color: #DC2626

Inactive/Muted:
  Background: #F0F6FC
  Color: #5A7A96
```

### Modal/Dialog
```
Background: #FFFFFF
Border Radius: 12px (Large corners)
Box Shadow: 0 10px 40px rgba(26, 58, 92, 0.15)
Padding: 24px
Header Border Bottom: 1px solid #D0E8F5
```

### Cards
```
Background: #FFFFFF
Border Radius: 12px
Box Shadow: 0 1px 4px rgba(26, 58, 92, 0.08)
Padding: 20px to 24px
```

### Dropdown Menu
```
Background: #FFFFFF
Border: 1px solid #D0E8F5
Border Radius: 8px
Box Shadow: 0 4px 12px rgba(0, 0, 0, 0.1)
Z-Index: 100
Min Width: 140px

Menu Item:
  Padding: 10px 16px
  Border Bottom: 1px solid #D0E8F5 (except last)
  Font: Inter, 13px
  Hover: Light background
```

---

## 📊 Semantic Color Usage

### Text Colors
- **Primary:** `#1A2E40` - Main content, headings
- **Secondary:** `#5A7A96` - Labels, secondary info
- **Muted:** `#9BBAD4` - Placeholders, disabled text
- **Error:** `#DC2626` - Error messages
- **Success:** `#15803D` - Success messages

### Background Usage
- **Primary BG:** `#FFFFFF` - Main content area
- **Secondary BG:** `#F0F6FC` - Secondary buttons, hover states
- **Tertiary BG:** `#F8FBFF` - Table row hover
- **Status BG:** Color-coded (Green, Orange, Red)
- **Dark BG:** `#2D6A9F` - Primary CTA buttons

### Border Colors
- **Primary Border:** `#D0E8F5` - Standard borders
- **Light Border:** `#E5E7EB` - Subtle dividers
- **Focus Border:** `#2D6A9F` - Active/focus state

---

## 🎯 Common Usage Examples

### Example 1: Primary CTA Button
```javascript
style={{
  height: "40px",
  padding: "0 18px",
  background: "#2D6A9F",
  border: "none",
  borderRadius: "8px",
  color: "#FFFFFF",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "13px",
  fontWeight: 600,
  cursor: "pointer"
}}
```

### Example 2: Table Header
```javascript
style={{
  padding: "10px 16px",
  textAlign: "left",
  fontFamily: "'DM Sans', sans-serif",
  fontWeight: 600,
  fontSize: "11px",
  color: "#5A7A96",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  borderBottom: "1px solid #D0E8F5",
  whiteSpace: "nowrap"
}}
```

### Example 3: Status Badge
```javascript
style={{
  background: "#DCFCE7",
  color: "#15803D",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "11px",
  fontWeight: 600,
  padding: "3px 10px",
  borderRadius: "9999px",
  letterSpacing: "0.04em",
  textTransform: "uppercase"
}}
```

---

## 🎨 Design Tokens Summary

| Token | Value | Usage |
|-------|-------|-------|
| `--primary` | #2D6A9F | Primary buttons, links |
| `--background` | #ffffff | Main background |
| `--foreground` | #000000 | Primary text |
| `--muted` | #ececf0 | Disabled states |
| `--muted-foreground` | #717182 | Secondary text |
| `--accent` | #e9ebef | Accent backgrounds |
| `--destructive` | #d4183d | Delete, dangerous actions |
| `--border` | rgba(0,0,0,0.1) | Standard borders |
| `--radius` | 0.625rem (10px) | Border radius base |

---

## 📱 Responsive Breakpoints
While no Tailwind breakpoints are explicitly configured, the design uses:
- **Mobile:** Full width, adjusted padding
- **Tablet:** Optimized layouts
- **Desktop:** Full feature set with expanded layouts

---

## ✅ Best Practices

1. **Always use DM Sans for UI/Headings** - Maintains consistency
2. **Use Inter for body content** - Better readability
3. **Use JetBrains Mono for codes/SKUs** - Clear distinction
4. **Maintain 12px component gap** - Standard spacing between items
5. **Use semantic colors** - Green for success, Red for danger
6. **Prioritize flexbox** - For 90% of layouts
7. **Use 8px/4px multiples** - For consistent spacing
8. **Apply hover states** - Background #F8FBFF or color shift
9. **Maintain z-index hierarchy** - Dropdowns (100), Modals (1000)
10. **Use border radius consistently** - 6-12px for most components

---

*Last Updated: May 2026*
