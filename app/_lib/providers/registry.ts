/**
 * AI provider registry.
 *
 * Shared by the client (picker UI, icons) and the server (streaming route).
 * Every provider is reachable with a plain REST call, so no extra SDKs are
 * needed and the user always brings their own key (BYOK).
 */

export type ProviderId =
  | "openai"
  | "anthropic"
  | "gemini"
  | "mistral"
  | "openrouter"
  | "deepseek"
  | "perplexity";

export interface ProviderModel {
  id: string;
  label: string;
}

export interface ProviderMeta {
  id: ProviderId;
  name: string;
  /** Brand colour used for the logo and accents. */
  color: string;
  models: ProviderModel[];
  /** Where the user gets an API key. */
  keyUrl: string;
  /** Docs for models / pricing. */
  docsUrl: string;
  /** Env var name if the key is ever supplied server-side. */
  envVar: string;
  /** Short line describing what this provider is good at. */
  blurb: string;
}

export const PROVIDERS: ProviderMeta[] = [
  {
    id: "openai",
    name: "OpenAI",
    color: "#10A37F",
    models: [
      { id: "gpt-4o-mini", label: "GPT-4o mini" },
      { id: "gpt-4o", label: "GPT-4o" },
    ],
    keyUrl: "https://platform.openai.com/api-keys",
    docsUrl: "https://platform.openai.com/docs/models",
    envVar: "OPENAI_API_KEY",
    blurb: "GPT-4o and mini. Fast, broad, good at everything.",
  },
  {
    id: "anthropic",
    name: "Anthropic",
    color: "#D97757",
    models: [
      { id: "claude-3-5-sonnet-latest", label: "Claude 3.5 Sonnet" },
      { id: "claude-3-5-haiku-latest", label: "Claude 3.5 Haiku" },
    ],
    keyUrl: "https://console.anthropic.com/settings/keys",
    docsUrl: "https://docs.anthropic.com/en/docs/about-claude/models",
    envVar: "ANTHROPIC_API_KEY",
    blurb: "Claude Sonnet and Haiku. Long context, careful code.",
  },
  {
    id: "gemini",
    name: "Google Gemini",
    color: "#4285F4",
    models: [
      { id: "gemini-2.0-flash", label: "Gemini 2.0 Flash" },
      { id: "gemini-1.5-pro", label: "Gemini 1.5 Pro" },
    ],
    keyUrl: "https://aistudio.google.com/app/apikey",
    docsUrl: "https://ai.google.dev/gemini-api/docs/models",
    envVar: "GEMINI_API_KEY",
    blurb: "Very large context windows, multimodal input.",
  },
  {
    id: "mistral",
    name: "Mistral",
    color: "#FA520F",
    models: [
      { id: "mistral-large-latest", label: "Mistral Large" },
      { id: "mistral-small-latest", label: "Mistral Small" },
    ],
    keyUrl: "https://console.mistral.ai/api-keys",
    docsUrl: "https://docs.mistral.ai/getting-started/models",
    envVar: "MISTRAL_API_KEY",
    blurb: "European models. Fast, open-weight friendly.",
  },
  {
    id: "openrouter",
    name: "OpenRouter",
    color: "#94A3B8",
    models: [
      { id: "openai/gpt-4o-mini", label: "GPT-4o mini" },
      { id: "anthropic/claude-3.5-sonnet", label: "Claude 3.5 Sonnet" },
      { id: "deepseek/deepseek-chat", label: "DeepSeek Chat" },
    ],
    keyUrl: "https://openrouter.ai/keys",
    docsUrl: "https://openrouter.ai/models",
    envVar: "OPENROUTER_API_KEY",
    blurb: "One key, every model. Route between providers freely.",
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    color: "#4D6BFE",
    models: [
      { id: "deepseek-chat", label: "DeepSeek Chat" },
      { id: "deepseek-reasoner", label: "DeepSeek Reasoner" },
    ],
    keyUrl: "https://platform.deepseek.com/api_keys",
    docsUrl: "https://api-docs.deepseek.com/quick_start/pricing",
    envVar: "DEEPSEEK_API_KEY",
    blurb: "Cheap reasoning model that thinks before it answers.",
  },
  {
    id: "perplexity",
    name: "Perplexity",
    color: "#1FB8CD",
    models: [
      { id: "sonar", label: "Sonar" },
      { id: "sonar-pro", label: "Sonar Pro" },
    ],
    keyUrl: "https://www.perplexity.ai/settings/api",
    docsUrl: "https://docs.perplexity.ai/getting-started/models",
    envVar: "PERPLEXITY_API_KEY",
    blurb: "Answers with live web search and citations.",
  },
];

export const PROVIDER_MAP: Record<ProviderId, ProviderMeta> = PROVIDERS.reduce(
  (acc, p) => {
    acc[p.id] = p;
    return acc;
  },
  {} as Record<ProviderId, ProviderMeta>
);

export function getProvider(id: string | null | undefined): ProviderMeta | null {
  if (!id) return null;
  return PROVIDER_MAP[id as ProviderId] ?? null;
}

export function getDefaultModel(id: ProviderId): string {
  return PROVIDER_MAP[id]?.models[0]?.id ?? "";
}
