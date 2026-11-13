"use client";

import React, { useEffect, useState } from "react";
import { readProviders } from "@/app/_lib/providers/store";
import { ProviderConnectModal } from "./ProviderConnectModal";

export const OPEN_PROVIDER_MODAL_EVENT = "orbit:open-provider-modal";
const AUTO_OPENED_KEY = "orbit.providerModal.autoOpened";

/** Open the provider picker from anywhere (buttons, headers, chat panels). */
export function openProviderModal() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_PROVIDER_MODAL_EVENT));
}

/**
 * Mounts the provider modal and opens it once, right after the user lands in
 * the workspace, if no provider has been connected yet.
 */
export function ProviderLauncher() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener(OPEN_PROVIDER_MODAL_EVENT, handler);
    return () => window.removeEventListener(OPEN_PROVIDER_MODAL_EVENT, handler);
  }, []);

  useEffect(() => {
    // Read the stored keys directly rather than from the reactive snapshot:
    // a provider may already be connected in this browser.
    if (Object.keys(readProviders()).length > 0) return;
    if (window.sessionStorage.getItem(AUTO_OPENED_KEY)) return;

    // The flag is set inside the timer, not before it: in development React
    // mounts effects twice, and the first cleanup cancels the timer.
    const timer = window.setTimeout(() => {
      window.sessionStorage.setItem(AUTO_OPENED_KEY, "1");
      setOpen(true);
    }, 900);

    return () => window.clearTimeout(timer);
  }, []);

  return <ProviderConnectModal open={open} onClose={() => setOpen(false)} />;
}
