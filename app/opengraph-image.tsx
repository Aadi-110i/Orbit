import { ImageResponse } from "next/og";

export const alt = "Orbit — Ask every AI model at once";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const MODELS = [
  { label: "Claude", tint: "#D97757" },
  { label: "GPT", tint: "#10A37F" },
  { label: "Gemini", tint: "#4285F4" },
];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background:
            "linear-gradient(135deg, #fdf7f1 0%, #f7d6b0 35%, #e1aa8b 68%, #c4967c 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              background: "linear-gradient(to bottom right, #444, #111)",
            }}
          />
          <div style={{ display: "flex", fontSize: "30px", fontWeight: 700, color: "#111", letterSpacing: "-0.03em" }}>
            orbit
          </div>
          <div
            style={{
              display: "flex",
              marginLeft: "10px",
              padding: "8px 18px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.6)",
              color: "#553022",
              fontSize: "20px",
              fontWeight: 600,
            }}
          >
            Infinite canvas for AI work
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              display: "flex",
              fontSize: "78px",
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#111",
              maxWidth: "900px",
            }}
          >
            Ask every AI model at once.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "30px",
              lineHeight: 1.4,
              color: "#4A342A",
              maxWidth: "860px",
            }}
          >
            Run Claude, GPT and Gemini side by side, with your code and research right next to them.
          </div>
        </div>

        {/* Model cards */}
        <div style={{ display: "flex", gap: "20px" }}>
          {MODELS.map((m) => (
            <div
              key={m.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "16px 26px",
                borderRadius: "18px",
                background: "rgba(255,255,255,0.82)",
                border: "1px solid rgba(17,17,17,0.08)",
                fontSize: "26px",
                fontWeight: 600,
                color: "#111",
              }}
            >
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  background: m.tint,
                }}
              />
              {m.label}
            </div>
          ))}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "16px 26px",
              borderRadius: "18px",
              background: "rgba(17,17,17,0.9)",
              fontSize: "26px",
              fontWeight: 600,
              color: "white",
            }}
          >
            + code, notes, research
          </div>
        </div>
      </div>
    ),
    size
  );
}
