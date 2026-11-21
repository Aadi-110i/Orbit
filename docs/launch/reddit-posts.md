# Reddit posts

Three angles, three different communities. Paste the body only — add the link
in the body text and mention that you're the builder.

---

## Post A — r/ChatGPTCoding

**Title:** I built a canvas where Claude, GPT and Gemini answer side by side (open source, no sign-up)

**Body:**

I keep hitting the same wall with AI coding: I ask one model, don't like the
answer, ask a second, get a third opinion, then paste the winner into my
editor. By the time I'm done I've lost which file the answer was about.

So I built Orbit — an infinite canvas where every AI chat is a window you can
drag around. Open Claude, GPT and Gemini side by side, ask them the same
question, and keep your code right next to the answers.

What's actually in it:

- 7 providers (OpenAI, Anthropic, Gemini, Mistral, OpenRouter, DeepSeek,
  Perplexity), and each chat window picks its own model — so you can run a
  cheap model on one window and a reasoning model on another
- a Monaco editor as a window on the same board
- a freeform drawing canvas for architecture diagrams
- a radar minimap, because the board gets big fast
- a command palette (⌘K) and keyboard shortcuts (V select, H hand, F fit)

Two decisions I'd like feedback on:

1. **No sign-up.** The board lives in your browser's localStorage and you bring
   your own API key. I originally had accounts, but the account store was
   in-memory and users kept getting logged out — so I removed the wall
   entirely. Feels faster, but I lose cross-device sync.
2. **The context bridge is half-built.** I can attach a code snippet to a chat
   window, but the attached context isn't actually sent to the model yet. That
   is the single most important thing left to fix.

No account, no keys stored on any server — your key goes straight from your
browser to the provider.

Open source (MIT): https://github.com/Aadi-110i/Orbit
Live app: https://orbit-tau-black.vercel.app

Happy to answer anything about the canvas implementation.

---

## Post B — r/ObsidianMD

**Title:** Built a spatial alternative to tabs for AI + notes (no sign-up, open source)

**Body:**

Obsidian convinced me that thinking spatially beats thinking in folders. What
it didn't have was AI sitting next to the notes.

So I made Orbit: an infinite canvas where notes, code, diagrams and AI chats
are all the same kind of object. You place them, connect them spatially, and
the AI chat can read the code snippet next to it.

It's browser-based and needs no account — the graph is saved locally, and you
bring your own model key (OpenAI, Anthropic, Gemini, Mistral, OpenRouter,
DeepSeek, Perplexity).

The use case I actually built it for: paste a chunk of code, ask three
different models to explain it, and keep the best explanation next to the
original. In a tab-based app that comparison is painful; on a board it is just
three windows sitting there.

If your workflow is "one big note with 40 links", this is a different shape of
tool and you may find it either clarifying or annoying — I'd genuinely like to
know which.

Repo (MIT): https://github.com/Aadi-110i/Orbit
Try it: https://orbit-tau-black.vercel.app

---

## Post C — r/Excalidraw

**Title:** An infinite canvas that doubles as a multi-model AI workspace

**Body:**

Excalidraw convinced me that a spatial canvas beats a list of windows for
thinking. The thing it doesn't do is AI.

Orbit is an infinite canvas where AI chats, notes, code and drawings are all
containers on the same board. The reason I didn't just bolt a chat panel onto
the side: the useful case is *comparison*. One prompt, three models, three
windows, side by side, with the code they were reasoning about sitting next to
them.

Details:

- Canvas is a DOM transform (pan/zoom), not a `<canvas>` element, so every
  container is a normal accessible React component
- Monaco for the code windows (15 languages)
- Drawing tools: pen, rect, circle, line, arrow, text, eraser, with undo
- Radar minimap for when the board gets sprawling
- No sign-up, board persists locally, BYOK

Being honest about the state: web search inside it is currently a prototype
with curated results, and code execution isn't built yet. The AI side is real —
7 providers over SSE.

Repo: https://github.com/Aadi-110i/Orbit
Live: https://orbit-tau-black.vercel.app

Curious where the Excalidraw crowd thinks a canvas-based AI tool should go next.
