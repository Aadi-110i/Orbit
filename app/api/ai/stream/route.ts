import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

// ── Types ──────────────────────────────────────────────────────────

interface ChatMsg {
  role: string;
  content: string;
}

interface StreamRequest {
  messages: ChatMsg[];
  provider?: string;
  model?: string;
  apiKey?: string;
}

// ── Provider endpoints ─────────────────────────────────────────────
// Every provider below is reachable with a plain REST call, so the user
// only ever needs their own key (BYOK) and we add no SDK dependencies.

interface Endpoint {
  url: (model: string) => string;
  headers: (apiKey: string) => Record<string, string>;
  body: (model: string, messages: ChatMsg[]) => unknown;
  /** Pulls the text delta out of one parsed SSE payload. */
  delta: (payload: unknown) => string | null;
}

/** Narrow an unknown JSON value to a readable record. */
function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

function firstOf(value: unknown): Record<string, unknown> {
  return Array.isArray(value) ? asRecord(value[0]) : {};
}

const OPENAI_COMPATIBLE_HEADERS = (apiKey: string) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${apiKey}`,
});

const OPENAI_COMPATIBLE_BODY = (model: string, messages: ChatMsg[]) => ({
  model,
  messages: messages.map((m) => ({
    role: m.role === "assistant" ? "assistant" : "user",
    content: m.content,
  })),
  stream: true,
});

const OPENAI_COMPATIBLE_DELTA = (payload: unknown): string | null => {
  const choice = firstOf(asRecord(payload).choices);
  const content = asRecord(choice.delta).content;
  return typeof content === "string" ? content : null;
};

const ENDPOINTS: Record<string, Endpoint> = {
  openai: {
    url: () => "https://api.openai.com/v1/chat/completions",
    headers: OPENAI_COMPATIBLE_HEADERS,
    body: OPENAI_COMPATIBLE_BODY,
    delta: OPENAI_COMPATIBLE_DELTA,
  },

  mistral: {
    url: () => "https://api.mistral.ai/v1/chat/completions",
    headers: OPENAI_COMPATIBLE_HEADERS,
    body: OPENAI_COMPATIBLE_BODY,
    delta: OPENAI_COMPATIBLE_DELTA,
  },

  deepseek: {
    url: () => "https://api.deepseek.com/chat/completions",
    headers: OPENAI_COMPATIBLE_HEADERS,
    body: OPENAI_COMPATIBLE_BODY,
    delta: OPENAI_COMPATIBLE_DELTA,
  },

  perplexity: {
    url: () => "https://api.perplexity.ai/chat/completions",
    headers: OPENAI_COMPATIBLE_HEADERS,
    body: (model, messages) => ({ ...OPENAI_COMPATIBLE_BODY(model, messages), stream: false }),
    delta: () => null,
  },

  openrouter: {
    url: () => "https://openrouter.ai/api/v1/chat/completions",
    headers: (apiKey) => ({
      ...OPENAI_COMPATIBLE_HEADERS(apiKey),
      "HTTP-Referer": "https://github.com/Aadi-110i/Orbit",
      "X-Title": "Orbit",
    }),
    body: OPENAI_COMPATIBLE_BODY,
    delta: OPENAI_COMPATIBLE_DELTA,
  },

  anthropic: {
    url: () => "https://api.anthropic.com/v1/messages",
    headers: (apiKey) => ({
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    }),
    body: (model, messages) => ({
      model,
      max_tokens: 2048,
      stream: true,
      messages: messages.map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content,
      })),
    }),
    delta: (payload: unknown): string | null => {
      const p = asRecord(payload);
      if (p.type !== "content_block_delta") return null;
      const text = asRecord(p.delta).text;
      return typeof text === "string" ? text : null;
    },
  },

  gemini: {
    url: (model) =>
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
        model
      )}:streamGenerateContent?alt=sse`,
    headers: (apiKey) => ({
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    }),
    body: (_model, messages) => ({
      contents: messages.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
    }),
    delta: (payload: unknown): string | null => {
      const candidate = firstOf(asRecord(payload).candidates);
      const part = firstOf(asRecord(candidate.content).parts);
      return typeof part.text === "string" ? part.text : null;
    },
  },
};

// ── SSE helpers ────────────────────────────────────────────────────

/** Reads an SSE body and yields the text delta of every event. */
async function* readProviderStream(
  res: Response,
  endpoint: Endpoint
): AsyncGenerator<string> {
  const reader = res.body!.getReader();
  const decoder = new TextDecoder();
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
        const text = endpoint.delta(JSON.parse(raw));
        if (text) yield text;
      } catch {
        /* ignore malformed frames */
      }
    }
  }
}

/** Perplexity answers in one shot, not a stream. */
async function readWholeBody(res: Response): Promise<string> {
  try {
    const json = await res.json();
    const choices = json?.choices ?? [];
    return choices[0]?.message?.content ?? "";
  } catch {
    return "";
  }
}

// ── Mock AI responses (used until a provider is connected) ──────────

const MOCK_RESPONSES = [
  `I'd be happy to help with that! Here's a comprehensive approach:

**Key Concepts**

1. **Start with the fundamentals** — Understanding the core principles will make everything else click.
2. **Iterative approach** — Build incrementally, test often, and refactor as you learn.
3. **Best practices**:
   - Write clean, readable code
   - Document your decisions
   - Use TypeScript for type safety
   - Test critical paths

\`\`\`typescript
// A well-structured module
export class Solution {
  private readonly config: Config;

  constructor(config: Config) {
    this._config = config;
  }

  async execute(input: string): Promise<Result> {
    const processed = this.preprocess(input);
    return this.compute(processed);
  }
}
\`\`\`

**Next Steps**
- Review the architecture diagram
- Set up your development environment
- Start with a minimal working prototype

Would you like me to dive deeper on any specific aspect?`,

  `Great question! Let me break this down systematically.

**The Core Problem**

When dealing with complex systems, the key is to maintain clear separation of concerns. Each component should have a single well-defined responsibility.

**Architecture Overview**

\`\`\`typescript
Client Layer
    ↓
API Gateway
    ↓
Business Logic
    ↓
Data Layer
\`\`\`

**Implementation Strategy**

Start by defining your data models clearly:

\`\`\`typescript
interface User {
  id: string;
  email: string;
  createdAt: Date;
  role: 'admin' | 'user' | 'viewer';
}
\`\`\`

**Recommended Libraries**
- **Authentication**: Better Auth or Clerk
- **Database**: PostgreSQL with Drizzle ORM
- **Caching**: Redis for session management
- **Validation**: Zod for runtime type checking

This approach ensures a solid foundation that scales well as your system grows.`,

  `Excellent! Here's what I recommend based on current best practices:

**Short Answer**

Use a layered architecture where each layer has a single, well-defined responsibility.

**Detailed Explanation**

The most important thing is consistency. Pick patterns and stick to them, so future contributors can follow the flow without guesswork.

\`\`\`typescript
// Repository - handles data access only
export class UserRepository {
  async findById(id: string): Promise<User | null> {
    return db.query.users.findFirst({
      where: eq(users.id, id),
    });
  }
}
\`\`\`

**Performance Considerations**
- Cache frequently accessed data
- Add database indexes strategically
- Implement pagination for large datasets

Does this address your question? I can elaborate on any point.`,
];

function getMockResponse(): string {
  const idx = Math.floor(Math.random() * MOCK_RESPONSES.length);
  return MOCK_RESPONSES[idx];
}

// ── SSE streaming route ────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const body = (await req.json()) as StreamRequest;
  const messages = Array.isArray(body.messages) ? body.messages : [];
  const endpoint = body.provider ? ENDPOINTS[body.provider] : undefined;
  const apiKey = body.apiKey?.trim();

  // ── Live provider ───────────────────────────────────────────────
  if (endpoint && apiKey) {
    const model = body.model?.trim() || "";

    try {
      const res = await fetch(endpoint.url(model), {
        method: "POST",
        headers: endpoint.headers(apiKey),
        body: JSON.stringify(endpoint.body(model, messages)),
      });

      if (!res.ok) {
        const detail = await res.text().catch(() => "");
        const friendly = res.status === 401 || res.status === 403
          ? "That API key was rejected by the provider. Check it and try again."
          : res.status === 429
            ? "The provider is rate limiting this key. Wait a moment and try again."
            : `The provider returned an error (${res.status}).`;

        // Header values must be single line ASCII.
        const safeDetail = detail.replace(/[^\x20-\x7E]/g, " ").slice(0, 200);

        const stream = new ReadableStream({
          start(controller) {
            const encoder = new TextEncoder();
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ token: friendly })}\n\n`)
            );
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ content: friendly })}\n\n`)
            );
            controller.close();
          },
        });

        return new Response(stream, {
          headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache, no-transform",
            Connection: "keep-alive",
            "X-Accel-Buffering": "no",
            "X-Provider-Status": String(res.status),
            ...(safeDetail ? { "X-Provider-Detail": safeDetail } : {}),
          },
        });
      }

      const stream = new ReadableStream({
        async start(controller) {
          const encoder = new TextEncoder();
          let accumulated = "";

          const send = (payload: unknown) => {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`));
          };

          send({ start: true });

          try {
            if (body.provider === "perplexity") {
              const full = await readWholeBody(res);
              if (full) {
                accumulated = full;
                send({ token: full });
              }
            } else {
              for await (const token of readProviderStream(res, endpoint)) {
                accumulated += token;
                send({ token });
              }
            }
          } catch {
            /* fall through to whatever we managed to collect */
          }

          if (!accumulated) {
            accumulated = "The provider returned an empty response. Try again or pick another model.";
            send({ token: accumulated });
          }

          send({ content: accumulated });
          controller.close();
        },
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache, no-transform",
          Connection: "keep-alive",
          "X-Accel-Buffering": "no",
        },
      });
    } catch (error) {
      console.error("[ai/stream] provider call failed:", error);
      const stream = new ReadableStream({
        start(controller) {
          const encoder = new TextEncoder();
          const message = "Could not reach the provider. Check your connection and try again.";
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ token: message })}\n\n`)
          );
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ content: message })}\n\n`)
          );
          controller.close();
        },
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache, no-transform",
          Connection: "keep-alive",
          "X-Accel-Buffering": "no",
        },
      });
    }
  }

  // ── Demo mode ────────────────────────────────────────────────────
  const response = getMockResponse();
  const words = response.split(" ");

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();

      function send(event: string, data: string) {
        controller.enqueue(encoder.encode(`event: ${event}\ndata: ${data}\n\n`));
      }

      send("start", JSON.stringify({ id: Date.now().toString() }));

      let accumulated = "";
      for (let i = 0; i < words.length; i++) {
        const word = i === 0 ? words[i] : " " + words[i];
        accumulated += word;
        send("token", JSON.stringify({ token: word }));

        const delay = 15 + Math.random() * 25;
        await new Promise((r) => setTimeout(r, delay));
      }

      send("done", JSON.stringify({ content: accumulated }));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
