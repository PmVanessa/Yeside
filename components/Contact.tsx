"use client";

import { useEffect, useRef } from "react";
import { LINKEDIN } from "@/data/home";
import { getGsap } from "@/lib/gsap";

const pillars = [
  {
    label: "SPEAKING",
    lines: ["Keynotes. Panels. Summits.", "Corporate governance.", "African financial systems.", "Women in leadership."],
  },
  {
    label: "BOARD & ADVISORY",
    lines: ["Independent Non-Executive Director.", "Risk. Governance.", "Strategic oversight."],
  },
  {
    label: "AFRICA MISSION",
    lines: ["AADA collaboration.", "Actuarial capacity building.", "Pan-African partnerships."],
  },
];

export function Contact() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    async function init() {
      const { gsap } = await getGsap();

      ctx = gsap.context(() => {
        gsap.fromTo(".ct-name", { opacity: 0, y: 80, scale: 0.96 }, {
          opacity: 1, y: 0, scale: 1, duration: 1.4, ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current, start: "top 80%",
            toggleActions: "play none none reset",
          },
        });
        gsap.fromTo(".ct-sub", { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: {
            trigger: ".ct-sub", start: "top 85%",
            toggleActions: "play none none reset",
          },
        });
        gsap.fromTo(".ct-col", { opacity: 0, y: 28 }, {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power2.out",
          scrollTrigger: {
            trigger: ".ct-col", start: "top 88%",
            toggleActions: "play none none reset",
          },
        });
        gsap.fromTo(".ct-bottom", { opacity: 0 }, {
          opacity: 1, duration: 0.7,
          scrollTrigger: {
            trigger: ".ct-bottom", start: "top 92%",
            toggleActions: "play none none reset",
          },
        });
        // Parallax — scrub handles bidirectional automatically
        gsap.to(".ct-name", {
          y: -40, ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top", end: "bottom top",
            scrub: 2,
          },
        });
      }, ref);
    }

    init();

    return () => { ctx?.revert(); };
  }, []);

  return (
    <footer
      id="contact"
      ref={ref}
      className="w-full min-h-screen flex flex-col justify-between px-6 md:px-16 py-20"
      style={{ background: "#0C0907", overflow: "hidden" }}
    >
      {/* Name */}
      <div>
        <div className="ct-name" style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(72px, 13vw, 180px)",
          fontWeight: 600, color: "#ffffff",
          lineHeight: 0.86, letterSpacing: "-0.03em",
          marginBottom: "44px", opacity: 0,
        }}>
          YESIDE<br />KAZEEM
        </div>

        <p className="ct-sub" style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "var(--text-statement)",
          fontStyle: "italic", fontWeight: 400,
          color: "rgba(255,255,255,0.70)",
          maxWidth: "520px", lineHeight: "var(--leading-snug)",
          opacity: 0,
        }}>
          Building what matters, wherever it needs to be built.
        </p>
      </div>

      {/* Three pillars — content, no CTAs, no borders between them */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-16">
        {pillars.map((col, i) => (
          <div key={i} className="ct-col" style={{ opacity: 0 }}>
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: "var(--text-label)",
              color: "#B5892B", letterSpacing: "var(--tracking-wide)",
              marginBottom: "20px",
            }}>
              {col.label}
            </div>
            {col.lines.map((line, j) => (
              <div key={j} style={{
                fontFamily: "var(--font-dm)", fontSize: "var(--text-body)",
                color: "rgba(255,255,255,0.68)", lineHeight: "var(--leading-normal)",
              }}>
                {line}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom — one CTA, coordinates */}
      <div className="ct-bottom flex flex-col md:flex-row md:items-end justify-between gap-6" style={{ opacity: 0 }}>
        <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" style={{
          fontFamily: "var(--font-mono)", fontSize: "var(--text-label)",
          color: "#0C0907", letterSpacing: "var(--tracking-label)",
          textDecoration: "none", display: "inline-block",
          background: "#B5892B",
          padding: "15px 36px",
        }}>
          CONNECT ON LINKEDIN →
        </a>

        <div style={{
          fontFamily: "var(--font-mono)", fontSize: "var(--text-label)",
          color: "rgba(255,255,255,0.72)", letterSpacing: "0.08em",
          textAlign: "right", lineHeight: "var(--leading-loose)",
        }}>
          51.5074°N, 0.1278°W · LONDON<br />
          6.5244°N, 3.3792°E · LAGOS
        </div>
      </div>
    </footer>
  );
}
