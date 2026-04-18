"use client";

import { useEffect, useRef } from "react";

const LINKEDIN = "https://www.linkedin.com/in/yesidekazeem/";

const pillars = [
  {
    num: "01",
    label: "BOARD & GOVERNANCE",
    headline: "Two decades of risk and governance at board level.",
    body: "Independent Non-Executive Director at Tangerine Life Insurance, chairing the Enterprise Risk Management and Technical Committee. Board member of NCGC, the Federal Government-backed institution inaugurated by Vice President Kashim Shettima. Twenty years of P&L ownership, regulatory navigation, and strategic oversight.",
    cta: "ENQUIRE ABOUT BOARD OPPORTUNITIES →",
  },
  {
    num: "02",
    label: "SPEAKING",
    headline: "She speaks from experience, not theory.",
    body: "From the IBW Women in Insurance Summit in London to the COP30 IAA delegation, from SCGN's 20th Annual Conference to the global actuview stage. Corporate governance, African financial systems, women in insurance leadership. The kind of session that changes what people think is possible.",
    cta: "INVITE YESIDE TO SPEAK →",
  },
  {
    num: "03",
    label: "AFRICA MISSION",
    headline: "Co-founder. Architect. Builder.",
    body: "Co-founded the African Actuarial Development Academy, a pan-African body operating in English and French. Technical architect of Nigeria's first mortality table. As President of the Nigerian Actuarial Society, secured IAA Full Member Status for Nigeria, a historic first. Eight markets. One direction.",
    cta: "PARTNER ON THE AFRICA MISSION →",
  },
];

export function WhatSheDoes() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function init() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        // Rule draws in
        gsap.fromTo(".wsd-rule", { scaleX: 0 }, {
          scaleX: 1, duration: 0.9, ease: "power2.inOut",
          scrollTrigger: { trigger: ref.current, start: "top 85%" },
        });

        // Each pillar reveals — staggered with scroll
        pillars.forEach((_, i) => {
          gsap.fromTo(`.wsd-num-${i}`, { opacity: 0 }, {
            opacity: 1, duration: 0.5,
            scrollTrigger: { trigger: `.wsd-pillar-${i}`, start: "top 78%" },
          });
          gsap.fromTo(`.wsd-top-${i}`, { scaleX: 0 }, {
            scaleX: 1, duration: 0.6, ease: "power2.inOut",
            scrollTrigger: { trigger: `.wsd-pillar-${i}`, start: "top 78%" },
          });
          gsap.fromTo(`.wsd-content-${i}`, { opacity: 0, y: 32 }, {
            opacity: 1, y: 0, duration: 0.85, ease: "power2.out",
            delay: 0.1 + i * 0.06,
            scrollTrigger: { trigger: `.wsd-pillar-${i}`, start: "top 78%" },
          });
        });
      }, ref);

      return () => ctx.revert();
    }
    init();
  }, []);

  return (
    <section ref={ref} style={{ background: "#F8F7F4" }}>
      {/* Rule */}
      <div className="wsd-rule px-6 md:px-16" style={{
        height: "1px", background: "rgba(10,10,10,0.07)",
        transformOrigin: "left center", transform: "scaleX(0)",
      }} />

      <div className="px-6 md:px-16 py-20 lg:py-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {pillars.map((p, i) => (
            <div key={i} className={`wsd-pillar-${i}`}>
              {/* Animated top border */}
              <div className={`wsd-top-${i}`} style={{
                height: "1px",
                background: "rgba(10,10,10,0.15)",
                transformOrigin: "left center",
                transform: "scaleX(0)",
                marginBottom: "20px",
              }} />

              <div className={`wsd-content-${i}`} style={{ opacity: 0 }}>
                {/* Small number */}
                <div className={`wsd-num-${i}`} style={{
                  fontFamily: "var(--font-mono)", fontSize: "11px",
                  color: "rgba(10,10,10,0.55)", letterSpacing: "0.2em",
                  marginBottom: "8px", opacity: 0,
                }}>
                  {p.num}
                </div>

                <div style={{
                  fontFamily: "var(--font-mono)", fontSize: "11px",
                  color: "rgba(10,10,10,0.68)", letterSpacing: "0.2em",
                  marginBottom: "20px",
                }}>
                  {p.label}
                </div>

                <h3 style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(24px, 2.8vw, 38px)",
                  fontWeight: 500, color: "#0A0A0A",
                  lineHeight: 1.12, marginBottom: "18px",
                }}>
                  {p.headline}
                </h3>

                <p style={{
                  fontFamily: "var(--font-dm)", fontSize: "15px",
                  color: "rgba(10,10,10,0.82)", lineHeight: 1.82,
                  marginBottom: "28px",
                }}>
                  {p.body}
                </p>

                <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" style={{
                  fontFamily: "var(--font-mono)", fontSize: "11px",
                  color: "#ffffff", letterSpacing: "0.14em",
                  textDecoration: "none",
                  background: "#1B3A6B",
                  border: "1px solid #1B3A6B",
                  padding: "11px 20px",
                  display: "inline-block",
                }}>
                  {p.cta}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
