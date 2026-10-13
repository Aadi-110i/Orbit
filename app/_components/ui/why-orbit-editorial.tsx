"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, Code2, Sparkles, Check, ArrowRight, CornerDownLeft, Eye, Layers, Compass } from "lucide-react";

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
      {/* Editorial Big Header matching "Why Zelt?" from user reference */}
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
        <p style={{ fontSize: "19px", color: "#787774", lineHeight: 1.5, maxWidth: "600px", margin: "0 auto" }}>
          Software was supposed to make thinking effortless. Instead, we spend half our workday scrolling up and down single-thread chats and hunting through 40 browser tabs.
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
        {/* ── ROW 1: Text on LEFT, Visual Artifact on RIGHT ── */}
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
            <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#e1aa8b", marginBottom: "12px" }}>
              THE CORE PROBLEM
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
              When you ask ChatGPT or Claude a deep question, you receive an elaborate answer. But the moment you want to explore a follow-up or test an idea, you have to scroll all the way up to re-read that context, then scroll all the way down to write your prompt. Your train of thought breaks every single time.
            </p>
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.7,
                color: "#555555",
                marginBottom: "24px",
              }}
            >
              Orbit eliminates this friction entirely. Instead of one tall, suffocating chat stream, you simply open a new AI card or note right beside the first one. Your initial research stays permanently visible on the left while you brainstorm on the right.
            </p>
            <div style={{ display: "flex", gap: "10px", alignItems: "center", fontSize: "14px", color: "#111111", fontWeight: 600 }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#e1aa8b" }} />
              Side-by-side branch thinking without memory fatigue
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
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#fff" }}>Claude 3.5 &bull; Thread A</div>
                  <div style={{ fontSize: "11px", color: "#888" }}>Pinned Context on Canvas</div>
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
                  Extract the auth tokens logic from our architecture.
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
                  Tokens are signed via jose (HS256) with 7-day expiration cookies. Kept in view!
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

            {/* Floating Pill badge "Zero lost context" */}
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

        {/* ── ROW 2: Visual Artifact on LEFT, Text on RIGHT (Strict Alternating) ── */}
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
                  <span style={{ fontSize: "14px", fontWeight: 600, color: "#fff" }}>GPT-4o &bull; Thread B (Follow-up)</span>
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
                <div style={{ color: "#71717a" }}>// Referencing Thread A automatically</div>
                <div>
                  <span style={{ color: "#f472b6" }}>const</span> <span style={{ color: "#60a5fa" }}>cookieConfig</span> = &#123;
                </div>
                <div style={{ paddingLeft: "12px", color: "#67e8f9" }}>httpOnly: true, maxAge: 604800,</div>
                <div style={{ paddingLeft: "12px", color: "#67e8f9" }}>sameSite: &quot;lax&quot;, path: &quot;/&quot;</div>
                <div>&#125;;</div>
                <div style={{ color: "#4ade80", marginTop: "8px" }}>✓ Instant verification without re-prompting</div>
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
                <div style={{ fontSize: "12px", fontWeight: 600 }}>Multi-Model Parallel</div>
                <div style={{ fontSize: "11px", color: "#888" }}>Comparing Claude & GPT-4o</div>
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

          {/* Text Right */}
          <div style={{ maxWidth: "460px" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#60a5fa", marginBottom: "12px" }}>
              A COMFORTABLE WORKDAY
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
              Compare answers and cross-reference with zero friction.
            </h3>
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.7,
                color: "#555555",
                marginBottom: "16px",
              }}
            >
              Have you ever wanted to ask Claude for a creative architecture and ask GPT-4o to write the implementation, but had to toggle between two separate browser windows?
            </p>
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.7,
                color: "#555555",
                marginBottom: "24px",
              }}
            >
              In Orbit, you can drop Claude on the left and GPT-4o on the right. You can take a snippet from one, paste it into an integrated code runner in the center, and sketch a visual diagram on the bottom. Your workspace adapts to how your mind actually thinks.
            </p>
            <div style={{ display: "flex", gap: "10px", alignItems: "center", fontSize: "14px", color: "#111111", fontWeight: 600 }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#60a5fa" }} />
              Everything unified on one limitless screen
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
