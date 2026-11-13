"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, ArrowRight, Mail, Lock, AlertCircle } from "lucide-react";
import { AuthShell } from "@/app/_components/auth/AuthShell";
import { AuthField } from "@/app/_components/auth/AuthField";
import styles from "@/app/_components/auth/auth-shell.module.css";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <AuthShell
      eyebrow="Welcome back"
      title={
        <>
          Your workspace is <em>waiting.</em>
        </>
      }
      subtitle="Sign in to pick up your AI chats, research, code and notes."
      switchHint="New to Orbit?"
      switchLabel="Create an account"
      switchHref="/signup"
    >
      <div className={styles.cardHead}>
        <h2 className={styles.cardTitle}>Log in to Orbit</h2>
        <p className={styles.cardSub}>Use the email address you signed up with.</p>
      </div>

      {error && (
        <div className={styles.alert} role="alert">
          <AlertCircle size={15} style={{ flexShrink: 0, marginTop: 1 }} />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleLogin} className={styles.form}>
        <AuthField
          id="email"
          label="Email address"
          type="email"
          icon={<Mail size={16} />}
          placeholder="you@company.com"
          value={email}
          onChange={setEmail}
          autoComplete="email"
          autoFocus
          required
        />

        <AuthField
          id="password"
          label="Password"
          type="password"
          icon={<Lock size={16} />}
          placeholder="••••••••"
          value={password}
          onChange={setPassword}
          autoComplete="current-password"
          required
        />

        <div className={styles.forgot}>
          <Link href="#">Forgot password?</Link>
        </div>

        <button type="submit" className={styles.submit} disabled={loading}>
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Signing in…
            </>
          ) : (
            <>
              Log in to Orbit <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>

      <div className={styles.switch}>
        Don&apos;t have an account?{" "}
        <Link href="/signup">Sign up</Link>
      </div>
    </AuthShell>
  );
}
