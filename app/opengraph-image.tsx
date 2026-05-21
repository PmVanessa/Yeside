import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Yeside Kazeem FIA, FNAS — Actuary. Builder. Board Director.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0F1F3D",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "serif",
        }}
      >
        {/* Top — site label */}
        <div
          style={{
            color: "rgba(255,255,255,0.40)",
            fontSize: 16,
            letterSpacing: "0.22em",
            fontFamily: "monospace",
          }}
        >
          YESIDE.VERCEL.APP
        </div>

        {/* Centre — name + credentials */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          <div
            style={{
              color: "#B5892B",
              fontSize: 18,
              letterSpacing: "0.22em",
              fontFamily: "monospace",
              marginBottom: 28,
            }}
          >
            FIA · FNAS · BOARD DIRECTOR · CO-FOUNDER
          </div>

          <div
            style={{
              color: "#ffffff",
              fontSize: 120,
              fontWeight: 700,
              lineHeight: 0.88,
              letterSpacing: "-0.03em",
            }}
          >
            YESIDE
          </div>
          <div
            style={{
              color: "#ffffff",
              fontSize: 120,
              fontWeight: 700,
              lineHeight: 0.88,
              letterSpacing: "-0.03em",
              marginBottom: 40,
            }}
          >
            KAZEEM
          </div>

          <div
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: 26,
              fontStyle: "italic",
              letterSpacing: "0.01em",
            }}
          >
            Actuary. Builder. Board Director.
          </div>
        </div>

        {/* Bottom — location */}
        <div
          style={{
            color: "rgba(255,255,255,0.35)",
            fontSize: 15,
            letterSpacing: "0.12em",
            fontFamily: "monospace",
          }}
        >
          LONDON · LAGOS
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
