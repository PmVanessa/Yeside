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
        gsap.fromTo(".sm-stat", { opacity: 0, y: 32 }, {
          opacity: 1, y: 0,
          duration: 0.9, stagger: 0.15, ease: "power3.out",
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
        padding: "clamp(64px, 10vh, 112px) 0",
      }}
    >
      <div
        className="px-6 md:px-16"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "clamp(24px, 4vw, 56px)",
        }}
      >
        {stats.map((s, i) => (
          <div
            key={i}
            className="sm-stat"
            style={{ opacity: 0 }}
          >
            {/* Number */}
            <div style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(56px, 7vw, 120px)",
              fontWeight: 600,
              color: "#B5892B",
              lineHeight: 0.88,
              marginBottom: "14px",
            }}>
              {s.n}
            </div>

            {/* Label */}
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-label)",
              color: "rgba(255,255,255,0.85)",
              letterSpacing: "var(--tracking-wide)",
              marginBottom: "8px",
            }}>
              {s.label}
            </div>

            {/* Context */}
            <div style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(16px, 1.6vw, 22px)",
              fontStyle: "italic",
              color: "rgba(255,255,255,0.60)",
              lineHeight: "var(--leading-snug)",
            }}>
              {s.context}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
