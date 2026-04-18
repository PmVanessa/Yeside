"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const LINKEDIN = "https://www.linkedin.com/in/yesidekazeem/";

export function Contact() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function init() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        // Name — dramatic scale up reveal
        gsap.fromTo(".ct-name", { opacity: 0, y: 80, scale: 0.96 }, {
          opacity: 1, y: 0, scale: 1, duration: 1.4, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%" },
        });

        // Taglines
        gsap.fromTo(".ct-tag", { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power2.out",
          scrollTrigger: { trigger: ".ct-tag", start: "top 85%" },
        });

        // Columns
        gsap.fromTo(".ct-col", { opacity: 0, y: 28 }, {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: ".ct-col", start: "top 88%" },
        });

        // Bottom row
        gsap.fromTo(".ct-bottom", { opacity: 0 }, {
          opacity: 1, duration: 0.7,
          scrollTrigger: { trigger: ".ct-bottom", start: "top 90%" },
        });

        // Parallax on name — drifts up as you scroll deeper into section
        gsap.to(".ct-name", {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: "bottom top",
            scrub: 2,
          },
        });
      }, ref);

      return () => ctx.revert();
    }
    init();
  }, []);

  return (
    <footer
      id="contact"
      ref={ref}
      className="w-full min-h-screen flex flex-col justify-between px-6 md:px-16 py-20"
      style={{ background: "#080808", overflow: "hidden" }}
    >
      {/* Name + taglines */}
      <div>
        <div className="ct-name" style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(72px, 13vw, 180px)",
          fontWeight: 600, color: "#ffffff",
          lineHeight: 0.86, letterSpacing: "-0.03em",
          marginBottom: "40px", opacity: 0,
        }}>
          YESIDE<br />KAZEEM
        </div>

        <p className="ct-tag" style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(18px, 2vw, 26px)",
          fontStyle: "italic", fontWeight: 300,
          color: "rgba(255,255,255,0.78)",
          maxWidth: "480px", lineHeight: 1.5,
          marginBottom: "8px", opacity: 0,
        }}>
          Building what matters, wherever it needs to be built.
        </p>

        <p className="ct-tag" style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(16px, 1.6vw, 21px)",
          fontStyle: "italic", fontWeight: 300,
          color: "rgba(255,255,255,0.45)",
          maxWidth: "440px", lineHeight: 1.5, opacity: 0,
        }}>
          Bâtir ce qui compte, partout où c&apos;est nécessaire.
        </p>
      </div>

      {/* Three columns */}
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-10 py-16 border-t border-b"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        {[
          {
            label: "SPEAKING",
            lines: ["Keynotes. Panels. Summits.", "Corporate governance.", "African financial systems.", "Women in leadership."],
            cta: "INVITE TO SPEAK →",
          },
          {
            label: "BOARD & ADVISORY",
            lines: ["Independent Non-Executive Director.", "Risk. Governance.", "Strategic oversight."],
            cta: "BOARD ENQUIRIES →",
          },
          {
            label: "AFRICA MISSION",
            lines: ["AADA collaboration.", "Actuarial capacity building.", "Pan-African partnerships."],
            cta: "GET IN TOUCH →",
          },
        ].map((col, i) => (
          <div key={i} className="ct-col" style={{ opacity: 0 }}>
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: "11px",
              color: "rgba(255,255,255,0.6)", letterSpacing: "0.2em",
              marginBottom: "18px",
            }}>
              {col.label}
            </div>
            <div style={{ marginBottom: "24px" }}>
              {col.lines.map((line, j) => (
                <div key={j} style={{
                  fontFamily: "var(--font-dm)", fontSize: "14px",
                  color: "rgba(255,255,255,0.75)", lineHeight: 1.75,
                }}>
                  {line}
                </div>
              ))}
            </div>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" style={{
              fontFamily: "var(--font-mono)", fontSize: "11px",
              color: "#ffffff", letterSpacing: "0.14em",
              textDecoration: "none",
              background: "#1B3A6B",
              border: "1px solid #1B3A6B",
              padding: "11px 20px",
              display: "inline-block",
            }}>
              {col.cta}
            </a>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div className="ct-bottom flex flex-col md:flex-row md:items-end justify-between gap-6" style={{ opacity: 0 }}>
        <div>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: "11px",
            color: "rgba(255,255,255,0.6)", letterSpacing: "0.2em",
            marginBottom: "10px",
          }}>
            CONNECT
          </div>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" style={{
            fontFamily: "var(--font-mono)", fontSize: "12px",
            color: "rgba(255,255,255,0.82)", letterSpacing: "0.1em",
            textDecoration: "none", display: "block", marginBottom: "14px",
          }}>
            linkedin.com/in/yesidekazeem
          </a>
          <Link href="/journey" style={{
            fontFamily: "var(--font-mono)", fontSize: "11px",
            color: "#ffffff", letterSpacing: "0.15em",
            textDecoration: "none", display: "inline-block",
            background: "#1B3A6B",
            border: "1px solid #1B3A6B",
            padding: "10px 18px",
          }}>
            VIEW CAREER JOURNEY →
          </Link>
        </div>

        <div style={{
          fontFamily: "var(--font-mono)", fontSize: "11px",
          color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em",
          textAlign: "right", lineHeight: 1.85,
        }}>
          51.5074°N, 0.1278°W · LONDON<br />
          6.5244°N, 3.3792°E · LAGOS
        </div>
      </div>
    </footer>
  );
}
