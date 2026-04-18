"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const stops = [
  {
    year: "2004",
    city: "LONDON",
    country: "UNITED KINGDOM",
    coords: "51.5074°N, 0.1278°W",
    org: "Deloitte UK",
    role: "Manager, Actuarial",
    impact: "Pensions, investment and life assurance. Valuation, M&A, audit support across major UK clients.",
    logo: "https://images.seeklogo.com/logo-png/21/1/deloitte-logo-png_seeklogo-218990.png",
    logoWidth: 240,
    logoHeight: 44,
    bg: "#080808",
    accent: "#86BC25",
  },
  {
    year: "2014",
    city: "LAGOS",
    country: "NIGERIA",
    coords: "6.5244°N, 3.3792°E",
    org: "Old Mutual Nigeria",
    role: "Actuarial Executive",
    impact: "Life assurance and building Nigeria's early actuarial practice. Laying the groundwork for a generation of actuaries.",
    logo: "https://companieslogo.com/img/orig/OMU.JO_BIG-5d5b6185.png?t=1720244493",
    logoWidth: 260,
    logoHeight: 60,
    bg: "#0F1F3D",
    accent: "#00A3A1",
  },
  {
    year: "2016",
    city: "NAIROBI",
    country: "KENYA",
    coords: "1.2921°S, 36.8219°E",
    org: "Prudential Africa",
    role: "Senior Business Development",
    impact: "Designed and deployed the Enterprise Risk Framework across eight African markets: Kenya, Ghana, Nigeria, Uganda, Zambia, Cameroon, Togo, Côte d'Ivoire.",
    logo: "https://prudential.co.ke/wp-content/uploads/2017/11/big-logo-1x.png",
    logoWidth: 220,
    logoHeight: 60,
    bg: "#080808",
    accent: "#E3000F",
  },
  {
    year: "2017",
    city: "LAGOS",
    country: "NIGERIA",
    coords: "6.5244°N, 3.3792°E",
    org: "Nigerian Actuarial Society",
    role: "President",
    impact: "Achieved IAA full member status, a milestone in the history of Nigerian actuarial practice. Exponential membership growth during tenure.",
    logo: "https://api.actuview.com/cache/3d066fb479c22aa8daa91e1d32a1bff0.webp",
    logoWidth: 200,
    logoHeight: 100,
    bg: "#0F1F3D",
    accent: "#1B3A6B",
  },
  {
    year: "2019",
    city: "DOUALA",
    country: "CAMEROON",
    coords: "4.0511°N, 9.7679°E",
    org: "Prudential Beneficial Group",
    role: "Group CRO & Chief Actuary",
    impact: "Built the risk architecture across Cameroon, Togo, and Côte d'Ivoire. Operating in French and English across West and Central Africa.",
    logo: "https://prudential.co.ke/wp-content/uploads/2017/11/big-logo-1x.png",
    logoWidth: 220,
    logoHeight: 60,
    bg: "#080808",
    accent: "#E3000F",
  },
  {
    year: "2020",
    city: "DOUALA",
    country: "CAMEROON",
    coords: "4.0511°N, 9.7679°E",
    org: "Prudential Beneficial General",
    role: "Managing Director",
    impact: "Led the 2nd fastest growing non-life insurance firm in Cameroon. 40% revenue growth in 2021. CEO-level P&L ownership across two markets.",
    logo: "https://prudential.co.ke/wp-content/uploads/2017/11/big-logo-1x.png",
    logoWidth: 220,
    logoHeight: 60,
    bg: "#0F1F3D",
    accent: "#E3000F",
  },
  {
    year: "2022",
    city: "GLOBAL",
    country: "CONTINENTAL AFRICA",
    coords: "CONTINENTAL",
    org: "International Actuarial Association",
    role: "Vice Chair, Africa Subcommittee",
    impact: "Continental actuarial development at global scale. Representing Africa's actuarial interests on the world stage.",
    logo: "https://actuaries.org/app/uploads/2024/12/IAA_Horizontal_RGB.png",
    logoWidth: 260,
    logoHeight: 60,
    bg: "#080808",
    accent: "#004B87",
  },
  {
    year: "2023",
    city: "LAGOS",
    country: "NIGERIA",
    coords: "6.5244°N, 3.3792°E",
    org: "Tangerine Life Insurance",
    role: "Independent Non-Executive Director",
    impact: "Chairs the Enterprise Risk Management and Technical Committee. Serves on Audit and Remuneration Committees.",
    logo: "/images/logos/tangerine.svg",
    logoWidth: 220,
    logoHeight: 60,
    bg: "#0F1F3D",
    accent: "#FF6B2C",
  },
  {
    year: "2024",
    city: "LONDON",
    country: "PAN-AFRICAN",
    coords: "CONTINENTAL",
    org: "African Actuarial Development Academy",
    role: "Co-Founder",
    impact: "A pan-African body created by actuaries in Africa, for actuaries in Africa. Developing the next generation of qualified professionals in English and French.",
    logo: "https://api.actuview.com/cache/94179148dc69024b324e34e0509427e2.webp",
    logoWidth: 200,
    logoHeight: 100,
    bg: "#080808",
    accent: "#1B3A6B",
  },
  {
    year: "2025",
    city: "ABUJA",
    country: "NIGERIA",
    coords: "9.0765°N, 7.3986°E",
    org: "NCGC",
    role: "Independent Non-Executive Director",
    impact: "FG-backed institution unlocking MSME financing across Nigeria. Inaugurated by VP Kashim Shettima. Board level oversight of credit guarantee operations.",
    logo: "https://ncgc.ng/wp-content/uploads/2025/05/Logo-as-at-15th-May-2025.png",
    logoWidth: 220,
    logoHeight: 80,
    bg: "#0F1F3D",
    accent: "#008751",
  },
];

export default function JourneyPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function init() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      stops.forEach((_, i) => {
        const ctx = gsap.context(() => {
          gsap.fromTo(`.stop-logo-${i}`,
            { opacity: 0, y: 30, scale: 0.92 },
            { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power2.out",
              scrollTrigger: { trigger: `.stop-section-${i}`, start: "top 60%" } }
          );
          gsap.fromTo(`.stop-content-${i}`,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.15,
              scrollTrigger: { trigger: `.stop-section-${i}`, start: "top 60%" } }
          );
        });
        return () => ctx.revert();
      });
    }
    init();
  }, []);

  return (
    <main ref={containerRef} style={{ background: "#080808" }}>

      {/* Stop dot navigation ·right side */}
      <div className="hidden md:flex fixed right-6 top-1/2 z-50 flex-col gap-3"
        style={{ transform: "translateY(-50%)" }}>
        {stops.map((s, i) => (
          <a
            key={i}
            href={`#stop-${i}`}
            title={`${s.year} · ${s.org}`}
            style={{
              display: "block", width: "6px", height: "6px", borderRadius: "50%",
              background: "rgba(255,255,255,0.25)", transition: "background 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.8)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.25)")}
          />
        ))}
      </div>

      {/* Stops */}
      {stops.map((stop, i) => (
        <section
          key={i}
          id={`stop-${i}`}
          className={`stop-section-${i} relative w-full flex items-center`}
          style={{
            minHeight: "100vh",
            background: stop.bg,
            borderBottom: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          {/* Accent gradient */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: `radial-gradient(ellipse 60% 60% at ${i % 2 === 0 ? "80%" : "20%"} 50%, ${stop.accent}0D 0%, transparent 70%)`,
          }} />

          {/* Year watermark */}
          <div className="absolute pointer-events-none select-none" style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(140px, 22vw, 320px)",
            fontWeight: 700,
            color: "#ffffff",
            opacity: 0.025,
            lineHeight: 1,
            right: i % 2 === 0 ? "-2vw" : "auto",
            left: i % 2 !== 0 ? "-2vw" : "auto",
            top: "50%",
            transform: "translateY(-50%)",
            userSelect: "none",
          }}>
            {stop.year}
          </div>

          {/* Content */}
          <div className="relative z-10 w-full px-6 md:px-16 pt-28 pb-20">
            <div className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-16 lg:gap-24`}>

              {/* Logo side */}
              <div className={`stop-logo-${i} flex-shrink-0 flex items-center justify-center`}
                style={{ width: "100%", maxWidth: "360px", opacity: 0 }}>
                <div style={{
                  padding: "44px 48px",
                  background: "#ffffff",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  minHeight: "160px",
                  boxShadow: "0 32px 80px rgba(0,0,0,0.4)",
                }}>
                  <Image
                    src={stop.logo}
                    alt={stop.org}
                    width={stop.logoWidth}
                    height={stop.logoHeight}
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      objectFit: "contain",
                    }}
                    unoptimized
                  />
                </div>
              </div>

              {/* Text side */}
              <div className={`stop-content-${i} flex-1`} style={{ opacity: 0 }}>
                {/* City · Year */}
                <div style={{
                  fontFamily: "var(--font-mono)", fontSize: "11px",
                  color: "rgba(255,255,255,0.55)", letterSpacing: "0.18em", marginBottom: "6px",
                }}>
                  {stop.city} · {stop.country}
                </div>
                {/* Coords */}
                <div style={{
                  fontFamily: "var(--font-mono)", fontSize: "11px",
                  color: "rgba(255,255,255,0.45)", letterSpacing: "0.12em", marginBottom: "20px",
                }}>
                  {stop.coords} · {stop.year}
                </div>

                {/* Org name */}
                <h2 style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(36px, 5.5vw, 72px)",
                  fontWeight: 600,
                  color: "#ffffff",
                  lineHeight: 1.05,
                  marginBottom: "16px",
                  maxWidth: "640px",
                }}>
                  {stop.org}
                </h2>

                {/* Role */}
                <div style={{
                  fontFamily: "var(--font-mono)", fontSize: "11px",
                  color: stop.accent, letterSpacing: "0.16em", marginBottom: "24px",
                  textTransform: "uppercase",
                }}>
                  {stop.role}
                </div>

                {/* Divider */}
                <div style={{ width: "40px", height: "1px", background: "rgba(255,255,255,0.15)", marginBottom: "24px" }} />

                {/* Impact */}
                <p style={{
                  fontFamily: "var(--font-dm)",
                  fontSize: "clamp(15px, 1.3vw, 18px)",
                  color: "rgba(255,255,255,0.82)",
                  lineHeight: 1.8,
                  maxWidth: "520px",
                }}>
                  {stop.impact}
                </p>

              </div>
            </div>
          </div>

        </section>
      ))}

      {/* Footer CTA */}
      <div className="px-6 md:px-16 py-24 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
        style={{ background: "#080808", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div>
          <div style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(28px, 3.5vw, 48px)",
            fontWeight: 500, color: "#ffffff", lineHeight: 1.15, marginBottom: "12px",
          }}>
            Twenty years. Two continents.<br />One direction.
          </div>
          <div style={{
            fontFamily: "var(--font-dm)", fontSize: "14px",
            color: "rgba(255,255,255,0.62)", letterSpacing: "0.02em",
          }}>
            London to Continental Africa, still building.
          </div>
        </div>
        <Link href="/" style={{
          display: "inline-flex", alignItems: "center", gap: "10px",
          fontFamily: "var(--font-mono)", fontSize: "12px", color: "#ffffff",
          letterSpacing: "0.16em", textDecoration: "none", flexShrink: 0,
          background: "#1B3A6B",
          border: "1px solid #1B3A6B",
          padding: "13px 26px",
        }}>
          ← BACK TO PROFILE
        </Link>
      </div>
    </main>
  );
}
