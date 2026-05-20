"use client";

const stats = [
  { n: "20+", l: "YEARS" },
  { n: "12+", l: "ROLES" },
  { n: "8",   l: "MARKETS" },
];

// Repeat enough times for a seamless infinite loop
const track = [...stats, ...stats, ...stats, ...stats];

export function StatsMarquee() {
  return (
    <>
      <style>{`
        @keyframes stats-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .stats-track {
          animation: stats-scroll 20s linear infinite;
          will-change: transform;
        }
        .stats-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div style={{
        background: "#0F1F3D",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "48px 0",
        overflow: "hidden",
        position: "relative",
      }}>
        {/* Edge fades */}
        <div style={{
          position: "absolute", inset: "0 auto 0 0", width: 100, zIndex: 2,
          background: "linear-gradient(to right, #0F1F3D, transparent)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", inset: "0 0 0 auto", width: 100, zIndex: 2,
          background: "linear-gradient(to left, #0F1F3D, transparent)",
          pointerEvents: "none",
        }} />

        <div
          className="stats-track"
          style={{ display: "flex", alignItems: "flex-start", width: "max-content" }}
        >
          {track.map((s, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                flexShrink: 0,
                padding: "0 140px",
              }}
            >
              <div>
                <div style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(36px, 4vw, 52px)",
                  fontWeight: 600,
                  color: "#ffffff",
                  lineHeight: 1,
                }}>
                  {s.n}
                </div>
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.7)",
                  letterSpacing: "0.18em",
                  marginTop: "10px",
                }}>
                  {s.l}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
