"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, ArrowRight, Mail, Lock, User, AlertCircle } from "lucide-react";
import { AuthShell } from "@/app/_components/auth/AuthShell";
import { AuthField } from "@/app/_components/auth/AuthField";
import styles from "@/app/_components/auth/auth-shell.module.css";

const STRENGTH_COLORS = ["", "#E05252", "#E8A838", "#4CAF78"];
const STRENGTH_LABELS = ["", "Weak", "Fair", "Strong"];

function getPasswordStrength(password: string) {
  if (!password) return 0;

  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12 || /\d/.test(password)) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  return Math.min(3, score);
}

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const strength = useMemo(() => getPasswordStrength(password), [password]);

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
    <AuthShell
      eyebrow="Free forever"
      title={
        <>
          Give ideas <em>a bigger space.</em>
        </>
      }
      subtitle="AI chats, research, code and notes on one infinite canvas."
      switchHint="Already on Orbit?"
      switchLabel="Log in"
      switchHref="/login"
    >
      <div className={styles.cardHead}>
        <h2 className={styles.cardTitle}>Create your workspace</h2>
        <p className={styles.cardSub}>Free forever for individuals. No credit card.</p>
      </div>

      {error && (
        <div className={styles.alert} role="alert">
          <AlertCircle size={15} style={{ flexShrink: 0, marginTop: 1 }} />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSignup} className={styles.form}>
        <AuthField
          id="name"
          label="Full name"
          type="text"
          icon={<User size={16} />}
          placeholder="Ada Lovelace"
          value={name}
          onChange={setName}
          autoComplete="name"
          autoFocus
          required
        />

        <AuthField
          id="email"
          label="Email address"
          type="email"
          icon={<Mail size={16} />}
          placeholder="you@company.com"
          value={email}
          onChange={setEmail}
          autoComplete="email"
          required
        />

        <div>
          <AuthField
            id="password"
            label="Password"
            type="password"
            icon={<Lock size={16} />}
            placeholder="At least 8 characters"
            value={password}
            onChange={setPassword}
            autoComplete="new-password"
            minLength={8}
            required
          />
          {password.length > 0 && (
            <div className={styles.strength}>
              <div className={styles.strengthBars}>
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className={styles.strengthBar}
                    style={{
                      background:
                        i < strength ? STRENGTH_COLORS[strength] : "rgba(255, 255, 255, 0.1)",
                    }}
                  />
                ))}
              </div>
              <span
                className={styles.strengthLabel}
                style={{ color: STRENGTH_COLORS[strength] || undefined }}
              >
                {STRENGTH_LABELS[strength]}
              </span>
            </div>
          )}
        </div>

        <button type="submit" className={styles.submit} disabled={loading}>
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Creating workspace…
            </>
          ) : (
            <>
              Create your workspace <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>

      <div className={styles.switch}>
        Already have an account?{" "}
        <Link href="/login">Log in</Link>
      </div>

      <div className={styles.legal}>
        By continuing, you agree to Orbit&apos;s{" "}
        <Link href="#">Terms of Service</Link> and <Link href="#">Privacy Policy</Link>.
      </div>
    </AuthShell>
  );
}
