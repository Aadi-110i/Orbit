"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight, Sparkles, Command, ShieldCheck, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      const searchParams = new URLSearchParams(window.location.search);
      const from = searchParams.get("from") || "/workspace";
      router.push(from);
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#09090b",
        backgroundImage:
          "radial-gradient(circle at 15% 20%, rgba(225, 170, 139, 0.15) 0%, transparent 45%), radial-gradient(circle at 85% 80%, rgba(147, 197, 253, 0.08) 0%, transparent 45%), radial-gradient(#27272a 1px, transparent 1px)",
        backgroundSize: "100% 100%, 100% 100%, 32px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-ui)",
        color: "#f4f4f5",
        padding: "24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glowing orbs */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "20%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(225, 170, 139, 0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "20%",
          width: "450px",
          height: "450px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(96, 165, 250, 0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      {/* Main Dual-Panel Container */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: "100%",
          maxWidth: "980px",
          minHeight: "600px",
          background: "rgba(18, 18, 22, 0.75)",
          backdropFilter: "blur(32px)",
          WebkitBackdropFilter: "blur(32px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "32px",
          boxShadow: "0 32px 80px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255,255,255,0.12)",
          display: "flex",
          flexWrap: "wrap",
          overflow: "hidden",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Left Interactive Showcase Side */}
        <div
          style={{
            flex: "1 1 380px",
            padding: "48px 40px",
            background: "linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
            borderRight: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Link
              href="/home"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                textDecoration: "none",
                color: "#fff",
                marginBottom: "40px",
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #e1aa8b, #c4967c)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(225, 170, 139, 0.3)",
                }}
              >
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#fff" }} />
              </div>
              <span style={{ fontSize: "18px", fontWeight: 700, letterSpacing: "-0.03em" }}>orbit</span>
            </Link>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "rgba(225, 170, 139, 0.15)",
                color: "#fbd5a9",
                border: "1px solid rgba(225, 170, 139, 0.3)",
                padding: "4px 12px",
                borderRadius: "99px",
                fontSize: "12px",
                fontWeight: 600,
                marginBottom: "20px",
              }}
            >
              <Sparkles size={12} /> Infinite Workspace
            </div>

            <h2 style={{ fontSize: "28px", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.3, marginBottom: "16px" }}>
              Welcome back to your infinite canvas.
            </h2>
            <p style={{ color: "#a1a1aa", fontSize: "14px", lineHeight: 1.6, marginBottom: "32px" }}>
              All your AI conversations, code snippets, diagrams, and deep research await right where you left them.
            </p>

            {/* Highlights */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "#d4d4d8" }}>
                <CheckCircle2 size={16} color="#e1aa8b" /> Multi-model chat (GPT-4o, Claude, Gemini)
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "#d4d4d8" }}>
                <CheckCircle2 size={16} color="#e1aa8b" /> High-speed live code sandbox & Monaco editor
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "#d4d4d8" }}>
                <CheckCircle2 size={16} color="#e1aa8b" /> Freeform drawing & spatial architecture notes
              </div>
            </div>
          </div>

          <div
            style={{
              padding: "16px",
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginTop: "32px",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "rgba(225, 170, 139, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#e1aa8b",
              }}
            >
              <Command size={18} />
            </div>
            <div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "#f4f4f5" }}>Spatial Keyboard Shortcuts</div>
              <div style={{ fontSize: "11px", color: "#71717a" }}>Pan with Spacebar + Drag, Zoom with Wheel</div>
            </div>
          </div>
        </div>

        {/* Right Form Side */}
        <div
          style={{
            flex: "1 1 420px",
            padding: "48px 44px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={{ marginBottom: "32px" }}>
            <h1 style={{ fontSize: "26px", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "8px" }}>
              Sign in to Orbit
            </h1>
            <p style={{ color: "#71717a", fontSize: "14px" }}>
              Enter your credentials to enter your workspace.
            </p>
          </div>

          {error && (
            <div
              style={{
                background: "rgba(239, 68, 68, 0.15)",
                color: "#fca5a5",
                padding: "12px 16px",
                borderRadius: "12px",
                fontSize: "13px",
                marginBottom: "20px",
                border: "1px solid rgba(239, 68, 68, 0.3)",
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#a1a1aa", marginBottom: "8px" }}>
                EMAIL ADDRESS
              </label>
              <div style={{ position: "relative" }}>
                <Mail
                  size={16}
                  color="#71717a"
                  style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)" }}
                />
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "14px 16px 14px 44px",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "12px",
                    fontSize: "14px",
                    color: "#fff",
                    outline: "none",
                    transition: "all 0.2s",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#e1aa8b";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(225, 170, 139, 0.2)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#a1a1aa" }}>PASSWORD</label>
                <Link href="#" style={{ color: "#e1aa8b", fontSize: "12px", fontWeight: 500, textDecoration: "none" }}>
                  Forgot password?
                </Link>
              </div>
              <div style={{ position: "relative" }}>
                <Lock
                  size={16}
                  color="#71717a"
                  style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)" }}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "14px 44px 14px 44px",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "12px",
                    fontSize: "14px",
                    color: "#fff",
                    outline: "none",
                    transition: "all 0.2s",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#e1aa8b";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(225, 170, 139, 0.2)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#71717a",
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "2px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "13px", color: "#a1a1aa" }}>
                <input
                  type="checkbox"
                  checked={keepSignedIn}
                  onChange={(e) => setKeepSignedIn(e.target.checked)}
                  style={{ width: "16px", height: "16px", accentColor: "#e1aa8b" }}
                />
                Remember this device
              </label>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "#71717a" }}>
                <ShieldCheck size={14} color="#10b981" /> 256-bit Secure
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "14px",
                background: "linear-gradient(135deg, #e1aa8b 0%, #c4967c 100%)",
                color: "#18181b",
                border: "none",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: 700,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                marginTop: "10px",
                boxShadow: "0 10px 24px rgba(225, 170, 139, 0.25)",
                transition: "transform 0.15s ease, opacity 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.95")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <>Enter Orbit <ArrowRight size={16} /></>}
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: "32px", fontSize: "13px", color: "#71717a" }}>
            Don&apos;t have an account?{" "}
            <Link href="/signup" style={{ color: "#e1aa8b", fontWeight: 600, textDecoration: "none" }}>
              Create an account &rarr;
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
