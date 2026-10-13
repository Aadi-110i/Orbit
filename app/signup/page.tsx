"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Lock, Eye, EyeOff, Loader2, ArrowRight, ShieldCheck, Orbit, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { OrbitSpaceBackground } from "@/app/_components/ui/orbit-space-background";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Dynamic strength calculation
  const calculateStrength = (pass: string) => {
    let score = 0;
    if (pass.length > 5) score += 1;
    if (pass.length > 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return Math.min(4, score);
  };
  const strength = calculateStrength(password);
  const strengthColors = ["#ef4444", "#f59e0b", "#eab308", "#10b981"];
  const strengthLabels = ["Basic", "Moderate", "Strong", "Fortified"];

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Signup failed");
      }

      router.push("/workspace");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Signup failed");
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
          maxWidth: "480px",
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
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
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
              marginBottom: "16px",
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
            Create Your Canvas
          </h1>
          <p style={{ color: "#a1a1aa", fontSize: "14px" }}>
            Initialize your limitless personal creative workspace.
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

        <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", color: "#a1a1aa", marginBottom: "6px" }}>
              YOUR NAME
            </label>
            <div style={{ position: "relative" }}>
              <User
                size={16}
                color="#71717a"
                style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)" }}
              />
              <input
                type="text"
                placeholder="Ada Lovelace"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "13px 16px 13px 44px",
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
            <label style={{ display: "block", fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", color: "#a1a1aa", marginBottom: "6px" }}>
              EMAIL COORDINATES
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
                  padding: "13px 16px 13px 44px",
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
            <label style={{ display: "block", fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", color: "#a1a1aa", marginBottom: "6px" }}>
              MASTER PASSPHRASE
            </label>
            <div style={{ position: "relative" }}>
              <Lock
                size={16}
                color="#71717a"
                style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)" }}
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Min. 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "13px 44px 13px 44px",
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

            {/* Strength meter */}
            {password && (
              <div style={{ marginTop: "8px" }}>
                <div style={{ display: "flex", gap: "4px", height: "3px", marginBottom: "4px" }}>
                  {[0, 1, 2, 3].map((idx) => (
                    <div
                      key={idx}
                      style={{
                        flex: 1,
                        borderRadius: "2px",
                        background: idx < strength ? strengthColors[strength - 1] : "rgba(255,255,255,0.1)",
                        transition: "background 0.25s",
                      }}
                    />
                  ))}
                </div>
                <div style={{ fontSize: "11px", color: strength > 0 ? strengthColors[strength - 1] : "#71717a" }}>
                  Security Level: {strength > 0 ? strengthLabels[strength - 1] : "Too short"}
                </div>
              </div>
            )}
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

        <div style={{ textAlign: "center", marginTop: "24px", fontSize: "13px", color: "#71717a" }}>
          Already equipped?{" "}
          <Link href="/login" style={{ color: "#e1aa8b", fontWeight: 600, textDecoration: "none" }}>
            Sign in &rarr;
          </Link>
        </div>
      </motion.div>
    </div>
  );
}