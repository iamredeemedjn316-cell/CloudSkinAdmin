import React, { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";

interface PurchaseOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (order: any) => void;
  suppliers: any[];
}

export default function PurchaseOrderModal({ isOpen, onClose, onSave, suppliers }: PurchaseOrderModalProps) {
  const [supplier, setSupplier] = useState("");
  const [items, setItems] = useState<any[]>([]);
  const [newItem, setNewItem] = useState({ itemName: "", quantity: "", purchasePrice: "", sku: "" });

  const handleAddItem = () => {
    if (!newItem.itemName || !newItem.quantity || !newItem.purchasePrice) {
      alert("Please fill in all item details");
      return;
    }
    setItems([...items, { ...newItem, id: Date.now() }]);
    setNewItem({ itemName: "", quantity: "", purchasePrice: "", sku: "" });
  };

  const handleRemoveItem = (id: number) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const totalCost = items.reduce((sum, item) => sum + parseFloat(item.quantity) * parseFloat(item.purchasePrice), 0);

  const handleSave = () => {
    if (!supplier || items.length === 0) {
      alert("Please select supplier and add items");
      return;
    }

    const po = {
      id: `PO-${Date.now()}`,
      supplier,
      items,
      totalCost,
      status: "Pending",
      createdDate: new Date().toISOString(),
    };

    onSave(po);
    setSupplier("");
    setItems([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <div style={{ background: "#FFFFFF", borderRadius: "12px", width: "90%", maxWidth: "700px", maxHeight: "90vh", overflow: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: "1px solid #D0E8F5", position: "sticky", top: 0, background: "#FFFFFF" }}>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", fontWeight: 600, color: "#1A2E40", margin: 0 }}>
            Create Purchase Order
          </h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#5A7A96" }}>
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Supplier Selection */}
          <div>
            <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#1A2E40", marginBottom: "6px" }}>
              Select Supplier *
            </label>
            <select
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              style={{
                width: "100%",
                height: "40px",
                padding: "0 12px",
                border: "1.5px solid #D0E8F5",
                borderRadius: "8px",
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                color: "#1A2E40",
                background: "#FFFFFF",
                cursor: "pointer",
                outline: "none",
                boxSizing: "border-box",
              }}
            >
              <option value="">-- Choose Supplier --</option>
              {suppliers.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Items Section */}
          <div>
            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#1A2E40", marginBottom: "12px" }}>
              Add Items
            </h3>

            {/* Item Input */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr auto", gap: "12px", marginBottom: "16px", alignItems: "end" }}>
              <div>
                <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#5A7A96", marginBottom: "4px", fontWeight: 500 }}>
                  Item Name / SKU
                </label>
                <input
                  type="text"
                  placeholder="e.g. Botox"
                  value={newItem.itemName}
                  onChange={(e) => setNewItem({ ...newItem, itemName: e.target.value })}
                  style={{ width: "100%", height: "36px", padding: "0 10px", border: "1px solid #D0E8F5", borderRadius: "6px", fontFamily: "'Inter', sans-serif", fontSize: "12px", outline: "none" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#5A7A96", marginBottom: "4px", fontWeight: 500 }}>
                  Qty
                </label>
                <input
                  type="number"
                  placeholder="5"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                  style={{ width: "100%", height: "36px", padding: "0 10px", border: "1px solid #D0E8F5", borderRadius: "6px", fontFamily: "'Inter', sans-serif", fontSize: "12px", outline: "none" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#5A7A96", marginBottom: "4px", fontWeight: 500 }}>
                  Cost/Unit
                </label>
                <input
                  type="number"
                  placeholder="100"
                  value={newItem.purchasePrice}
                  onChange={(e) => setNewItem({ ...newItem, purchasePrice: e.target.value })}
                  style={{ width: "100%", height: "36px", padding: "0 10px", border: "1px solid #D0E8F5", borderRadius: "6px", fontFamily: "'Inter', sans-serif", fontSize: "12px", outline: "none" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#5A7A96", marginBottom: "4px", fontWeight: 500 }}>
                  Total
                </label>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#1A2E40", padding: "8px 10px" }}>
                  ₱{newItem.quantity && newItem.purchasePrice ? (parseInt(newItem.quantity) * parseFloat(newItem.purchasePrice)).toLocaleString() : "0"}
                </div>
              </div>
              <button
                onClick={handleAddItem}
                style={{ height: "36px", width: "36px", background: "#2D6A9F", border: "none", borderRadius: "6px", color: "#FFFFFF", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <Plus size={14} />
              </button>
            </div>

            {/* Items List */}
            {items.length > 0 && (
              <div style={{ background: "#F8FBFF", borderRadius: "8px", overflow: "hidden", marginBottom: "16px" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#E0EEF9" }}>
                      {["Item", "Qty", "Cost/Unit", "Total", ""].map((h) => (
                        <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 600, color: "#5A7A96" }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id} style={{ borderBottom: "1px solid #D0E8F5" }}>
                        <td style={{ padding: "8px 12px", fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#1A2E40" }}>
                          {item.itemName}
                        </td>
                        <td style={{ padding: "8px 12px", fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#1A2E40" }}>
                          {item.quantity}
                        </td>
                        <td style={{ padding: "8px 12px", fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#1A2E40" }}>
                          ₱{parseFloat(item.purchasePrice).toLocaleString()}
                        </td>
                        <td style={{ padding: "8px 12px", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#1A2E40" }}>
                          ₱{(parseInt(item.quantity) * parseFloat(item.purchasePrice)).toLocaleString()}
                        </td>
                        <td style={{ padding: "8px 12px", textAlign: "center" }}>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            style={{ background: "none", border: "none", cursor: "pointer", color: "#DC2626" }}
                          >
                            <Trash2 size={12} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    <tr style={{ background: "#E0EEF9", fontWeight: "bold" }}>
                      <td colSpan={3} style={{ padding: "12px", textAlign: "right", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#1A2E40" }}>
                        Total Cost:
                      </td>
                      <td style={{ padding: "12px", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#2D6A9F" }}>
                        ₱{totalCost.toLocaleString()}
                      </td>
                      <td />
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", gap: "12px", padding: "16px 24px", borderTop: "1px solid #D0E8F5", justifyContent: "flex-end" }}>
          <button
            onClick={onClose}
            style={{
              height: "40px",
              padding: "0 18px",
              background: "#F0F6FC",
              border: "1.5px solid #D0E8F5",
              borderRadius: "8px",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px",
              fontWeight: 600,
              color: "#5A7A96",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              height: "40px",
              padding: "0 18px",
              background: "#2D6A9F",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px",
              fontWeight: 600,
              color: "#FFFFFF",
            }}
          >
            Create Purchase Order
          </button>
        </div>
      </div>
    </div>
  );
}
