"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Code2,
  Sparkles,
  Check,
  ArrowRight,
  CornerDownLeft,
  Eye,
  Layers,
  Search,
  PenTool,
  Cpu,
  Bookmark,
  Zap,
} from "lucide-react";

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
      {/* Editorial Big Header matching "Why Zelt?" */}
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
        <p style={{ fontSize: "19px", color: "#787774", lineHeight: 1.5, maxWidth: "620px", margin: "0 auto" }}>
          Everything built into Orbit is designed around one simple promise: making your daily creative and engineering work genuinely comfortable, calm, and distraction-free.
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
        {/* ══════════════════════════════════════════════════════════════════
            ROW 1: Text on LEFT, Visual Artifact on RIGHT
            Concept: People-centric / No More Scrolling Up & Down
        ══════════════════════════════════════════════════════════════════ */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "60px",
            alignItems: "center",
          }}
        >
          {/* Text Left */}
          <div style={{ maxWidth: "460px" }}>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#e1aa8b",
                marginBottom: "12px",
              }}
            >
              PEOPLE-CENTRIC
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
              Never scroll miles up and down to check context again.
            </h3>
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.7,
                color: "#555555",
                marginBottom: "16px",
              }}
            >
              On traditional AI chat interfaces, long conversations become a scrolling nightmare. You scroll all the way up to recall a past code snippet or answer, lose your train of thought, and scroll all the way down to prompt again.
            </p>
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.7,
                color: "#555555",
                marginBottom: "24px",
              }}
            >
              Orbit makes your life comfortable: spawn a secondary AI window right next to the first one. Keep earlier insights pinned on the left while freely conversing on the right without losing a single pixel of context.
            </p>
            <div style={{ display: "flex", gap: "10px", alignItems: "center", fontSize: "14px", color: "#111111", fontWeight: 600 }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#e1aa8b" }} />
              Effortless branch thinking &bull; Zero memory fatigue
            </div>
          </div>

          {/* Visual Artifact Right */}
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
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#fff" }}>Claude 3.5 &bull; Pinned Context</div>
                  <div style={{ fontSize: "11px", color: "#888" }}>Permanent on Board</div>
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
                  Extract the auth token verification logic from our architecture.
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
                  Tokens are signed via jose (HS256) with 7-day expiration cookies. Kept visible beside you!
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
                <span>Branching into new card...</span>
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
              <Eye size={14} /> Always In Sight
            </motion.div>

            {/* Floating Pill badge "No endless scroll" */}
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
              No endless scroll wheeling
            </motion.div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            ROW 2: Visual Artifact on LEFT, Text on RIGHT
            Concept: Enabling / Simple as Drag & Drop
        ══════════════════════════════════════════════════════════════════ */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "60px",
            alignItems: "center",
          }}
        >
          {/* Visual Artifact on LEFT */}
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "420px",
            }}
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
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#60a5fa" }} />
                  <span style={{ fontSize: "14px", fontWeight: 600, color: "#fff" }}>GPT-4o &bull; Live Runner</span>
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
                  PARALLEL
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
                <div style={{ color: "#71717a" }}>// Cross-referencing Thread A</div>
                <div>
                  <span style={{ color: "#f472b6" }}>const</span> <span style={{ color: "#60a5fa" }}>session</span> = &#123;
                </div>
                <div style={{ paddingLeft: "12px", color: "#67e8f9" }}>httpOnly: true, maxAge: 604800,</div>
                <div style={{ paddingLeft: "12px", color: "#67e8f9" }}>sameSite: &quot;lax&quot;, path: &quot;/&quot;</div>
                <div>&#125;;</div>
                <div style={{ color: "#4ade80", marginTop: "8px" }}>✓ Verified with Thread A logic instantly</div>
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
                <Check size={16} /> Link Output to Scratchpad
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
                <div style={{ fontSize: "11px", color: "#888" }}>Shared workspace ready</div>
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
              <Layers size={22} />
            </motion.div>
          </div>

          {/* Text Right: ENABLING */}
          <div style={{ maxWidth: "460px" }}>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#60a5fa",
                marginBottom: "12px",
              }}
            >
              ENABLING
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
              Enabling focus. Simple as drag, drop, and link.
            </h3>
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.7,
                color: "#555555",
                marginBottom: "16px",
              }}
            >
              Productive deep work is about having the right tools without friction. Orbit makes live code execution, multi-model AI reasoning, spatial notes, and live web research available in a single place.
            </p>
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.7,
                color: "#555555",
                marginBottom: "24px",
              }}
            >
              Instead of learning complicated workflows, you simply drag windows where you want them, connect related cards with arrows, and focus on what matters. Your team can focus on their output rather than navigating tool sprawl.
            </p>
            <div style={{ display: "flex", gap: "10px", alignItems: "center", fontSize: "14px", color: "#111111", fontWeight: 600 }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#60a5fa" }} />
              Zero tab hopping &bull; Complete spatial freedom
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            ROW 3: Text on LEFT, Visual Artifact on RIGHT
            Concept: Cross-Model Synthesis / Claude + GPT Side-by-Side
        ══════════════════════════════════════════════════════════════════ */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "60px",
            alignItems: "center",
          }}
        >
          {/* Text Left */}
          <div style={{ maxWidth: "460px" }}>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#10b981",
                marginBottom: "12px",
              }}
            >
              MODEL ARBITRAGE
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
              Compare Claude and GPT-4o with zero tab switching.
            </h3>
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.7,
                color: "#555555",
                marginBottom: "16px",
              }}
            >
              Have you ever asked Claude for a nuanced architectural design, then opened a new browser tab to ask GPT-4o to write the test suite, copying and pasting prompts back and forth?
            </p>
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.7,
                color: "#555555",
                marginBottom: "24px",
              }}
            >
              In Orbit, you place both models side-by-side in real-time. Prompt both simultaneously, compare their reasoning, and drag the winning output straight into your project notes with a single motion.
            </p>
            <div style={{ display: "flex", gap: "10px", alignItems: "center", fontSize: "14px", color: "#111111", fontWeight: 600 }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981" }} />
              Best model for every task on a single screen
            </div>
          </div>

          {/* Visual Artifact Right */}
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "420px",
            }}
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
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#10b981" }} />
                  <span style={{ fontSize: "14px", fontWeight: 600, color: "#fff" }}>Side-by-Side Arena</span>
                </div>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    background: "#2e2e34",
                    color: "#10b981",
                    padding: "4px 8px",
                    borderRadius: "6px",
                  }}
                >
                  DUAL AI
                </span>
              </div>

              {/* Comparison view */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", margin: "16px 0" }}>
                <div style={{ background: "#161619", padding: "12px", borderRadius: "10px", border: "1px solid #2e2e34" }}>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#e1aa8b", marginBottom: "4px" }}>Claude 3.5</div>
                  <div style={{ fontSize: "11px", color: "#aaa", lineHeight: 1.4 }}>
                    &ldquo;Optimal microservices division with Redis cache layer.&rdquo;
                  </div>
                </div>
                <div style={{ background: "#161619", padding: "12px", borderRadius: "10px", border: "1px solid #2e2e34" }}>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#60a5fa", marginBottom: "4px" }}>GPT-4o</div>
                  <div style={{ fontSize: "11px", color: "#aaa", lineHeight: 1.4 }}>
                    &ldquo;Monolithic first with modular hexagonal boundaries.&rdquo;
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: "rgba(16, 185, 129, 0.1)",
                  border: "1px solid rgba(16, 185, 129, 0.25)",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  fontSize: "12px",
                  color: "#6ee7b7",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Zap size={14} /> One prompt dispatched to both engines in parallel
              </div>

              <div style={{ fontSize: "11px", color: "#71717a", textAlign: "center" }}>
                Drag either response into notes or code runner
              </div>
            </div>

            {/* Floating Peach Badge */}
            <motion.div
              initial={{ scale: 0.9, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 3, ease: "easeInOut" }}
              style={{
                position: "absolute",
                top: "15px",
                right: "10px",
                background: "linear-gradient(135deg, #a7f3d0, #6ee7b7)",
                color: "#064e3b",
                padding: "12px 20px",
                borderRadius: "24px 24px 6px 24px",
                fontSize: "14px",
                fontWeight: 700,
                boxShadow: "0 16px 32px rgba(16, 185, 129, 0.3)",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <Cpu size={14} /> No Lock-in
            </motion.div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            ROW 4: Visual Artifact on LEFT, Text on RIGHT
            Concept: Visual Thinking / Live Architecture & Scratchpad
        ══════════════════════════════════════════════════════════════════ */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "60px",
            alignItems: "center",
          }}
        >
          {/* Visual Artifact on LEFT */}
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "420px",
            }}
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
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#facc15" }} />
                  <span style={{ fontSize: "14px", fontWeight: 600, color: "#fff" }}>Architecture Board</span>
                </div>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    background: "#2e2e34",
                    color: "#facc15",
                    padding: "4px 8px",
                    borderRadius: "6px",
                  }}
                >
                  DIAGRAM
                </span>
              </div>

              {/* Diagram node representation */}
              <div
                style={{
                  height: "170px",
                  background: "#161619",
                  borderRadius: "12px",
                  border: "1px dashed #333338",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  padding: "16px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ padding: "8px 14px", background: "#27272a", borderRadius: "8px", fontSize: "12px", color: "#fff", border: "1px solid #3f3f46" }}>
                    API Node
                  </div>
                  <span style={{ color: "#e1aa8b", fontSize: "16px" }}>&rarr;</span>
                  <div style={{ padding: "8px 14px", background: "#27272a", borderRadius: "8px", fontSize: "12px", color: "#fff", border: "1px solid #3f3f46" }}>
                    Database
                  </div>
                </div>
                <div style={{ fontSize: "11px", color: "#71717a", marginTop: "16px" }}>
                  Linked directly to live code runner in real time
                </div>
              </div>

              <div
                style={{
                  background: "#27272a",
                  color: "#fff",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>Export ready: PNG, SVG, Markdown</span>
                <Bookmark size={14} color="#e1aa8b" />
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ rotate: -6 }}
              animate={{ rotate: 6 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 3.5, ease: "easeInOut" }}
              style={{
                position: "absolute",
                top: "15px",
                left: "15px",
                background: "#FFFFFF",
                border: "1px solid #EAEAEA",
                padding: "10px 18px",
                borderRadius: "99px",
                fontSize: "12px",
                fontWeight: 600,
                color: "#111",
                boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <PenTool size={14} color="#facc15" /> Freeform Sketching
            </motion.div>
          </div>

          {/* Text Right */}
          <div style={{ maxWidth: "460px" }}>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#facc15",
                marginBottom: "12px",
              }}
            >
              SPATIAL CLARITY
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
              Turn messy thoughts into clear, connected work.
            </h3>
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.7,
                color: "#555555",
                marginBottom: "16px",
              }}
            >
              Most great ideas do not happen in linear bullet points. They happen when you doodle a schema, paste an error log next to it, and have an AI break down the bug right below.
            </p>
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.7,
                color: "#555555",
                marginBottom: "24px",
              }}
            >
              Orbit gives you that exact physical whiteboard feeling in your browser. Pan across the canvas with your mouse, zoom out to see the big picture with the radar minimap, and zoom in to write code.
            </p>
            <div style={{ display: "flex", gap: "10px", alignItems: "center", fontSize: "14px", color: "#111111", fontWeight: 600 }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#facc15" }} />
              A calm digital desk that remembers every position
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
