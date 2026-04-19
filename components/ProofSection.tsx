"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export function ProofSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function init() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        // Section rule draws in
        gsap.fromTo(".proof-rule", { scaleX: 0 }, {
          scaleX: 1, duration: 0.9, ease: "power2.inOut",
          scrollTrigger: { trigger: ref.current, start: "top 85%" },
        });

        // IBW flyer clip-path wipe left to right
        gsap.fromTo(".proof-img-wrap", { clipPath: "inset(0 100% 0 0)" }, {
          clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "power3.inOut",
          scrollTrigger: { trigger: ".proof-img-wrap", start: "top 78%" },
        });

        // Caption fades in after image
        gsap.fromTo(".proof-caption", { opacity: 0 }, {
          opacity: 1, duration: 0.6,
          scrollTrigger: { trigger: ".proof-img-wrap", start: "top 68%" },
        });

        // Parallax on image during scroll
        gsap.to(".proof-img-inner", {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });

        // Copy animates in word by word feel (stagger on children)
        gsap.fromTo(".proof-label", { opacity: 0, y: 16 }, {
          opacity: 1, y: 0, duration: 0.6,
          scrollTrigger: { trigger: ".proof-copy", start: "top 78%" },
        });
        gsap.fromTo(".proof-headline", { opacity: 0, y: 32 }, {
          opacity: 1, y: 0, duration: 0.9, ease: "power2.out",
          scrollTrigger: { trigger: ".proof-copy", start: "top 75%" },
        });
        gsap.fromTo(".proof-body", { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.15,
          scrollTrigger: { trigger: ".proof-copy", start: "top 75%" },
        });
        gsap.fromTo(".proof-fr", { opacity: 0 }, {
          opacity: 1, duration: 0.7, delay: 0.3,
          scrollTrigger: { trigger: ".proof-copy", start: "top 72%" },
        });
      }, ref);

      return () => ctx.revert();
    }
    init();
  }, []);

  return (
    <section ref={ref} style={{ background: "#ffffff" }}>
      {/* Section rule */}
      <div className="proof-rule px-6 md:px-16" style={{
        height: "1px", background: "rgba(10,10,10,0.08)",
        transformOrigin: "left center", transform: "scaleX(0)",
      }} />

      <div className="px-6 md:px-16 py-20 lg:py-28">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

          {/* IBW flyer — clip-path reveal */}
          <div className="flex-shrink-0" style={{ width: "clamp(240px, 30vw, 380px)" }}>
            <div className="proof-img-wrap" style={{
              clipPath: "inset(0 100% 0 0)",
              overflow: "hidden",
            }}>
              <div className="proof-img-inner">
                <Image
                  src="/images/flyer-ibw.jpg"
                  alt="IBW Women in Insurance Summit, Featured Speaker Yeside Kazeem"
                  width={380} height={285}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
            </div>
            <div className="proof-caption" style={{
              fontFamily: "var(--font-mono)", fontSize: "12px",
              color: "rgba(10,10,10,0.52)", letterSpacing: "0.16em",
              marginTop: "14px", lineHeight: 1.7, opacity: 0,
            }}>
              IBW WOMEN IN INSURANCE SUMMIT<br />
              LONDON · 7 NOVEMBER 2024
            </div>
          </div>

          {/* Copy */}
          <div className="proof-copy flex-1">
            <div className="proof-label" style={{
              fontFamily: "var(--font-mono)", fontSize: "12px",
              color: "rgba(10,10,10,0.52)", letterSpacing: "0.2em",
              marginBottom: "24px", opacity: 0,
            }}>
              FEATURED SPEAKER
            </div>

            <h2 className="proof-headline" style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(32px, 5vw, 74px)",
              fontWeight: 500, color: "#0A0A0A",
              lineHeight: 1.05, marginBottom: "32px",
              maxWidth: "560px", opacity: 0,
            }}>
              When they built the programme, they put her face on it.
            </h2>

            <p className="proof-body" style={{
              fontFamily: "var(--font-dm)",
              fontSize: "clamp(15px, 1.3vw, 17px)",
              color: "rgba(10,10,10,0.82)",
              lineHeight: 1.88, maxWidth: "480px",
              marginBottom: "36px", opacity: 0,
            }}>
              From actuarial science to the boardroom, from London to eight African
              markets. Yeside Kazeem is what seniority looks like when it has been
              built, not appointed.
            </p>

            <div className="proof-fr" style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(18px, 2vw, 26px)",
              fontStyle: "italic",
              color: "rgba(10,10,10,0.42)",
              letterSpacing: "0.03em",
              opacity: 0,
            }}>
              Bâtir. Gouverner. Diriger.
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
