import { track } from "@vercel/analytics";

/**
 * Thin wrapper around Vercel Analytics' custom events.
 *
 * Analytics must never break the app, so every failure is swallowed — a
 * blocked tracker or an ad-blocker should never break the canvas.
 */
export function trackEvent(
  name: string,
  properties?: Record<string, string | number | boolean | null | undefined>
) {
  try {
    if (typeof window === "undefined") return;
    track(name, properties);
  } catch {
    /* ignore */
  }
}

/** Activation events worth watching after a launch. */
export const EVENTS = {
  WORKSPACE_OPENED: "workspace_opened",
  CONTAINER_CREATED: "container_created",
  PROVIDER_CONNECTED: "provider_connected",
  AI_MESSAGE_SENT: "ai_message_sent",
  CTA_CLICKED: "cta_clicked",
} as const;
