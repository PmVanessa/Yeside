"use client";

import { useEffect, useRef } from "react";

const stats = [
  { value: 20, suffix: "+", label: "YEARS" },
  { value: 10, suffix: "", label: "ROLES" },
  { value: 8, suffix: "", label: "MARKETS" },
  { value: 3, suffix: "", label: "COUNTRIES" },
  { value: 2, suffix: "", label: "CONTINENTS" },
  { value: 1, suffix: "", label: "INSTITUTION" },
];

export function Numbers() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function init() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        stats.forEach((stat, i) => {
          const numEl = document.querySelector(`.num-val-${i}`);
          if (!numEl) return;

          const obj = { val: 0 };
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
            onEnter: () => {
              gsap.to(obj, {
                val: stat.value,
                duration: 2.2,
                delay: i * 0.08,
                ease: "power2.out",
                onUpdate: () => {
                  numEl.textContent =
                    Math.ceil(obj.val) + stat.suffix;
                },
              });
            },
          });
        });

        // Fade in labels
        gsap.fromTo(
          ".num-label",
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              once: true,
            },
          }
        );
      }, sectionRef);

      return () => ctx.revert();
    }
    init();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-28 px-6 md:px-16"
      style={{
        background: "#ffffff",
        borderTop: "1px solid rgba(27,58,107,0.08)",
        borderBottom: "1px solid rgba(27,58,107,0.08)",
      }}
    >
      {/* Section label */}
      <div
        className="mb-16 flex items-center gap-4"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "10px",
          color: "#1B3A6B",
          letterSpacing: "0.2em",
        }}
      >
        <div style={{ width: "48px", height: "1px", background: "#1B3A6B" }} />
        IN NUMBERS
      </div>

      {/* Grid */}
      <div
        className="grid grid-cols-3 md:grid-cols-6 gap-x-0 gap-y-16"
      >
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col">
            {/* The number */}
            <div
              className={`num-val-${i}`}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(48px, 6vw, 96px)",
                fontWeight: 700,
                color: "#0A0A0A",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              0{stat.suffix}
            </div>

            {/* Label */}
            <div
              className="num-label mt-3"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                color: "#1B3A6B",
                letterSpacing: "0.2em",
                opacity: 0,
              }}
            >
              {stat.label}
            </div>

            {/* Underline accent */}
            <div
              style={{
                width: "24px",
                height: "1px",
                background: "#1B3A6B",
                marginTop: "8px",
                opacity: 0.4,
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
