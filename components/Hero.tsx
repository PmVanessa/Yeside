"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

import { LINKEDIN } from "@/data/home";
import { getGsap } from "@/lib/gsap";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    async function init() {
      const { gsap } = await getGsap();
      const isDesktop = window.innerWidth >= 1024;

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ delay: 0 });
        tl.fromTo(".yk-n1",  { y: 120, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" });
        tl.fromTo(".yk-n2",  { y: 120, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }, "-=0.62");
        if (isDesktop) {
          tl.from(".yk-photo", { x: 20, duration: 1.1, ease: "power2.out" }, "-=0.9");
        }
        tl.fromTo(".yk-sub",  { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 }, "-=0.45");
        tl.fromTo(".yk-cta",  { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.2");

        // Scroll: photo fades as hero exits (desktop only — photo is fixed)
        if (isDesktop) {
          gsap.to(".yk-photo", {
            opacity: 0,
            scrollTrigger: {
              trigger: ref.current,
              start: "bottom 70%",
              end: "bottom 0%",
              scrub: 1,
            },
          });

          // Desktop only: text shears left as hero exits
          gsap.to(".yk-names", {
            x: -110,
            skewX: -2,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top top",
              end: "bottom top",
              scrub: 1.8,
            },
          });
        } else {
          // Mobile: simple fade only, no x movement (prevents photo overlap)
          gsap.to(".yk-names", {
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "center top",
              end: "bottom top",
              scrub: 1,
            },
          });
        }
      }, ref);
    }

    init();

    return () => { ctx?.revert(); };
  }, []);

  return (
    <>
      <section
        ref={ref}
        className="relative w-full min-h-screen overflow-hidden"
        style={{ background: "#ffffff" }}
      >
        {/* Watermark — editorial presence, not a card */}
        <div className="yk-watermark absolute pointer-events-none select-none" style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(200px, 40vw, 560px)",
          fontWeight: 700, color: "#0A0A0A", opacity: 0.03,
          lineHeight: 1, left: "-0.05em", bottom: "-0.15em",
          zIndex: 0,
        }}>
          YK
        </div>

        <div className="w-full px-6 md:px-16 pt-28 pb-16 flex flex-col lg:block" style={{ position: "relative", zIndex: 1 }}>

          {/* Photo — mobile: appears first via CSS order; desktop: position fixed via globals.css */}
          <div className="yk-photo" style={{ marginTop: "48px" }}>
            <Image
              src="/images/yeside-hero.jpg"
              alt="Yeside Kazeem FIA FNAS"
              width={500} height={667} priority
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>

          <div className="yk-names yk-text-col" style={{ minWidth: 0 }}>
            {/* Name */}
            <div className="yk-n1" style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "var(--text-hero)",
              fontWeight: 600, color: "#0A0A0A",
              lineHeight: 0.86, letterSpacing: "-0.03em",
              opacity: 0,
            }}>
              YESIDE
            </div>
            <div className="yk-n2" style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "var(--text-hero)",
              fontWeight: 600, color: "#0A0A0A",
              lineHeight: 0.86, letterSpacing: "-0.03em",
              opacity: 0,
              marginBottom: "36px",
            }}>
              KAZEEM
            </div>

            {/* Credentials */}
            <div className="yk-sub" style={{
              fontFamily: "var(--font-mono)", fontSize: "var(--text-meta)",
              color: "rgba(10,10,10,0.65)", letterSpacing: "var(--tracking-label)",
              marginBottom: "32px", opacity: 0,
            }}>
              FIA · FNAS · BOARD DIRECTOR · CO-FOUNDER
            </div>

            {/* CTA — placed before tagline so it's above the fold */}
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer"
              className="yk-cta"
              style={{
                fontFamily: "var(--font-mono)", fontSize: "var(--text-label)",
                color: "#ffffff", letterSpacing: "var(--tracking-label)",
                textDecoration: "none", opacity: 0,
                background: "#1B3A6B",
                padding: "15px 32px",
                display: "inline-block",
                marginBottom: "48px",
              }}>
              INVITE TO SPEAK →
            </a>

            {/* Tagline */}
            <p className="yk-sub" style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "var(--text-statement)",
              fontStyle: "italic", fontWeight: 400,
              color: "rgba(10,10,10,0.82)",
              maxWidth: "480px", lineHeight: "var(--leading-snug)",
              opacity: 0,
            }}>
              I build what Africa&apos;s financial future needs.
            </p>
          </div>

        </div>
      </section>
    </>
  );
}
