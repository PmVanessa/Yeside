"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export function Story() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function init() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.fromTo(".story-para",
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, stagger: 0.18, duration: 1, ease: "power2.out",
            scrollTrigger: { trigger: ".story-para", start: "top 80%" } }
        );
        gsap.fromTo(".story-photo",
          { opacity: 0, y: 36 },
          { opacity: 1, y: 0, duration: 1.2, ease: "power2.out",
            scrollTrigger: { trigger: ".story-photo", start: "top 80%" } }
        );
      }, sectionRef);

      return () => ctx.revert();
    }
    init();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-28 px-6 md:px-16"
      style={{ background: "#ffffff" }}
    >
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-start">

        {/* Left text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-14" style={{
            fontFamily: "var(--font-mono)", fontSize: "9px",
            color: "#1B3A6B", letterSpacing: "0.22em",
          }}>
            <div style={{ width: "36px", height: "1px", background: "#1B3A6B" }} />
            A CAREER BUILT ACROSS TWO CONTINENTS
          </div>

          <p className="story-para" style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(26px, 3vw, 42px)",
            fontWeight: 500, lineHeight: 1.35, color: "#0A0A0A",
            marginBottom: "32px", opacity: 0,
          }}>
            Yeside Kazeem has spent her career in the rooms where financial futures are decided. Then she built the rooms that did not exist yet.
          </p>

          <p className="story-para" style={{
            fontFamily: "var(--font-dm)",
            fontSize: "clamp(15px, 1.3vw, 17px)",
            fontWeight: 300, lineHeight: 1.9,
            color: "rgba(10,10,10,0.62)", marginBottom: "24px",
            maxWidth: "580px", opacity: 0,
          }}>
            A Fellow of both the Institute and Faculty of Actuaries and the Nigerian Actuarial Society, her journey began at Deloitte UK before spanning Old Mutual Nigeria and a decade-long arc with Prudential plc that took her from Chief Risk Officer to CEO across eight African markets.
          </p>

          <p className="story-para" style={{
            fontFamily: "var(--font-dm)",
            fontSize: "clamp(15px, 1.3vw, 17px)",
            fontWeight: 300, lineHeight: 1.9,
            color: "rgba(10,10,10,0.62)",
            maxWidth: "580px", marginBottom: "44px", opacity: 0,
          }}>
            Today she co-founds academies, sits on national boards, and mentors the next generation of actuaries who will do for their countries what she did for hers. Walk into situations where the infrastructure does not exist. Build it.
          </p>

          {/* Pull quote */}
          <div className="story-para" style={{
            borderLeft: "2px solid #1B3A6B",
            paddingLeft: "22px", maxWidth: "500px", opacity: 0,
          }}>
            <p style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(19px, 1.8vw, 24px)",
              fontStyle: "italic", fontWeight: 400,
              lineHeight: 1.5, color: "#0A0A0A", marginBottom: "8px",
            }}>
              "Growing the number of actuaries in Africa is well and truly a passion of mine."
            </p>
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: "8px",
              color: "#1B3A6B", letterSpacing: "0.15em",
            }}>
              YESIDE KAZEEM FIA, FNAS
            </div>
          </div>
        </div>

        {/* Right portrait */}
        <div className="story-photo lg:w-[320px] w-full shrink-0 opacity-0" style={{ position: "sticky", top: "100px" }}>
          <div style={{
            borderRadius: "3px", overflow: "hidden",
            boxShadow: "0 20px 60px rgba(27,58,107,0.13)", marginBottom: "16px",
          }}>
            <Image
              src="/images/yeside-navy.jpg"
              alt="Yeside Kazeem"
              width={320}
              height={400}
              style={{ display: "block", width: "100%", height: "auto", filter: "grayscale(8%)" }}
            />
          </div>

          {/* Stats strip */}
          <div style={{
            background: "#0F1F3D", padding: "18px 22px",
            borderRadius: "3px", display: "flex", justifyContent: "space-between",
          }}>
            {[{ num: "20+", label: "YEARS" }, { num: "8", label: "MARKETS" }, { num: "2", label: "CONTINENTS" }].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{
                  fontFamily: "var(--font-cormorant)", fontSize: "26px",
                  fontWeight: 600, color: "#ffffff", lineHeight: 1,
                }}>{s.num}</div>
                <div style={{
                  fontFamily: "var(--font-mono)", fontSize: "7px",
                  color: "rgba(255,255,255,0.35)", letterSpacing: "0.18em", marginTop: "4px",
                }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
