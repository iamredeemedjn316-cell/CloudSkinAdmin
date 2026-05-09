import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useApp, CurrentUser, UserRole } from "../context/AppContext";

const roles: { role: UserRole; label: string; name: string; email: string; initials: string; redirect: string }[] = [
  {
    role: "admin",
    label: "Admin",
    name: "Admin User",
    email: "admin@cloudskin.com",
    initials: "AU",
    redirect: "/admin",
  },
  {
    role: "practitioner",
    label: "Practitioner",
    name: "Dr. Maria Santos",
    email: "m.santos@cloudskin.com",
    initials: "MS",
    redirect: "/practitioner",
  },
  {
    role: "receptionist",
    label: "Receptionist",
    name: "Maria Gonzales",
    email: "m.gonzales@cloudskin.com",
    initials: "MG",
    redirect: "/reception",
  },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const { setIsLoggedIn, setCurrentUser } = useApp();
  const [email, setEmail] = useState("admin@cloudskin.com");
  const [password, setPassword] = useState("password");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>("admin");

  const handleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      const roleConfig = roles.find((r) => r.role === selectedRole)!;
      const user: CurrentUser = {
        name: roleConfig.name,
        email: roleConfig.email,
        role: roleConfig.role,
        roleLabel: roleConfig.label,
        initials: roleConfig.initials,
      };
      setCurrentUser(user);
      setIsLoggedIn(true);
      setIsLoading(false);
      navigate(roleConfig.redirect);
    }, 800);
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Left Panel */}
      <div
        style={{
          width: "40%",
          background: "#1A3A5C",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative gradients */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            left: "-80px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(91,192,235,0.15) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            right: "-60px",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(45,106,159,0.3) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          {/* Logo */}
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "20px",
              background: "linear-gradient(135deg, #2D6A9F 0%, #5BC0EB 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              fontSize: "32px",
            }}
          >
            ☁️
          </div>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: "28px",
              color: "#FFFFFF",
              marginBottom: "8px",
            }}
          >
            Cloud Skin Clinic
          </div>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              color: "#5BC0EB",
              marginBottom: "4px",
            }}
          >
            + Wellness
          </div>
          <div
            style={{
              marginTop: "24px",
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px",
              color: "#B8D4EC",
              lineHeight: 1.6,
              maxWidth: "280px",
            }}
          >
            Staff Portal — Internal dashboard for managing appointments, patients, and clinic operations.
          </div>

          {/* Role selector for demo */}
          <div style={{ marginTop: "40px" }}>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                color: "#5A7A96",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              Sign in as (Demo)
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {roles.map((r) => (
                <button
                  key={r.role}
                  onClick={() => {
                    setSelectedRole(r.role);
                    setEmail(r.email);
                  }}
                  style={{
                    background: selectedRole === r.role ? "rgba(45,106,159,0.5)" : "rgba(255,255,255,0.05)",
                    border: selectedRole === r.role ? "1.5px solid #5BC0EB" : "1.5px solid rgba(184,212,236,0.2)",
                    borderRadius: "10px",
                    padding: "10px 16px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    transition: "all 150ms",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: "#2D6A9F",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: "12px",
                      color: "#FFFFFF",
                    }}
                  >
                    {r.initials}
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "13px", color: "#FFFFFF" }}>
                      {r.name}
                    </div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#B8D4EC" }}>{r.email}</div>
                  </div>
                  {selectedRole === r.role && (
                    <div style={{ marginLeft: "auto", width: "8px", height: "8px", borderRadius: "50%", background: "#5BC0EB" }} />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div
        style={{
          width: "60%",
          background: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px",
        }}
      >
        <div style={{ width: "100%", maxWidth: "380px" }}>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: "28px",
              color: "#1A2E40",
              marginBottom: "6px",
            }}
          >
            Staff Sign In
          </div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px",
              color: "#5A7A96",
              marginBottom: "32px",
            }}
          >
            For Admin, Practitioners, and Receptionists only
          </div>

          {/* Email */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                fontSize: "13px",
                color: "#1A2E40",
                marginBottom: "6px",
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                height: "40px",
                border: "1.5px solid #D0E8F5",
                borderRadius: "8px",
                padding: "0 14px",
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                color: "#1A2E40",
                outline: "none",
                background: "#FFFFFF",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#2D6A9F")}
              onBlur={(e) => (e.target.style.borderColor = "#D0E8F5")}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "12px" }}>
            <label
              style={{
                display: "block",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                fontSize: "13px",
                color: "#1A2E40",
                marginBottom: "6px",
              }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  height: "40px",
                  border: "1.5px solid #D0E8F5",
                  borderRadius: "8px",
                  padding: "0 42px 0 14px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                  color: "#1A2E40",
                  outline: "none",
                  background: "#FFFFFF",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#2D6A9F")}
                onBlur={(e) => (e.target.style.borderColor = "#D0E8F5")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#9BBAD4",
                  display: "flex",
                  padding: 0,
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div style={{ textAlign: "right", marginBottom: "24px" }}>
            <a
              href="#"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                color: "#2D6A9F",
                textDecoration: "none",
              }}
            >
              Forgot Password?
            </a>
          </div>

          {/* Sign In Button */}
          <button
            onClick={handleSignIn}
            disabled={isLoading}
            style={{
              width: "100%",
              height: "40px",
              background: isLoading ? "#A8CCE8" : "#2D6A9F",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "8px",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: "14px",
              cursor: isLoading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transition: "background 150ms",
            }}
          >
            {isLoading ? (
              <>
                <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
                Signing in…
              </>
            ) : (
              "Sign In"
            )}
          </button>

          <div
            style={{
              textAlign: "center",
              marginTop: "24px",
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              color: "#9BBAD4",
            }}
          >
            Not a staff member?{" "}
            <a href="#" style={{ color: "#5A7A96", textDecoration: "underline" }}>
              Book at cloudskin.com
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
