"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  MousePointer2,
  Hand,
  MessageSquare,
  StickyNote,
  Search,
  Code2,
  PenTool,
  Maximize,
  Command,
  ChevronDown,
  User,
  LogOut,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCanvasStore } from "@/app/_lib/store/canvas-store";
import { useShallow } from "zustand/react/shallow";
import type { ContainerType } from "@/app/_lib/types/container";

const CREATE_ACTIONS: {
  type: ContainerType;
  icon: React.ComponentType<{ size: number }>;
  label: string;
}[] = [
  { type: "chat", icon: MessageSquare, label: "Chat" },
  { type: "note", icon: StickyNote, label: "Note" },
  { type: "search", icon: Search, label: "Search" },
  { type: "code", icon: Code2, label: "Code" },
  { type: "drawing", icon: PenTool, label: "Draw" },
];

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
        {/* ── THE NOTCH TOOLBAR ── */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.94)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            color: "#18181b",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            padding: "6px 14px",
            borderBottomLeftRadius: "22px",
            borderBottomRightRadius: "22px",
            borderLeft: "1px solid rgba(0, 0, 0, 0.08)",
            borderRight: "1px solid rgba(0, 0, 0, 0.08)",
            borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
            boxShadow: "0 14px 40px rgba(0, 0, 0, 0.14)",
            fontFamily: "var(--font-ui), 'Geist Sans', -apple-system, sans-serif",
            userSelect: "none",
          }}
        >
          {/* Orbit Brand Chip */}
          <Link
            href="/home"
            title="Return to Home"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              textDecoration: "none",
              color: "#111111",
              padding: "4px 8px 4px 4px",
              borderRadius: "99px",
              fontWeight: 700,
              fontSize: "13px",
              marginRight: "2px",
            }}
          >
            <div
              style={{
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                background: "#b06a30",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontSize: "12px",
                boxShadow: "0 2px 6px rgba(176, 106, 48, 0.3)",
              }}
            >
              ✦
            </div>
            <span>Orbit</span>
          </Link>

          {/* Divider */}
          <div style={{ width: "1px", height: "16px", background: "rgba(0, 0, 0, 0.1)", margin: "0 2px" }} />

          {/* Dashboard Dropdown Trigger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              background: menuOpen ? "rgba(0,0,0,0.06)" : "transparent",
              border: "none",
              borderRadius: "8px",
              padding: "5px 8px",
              fontSize: "13px",
              fontWeight: 600,
              color: "#111111",
              cursor: "pointer",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => {
              if (!menuOpen) e.currentTarget.style.background = "rgba(0,0,0,0.04)";
            }}
            onMouseLeave={(e) => {
              if (!menuOpen) e.currentTarget.style.background = "transparent";
            }}
          >
            <Sparkles size={13} color="#b06a30" />
            <span>{activeBoard}</span>
            <motion.div animate={{ rotate: menuOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown size={13} color="#71717a" />
            </motion.div>
          </button>

          {/* Divider */}
          <div style={{ width: "1px", height: "16px", background: "rgba(0, 0, 0, 0.1)", margin: "0 2px" }} />

          {/* Mode Toggles: Select & Hand */}
          <button
            id="tool-select"
            onClick={() => setTool("select")}
            title="Select Mode (V)"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              padding: "5px 10px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 500,
              border: "none",
              cursor: "pointer",
              background: tool === "select" ? "rgba(225, 170, 139, 0.25)" : "transparent",
              color: tool === "select" ? "#8a4510" : "#555555",
              transition: "all 0.15s ease",
            }}
          >
            <MousePointer2 size={14} color={tool === "select" ? "#b06a30" : "#666"} />
            <span>Select</span>
          </button>

          <button
            id="tool-hand"
            onClick={() => setTool("hand")}
            title="Pan Hand Mode (H)"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              padding: "5px 10px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 500,
              border: "none",
              cursor: "pointer",
              background: tool === "hand" ? "rgba(225, 170, 139, 0.25)" : "transparent",
              color: tool === "hand" ? "#8a4510" : "#555555",
              transition: "all 0.15s ease",
            }}
          >
            <Hand size={14} color={tool === "hand" ? "#b06a30" : "#666"} />
            <span>Hand</span>
          </button>

          {/* Divider */}
          <div style={{ width: "1px", height: "16px", background: "rgba(0, 0, 0, 0.1)", margin: "0 2px" }} />

          {/* Quick Create Actions (+Chat, +Note, +Search, +Code, +Draw) */}
          <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
            {CREATE_ACTIONS.map(({ type, icon: Icon, label }) => (
              <button
                key={type}
                id={`create-${type}`}
                onClick={() => addContainer(type)}
                title={`Spawn New ${label}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "5px 9px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: 500,
                  border: "1px solid rgba(0, 0, 0, 0.05)",
                  background: "rgba(255, 255, 255, 0.8)",
                  color: "#18181b",
                  cursor: "pointer",
                  transition: "background 0.15s, transform 0.1s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#ffffff";
                  e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.8)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <Icon size={14} />
                <span>+{label}</span>
              </button>
            ))}
          </div>

          {/* Divider */}
          <div style={{ width: "1px", height: "16px", background: "rgba(0, 0, 0, 0.1)", margin: "0 2px" }} />

          {/* Fit Canvas */}
          <button
            onClick={fitCanvas}
            title="Fit Canvas View (F)"
            style={{
              background: "transparent",
              border: "none",
              borderRadius: "6px",
              padding: "5px 6px",
              cursor: "pointer",
              color: "#52525b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <Maximize size={14} />
          </button>

          {/* Command Palette */}
          <button
            id="open-command"
            onClick={openCommandPalette}
            title="Command Palette (⌘K)"
            style={{
              background: "transparent",
              border: "none",
              borderRadius: "6px",
              padding: "5px 6px",
              cursor: "pointer",
              color: "#52525b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <Command size={14} />
          </button>

          {/* Divider */}
          <div style={{ width: "1px", height: "16px", background: "rgba(0, 0, 0, 0.1)", margin: "0 2px" }} />

          {/* Sign Out */}
          <button
            onClick={handleLogout}
            title="Sign out of Orbit"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              background: "transparent",
              border: "none",
              borderRadius: "6px",
              padding: "5px 8px",
              fontSize: "12px",
              color: "#71717a",
              cursor: "pointer",
              transition: "color 0.15s, background 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#111111";
              e.currentTarget.style.background = "rgba(0,0,0,0.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#71717a";
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
                left: "220px",
                width: "260px",
                background: "#ffffff",
                border: "1px solid rgba(0, 0, 0, 0.1)",
                borderRadius: "16px",
                boxShadow: "0 20px 48px rgba(0, 0, 0, 0.18)",
                padding: "8px",
                marginTop: "6px",
                zIndex: 10000,
                color: "#18181b",
              }}
            >
              <div
                style={{
                  padding: "6px 10px",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#71717a",
                }}
              >
                Workspace Views
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
                        padding: "8px 10px",
                        borderRadius: "8px",
                        border: "none",
                        background: isSelected ? "#F5F5F7" : "transparent",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) e.currentTarget.style.background = "rgba(0,0,0,0.03)";
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <item.icon size={14} color={isSelected ? "#b06a30" : "#71717a"} />
                        <div>
                          <div style={{ fontSize: "12px", fontWeight: isSelected ? 600 : 500, color: "#111" }}>
                            {item.label}
                          </div>
                          <div style={{ fontSize: "10px", color: "#71717a" }}>{item.desc}</div>
                        </div>
                      </div>
                      {isSelected && <Check size={13} color="#b06a30" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
