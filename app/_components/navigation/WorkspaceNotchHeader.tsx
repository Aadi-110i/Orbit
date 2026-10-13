"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Command,
  ChevronDown,
  User,
  LogOut,
  Sparkles,
  MousePointer2,
  Hand,
  MessageSquare,
  StickyNote,
  Search,
  Code2,
  PenTool,
  Maximize,
  Check,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCanvasStore } from "@/app/_lib/store/canvas-store";
import { useShallow } from "zustand/react/shallow";
import type { ContainerType } from "@/app/_lib/types/container";

export function WorkspaceNotchHeader() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeBoard, setActiveBoard] = useState("Dashboard");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { tool, setTool, addContainer, openCommandPalette, fitCanvas } =
    useCanvasStore(
      useShallow((s) => ({
        tool: s.tool,
        setTool: s.setTool,
        addContainer: s.addContainer,
        openCommandPalette: s.openCommandPalette,
        fitCanvas: s.fitCanvas,
      }))
    );

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/home");
      router.refresh();
    } catch {
      router.push("/home");
    }
  };

  const navItems = [
    { label: "Dashboard", icon: Sparkles, desc: "Main spatial canvas" },
    { label: "AI Agents", icon: MessageSquare, desc: "Multi-model reasoning" },
    { label: "Code Studio", icon: Code2, desc: "Monaco live runtime" },
    { label: "Architecture", icon: PenTool, desc: "Freeform visual board" },
    { label: "Web Grounding", icon: Search, desc: "Live internet synthesis" },
  ];

  return (
    <>
      {/* ── TOP NOTCH HEADER ── */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 9999,
          pointerEvents: "none",
        }}
      >
        <div
          ref={dropdownRef}
          style={{
            pointerEvents: "auto",
            position: "relative",
          }}
        >
          {/* The White Notch Bar */}
          <div
            style={{
              background: "#F5F5F7",
              color: "#18181b",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "7px 14px",
              borderBottomLeftRadius: "18px",
              borderBottomRightRadius: "18px",
              borderLeft: "1px solid rgba(0, 0, 0, 0.08)",
              borderRight: "1px solid rgba(0, 0, 0, 0.08)",
              borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.18)",
              fontFamily: "'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            }}
          >
            {/* Logo / Brand Pill */}
            <Link
              href="/home"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                textDecoration: "none",
                color: "#111111",
                padding: "4px 8px",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "13px",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.06)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <Command size={14} />
              <span>Orbit</span>
            </Link>

            <div style={{ width: "1px", height: "16px", background: "rgba(0, 0, 0, 0.12)" }} />

            {/* Dashboard Switcher Dropdown Trigger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: menuOpen ? "rgba(0,0,0,0.08)" : "transparent",
                border: "none",
                borderRadius: "8px",
                padding: "4px 10px",
                fontSize: "13px",
                fontWeight: 500,
                color: "#111111",
                cursor: "pointer",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => {
                if (!menuOpen) e.currentTarget.style.background = "rgba(0,0,0,0.05)";
              }}
              onMouseLeave={(e) => {
                if (!menuOpen) e.currentTarget.style.background = "transparent";
              }}
            >
              <Sparkles size={14} color="#b06a30" />
              <span>{activeBoard}</span>
              <motion.div animate={{ rotate: menuOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown size={14} color="#71717a" />
              </motion.div>
            </button>

            <div style={{ width: "1px", height: "16px", background: "rgba(0, 0, 0, 0.12)" }} />

            {/* Tool Shortcuts inside the notch */}
            <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
              <button
                onClick={() => setTool("select")}
                title="Select Mode (V)"
                style={{
                  background: tool === "select" ? "#111111" : "transparent",
                  color: tool === "select" ? "#ffffff" : "#52525b",
                  border: "none",
                  borderRadius: "6px",
                  padding: "5px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MousePointer2 size={13} />
              </button>
              <button
                onClick={() => setTool("hand")}
                title="Hand Pan Mode (H)"
                style={{
                  background: tool === "hand" ? "#111111" : "transparent",
                  color: tool === "hand" ? "#ffffff" : "#52525b",
                  border: "none",
                  borderRadius: "6px",
                  padding: "5px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Hand size={13} />
              </button>
              <button
                onClick={openCommandPalette}
                title="Command Palette (⌘K)"
                style={{
                  background: "transparent",
                  color: "#52525b",
                  border: "none",
                  borderRadius: "6px",
                  padding: "5px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Command size={13} />
              </button>
            </div>

            <div style={{ width: "1px", height: "16px", background: "rgba(0, 0, 0, 0.12)" }} />

            {/* Sign out Button */}
            <button
              onClick={handleLogout}
              title="Sign out of Orbit"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                background: "transparent",
                border: "none",
                borderRadius: "8px",
                padding: "4px 8px",
                fontSize: "12px",
                color: "#52525b",
                cursor: "pointer",
                transition: "color 0.15s, background 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#111111";
                e.currentTarget.style.background = "rgba(0,0,0,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#52525b";
                e.currentTarget.style.background = "transparent";
              }}
            >
              <User size={13} />
              <span>Sign out</span>
              <LogOut size={12} />
            </button>
          </div>

          {/* ── EXPANDED NOTCH DROPDOWN MENU ── */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  top: "100%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "280px",
                  background: "#F5F5F7",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  borderRadius: "16px",
                  boxShadow: "0 20px 48px rgba(0, 0, 0, 0.22)",
                  padding: "8px",
                  marginTop: "6px",
                  zIndex: 10000,
                  color: "#18181b",
                }}
              >
                <div
                  style={{
                    padding: "6px 12px",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#71717a",
                  }}
                >
                  Workspace Switcher
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  {navItems.map((item) => {
                    const isSelected = activeBoard === item.label;
                    return (
                      <button
                        key={item.label}
                        onClick={() => {
                          setActiveBoard(item.label);
                          setMenuOpen(false);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                          padding: "8px 12px",
                          borderRadius: "10px",
                          border: "none",
                          background: isSelected ? "#EAEAEA" : "transparent",
                          cursor: "pointer",
                          textAlign: "left",
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) => {
                          if (!isSelected) e.currentTarget.style.background = "rgba(0,0,0,0.04)";
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) e.currentTarget.style.background = "transparent";
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <item.icon size={15} color={isSelected ? "#111" : "#71717a"} />
                          <div>
                            <div style={{ fontSize: "13px", fontWeight: isSelected ? 600 : 500, color: "#111" }}>
                              {item.label}
                            </div>
                            <div style={{ fontSize: "11px", color: "#71717a" }}>{item.desc}</div>
                          </div>
                        </div>
                        {isSelected && <Check size={14} color="#111" />}
                      </button>
                    );
                  })}
                </div>

                <div style={{ height: "1px", background: "rgba(0,0,0,0.08)", margin: "6px 0" }} />

                {/* Quick Add Section inside dropdown */}
                <div
                  style={{
                    padding: "6px 12px 2px 12px",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#71717a",
                  }}
                >
                  Quick Add To Canvas
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px", padding: "4px" }}>
                  <button
                    onClick={() => {
                      addContainer("chat");
                      setMenuOpen(false);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "6px 8px",
                      borderRadius: "6px",
                      border: "1px solid rgba(0,0,0,0.06)",
                      background: "#fff",
                      fontSize: "11px",
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    <MessageSquare size={12} color="#b06a30" /> + AI Chat
                  </button>
                  <button
                    onClick={() => {
                      addContainer("code");
                      setMenuOpen(false);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "6px 8px",
                      borderRadius: "6px",
                      border: "1px solid rgba(0,0,0,0.06)",
                      background: "#fff",
                      fontSize: "11px",
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    <Code2 size={12} color="#2563eb" /> + Code
                  </button>
                  <button
                    onClick={() => {
                      addContainer("note");
                      setMenuOpen(false);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "6px 8px",
                      borderRadius: "6px",
                      border: "1px solid rgba(0,0,0,0.06)",
                      background: "#fff",
                      fontSize: "11px",
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    <StickyNote size={12} color="#ca8a04" /> + Note
                  </button>
                  <button
                    onClick={() => {
                      addContainer("drawing");
                      setMenuOpen(false);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "6px 8px",
                      borderRadius: "6px",
                      border: "1px solid rgba(0,0,0,0.06)",
                      background: "#fff",
                      fontSize: "11px",
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    <PenTool size={12} color="#7c3aed" /> + Draw
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
}
