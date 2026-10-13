"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageSquare, Code, StickyNote, Sparkles, Play, ArrowRight, CornerDownLeft } from "lucide-react";

export function LiveCanvasSandbox() {
  const [activeTab, setActiveTab] = useState<"chat" | "code" | "notes">("chat");
  const [chatMessages, setChatMessages] = useState([
    { role: "user", text: "How can I structure an infinite spatial canvas in React?" },
    {
      role: "assistant",
      text: "Use a 2D transform layer with Pan & Zoom state. Keep containers as floating coordinate blocks with relative z-indices!",
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [noteText, setNoteText] = useState(
    "💡 Spatial Thinking Notes:\n- No tab hopping\n- AI chat right next to architecture sketches\n- Connect nodes with dynamic bezier curves"
  );
  const [codeSnippet, setCodeSnippet] = useState(`// Orbit Spatial Engine
export function calculateZoom(scale: number, delta: number) {
  const newScale = Math.min(Math.max(scale + delta, 0.2), 3.0);
  return { scale: newScale, clamped: true };
}`);
  const [executed, setExecuted] = useState(false);

  const handleSendChat = () => {
    if (!inputVal.trim()) return;
    const userMsg = inputVal;
    setInputVal("");
    setChatMessages((prev) => [...prev, { role: "user", text: userMsg }]);

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: `Orbit AI generated a context-aware insight for: "${userMsg.slice(0, 30)}..."`,
        },
      ]);
    }, 400);
  };

  return (
    <section
      id="sandbox"
      style={{
        width: "100%",
        padding: "100px 5%",
        background: "linear-gradient(180deg, #fafafa 0%, #f4efe9 50%, #fafafa 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderTop: "1px solid #eaeaea",
        borderBottom: "1px solid #eaeaea",
        position: "relative",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "700px", marginBottom: "48px" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(225, 170, 139, 0.2)",
            color: "#b46a47",
            padding: "6px 16px",
            borderRadius: "99px",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: "16px",
          }}
        >
          <Sparkles size={14} /> Interactive Experience
        </div>
        <h2 style={{ fontSize: "40px", fontWeight: 600, letterSpacing: "-0.03em", color: "#111", marginBottom: "16px" }}>
          Experience Orbit Before Signing Up
        </h2>
        <p style={{ fontSize: "17px", color: "#666", lineHeight: 1.6 }}>
          Test drive how AI chat, code execution, and spatial notes work harmoniously side-by-side in real time.
        </p>
      </div>

      {/* ── Sandbox Container ── */}
      <div
        style={{
          width: "100%",
          maxWidth: "1050px",
          height: "560px",
          background: "#18181b",
          borderRadius: "24px",
          boxShadow: "0 28px 70px rgba(0,0,0,0.22), 0 0 0 1px rgba(255,255,255,0.08)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            height: "52px",
            background: "#202024",
            borderBottom: "1px solid #2e2e33",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 20px",
            userSelect: "none",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ef4444" }} />
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#f59e0b" }} />
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#10b981" }} />
            <span style={{ fontSize: "12px", color: "#71717a", marginLeft: "12px", fontWeight: 500 }}>
              Orbit Canvas Preview &bull; infinite-grid.orbit
            </span>
          </div>

          <div style={{ display: "flex", gap: "6px", background: "#131316", padding: "4px", borderRadius: "10px" }}>
            <button
              onClick={() => setActiveTab("chat")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                background: activeTab === "chat" ? "#27272a" : "transparent",
                color: activeTab === "chat" ? "#fff" : "#a1a1aa",
                transition: "all 0.15s ease",
              }}
            >
              <MessageSquare size={13} color="#e1aa8b" /> AI Chat
            </button>
            <button
              onClick={() => setActiveTab("code")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                background: activeTab === "code" ? "#27272a" : "transparent",
                color: activeTab === "code" ? "#fff" : "#a1a1aa",
                transition: "all 0.15s ease",
              }}
            >
              <Code size={13} color="#60a5fa" /> Code Editor
            </button>
            <button
              onClick={() => setActiveTab("notes")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                background: activeTab === "notes" ? "#27272a" : "transparent",
                color: activeTab === "notes" ? "#fff" : "#a1a1aa",
                transition: "all 0.15s ease",
              }}
            >
              <StickyNote size={13} color="#facc15" /> Scratchpad
            </button>
          </div>
        </div>

        {/* Canvas Body with Grid Background */}
        <div
          style={{
            flex: 1,
            position: "relative",
            background: "#18181b",
            backgroundImage:
              "radial-gradient(#27272a 1px, transparent 1px), radial-gradient(#27272a 1px, #18181b 1px)",
            backgroundSize: "24px 24px",
            backgroundPosition: "0 0, 12px 12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
        >
          {/* ── Active Floating Container ── */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
              width: "100%",
              maxWidth: "680px",
              height: "420px",
              background: "rgba(28, 28, 33, 0.95)",
              backdropFilter: "blur(20px)",
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Window header */}
            <div
              style={{
                height: "44px",
                background: "rgba(255,255,255,0.03)",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 16px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#e4e4e7" }}>
                {activeTab === "chat" && <MessageSquare size={14} color="#e1aa8b" />}
                {activeTab === "code" && <Code size={14} color="#60a5fa" />}
                {activeTab === "notes" && <StickyNote size={14} color="#facc15" />}
                <span style={{ fontWeight: 600 }}>
                  {activeTab === "chat" && "Assistant Workspace"}
                  {activeTab === "code" && "orbit-engine.ts"}
                  {activeTab === "notes" && "Design Thoughts & Todo"}
                </span>
              </div>
              <span style={{ fontSize: "11px", color: "#71717a", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Interactive Sandbox
              </span>
            </div>

            {/* Tab: Chat */}
            {activeTab === "chat" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px", overflow: "hidden" }}>
                <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "12px", marginBottom: "12px" }}>
                  {chatMessages.map((m, i) => (
                    <div
                      key={i}
                      style={{
                        alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                        maxWidth: "85%",
                        background: m.role === "user" ? "#e1aa8b" : "rgba(255,255,255,0.06)",
                        color: m.role === "user" ? "#111" : "#e4e4e7",
                        padding: "10px 14px",
                        borderRadius: m.role === "user" ? "14px 14px 2px 14px" : "14px 14px 14px 2px",
                        fontSize: "13px",
                        lineHeight: 1.5,
                      }}
                    >
                      {m.text}
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "8px", background: "rgba(255,255,255,0.05)", padding: "6px 8px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
                    placeholder="Type a message or question to Orbit AI..."
                    style={{ flex: 1, background: "transparent", border: "none", color: "#fff", fontSize: "13px", outline: "none" }}
                  />
                  <button
                    onClick={handleSendChat}
                    style={{
                      background: "#e1aa8b",
                      border: "none",
                      borderRadius: "6px",
                      width: "30px",
                      height: "30px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#111",
                      cursor: "pointer",
                    }}
                  >
                    <CornerDownLeft size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* Tab: Code */}
            {activeTab === "code" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px" }}>
                <textarea
                  value={codeSnippet}
                  onChange={(e) => setCodeSnippet(e.target.value)}
                  style={{
                    flex: 1,
                    background: "rgba(0,0,0,0.3)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "8px",
                    color: "#67e8f9",
                    fontFamily: "monospace",
                    fontSize: "13px",
                    lineHeight: 1.5,
                    padding: "14px",
                    outline: "none",
                    resize: "none",
                  }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px" }}>
                  <span style={{ fontSize: "12px", color: executed ? "#4ade80" : "#a1a1aa" }}>
                    {executed ? "✓ Executed successfully in 12ms" : "Type custom code or test execution"}
                  </span>
                  <button
                    onClick={() => {
                      setExecuted(true);
                      setTimeout(() => setExecuted(false), 2500);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      background: "#60a5fa",
                      color: "#0f172a",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    <Play size={12} fill="#0f172a" /> Run Snippet
                  </button>
                </div>
              </div>
            )}

            {/* Tab: Notes */}
            {activeTab === "notes" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px" }}>
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  style={{
                    flex: 1,
                    background: "rgba(255, 235, 170, 0.05)",
                    border: "1px solid rgba(250, 204, 21, 0.2)",
                    borderRadius: "8px",
                    color: "#fef08a",
                    fontSize: "14px",
                    lineHeight: 1.6,
                    padding: "16px",
                    outline: "none",
                    resize: "none",
                  }}
                />
                <div style={{ marginTop: "10px", fontSize: "12px", color: "#a1a1aa", textAlign: "right" }}>
                  Auto-saved to spatial state
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Call to Action bar below sandbox */}
      <div style={{ marginTop: "40px", display: "flex", alignItems: "center", gap: "16px" }}>
        <Link
          href="/workspace"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "#111",
            color: "white",
            padding: "14px 28px",
            borderRadius: "99px",
            fontSize: "15px",
            fontWeight: 600,
            textDecoration: "none",
            boxShadow: "0 10px 24px rgba(0,0,0,0.15)",
          }}
        >
          Open Infinite Canvas <ArrowRight size={16} />
        </Link>
        <Link
          href="/signup"
          style={{
            fontSize: "15px",
            fontWeight: 600,
            color: "#666",
            textDecoration: "none",
            padding: "14px 20px",
          }}
        >
          Create Free Account &rarr;
        </Link>
      </div>
    </section>
  );
}
