# Social posts

Short, specific, and always with a link. Avoid "excited to share" — it reads as
noise. Lead with the problem or the screenshot.

---

## X / Twitter

**Post 1 — the demo (best performer)**

> I kept asking Claude and GPT the same question just to compare answers.
>
> So I built a canvas where they answer side by side, with the code next to them.
>
> No sign-up. Bring your own key. Open source.
>
> https://orbit-tau-black.vercel.app
>
> [attach: workspace GIF]

**Post 2 — build in public**

> Shipped: Orbit v2
>
> - removed the signup wall (accounts kept vanishing on serverless)
> - no sign-up, board persists in your browser
> - 7 providers, per-window model selection
> - added analytics so I actually know if anyone's using it
>
> Repo: https://github.com/Aadi-110i/Orbit

**Post 3 — the question**

> Genuine question for people who use multiple AI models daily:
>
> How do you compare answers? Three tabs, or do you just pick one and move on?
>
> I built a canvas for the first case — https://orbit-tau-black.vercel.app

**Post 4 — the honest post (best for replies)**

> What's shipped vs. what's still broken in my AI canvas:
>
> ✅ 7 providers, streaming, per-window models, Monaco, notes, drawing, minimap
> ❌ web search is still curated mock results
> ❌ code execution isn't built
> ❌ attached context isn't sent to the model yet
>
> Building it in public. https://orbit-tau-black.vercel.app

---

## LinkedIn

> **I removed the signup wall from my side project — and it was the right call.**
>
> Orbit is an infinite canvas where you run Claude, GPT and Gemini side by side,
> with your code and research attached to the conversations.
>
> I built it because I was tired of opening three tabs to compare model
> answers, and losing track of which file each answer was about.
>
> Last week I shipped a version with accounts. It was worse than useless: the
> user store lived in serverless memory, so every account vanished when the
> instance recycled. People would sign up, come back the next day, and be told
> their password was wrong.
>
> So the board now lives in the visitor's own browser. No account, no lockout,
> no database to babysit. You bring your own API key and it never touches a
> server.
>
> What I'd love feedback on: spatial comparison of models — is that a real
> job anyone has, or am I solving my own problem?
>
> https://orbit-tau-black.vercel.app
> https://github.com/Aadi-110i/Orbit

---

## Discord / Slack communities

Short, no link in the first line (many communities ban drops):

> Built a side project for a problem I kept having — comparing answers from
> different AI models without losing context. It's an infinite canvas where
> each chat is a window you can place next to your code. No sign-up, open
> source, bring your own key. Happy to answer questions about the
> implementation, especially the canvas transform (it's a DOM transform, not
> a `<canvas>` element, which keeps every window accessible).
>
> Link in the comments if anyone wants to try it.

---

## Communities worth posting in

- Obsidian / Logspan / Excalidraw communities — spatial thinkers
- "AI power user" Discords and Slacks
- Indie-hacker communities — but with the problem first, always
- Your own college / university developer groups — the cheapest users you'll get
- `r/ChatGPTCoding`, `r/ObsidianMD`, `r/Excalidraw`, `r/LocalLLaMA`, `r/nextjs`
  (one post every few days, never the same text twice)

**Rule:** one community per day, and always disclose that you built it.
