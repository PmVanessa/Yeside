"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const LINKEDIN = "https://www.linkedin.com/in/yesidekazeem/";

const achievements = [
  {
    index: "01",
    tag: "INSTITUTION BUILDER",
    headline: "Building the infrastructure Africa's actuarial profession needed.",
    body: "Co-founded the African Actuarial Development Academy, a pan-African body created by actuaries in Africa, for actuaries in Africa. Operating in English and French across the continent. Provided technical support for Nigeria's first-ever mortality table. As President of the Nigerian Actuarial Society, secured IAA Full Member Status for Nigeria, a historic milestone.",
    stats: [
      { value: "1st", label: "Mortality table in Nigeria" },
      { value: "IAA", label: "Full membership secured" },
      { value: "2024", label: "AADA co-founded" },
    ],
    bg: "#080808",
  },
  {
    index: "02",
    tag: "BOARD DIRECTOR",
    headline: "Risk. Governance. Strategic oversight at the highest level.",
    body: "Currently serving as Independent Non-Executive Director at Tangerine Life Insurance, chairing the Enterprise Risk Management and Technical Committee, and on Audit and Remuneration Committees. Serves on the inaugural board of NCGC, the Federal Government-backed institution unlocking MSME financing across Nigeria, inaugurated by Vice President Kashim Shettima.",
    stats: [
      { value: "2", label: "Active board seats" },
      { value: "FG", label: "Backed institution" },
      { value: "ERM", label: "Committee chair" },
    ],
    bg: "#0F1F3D",
  },
  {
    index: "03",
    tag: "EXECUTIVE LEADER",
    headline: "40% revenue growth. 2nd fastest growing non-life insurer in Cameroon.",
    body: "As Managing Director of Prudential Beneficial General, led the company to become the 2nd fastest growing non-life insurance firm in Cameroon, with 40% revenue growth in 2021. Progressed from Group CRO to Chief Actuary to Managing Director across Cameroon, Togo, and Côte d'Ivoire, delivering P&L ownership across two markets in a bilingual operating environment.",
    stats: [
      { value: "40%", label: "Revenue growth" },
      { value: "2nd", label: "Fastest growing in Cameroon" },
      { value: "3", label: "Countries led" },
    ],
    bg: "#080808",
  },
  {
    index: "04",
    tag: "RISK ARCHITECT",
    headline: "One Enterprise Risk Framework. Eight African markets.",
    body: "Designed and deployed the Enterprise Risk Management framework across Prudential Africa's entire footprint: Kenya, Ghana, Nigeria, Uganda, Zambia, Cameroon, Togo, and Côte d'Ivoire. A continent-wide governance architecture built from the ground up, ensuring consistent risk standards across eight diverse regulatory environments.",
    stats: [
      { value: "8", label: "Markets covered" },
      { value: "1", label: "Unified ERM framework" },
      { value: "4", label: "Years architecting it" },
    ],
    bg: "#0F1F3D",
  },
  {
    index: "05",
    tag: "GLOBAL VOICE",
    headline: "Representing Africa's actuarial interests on the world stage.",
    body: "Vice Chair of the IAA Africa Subcommittee, representing the continent at the International Actuarial Association. Speaker at IBW Women in Insurance Summit in London, COP30 IAA delegation, SCGN 20th Annual Conference, Convention A, and actuview Speaker of the Month. A consistent voice for African actuarial excellence in global forums.",
    stats: [
      { value: "6+", label: "International stages" },
      { value: "IAA", label: "Vice Chair, Africa" },
      { value: "2", label: "Continents represented" },
    ],
    bg: "#080808",
  },
];

const credentials = ["FIA", "FNAS", "Board Director", "Co-Founder", "Former President NAS", "IAA Vice Chair"];

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function init() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      achievements.forEach((_, i) => {
        gsap.fromTo(`.ach-content-${i}`,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: "power2.out",
            scrollTrigger: { trigger: `.ach-section-${i}`, start: "top 65%" },
          }
        );
        gsap.fromTo(`.ach-stats-${i}`,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.2,
            scrollTrigger: { trigger: `.ach-section-${i}`, start: "top 65%" },
          }
        );
      });
    }
    init();
  }, []);

  return (
    <main ref={pageRef} style={{ background: "#080808" }}>
      {/* Hero */}
      <section
        className="relative w-full flex flex-col justify-end px-6 md:px-16 pt-32 pb-20"
        style={{ minHeight: "65vh", background: "#080808", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* BG watermark */}
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
            fontFamily: "var(--font-mono)", fontSize: "11px",
            color: "rgba(255,255,255,0.55)", letterSpacing: "0.2em", marginBottom: "24px",
          }}>
            ACHIEVEMENTS
          </div>

          <h1 style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(40px, 6.5vw, 88px)",
            fontWeight: 600, color: "#ffffff",
            lineHeight: 1.0, letterSpacing: "-0.02em",
            marginBottom: "36px",
          }}>
            A track record<br />
            that speaks<br />
            for itself.
          </h1>

          {/* Credentials */}
          <div className="flex flex-wrap gap-3">
            {credentials.map((c, i) => (
              <span key={i} style={{
                fontFamily: "var(--font-mono)", fontSize: "11px",
                color: "rgba(255,255,255,0.7)", letterSpacing: "0.14em",
                border: "1px solid rgba(255,255,255,0.3)",
                padding: "6px 14px", borderRadius: "2px",
              }}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers strip */}
      <div className="px-6 md:px-16 py-12" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "#0F1F3D" }}>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {[
            { n: "20+", l: "YEARS" },
            { n: "10", l: "ROLES" },
            { n: "8", l: "MARKETS" },
            { n: "3", l: "COUNTRIES" },
            { n: "2", l: "CONTINENTS" },
            { n: "1", l: "DIRECTION" },
          ].map((s, i) => (
            <div key={i}>
              <div style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(36px, 4vw, 52px)",
                fontWeight: 600, color: "#ffffff", lineHeight: 1,
              }}>
                {s.n}
              </div>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: "11px",
                color: "rgba(255,255,255,0.6)", letterSpacing: "0.18em", marginTop: "8px",
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
          style={{
            background: ach.bg,
            borderBottom: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
            {/* Left: index + stats */}
            <div className={`ach-stats-${i} flex-shrink-0 lg:w-64`} style={{ opacity: 0 }}>
              <div style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(80px, 10vw, 130px)",
                fontWeight: 700, color: "rgba(255,255,255,0.06)",
                lineHeight: 1,
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
                      fontFamily: "var(--font-mono)", fontSize: "11px",
                      color: "rgba(255,255,255,0.6)", letterSpacing: "0.14em",
                      marginTop: "6px",
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
                fontFamily: "var(--font-mono)", fontSize: "11px",
                color: "rgba(255,255,255,0.55)", letterSpacing: "0.2em", marginBottom: "20px",
              }}>
                {ach.tag}
              </div>
              <h2 style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(26px, 3.8vw, 52px)",
                fontWeight: 600, color: "#ffffff",
                lineHeight: 1.1, marginBottom: "28px",
                maxWidth: "620px",
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
            color: "rgba(255,255,255,0.6)",
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
            fontFamily: "var(--font-mono)", fontSize: "12px", color: "#ffffff",
            letterSpacing: "0.16em", textDecoration: "none", flexShrink: 0,
            background: "#1B3A6B",
            border: "1px solid #1B3A6B",
            padding: "13px 28px",
          }}
        >
          CONNECT ON LINKEDIN →
        </a>
      </div>
    </main>
  );
}
