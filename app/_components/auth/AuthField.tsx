"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import styles from "./auth-shell.module.css";

interface AuthFieldProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  required?: boolean;
  minLength?: number;
}

export function AuthField({
  id,
  label,
  icon,
  type = "text",
  value,
  onChange,
  placeholder,
  autoComplete,
  autoFocus,
  required,
  minLength,
}: AuthFieldProps) {
  const [revealed, setRevealed] = useState(false);
  const isPassword = type === "password";

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <div className={styles.inputWrap}>
        <span className={styles.inputIcon}>{icon}</span>
        <input
          id={id}
          name={id}
          type={isPassword && revealed ? "text" : type}
          className={styles.input}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          required={required}
          minLength={minLength}
        />
        {isPassword && (
          <button
            type="button"
            className={styles.reveal}
            onClick={() => setRevealed((v) => !v)}
            aria-label={revealed ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            {revealed ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
    </div>
  );
}
