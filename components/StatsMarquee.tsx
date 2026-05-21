"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";

const stats = [
  { n: "20+", label: "YEARS",   context: "Two continents. One direction." },
  { n: "12+", label: "ROLES",   context: "From analyst to board director." },
  { n: "8",   label: "MARKETS", context: "Entered on purpose." },
];

export function StatsMarquee() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    async function init() {
      const { gsap } = await getGsap();

      ctx = gsap.context(() => {
        gsap.fromTo(".sm-stat", { opacity: 0, x: -24 }, {
          opacity: 1, x: 0,
          duration: 1, stagger: 0.2, ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current, start: "top 78%",
            toggleActions: "play none none reset",
          },
        });
      }, ref);
    }

    init();

    return () => { ctx?.revert(); };
  }, []);

  return (
    <section
      ref={ref}
      style={{
        background: "#0F1F3D",
        padding: "clamp(80px, 12vh, 140px) 0",
      }}
    >
      <div className="px-6 md:px-16">
        {stats.map((s, i) => (
          <div
            key={i}
            className="sm-stat"
            style={{
              opacity: 0,
              display: "flex",
              alignItems: "baseline",
              gap: "clamp(24px, 4vw, 64px)",
              paddingBottom: i < stats.length - 1 ? "clamp(40px, 6vh, 72px)" : "0",
              marginBottom: i < stats.length - 1 ? "clamp(40px, 6vh, 72px)" : "0",
              borderBottom: "none",
            }}
          >
            {/* The number — brass, large enough to stop you */}
            <div style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(80px, 11vw, 160px)",
              fontWeight: 600,
              color: "#B5892B",
              lineHeight: 0.88,
              flexShrink: 0,
              minWidth: "clamp(140px, 16vw, 260px)",
            }}>
              {s.n}
            </div>

            {/* Label + context — anchored to the number baseline */}
            <div>
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-label)",
                color: "rgba(255,255,255,0.85)",
                letterSpacing: "var(--tracking-wide)",
                marginBottom: "10px",
              }}>
                {s.label}
              </div>
              <div style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "var(--text-lead)",
                fontStyle: "italic",
                color: "rgba(255,255,255,0.72)",
                lineHeight: "var(--leading-snug)",
              }}>
                {s.context}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
