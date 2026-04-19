"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

import { LINKEDIN } from "@/data/home";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function init() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      // Entrance
      const tl = gsap.timeline({ delay: 0.1 });
      tl.fromTo(".yk-n1", { y: 120, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" });
      tl.fromTo(".yk-n2", { y: 120, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }, "-=0.62");
      tl.fromTo(".yk-rule", { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "power2.inOut" }, "-=0.4");
      tl.fromTo(".yk-photo", { opacity: 0, x: 28 }, { opacity: 1, x: 0, duration: 1.1, ease: "power2.out" }, "-=0.9");
      tl.fromTo(".yk-sub", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 }, "-=0.45");
      tl.fromTo(".yk-cta", { opacity: 0 }, { opacity: 1, duration: 0.5, stagger: 0.1 }, "-=0.2");

      // Scroll parallax on photo
      gsap.to(".yk-photo", {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // Name drifts up slightly on scroll
      gsap.to(".yk-names", {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }
    init();
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen flex items-center overflow-hidden"
      style={{ background: "#ffffff" }}
    >
      <div className="w-full px-6 md:px-16 pt-24 pb-16">
        <div className="flex flex-col lg:flex-row lg:items-center">

          {/* Text */}
          <div className="yk-names flex-1 lg:pr-10">
            <div style={{ overflow: "hidden" }}>
              <div className="yk-n1" style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(82px, 17vw, 240px)",
                fontWeight: 600, color: "#0A0A0A",
                lineHeight: 0.86, letterSpacing: "-0.03em",
                opacity: 0,
              }}>
                YESIDE
              </div>
            </div>
            <div style={{ overflow: "hidden" }}>
              <div className="yk-n2" style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(82px, 17vw, 240px)",
                fontWeight: 600, color: "#0A0A0A",
                lineHeight: 0.86, letterSpacing: "-0.03em",
                opacity: 0,
              }}>
                KAZEEM
              </div>
            </div>

            {/* Drawn rule */}
            <div className="yk-rule" style={{
              height: "1px",
              background: "rgba(10,10,10,0.12)",
              transformOrigin: "left center",
              transform: "scaleX(0)",
              marginTop: "24px",
              marginBottom: "24px",
              maxWidth: "600px",
            }} />

            <div className="yk-sub" style={{
              fontFamily: "var(--font-mono)", fontSize: "12px",
              color: "rgba(10,10,10,0.65)", letterSpacing: "0.2em",
              marginBottom: "18px", opacity: 0,
            }}>
              FIA · FNAS · BOARD DIRECTOR · CO-FOUNDER
            </div>

            <p className="yk-sub" style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(20px, 2.2vw, 27px)",
              fontStyle: "italic", fontWeight: 300,
              color: "rgba(10,10,10,0.72)",
              maxWidth: "440px", lineHeight: 1.45,
              marginBottom: "40px", opacity: 0,
            }}>
              She builds what Africa&apos;s financial future needs.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer"
                className="yk-cta"
                style={{
                  fontFamily: "var(--font-mono)", fontSize: "12px",
                  color: "#ffffff", letterSpacing: "0.16em",
                  textDecoration: "none", opacity: 0,
                  background: "#1B3A6B",
                  border: "1px solid #1B3A6B",
                  padding: "13px 26px",
                  display: "inline-block",
                }}>
                INVITE TO SPEAK →
              </a>
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer"
                className="yk-cta"
                style={{
                  fontFamily: "var(--font-mono)", fontSize: "12px",
                  color: "#1B3A6B", letterSpacing: "0.16em",
                  textDecoration: "none", opacity: 0,
                  background: "transparent",
                  border: "1px solid #1B3A6B",
                  padding: "13px 26px",
                  display: "inline-block",
                }}>
                BOARD ENQUIRIES →
              </a>
            </div>
          </div>

          {/* Photo */}
          <div className="yk-photo flex-shrink-0 mt-12 lg:mt-0" style={{
            width: "clamp(220px, 34vw, 460px)", opacity: 0,
          }}>
            <Image
              src="/images/yeside-hero.jpg"
              alt="Yeside Kazeem FIA FNAS"
              width={460} height={540} priority
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
