"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export function Statement() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function init() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(".stmt-word",
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          stagger: 0.04,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
        }
      );
      gsap.fromTo(".stmt-meta",
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 0.3,
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" } }
      );
    }
    init();
  }, []);

  const quote = "Growing the number of actuaries in Africa is well and truly a passion of mine.";

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "#0F1F3D" }}
    >
      {/* Ghost face background */}
      <div className="absolute inset-0 flex items-center justify-end pointer-events-none">
        <div style={{ width: "55%", height: "100%", position: "relative", opacity: 0.06 }}>
          <Image
            src="/images/yeside-coral.jpg"
            alt=""
            fill
            sizes="55vw"
            className="object-cover"
            style={{ objectPosition: "center top", filter: "grayscale(100%)" }}
          />
        </div>
      </div>

      <div className="relative z-10 px-6 md:px-16 py-28">
        {/* Attribution */}
        <div className="stmt-meta mb-10 flex items-center gap-3" style={{ opacity: 0 }}>
          <div style={{ width: "32px", height: "1px", background: "rgba(255,255,255,0.3)" }} />
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: "9px",
            color: "rgba(255,255,255,0.3)", letterSpacing: "0.25em",
          }}>
            YESIDE KAZEEM FIA, FNAS
          </span>
        </div>

        {/* Quote */}
        <p style={{ maxWidth: "860px" }}>
          {quote.split(" ").map((word, i) => (
            <span key={i} className="stmt-word" style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(34px, 5.2vw, 72px)",
              fontWeight: 500,
              lineHeight: 1.18,
              color: "#ffffff",
              display: "inline-block",
              marginRight: "0.22em",
              opacity: 0,
            }}>
              {word}
            </span>
          ))}
        </p>

        {/* Bottom row */}
        <div className="stmt-meta mt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6" style={{ opacity: 0 }}>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: "9px",
            color: "rgba(255,255,255,0.15)", letterSpacing: "0.12em",
            lineHeight: 1.8,
          }}>
            51.5074°N 0.1278°W LONDON<br />
            6.5244°N 3.3792°E LAGOS<br />
            4.0511°N 9.7679°E DOUALA
          </div>
          <a
            href="https://www.linkedin.com/in/yesidekazeem/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-mono)", fontSize: "10px",
              color: "rgba(255,255,255,0.5)", letterSpacing: "0.18em",
              textDecoration: "none",
              borderBottom: "1px solid rgba(255,255,255,0.2)",
              paddingBottom: "2px",
            }}
          >
            CONNECT ON LINKEDIN
          </a>
        </div>
      </div>
    </section>
  );
}
