import React, { useState } from "react";
import { Search, Mail, MailOpen, Trash2, Reply, X, Clock } from "lucide-react";
import { PageWrapper } from "../../components/layout/PageWrapper";

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

const initialMessages: Message[] = [
  { id: "1", name: "Maria Santos", email: "maria.santos@email.com", phone: "+63 917 123 4567", subject: "Inquiry about Laser Treatment", message: "Hi, I would like to know more about your laser treatment services. What are the available options and their prices? Also, is there any downtime after the procedure?", date: "2025-04-28 10:30 AM", read: false },
  { id: "2", name: "Juan Dela Cruz", email: "juan.delacruz@email.com", phone: "+63 918 234 5678", subject: "Booking Question", message: "Good day! I tried to book an appointment online but I'm having trouble selecting a date. Can you help me schedule a consultation for next week?", date: "2025-04-28 09:15 AM", read: false },
  { id: "3", name: "Ana Reyes", email: "ana.reyes@email.com", phone: "+63 919 345 6789", subject: "Package Pricing", message: "Hello! I'm interested in your Anti-Aging Package. Can you provide more details about what's included and if there are any ongoing promotions?", date: "2025-04-27 04:45 PM", read: true },
  { id: "4", name: "Carlos Garcia", email: "carlos.garcia@email.com", phone: "+63 920 456 7890", subject: "Follow-up Appointment", message: "I had a facial treatment last month and I'd like to schedule a follow-up. When would be the best time to come back?", date: "2025-04-27 02:20 PM", read: true },
  { id: "5", name: "Sofia Cruz", email: "sofia.cruz@email.com", phone: "+63 921 567 8901", subject: "Gift Certificate", message: "I want to purchase a gift certificate for my mother's birthday. Do you offer gift cards and how can I avail one?", date: "2025-04-26 11:00 AM", read: true },
];

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyText, setReplyText] = useState("");

  const filtered = messages.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || (filter === "unread" && !m.read) || (filter === "read" && m.read);
    return matchSearch && matchFilter;
  });

  const unreadCount = messages.filter(m => !m.read).length;

  const handleSelectMessage = (msg: Message) => {
    setSelectedMessage(msg);
    if (!msg.read) {
      setMessages(messages.map(m => m.id === msg.id ? { ...m, read: true } : m));
    }
  };

  const handleDelete = (id: string) => {
    setMessages(messages.filter(m => m.id !== id));
    if (selectedMessage?.id === id) setSelectedMessage(null);
  };

  const handleReply = () => {
    // In a real app, this would send the reply
    console.log("Replying to:", selectedMessage?.email, "Message:", replyText);
    setShowReplyModal(false);
    setReplyText("");
  };

  return (
    <PageWrapper title="Messages" breadcrumb="Admin / Messages">
      <div style={{ display: "flex", gap: "24px", height: "calc(100vh - 200px)", minHeight: "500px" }}>
        {/* Message List */}
        <div style={{ width: "400px", background: "#FFFFFF", borderRadius: "12px", boxShadow: "0 1px 4px rgba(26,58,92,0.08)", display: "flex", flexDirection: "column" }}>
          {/* Search and Filter */}
          <div style={{ padding: "16px", borderBottom: "1px solid #D0E8F5" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "#F8FBFF", borderRadius: "8px", padding: "8px 12px", marginBottom: "12px" }}>
              <Search size={16} color="#5A7A96" />
              <input
                type="text"
                placeholder="Search messages..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ flex: 1, border: "none", background: "none", outline: "none", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40" }}
              />
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              {(["all", "unread", "read"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{ flex: 1, padding: "6px 12px", background: filter === f ? "#2D6A9F" : "#F0F6FC", border: "none", borderRadius: "6px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 500, color: filter === f ? "#FFFFFF" : "#5A7A96" }}
                >
                  {f === "all" ? "All" : f === "unread" ? `Unread (${unreadCount})` : "Read"}
                </button>
              ))}
            </div>
          </div>

          {/* Message Items */}
          <div style={{ flex: 1, overflowY: "auto" }}>
            {filtered.map((msg) => (
              <div
                key={msg.id}
                onClick={() => handleSelectMessage(msg)}
                style={{ padding: "14px 16px", borderBottom: "1px solid #F0F6FC", cursor: "pointer", background: selectedMessage?.id === msg.id ? "#F0F6FC" : msg.read ? "#FFFFFF" : "#F8FBFF" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                  {msg.read ? <MailOpen size={14} color="#5A7A96" /> : <Mail size={14} color="#2D6A9F" />}
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: msg.read ? 400 : 600, fontSize: "14px", color: "#1A2E40", flex: 1 }}>{msg.name}</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#5A7A96" }}>{msg.date.split(" ")[0]}</span>
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: msg.read ? 400 : 600, fontSize: "13px", color: "#1A2E40", marginBottom: "4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{msg.subject}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{msg.message}</div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div style={{ padding: "40px 20px", textAlign: "center", color: "#5A7A96", fontFamily: "'Inter', sans-serif", fontSize: "13px" }}>No messages found</div>
            )}
          </div>
        </div>

        {/* Message Detail */}
        <div style={{ flex: 1, background: "#FFFFFF", borderRadius: "12px", boxShadow: "0 1px 4px rgba(26,58,92,0.08)", display: "flex", flexDirection: "column" }}>
          {selectedMessage ? (
            <>
              <div style={{ padding: "20px", borderBottom: "1px solid #D0E8F5" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                  <div>
                    <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "18px", color: "#1A2E40", marginBottom: "4px" }}>{selectedMessage.subject}</h2>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#5A7A96", fontFamily: "'Inter', sans-serif", fontSize: "12px" }}>
                      <Clock size={12} />
                      {selectedMessage.date}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button onClick={() => setShowReplyModal(true)} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", background: "#2D6A9F", border: "none", borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#FFFFFF" }}>
                      <Reply size={14} /> Reply
                    </button>
                    <button onClick={() => handleDelete(selectedMessage.id)} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", background: "#FEE2E2", border: "none", borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#DC2626" }}>
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", padding: "12px 16px", background: "#F8FBFF", borderRadius: "8px" }}>
                  <div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#5A7A96", marginBottom: "2px" }}>From</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "14px", color: "#1A2E40" }}>{selectedMessage.name}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#5A7A96", marginBottom: "2px" }}>Email</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#2D6A9F" }}>{selectedMessage.email}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#5A7A96", marginBottom: "2px" }}>Phone</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#1A2E40" }}>{selectedMessage.phone}</div>
                  </div>
                </div>
              </div>
              <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", lineHeight: 1.7, color: "#1A2E40" }}>{selectedMessage.message}</p>
              </div>
            </>
          ) : (
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", color: "#5A7A96" }}>
              <Mail size={48} strokeWidth={1} />
              <p style={{ marginTop: "12px", fontFamily: "'Inter', sans-serif", fontSize: "14px" }}>Select a message to view</p>
            </div>
          )}
        </div>
      </div>

      {/* Reply Modal */}
      {showReplyModal && selectedMessage && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(26,58,92,0.25)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "#FFFFFF", borderRadius: "16px", width: "100%", maxWidth: "500px", boxShadow: "0 8px 32px rgba(26,58,92,0.18)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: "1px solid #D0E8F5" }}>
              <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "18px", color: "#1A2E40" }}>Reply to {selectedMessage.name}</h3>
              <button onClick={() => setShowReplyModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#5A7A96" }}><X size={20} /></button>
            </div>
            <div style={{ padding: "20px 24px" }}>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "6px" }}>To: {selectedMessage.email}</label>
              </div>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "6px" }}>Message</label>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows={6}
                  style={{ width: "100%", padding: "12px", border: "1.5px solid #D0E8F5", borderRadius: "8px", fontFamily: "'Inter', sans-serif", fontSize: "14px", resize: "none", outline: "none" }}
                  placeholder="Type your reply..."
                />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", padding: "16px 24px", borderTop: "1px solid #D0E8F5" }}>
              <button onClick={() => setShowReplyModal(false)} style={{ padding: "10px 20px", background: "#F0F6FC", border: "none", borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: "#5A7A96" }}>Cancel</button>
              <button onClick={handleReply} style={{ padding: "10px 20px", background: "#2D6A9F", border: "none", borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: "#FFFFFF" }}>Send Reply</button>
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
