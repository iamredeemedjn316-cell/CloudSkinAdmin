# Figma Design Prompt — Cloud Skin Clinic + Wellness
## Admin & Staff Dashboard (`admin.cloudskin.com`) — UI/UX Design Brief

> **How to use this prompt:**
> Paste this document into Figma AI (First Draft), Galileo AI, Relume, Anima, or hand it to a UI designer as a complete design brief.
> Every section maps directly to Figma frames, components, and design tokens.

---

## 1. Project Overview

**Client:** Cloud Skin Clinic + Wellness
**Portal:** `admin.cloudskin.com` — Internal staff dashboard (never public-facing)
**Users:** 3 role types — Admin/Owner, Practitioner, Receptionist
**Purpose:** Manage appointments, patients, treatments, inventory, vouchers, payments, blog, and reports
**Tone:** Professional, clinical, efficient — optimized for daily operational use by non-technical clinic staff
**Design Reference:** Linear.app, Notion, Vercel Dashboard, Superhuman — clean data-dense SaaS dashboards with excellent information hierarchy

> This is a **web app dashboard**, not a marketing site. Every design decision should prioritize speed of use, data clarity, and error prevention over visual decoration.

---

## 2. Design System — Tokens

### 2.1 Color Palette

The admin portal shares the same brand colors as the public website but uses a **sidebar-based dark navigation** with lighter content areas for contrast and focus.

| Token Name | Hex | Usage |
|---|---|---|
| `color-primary` | `#2D6A9F` | Active nav items, primary buttons, links, focus rings |
| `color-accent` | `#5BC0EB` | Highlights, badges, stat card accents |
| `color-dark` | `#1A3A5C` | Sidebar background, dark header elements |
| `color-sidebar-bg` | `#152F4A` | Main sidebar background (slightly darker than dark) |
| `color-sidebar-hover` | `#1E3F61` | Sidebar nav item hover |
| `color-sidebar-active` | `#2D6A9F` | Active sidebar nav item background |
| `color-content-bg` | `#F0F6FC` | Main content area background |
| `color-white` | `#FFFFFF` | Cards, table rows, modal backgrounds |
| `color-border` | `#D0E8F5` | Table borders, card borders, dividers |
| `color-border-strong` | `#A8CCE8` | Focused inputs, section separators |
| `color-text-primary` | `#1A2E40` | Primary labels, table cell data |
| `color-text-secondary` | `#5A7A96` | Secondary labels, column headers, captions |
| `color-text-muted` | `#9BBAD4` | Placeholder text, disabled states |
| `color-text-sidebar` | `#B8D4EC` | Sidebar nav labels (default) |
| `color-text-sidebar-active` | `#FFFFFF` | Active sidebar nav label |

**Status Colors (semantic):**

| Status | Background | Text | Usage |
|---|---|---|---|
| `status-confirmed` | `#DCFCE7` | `#15803D` | Confirmed appointments/payments |
| `status-pending` | `#FEF9C3` | `#A16207` | Pending review/confirmation |
| `status-in-progress` | `#DBEAFE` | `#1D4ED8` | In-progress appointments |
| `status-completed` | `#F0F6FC` | `#475569` | Completed records |
| `status-cancelled` | `#FEE2E2` | `#B91C1C` | Cancelled appointments |
| `status-no-show` | `#FEF3C7` | `#92400E` | No-show clients |
| `status-rejected` | `#FEE2E2` | `#B91C1C` | Rejected payments |
| `status-low-stock` | `#FEF3C7` | `#92400E` | Low inventory alert |
| `status-active` | `#DCFCE7` | `#15803D` | Active vouchers/staff |
| `status-inactive` | `#F1F5F9` | `#64748B` | Inactive/deactivated items |
| `status-draft` | `#F1F5F9` | `#64748B` | Blog post drafts |
| `status-published` | `#DCFCE7` | `#15803D` | Published blog posts |

### 2.2 Typography

Same fonts as public website — **DM Sans** (headings/labels) and **Inter** (body/data).

| Token | Font | Weight | Size | Usage |
|---|---|---|---|---|
| `text-page-title` | DM Sans | 700 | 24px | Page headings (e.g., "Appointments") |
| `text-section-title` | DM Sans | 600 | 18px | Card headings, section labels |
| `text-table-header` | DM Sans | 600 | 13px | Table column headers (uppercase, letter-spacing) |
| `text-body` | Inter | 400 | 14px | Table cell data, form body text |
| `text-body-sm` | Inter | 400 | 13px | Captions, helper text, timestamps |
| `text-label` | DM Sans | 500 | 13px | Form labels, input labels |
| `text-button` | DM Sans | 600 | 14px | Button text |
| `text-stat-value` | DM Sans | 700 | 32px | Stat card numbers |
| `text-stat-label` | Inter | 400 | 13px | Stat card labels |
| `text-nav` | DM Sans | 500 | 14px | Sidebar nav labels |
| `text-badge` | DM Sans | 600 | 11px | Status badge text (uppercase) |
| `text-mono` | JetBrains Mono / monospace | 400 | 13px | IDs, voucher codes, SKUs |

### 2.3 Spacing Scale

Same 8px base grid as public website. Dashboard-specific values:

```
Sidebar width (expanded):   240px
Sidebar width (collapsed):   64px
Top bar height:              60px
Content area padding:        32px (desktop), 16px (mobile)
Card inner padding:          20px 24px
Table cell padding:          12px 16px
Form group spacing:          20px
```

### 2.4 Border Radius

```
radius-sm   =  4px   — table cells, small badges
radius-md   =  8px   — buttons, inputs, small cards
radius-lg   =  12px  — main content cards
radius-xl   =  16px  — stat cards, modal dialogs
radius-full = 9999px — status pills, avatar circles
```

### 2.5 Shadows

```
shadow-card   — 0 1px 4px rgba(26,58,92,0.08), 0 2px 8px rgba(26,58,92,0.04)
shadow-modal  — 0 8px 32px rgba(26,58,92,0.18)
shadow-dropdown — 0 4px 16px rgba(26,58,92,0.12)
shadow-topbar — 0 1px 3px rgba(26,58,92,0.08)
```

### 2.6 Breakpoints

| Name | Width | Target |
|---|---|---|
| Mobile | 375px | Staff mobile access (limited use) |
| Tablet | 768px | iPad (receptionist at front desk) |
| Desktop | 1280px | Main staff workstation |
| Wide | 1440px | Admin with wide monitor |

---

## 3. Layout Shell — Dashboard Chrome

The dashboard has a **fixed shell** that wraps every page. Design this as a master frame with slots for page content.

### 3.1 Sidebar Navigation

**Dimensions:** 240px wide (expanded), 64px (collapsed — icon only)
**Background:** `color-sidebar-bg` (#152F4A)
**Position:** Fixed left, full viewport height

**Structure (top to bottom):**
1. **Logo area** (height 60px) — Cloud Skin logo (white version) + clinic name in white
2. **Nav items** (flexible) — icon + label per item (see role-specific items below)
3. **Collapse toggle** — chevron icon at bottom, toggles sidebar width with smooth transition
4. **User profile widget** (height 64px, pinned bottom) — avatar circle, name, role badge, logout icon

**Nav item anatomy:**
- Height: 44px
- Padding: 0 16px
- Icon: 20px, `color-text-sidebar`
- Label: `text-nav`, `color-text-sidebar`
- Hover: background `color-sidebar-hover`, text/icon white
- Active: background `color-sidebar-active` (#2D6A9F), text/icon white, left accent bar (3px `color-accent`)
- With badge (e.g., pending count): small number badge pill (red) right-aligned

**Collapsed state:**
- Show icon only (centered)
- Tooltip on hover with label
- Logo collapses to icon only

### 3.2 Top Bar

**Dimensions:** Full width minus sidebar, height 60px
**Background:** White, `shadow-topbar`
**Position:** Fixed top

**Content (left to right):**
- Page title: `text-page-title`, `color-text-primary`
- Breadcrumb (secondary): `text-body-sm`, `color-text-secondary` — e.g., "Appointments > View All"
- Spacer (flex-grow)
- Search icon button
- Notification bell icon (with count badge if unread)
- Divider
- User avatar + name + role badge (small, inline) + dropdown chevron

**Notification Dropdown:**
- Width 360px, `shadow-dropdown`, `radius-lg`
- List of recent alerts: low stock, pending payments, new bookings
- Each item: icon, title, time ago, unread dot
- "View All" link at bottom

### 3.3 Content Area

- Fills remaining space (viewport minus sidebar and top bar)
- Background: `color-content-bg` (#F0F6FC)
- Padding: `32px`
- Scroll: vertical scroll within content area only (sidebar and topbar stay fixed)

---

## 4. Role-Based Sidebar Navigation Items

### Admin Sidebar
```
🏠  Dashboard          /admin
📅  Appointments       /admin/appointments       [badge: today's count]
👥  Patients           /admin/patients
👤  Staff              /admin/staff
💊  Services           /admin/services
📦  Inventory          /admin/inventory          [badge: low stock count if >0]
🎟️  Vouchers           /admin/vouchers
💳  Payments           /admin/payments           [badge: pending review count if >0]
📊  Reports            /admin/reports
✍️  Blog               /admin/blog
⚙️  Settings           /admin/settings
```

### Practitioner Sidebar
```
🏠  Dashboard          /practitioner
📅  My Schedule        /practitioner/schedule
👥  My Patients        /practitioner/patients
```

### Receptionist Sidebar
```
🏠  Dashboard          /reception
📅  Appointments       /reception/appointments   [badge: today's count]
👥  Patients           /reception/patients
💳  Payments           /reception/payments       [badge: pending count if >0]
📦  Inventory          /reception/inventory
```

---

## 5. Component Library

### 5.1 Buttons

**Primary Button**
- Background: `color-primary`
- Text: White, `text-button`
- Padding: `10px 20px`
- Border Radius: `radius-md` (8px) — dashboard buttons are less rounded than public site
- Height: 38px (standard), 32px (compact/table row)
- Hover: darken 8%, `shadow-card`
- Variants: Default / Hover / Active / Disabled / Loading

**Secondary Button (Outlined)**
- Border: 1.5px `color-primary`
- Text: `color-primary`
- Background: White
- Hover: `color-content-bg` background

**Danger Button**
- Background: `#DC2626` (red)
- Use for: Delete, Deactivate, Reject

**Ghost/Text Button**
- No border, no background
- Text: `color-primary`
- Use for: secondary actions in table rows, breadcrumb links

**Icon Button**
- 32×32px square, `radius-md`
- Background: transparent, hover: `color-content-bg`

**Button Group**
- Joined buttons sharing one border (e.g., Export / Filter toggle)

### 5.2 Data Table

The most-used component in the entire admin dashboard. Must be pixel-perfect.

**Structure:**
- Header row: `color-content-bg` background, `text-table-header` (uppercase, 13px, `color-text-secondary`), 1px bottom border `color-border`
- Data rows: White background, 1px bottom border `color-border`, height 52px
- Row hover: `color-content-bg` background tint
- Selected row: light `color-primary` tint background + left accent border

**Column types to design:**
- Text cell: primary text + optional secondary line below (smaller, muted)
- Status badge cell: pill badge (see Status Colors)
- Date/time cell: `text-mono` for time, human-readable date
- Amount cell: right-aligned, `text-body` bold
- Action cell: right-aligned icon buttons (Edit, View, Delete, more)
- Avatar + name cell: circle avatar (32px) + name beside it
- Checkbox cell: 16px checkbox on left edge

**Table toolbar (above table):**
- Left: Page title count ("124 Appointments"), optional filter chips
- Right: Search input (expandable), Filter button, Column selector, Export button

**Pagination (below table):**
- "Showing 1–20 of 124" label
- Previous / Next buttons
- Page number pills
- Rows per page selector (20 / 50 / 100)

**Empty state:**
- Centered icon + heading + subtext + optional CTA button
- Example: calendar icon + "No appointments today" + "Book one now" button

### 5.3 Stat Cards

Used on all dashboards for KPI metrics at a glance.

**Dimensions:** Flexible width (fills grid column), height ~120px
**Background:** White, `shadow-card`, `radius-xl`
**Structure:**
- Top row: label (`text-stat-label`, `color-text-secondary`) + icon (right, 32px, circle `color-accent` bg)
- Middle: value (`text-stat-value`, `color-text-primary`)
- Bottom: delta indicator — ↑ +12% from last week (green) or ↓ -3% (red)

**Variants:**
- Default (white card)
- Primary (solid `color-primary` background, all white text — use sparingly for most important KPI)
- Warning (amber left border — for alerts like "3 pending payments")

### 5.4 Form Elements

Same styling as public website inputs but more compact for dense forms.

**Text Input (dashboard)**
- Height: 40px (vs 52px on public site)
- Border: 1.5px `color-border`
- Border Radius: `radius-md` (8px)
- Focus: border `color-primary`, subtle `shadow-card`
- Background: White

**Select Dropdown**
- Same size as input
- Custom chevron icon

**Date Input**
- Text input with calendar icon trigger
- Calendar popover: `shadow-dropdown`, `radius-lg`

**Time Input**
- Text input or HH:MM selectors

**Search Input**
- Left: search icon (16px, muted)
- Clearable with × button when has value
- Expandable variant: icon only → full input on focus

**Toggle Switch**
- 40×22px pill
- Off: `color-border` track, white thumb
- On: `color-primary` track, white thumb
- Transition: 200ms

**Checkbox**
- 16×16px, `radius-sm`
- Checked: `color-primary` fill, white checkmark
- Indeterminate state for table select-all

**Radio Button**
- Standard radio with `color-primary` selected state

**File Upload Zone**
- Dashed border `color-border`, `radius-lg`
- Drag-and-drop area with upload icon + "Drag files here or click to browse"
- Compact variant: small pill button "Choose File" for inline use

### 5.5 Modal / Dialog

**Dimensions:** Width 480px (small), 640px (medium), 800px (large)
**Background:** White, `radius-xl`, `shadow-modal`
**Overlay:** `rgba(26,58,92,0.5)` backdrop blur 4px

**Structure:**
- Header (56px): Title `text-section-title` + close × button (right)
- Divider
- Body: scrollable if content exceeds 60vh, padding `24px`
- Divider
- Footer (64px): action buttons right-aligned (Cancel ghost + Primary action)

**Variants:**
- Confirm/Delete: centered icon (warning/danger) + heading + short message + two buttons
- Form Modal: form fields in body
- Viewer Modal: image/content viewer (no footer)

### 5.6 Inline Notification / Alert Banner

- Full-width within content area
- Left colored border (4px) by type
- Types: Info (blue), Success (green), Warning (amber), Error (red)
- Structure: Icon + heading + body text + optional dismiss button

### 5.7 Dropdown Menu (Context Menu)

- Triggered by kebab (⋮) or chevron button
- Width: 200px min, `shadow-dropdown`, `radius-md`
- Items: icon (16px, optional) + label, 36px height each
- Divider between groups
- Danger items: red text + red icon

### 5.8 Avatar

- Circle
- Sizes: 24px (inline), 32px (table row), 40px (top bar), 48px (profile header)
- Fallback: initials (first + last name initial) on `color-primary` background

### 5.9 Breadcrumb

- Separated by `/` or `›`
- Last item: `color-text-primary`, bold
- Prior items: `color-text-secondary`, clickable link
- Mobile: show only current + parent

### 5.10 Tab Bar

Used inside pages to switch between sub-views (e.g., Appointment List / Calendar view).

- Underline tabs style (no box/pill style)
- Active: `color-primary` underline (2px), `color-primary` text, bold
- Inactive: `color-text-secondary` text
- Height: 44px per tab
- Divider below tab bar: 1px `color-border`

### 5.11 Calendar View Component

For appointment schedule views.

- FullCalendar-style week/month grid
- Event chip: background `color-primary` (confirmed), amber (pending), green (completed), red (cancelled)
- Event chip content: client name (truncated) + time
- Today column/cell: light `color-accent` tint background
- Day number header: `text-body`, bold for today
- Toolbar: Previous / Today / Next buttons + Week / Month / Day toggle

### 5.12 Sidebar Drawer (Detail Panel)

Used to show record details without leaving the page (avoid full page navigation for quick views).

- Slides in from the right
- Width: 480px (desktop), full-width (mobile)
- Header: record title + close button
- Body: scrollable detail sections
- Footer: primary action button(s)

### 5.13 Progress / Step Indicator

Used for multi-step forms (e.g., creating a new booking).

- Horizontal steps with connecting line
- Step states: Completed (check icon, `color-primary`), Current (filled circle, `color-primary`), Upcoming (empty circle, `color-border`)

### 5.14 Rich Text Editor Toolbar

For blog post editor.

- Toolbar: Bold, Italic, Underline, Strikethrough | H1, H2, H3 | Bullet list, Numbered list | Quote | Link | Image insert | Divider
- Content area: white, bordered, min-height 400px, 16px padding

---

## 6. Page Designs

### Page 1 — Staff Login (`/login`)

**Layout:** Split screen (same approach as public site login for consistency)

**Left Panel (40% width):**
- Background: `color-dark` (#1A3A5C)
- Clinic logo (white version) centered
- Tagline: "Staff Portal — Cloud Skin Clinic + Wellness"
- Decorative: soft light radial gradient or abstract blob

**Right Panel (60% width):**
- Background: White
- Vertically centered form (max-width 380px)
- Heading: "Staff Sign In" (`text-h2`)
- Sub: "For Admin, Practitioners, and Receptionists only"
- Email input
- Password input (with show/hide toggle)
- "Forgot Password?" link (right-aligned below password input)
- "Sign In" Primary Button (full width)
- Bottom note: "Not a staff member? Book at cloudskin.com" (small, `color-text-muted`)

**Important:** Must include `<meta name="robots" content="noindex">` — no public indexing.

---

### Page 2 — Admin Dashboard (`/admin`)

**Top row — Stat Cards (4 columns):**
1. Today's Appointments (with ↑/↓ vs yesterday)
2. Revenue Today (PHP, with trend)
3. Pending Payments (amber warning variant if > 0)
4. Low Stock Items (amber warning variant if > 0)

**Second row (2 columns):**
- Left (60%): **Upcoming Appointments** — compact table (client name, service, time, practitioner, status badge, action button)
- Right (40%): **Today's Revenue Breakdown** — simple donut chart by payment method (Cash / GCash / Card / Transfer)

**Third row (2 columns):**
- Left (50%): **Recent Patient Activity** — list of 5 most recent patient records updated (avatar + name + action + time ago)
- Right (50%): **Low Stock Alerts** — list of items below threshold (item name, current stock, threshold, "View" link)

**Quick Actions strip (below stats, above tables):**
Row of 4 icon + label action cards:
- "+ New Booking"
- "+ New Patient"
- "Review Payments" (badge with count)
- "Write Blog Post"

---

### Page 3 — Appointments (`/admin/appointments`)

**Tab Bar:** List View | Calendar View

**List View:**

Top toolbar:
- Left: "124 Appointments" count + active filter chips (e.g., "Today", "Confirmed")
- Right: Date range picker, Status filter dropdown, Practitioner filter dropdown, Export button, "+ New Appointment" button

Data Table columns:
| # | Client | Service | Date & Time | Practitioner | Status | Payment | Actions |
|---|---|---|---|---|---|---|---|

- Client cell: avatar + name + phone (small below)
- Service cell: service name + duration badge
- Date/Time cell: formatted date + time in `text-mono`
- Status badge: color-coded pill
- Payment cell: method icon + amount + payment status badge
- Actions: View (eye icon), Edit (pencil icon), more menu (⋮)

**Calendar View:**

Toolbar: Previous / Today / Next + Week / Month toggle + Practitioner filter

Calendar grid: Standard week/month calendar with appointment event chips

Click on event → Sidebar Drawer opens with full appointment detail

---

### Page 4 — Appointment Detail / Edit (Modal or full page)

**Layout:** Full page or large modal (800px)

**Sections:**
1. **Appointment Header** — Status badge (large), booking reference (mono), created date
2. **Client Details Card** — Avatar, name, phone, email, "View Patient" link
3. **Appointment Details Card** — Service, practitioner, date/time, duration, notes
4. **Payment Card** — Method, amount, voucher applied (if any), discount, total, status
5. **Proof of Payment** (if uploaded) — Image thumbnail → click to enlarge
6. **Status Action Bar** (bottom, sticky):
   - Receptionist: "Check In" / "Cancel" buttons
   - Practitioner: "Start Session" / "Mark Complete" buttons
   - Admin: full status dropdown + action button

---

### Page 5 — Patients (`/admin/patients`)

**Top toolbar:** Search input, Filter by date joined, "+ New Patient" button

**Data Table columns:**
| Avatar + Name | Phone | Date of Birth | Last Visit | Assigned Practitioner | Status | Actions |

Click row → opens Patient Profile (sidebar drawer or dedicated page)

**Patient Profile Page Layout (full page `/admin/patients/[id]`):**

**Header section:**
- Large avatar (80px), patient name (`text-h2`), age, contact info (phone + email)
- Quick stats row: Total visits, Last visit, Active packages, Vouchers

**Tab Bar:** Overview | Appointments | Treatment Records | Skin Assessments | Photos | Payments

**Overview Tab:**
- 2 columns: left = personal info form (read/edit), right = skin concerns + medical history

**Appointments Tab:**
- Compact appointment history table (date, service, practitioner, status)

**Treatment Records Tab:**
- Timeline view — each session as a card:
  - Date, practitioner, service, clinical notes, follow-up notes (client-visible), products used

**Skin Assessments Tab:**
- Form-style view of skin assessment fields: skin type, concerns, conditions, allergies, current routine

**Photos Tab:**
- Before/after grid — each session has a pair
- Lightbox on click

**Payments Tab:**
- Transaction history table

---

### Page 6 — Staff Management (`/admin/staff`)

**Top toolbar:** Search, Role filter (All / Admin / Practitioner / Receptionist), "+ Add Staff" button

**Data Table columns:**
| Avatar + Name | Role Badge | Email | Phone | Specialty | Status | Date Added | Actions |

**Add / Edit Staff Modal (640px):**
- Full Name, Email, Phone inputs
- Role selector (radio buttons: Admin / Practitioner / Receptionist)
- Specialty input (shown only when Practitioner selected)
- Profile photo upload
- Status toggle (Active / Inactive)
- Footer: Cancel + "Save Staff Account"

---

### Page 7 — Services (`/admin/services`)

**Top toolbar:** Category filter pills, "+ Add Service" button

**Card Grid Layout** (3-col desktop, 2-col tablet, 1-col mobile) — service cards in admin style:
- Image thumbnail (small, right side)
- Service name (`text-section-title`)
- Category badge, duration pill, price
- Assigned practitioners (avatar stack, max 3 + overflow count)
- Status toggle (Active/Inactive)
- Edit link

**Add / Edit Service Modal:**
- Service Name, Category (select), Duration (number input + minutes label), Price (PHP currency input)
- Description textarea
- Featured Image upload
- Assigned Practitioners (multi-select with avatar chips)
- Status toggle

---

### Page 8 — Inventory (`/admin/inventory`)

**Top toolbar:** Category filter, Low Stock filter toggle, Search, "+ Add Item" button

**Stat row (3 cards):**
- Total Items
- Low Stock Items (amber warning)
- Out of Stock Items (red warning)

**Data Table columns:**
| Item Name | SKU | Category | Unit | Current Stock | Threshold | Status | Last Updated | Actions |

- Current Stock cell: shows number + colored indicator:
  - Green if stock > threshold
  - Amber if stock ≤ threshold
  - Red if stock = 0
- Progress bar mini visual inside stock cell (stock vs threshold)

**Actions:** Edit (pencil), Adjust Stock (+/−), View History

**Stock Adjustment Modal:**
- Item name (read-only header)
- Current stock (read-only)
- Adjustment type: + Add Stock / − Write Off (radio)
- Quantity input
- Reason select (Restock / Damaged / Expired / Used / Other)
- Notes textarea
- "Confirm Adjustment" button

**Transaction History Drawer:**
- Table: Date, Type (Deduction/Addition), Quantity, Reason, Reference (session/sale ID), Staff

---

### Page 9 — Vouchers (`/admin/vouchers`)

**Top toolbar:** Status filter (All / Active / Inactive / Expired), Search by code, "+ Create Voucher" button

**Data Table columns:**
| Code (mono) | Discount | Eligible Services | Expiry Date | Uses (used/max) | Status | Actions |

**Create / Edit Voucher Modal:**
- Voucher Code input (with "Generate Random" button beside it)
- Discount Type: Percentage / Fixed Amount (toggle radio)
- Discount Value input (% or PHP)
- Eligible Services multi-select (service name chips)
- Expiry Date picker
- Max Uses number input (or "Unlimited" toggle)
- Status toggle (Active / Inactive)
- Footer: Cancel + "Save Voucher"

**Redemption History Drawer (per voucher):**
- Table: Client name, Appointment date, Service, Discount applied, Date redeemed

---

### Page 10 — Payments (`/admin/payments`)

**Tab Bar:** Pending Review | All Transactions

**Pending Review Tab:**

Alert banner at top (if any pending): "3 proof-of-payment uploads awaiting review"

**Card Grid** (2-col desktop) — one card per pending payment:
- Client name + avatar
- Appointment: service, date, time
- Payment method badge (GCash / Card / Online Transfer)
- Amount: PHP value
- Uploaded image thumbnail — click to expand full-size proof image viewer
- "Confirm Payment" (green button) + "Reject" (red outlined button)
- Rejection: shows inline text input for rejection reason before confirming reject

**All Transactions Tab:**

Data Table columns:
| Client | Service | Date | Method | Amount | Voucher Applied | Discount | Total | Status | Actions |

---

### Page 11 — Reports (`/admin/reports`)

**Sub-navigation tabs:** Revenue | Appointments | Inventory | Vouchers | Practitioner Performance

**Shared toolbar (all tabs):** Date range picker (presets: Today / This Week / This Month / Custom) + Export CSV button

**Revenue Tab:**
- Stat row: Total Revenue (period), Average per Appointment, Top Service, Top Practitioner
- Line chart: Revenue over time (daily/weekly toggle)
- Bar chart: Revenue by Service (horizontal bars)
- Table: Transaction list for period

**Appointments Tab:**
- Stat row: Total Appointments, Completed, Cancelled, No-Shows, No-Show Rate %
- Bar chart: Appointments per day
- Pie chart: Appointments by Status
- Table: Breakdown by Service and Practitioner

**Inventory Tab:**
- Stat row: Items Restocked, Items Written Off, Total Retail Sales, Total Treatment Usage
- Bar chart: Top 10 most used items
- Table: Full usage log for period

**Vouchers Tab:**
- Stat row: Vouchers Redeemed, Total Discount Given, Top Voucher Code
- Table: Voucher redemption breakdown

**Practitioner Performance Tab:**
- Card-per-practitioner layout:
  - Avatar + name + specialty
  - Sessions completed, Revenue generated, Clients seen
  - Top service performed

---

### Page 12 — Blog Management (`/admin/blog`)

**Top toolbar:** Status filter (All / Published / Draft), Search, "+ New Post" button

**Data Table columns:**
| Featured Image (thumbnail) | Title | Category | Author | Published Date | Status | Views | Actions |

**Blog Post Editor Page (`/admin/blog/new`, `/admin/blog/[id]`):**

**Layout:** Two-panel — left = editor (70%), right = settings panel (30%)

**Left panel:**
- Title input (large, borderless — inline heading style)
- Slug input (auto-generated from title, editable, mono font)
- Rich text editor (see Component 5.14)

**Right settings panel (sticky):**
- Status toggle: Draft / Published
- Publish Date picker
- Category select
- Author Name input
- Featured Image upload (drag-and-drop zone + preview)
- "Save Draft" ghost button + "Publish" primary button
- "Delete Post" danger link at bottom

---

### Page 13 — Settings (`/admin/settings`)

**Sub-sections (left sidebar sub-nav):**
- Booking Configuration
- Clinic Information
- Notification Preferences (future)

**Booking Configuration Section:**
Form card:
- Booking Start Time: time input (default 10:00)
- Booking End Time: time input (default 12:00)
- Slot Interval: radio buttons — 30 minutes / 60 minutes
- Info banner: "Changes take effect immediately for all new bookings"
- "Save Booking Settings" button

**Clinic Information Section:**
Form card:
- Clinic Name
- Address (textarea)
- Phone Number
- Email Address
- Operating Hours (per day — Mon–Sun toggles with time range inputs)
- "Save Clinic Info" button

---

### Page 14 — Practitioner Dashboard (`/practitioner`)

**Stat row (3 cards):**
- Today's Appointments
- Completed This Week
- Patients Assigned

**Today's Schedule (main content):**
- Timeline-style list: each appointment block shows time, client avatar + name, service, status badge
- "Mark In Progress" / "Mark Complete" inline buttons per appointment

**Quick links:**
- View Full Schedule (calendar)
- My Patients

---

### Page 15 — Practitioner Schedule (`/practitioner/schedule`)

**Calendar component** (see Component 5.11) — Week view default, Month view available

Shows only this practitioner's appointments.

Click appointment → Sidebar Drawer:
- Client name + contact info
- Service + duration
- Status badge
- "Start Session" / "Complete Session" action buttons

---

### Page 16 — Treatment Session Form (`/practitioner/sessions/[id]`)

**Full page layout** (640px max-width, centered)

**Header:** Patient name + appointment date/time

**Form sections:**
1. **Session Summary** — Date, service, practitioner (read-only)
2. **Clinical Notes** — Rich textarea (private, not shown to client)
3. **Follow-Up Notes** — Textarea (client-visible, shown in client portal)
4. **Products Used** — Dynamic row list:
   - Product selector (search + select from inventory)
   - Quantity input
   - "+ Add Product" row button
   - Each row shows current stock available beside selected product
5. **Before/After Photos** — 2-column upload: Before (left) | After (right)
   - Drag-and-drop zones per slot
   - Thumbnail preview after upload

**Footer:** "Save Draft" + "Complete Session" (primary, triggers stock deduction)

---

### Page 17 — Receptionist Dashboard (`/reception`)

**Stat row (3 cards):**
- Today's Appointments
- Checked In (currently in clinic)
- Pending Payments

**Today's Check-In Queue (main content):**

Table with today's appointments sorted by time:
| Time | Client | Service | Practitioner | Status | Actions |

Actions per row:
- "Check In" button (if status = confirmed)
- "Checkout" button (if status = completed — opens checkout flow)
- View details icon

**Pending Payments widget (right column):**
- List of unreviewed proof-of-payment uploads
- Each: client name, service, method icon, "Review" button

---

### Page 18 — Receptionist Checkout Flow

**Triggered by:** "Checkout" button on appointment row

**Appears as:** Large modal (800px) or dedicated page

**Sections:**
1. **Appointment Summary** — Client, service, practitioner, date/time (read-only)
2. **Voucher Application:**
   - Voucher code text input + "Apply" button
   - Validation states:
     - Loading: spinner in Apply button
     - Valid: green checkmark + discount details shown (type, amount, eligible service confirmed)
     - Invalid: inline error with specific reason ("This voucher has expired." etc.)
3. **Payment Summary:**
   - Service price: PHP X,XXX
   - Voucher discount: − PHP XXX (shown if applied)
   - **Total: PHP X,XXX** (bold, larger)
4. **Payment Method:**
   - Radio cards: Cash | GCash | Card | Online Transfer (icon + label)
   - For Cash: "Record Cash Payment" button
   - For non-cash: proof image upload zone + status shows as pending review
5. **Footer:**
   - "Cancel" ghost button + "Confirm Checkout" primary button

---

## 7. Responsive Behavior Notes

- **Sidebar:** Visible + expanded on desktop (≥1280px); icon-only on tablet (768–1279px); hidden + slide-in drawer on mobile (<768px)
- **Data tables:** Horizontal scroll on tablet/mobile — pin first column (client name), allow scroll for other columns
- **Stat cards:** 4-col desktop → 2-col tablet → 1-col mobile
- **Modals:** Full-screen on mobile
- **Rich text editor:** Simplified toolbar on mobile (hide less-used buttons)
- **Calendar:** Week view on desktop → Day view on mobile (too dense otherwise)
- **Forms:** Single-column on mobile, 2-column on desktop for side-by-side field groups

---

## 8. Animation & Interaction Guidelines

- **Sidebar transition:** 200ms ease — width collapse/expand; icon fade
- **Table row hover:** 100ms background color transition
- **Modal open/close:** 200ms fade-in + 8px upward translateY
- **Sidebar drawer open/close:** 300ms slide from right
- **Status badge updates (real-time):** Brief background flash animation when value changes
- **Loading states:** Skeleton rows in tables (shimmer effect) while data loads
- **Toast notifications:** Slide in from bottom-right, auto-dismiss after 4s
- **Form validation:** Real-time inline validation on blur (not on keystroke)
- **Stock deduction:** Success/failure flash on product row in session form

---

## 9. Figma File Structure (Recommended)

```
📄 Cover              — Project title, version, date, role legend
📄 Design Tokens      — Color styles, text styles, spacing, shadows
📄 Components         — All reusable components with variants
📄 Shell / Layout     — Dashboard chrome (sidebar + topbar master frames)
📄 Login              — Staff login page
📄 Admin Dashboard    — Desktop + tablet frames
📄 Appointments       — List view + Calendar view + Detail modal
📄 Patients           — List + Full Patient Profile (all tabs)
📄 Staff              — List + Add/Edit modal
📄 Services           — Grid + Add/Edit modal
📄 Inventory          — Table + Adjust modal + History drawer
📄 Vouchers           — Table + Create modal + Redemption drawer
📄 Payments           — Pending review cards + All transactions table
📄 Reports            — All 5 report tabs
📄 Blog               — Post list + Editor page
📄 Settings           — Booking config + Clinic info
📄 Practitioner       — Dashboard + Schedule + Session Form
📄 Receptionist       — Dashboard + Checkout Flow
📄 Prototype Flow     — Clickable prototype for all 3 role flows
```

---

## 10. Accessibility Requirements

- Minimum contrast ratio: 4.5:1 for all body text, 3:1 for UI components (WCAG AA)
- All form inputs must have visible labels (not placeholder-only)
- Focus rings: 2px `color-primary` on all interactive elements (keyboard navigation)
- Table rows: keyboard-navigable with arrow keys
- Status badges: never use color alone — always include a text label
- Error messages: always include icon + text, not just color
- Modals: trap focus within modal when open, return focus on close
- Touch targets: minimum 44×44px on all interactive elements

---

## 11. Deliverables Expected from Figma

- [ ] Design token library (Figma local styles — colors, text, effects)
- [ ] Full component library with all states and variants
- [ ] Desktop frames (1280px) for all 18 pages/views
- [ ] Tablet frames (768px) for key pages (Dashboard, Appointments, Patients)
- [ ] Mobile frames (375px) for critical flows (Login, Dashboard overview)
- [ ] 3 prototype flows — one per role (Admin, Practitioner, Receptionist)
- [ ] Handoff-ready in Dev Mode (spacing, color, and type annotations)
