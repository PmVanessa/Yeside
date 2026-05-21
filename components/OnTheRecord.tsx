"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";

const featured = [
  {
    year: "2026",
    org: "UNDP",
    label: "Building Actuarial Capacity in Nigeria",
    type: "FEATURE",
    url: "https://irff.undp.org/blog/building-actuarial-capacity-nigeria-qa-yeside-kazeem",
  },
  {
    year: "2025",
    org: "IAA",
    label: "Presidential Town Hall · Marrakesh",
    type: "KEYNOTE",
    url: "https://www.youtube.com/watch?v=RSM9itlKxC4",
  },
  {
    year: "2025",
    org: "IAA · COP30",
    label: "Delegation · Belém",
    type: "DELEGATION",
    url: "https://actuaries.org/news-post/news-brief-november-19-2025/",
  },
];

const engagements = [
  { year: "2025", org: "IFOA",                    label: "Cultivating Careers Evening",                    type: "KEYNOTE",     url: "https://actuaries.org.uk/events/cultivating-careers-evening-insights-connection-celebration/" },
  { year: "2025", org: "ACTUVIEW",                label: "Speaker of the Month · January",                type: "RECOGNITION", url: "https://actuview.com/news/7656" },
  { year: "2024", org: "IBW WOMEN IN INSURANCE",  label: "Summit · London",                               type: "KEYNOTE",     url: "https://uk.ibwomenininsurance.com/agenda/speakers/3358904" },
  { year: "2024", org: "NIGERIAN ACTUARIAL SOC.", label: "AI Conference",                                  type: "KEYNOTE",     url: "https://www.thisdaylive.com/2024/06/27/nigerian-actuarial-society-holds-industrial-conference/" },
  { year: "2024", org: "IFOA",                    label: "University of Lagos — IFoA Accreditation",      type: "APPOINTMENT", url: "https://actuaries.org.uk/news-and-media-releases/news-articles/2024/jan/08-jan-24-university-of-lagos-achieves-ifoa-accreditation/" },
  { year: "2022", org: "IAA",                     label: "African Subcommittee — Vice Chair Appointment", type: "APPOINTMENT", url: "https://actuaries.org.ng/nas-president-yeside-kazeem-appointed-vice-chair-of-african-sub-committee-iaa/" },
  { year: "2016", org: "PENSIONS & INVESTMENTS",  label: "Africa Summit",                                 type: "SUMMIT",      url: "https://conferences.pionline.com/conference/WPS-Africa/2016/speakers/yeside-kazeem" },
];

const typeColor: Record<string, string> = {
  FEATURE:     "#C4900A",
  KEYNOTE:     "#1E50CC",
  DELEGATION:  "#0B8A6E",
  APPOINTMENT: "#8B2E8B",
  RECOGNITION: "#CC3A18",
  SUMMIT:      "#1A7A44",
};

export function OnTheRecord() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    async function init() {
      const { gsap } = await getGsap();

      ctx = gsap.context(() => {
        gsap.fromTo(".otr-featured-item", { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 1, stagger: 0.16, ease: "power3.out",
          scrollTrigger: {
            trigger: ".otr-featured-item", start: "top 84%",
            toggleActions: "play none none reset",
          },
        });
        gsap.fromTo(".otr-row", { opacity: 0, y: 16 }, {
          opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power2.out",
          scrollTrigger: {
            trigger: ".otr-list", start: "top 84%",
            toggleActions: "play none none reset",
          },
        });
      }, ref);
    }

    init();

    return () => { ctx?.revert(); };
  }, []);

  return (
    <section ref={ref} style={{ background: "#F8F7F5" }}>
      <div className="px-6 md:px-16 pt-20 lg:pt-28">

        {/* Section label */}
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: "var(--text-label)",
          color: "rgba(10,10,10,0.60)", letterSpacing: "var(--tracking-wide)",
          marginBottom: "clamp(48px, 8vh, 88px)",
        }}>
          ON THE RECORD
        </div>

        {/* ── Featured — editorial typographic display ───────── */}
        {featured.map((e, i) => (
          <a
            key={i}
            href={e.url}
            target="_blank"
            rel="noopener noreferrer"
            className="otr-featured-item"
            style={{
              display: "block",
              paddingTop: "clamp(40px, 6vh, 72px)",
              paddingBottom: "clamp(40px, 6vh, 72px)",
              borderBottom: "none",
              textDecoration: "none",
              opacity: 0,
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={ev => { (ev.currentTarget as HTMLAnchorElement).style.opacity = "0.72"; }}
            onMouseLeave={ev => { (ev.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
          >
            {/* Org name — this is the visual anchor, display scale */}
            <div style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(56px, 9vw, 130px)",
              fontWeight: 600,
              color: "#0A0A0A",
              lineHeight: 0.88,
              letterSpacing: "-0.02em",
              marginBottom: "20px",
            }}>
              {e.org}
            </div>

            {/* Event label + type/year/arrow on same row */}
            <div style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "24px",
              flexWrap: "wrap",
            }}>
              <div style={{
                fontFamily: "var(--font-dm)",
                fontSize: "clamp(var(--text-body), 1.6vw, 22px)",
                color: "rgba(10,10,10,0.75)",
                lineHeight: "var(--leading-snug)",
                maxWidth: "640px",
              }}>
                {e.label}
              </div>

              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                flexShrink: 0,
              }}>
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: "var(--text-label)",
                  color: typeColor[e.type] ?? "rgba(10,10,10,0.68)",
                  letterSpacing: "var(--tracking-wide)",
                }}>
                  {e.type} · {e.year}
                </span>
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: "var(--text-body)",
                  color: "rgba(10,10,10,0.65)",
                }}>↗</span>
              </div>
            </div>
          </a>
        ))}

        {/* ── Categorised list ──────────────────────────────── */}
        <div className="otr-list" style={{ paddingBottom: "clamp(48px, 8vh, 96px)" }}>
          {engagements.map((e, i) => (
            <a
              key={i}
              href={e.url}
              target="_blank"
              rel="noopener noreferrer"
              className="otr-row"
              style={{
                display: "block",
                padding: "28px 0",
                textDecoration: "none",
                opacity: 0,
              }}
            >
              {/* Label + arrow on same row */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "24px",
                marginBottom: "10px",
              }}>
                <span className="otr-label" style={{
                  fontFamily: "var(--font-dm)",
                  fontSize: "clamp(18px, 1.8vw, 24px)",
                  color: "rgba(10,10,10,0.90)",
                  lineHeight: "var(--leading-snug)",
                  letterSpacing: "0.03em",
                  wordSpacing: "0.16em",
                }}>
                  {e.label}
                </span>
                <span className="otr-arrow" style={{
                  fontFamily: "var(--font-mono)", fontSize: "18px",
                  color: "rgba(10,10,10,0.28)",
                  flexShrink: 0,
                  marginTop: "3px",
                  transition: "color 0.18s ease, transform 0.18s ease",
                }}>↗</span>
              </div>

              {/* Meta line: type (coloured) · year · org */}
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: "var(--text-label)",
                letterSpacing: "var(--tracking-label)",
                lineHeight: 1,
              }}>
                <span style={{ color: typeColor[e.type] ?? "rgba(10,10,10,0.65)" }}>
                  {e.type}
                </span>
                <span style={{ color: "rgba(10,10,10,0.42)" }}>
                  {" · "}{e.year}{" · "}{e.org}
                </span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
