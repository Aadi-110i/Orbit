"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Lock, Eye, EyeOff, Loader2, ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Password strength calculation
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
  const strengthLabels = ["Weak", "Fair", "Good", "Strong"];

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
        background: "#09090b",
        backgroundImage:
          "radial-gradient(circle at 80% 20%, rgba(225, 170, 139, 0.16) 0%, transparent 45%), radial-gradient(circle at 20% 80%, rgba(147, 197, 253, 0.08) 0%, transparent 45%), radial-gradient(#27272a 1px, transparent 1px)",
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
      {/* Ambient background glow */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          right: "15%",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(225, 170, 139, 0.14) 0%, transparent 70%)",
          filter: "blur(70px)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: "100%",
          maxWidth: "1020px",
          minHeight: "640px",
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
        {/* Left Side: Brand & Feature Highlights */}
        <div
          style={{
            flex: "1 1 400px",
            padding: "48px 44px",
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
              <Sparkles size={12} /> Limitless Potential
            </div>

            <h2 style={{ fontSize: "30px", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.25, marginBottom: "16px" }}>
              Turn fragmented ideas into cohesive masterpieces.
            </h2>
            <p style={{ color: "#a1a1aa", fontSize: "14px", lineHeight: 1.6, marginBottom: "32px" }}>
              Join creators, engineers, and researchers using Orbit to visualize complex architectures, run code, and collaborate with AI models.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <div style={{ marginTop: "2px" }}><Zap size={16} color="#e1aa8b" /></div>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#fff" }}>Zero Setup Required</div>
                  <div style={{ fontSize: "12px", color: "#71717a" }}>Instant access to canvas, no credit card needed</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <div style={{ marginTop: "2px" }}><CheckCircle2 size={16} color="#e1aa8b" /></div>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#fff" }}>Unified Spatial Flow</div>
                  <div style={{ fontSize: "12px", color: "#71717a" }}>Code, Chat, Notes, and Diagramming side-by-side</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <div style={{ marginTop: "2px" }}><ShieldCheck size={16} color="#e1aa8b" /></div>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#fff" }}>Secure & Private</div>
                  <div style={{ fontSize: "12px", color: "#71717a" }}>End-to-end local session encryption</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ fontSize: "12px", color: "#71717a", marginTop: "32px" }}>
            &ldquo;Orbit replaced 6 different tabs on my screen with one calm, infinite board.&rdquo;
          </div>
        </div>

        {/* Right Side: Signup Form */}
        <div
          style={{
            flex: "1 1 420px",
            padding: "48px 44px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={{ marginBottom: "28px" }}>
            <h1 style={{ fontSize: "26px", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "8px" }}>
              Create your account
            </h1>
            <p style={{ color: "#71717a", fontSize: "14px" }}>
              Start free with full access to the infinite canvas.
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

          <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#a1a1aa", marginBottom: "8px" }}>
                FULL NAME
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
              <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#a1a1aa", marginBottom: "8px" }}>
                PASSWORD
              </label>
              <div style={{ position: "relative" }}>
                <Lock
                  size={16}
                  color="#71717a"
                  style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)" }}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 8 characters"
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

              {/* Dynamic strength indicator */}
              {password && (
                <div style={{ marginTop: "10px" }}>
                  <div style={{ display: "flex", gap: "4px", height: "4px", marginBottom: "6px" }}>
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
                    Password strength: {strength > 0 ? strengthLabels[strength - 1] : "Too short"}
                  </div>
                </div>
              )}
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
              {loading ? <Loader2 size={18} className="animate-spin" /> : <>Create Account <ArrowRight size={16} /></>}
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: "28px", fontSize: "13px", color: "#71717a" }}>
            Already have an account?{" "}
            <Link href="/login" style={{ color: "#e1aa8b", fontWeight: 600, textDecoration: "none" }}>
              Sign in &rarr;
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}