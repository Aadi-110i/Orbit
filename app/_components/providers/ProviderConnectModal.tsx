"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  X,
  Check,
  Link2,
  ExternalLink,
  Eye,
  EyeOff,
  Trash2,
  Loader2,
  Sparkles,
} from "lucide-react";
import { PROVIDERS, getDefaultModel, resolveModel, type ProviderId } from "@/app/_lib/providers/registry";
import { useProviderStore } from "@/app/_lib/providers/store";
import { ProviderIcon } from "./ProviderIcons";
import styles from "./provider-connect.module.css";

interface ProviderConnectModalProps {
  open: boolean;
  onClose: () => void;
}

export function ProviderConnectModal({ open, onClose }: ProviderConnectModalProps) {
  const { providers, connectedIds, activeId, connect, disconnect, activate } = useProviderStore();
  const [selected, setSelected] = useState<ProviderId | null>(null);
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState("");
  const [reveal, setReveal] = useState(false);
  const [error, setError] = useState("");

  const selectedProvider = useMemo(
    () => PROVIDERS.find((p) => p.id === selected) ?? null,
    [selected]
  );

  // Escape closes the modal.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Picking a provider loads its saved key (if any) into the form, so an
  // existing connection can be updated without retyping it.
  const selectProvider = (id: ProviderId | null) => {
    setSelected(id);
    const existing = id ? providers[id] : undefined;
    // A saved key can point at a model the provider has since retired.
    setApiKey(existing?.apiKey ?? "");
    setModel(id ? resolveModel(id, existing?.model) : "");
    setError("");
    setReveal(false);
  };

  if (!open) return null;
  const handleConnect = () => {
    if (!selectedProvider) return;
    const key = apiKey.trim();
    if (!key) {
      setError("Paste your API key to continue.");
      return;
    }
    if (key.length < 20) {
      setError("That key looks too short. Check you copied the whole key.");
      return;
    }
    connect(selectedProvider.id, key, model || getDefaultModel(selectedProvider.id));
    setError("");
    setSelected(null);
    setApiKey("");
  };

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Connect an AI provider">
      <div className={styles.backdrop} onClick={onClose} aria-hidden />
      <div className={styles.modal}>
        <header className={styles.header}>
          <div className={styles.headerIcon}>
            <Sparkles size={16} />
          </div>
          <div>
            <h2 className={styles.title}>Connect an AI provider</h2>
            <p className={styles.subtitle}>
              Bring your own key. It is stored in this browser and sent straight to the provider.
            </p>
          </div>
          <button className={styles.close} onClick={onClose} aria-label="Close">
            <X size={16} />
          </button>
        </header>

        <div className={styles.grid}>
          {PROVIDERS.map((provider) => {
            const isConnected = Boolean(providers[provider.id]);
            const isActive = activeId === provider.id;
            const isSelected = selected === provider.id;

            return (
              <button
                key={provider.id}
                className={`${styles.tile} ${isSelected ? styles.tileSelected : ""}`}
                onClick={() => selectProvider(isSelected ? null : provider.id)}
                style={{ ["--brand" as string]: provider.color }}
                aria-pressed={isSelected}
              >
                <span className={styles.tileLogo}>
                  <ProviderIcon provider={provider.id} size={20} />
                </span>
                <span className={styles.tileText}>
                  <span className={styles.tileName}>
                    {provider.name}
                    {isActive && <span className={styles.activeTag}>Active</span>}
                    {isConnected && !isActive && (
                      <span className={styles.connectedTag}>
                        <Check size={9} /> Connected
                      </span>
                    )}
                  </span>
                  <span className={styles.tileBlurb}>{provider.blurb}</span>
                </span>
              </button>
            );
          })}
        </div>

        {selectedProvider && (
          <div className={styles.detail} style={{ ["--brand" as string]: selectedProvider.color }}>
            <div className={styles.detailHead}>
              <ProviderIcon provider={selectedProvider.id} size={18} />
              <span className={styles.detailName}>{selectedProvider.name}</span>
              <a
                className={styles.keyLink}
                href={selectedProvider.keyUrl}
                target="_blank"
                rel="noreferrer"
              >
                Get an API key <ExternalLink size={11} />
              </a>
            </div>

            <label className={styles.label} htmlFor="provider-model">
              Model
            </label>
            <select
              id="provider-model"
              className={styles.select}
              value={model}
              onChange={(e) => setModel(e.target.value)}
            >
              {selectedProvider.models.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>

            <label className={styles.label} htmlFor="provider-key">
              API key
            </label>
            <div className={styles.keyWrap}>
              <input
                id="provider-key"
                type={reveal ? "text" : "password"}
                className={styles.input}
                placeholder={selectedProvider.envVar}
                value={apiKey}
                autoComplete="off"
                spellCheck={false}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  setError("");
                }}
              />
              <button
                type="button"
                className={styles.reveal}
                onClick={() => setReveal((v) => !v)}
                aria-label={reveal ? "Hide API key" : "Show API key"}
              >
                {reveal ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.actions}>
              {providers[selectedProvider.id] && (
                <button
                  className={styles.disconnect}
                  onClick={() => {
                    disconnect(selectedProvider.id);
                    setApiKey("");
                  }}
                >
                  <Trash2 size={13} /> Disconnect
                </button>
              )}
              <button className={styles.connect} onClick={handleConnect}>
                {providers[selectedProvider.id] ? (
                  <>
                    <Check size={14} /> Save changes
                  </>
                ) : (
                  <>
                    <Link2 size={14} /> Connect {selectedProvider.name}
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        <footer className={styles.footer}>
          {connectedIds.length > 0 ? (
            <>
              <span className={styles.footerLabel}>Connected</span>
              <div className={styles.footerChips}>
                {connectedIds.map((id) => {
                  const p = PROVIDERS.find((x) => x.id === id);
                  if (!p) return null;
                  return (
                    <button
                      key={id}
                      className={`${styles.chip} ${activeId === id ? styles.chipActive : ""}`}
                      onClick={() => activate(id)}
                      title={`Use ${p.name}`}
                    >
                      <ProviderIcon provider={id} size={13} />
                      {p.name}
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <span className={styles.footerNote}>
              <Loader2 size={12} /> No provider connected yet - Orbit will use its demo replies until
              you add one.
            </span>
          )}
        </footer>
      </div>
    </div>
  );
}
