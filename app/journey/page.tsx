"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { stops } from "@/data/journey";
import { getGsap } from "@/lib/gsap";

const orderedStops = [...stops].reverse();

// Photos shown in specific stop panels (keyed by orderedStops index)
const stopPhotos: Record<number, string> = {
  5: "/images/yeside-coral.jpg",   // NAS President — the historic moment
};

export default function JourneyPage() {
  const outerRef      = useRef<HTMLDivElement>(null);
  const stickyRef     = useRef<HTMLDivElement>(null);
  const trackRef      = useRef<HTMLDivElement>(null);
  const progressRef   = useRef<HTMLDivElement>(null);
  // HUD text refs — updated directly to avoid React re-renders at 60fps
  const hudLabelRef   = useRef<HTMLDivElement>(null);
  const hudCounterRef = useRef<HTMLDivElement>(null);
  // Active stop: state only for mobile nav (not on scroll hot-path)
  const [activeStop, setActiveStop]     = useState(0);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const isDesktop = window.innerWidth >= 768;
    if (!isDesktop) return;

    let ctx: { revert: () => void } | null = null;

    async function init() {
      const { gsap } = await getGsap();

      const outer   = outerRef.current;
      const track   = trackRef.current;
      const progress = progressRef.current;
      if (!outer || !track || !progress) return;

      ctx = gsap.context(() => {
        const maxTravel = track.scrollWidth - window.innerWidth;

        gsap.to(track, {
          x: -maxTravel,
          ease: "none",
          scrollTrigger: {
            trigger: outer,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            onUpdate(self) {
              const idx = Math.round(self.progress * (orderedStops.length - 1));
              const stop = orderedStops[idx];
              // Direct DOM writes — zero React re-renders on scroll hot-path
              if (progress) progress.style.transform = `scaleX(${self.progress})`;
              if (hudLabelRef.current && stop)
                hudLabelRef.current.textContent = `${stop.year} · ${stop.org}`;
              if (hudCounterRef.current)
                hudCounterRef.current.textContent =
                  `${String(idx + 1).padStart(2, "0")} / ${String(orderedStops.length).padStart(2, "0")}`;
            },
          },
        });
      });
    }

    init();
    return () => { ctx?.revert(); };
  }, []);

  // Mobile: vertical scroll active-stop tracking
  useEffect(() => {
    const isDesktop = window.innerWidth >= 768;
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
      <section className="relative w-full overflow-hidden" style={{ minHeight: "80vh" }}>
        {/* Two-column layout: text left, photo right */}
        <div className="flex flex-col md:flex-row" style={{ minHeight: "80vh" }}>

          {/* Text column */}
          <div className="relative flex-1 px-6 md:px-16 pt-36 pb-24 flex flex-col justify-center">
            <div className="absolute pointer-events-none select-none" style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(160px, 28vw, 400px)",
              fontWeight: 700, color: "#ffffff", opacity: 0.025,
              lineHeight: 1, right: "-2vw", bottom: "-0.1em",
            }}>
              YK
            </div>
            <div className="relative z-10 max-w-xl">
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
          </div>

          {/* Photo column — 360px tall on mobile, clamp-width + flex-stretch on tablet+ (all via CSS) */}
          <div className="journey-hero-photo relative flex-shrink-0">
            <Image
              src="/images/yeside-seated.jpg"
              alt="Yeside Kazeem"
              fill
              priority
              sizes="(max-width: 767px) 100vw, 32vw"
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />
          </div>

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
        className="hidden md:block"
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
            {orderedStops.map((stop, i) => {
              const photo = stopPhotos[i];
              return (
                <div
                  key={i}
                  style={{
                    width: "100vw",
                    height: "100%",
                    flexShrink: 0,
                    background: stop.bg,
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  {/* Text */}
                  <div style={{
                    flex: 1,
                    padding: "80px clamp(40px, 6.5vw, 96px) 120px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                  }}>
                    <StopContent stop={stop} variant="horizontal" />
                    {/* Year watermark — fills empty right space when no photo */}
                    {!photo && (
                      <div style={{
                        position: "absolute",
                        right: "clamp(40px, 6.5vw, 96px)",
                        bottom: "-0.1em",
                        fontFamily: "var(--font-cormorant)",
                        fontSize: "clamp(140px, 22vw, 320px)",
                        fontWeight: 700,
                        color: "#ffffff",
                        opacity: 0.04,
                        lineHeight: 1,
                        letterSpacing: "-0.03em",
                        pointerEvents: "none",
                        userSelect: "none",
                      }}>
                        {stop.year}
                      </div>
                    )}
                  </div>

                  {/* Optional photo */}
                  {photo && (
                    <div style={{
                      width: "clamp(260px, 32vw, 440px)",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "40px",
                    }}>
                      <Image
                        src={photo}
                        alt="Yeside Kazeem"
                        width={233}
                        height={216}
                        sizes="32vw"
                        style={{ width: "100%", maxWidth: "233px", height: "auto", display: "block" }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom HUD */}
          <div style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "20px clamp(24px, 6.5vw, 96px)",
            display: "flex",
            alignItems: "center",
            gap: "28px",
            background: "rgba(8,8,8,0.6)",
            backdropFilter: "blur(8px)",
          }}>
            <div ref={hudLabelRef} style={{
              fontFamily: "var(--font-mono)", fontSize: "var(--text-label)",
              color: "rgba(255,255,255,0.4)", letterSpacing: "var(--tracking-label)",
              flexShrink: 0, minWidth: "220px",
            }}>
              {orderedStops[0]?.year} · {orderedStops[0]?.org}
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

            <div ref={hudCounterRef} style={{
              fontFamily: "var(--font-mono)", fontSize: "var(--text-label)",
              color: "rgba(255,255,255,0.4)", letterSpacing: "var(--tracking-label)",
              flexShrink: 0,
            }}>
              01 / {String(orderedStops.length).padStart(2, "0")}
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile: vertical scroll ────────────────────────────── */}
      <div className="md:hidden">
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
              maxHeight: "60vh", overflowY: "auto",
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

        {orderedStops.map((stop, i) => {
          const photo = stopPhotos[i];
          return (
            <section
              key={i}
              id={`v-stop-${i}`}
              className={`v-stop-section-${i} relative w-full`}
              style={{ minHeight: "100vh", background: stop.bg }}
            >
              {/* Photo banner at top of stop, mobile only */}
              {photo && (
                <div style={{ width: "100%", padding: "32px 24px 0", display: "flex", justifyContent: "center" }}>
                  <Image
                    src={photo}
                    alt="Yeside Kazeem"
                    width={233}
                    height={216}
                    sizes="100vw"
                    style={{ width: "100%", maxWidth: "233px", height: "auto", display: "block" }}
                  />
                </div>
              )}
              <div className="w-full px-6 pb-20" style={{ paddingTop: photo ? "40px" : "112px" }}>
                <StopContent stop={stop} variant="vertical" />
              </div>
            </section>
          );
        })}
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
