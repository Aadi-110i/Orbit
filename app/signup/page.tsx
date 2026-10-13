"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
        background: "#FBFBFA",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "40px 24px",
        fontFamily: "'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        color: "#111111",
      }}
    >
      {/* Top minimal bar */}
      <div style={{ width: "100%", maxWidth: "1080px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link
          href="/home"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            textDecoration: "none",
            color: "#111111",
          }}
        >
          <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: "#111111" }} />
          <span style={{ fontSize: "16px", fontWeight: 600, letterSpacing: "-0.03em" }}>orbit</span>
        </Link>
        <Link
          href="/login"
          style={{
            fontSize: "14px",
            color: "#666666",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          Log in &rarr;
        </Link>
      </div>

      {/* Center Auth Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{
          width: "100%",
          maxWidth: "380px",
          margin: "40px 0",
        }}
      >
        <div style={{ marginBottom: "32px" }}>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              color: "#111111",
              marginBottom: "8px",
            }}
          >
            Create an account
          </h1>
          <p style={{ fontSize: "14px", color: "#787774", lineHeight: 1.5 }}>
            Get started with Orbit. Free forever for individuals.
          </p>
        </div>

        {error && (
          <div
            style={{
              background: "#FDEBEC",
              color: "#9F2F2D",
              padding: "10px 14px",
              borderRadius: "8px",
              fontSize: "13px",
              marginBottom: "20px",
              border: "1px solid rgba(159, 47, 45, 0.2)",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 500,
                color: "#111111",
                marginBottom: "6px",
              }}
            >
              Full name
            </label>
            <input
              type="text"
              placeholder="Ada Lovelace"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
              style={{
                width: "100%",
                padding: "10px 14px",
                background: "#FFFFFF",
                border: "1px solid #EAEAEA",
                borderRadius: "8px",
                fontSize: "14px",
                color: "#111111",
                outline: "none",
                transition: "border-color 0.15s, box-shadow 0.15s",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#111111";
                e.currentTarget.style.boxShadow = "0 0 0 1px #111111";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#EAEAEA";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 500,
                color: "#111111",
                marginBottom: "6px",
              }}
            >
              Email address
            </label>
            <input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px 14px",
                background: "#FFFFFF",
                border: "1px solid #EAEAEA",
                borderRadius: "8px",
                fontSize: "14px",
                color: "#111111",
                outline: "none",
                transition: "border-color 0.15s, box-shadow 0.15s",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#111111";
                e.currentTarget.style.boxShadow = "0 0 0 1px #111111";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#EAEAEA";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 500,
                color: "#111111",
                marginBottom: "6px",
              }}
            >
              Password
            </label>
            <input
              type="password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px 14px",
                background: "#FFFFFF",
                border: "1px solid #EAEAEA",
                borderRadius: "8px",
                fontSize: "14px",
                color: "#111111",
                outline: "none",
                transition: "border-color 0.15s, box-shadow 0.15s",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#111111";
                e.currentTarget.style.boxShadow = "0 0 0 1px #111111";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#EAEAEA";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "11px 16px",
              background: "#111111",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 500,
              cursor: "pointer",
              marginTop: "8px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "6px",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#262626")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#111111")}
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <>Create account <ArrowRight size={14} /></>}
          </button>
        </form>

        <div style={{ marginTop: "28px", textAlign: "center", fontSize: "13px", color: "#787774" }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "#111111", fontWeight: 500, textDecoration: "underline" }}>
            Log in
          </Link>
        </div>
      </motion.div>

      {/* Footer text */}
      <div style={{ fontSize: "12px", color: "#999999", textAlign: "center" }}>
        By continuing, you agree to Orbit&apos;s Terms of Service and Privacy Policy.
      </div>
    </div>
  );
}