"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const LINKEDIN = "https://www.linkedin.com/in/yesidekazeem/";

export function BoardSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function init() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.fromTo(".board-text",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, ease: "power2.out",
            scrollTrigger: { trigger: ".board-text", start: "top 75%" } }
        );
        gsap.fromTo(".board-card",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.12, duration: 0.8, ease: "power2.out",
            scrollTrigger: { trigger: ".board-card", start: "top 80%" } }
        );
      }, sectionRef);

      return () => ctx.revert();
    }
    init();
  }, []);

  return (
    <section
      id="board"
      ref={sectionRef}
      className="w-full relative overflow-hidden"
      style={{ background: "#ffffff", scrollMarginTop: "0px" }}
    >
      {/* Top label bar */}
      <div
        className="px-6 md:px-16 pt-20 pb-6 flex items-center gap-4"
        style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "#1B3A6B", letterSpacing: "0.22em" }}
      >
        <div style={{ width: "40px", height: "1px", background: "#1B3A6B" }} />
        01 · BOARD &amp; ADVISORY
      </div>

      {/* Hero image — full bleed top */}
      <div className="relative w-full" style={{ height: "55vh", minHeight: "400px" }}>
        <Image
          src="/images/flyer-scgn.jpg"
          alt="SCGN 20th Anniversary Corporate Governance Conference"
          fill
          sizes="100vw"
          className="object-cover object-top"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to right, rgba(255,255,255,0) 50%, rgba(255,255,255,0) 100%)"
        }} />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 40%)"
        }} />
        {/* Text overlaid on image */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 pb-10">
          <h2
            className="board-text"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(36px, 5vw, 68px)",
              fontWeight: 500,
              color: "#0A0A0A",
              lineHeight: 1.1,
              maxWidth: "700px",
              opacity: 0,
            }}
          >
            Two decades of board-level risk, governance, and strategic oversight.
          </h2>
        </div>
      </div>

      {/* Content below */}
      <div className="px-6 md:px-16 py-16 flex flex-col lg:flex-row gap-16">
        {/* Left — copy */}
        <div className="flex-1 board-text" style={{ opacity: 0 }}>
          <p style={{
            fontFamily: "var(--font-dm)",
            fontSize: "clamp(15px, 1.4vw, 18px)",
            color: "rgba(10,10,10,0.65)",
            lineHeight: 1.85,
            marginBottom: "40px",
            maxWidth: "560px",
          }}>
            Currently serving as Independent Non-Executive Director at Tangerine Life Insurance, chairing the Enterprise Risk Management and Technical Committee, and at NCGC, the FG-backed institution unlocking MSME financing across Nigeria, inaugurated by VP Kashim Shettima.
          </p>

          <div className="grid grid-cols-1 gap-3 mb-12" style={{ maxWidth: "520px" }}>
            {[
              { org: "Tangerine Life Insurance", role: "Independent Non-Executive Director", detail: "Chairs ERM & Technical Committee · Audit & Remuneration" },
              { org: "NCGC, National Credit Guarantee Co.", role: "Independent Non-Executive Director", detail: "FG-backed · Inaugurated by VP Kashim Shettima" },
              { org: "Prudential Beneficial Group", role: "Group CRO → Chief Actuary → Managing Director", detail: "Cameroon · Togo · Côte d'Ivoire · 40% growth" },
            ].map((card, i) => (
              <div key={i} className="board-card" style={{
                borderLeft: "2px solid #1B3A6B",
                paddingLeft: "20px",
                paddingTop: "12px",
                paddingBottom: "12px",
                opacity: 0,
              }}>
                <div style={{ fontFamily: "var(--font-dm)", fontSize: "14px", fontWeight: 600, color: "#0A0A0A", marginBottom: "3px" }}>{card.org}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "#1B3A6B", letterSpacing: "0.1em", marginBottom: "5px" }}>{card.role}</div>
                <div style={{ fontFamily: "var(--font-dm)", fontSize: "12px", color: "rgba(10,10,10,0.45)" }}>{card.detail}</div>
              </div>
            ))}
          </div>

          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            fontFamily: "var(--font-mono)", fontSize: "10px", color: "#0A0A0A",
            letterSpacing: "0.15em", borderBottom: "1px solid #0A0A0A",
            paddingBottom: "3px", textDecoration: "none",
          }}>
            GET IN TOUCH ABOUT BOARD OPPORTUNITIES →
          </a>
        </div>

        {/* Right — speakers flyer */}
        <div className="lg:w-[360px] shrink-0">
          <div style={{ borderRadius: "4px", overflow: "hidden", boxShadow: "0 20px 60px rgba(27,58,107,0.15)" }}>
            <Image
              src="/images/flyer-speakers.jpg"
              alt="Meet our Speakers — Yeside Kazeem"
              width={360}
              height={220}
              style={{ display: "block", width: "100%", height: "auto" }}
            />
          </div>
          <div style={{
            marginTop: "16px",
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            color: "rgba(10,10,10,0.3)",
            letterSpacing: "0.15em",
          }}>
            SCGN 20TH ANNIVERSARY · CORPORATE GOVERNANCE CONFERENCE · 2025
          </div>
        </div>
      </div>
    </section>
  );
}
