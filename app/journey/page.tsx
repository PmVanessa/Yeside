"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { stops } from "@/data/journey";

const orderedStops = [...stops].reverse();

export default function JourneyPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStop, setActiveStop] = useState(0);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const ctxs: { revert: () => void }[] = [];

    async function init() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      orderedStops.forEach((_, i) => {
        const ctx = gsap.context(() => {
          gsap.fromTo(`.stop-content-${i}`,
            { opacity: 0, y: 32 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
              scrollTrigger: { trigger: `.stop-section-${i}`, start: "top 62%" } }
          );
          ScrollTrigger.create({
            trigger: `.stop-section-${i}`,
            start: "top 50%",
            end: "bottom 50%",
            onEnter: () => setActiveStop(i),
            onEnterBack: () => setActiveStop(i),
          });
        });
        ctxs.push(ctx);
      });
    }

    init();
    return () => ctxs.forEach(ctx => ctx.revert());
  }, []);

  return (
    <main ref={containerRef} style={{ background: "#080808" }}>

      {/* Desktop dot nav */}
      <div className="hidden md:flex fixed right-6 top-1/2 z-50 flex-col gap-3"
        style={{ transform: "translateY(-50%)" }}>
        {orderedStops.map((s, i) => (
          <a
            key={i}
            href={`#stop-${i}`}
            title={`${s.year} · ${s.org}`}
            style={{
              display: "block", width: "6px", height: "6px", borderRadius: "50%",
              background: activeStop === i ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.2)",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.7)")}
            onMouseLeave={e => (e.currentTarget.style.background = activeStop === i ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.2)")}
          />
        ))}
      </div>

      {/* Mobile sticky indicator */}
      <div className="md:hidden fixed bottom-6 left-1/2 z-50"
        style={{ transform: "translateX(-50%)" }}>
        <button
          onClick={() => setMobileNavOpen(v => !v)}
          style={{
            fontFamily: "var(--font-mono)", fontSize: "12px",
            color: "#ffffff", letterSpacing: "0.16em",
            background: "rgba(27,58,107,0.95)",
            border: "1px solid rgba(255,255,255,0.15)",
            padding: "10px 20px", cursor: "pointer",
            backdropFilter: "blur(8px)",
          }}
        >
          {orderedStops[activeStop]?.year} · {orderedStops[activeStop]?.city} ↑
        </button>
        {mobileNavOpen && (
          <div style={{
            position: "absolute", bottom: "100%", left: "50%",
            transform: "translateX(-50%)", marginBottom: "8px",
            background: "rgba(8,8,8,0.97)", border: "1px solid rgba(255,255,255,0.08)",
            padding: "8px 0", backdropFilter: "blur(12px)", minWidth: "220px",
          }}>
            {orderedStops.map((s, i) => (
              <a
                key={i}
                href={`#stop-${i}`}
                onClick={() => setMobileNavOpen(false)}
                style={{
                  display: "block", padding: "10px 20px",
                  fontFamily: "var(--font-mono)", fontSize: "12px",
                  color: activeStop === i ? "#ffffff" : "rgba(255,255,255,0.5)",
                  letterSpacing: "0.14em", textDecoration: "none",
                  background: activeStop === i ? "rgba(27,58,107,0.4)" : "transparent",
                }}
              >
                {s.year} · {s.org}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Stops */}
      {orderedStops.map((stop, i) => (
        <section
          key={i}
          id={`stop-${i}`}
          className={`stop-section-${i} relative w-full flex items-center`}
          style={{
            minHeight: "100vh",
            background: stop.bg,
            borderBottom: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <div className="relative z-10 w-full px-6 md:px-16 pt-28 pb-20">
            <div
              className={`stop-content-${i} flex flex-col lg:flex-row gap-10 lg:gap-20`}
              style={{ opacity: 0 }}
            >
              {/* Year + location */}
              <div className="flex-shrink-0 lg:w-44">
                <div style={{
                  fontFamily: "var(--font-mono)", fontSize: "13px",
                  color: stop.accent, letterSpacing: "0.2em", marginBottom: "10px",
                }}>
                  {stop.year}
                </div>
                <div style={{
                  fontFamily: "var(--font-mono)", fontSize: "11px",
                  color: "rgba(255,255,255,0.45)", letterSpacing: "0.16em",
                  lineHeight: 1.7,
                }}>
                  {stop.city}<br />{stop.country}
                </div>
              </div>

              {/* Company, role, bullets */}
              <div className="flex-1" style={{ maxWidth: "640px" }}>
                <h2 style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(32px, 4.5vw, 60px)",
                  fontWeight: 600, color: "#ffffff",
                  lineHeight: 1.05, marginBottom: "12px",
                }}>
                  {stop.org}
                </h2>

                <div style={{
                  fontFamily: "var(--font-mono)", fontSize: "12px",
                  color: "rgba(255,255,255,0.55)", letterSpacing: "0.16em",
                  textTransform: "uppercase", marginBottom: "28px",
                }}>
                  {stop.role}
                </div>

                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {stop.bullets.map((bullet, j) => (
                    <li key={j} style={{
                      fontFamily: "var(--font-dm)",
                      fontSize: "clamp(14px, 1.2vw, 16px)",
                      color: "rgba(255,255,255,0.75)",
                      lineHeight: 1.75,
                      paddingLeft: "20px",
                      position: "relative",
                      marginBottom: j === 0 ? "10px" : 0,
                    }}>
                      <span style={{
                        position: "absolute", left: 0, top: "0.6em",
                        width: "6px", height: "1px",
                        background: stop.accent, display: "block",
                      }} />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Footer */}
      <div className="px-6 md:px-16 py-24 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
        style={{ background: "#080808", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div>
          <div style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(28px, 3.5vw, 48px)",
            fontWeight: 500, color: "#ffffff", lineHeight: 1.15, marginBottom: "12px",
          }}>
            Twenty years. Two continents.<br />One direction.
          </div>
          <div style={{
            fontFamily: "var(--font-dm)", fontSize: "14px",
            color: "rgba(255,255,255,0.55)",
          }}>
            London to Continental Africa, still building.
          </div>
        </div>
        <Link href="/" style={{
          display: "inline-flex", alignItems: "center", gap: "10px",
          fontFamily: "var(--font-mono)", fontSize: "13px", color: "#ffffff",
          letterSpacing: "0.16em", textDecoration: "none", flexShrink: 0,
          background: "#1B3A6B", border: "1px solid #1B3A6B", padding: "13px 26px",
        }}>
          ← BACK TO PROFILE
        </Link>
      </div>
    </main>
  );
}
