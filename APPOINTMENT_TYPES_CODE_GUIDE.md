# Appointment Types Feature - Code Implementation Guide

## Key Code Changes Summary

### 1. Updated Appointment Interface
```typescript
interface Appointment {
  id: number;
  client: string;
  clientPhone: string;
  clientInitials: string;
  clientColor: string;
  service: string;
  duration: string;
  date: string;
  time: string;
  practitioner: string;
  status: StatusType;
  paymentMethod: StatusType;
  amount: string;
  paymentStatus: StatusType;
  
  // NEW FIELDS:
  type: "online" | "f2f";           // Appointment type
  isExistingClient: boolean;        // Whether this is existing client
  bookedBy?: "admin" | "receptionist" | "patient";  // Who created
}
```

### 2. Added Patient Database for Lookup
```typescript
const existingPatients = [
  { id: "p1", name: "Sarah Johnson", initials: "SJ", color: "#2D6A9F" },
  { id: "p2", name: "Miguel Cruz", initials: "MC", color: "#16A34A" },
  // ... more patients
];
```

### 3. Table Header Updated
```typescript
{["#", "Client", "Service", "Date & Time", "Type", "Practitioner", "Status", "Payment", "Actions"].map((h) => (
  // Added "Type" column header
))}
```

### 4. Type Column Cell Implementation
```typescript
<td style={{ padding: "12px 16px" }}>
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "4px",
      background: apt.type === "f2f" ? "#EFF6FF" : "#F0FDF4",
      color: apt.type === "f2f" ? "#1E40AF" : "#16A34A",
      padding: "4px 10px",
      borderRadius: "6px",
      fontSize: "12px",
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: 500,
    }}
  >
    <span>{apt.type === "f2f" ? "F2F" : "Online"}</span>
    {apt.isExistingClient && (
      <span style={{ fontSize: "10px", opacity: 0.7 }}>
        {apt.type === "f2f" ? "📍" : "💬"}
      </span>
    )}
  </div>
</td>
```

### 5. NewAppointmentModal Component

#### State Management
```typescript
const [appointmentType, setAppointmentType] = useState<"online" | "f2f">("f2f");
const [selectedClient, setSelectedClient] = useState<any>(null);
const [clientSearch, setClientSearch] = useState("");
const [showClientDropdown, setShowClientDropdown] = useState(false);
```

#### Type Selector UI
```typescript
{[
  { value: "f2f" as const, label: "Face-to-Face", icon: "📍" },
  { value: "online" as const, label: "Online", icon: "💻" },
].map((type) => (
  <button
    onClick={() => setAppointmentType(type.value)}
    style={{
      flex: 1,
      height: "44px",
      border: appointmentType === type.value ? "2px solid #2D6A9F" : "1.5px solid #D0E8F5",
      borderRadius: "8px",
      background: appointmentType === type.value ? "#EFF6FF" : "#FFFFFF",
      // ... more styles
    }}
  >
    <span>{type.icon}</span>
    {type.label}
  </button>
))}
```

#### Client Search with Autocomplete
```typescript
<input
  type="text"
  placeholder="Search existing client or enter new name..."
  value={clientSearch}
  onChange={(e) => {
    setClientSearch(e.target.value);
    setShowClientDropdown(true);  // Show dropdown on input
  }}
  onFocus={() => setShowClientDropdown(true)}
/>

{showClientDropdown && clientSearch.length > 0 && (
  <div style={{ /* dropdown styles */ }}>
    {filteredPatients.length > 0 ? (
      filteredPatients.map((patient) => (
        <button
          onClick={() => {
            setSelectedClient(patient);
            setClientSearch(patient.name);
            setShowClientDropdown(false);
          }}
          style={{ /* client item styles */ }}
        >
          {/* Patient avatar + name */}
        </button>
      ))
    ) : (
      <div>No existing clients found. This will be a new client.</div>
    )}
  </div>
)}
```

## Color Palette Reference

### F2F Appointments
- Background: `#EFF6FF` (light blue)
- Text: `#1E40AF` (dark blue)
- Primary: `#2D6A9F` (brand blue)
- Icon: 📍 (location pin)

### Online Appointments
- Background: `#F0FDF4` (light green)
- Text: `#16A34A` (green)
- Primary: `#16A34A` (green)
- Icon: 💬 (chat bubble) or 💻 (computer)

## Component Structure

```
AppointmentsPage
├── Tab Navigation (List/Calendar)
├── Toolbar (Search, Filter, Export, New Appointment)
├── Appointments Table
│   ├── Table Headers (including "Type")
│   └── Table Rows
│       ├── Client Avatar
│       ├── Service
│       ├── Date & Time
│       ├── Type Badge (NEW)
│       ├── Status
│       └── Payment
├── Pagination
└── NewAppointmentModal (ENHANCED)
    ├── Appointment Type Selector (NEW)
    ├── Client Search with Autocomplete (ENHANCED)
    ├── Service Field
    ├── Practitioner Field
    ├── Date & Time Fields
    ├── Notes Field
    └── Action Buttons
```

## Integration Points

### Currently Mock Data (Ready for Backend)
1. **Appointments List**: Replace `const appointments` array with API call
2. **Patient Lookup**: Replace `existingPatients` with API search
3. **Create Appointment**: Wire "Book Appointment" button to POST endpoint
4. **Status Updates**: Add appointment status change handlers

### Example Backend Integration
```typescript
// Fetch appointments
const response = await fetch('/api/appointments');
const appointmentData = await response.json();
setAppointments(appointmentData);

// Search patients
const patients = await fetch(`/api/patients/search?q=${query}`);

// Create appointment
await fetch('/api/appointments', {
  method: 'POST',
  body: JSON.stringify({
    type: appointmentType,
    client: selectedClient?.name || clientSearch,
    isExistingClient: !!selectedClient,
    // ... other fields
  })
});
```

## Styling Approach

- **Inline Styles**: All styling is inline for simplicity and portability
- **Responsive**: Uses flexbox and standard CSS properties
- **Color System**: Uses predefined color palette from design system
- **Typography**: DM Sans for labels/headers, Inter for body text
- **Spacing**: Consistent 8px, 12px, 16px, 20px, 24px scale

## State Management Notes

The component uses React `useState` for local state. For production:
- Consider moving to global state management (Context, Redux, Zustand)
- Persist modal state and form data across sessions
- Implement proper form validation and error handling
- Add loading states during API calls
