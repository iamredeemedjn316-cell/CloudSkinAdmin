# Patient Management Feature - Visual Guide

## Action Menu Dropdown

### Closed State (Default)
```
Patient Row: Sarah Johnson | 0917-123-4567 | Apr 5, 1990 | ...
                                                          [👁] [✏️] [⋮]
```

### Open State
```
Patient Row: Sarah Johnson | 0917-123-4567 | Apr 5, 1990 | ...
                                           ┌────────────────┐
                                           │ Toggle Status  │
                                           │ Archive        │
                                           │ Delete         │  (Red text)
                                           └────────────────┘
```

**Colors**:
- Container: White background with light border
- Toggle Status: #5A7A96 (Gray)
- Archive: #F97316 (Orange)
- Delete: #EF4444 (Red)
- Hover: #F8FBFF (Light blue background)

---

## Edit Patient Modal

### Layout
```
┌──────────────────────────────────────────┐
│ Edit Patient Profile               [×]   │
├──────────────────────────────────────────┤
│                                          │
│ Full Name                                │
│ ┌────────────────────────────────────┐   │
│ │ Sarah Johnson                      │   │
│ └────────────────────────────────────┘   │
│                                          │
│ Phone Number                             │
│ ┌────────────────────────────────────┐   │
│ │ 0917-123-4567                      │   │
│ └────────────────────────────────────┘   │
│                                          │
│ Email Address                            │
│ ┌────────────────────────────────────┐   │
│ │ sarah.j@email.com                  │   │
│ └────────────────────────────────────┘   │
│                                          │
│ Date of Birth                            │
│ ┌────────────────────────────────────┐   │
│ │ Apr 5, 1990                        │   │
│ └────────────────────────────────────┘   │
│                                          │
│ Address                                  │
│ ┌────────────────────────────────────┐   │
│ │ 12 Mango Street, BGC, Taguig       │   │
│ └────────────────────────────────────┘   │
│                                          │
├──────────────────────────────────────────┤
│                    [Cancel]  [Save Changes] │
└──────────────────────────────────────────┘
```

### Styling Details
- **Modal Width**: 480px max-width (responsive)
- **Border Radius**: 16px
- **Shadow**: 0 8px 32px rgba(26,58,92,0.18)
- **Backdrop**: Blur effect with semi-transparent overlay
- **Z-Index**: 100

### Input Fields
- **Height**: 40px
- **Border**: 1.5px solid #D0E8F5
- **Border Radius**: 8px
- **Padding**: 0 12px
- **Font**: Inter, 13px
- **Focus**: outline: none (border remains)

### Buttons
- **Height**: 38px
- **Padding**: 0 20px
- **Cancel Button**: 
  - Border: 1.5px solid #D0E8F5
  - Color: #5A7A96
- **Save Button**: 
  - Background: #2D6A9F
  - Color: White
  - Font Weight: 600

---

## Confirmation Modals

### Toggle Status Confirmation

```
┌─────────────────────────────────────────┐
│                                         │
│              🔄                         │
│                                         │
│  Toggle Patient Status?                 │
│                                         │
│  The patient status will be changed to  │
│  inactive.                              │
│                                         │
├─────────────────────────────────────────┤
│              [Cancel]  [Toggle Status]  │
└─────────────────────────────────────────┘
```

**Styling**:
- Icon Background: #EFF6FF (Light Blue)
- Title Color: #1A2E40 (Dark)
- Description Color: #5A7A96 (Medium)
- Button Background: #2D6A9F (Blue)

---

### Archive Confirmation

```
┌─────────────────────────────────────────┐
│                                         │
│              📦                         │
│                                         │
│  Archive Patient?                       │
│                                         │
│  The patient will be archived and       │
│  hidden from the main list. You can     │
│  restore them later.                    │
│                                         │
├─────────────────────────────────────────┤
│              [Cancel]  [Archive]        │
└─────────────────────────────────────────┘
```

**Styling**:
- Icon Background: #FEF3C7 (Light Yellow)
- Title Color: #1A2E40 (Dark)
- Description Color: #5A7A96 (Medium)
- Button Background: #F97316 (Orange)

---

### Delete Confirmation

```
┌─────────────────────────────────────────┐
│                                         │
│              ⚠️                         │
│                                         │
│  Delete Patient?                        │
│                                         │
│  This action cannot be undone. The      │
│  patient record will be permanently     │
│  removed from the system.               │
│                                         │
├─────────────────────────────────────────┤
│              [Cancel]  [Delete]         │
└─────────────────────────────────────────┘
```

**Styling**:
- Icon Background: #FEE2E2 (Light Red)
- Title Color: #1A2E40 (Dark)
- Description Color: #5A7A96 (Medium)
- Button Background: #EF4444 (Red)

---

### Confirmation Modal Layout
- **Width**: 420px max-width
- **Border Radius**: 16px
- **Shadow**: 0 8px 32px rgba(26,58,92,0.18)
- **Z-Index**: 110 (above other modals)
- **Text Align**: Center

### Icon Styling
- **Size**: 56px circle
- **Font Size**: 28px
- **Emoji Used**: 🔄, 📦, ⚠️

### Modal Buttons
- **Cancel**: Light border, gray text
- **Action**: Colored background matching action type
  - Toggle: Blue
  - Archive: Orange
  - Delete: Red

---

## Confirmation Modal Details

### Action Types & Colors

```
Toggle Status
├─ Icon: 🔄
├─ Background Color: #EFF6FF
├─ Button Color: #2D6A9F (Blue)
└─ Message: "The patient status will be changed to [new status]"

Archive
├─ Icon: 📦
├─ Background Color: #FEF3C7
├─ Button Color: #F97316 (Orange)
└─ Message: "The patient will be archived and hidden from the main list..."

Delete
├─ Icon: ⚠️
├─ Background Color: #FEE2E2
├─ Button Color: #EF4444 (Red)
└─ Message: "This action cannot be undone. The patient record..."
```

---

## Patient Table with Actions

### Before Action Menu Opened
```
┌─────────────────────────────────────────────────────────────────┐
│ Patient    │ Phone      │ DOB         │ ... │ Status   │ Actions │
├─────────────────────────────────────────────────────────────────┤
│ SJ           │                  │         │ ... │ Active   │ 👁 ✏️ ⋮ │
│ Sarah J.     │ 0917-123- │ Apr 5, 90   │ ... │          │         │
├─────────────────────────────────────────────────────────────────┤
│ MC           │                  │         │ ... │ Active   │ 👁 ✏️ ⋮ │
│ Miguel C.    │ 0918-234- │ Jul 12, 88  │ ... │          │         │
└─────────────────────────────────────────────────────────────────┘
```

### After Clicking More (⋮) Menu
```
┌─────────────────────────────────────────────────────────────────┐
│ Patient    │ Phone      │ DOB         │ ... │ Status   │ Actions │
├─────────────────────────────────────────────────────────────────┤
│ SJ           │                  │         │ ... │ Active   │ 👁 ✏️ ⋮│
│ Sarah J.     │ 0917-123- │ Apr 5, 90   │ ... │          │    ├─ Toggle Status
│              │                  │         │ ... │          │    ├─ Archive
│              │                  │         │ ... │          │    └─ Delete
├─────────────────────────────────────────────────────────────────┤
│ MC           │                  │         │ ... │ Active   │ 👁 ✏️ ⋮ │
│ Miguel C.    │ 0918-234- │ Jul 12, 88  │ ... │          │         │
└─────────────────────────────────────────────────────────────────┘
```

---

## User Flow Diagram

### Edit Patient Flow
```
Patient List
    │
    ├─ [✏️ Click Edit]
    │
    ▼
Edit Patient Modal Opens
    │
    ├─ [Edit Fields]
    ├─ Name, Phone, Email, DOB, Address
    │
    └─ [Save Changes] ──────┐
       or [Cancel] ────────┐│
                           ││
                          ▼▼
                    Patient List
                    (Updated or Same)
```

### Toggle Status Flow
```
Patient List
    │
    ├─ [⋮ Click More]
    │
    ▼
Action Menu Opens
    │
    ├─ [Toggle Status]
    │
    ▼
Confirmation Modal
    │
    ├─ [Toggle Status] ────┐
    │                      │
    └─ [Cancel] ──────────┐│
                          ││
                         ▼▼
                    Patient List
                    Status Changed
```

### Archive Patient Flow
```
Patient List
    │
    ├─ [⋮ Click More]
    │
    ▼
Action Menu Opens
    │
    ├─ [Archive]
    │
    ▼
Confirmation Modal (Orange)
    │
    ├─ [Archive] ──────────┐
    │                      │
    └─ [Cancel] ──────────┐│
                          ││
                         ▼▼
                    Patient List
                    (Patient Hidden)
```

### Delete Patient Flow
```
Patient List
    │
    ├─ [⋮ Click More]
    │
    ▼
Action Menu Opens
    │
    ├─ [Delete]  (Red text)
    │
    ▼
Confirmation Modal (Red)
    │
    ├─ [Delete] ──────────┐
    │                     │
    └─ [Cancel] ────────┐ │
                        │ │
                       ▼▼
                   Patient List
                   (Patient Deleted)
```

---

## Responsive Design

### Desktop (>1024px)
- Modal width: 480px
- Full table visible
- All columns visible
- Action menu positioned relative to button

### Tablet (768px-1024px)
- Modal width: 90% of viewport
- Table may scroll horizontally
- Action menu adjusts position

### Mobile (<768px)
- Modal width: 95% of viewport
- Table scrolls horizontally
- Action menu may convert to fullscreen on small screens

---

## Color Palette Reference

```
Primary Brand
├─ #2D6A9F (Blue) - Main buttons, edit modal
│
Secondary Actions
├─ #5A7A96 (Gray) - Default text, toggle status
├─ #F97316 (Orange) - Archive action
└─ #EF4444 (Red) - Delete action

Backgrounds
├─ #FFFFFF (White) - Modals, inputs
├─ #F0F6FC (Light Blue) - Hover states
├─ #FEF3C7 (Light Yellow) - Archive confirmation bg
└─ #FEE2E2 (Light Red) - Delete confirmation bg

Text
├─ #1A2E40 (Dark) - Headings, labels
├─ #5A7A96 (Medium) - Body text
└─ #9BBAD4 (Light) - Placeholder text

Borders
└─ #D0E8F5 (Soft Blue) - All borders
```

---

## Typography Specifications

### Modal Headers
- Font: DM Sans
- Weight: 600
- Size: 16px
- Color: #1A2E40

### Field Labels
- Font: DM Sans
- Weight: 500
- Size: 13px
- Color: #1A2E40

### Input Text
- Font: Inter
- Size: 13px
- Color: #1A2E40
- Placeholder: #9BBAD4

### Button Text
- Font: DM Sans
- Weight: 600
- Size: 14px
- Color: Depends on button type

### Confirmation Modal Title
- Font: DM Sans
- Weight: 600
- Size: 18px
- Color: #1A2E40

### Confirmation Modal Description
- Font: Inter
- Size: 13px
- Color: #5A7A96
- Line Height: 1.5

---

## Interaction States

### Button States
```
Default: Background #2D6A9F, Color White
Hover:   Background #1E5A8F (darker), Color White
Active:  Same as hover
Disabled: Background #D0E8F5, Color #9BBAD4
```

### Input States
```
Default: Border #D0E8F5, Background White
Focus:   Border #2D6A9F (same color), Background White
Error:   Border #EF4444, Background #FEE2E2
Filled:  Border #D0E8F5, Background White
```

### Menu Item States
```
Default: Color varies by action, No background
Hover:   Background #F8FBFF
Active:  Same as hover (while open)
```

---

## Accessibility Features

- All buttons have hover states
- Modals have semantic structure
- Text descriptions for confirmation actions
- Icons paired with text (not text-only)
- High contrast colors (WCAG AA compliant)
- Focus management in modals
- Escape key closes modals (when implemented)
- Clear error messages and confirmations

---

**Last Updated**: April 2026
**Version**: 1.0
