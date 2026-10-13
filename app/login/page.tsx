"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight, Sparkles, ShieldCheck, Compass, Orbit } from "lucide-react";
import { motion } from "framer-motion";
import { OrbitSpaceBackground } from "@/app/_components/ui/orbit-space-background";

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
        background: "#050508",
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
      {/* ── 3D Interactive Three.js Planetary Starfield Background ── */}
      <OrbitSpaceBackground />

      {/* Floating Holographic Central Auth Capsule */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "rgba(13, 13, 18, 0.7)",
          backdropFilter: "blur(36px)",
          WebkitBackdropFilter: "blur(36px)",
          border: "1px solid rgba(225, 170, 139, 0.25)",
          borderRadius: "28px",
          padding: "40px 36px",
          boxShadow:
            "0 30px 90px rgba(0, 0, 0, 0.8), 0 0 50px rgba(225, 170, 139, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Glowing badge */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <Link
            href="/home"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none",
              color: "#fff",
              background: "rgba(225, 170, 139, 0.12)",
              border: "1px solid rgba(225, 170, 139, 0.3)",
              padding: "6px 16px",
              borderRadius: "99px",
              marginBottom: "18px",
            }}
          >
            <Orbit size={16} color="#e1aa8b" />
            <span style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.02em" }}>ORBIT PLATFORM</span>
          </Link>

          <h1
            style={{
              fontSize: "30px",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.2,
              marginBottom: "8px",
              background: "linear-gradient(180deg, #ffffff 40%, rgba(255, 255, 255, 0.6) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Welcome Back
          </h1>
          <p style={{ color: "#a1a1aa", fontSize: "14px" }}>
            Step back into your infinite 3D spatial thinking room.
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
            <label style={{ display: "block", fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", color: "#a1a1aa", marginBottom: "8px" }}>
              USER IDENTITY / EMAIL
            </label>
            <div style={{ position: "relative" }}>
              <Mail
                size={16}
                color="#71717a"
                style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)" }}
              />
              <input
                type="email"
                placeholder="name@orbit.dev"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "14px 16px 14px 44px",
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "14px",
                  fontSize: "14px",
                  color: "#fff",
                  outline: "none",
                  transition: "all 0.2s",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#e1aa8b";
                  e.currentTarget.style.boxShadow = "0 0 20px rgba(225, 170, 139, 0.3)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <label style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", color: "#a1a1aa" }}>
                PASSPHRASE
              </label>
              <Link href="#" style={{ color: "#e1aa8b", fontSize: "12px", fontWeight: 500, textDecoration: "none" }}>
                Forgot?
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
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "14px 44px 14px 44px",
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "14px",
                  fontSize: "14px",
                  color: "#fff",
                  outline: "none",
                  transition: "all 0.2s",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#e1aa8b";
                  e.currentTarget.style.boxShadow = "0 0 20px rgba(225, 170, 139, 0.3)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
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
              Stay authenticated
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "11px", color: "#10b981" }}>
              <ShieldCheck size={14} /> Encrypted Session
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "15px",
              background: "linear-gradient(135deg, #e1aa8b 0%, #c4967c 100%)",
              color: "#0f0f12",
              border: "none",
              borderRadius: "14px",
              fontSize: "15px",
              fontWeight: 700,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              marginTop: "8px",
              boxShadow: "0 12px 30px rgba(225, 170, 139, 0.35)",
              transition: "transform 0.15s ease, filter 0.15s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(1.08)")}
            onMouseLeave={(e) => (e.currentTarget.style.filter = "brightness(1)")}
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <>Launch Workspace <ArrowRight size={16} /></>}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "28px", fontSize: "13px", color: "#71717a" }}>
          New explorer?{" "}
          <Link href="/signup" style={{ color: "#e1aa8b", fontWeight: 600, textDecoration: "none" }}>
            Create an account &rarr;
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
