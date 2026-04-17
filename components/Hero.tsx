"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function init() {
      const { gsap: g } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      g.registerPlugin(ScrollTrigger);

      const tl = g.timeline({ delay: 0.2 });
      tl.fromTo(".hero-coords", { opacity: 0 }, { opacity: 1, duration: 0.8 });
      tl.fromTo(".hero-bg-photo", { opacity: 0 }, { opacity: 1, duration: 1.4, ease: "power2.out" }, "-=0.4");
      tl.fromTo(".hero-line-1", { y: 140, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }, "-=0.9");
      tl.fromTo(".hero-line-2", { y: 140, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }, "-=0.65");
      tl.fromTo(".hero-cred", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3");
      tl.fromTo(".hero-tagline", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.4");
      tl.fromTo(".hero-scroll", { opacity: 0 }, { opacity: 1, duration: 0.5 });

      g.to(".hero-bg-photo", {
        y: 60,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }
    init();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden flex flex-col justify-end"
      style={{ background: "#080808" }}
    >
      {/* Full background photo */}
      <div className="hero-bg-photo absolute inset-0 opacity-0">
        <Image
          src="/images/yeside-hero.jpg"
          alt="Yeside Kazeem"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center top", filter: "grayscale(15%) contrast(1.05)" }}
        />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(105deg, rgba(8,8,8,0.96) 0%, rgba(8,8,8,0.75) 45%, rgba(8,8,8,0.25) 100%)"
        }} />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to top, rgba(8,8,8,1) 0%, rgba(8,8,8,0.55) 30%, transparent 65%)"
        }} />
      </div>

      {/* Coordinates top left */}
      <div className="hero-coords absolute top-10 left-6 md:left-16 opacity-0" style={{
        fontFamily: "var(--font-mono)", fontSize: "10px",
        color: "rgba(255,255,255,0.35)", letterSpacing: "0.18em",
      }}>
        51.5074°N, 0.1278°W — LONDON
      </div>

      {/* Blue accent line right */}
      <div className="absolute right-12 top-0 bottom-0 hidden lg:block" style={{
        width: "1px",
        background: "linear-gradient(to bottom, transparent 0%, #1B3A6B 30%, #1B3A6B 70%, transparent 100%)",
        opacity: 0.4,
      }} />

      {/* Content bottom-anchored */}
      <div className="relative z-10 px-6 md:px-16 pb-14 pt-40">
        <div style={{ overflow: "hidden", marginBottom: "4px" }}>
          <div className="hero-line-1" style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(72px, 14vw, 200px)",
            fontWeight: 600, color: "#ffffff",
            lineHeight: 0.88, letterSpacing: "-0.03em",
          }}>
            YESIDE
          </div>
        </div>
        <div style={{ overflow: "hidden", marginBottom: "28px" }}>
          <div className="hero-line-2" style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(72px, 14vw, 200px)",
            fontWeight: 600, color: "#ffffff",
            lineHeight: 0.88, letterSpacing: "-0.03em",
          }}>
            KAZEEM
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="hero-cred mb-3 opacity-0" style={{
              fontFamily: "var(--font-mono)", fontSize: "10px",
              color: "rgba(255,255,255,0.4)", letterSpacing: "0.22em",
            }}>
              FIA · FNAS · BOARD DIRECTOR · ACTUARY
            </div>
            <p className="hero-tagline opacity-0" style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(18px, 2vw, 24px)",
              fontWeight: 300, fontStyle: "italic",
              color: "rgba(255,255,255,0.6)",
              maxWidth: "440px", lineHeight: 1.45,
            }}>
              Entrepreneurial actuary. Building what Africa's financial future needs.
            </p>
          </div>
          <div className="hero-scroll opacity-0 flex items-center gap-3" style={{
            fontFamily: "var(--font-mono)", fontSize: "9px",
            color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em",
          }}>
            <div style={{ width: "32px", height: "1px", background: "rgba(255,255,255,0.25)" }} />
            SCROLL
          </div>
        </div>
      </div>
    </section>
  );
}
