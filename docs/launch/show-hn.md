# Show HN

**Title:** Show HN: Orbit – an infinite canvas where you run Claude, GPT and Gemini side by side

**Text:** (first comment, post the link in the title area or as the first line)

I got tired of the "open three tabs to compare models" dance, so I built
Orbit — an infinite canvas where each AI chat is a window you place anywhere
on the board. Ask Claude, GPT and Gemini the same question at once, keep your
code in a Monaco window right next to the answers, and see the whole thing at
a glance.

A few specifics, since that's usually what people ask:

- 7 providers over plain REST + SSE (no vendor SDKs), BYOK — your key stays
  in your browser and is never written to a server
- per-chat model selection, so one window can run a cheap model while another
  runs a reasoning model
- the board itself is a DOM transform, not a `<canvas>` element, so every
  container is a normal React component
- notes, drawing tools, a radar minimap, a command palette, keyboard shortcuts
- no sign-up: the board persists in localStorage

Honest gaps: web search is a prototype with curated results, code execution
isn't built, and attached context isn't wired into the model request yet.

Next.js 16 / React 19 / TypeScript / Tailwind v4 / Zustand / Monaco / Three.js.
MIT licensed.

https://orbit-tau-black.vercel.app
https://github.com/Aadi-110i/Orbit

---

## Notes for posting

- Post between **8am and 10am ET** on a weekday
- Title must start with "Show HN:" — do not add marketing adjectives
- First comment should be the actual description, not "thanks for the upvotes!"
- **Stay in the thread for the first 2–3 hours.** Answer every question.
  HN punishes silent launchers.
- If someone asks "why not just use Claude Projects / ChatGPT Projects":
  - they are chat-history-first, not board-first
  - you can't run three providers against the same prompt in one view
  - the board keeps code and research attached to the conversation spatially
- If someone asks "isn't this just tldraw?": agree, and point at the difference —
  tldraw is a drawing primitive library, the AI context bridge and per-window
  model selection are the product.
- **Do not** ask for upvotes in the comments. Do not cross-post the same day.
- Screenshot/GIF in the comment: the workspace view is the best one, since the
  whole point is that several windows are visible at once.
