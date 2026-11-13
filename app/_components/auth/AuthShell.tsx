"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
  MessageSquare,
  FileText,
  Search,
  Code2,
  PenTool,
  ArrowRight,
} from "lucide-react";
import { AuthBackdrop } from "./AuthBackdrop";
import styles from "./auth-shell.module.css";

interface AuthShellProps {
  children: React.ReactNode;
  /** Small uppercase line above the headline */
  eyebrow: string;
  /** Big headline; wrap a word in <em> for the accent */
  title: React.ReactNode;
  /** One sentence under the headline */
  subtitle: string;
  /** Prompt shown next to the header link */
  switchHint?: string;
  /** Label of the header link */
  switchLabel?: string;
  /** Destination of the header link */
  switchHref?: string;
}

const CAPABILITIES = [
  { icon: <MessageSquare size={13} />, label: "AI Chat" },
  { icon: <Search size={13} />, label: "Research" },
  { icon: <Code2 size={13} />, label: "Code" },
  { icon: <FileText size={13} />, label: "Notes" },
  { icon: <PenTool size={13} />, label: "Draw" },
];

export function AuthShell({
  children,
  eyebrow,
  title,
  subtitle,
  switchHint = "",
  switchLabel = "",
  switchHref = "/home",
}: AuthShellProps) {
  const spotlightRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = spotlightRef.current;
    if (!el) return;
    el.style.setProperty("--sx", `${e.clientX}px`);
    el.style.setProperty("--sy", `${e.clientY}px`);
  };

  return (
    <div className={styles.shell} onPointerMove={handlePointerMove}>
      <div className={styles.ground} aria-hidden />
      <div className={styles.spotlight} ref={spotlightRef} aria-hidden />

      <header className={styles.topbar}>
        <Link href="/home" className={styles.wordmark} aria-label="Orbit home">
          <span className={styles.wordmarkDot} aria-hidden />
          <span className={styles.wordmarkText}>orbit</span>
        </Link>

        {switchLabel && (
          <div className={styles.topbarRight}>
            {switchHint && <span className={styles.topbarHint}>{switchHint}</span>}
            <Link href={switchHref} className={styles.switchLink}>
              {switchLabel} <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </header>

      <main className={styles.main}>
        <div className={styles.intro}>
          <div className={styles.eyebrow}>{eyebrow}</div>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>

        <div className={styles.stage}>
          <AuthBackdrop />
          <div className={styles.card}>{children}</div>
        </div>

        <ul className={styles.features}>
          {CAPABILITIES.map(({ icon, label }) => (
            <li key={label} className={styles.feature}>
              <span className={styles.featureIcon}>{icon}</span>
              {label}
            </li>
          ))}
        </ul>
      </main>

      <footer className={styles.foot}>
        &copy; {new Date().getFullYear()} Orbit Inc. · Privacy · Terms
      </footer>
    </div>
  );
}
