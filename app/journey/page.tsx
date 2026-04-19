"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { stops } from "@/data/journey";

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

      stops.forEach((_, i) => {
        const ctx = gsap.context(() => {
          gsap.fromTo(`.stop-logo-${i}`,
            { opacity: 0, y: 30, scale: 0.92 },
            { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power2.out",
              scrollTrigger: { trigger: `.stop-section-${i}`, start: "top 60%" } }
          );
          gsap.fromTo(`.stop-content-${i}`,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.15,
              scrollTrigger: { trigger: `.stop-section-${i}`, start: "top 60%" } }
          );
          // Track active stop for mobile nav
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

      {/* Desktop dot navigation — right side */}
      <div className="hidden md:flex fixed right-6 top-1/2 z-50 flex-col gap-3"
        style={{ transform: "translateY(-50%)" }}>
        {stops.map((s, i) => (
          <a
            key={i}
            href={`#stop-${i}`}
            title={`${s.year} · ${s.org}`}
            style={{
              display: "block", width: "6px", height: "6px", borderRadius: "50%",
              background: activeStop === i ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.25)",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.8)")}
            onMouseLeave={e => (e.currentTarget.style.background = activeStop === i ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.25)")}
          />
        ))}
      </div>

      {/* Mobile sticky year indicator */}
      <div className="md:hidden fixed bottom-6 left-1/2 z-50 flex items-center gap-3"
        style={{ transform: "translateX(-50%)" }}>
        <button
          onClick={() => setMobileNavOpen(v => !v)}
          style={{
            fontFamily: "var(--font-mono)", fontSize: "12px",
            color: "#ffffff", letterSpacing: "0.16em",
            background: "rgba(27,58,107,0.95)",
            border: "1px solid rgba(255,255,255,0.2)",
            padding: "10px 20px",
            cursor: "pointer",
            backdropFilter: "blur(8px)",
          }}
        >
          {stops[activeStop]?.year} · {stops[activeStop]?.city} ↑
        </button>
        {mobileNavOpen && (
          <div style={{
            position: "absolute", bottom: "100%", left: "50%",
            transform: "translateX(-50%)", marginBottom: "8px",
            background: "rgba(8,8,8,0.97)", border: "1px solid rgba(255,255,255,0.1)",
            padding: "8px 0", backdropFilter: "blur(12px)", minWidth: "220px",
          }}>
            {stops.map((s, i) => (
              <a
                key={i}
                href={`#stop-${i}`}
                onClick={() => setMobileNavOpen(false)}
                style={{
                  display: "block", padding: "10px 20px",
                  fontFamily: "var(--font-mono)", fontSize: "12px",
                  color: activeStop === i ? "#ffffff" : "rgba(255,255,255,0.55)",
                  letterSpacing: "0.14em", textDecoration: "none",
                  background: activeStop === i ? "rgba(27,58,107,0.5)" : "transparent",
                }}
              >
                {s.year} · {s.org}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Stops */}
      {stops.map((stop, i) => (
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
          {/* Accent gradient */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: `radial-gradient(ellipse 60% 60% at ${i % 2 === 0 ? "80%" : "20%"} 50%, ${stop.accent}0D 0%, transparent 70%)`,
          }} />

          {/* Year watermark */}
          <div className="absolute pointer-events-none select-none" style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(140px, 22vw, 320px)",
            fontWeight: 700,
            color: "#ffffff",
            opacity: 0.025,
            lineHeight: 1,
            right: i % 2 === 0 ? "-2vw" : "auto",
            left: i % 2 !== 0 ? "-2vw" : "auto",
            top: "50%",
            transform: "translateY(-50%)",
            userSelect: "none",
          }}>
            {stop.year}
          </div>

          {/* Content */}
          <div className="relative z-10 w-full px-6 md:px-16 pt-28 pb-20">
            <div className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-16 lg:gap-24`}>

              {/* Logo side */}
              <div className={`stop-logo-${i} flex-shrink-0 flex items-center justify-center`}
                style={{ width: "100%", maxWidth: "360px", opacity: 0 }}>
                <div style={{
                  padding: "44px 48px",
                  background: "#ffffff",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  minHeight: "160px",
                  boxShadow: "0 32px 80px rgba(0,0,0,0.4)",
                }}>
                  <Image
                    src={stop.logo}
                    alt={stop.org}
                    width={stop.logoWidth}
                    height={stop.logoHeight}
                    style={{ maxWidth: "100%", height: "auto", objectFit: "contain" }}
                    unoptimized
                  />
                </div>
              </div>

              {/* Text side */}
              <div className={`stop-content-${i} flex-1`} style={{ opacity: 0 }}>
                <div style={{
                  fontFamily: "var(--font-mono)", fontSize: "13px",
                  color: "rgba(255,255,255,0.62)", letterSpacing: "0.16em", marginBottom: "6px",
                }}>
                  {stop.city} · {stop.country}
                </div>
                <div style={{
                  fontFamily: "var(--font-mono)", fontSize: "12px",
                  color: "rgba(255,255,255,0.45)", letterSpacing: "0.12em", marginBottom: "20px",
                }}>
                  {stop.coords} · {stop.year}
                </div>

                <h2 style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(36px, 5.5vw, 72px)",
                  fontWeight: 600, color: "#ffffff",
                  lineHeight: 1.05, marginBottom: "16px", maxWidth: "640px",
                }}>
                  {stop.org}
                </h2>

                <div style={{
                  fontFamily: "var(--font-mono)", fontSize: "13px",
                  color: stop.accent, letterSpacing: "0.16em", marginBottom: "24px",
                  textTransform: "uppercase",
                }}>
                  {stop.role}
                </div>

                <div style={{ width: "40px", height: "1px", background: "rgba(255,255,255,0.15)", marginBottom: "24px" }} />

                <p style={{
                  fontFamily: "var(--font-dm)",
                  fontSize: "clamp(15px, 1.3vw, 18px)",
                  color: "rgba(255,255,255,0.82)",
                  lineHeight: 1.8, maxWidth: "520px",
                }}>
                  {stop.impact}
                </p>
              </div>
            </div>
          </div>

        </section>
      ))}

      {/* Footer CTA */}
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
            color: "rgba(255,255,255,0.62)", letterSpacing: "0.02em",
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
