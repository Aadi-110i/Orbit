"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, Code2, Sparkles, Check, ArrowRight, CornerDownLeft } from "lucide-react";

export function WhyOrbitEditorial() {
  return (
    <section
      style={{
        width: "100%",
        padding: "140px 6%",
        background: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderTop: "1px solid #EAEAEA",
      }}
    >
      {/* Editorial Big Header like "Why Zelt?" */}
      <div style={{ textAlign: "center", marginBottom: "110px", maxWidth: "800px" }}>
        <h2
          style={{
            fontSize: "clamp(46px, 5.5vw, 68px)",
            fontWeight: 500,
            letterSpacing: "-0.04em",
            color: "#111111",
            lineHeight: 1.05,
            marginBottom: "20px",
          }}
        >
          Why Orbit?
        </h2>
        <p style={{ fontSize: "19px", color: "#787774", lineHeight: 1.5, maxWidth: "560px", margin: "0 auto" }}>
          Built for thinkers who refuse to be constrained by tabs, rigid windows, and fragmented tools.
        </p>
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          display: "flex",
          flexDirection: "column",
          gap: "140px",
        }}
      >
        {/* ── ROW 1: Text Left + Floating Dark Chat Artifact Right ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "60px",
            alignItems: "center",
          }}
        >
          {/* Text block */}
          <div style={{ maxWidth: "440px" }}>
            <div style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#e1aa8b", marginBottom: "12px" }}>
              THE PROBLEM WE SOLVED
            </div>
            <h3
              style={{
                fontSize: "36px",
                fontWeight: 500,
                letterSpacing: "-0.03em",
                color: "#111111",
                marginBottom: "20px",
                lineHeight: 1.2,
              }}
            >
              No more scrolling miles up and down for context.
            </h3>
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.7,
                color: "#555555",
                marginBottom: "24px",
              }}
            >
              On standard AI chats, exploring a tangential question means losing your place. You scroll up to re-read previous answers, lose your train of thought, and scroll down again to continue typing.
            </p>
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.7,
                color: "#555555",
                marginBottom: "24px",
              }}
            >
              With Orbit, you simply spawn another AI window or scratchpad right next to it. Compare models side-by-side, branch queries, and keep your critical reference material visible permanently.
            </p>
            <div style={{ display: "flex", gap: "12px", alignItems: "center", fontSize: "14px", color: "#111111", fontWeight: 600 }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#e1aa8b" }} />
              Parallel conversations without lost context
            </div>
          </div>

          {/* Visual Artifact (Offset Dark Card with Floating Badges) */}
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "420px",
            }}
          >
            {/* The Main Dark Window */}
            <div
              style={{
                width: "100%",
                maxWidth: "380px",
                height: "360px",
                background: "#1f1f23",
                borderRadius: "20px",
                padding: "24px",
                boxShadow: "0 24px 60px rgba(0,0,0,0.18)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #e1aa8b, #c4967c)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  AI
                </div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#fff" }}>Claude 3.5 Sonnet</div>
                  <div style={{ fontSize: "11px", color: "#888" }}>Active in Workspace</div>
                </div>
              </div>

              {/* Chat bubble body */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", margin: "20px 0" }}>
                <div
                  style={{
                    alignSelf: "flex-end",
                    background: "#2e2e34",
                    color: "#eee",
                    padding: "10px 14px",
                    borderRadius: "14px 14px 2px 14px",
                    fontSize: "13px",
                  }}
                >
                  Synthesize the system architecture for our distributed pipeline.
                </div>
                <div
                  style={{
                    alignSelf: "flex-start",
                    background: "rgba(225, 170, 139, 0.15)",
                    border: "1px solid rgba(225, 170, 139, 0.3)",
                    color: "#fbd5a9",
                    padding: "10px 14px",
                    borderRadius: "14px 14px 14px 2px",
                    fontSize: "13px",
                    lineHeight: 1.5,
                  }}
                >
                  Linked diagram nodes #3 and #7 to your Postgres database schema directly on canvas.
                </div>
              </div>

              {/* Fake input */}
              <div
                style={{
                  background: "#161619",
                  borderRadius: "12px",
                  padding: "10px 14px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "12px",
                  color: "#666",
                }}
              >
                <span>Ask follow-up or branch idea...</span>
                <CornerDownLeft size={14} color="#888" />
              </div>
            </div>

            {/* Floating Peach speech badge like "Hey!" in reference */}
            <motion.div
              initial={{ scale: 0.9, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 3, ease: "easeInOut" }}
              style={{
                position: "absolute",
                top: "15px",
                left: "10px",
                background: "linear-gradient(135deg, #fbd5a9, #e1aa8b)",
                color: "#3a1d13",
                padding: "12px 20px",
                borderRadius: "24px 24px 24px 6px",
                fontSize: "14px",
                fontWeight: 700,
                boxShadow: "0 16px 32px rgba(225, 170, 139, 0.4)",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <Sparkles size={14} /> Instant Flow
            </motion.div>

            {/* Floating Pill badge "Connected: 12 nodes" */}
            <motion.div
              initial={{ scale: 0.95, y: -6 }}
              animate={{ scale: 1, y: 4 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 3.5, ease: "easeInOut" }}
              style={{
                position: "absolute",
                bottom: "35px",
                right: "10px",
                background: "#FFFFFF",
                border: "1px solid #EAEAEA",
                padding: "10px 18px",
                borderRadius: "99px",
                fontSize: "12px",
                fontWeight: 600,
                color: "#111",
                boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981" }} />
              Live Context Grounding
            </motion.div>
          </div>
        </div>

        {/* ── ROW 2: Floating Dark Card Left + Text Right ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "60px",
            alignItems: "center",
          }}
        >
          {/* Visual Artifact (Offset Dark Code/Approval card with Floating Badge) */}
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "420px",
              order: 2, // on desktop this displays to the left depending on flow
            }}
            className="md:order-1"
          >
            {/* Dark Card */}
            <div
              style={{
                width: "100%",
                maxWidth: "380px",
                height: "360px",
                background: "#1f1f23",
                borderRadius: "20px",
                padding: "24px",
                boxShadow: "0 24px 60px rgba(0,0,0,0.18)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#e1aa8b" }} />
                  <span style={{ fontSize: "14px", fontWeight: 600, color: "#fff" }}>orbit.canvas</span>
                </div>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    background: "#2e2e34",
                    color: "#aaa",
                    padding: "4px 8px",
                    borderRadius: "6px",
                  }}
                >
                  LIVE APP
                </span>
              </div>

              {/* Code execution block */}
              <div
                style={{
                  background: "#141417",
                  borderRadius: "12px",
                  padding: "16px",
                  fontFamily: "monospace",
                  fontSize: "12px",
                  lineHeight: 1.6,
                  color: "#d4d4d8",
                  border: "1px solid #2e2e34",
                }}
              >
                <div style={{ color: "#71717a" }}>// Instant Code Execution</div>
                <div>
                  <span style={{ color: "#f472b6" }}>const</span> <span style={{ color: "#60a5fa" }}>workspace</span> = <span style={{ color: "#facc15" }}>useOrbit</span>();
                </div>
                <div>workspace.<span style={{ color: "#34d399" }}>syncContext</span>([&quot;notes&quot;, &quot;ai&quot;]);</div>
                <div style={{ color: "#4ade80", marginTop: "8px" }}>✓ Live compiled in 8ms</div>
              </div>

              {/* Action Button like the "Approve" button in reference */}
              <button
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "#FFFFFF",
                  color: "#111111",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <Check size={16} /> Execute on Canvas
              </button>
            </div>

            {/* Notification Badge like "Anastasia asked for Github account" */}
            <motion.div
              initial={{ x: 10, y: -10 }}
              animate={{ x: 0, y: 0 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 4, ease: "easeInOut" }}
              style={{
                position: "absolute",
                top: "10px",
                right: "0px",
                background: "#FFFFFF",
                border: "1px solid #EAEAEA",
                padding: "12px 18px",
                borderRadius: "16px",
                fontSize: "13px",
                fontWeight: 500,
                color: "#111",
                boxShadow: "0 16px 36px rgba(0,0,0,0.1)",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#111", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700 }}>
                O
              </div>
              <div>
                <div style={{ fontSize: "12px", fontWeight: 600 }}>Multiplayer Synced</div>
                <div style={{ fontSize: "11px", color: "#888" }}>2 collaborators editing</div>
              </div>
            </motion.div>

            {/* Floating ID badge icon like the Ben badge in reference */}
            <motion.div
              initial={{ rotate: -8 }}
              animate={{ rotate: 4 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 3.2, ease: "easeInOut" }}
              style={{
                position: "absolute",
                bottom: "20px",
                left: "20px",
                background: "linear-gradient(135deg, #fbd5a9, #e1aa8b)",
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#111",
                boxShadow: "0 12px 24px rgba(225, 170, 139, 0.4)",
              }}
            >
              <Code2 size={24} />
            </motion.div>
          </div>

          {/* Text block */}
          <div style={{ maxWidth: "440px", order: 1 }} className="md:order-2">
            <h3
              style={{
                fontSize: "36px",
                fontWeight: 500,
                letterSpacing: "-0.03em",
                color: "#111111",
                marginBottom: "20px",
              }}
            >
              Enabling
            </h3>
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.7,
                color: "#555555",
                marginBottom: "24px",
              }}
            >
              Deep work is about giving yourself the right tools without friction. Orbit makes live code execution, multi-model AI reasoning, spatial notes, and live web research available in a single unified space, as intuitive as dragging and connecting nodes.
            </p>
            <div style={{ display: "flex", gap: "12px", alignItems: "center", fontSize: "14px", color: "#111111", fontWeight: 500 }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#111" }} />
              Zero context fragmentation
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
