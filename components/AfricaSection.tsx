"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const LINKEDIN = "https://www.linkedin.com/in/yesidekazeem/";

export function AfricaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function init() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.fromTo(".africa-content",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power2.out",
            scrollTrigger: { trigger: ".africa-content", start: "top 75%" } }
        );
        gsap.fromTo(".africa-card",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power2.out",
            scrollTrigger: { trigger: ".africa-card", start: "top 80%" } }
        );
      }, sectionRef);

      return () => ctx.revert();
    }
    init();
  }, []);

  return (
    <section
      id="africa"
      ref={sectionRef}
      className="w-full"
      style={{ background: "#ffffff", scrollMarginTop: "0px" }}
    >
      {/* GAIN photo — full bleed with strong bottom gradient so text is readable */}
      <div className="relative w-full" style={{ height: "45vh", minHeight: "320px" }}>
        <Image
          src="/images/gain-qa.jpg"
          alt="GAIN Q&A — Yeside Kazeem, Founder AADA"
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center 25%" }}
        />
        {/* Strong bottom fade so no bleed into text below */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 60%, rgba(255,255,255,1) 100%)"
        }} />
        {/* Left fade */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to right, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 45%)"
        }} />
        {/* Label over image */}
        <div className="absolute bottom-6 left-6 md:left-16 flex items-center gap-3" style={{
          fontFamily: "var(--font-mono)", fontSize: "9px",
          color: "#1B3A6B", letterSpacing: "0.22em",
        }}>
          <div style={{ width: "32px", height: "1px", background: "#1B3A6B" }} />
          03 · AFRICA MISSION
        </div>
      </div>

      <div className="px-6 md:px-16 pb-24">
        {/* Headline */}
        <div className="africa-content mb-14" style={{ opacity: 0 }}>
          <h2 style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(34px, 4.8vw, 64px)",
            fontWeight: 500, color: "#0A0A0A",
            lineHeight: 1.1, marginBottom: "20px", maxWidth: "740px",
          }}>
            Building the profession the continent needs.
          </h2>
          <p style={{
            fontFamily: "var(--font-dm)",
            fontSize: "clamp(15px, 1.3vw, 17px)",
            color: "rgba(10,10,10,0.6)", lineHeight: 1.85, maxWidth: "560px",
          }}>
            Africa does not just need more actuaries. It needs institutions, pipelines, and data infrastructure that will sustain the profession for generations. Yeside has spent her career building exactly that.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {/* AADA */}
          <div className="africa-card md:col-span-2" style={{
            background: "#0F1F3D", padding: "36px 40px",
            borderRadius: "4px", opacity: 0,
          }}>
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: "8px",
              color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em", marginBottom: "12px",
            }}>
              CO-FOUNDER · 2024
            </div>
            <h3 style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(20px, 2.4vw, 30px)",
              fontWeight: 600, color: "#ffffff",
              marginBottom: "12px", lineHeight: 1.2,
            }}>
              African Actuarial Development Academy
            </h3>
            <p style={{
              fontFamily: "var(--font-dm)", fontSize: "14px",
              color: "rgba(255,255,255,0.58)", lineHeight: 1.75, marginBottom: "18px",
            }}>
              A pan-African body created by actuaries in Africa, for actuaries in Africa. Developing qualified professionals to meet the growing demands of the continent's financial industry. Operating in English and French.
            </p>
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: "8px",
              color: "rgba(255,255,255,0.22)", letterSpacing: "0.16em",
            }}>
              PAN-AFRICAN REACH · ENGLISH AND FRENCH · FIRESIDE CHATS · MENTORSHIP
            </div>
          </div>

          <div className="flex flex-col gap-5">
            {/* Mortality Table */}
            <div className="africa-card" style={{
              background: "#F0F4FF", padding: "26px",
              borderRadius: "4px", borderLeft: "3px solid #1B3A6B", flex: 1, opacity: 0,
            }}>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: "8px",
                color: "#1B3A6B", letterSpacing: "0.2em", marginBottom: "8px",
              }}>
                MAKING HISTORY · 2024
              </div>
              <h3 style={{
                fontFamily: "var(--font-cormorant)", fontSize: "19px",
                fontWeight: 600, color: "#0A0A0A", marginBottom: "8px",
              }}>
                Nigeria's First Mortality Table
              </h3>
              <p style={{
                fontFamily: "var(--font-dm)", fontSize: "12px",
                color: "rgba(10,10,10,0.52)", lineHeight: 1.7,
              }}>
                Technical support to the NMTDC. A foundation the financial industry can build on for generations.
              </p>
            </div>

            {/* Roles */}
            <div className="africa-card" style={{
              border: "1px solid rgba(27,58,107,0.12)",
              padding: "26px", borderRadius: "4px", flex: 1, opacity: 0,
            }}>
              {[
                { title: "COP30 — IAA Representative", sub: "Actuarial profession at the global stage" },
                { title: "GAIN Ambassador", sub: "Global Actuarial Initiative" },
                { title: "NAS — Former President", sub: "IAA full member status achieved" },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 mb-4 last:mb-0">
                  <div style={{
                    width: "18px", height: "1px", background: "#1B3A6B",
                    marginTop: "9px", flexShrink: 0,
                  }} />
                  <div>
                    <div style={{ fontFamily: "var(--font-dm)", fontSize: "13px", fontWeight: 500, color: "#0A0A0A" }}>{item.title}</div>
                    <div style={{ fontFamily: "var(--font-dm)", fontSize: "11px", color: "rgba(10,10,10,0.42)" }}>{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" style={{
          display: "inline-flex", alignItems: "center", gap: "10px",
          fontFamily: "var(--font-mono)", fontSize: "10px", color: "#0A0A0A",
          letterSpacing: "0.15em", borderBottom: "1px solid #0A0A0A",
          paddingBottom: "3px", textDecoration: "none",
        }}>
          LET'S BUILD TOGETHER
        </a>
      </div>
    </section>
  );
}
