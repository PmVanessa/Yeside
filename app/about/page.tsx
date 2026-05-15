"use client";

import { useEffect, useRef } from "react";
import { achievements, credentials, statsStrip } from "@/data/about";
import { LINKEDIN } from "@/data/home";

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctxs: { revert: () => void }[] = [];

    async function init() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      achievements.forEach((_, i) => {
        const ctx = gsap.context(() => {
          gsap.fromTo(`.ach-content-${i}`,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.9, ease: "power2.out",
              scrollTrigger: { trigger: `.ach-section-${i}`, start: "top 65%" } }
          );
          gsap.fromTo(`.ach-stats-${i}`,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.2,
              scrollTrigger: { trigger: `.ach-section-${i}`, start: "top 65%" } }
          );
        });
        ctxs.push(ctx);
      });
    }

    init();
    return () => ctxs.forEach(ctx => ctx.revert());
  }, []);

  return (
    <main ref={pageRef} style={{ background: "#080808" }}>
      {/* Hero */}
      <section
        className="relative w-full flex flex-col justify-end px-6 md:px-16 pt-32 pb-20"
        style={{ minHeight: "65vh", background: "#080808", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="absolute pointer-events-none select-none" style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(160px, 28vw, 400px)",
          fontWeight: 700, color: "#ffffff", opacity: 0.025,
          lineHeight: 1, right: "-2vw", bottom: "-0.1em",
          userSelect: "none",
        }}>
          YK
        </div>

        <div className="relative z-10 max-w-4xl">
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: "13px",
            color: "rgba(255,255,255,0.62)", letterSpacing: "0.2em", marginBottom: "24px",
          }}>
            ACHIEVEMENTS
          </div>

          <h1 style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(40px, 6.5vw, 88px)",
            fontWeight: 600, color: "#ffffff",
            lineHeight: 1.0, letterSpacing: "-0.02em", marginBottom: "36px",
          }}>
            A track record<br />
            that speaks<br />
            for itself.
          </h1>

          <div className="flex flex-wrap gap-3">
            {credentials.map((c, i) => (
              <span key={i} style={{
                fontFamily: "var(--font-mono)", fontSize: "12px",
                color: "rgba(255,255,255,0.82)", letterSpacing: "0.14em",
                border: "1px solid rgba(255,255,255,0.35)",
                padding: "7px 16px", borderRadius: "2px",
              }}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers strip */}
      <div className="px-6 md:px-16 py-12" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "#0F1F3D" }}>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-8">
          {statsStrip.map((s, i) => (
            <div key={i}>
              <div style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(36px, 4vw, 52px)",
                fontWeight: 600, color: "#ffffff", lineHeight: 1,
              }}>
                {s.n}
              </div>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: "12px",
                color: "rgba(255,255,255,0.7)", letterSpacing: "0.18em", marginTop: "8px",
              }}>
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievement sections */}
      {achievements.map((ach, i) => (
        <section
          key={i}
          className={`ach-section-${i} w-full px-6 md:px-16 py-24`}
          style={{ background: ach.bg, borderBottom: "1px solid rgba(255,255,255,0.04)" }}
        >
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
            {/* Left: index + stats */}
            <div className={`ach-stats-${i} flex-shrink-0 lg:w-64`} style={{ opacity: 0 }}>
              <div style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(80px, 10vw, 130px)",
                fontWeight: 700, color: "rgba(255,255,255,0.06)", lineHeight: 1,
              }}>
                {ach.index}
              </div>
              <div style={{ marginTop: "24px" }} className="flex flex-col gap-6">
                {ach.stats.map((s, j) => (
                  <div key={j} style={{ borderLeft: "2px solid rgba(255,255,255,0.25)", paddingLeft: "16px" }}>
                    <div style={{
                      fontFamily: "var(--font-cormorant)",
                      fontSize: "clamp(24px, 3vw, 36px)",
                      fontWeight: 600, color: "#ffffff", lineHeight: 1,
                    }}>
                      {s.value}
                    </div>
                    <div style={{
                      fontFamily: "var(--font-mono)", fontSize: "12px",
                      color: "rgba(255,255,255,0.7)", letterSpacing: "0.14em", marginTop: "6px",
                    }}>
                      {s.label.toUpperCase()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: content */}
            <div className={`ach-content-${i} flex-1`} style={{ opacity: 0 }}>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: "13px",
                color: "rgba(255,255,255,0.62)", letterSpacing: "0.2em", marginBottom: "20px",
              }}>
                {ach.tag}
              </div>
              <h2 style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(26px, 3.8vw, 52px)",
                fontWeight: 600, color: "#ffffff",
                lineHeight: 1.1, marginBottom: "28px", maxWidth: "620px",
              }}>
                {ach.headline}
              </h2>
              <p style={{
                fontFamily: "var(--font-dm)",
                fontSize: "clamp(15px, 1.3vw, 18px)",
                color: "rgba(255,255,255,0.85)",
                lineHeight: 1.85, maxWidth: "560px",
              }}>
                {ach.body}
              </p>
            </div>
          </div>
        </section>
      ))}

      {/* Footer CTA */}
      <div
        className="px-6 md:px-16 py-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
        style={{ background: "#0F1F3D", borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div>
          <div style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(24px, 3vw, 42px)",
            fontWeight: 500, color: "#ffffff", lineHeight: 1.2, marginBottom: "10px",
          }}>
            Ready to work together?
          </div>
          <div style={{
            fontFamily: "var(--font-dm)", fontSize: "15px",
            color: "rgba(255,255,255,0.7)",
          }}>
            Board advisory · Speaking · Africa mission
          </div>
        </div>
        <a
          href={LINKEDIN}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            fontFamily: "var(--font-mono)", fontSize: "13px", color: "#ffffff",
            letterSpacing: "0.16em", textDecoration: "none", flexShrink: 0,
            background: "#1B3A6B", border: "1px solid #1B3A6B", padding: "13px 28px",
          }}
        >
          CONNECT ON LINKEDIN →
        </a>
      </div>
    </main>
  );
}
