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

      ctx = gsap.context(() => {
        // Entry timeline — photo is always visible, so just slide it in (no opacity)
        const tl = gsap.timeline({ delay: 0 });
        tl.fromTo(".yk-n1",  { y: 120, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" });
        tl.fromTo(".yk-n2",  { y: 120, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }, "-=0.62");
        tl.from(".yk-photo",  { x: 20, duration: 1.1, ease: "power2.out" }, "-=0.9");
        tl.fromTo(".yk-sub",  { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 }, "-=0.45");
        tl.fromTo(".yk-cta",  { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.2");

        // Scroll: photo fades as hero exits
        gsap.to(".yk-photo", {
          opacity: 0,
          scrollTrigger: {
            trigger: ref.current,
            start: "bottom 70%",
            end: "bottom 0%",
            scrub: 1,
          },
        });

        // Scroll: text shears left as hero exits
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
        <div className="w-full px-6 md:px-16 pt-28 pb-16 flex flex-col lg:block">

          <div className="yk-names yk-text-col" style={{ minWidth: 0 }}>
            {/* Name — no rule beneath it, just space */}
            <div className="yk-n1" style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(82px, 17vw, 196px)",
              fontWeight: 600, color: "#0A0A0A",
              lineHeight: 0.86, letterSpacing: "-0.03em",
              opacity: 0,
            }}>
              YESIDE
            </div>
            <div className="yk-n2" style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(82px, 17vw, 196px)",
              fontWeight: 600, color: "#0A0A0A",
              lineHeight: 0.86, letterSpacing: "-0.03em",
              opacity: 0,
              marginBottom: "40px",
            }}>
              KAZEEM
            </div>

            {/* Credentials — high contrast, no line above */}
            <div className="yk-sub" style={{
              fontFamily: "var(--font-mono)", fontSize: "var(--text-meta)",
              color: "rgba(10,10,10,0.65)", letterSpacing: "var(--tracking-label)",
              marginBottom: "36px", opacity: 0,
            }}>
              FIA · FNAS · BOARD DIRECTOR · CO-FOUNDER
            </div>

            {/* Tagline — the positioning statement, not a caption */}
            <p className="yk-sub" style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "var(--text-statement)",
              fontStyle: "italic", fontWeight: 400,
              color: "rgba(10,10,10,0.82)",
              maxWidth: "480px", lineHeight: "var(--leading-snug)",
              marginBottom: "52px", opacity: 0,
            }}>
              I build what Africa&apos;s financial future needs.
            </p>

            {/* One CTA */}
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer"
              className="yk-cta"
              style={{
                fontFamily: "var(--font-mono)", fontSize: "var(--text-label)",
                color: "#ffffff", letterSpacing: "var(--tracking-label)",
                textDecoration: "none", opacity: 0,
                background: "#1B3A6B",
                padding: "15px 32px",
                display: "inline-block",
              }}>
              INVITE TO SPEAK →
            </a>
          </div>

          {/* Photo */}
          <div className="yk-photo" style={{ marginTop: "48px" }}>
            <Image
              src="/images/yeside-hero.jpg"
              alt="Yeside Kazeem FIA FNAS"
              width={500} height={667} priority
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>

        </div>
      </section>
    </>
  );
}
