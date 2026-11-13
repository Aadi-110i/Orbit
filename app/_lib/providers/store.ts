"use client";

import { useCallback, useSyncExternalStore } from "react";
import { getDefaultModel, type ProviderId } from "./registry";

/**
 * Where the user's own API keys live.
 *
 * Keys are kept in this browser only (localStorage). They are never written to
 * a server database and never logged - they are sent per request to our own
 * /api/ai/stream route, which forwards them straight to the provider.
 */

const STORAGE_KEY = "orbit.providers.v1";
const ACTIVE_KEY = "orbit.activeProvider.v1";
const CHAT_PREFIX = "orbit.chatProvider.v1.";

export const PROVIDERS_CHANGED_EVENT = "orbit:providers-changed";

export interface ConnectedProvider {
  id: ProviderId;
  apiKey: string;
  model: string;
  connectedAt: number;
}

export type ProviderMap = Partial<Record<ProviderId, ConnectedProvider>>;

function isBrowser() {
  return typeof window !== "undefined";
}

export function readProviders(): ProviderMap {
  if (!isBrowser()) return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as ProviderMap;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function readActiveProvider(): ProviderId | null {
  if (!isBrowser()) return null;
  try {
    return window.localStorage.getItem(ACTIVE_KEY) as ProviderId | null;
  } catch {
    return null;
  }
}

function emitChange() {
  window.dispatchEvent(new CustomEvent(PROVIDERS_CHANGED_EVENT));
}

// ── External store wiring (useSyncExternalStore) ───────────────────

interface ProviderSnapshot {
  providers: ProviderMap;
  activeId: ProviderId | null;
}

const EMPTY_SNAPSHOT: ProviderSnapshot = { providers: {}, activeId: null };

let cachedSnapshot: ProviderSnapshot = EMPTY_SNAPSHOT;
let cachedKey = "";

function currentKey() {
  if (!isBrowser()) return "";
  return (
    (window.localStorage.getItem(STORAGE_KEY) ?? "") +
    "|" +
    (window.localStorage.getItem(ACTIVE_KEY) ?? "")
  );
}

function getSnapshot(): ProviderSnapshot {
  const key = currentKey();
  // The snapshot object must keep the same identity while the stored data is
  // unchanged, otherwise React re-renders in a loop.
  if (cachedKey === key) return cachedSnapshot;

  cachedSnapshot = {
    providers: readProviders(),
    activeId: readActiveProvider(),
  };
  cachedKey = key;
  return cachedSnapshot;
}

function getServerSnapshot(): ProviderSnapshot {
  return EMPTY_SNAPSHOT;
}

function subscribe(callback: () => void) {
  window.addEventListener(PROVIDERS_CHANGED_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(PROVIDERS_CHANGED_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function writeProvider(provider: ConnectedProvider) {
  if (!isBrowser()) return;
  const all = readProviders();
  all[provider.id] = provider;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    /* storage full or blocked - the key stays in memory for this session */
  }
  emitChange();
}

export function removeProvider(id: ProviderId) {
  if (!isBrowser()) return;
  const all = readProviders();
  delete all[id];
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    /* ignore */
  }
  if (readActiveProvider() === id) {
    const next = Object.keys(all)[0] as ProviderId | undefined;
    if (next) window.localStorage.setItem(ACTIVE_KEY, next);
    else window.localStorage.removeItem(ACTIVE_KEY);
  }
  emitChange();
}

export function setActiveProvider(id: ProviderId) {
  if (!isBrowser()) return;
  window.localStorage.setItem(ACTIVE_KEY, id);
  emitChange();
}

/** Per chat-window provider choice, falling back to the global active one. */
export function readChatProvider(containerId: string): ProviderId | null {
  if (!isBrowser()) return null;
  try {
    return window.localStorage.getItem(CHAT_PREFIX + containerId) as ProviderId | null;
  } catch {
    return null;
  }
}

export function writeChatProvider(containerId: string, id: ProviderId) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(CHAT_PREFIX + containerId, id);
  } catch {
    /* ignore */
  }
}

export function useProviderStore() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const connect = useCallback(
    (id: ProviderId, apiKey: string, model?: string) => {
      const trimmed = apiKey.trim();
      writeProvider({
        id,
        apiKey: trimmed,
        model: model || getDefaultModel(id),
        connectedAt: Date.now(),
      });
      setActiveProvider(id);
    },
    []
  );

  const disconnect = useCallback((id: ProviderId) => {
    removeProvider(id);
  }, []);

  const activate = useCallback((id: ProviderId) => {
    setActiveProvider(id);
  }, []);

  const connectedIds = Object.keys(snapshot.providers) as ProviderId[];

  return {
    providers: snapshot.providers,
    connectedIds,
    activeId: snapshot.activeId,
    connect,
    disconnect,
    activate,
  };
}
