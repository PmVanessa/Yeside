"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const LINKEDIN = "https://www.linkedin.com/in/yesidekazeem/";

export function AfricaSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function init() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        // Rule
        gsap.fromTo(".af-rule", { scaleX: 0 }, {
          scaleX: 1, duration: 0.9, ease: "power2.inOut",
          scrollTrigger: { trigger: ref.current, start: "top 85%" },
        });

        // Image clip-path wipe from right
        gsap.fromTo(".af-img-wrap", { clipPath: "inset(0 100% 0 0)" }, {
          clipPath: "inset(0 0% 0 0)", duration: 1.3, ease: "power3.inOut",
          scrollTrigger: { trigger: ".af-img-wrap", start: "top 78%" },
        });

        // Parallax on image
        gsap.to(".af-img-inner", {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });

        // Text stagger
        gsap.fromTo(".af-label", { opacity: 0, y: 16 }, {
          opacity: 1, y: 0, duration: 0.6,
          scrollTrigger: { trigger: ".af-text", start: "top 78%" },
        });
        gsap.fromTo(".af-headline", { opacity: 0, y: 36 }, {
          opacity: 1, y: 0, duration: 0.95, ease: "power2.out",
          scrollTrigger: { trigger: ".af-text", start: "top 75%" },
        });
        gsap.fromTo(".af-body", { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.85, ease: "power2.out", delay: 0.15,
          scrollTrigger: { trigger: ".af-text", start: "top 75%" },
        });
        gsap.fromTo(".af-ctas", { opacity: 0 }, {
          opacity: 1, duration: 0.6, delay: 0.3,
          scrollTrigger: { trigger: ".af-text", start: "top 72%" },
        });
      }, ref);

      return () => ctx.revert();
    }
    init();
  }, []);

  return (
    <section id="africa" ref={ref} style={{ background: "#ffffff" }}>
      {/* Rule */}
      <div className="af-rule px-6 md:px-16" style={{
        height: "1px", background: "rgba(10,10,10,0.07)",
        transformOrigin: "left center", transform: "scaleX(0)",
      }} />

      <div className="px-6 md:px-16 py-20 lg:py-28">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">

          {/* GAIN Q&A — clip-path reveal */}
          <div className="flex-shrink-0" style={{ width: "clamp(260px, 40vw, 520px)" }}>
            <div className="af-img-wrap" style={{
              clipPath: "inset(0 100% 0 0)",
              overflow: "hidden",
            }}>
              <div className="af-img-inner">
                <Image
                  src="/images/gain-qa.jpg"
                  alt="Yeside Kazeem, Founder African Actuarial Development Academy"
                  width={520} height={390} unoptimized
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="af-text flex-1">
            <div className="af-label" style={{
              fontFamily: "var(--font-mono)", fontSize: "11px",
              color: "rgba(10,10,10,0.52)", letterSpacing: "0.2em",
              marginBottom: "20px", opacity: 0,
            }}>
              AFRICA MISSION
            </div>

            <h2 className="af-headline" style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(32px, 4.5vw, 64px)",
              fontWeight: 500, color: "#0A0A0A",
              lineHeight: 1.04, marginBottom: "24px",
              maxWidth: "500px", opacity: 0,
            }}>
              Building the profession the continent needs.
            </h2>

            <div className="af-body" style={{ opacity: 0 }}>
              <p style={{
                fontFamily: "var(--font-dm)",
                fontSize: "clamp(15px, 1.3vw, 17px)",
                color: "rgba(10,10,10,0.82)",
                lineHeight: 1.88, maxWidth: "460px",
                marginBottom: "12px",
              }}>
                Africa does not just need more actuaries. It needs institutions,
                pipelines, and data infrastructure that will sustain the profession
                for generations.
              </p>
              <p style={{
                fontFamily: "var(--font-dm)",
                fontSize: "clamp(15px, 1.3vw, 17px)",
                color: "rgba(10,10,10,0.82)",
                lineHeight: 1.88, maxWidth: "460px",
                marginBottom: "36px",
              }}>
                Yeside has spent her career building exactly that.
              </p>
            </div>

            <div className="af-ctas flex flex-wrap gap-4" style={{ opacity: 0 }}>
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" style={{
                fontFamily: "var(--font-mono)", fontSize: "12px",
                color: "#ffffff", letterSpacing: "0.16em",
                textDecoration: "none",
                background: "#1B3A6B",
                border: "1px solid #1B3A6B",
                padding: "13px 26px",
                display: "inline-block",
              }}>
                LET'S BUILD TOGETHER →
              </a>
              <Link href="/about" style={{
                fontFamily: "var(--font-mono)", fontSize: "12px",
                color: "#1B3A6B", letterSpacing: "0.16em",
                textDecoration: "none",
                background: "transparent",
                border: "1px solid #1B3A6B",
                padding: "13px 26px",
                display: "inline-block",
              }}>
                VIEW ACHIEVEMENTS →
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
