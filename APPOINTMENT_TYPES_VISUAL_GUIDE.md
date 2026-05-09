# Appointment Types Feature - Visual Guide

## Dashboard Table with Type Column

The appointments table now displays appointment types in a dedicated column between "Date & Time" and "Practitioner":

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ # │ Client         │ Service  │ Date & Time    │ Type   │ Practitioner │ ... │
├─────────────────────────────────────────────────────────────────────────────┤
│ 1 │ Sarah Johnson  │ Hydra    │ Apr 25, 10 AM  │ 📍F2F  │ Dr. Santos   │ ... │
│   │ 0917-123-4567  │ Facial   │                │        │              │     │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2 │ Miguel Cruz    │ Botox    │ Apr 25, 11 AM  │ 📍F2F  │ Dr. Reyes    │ ... │
│   │ 0918-234-5678  │ Treatment│                │        │              │     │
├─────────────────────────────────────────────────────────────────────────────┤
│ 3 │ Camille Torres │ Chemical │ Apr 25, 1 PM   │ 💬 ONL │ Dr. Santos   │ ... │
│   │ 0919-345-6789  │ Peel     │                │        │              │     │
├─────────────────────────────────────────────────────────────────────────────┤
│ 4 │ Jose Dela Cruz │ PRP      │ Apr 25, 2:30 PM│ 📍F2F  │ Dr. Lim      │ ... │
│   │ 0920-456-7890  │ Therapy  │                │        │              │     │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Type Column Styling

**F2F (Face-to-Face) Badge:**
```
┌─────────┐
│ 📍 F2F  │  ← Blue background (#EFF6FF)
└─────────┘  ← Blue text (#1E40AF)
   Font: DM Sans, 12px, Weight 500
```

**Online Badge:**
```
┌────────────┐
│ 💬 Online  │  ← Green background (#F0FDF4)
└────────────┘  ← Green text (#16A34A)
   Font: DM Sans, 12px, Weight 500
```

## New Appointment Modal Layout

### Step 1: Type Selection

```
┌────────────────────────────────────────────────────────────┐
│  New Appointment                                        [X] │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  Appointment Type                                           │
│  ┌─────────────────────┬──────────────────────────────┐   │
│  │  📍 Face-to-Face    │   💻 Online                  │   │
│  │  (SELECTED)         │                              │   │
│  │  Blue Background    │   Light border               │   │
│  └─────────────────────┴──────────────────────────────┘   │
│                                                             │
│  Client (Existing Client)                                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Search existing client or enter new name...      [▼]│   │
│  └─────────────────────────────────────────────────────┘   │
│     When focused, shows dropdown with matching patients     │
│                                                             │
│     ┌─────────────────────────────────────────────────┐   │
│     │ SJ Sarah Johnson                    (Existing)   │   │
│     │ MC Miguel Cruz                      (Existing)   │   │
│     │ JD Jose Dela Cruz                   (Existing)   │   │
│     └─────────────────────────────────────────────────┘   │
│                                                             │
├────────────────────────────────────────────────────────────┤
│  [Cancel]                              [Book Appointment]  │
└────────────────────────────────────────────────────────────┘
```

### Step 2: Client Search Active

When user types in the client field:

```
Search: "Miguel"
         ▼
┌─────────────────────────────────────────────────────┐
│ Search existing client or enter new name...       │
│ Miguel                                          [X]│
└─────────────────────────────────────────────────────┘
         ↓ (Dropdown appears)
┌─────────────────────────────────────────────────────┐
│ MC  Miguel Cruz                                     │
└─────────────────────────────────────────────────────┘

Click to select Miguel Cruz
         ↓
Field updates with selected patient + green background
┌─────────────────────────────────────────────────────┐
│ Miguel Cruz          ✓ (Existing Client)            │
└─────────────────────────────────────────────────────┘
   Light green background (#F0FDF4)
```

### Step 3: Complete Form

```
┌────────────────────────────────────────────────────────┐
│  New Appointment                                    [X] │
├────────────────────────────────────────────────────────┤
│                                                         │
│  Appointment Type                                       │
│  ┌──────────────────────┬──────────────────────────┐   │
│  │  📍 Face-to-Face     │   💻 Online              │   │
│  │  (Selected - Blue)   │                          │   │
│  └──────────────────────┴──────────────────────────┘   │
│                                                         │
│  Client (Existing Client)                              │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Miguel Cruz         ✓                            │  │
│  │ (Green background - existing client)             │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  Service                                                │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Select service...                                │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  Practitioner                                           │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Select practitioner...                           │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  Date                                                   │
│  ┌──────────────────────────────────────────────────┐  │
│  │ 2026-04-25                                       │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  Time                                                   │
│  ┌──────────────────────────────────────────────────┐  │
│  │ 14:30                                            │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  Notes                                                  │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Patient requested morning slot if possible       │  │
│  │                                                  │  │
│  │                                                  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
├────────────────────────────────────────────────────────┤
│  [Cancel]                        [Book Appointment]    │
└────────────────────────────────────────────────────────┘
```

## Color Reference Guide

### Appointment Type Badges

#### F2F (Face-to-Face)
```
Badge Color:    #EFF6FF (Light Blue)
Text Color:     #1E40AF (Dark Blue)
Border Color:   #2D6A9F (Primary Blue) - when selected
Icon:           📍 (Location Pin)
Label:          "F2F"
```

Visual Example:
```
┌───────────┐
│ 📍 F2F    │  Blue background, blue text
└───────────┘
```

#### Online
```
Badge Color:    #F0FDF4 (Light Green)
Text Color:     #16A34A (Green)
Border Color:   #16A34A (Green) - when selected
Icon:           💬 (Chat Bubble)
Label:          "Online"
```

Visual Example:
```
┌──────────────┐
│ 💬 Online    │  Green background, green text
└──────────────┘
```

### Type Selector Buttons

**Inactive State:**
```
┌─────────────────────┐
│  📍 Face-to-Face    │  Border: #D0E8F5 (light gray)
│                     │  Background: #FFFFFF (white)
│                     │  Text: #5A7A96 (medium gray)
└─────────────────────┘
```

**Active State:**
```
┌─────────────────────┐
│  📍 Face-to-Face    │  Border: #2D6A9F (blue) 2px
│  (SELECTED)         │  Background: #EFF6FF (light blue)
│                     │  Text: #2D6A9F (blue) Bold
└─────────────────────┘
```

### Client Search Field

**Default State:**
```
┌──────────────────────────────────────┐
│ Search existing client or enter...   │  Background: #FFFFFF
│                                      │  Border: #D0E8F5
└──────────────────────────────────────┘
```

**With Existing Client Selected:**
```
┌──────────────────────────────────────┐
│ Miguel Cruz                    ✓      │  Background: #F0FDF4 (green)
│                                      │  Border: #D0E8F5
└──────────────────────────────────────┘
   (Indicates existing client is selected)
```

**Dropdown Open:**
```
┌──────────────────────────────────────┐
│ Miguel                                │
└──────────────────────────────────────┘
↓
┌──────────────────────────────────────┐
│ MC  Miguel Cruz                       │  Hover: #F8FBFF
├──────────────────────────────────────┤
│ MT  Maria Torres                      │  Border: #D0E8F5
├──────────────────────────────────────┤
│ PA  Patricia Anderson                 │
└──────────────────────────────────────┘
```

## Sample Data Visualization

### Appointment Type Distribution

```
Total Appointments: 12

F2F Appointments (7 - 58%):
  1001: Sarah Johnson        - Booked by: Receptionist ✓ Existing
  1002: Miguel Cruz          - Booked by: Admin ✓ Existing
  1004: Jose Dela Cruz       - Booked by: Admin ✓ Existing
  1006: Roberto Tan          - Booked by: Receptionist ✓ Existing
  1007: Lisa Gomez           - Booked by: Admin ✓ Existing
  1009: Diana Reyes          - Booked by: Admin ✓ Existing
  1010: Marco Villanueva     - Booked by: Receptionist ✓ Existing

Online Appointments (5 - 42%):
  1003: Camille Torres       - Booked by: Patient ✗ New
  1005: Angela Park          - Booked by: Patient ✓ Existing
  1008: Kevin Bautista       - Booked by: Patient ✗ New
  1012: Antonio Garcia       - Booked by: Patient ✗ New
```

### Patient Lookup Database

The modal has access to 9 existing patients:

```
ID  │ Name              │ Initials │ Color
────┼──────────────────┼──────────┼──────────
p1  │ Sarah Johnson    │ SJ       │ #2D6A9F
p2  │ Miguel Cruz      │ MC       │ #16A34A
p3  │ Jose Dela Cruz   │ JD       │ #EA580C
p4  │ Angela Park      │ AP       │ #0891B2
p5  │ Roberto Tan      │ RT       │ #B45309
p6  │ Lisa Gomez       │ LG       │ #9D174D
p7  │ Diana Reyes      │ DR       │ #6B21A8
p8  │ Marco Villanueva │ MV       │ #0C4A6E
p9  │ Patricia Santos  │ PS       │ #14532D
```

## Responsive Behavior

### Desktop (1200px+)
- Type badges display side-by-side with text and icon
- Full modal width: 540px
- Client dropdown shows below input field
- All fields visible and properly spaced

### Tablet (768px - 1199px)
- Type selector buttons remain 50% width each
- Modal adapts to screen width
- Client dropdown still appears below field
- Proper touch target sizing (44px minimum)

### Mobile (< 768px)
- Modal takes up 90% screen width with 16px margins
- Type buttons remain full-width toggles
- Client dropdown scrollable if needed
- Single column layout maintained

## Interaction States

### Type Selector Button
```
Normal:      Gray border, white bg, gray text
Hover:       Gray border, light gray bg
Active:      Blue border, light blue bg, blue text Bold
```

### Client Dropdown Item
```
Normal:      White bg
Hover:       Light blue bg (#F8FBFF)
Selected:    Form field bg changes to light green
```

### Form Fields
```
Default:     Gray border #D0E8F5, white bg
Focused:     Same (no outline, relies on border)
Filled:      Gray border #D0E8F5, white bg
With Client: Gray border #D0E8F5, light green bg
Error:       Red border (not yet implemented)
```

## Typography Details

### Labels
```
Font Family:  DM Sans
Font Size:    13px
Font Weight:  500
Color:        #1A2E40 (dark)
Line Height:  1.5
Margin:       6px below label
```

### Badges
```
Font Family:  DM Sans
Font Size:    12px
Font Weight:  500
Color:        Varies (blue or green)
Padding:      4px 10px
```

### Placeholder Text
```
Font Family:  Inter
Font Size:    13px
Color:        #9BBAD4 (light blue-gray)
Font Weight:  400
```

### Form Input
```
Font Family:  Inter
Font Size:    13px
Color:        #1A2E40 (dark) - text
Color:        #9BBAD4 (light) - placeholder
Font Weight:  400
Height:       40px
Padding:      0 12px
```

This visual guide provides a complete picture of how the appointment types feature appears and behaves across the interface.
