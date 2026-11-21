# Orbit — launch kit

Everything here is written to be **used as-is**. Change nothing except the
placeholder in brackets if you want to personalise it.

**Live app:** https://orbit-tau-black.vercel.app
**Repo:** https://github.com/Aadi-110i/Orbit

> Rule for every post: say plainly that you built it. Reddit punishes stealth
> self-promotion, and it kills reach even when it doesn't get you banned.
> Write the problem first, the product second, the link last.

---

## The one-paragraph pitch (reusable)

> Orbit is an infinite canvas for AI work. You open chat windows for Claude,
> GPT and Gemini side by side, drop your code and research right next to them,
> and see the whole problem in one view instead of juggling tabs. Every window
> is a container you can drag, resize and minimise; a radar minimap keeps you
> oriented when the board grows. It runs in your browser with no sign-up, and
> you bring your own API key — the key never touches a database. Free and open
> source: https://orbit-tau-black.vercel.app

---

## 30-day plan

### Week 1 — fix and instrument (done)

- [x] Remove the signup wall so nobody gets locked out (was the biggest risk)
- [x] Analytics: traffic + `workspace_opened`, `container_created`,
      `provider_connected`, `ai_message_sent`
- [x] OpenGraph image so links preview correctly
- [x] Rewrite the hero around "ask every model at once"

### Week 2 — assets and positioning

- [x] Landing + workspace screenshots (`docs/screenshots/`)
- [x] Four zoom crops for social posts (`docs/screenshots/demo-0*.png`) —
      board overview, chat close-up, code close-up, radar minimap
- [ ] **Record an 8-second animated GIF yourself** with any screen recorder:
      pan the board, open a chat, hit `F` to fit the view, show the radar.
      Attach it to every X/LinkedIn post — static screenshots lose to motion
      for canvas products. (GIF frames are in `docs/screenshots/` as PNGs if
      you want to stitch them yourself.)
- [ ] Record a 45-second Loom of the "ask 3 models at once" flow
- [ ] Add a "Why" / comparison section: Orbit vs. three browser tabs
- [ ] Set repo topics + description (Settings → repo topics)

### Week 3 — soft launch (stagger these, do not post all on one day)

| Day | Channel | Asset |
| --- | --- | --- |
| Tue | r/ChatGPTCoding | `reddit-posts.md` → Post A |
| Wed | X + LinkedIn | `social.md` → Post 1 (build-in-public) |
| Thu | r/ObsidianMD | `reddit-posts.md` → Post B |
| Fri | r/Excalidraw | `reddit-posts.md` → Post C |
| Sat | Show HN | `show-hn.md` |
| Sun | r/LocalLLaMA, r/nextjs, r/webdev | re-angled versions |

### Week 4 — Product Hunt + follow-up

- [ ] Launch day (≈9am PT). Assets in `product-hunt.md`
- [ ] Be in the comments for the first 6 hours — every question answered fast
- [ ] Reply to every Reddit comment with a genuine answer, not a link
- [ ] Read the analytics: `workspace_opened` → `ai_message_sent` is the funnel
      that matters. Signups do not exist in guest mode, so watch *messages sent*
- [ ] Fix the top 3 complaints and post the changelog back in the threads

---

## Metrics to watch

Guest mode means no signup funnel, so judge it on behaviour:

| Event | Means |
| --- | --- |
| `workspace_opened` | someone actually opened the canvas |
| `container_created` | they played with it |
| `provider_connected` | they were serious enough to add a key |
| `ai_message_sent` | **the one that matters** — they got a real answer |

A visitor who sends a message is a user. A visitor who doesn't is a landing
page problem, not a product problem.

---

## What NOT to do

- Do not post the same text to multiple subreddits on the same day
- Do not drop a bare link — write the problem
- Do not use "revolutionary", "game-changing", "seamless"
- Do not post to r/promote, r/SideProject, r/SaaS (self-promo only, and low value)
- Do not argue in the comments when someone says "Miro already does this"
  — that is the one objection you will get most, and the best reply is a link
  to the multi-model comparison they can't get elsewhere
