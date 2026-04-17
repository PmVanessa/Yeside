"use client";

import { useEffect, useRef } from "react";

const stops = [
  { year: "2004", city: "LONDON", org: "Deloitte UK", role: "Manager, Actuarial", impact: "Pensions, investment and life assurance. Valuation, M&A, audit support", coords: "51.5074°N, 0.1278°W" },
  { year: "2014", city: "LAGOS", org: "Old Mutual Nigeria", role: "Actuarial Executive", impact: "Life assurance, building Nigeria's early actuarial practice", coords: "6.5244°N, 3.3792°E" },
  { year: "2016", city: "NAIROBI", org: "Prudential Africa", role: "Senior Business Development", impact: "Enterprise Risk Framework across eight African markets", coords: "1.2921°S, 36.8219°E" },
  { year: "2019", city: "DOUALA", org: "Prudential Beneficial Group", role: "Group CRO & Chief Actuary", impact: "Risk architecture across Cameroon, Togo, Côte d'Ivoire", coords: "4.0511°N, 9.7679°E" },
  { year: "2020", city: "DOUALA", org: "Prudential Beneficial General", role: "Managing Director", impact: "2nd fastest growing non-life firm in Cameroon. 40% growth in 2021", coords: "4.0511°N, 9.7679°E" },
  { year: "2017", city: "LAGOS", org: "Nigerian Actuarial Society", role: "President", impact: "Achieved IAA full member status. Exponential membership growth.", coords: "6.5244°N, 3.3792°E" },
  { year: "2022", city: "GLOBAL", org: "International Actuarial Assoc.", role: "Vice Chair, Africa Subcommittee", impact: "Continental actuarial development at global scale", coords: "CONTINENTAL" },
  { year: "2023", city: "LAGOS", org: "Tangerine Life Insurance", role: "Independent Non-Executive Director", impact: "Chairs ERM & Technical Committee. Audit & Remuneration Committees.", coords: "6.5244°N, 3.3792°E" },
  { year: "2024", city: "LONDON", org: "AADA", role: "Co-Founder", impact: "Pan-African body developing the next generation of actuaries", coords: "CONTINENTAL" },
  { year: "2025", city: "ABUJA", org: "NCGC", role: "Independent Non-Executive Director", impact: "FG-backed institution unlocking MSME financing", coords: "9.0765°N, 7.3986°E" },
];

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function init() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (window.innerWidth < 768) return;

      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) return;

      const getDistance = () => track.scrollWidth - container.offsetWidth;

      const ctx = gsap.context(() => {
        gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: () => `+=${getDistance() + 200}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Draw the line
        const path = document.querySelector(".timeline-path") as SVGPathElement;
        if (path) {
          const length = path.getTotalLength();
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
          gsap.to(path, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top top",
              end: () => `+=${getDistance() + 200}`,
              scrub: 1,
            },
          });
        }

        // All cards start visible at 70% — fade to full on scroll into position
        stops.forEach((_, i) => {
          gsap.set(`.tl-card-${i}`, { opacity: 0.5, y: 16 });
          gsap.to(`.tl-card-${i}`, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: container,
              start: () => `top+=${i * (getDistance() / (stops.length + 1)) * 0.85} top`,
              toggleActions: "play none none reverse",
            },
          });
        });
      }, container);

      return () => ctx.revert();
    }

    init();
  }, []);

  return (
    <section style={{ background: "#ffffff", borderTop: "1px solid rgba(27,58,107,0.08)" }}>
      {/* Header */}
      <div className="px-6 md:px-16 pt-20 pb-8 flex items-center gap-4" style={{
        fontFamily: "var(--font-mono)", fontSize: "9px", color: "#1B3A6B", letterSpacing: "0.22em",
      }}>
        <div style={{ width: "40px", height: "1px", background: "#1B3A6B" }} />
        THE JOURNEY · LONDON TO CONTINENTAL AFRICA
      </div>

      {/* Mobile */}
      <div className="md:hidden px-6 pb-16">
        <div style={{ borderLeft: "1px solid rgba(27,58,107,0.15)", paddingLeft: "24px" }}>
          {stops.map((stop, i) => (
            <div key={i} className="relative mb-12">
              <div style={{ position: "absolute", left: "-29px", top: "6px", width: "8px", height: "8px", borderRadius: "50%", background: "#1B3A6B" }} />
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "#1B3A6B", letterSpacing: "0.15em", marginBottom: "6px" }}>{stop.city} · {stop.year}</div>
              <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "20px", fontWeight: 600, color: "#0A0A0A", lineHeight: 1.2, marginBottom: "4px" }}>{stop.org}</div>
              <div style={{ fontFamily: "var(--font-dm)", fontSize: "12px", color: "#1B3A6B", fontWeight: 500, marginBottom: "6px" }}>{stop.role}</div>
              <div style={{ fontFamily: "var(--font-dm)", fontSize: "12px", color: "rgba(10,10,10,0.5)", lineHeight: 1.6 }}>{stop.impact}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop pinned */}
      <div ref={containerRef} className="hidden md:block w-full overflow-hidden" style={{ height: "70vh" }}>
        <div ref={trackRef} className="flex h-full" style={{ width: `${stops.length * 400 + 280}px`, willChange: "transform" }}>
          <div style={{ width: "80px", flexShrink: 0 }} />

          {/* SVG line */}
          <div className="absolute" style={{ top: "50%", left: 0, width: `${stops.length * 400 + 280}px`, pointerEvents: "none", zIndex: 0 }}>
            <svg width={`${stops.length * 400 + 280}`} height="2" style={{ overflow: "visible" }}>
              <path
                className="timeline-path"
                d={`M 80 0 H ${stops.length * 400 + 200}`}
                stroke="#1B3A6B"
                strokeWidth="1"
                fill="none"
                opacity="0.25"
              />
            </svg>
          </div>

          {stops.map((stop, i) => (
            <div
              key={i}
              className={`tl-card-${i} flex flex-col justify-center relative`}
              style={{ width: "360px", flexShrink: 0, paddingLeft: "36px", paddingRight: "36px", opacity: 0.5 }}
            >
              {/* Year watermark */}
              <div style={{
                fontFamily: "var(--font-cormorant)", fontSize: "110px", fontWeight: 600,
                color: "#0A0A0A", opacity: 0.035, position: "absolute", top: "50%", left: "24px",
                transform: "translateY(-58%)", lineHeight: 1, userSelect: "none", pointerEvents: "none",
              }}>
                {stop.year}
              </div>

              {/* Dot */}
              <div style={{
                position: "absolute", top: "50%", left: "0px",
                width: "8px", height: "8px", borderRadius: "50%", background: "#1B3A6B",
                transform: "translate(-50%, -50%)", zIndex: 2,
              }} />

              {/* Content */}
              <div className="relative z-10 mt-12">
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "#1B3A6B", letterSpacing: "0.15em", marginBottom: "8px" }}>
                  {stop.city} · {stop.year}
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "8px", color: "rgba(27,58,107,0.4)", letterSpacing: "0.1em", marginBottom: "12px" }}>
                  {stop.coords}
                </div>
                <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "22px", fontWeight: 600, color: "#0A0A0A", lineHeight: 1.2, marginBottom: "6px" }}>
                  {stop.org}
                </div>
                <div style={{ fontFamily: "var(--font-dm)", fontSize: "12px", color: "#1B3A6B", fontWeight: 500, marginBottom: "10px", letterSpacing: "0.02em" }}>
                  {stop.role}
                </div>
                <div style={{ fontFamily: "var(--font-dm)", fontSize: "12px", color: "rgba(10,10,10,0.5)", lineHeight: 1.65, maxWidth: "260px" }}>
                  {stop.impact}
                </div>
              </div>
            </div>
          ))}

          <div style={{ width: "200px", flexShrink: 0 }} />
        </div>
      </div>
    </section>
  );
}
