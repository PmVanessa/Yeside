"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const LINKEDIN = "https://www.linkedin.com/in/yesidekazeem/";

const stages = [
  { name: "COP30", org: "International Actuarial Association", year: "2025" },
  { name: "SCGN 20th Annual Conference", org: "Society for Corporate Governance Nigeria", year: "2025" },
  { name: "IBW Women in Insurance Summit", org: "Insurance Business Women, London", year: "2024" },
  { name: "Convention A | Africa", org: "Global Actuarial Community", year: "2025" },
  { name: "Corporate Awards", org: "De Vere Grand Connaught Rooms, London", year: "2024" },
  { name: "actuview Speaker of the Month", org: "January 2025", year: "2025" },
];

export function SpeakingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function init() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.fromTo(".speak-content",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: "power2.out",
            scrollTrigger: { trigger: ".speak-content", start: "top 75%" } }
        );
        gsap.fromTo(".stage-row",
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, stagger: 0.07, duration: 0.6, ease: "power2.out",
            scrollTrigger: { trigger: ".stage-row", start: "top 80%" } }
        );
      }, sectionRef);

      return () => ctx.revert();
    }
    init();
  }, []);

  return (
    <section
      id="speaking"
      ref={sectionRef}
      className="w-full relative overflow-hidden"
      style={{ background: "#0A0A0A", scrollMarginTop: "0px" }}
    >
      {/* Full-bleed IBW flyer — right side */}
      <div className="hidden lg:block absolute right-0 top-0 bottom-0" style={{ width: "42%" }}>
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <Image
            src="/images/flyer-ibw.jpg"
            alt="IBW Women in Insurance Summit — Yeside Kazeem"
            fill
            sizes="42vw"
            className="object-cover object-top"
            style={{ filter: "grayscale(15%)" }}
          />
          {/* Left fade */}
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to right, rgba(10,10,10,1) 0%, rgba(10,10,10,0.6) 30%, rgba(10,10,10,0) 70%)"
          }} />
        </div>
      </div>

      <div className="relative z-10 px-6 md:px-16 py-24 lg:w-[62%]">
        {/* Label */}
        <div className="flex items-center gap-4 mb-16" style={{
          fontFamily: "var(--font-mono)", fontSize: "9px",
          color: "rgba(255,255,255,0.35)", letterSpacing: "0.22em",
        }}>
          <div style={{ width: "40px", height: "1px", background: "rgba(255,255,255,0.35)" }} />
          02 · SPEAKING &amp; THOUGHT LEADERSHIP
        </div>

        <h2
          className="speak-content"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(38px, 5vw, 68px)",
            fontWeight: 500,
            color: "#ffffff",
            lineHeight: 1.1,
            marginBottom: "24px",
            maxWidth: "620px",
            opacity: 0,
          }}
        >
          On the stages where Africa&apos;s future gets decided.
        </h2>

        <p
          className="speak-content"
          style={{
            fontFamily: "var(--font-dm)",
            fontSize: "clamp(14px, 1.3vw, 17px)",
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.85,
            marginBottom: "48px",
            maxWidth: "500px",
            opacity: 0,
          }}
        >
          From COP30 to corporate governance conferences, Yeside brings the rare combination of technical precision and continent-level perspective to every stage.
        </p>

        {/* Stage list */}
        <div className="mb-12 speak-content" style={{ opacity: 0 }}>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: "8px",
            color: "rgba(255,255,255,0.2)", letterSpacing: "0.22em", marginBottom: "16px",
          }}>
            RECENT STAGES
          </div>
          <div>
            {stages.map((s, i) => (
              <div key={i} className="stage-row flex items-start gap-4 py-3 opacity-0" style={{
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}>
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: "9px",
                  color: "rgba(255,255,255,0.2)", minWidth: "34px", paddingTop: "2px",
                }}>{s.year}</span>
                <div>
                  <div style={{ fontFamily: "var(--font-dm)", fontSize: "14px", color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>{s.name}</div>
                  <div style={{ fontFamily: "var(--font-dm)", fontSize: "12px", color: "rgba(255,255,255,0.3)", marginTop: "2px" }}>{s.org}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" style={{
          display: "inline-flex", alignItems: "center", gap: "10px",
          fontFamily: "var(--font-mono)", fontSize: "10px", color: "#ffffff",
          letterSpacing: "0.18em", borderBottom: "1px solid rgba(255,255,255,0.4)",
          paddingBottom: "3px", textDecoration: "none",
        }}>
          BOOK YESIDE TO SPEAK →
        </a>
      </div>
    </section>
  );
}
