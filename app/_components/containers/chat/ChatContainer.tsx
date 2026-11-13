"use client";

import React, {
  useRef,
  useCallback,
  useEffect,
  useState,
  memo,
} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Send, Paperclip, Square, Copy, Check, X } from "lucide-react";
import { useCanvasStore } from "@/app/_lib/store/canvas-store";
import type { ChatContainer as ChatContainerType, ChatMessage } from "@/app/_lib/types/container";
import {
  readChatProvider,
  useProviderStore,
  writeChatProvider,
} from "@/app/_lib/providers/store";
import { getProvider, type ProviderId } from "@/app/_lib/providers/registry";
import { ProviderIcon } from "@/app/_components/providers/ProviderIcons";

interface ChatContainerProps {
  container: ChatContainerType;
}

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export const ChatContainer = memo(function ChatContainer({ container }: ChatContainerProps) {
  const { state } = container;
  const { messages, isGenerating, contextSources } = state;

  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Scroll state: the message list scrolls on its own, never the canvas.
  const scrollRef = useRef<HTMLDivElement>(null);
  const stickToBottomRef = useRef(true);

  // Connected AI providers
  const { providers, connectedIds, activeId } = useProviderStore();
  const [chatProvider, setChatProvider] = useState<ProviderId | null>(null);
  const [model, setModel] = useState("");

  useEffect(() => {
    const stored = readChatProvider(container.id);
    const next = stored ?? activeId ?? connectedIds[0] ?? null;
    setChatProvider(next);
    setModel(next && providers[next] ? providers[next]!.model : "");
    // Only re-seed when the stored choice or the connected set changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [container.id, activeId, connectedIds.join(",")]);

  const selectProvider = useCallback(
    (id: ProviderId) => {
      setChatProvider(id);
      writeChatProvider(container.id, id);
      setModel(providers[id]?.model ?? "");
    },
    [container.id, providers]
  );

  const {
    addMessage,
    updateMessage,
    setGenerating,
    removeContextSource,
  } = useCanvasStore();

  // ── Scroll handling ─────────────────────────────────────────────
  // The list is scrolled directly instead of scrollIntoView, which would
  // also scroll the canvas ancestor and move the whole workspace.

  const handleListScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    stickToBottomRef.current =
      el.scrollHeight - el.scrollTop - el.clientHeight < 48;
  }, []);

  const scrollToBottom = useCallback((smooth = false) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: smooth ? "smooth" : "auto" });
  }, []);

  const lastContent = messages[messages.length - 1]?.content ?? "";

  useEffect(() => {
    // Follow the stream only while the reader is already at the bottom, so
    // scrolling up to re-read something is not yanked back down.
    if (stickToBottomRef.current) scrollToBottom();
  }, [lastContent, messages.length, scrollToBottom]);

  // Auto-resize textarea
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInput(e.target.value);
      const ta = e.target;
      ta.style.height = "auto";
      ta.style.height = `${Math.min(ta.scrollHeight, 120)}px`;
    },
    []
  );

  // ── Send message ─────────────────────────────────────────

  const sendMessage = useCallback(async () => {
    const content = input.trim();
    if (!content || isGenerating) return;
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    // Add user message
    const userMsg: ChatMessage = {
      id: generateId(),
      role: "user",
      content,
      createdAt: Date.now(),
    };
    addMessage(container.id, userMsg);

    // Add assistant placeholder
    const assistantId = generateId();
    const assistantMsg: ChatMessage = {
      id: assistantId,
      role: "assistant",
      content: "",
      createdAt: Date.now(),
      isStreaming: true,
    };
    addMessage(container.id, assistantMsg);
    setGenerating(container.id, true);

    // Start streaming
    abortRef.current = new AbortController();

    const connection = chatProvider ? providers[chatProvider] : undefined;

    try {
      const res = await fetch("/api/ai/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          provider: connection ? chatProvider : undefined,
          model: connection ? model || connection.model : undefined,
          apiKey: connection ? connection.apiKey : undefined,
        }),
        signal: abortRef.current.signal,
      });

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";
      // SSE frames can be split across network chunks, so keep a buffer and
      // only consume complete lines.
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;
          const raw = trimmed.slice(5).trim();
          if (!raw || raw === "[DONE]") continue;

          try {
            const data = JSON.parse(raw);
            if (data.token !== undefined) {
              accumulated += data.token;
              updateMessage(container.id, assistantId, {
                content: accumulated,
                isStreaming: true,
              });
            } else if (data.content !== undefined) {
              updateMessage(container.id, assistantId, {
                content: data.content,
                isStreaming: false,
              });
            }
          } catch {
            // ignore parse errors
          }
        }
      }
    } catch (err) {
      if ((err as Error).name === "AbortError") {
        updateMessage(container.id, assistantId, { isStreaming: false });
      } else {
        updateMessage(container.id, assistantId, {
          content: "An error occurred. Please try again.",
          isStreaming: false,
        });
      }
    } finally {
      setGenerating(container.id, false);
      abortRef.current = null;
    }
  }, [
    input,
    isGenerating,
    container.id,
    messages,
    addMessage,
    updateMessage,
    setGenerating,
    chatProvider,
    model,
    providers,
  ]);

  const stopGeneration = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    },
    [sendMessage]
  );

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Context sources */}
      {contextSources.length > 0 && (
        <div
          className="flex flex-wrap gap-1.5 px-3 py-2 border-b"
          style={{ borderColor: "var(--surface-border)" }}
        >
          <span className="text-[11px] self-center" style={{ color: "var(--text-muted)" }}>
            Context:
          </span>
          {contextSources.map((src) => (
            <span key={src.id} className="context-chip">
              <span>{src.icon}</span>
              <span>{src.label}</span>
              <button
                onClick={() => removeContextSource(container.id, src.id)}
                className="ml-1 opacity-60 hover:opacity-100 transition-opacity"
              >
                <X size={10} />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Messages */}
      <div
        ref={scrollRef}
        onScroll={handleListScroll}
        className="flex-1 overflow-y-auto px-3 py-3 space-y-3 min-h-0"
        style={{ overscrollBehavior: "contain" }}
      >
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-3 py-8">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
              style={{ background: "var(--accent-subtle)" }}
            >
              ✦
            </div>
            <p className="text-sm text-center" style={{ color: "var(--text-muted)" }}>
              Start a conversation. <br />
              <span style={{ color: "var(--text-secondary)" }}>Ask anything.</span>
            </p>
          </div>
        )}

        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Provider / model bar */}
      {connectedIds.length > 0 && (
        <div
          className="flex items-center gap-2 px-3 py-1.5 border-t"
          style={{ borderColor: "var(--surface-border)" }}
        >
          <div className="flex items-center gap-1">
            {connectedIds.map((id) => {
              const meta = getProvider(id);
              const isActive = chatProvider === id;
              return (
                <button
                  key={id}
                  onClick={() => selectProvider(id)}
                  title={`${meta?.name ?? id} - ${providers[id]?.model ?? ""}`}
                  aria-label={`Use ${meta?.name ?? id}`}
                  aria-pressed={isActive}
                  className="flex items-center justify-center rounded-md transition-all"
                  style={{
                    width: 24,
                    height: 24,
                    background: isActive ? "var(--accent-subtle)" : "transparent",
                    border: `1px solid ${
                      isActive ? "var(--accent)" : "var(--surface-border)"
                    }`,
                  }}
                >
                  <ProviderIcon provider={id} size={13} />
                </button>
              );
            })}
          </div>

          {chatProvider && getProvider(chatProvider)?.models.length ? (
            <select
              value={model || providers[chatProvider]?.model || ""}
              onChange={(e) => {
                // Model choice is per chat window.
                setModel(e.target.value);
              }}
              className="ml-auto text-[11px] outline-none cursor-pointer"
              style={{
                background: "transparent",
                border: "none",
                color: "var(--text-muted)",
                maxWidth: 140,
              }}
            >
              {getProvider(chatProvider)!.models.map((m) => (
                <option key={m.id} value={m.id} style={{ background: "#1A1A1A" }}>
                  {m.label}
                </option>
              ))}
            </select>
          ) : null}
        </div>
      )}

      {/* Input area */}
      <div
        className="flex-shrink-0 px-3 py-2.5 border-t"
        style={{ borderColor: "var(--surface-border)" }}
      >
        <div
          className="flex items-end gap-2 rounded-xl px-3 py-2"
          style={{
            background: "var(--surface-raised)",
            border: "1px solid var(--surface-border)",
          }}
        >
          <button className="control-btn shrink-0 mb-0.5" title="Attach">
            <Paperclip size={14} />
          </button>
          <textarea
            ref={textareaRef}
            className="flex-1 bg-transparent border-none outline-none resize-none text-[13.5px] placeholder-opacity-50 min-h-[22px] max-h-[120px]"
            style={{
              color: "var(--text-primary)",
              lineHeight: "1.5",
              fontFamily: "inherit",
            }}
            placeholder="Ask AI..."
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            rows={1}
          />
          {isGenerating ? (
            <button
              className="shrink-0 mb-0.5 w-7 h-7 rounded-lg flex items-center justify-center transition-all"
              style={{ background: "var(--danger)" }}
              onClick={stopGeneration}
              title="Stop"
            >
              <Square size={11} fill="white" color="white" />
            </button>
          ) : (
            <button
              className="shrink-0 mb-0.5 w-7 h-7 rounded-lg flex items-center justify-center transition-all"
              style={{
                background: input.trim() ? "var(--accent)" : "var(--surface-border)",
                cursor: input.trim() ? "pointer" : "default",
              }}
              onClick={sendMessage}
              disabled={!input.trim()}
              title="Send"
            >
              <Send size={12} color="white" />
            </button>
          )}
        </div>
        <p
          className="text-[11px] mt-1.5 ml-1"
          style={{ color: "var(--text-muted)" }}
        >
          ⏎ Send · Shift+⏎ New line
        </p>
      </div>
    </div>
  );
});

// ── Message Bubble ────────────────────────────────────────────

const MessageBubble = memo(function MessageBubble({
  message,
}: {
  message: ChatMessage;
}) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [message.content]);

  return (
    <div className={`chat-message ${isUser ? "chat-message-user" : "chat-message-assistant"}`}>
      {!isUser && (
        <div
          className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] mb-0.5"
          style={{ background: "var(--accent)", color: "white", flexShrink: 0 }}
        >
          ✦
        </div>
      )}
      <div className={`chat-bubble ${isUser ? "chat-bubble-user" : "chat-bubble-assistant"}`}>
        {isUser ? (
          <p className="text-[13.5px] leading-[1.55]">{message.content}</p>
        ) : (
          <div className={`orbit-markdown ${message.isStreaming ? "streaming-cursor" : ""}`}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content || " "}
            </ReactMarkdown>
          </div>
        )}
      </div>
      {!isUser && !message.isStreaming && message.content && (
        <div className="flex items-center gap-1 ml-1">
          <button
            className="control-btn"
            onClick={handleCopy}
            title="Copy"
          >
            {copied ? <Check size={11} style={{ color: "var(--success)" }} /> : <Copy size={11} />}
          </button>
        </div>
      )}
    </div>
  );
});
