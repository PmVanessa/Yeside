"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { stops } from "@/data/journey";

const orderedStops = [...stops].reverse();

export default function JourneyPage() {
  const outerRef      = useRef<HTMLDivElement>(null);   // tall scroll-space wrapper
  const stickyRef     = useRef<HTMLDivElement>(null);   // sticky viewport container
  const trackRef      = useRef<HTMLDivElement>(null);   // translating track
  const progressRef   = useRef<HTMLDivElement>(null);   // progress fill bar
  const [activeStop, setActiveStop]     = useState(0);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop) return;

    const outer   = outerRef.current;
    const track   = trackRef.current;
    const progress = progressRef.current;
    if (!outer || !track || !progress) return;

    const outerEl   = outer;
    const trackEl   = track;
    const progressEl = progress;

    let raf = 0;
    let current = 0;   // current translated x (lerped)
    let target  = 0;   // target translated x (raw from scroll)

    function onScroll() {
      const rect     = outerEl.getBoundingClientRect();
      const scrolled = Math.max(0, -rect.top);
      const maxScroll = rect.height - window.innerHeight;
      target = Math.min(scrolled, maxScroll);
    }

    function tick() {
      // Lerp toward target for smooth momentum feel
      current += (target - current) * 0.12;

      const maxTravel = trackEl.scrollWidth - window.innerWidth;
      const x = Math.min(current, maxTravel);
      trackEl.style.transform = `translateX(${-x}px)`;

      // Progress bar
      const pct = maxTravel > 0 ? x / maxTravel : 0;
      progressEl.style.transform = `scaleX(${pct})`;

      // Active stop index
      const idx = Math.round(pct * (orderedStops.length - 1));
      setActiveStop(idx);

      raf = requestAnimationFrame(tick);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Mobile: vertical scroll active-stop tracking
  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024;
    if (isDesktop) return;

    const observers: IntersectionObserver[] = [];

    orderedStops.forEach((_, i) => {
      const el = document.querySelector(`.v-stop-section-${i}`);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveStop(i); },
        { threshold: 0.5 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  function StopContent({ stop, variant }: {
    stop: typeof orderedStops[0];
    variant: "horizontal" | "vertical";
  }) {
    return (
      <div style={{ opacity: 1 }}>
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: "var(--text-label)",
          color: stop.accent, letterSpacing: "var(--tracking-wide)", marginBottom: "8px",
        }}>
          {stop.year}
        </div>
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: "var(--text-label)",
          color: "rgba(255,255,255,0.68)", letterSpacing: "var(--tracking-label)",
          lineHeight: 1.7, marginBottom: "36px",
        }}>
          {stop.city} · {stop.country}
        </div>

        <h2 style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: variant === "horizontal"
            ? "var(--text-display)"
            : "var(--text-head)",
          fontWeight: 600, color: "#ffffff",
          lineHeight: 1.0, marginBottom: "14px",
          letterSpacing: "var(--tracking-tight)",
        }}>
          {stop.org}
        </h2>

        <div style={{
          fontFamily: "var(--font-mono)", fontSize: "var(--text-label)",
          color: "rgba(255,255,255,0.72)", letterSpacing: "var(--tracking-label)",
          textTransform: "uppercase" as const, marginBottom: "32px",
        }}>
          {stop.role}
        </div>

        <ul style={{ listStyle: "none", padding: 0, margin: 0, maxWidth: "520px" }}>
          {stop.bullets.map((bullet, j) => (
            <li key={j} style={{
              fontFamily: "var(--font-dm)",
              fontSize: "var(--text-body)",
              color: "rgba(255,255,255,0.72)",
              lineHeight: "var(--leading-normal)",
              paddingLeft: "20px",
              position: "relative" as const,
              marginBottom: j < stop.bullets.length - 1 ? "12px" : 0,
            }}>
              <span style={{
                position: "absolute" as const, left: 0, top: "0.55em",
                width: "4px", height: "4px",
                background: stop.accent, display: "block",
              }} />
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <main style={{ background: "#080808" }}>

      {/* ── Page hero ─────────────────────────────────────────── */}
      <section
        className="relative w-full px-6 md:px-16 pt-36 pb-24"
      >
        <div className="absolute pointer-events-none select-none" style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(160px, 28vw, 400px)",
          fontWeight: 700, color: "#ffffff", opacity: 0.025,
          lineHeight: 1, right: "-2vw", bottom: "-0.1em",
        }}>
          YK
        </div>
        <div className="relative z-10 max-w-3xl">
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: "var(--text-label)",
            color: "rgba(255,255,255,0.68)", letterSpacing: "var(--tracking-nav)",
            marginBottom: "28px",
          }}>
            JOURNEY
          </div>
          <h1 style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "var(--text-display)",
            fontWeight: 600, color: "#ffffff",
            lineHeight: "var(--leading-tight)", letterSpacing: "var(--tracking-tight)",
            marginBottom: "36px",
          }}>
            Twenty years.<br />
            Two continents.<br />
            One direction.
          </h1>
          <p style={{
            fontFamily: "var(--font-dm)",
            fontSize: "var(--text-body)",
            color: "rgba(255,255,255,0.80)",
            lineHeight: "var(--leading-loose)", maxWidth: "480px",
          }}>
            From Deloitte London to the boardrooms of Continental Africa.
            Every role earned. Every market entered on purpose.
          </p>
        </div>
      </section>

      {/* ── Desktop: horizontal scroll (sticky) ───────────────── */}
      {/*
          outerRef is a tall div that provides scroll distance.
          stickyRef is viewport-height, sticks to the top.
          trackRef translates left as outerRef scrolls.
          Total outer height = viewport + (stops - 1) * viewport = stops * 100vh
      */}
      <div
        className="hidden lg:block"
        ref={outerRef}
        style={{ height: `${orderedStops.length * 100}vh` }}
      >
        <div
          ref={stickyRef}
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
            background: "#080808",
          }}
        >
          {/* Track */}
          <div
            ref={trackRef}
            style={{
              display: "flex",
              height: "100%",
              willChange: "transform",
            }}
          >
            {orderedStops.map((stop, i) => (
              <div
                key={i}
                style={{
                  width: "100vw",
                  height: "100%",
                  flexShrink: 0,
                  background: stop.bg,
                  padding: "80px 96px 120px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <StopContent stop={stop} variant="horizontal" />
              </div>
            ))}
          </div>

          {/* Bottom HUD */}
          <div style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "20px 96px",
            display: "flex",
            alignItems: "center",
            gap: "28px",
            background: "rgba(8,8,8,0.6)",
            backdropFilter: "blur(8px)",
          }}>
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: "var(--text-label)",
              color: "rgba(255,255,255,0.4)", letterSpacing: "var(--tracking-label)",
              flexShrink: 0, minWidth: "220px",
            }}>
              {orderedStops[activeStop]?.year} · {orderedStops[activeStop]?.org}
            </div>

            <div style={{
              flex: 1, height: "1px",
              background: "rgba(255,255,255,0.08)",
              position: "relative",
            }}>
              <div
                ref={progressRef}
                style={{
                  position: "absolute", inset: 0,
                  background: "#1B3A6B",
                  transformOrigin: "left center",
                  transform: "scaleX(0)",
                }}
              />
            </div>

            <div style={{
              fontFamily: "var(--font-mono)", fontSize: "var(--text-label)",
              color: "rgba(255,255,255,0.4)", letterSpacing: "var(--tracking-label)",
              flexShrink: 0,
            }}>
              {String(activeStop + 1).padStart(2, "0")} / {String(orderedStops.length).padStart(2, "0")}
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile: vertical scroll ────────────────────────────── */}
      <div className="lg:hidden">
        <div className="fixed bottom-6 left-1/2 z-50" style={{ transform: "translateX(-50%)" }}>
          <button
            onClick={() => setMobileNavOpen(v => !v)}
            style={{
              fontFamily: "var(--font-mono)", fontSize: "var(--text-label)",
              color: "#ffffff", letterSpacing: "var(--tracking-label)",
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
              background: "rgba(8,8,8,0.97)",
              padding: "8px 0", backdropFilter: "blur(12px)", minWidth: "220px",
            }}>
              {orderedStops.map((s, i) => (
                <a
                  key={i}
                  href={`#v-stop-${i}`}
                  onClick={() => setMobileNavOpen(false)}
                  style={{
                    display: "block", padding: "10px 20px",
                    fontFamily: "var(--font-mono)", fontSize: "var(--text-label)",
                    color: activeStop === i ? "#ffffff" : "rgba(255,255,255,0.68)",
                    letterSpacing: "var(--tracking-label)", textDecoration: "none",
                    background: activeStop === i ? "rgba(27,58,107,0.4)" : "transparent",
                  }}
                >
                  {s.year} · {s.org}
                </a>
              ))}
            </div>
          )}
        </div>

        {orderedStops.map((stop, i) => (
          <section
            key={i}
            id={`v-stop-${i}`}
            className={`v-stop-section-${i} relative w-full flex items-center`}
            style={{
              minHeight: "100vh",
              background: stop.bg,
            }}
          >
            <div className="w-full px-6 pt-28 pb-20">
              <StopContent stop={stop} variant="vertical" />
            </div>
          </section>
        ))}
      </div>

      {/* ── Footer ───────────────────────────────────────────── */}
      <div
        className="px-6 md:px-16 py-24 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
        style={{ background: "#080808" }}
      >
        <div>
          <div style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "var(--text-head)",
            fontWeight: 500, color: "#ffffff", lineHeight: "var(--leading-snug)", marginBottom: "12px",
          }}>
            Still building.
          </div>
          <div style={{
            fontFamily: "var(--font-dm)", fontSize: "var(--text-meta)",
            color: "rgba(255,255,255,0.72)",
          }}>
            London to Continental Africa.
          </div>
        </div>
        <Link href="/" style={{
          display: "inline-flex", alignItems: "center", gap: "10px",
          fontFamily: "var(--font-mono)", fontSize: "var(--text-label)", color: "#ffffff",
          letterSpacing: "var(--tracking-label)", textDecoration: "none", flexShrink: 0,
          background: "#1B3A6B", border: "1px solid #1B3A6B", padding: "13px 26px",
        }}>
          ← HOME
        </Link>
      </div>

    </main>
  );
}
