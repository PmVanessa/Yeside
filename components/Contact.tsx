"use client";

import { useEffect, useRef } from "react";

const LINKEDIN = "https://www.linkedin.com/in/yesidekazeem/";

export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function init() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.fromTo(".contact-name",
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
        );
        gsap.fromTo(".contact-col",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power2.out",
            scrollTrigger: { trigger: ".contact-col", start: "top 85%" } }
        );
      }, sectionRef);

      return () => ctx.revert();
    }
    init();
  }, []);

  return (
    <footer
      ref={sectionRef}
      className="w-full min-h-screen flex flex-col justify-between px-8 md:px-16 lg:px-24 py-20"
      style={{ background: "#080808" }}
    >
      {/* Top */}
      <div>
        <div
          className="contact-name opacity-0"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(72px, 12vw, 160px)",
            fontWeight: 600,
            color: "#ffffff",
            lineHeight: 0.88,
            letterSpacing: "-0.03em",
            marginBottom: "40px",
          }}
        >
          YESIDE<br />KAZEEM
        </div>

        <p
          className="contact-name opacity-0"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(18px, 2vw, 26px)",
            fontStyle: "italic",
            color: "rgba(255,255,255,0.4)",
            fontWeight: 300,
            maxWidth: "480px",
            lineHeight: 1.5,
          }}
        >
          Building what matters, wherever it needs to be built.
        </p>
      </div>

      {/* Middle */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-20 border-t border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        {[
          {
            label: "BOARD & ADVISORY",
            lines: ["Independent Non-Executive Director", "Risk & Governance expertise", "20+ years of strategic oversight"],
          },
          {
            label: "SPEAKING",
            lines: ["Corporate Governance", "African Financial Systems", "Women in Insurance Leadership"],
          },
          {
            label: "AFRICA MISSION",
            lines: ["AADA collaboration", "Actuarial capacity building", "Pan-African partnerships"],
          },
        ].map((col, i) => (
          <div key={i} className="contact-col opacity-0">
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "8px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.22em", marginBottom: "18px" }}>
              {col.label}
            </div>
            <div className="space-y-2 mb-8">
              {col.lines.map((line, j) => (
                <div key={j} style={{ fontFamily: "var(--font-dm)", fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
                  {line}
                </div>
              ))}
            </div>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" style={{
              fontFamily: "var(--font-mono)", fontSize: "9px", color: "rgba(255,255,255,0.35)",
              letterSpacing: "0.15em", borderBottom: "1px solid rgba(255,255,255,0.15)",
              paddingBottom: "2px", textDecoration: "none",
            }}>
              GET IN TOUCH →
            </a>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "8px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.22em", marginBottom: "8px" }}>
            CONNECT
          </div>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" style={{
            fontFamily: "var(--font-mono)", fontSize: "12px", color: "rgba(255,255,255,0.6)",
            letterSpacing: "0.1em", textDecoration: "none",
            borderBottom: "1px solid rgba(255,255,255,0.15)", paddingBottom: "2px",
          }}>
            linkedin.com/in/yesidekazeem
          </a>
        </div>

        <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "rgba(255,255,255,0.12)", letterSpacing: "0.12em", textAlign: "right" }}>
          51.5074°N, 0.1278°W — LONDON<br />
          6.5244°N, 3.3792°E — LAGOS
        </div>
      </div>
    </footer>
  );
}
