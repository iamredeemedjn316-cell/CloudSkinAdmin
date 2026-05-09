import React, { useState } from "react";
import { Search, Plus, Pencil, Eye, Trash2, Bold, Italic, Link, List, X } from "lucide-react";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { StatusBadge } from "../../components/StatusBadge";

const posts = [
  { id: "B001", title: "The Science Behind Hydra Facial: Why Your Skin Needs It", category: "Skin Care", author: "Dr. Maria Santos", publishedDate: "Apr 20, 2026", status: "published", views: 1240, excerpt: "Discover how Hydra Facial technology combines cleansing, exfoliation, and hydration..." },
  { id: "B002", title: "Understanding Botox: Safety, Benefits, and What to Expect", category: "Injectables", author: "Dr. Ana Reyes", publishedDate: "Apr 15, 2026", status: "published", views: 2860, excerpt: "A comprehensive guide to Botox treatment for first-timers and those curious about..." },
  { id: "B003", title: "Summer Skin Care Guide: Protecting and Nourishing Your Skin", category: "Skin Care", author: "Dr. Maria Santos", publishedDate: "—", status: "draft", views: 0, excerpt: "As the temperature rises, your skin care routine needs to adapt to the challenges..." },
  { id: "B004", title: "PRP Hair Therapy: A Natural Approach to Hair Loss Treatment", category: "Hair", author: "Dr. James Lim", publishedDate: "Apr 8, 2026", status: "published", views: 987, excerpt: "Platelet-rich plasma therapy offers a revolutionary natural solution to hair thinning..." },
  { id: "B005", title: "Chemical Peels 101: Types, Benefits, and Recovery", category: "Skin Care", author: "Dr. Ana Reyes", publishedDate: "Apr 1, 2026", status: "published", views: 1560, excerpt: "Not all chemical peels are created equal. Learn about the different types and which..." },
  { id: "B006", title: "IV Drip Wellness: What's Actually in Your Infusion?", category: "Wellness", author: "Dr. James Lim", publishedDate: "—", status: "draft", views: 0, excerpt: "We break down the science behind IV vitamin infusions and what each nutrient does..." },
];

export default function BlogPage() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  const [editorTitle, setEditorTitle] = useState("");

  const filtered = posts.filter((p) => {
    const matchStatus = statusFilter === "All" || p.status === statusFilter.toLowerCase();
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  if (showEditor) {
    return <BlogEditor title={editorTitle} onBack={() => setShowEditor(false)} />;
  }

  return (
    <PageWrapper title="Blog Management" breadcrumb="Admin / Blog">
      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
        {["All", "Published", "Draft"].map((s) => (
          <button key={s} onClick={() => setStatusFilter(s)} style={{ height: "38px", padding: "0 14px", background: statusFilter === s ? "#2D6A9F" : "#FFFFFF", border: `1.5px solid ${statusFilter === s ? "#2D6A9F" : "#D0E8F5"}`, borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 500, color: statusFilter === s ? "#FFFFFF" : "#5A7A96" }}>{s}</button>
        ))}
        <div style={{ position: "relative" }}>
          <Search size={14} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#9BBAD4" }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search posts..." style={{ width: "220px", height: "38px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 12px 0 32px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", outline: "none", background: "#FFFFFF" }} />
        </div>
        <div style={{ marginLeft: "auto" }}>
          <button onClick={() => { setEditorTitle(""); setShowEditor(true); }} style={{ height: "38px", padding: "0 18px", background: "#2D6A9F", border: "none", borderRadius: "8px", color: "#FFFFFF", display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600 }}>
            <Plus size={14} /> New Post
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: "#FFFFFF", borderRadius: "12px", boxShadow: "0 1px 4px rgba(26,58,92,0.08)", overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "900px" }}>
            <thead>
              <tr style={{ background: "#F0F6FC" }}>
                {["Title", "Category", "Author", "Published Date", "Status", "Views", "Actions"].map((h) => (
                  <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "11px", color: "#5A7A96", letterSpacing: "0.06em", textTransform: "uppercase", borderBottom: "1px solid #D0E8F5", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((post) => (
                <tr key={post.id} style={{ borderBottom: "1px solid #D0E8F5" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#F8FBFF")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ maxWidth: "280px" }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "13px", color: "#1A2E40", marginBottom: "4px" }}>{post.title}</div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#9BBAD4", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{post.excerpt}</div>
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{ background: "#EBF6FD", color: "#2D6A9F", fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 500, padding: "2px 10px", borderRadius: "9999px" }}>{post.category}</span>
                  </td>
                  <td style={{ padding: "14px 16px" }}><span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>{post.author}</span></td>
                  <td style={{ padding: "14px 16px" }}><span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>{post.publishedDate}</span></td>
                  <td style={{ padding: "14px 16px" }}><StatusBadge status={post.status as any} /></td>
                  <td style={{ padding: "14px 16px" }}><span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "14px", color: "#1A2E40" }}>{post.views.toLocaleString()}</span></td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <button onClick={() => { setEditorTitle(post.title); setShowEditor(true); }} style={{ width: "28px", height: "28px", background: "#F0F6FC", border: "none", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#5A7A96" }} title="Edit"><Pencil size={13} /></button>
                      <button style={{ width: "28px", height: "28px", background: "#F0F6FC", border: "none", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#2D6A9F" }} title="Preview"><Eye size={13} /></button>
                      <button style={{ width: "28px", height: "28px", background: "#FEF2F2", border: "none", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#DC2626" }} title="Delete"><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageWrapper>
  );
}

function BlogEditor({ title, onBack }: { title: string; onBack: () => void }) {
  const [postTitle, setPostTitle] = useState(title || "");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");

  return (
    <PageWrapper title="Blog Editor" breadcrumb="Admin / Blog / New Post">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "24px", alignItems: "start" }}>
        {/* Editor */}
        <div style={{ background: "#FFFFFF", borderRadius: "12px", boxShadow: "0 1px 4px rgba(26,58,92,0.08)", overflow: "hidden" }}>
          {/* Title */}
          <div style={{ padding: "24px 28px 0" }}>
            <input
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              placeholder="Post title..."
              style={{ width: "100%", border: "none", outline: "none", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "28px", color: "#1A2E40", padding: 0, background: "transparent", boxSizing: "border-box" }}
            />
            <div style={{ marginTop: "8px", marginBottom: "16px" }}>
              <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 500, color: "#5A7A96" }}>Slug: </label>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#9BBAD4" }}>
                {postTitle.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") || "post-title-here"}
              </span>
            </div>
          </div>

          {/* Rich Text Toolbar */}
          <div style={{ padding: "8px 16px", borderTop: "1px solid #F0F6FC", borderBottom: "1px solid #F0F6FC", background: "#F8FBFF", display: "flex", gap: "4px", flexWrap: "wrap" }}>
            {[
              { icon: <Bold size={14} />, label: "Bold" },
              { icon: <Italic size={14} />, label: "Italic" },
              { icon: <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 700 }}>U</span>, label: "Underline" },
            ].map((tool) => (
              <button key={tool.label} style={{ width: "30px", height: "30px", background: "none", border: "1px solid #D0E8F5", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#5A7A96" }} title={tool.label}>
                {tool.icon}
              </button>
            ))}
            <div style={{ width: "1px", height: "30px", background: "#D0E8F5", margin: "0 4px" }} />
            {["H1", "H2", "H3"].map((h) => (
              <button key={h} style={{ height: "30px", padding: "0 8px", background: "none", border: "1px solid #D0E8F5", borderRadius: "6px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 600, color: "#5A7A96" }}>{h}</button>
            ))}
            <div style={{ width: "1px", height: "30px", background: "#D0E8F5", margin: "0 4px" }} />
            {[
              { icon: <List size={14} />, label: "Bullet List" },
              { icon: <Link size={14} />, label: "Insert Link" },
            ].map((tool) => (
              <button key={tool.label} style={{ width: "30px", height: "30px", background: "none", border: "1px solid #D0E8F5", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#5A7A96" }} title={tool.label}>
                {tool.icon}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing your blog post here..."
            style={{ width: "100%", minHeight: "420px", border: "none", outline: "none", padding: "24px 28px", fontFamily: "'Inter', sans-serif", fontSize: "15px", color: "#1A2E40", lineHeight: 1.8, resize: "none", boxSizing: "border-box", background: "transparent" }}
          />
        </div>

        {/* Settings Panel */}
        <div style={{ position: "sticky", top: "92px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ background: "#FFFFFF", borderRadius: "12px", boxShadow: "0 1px 4px rgba(26,58,92,0.08)", overflow: "hidden" }}>
            <div style={{ padding: "14px 16px", borderBottom: "1px solid #D0E8F5" }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "14px", color: "#1A2E40" }}>Post Settings</span>
            </div>
            <div style={{ padding: "16px" }}>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "12px", color: "#5A7A96", marginBottom: "6px" }}>Status</label>
                <div style={{ display: "flex", background: "#F0F6FC", borderRadius: "8px", padding: "3px" }}>
                  {(["draft", "published"] as const).map((s) => (
                    <button key={s} onClick={() => setStatus(s)} style={{ flex: 1, height: "30px", background: status === s ? "#2D6A9F" : "transparent", border: "none", borderRadius: "6px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 500, color: status === s ? "#FFFFFF" : "#5A7A96", textTransform: "capitalize" }}>{s}</button>
                  ))}
                </div>
              </div>

              {[
                { label: "Publish Date", type: "date" },
                { label: "Category", type: "select" },
                { label: "Author Name", type: "text" },
              ].map((f) => (
                <div key={f.label} style={{ marginBottom: "14px" }}>
                  <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "12px", color: "#5A7A96", marginBottom: "6px" }}>{f.label}</label>
                  {f.type === "select" ? (
                    <select style={{ width: "100%", height: "36px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 10px", fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#1A2E40", outline: "none", background: "#FFFFFF", boxSizing: "border-box" }}>
                      {["Skin Care", "Injectables", "Hair", "Wellness", "Laser"].map((c) => <option key={c}>{c}</option>)}
                    </select>
                  ) : (
                    <input type={f.type} style={{ width: "100%", height: "36px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 10px", fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#1A2E40", outline: "none", boxSizing: "border-box" }} />
                  )}
                </div>
              ))}

              {/* Featured Image */}
              <div>
                <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "12px", color: "#5A7A96", marginBottom: "6px" }}>Featured Image</label>
                <div style={{ border: "1.5px dashed #A8CCE8", borderRadius: "8px", padding: "20px", textAlign: "center", cursor: "pointer" }}>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#9BBAD4" }}>Drag & drop or click to upload</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <button onClick={onBack} style={{ height: "38px", background: "none", border: "1.5px solid #D0E8F5", borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 500, color: "#5A7A96" }}>Save Draft</button>
            <button style={{ height: "38px", background: "#2D6A9F", border: "none", borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: "#FFFFFF" }}>Publish Post</button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
