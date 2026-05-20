"use client";

import { useEffect, useRef } from "react";

const engagements = [
  {
    year: "2026",
    org: "UNDP",
    label: "Building Actuarial Capacity in Nigeria",
    url: "https://irff.undp.org/blog/building-actuarial-capacity-nigeria-qa-yeside-kazeem",
  },
  {
    year: "2025",
    org: "IAA",
    label: "Presidential Town Hall · Marrakesh",
    url: "https://www.youtube.com/watch?v=RSM9itlKxC4",
  },
  {
    year: "2025",
    org: "IAA · COP30",
    label: "Delegation · Belém",
    url: "https://actuaries.org/news-post/news-brief-november-19-2025/",
  },
  {
    year: "2025",
    org: "IFOA",
    label: "Cultivating Careers Evening",
    url: "https://actuaries.org.uk/events/cultivating-careers-evening-insights-connection-celebration/",
  },
  {
    year: "2025",
    org: "ACTUVIEW",
    label: "Speaker of the Month · January",
    url: "https://actuview.com/news/7656",
  },
  {
    year: "2024",
    org: "IBW WOMEN IN INSURANCE",
    label: "Summit · London",
    url: "https://uk.ibwomenininsurance.com/agenda/speakers/3358904",
  },
  {
    year: "2024",
    org: "NIGERIAN ACTUARIAL SOCIETY",
    label: "AI Conference",
    url: "https://www.thisdaylive.com/2024/06/27/nigerian-actuarial-society-holds-industrial-conference/",
  },
  {
    year: "2024",
    org: "IFOA",
    label: "University of Lagos — IFoA Accreditation",
    url: "https://actuaries.org.uk/news-and-media-releases/news-articles/2024/jan/08-jan-24-university-of-lagos-achieves-ifoa-accreditation/",
  },
  {
    year: "2022",
    org: "IAA",
    label: "African Subcommittee — Vice Chair Appointment",
    url: "https://actuaries.org.ng/nas-president-yeside-kazeem-appointed-vice-chair-of-african-sub-committee-iaa/",
  },
  {
    year: "—",
    org: "ACTUVIEW",
    label: "Speaker Profile",
    url: "https://actuview.com/speakers/1877",
  },
  {
    year: "2016",
    org: "PENSIONS & INVESTMENTS",
    label: "Africa Summit",
    url: "https://conferences.pionline.com/conference/WPS-Africa/2016/speakers/yeside-kazeem",
  },
];

export function OnTheRecord() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function init() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.fromTo(".otr-rule", { scaleX: 0 }, {
          scaleX: 1, duration: 0.9, ease: "power2.inOut",
          scrollTrigger: { trigger: ref.current, start: "top 85%" },
        });
        gsap.fromTo(".otr-label", { opacity: 0, y: 16 }, {
          opacity: 1, y: 0, duration: 0.6,
          scrollTrigger: { trigger: ".otr-list", start: "top 82%" },
        });
        gsap.fromTo(".otr-row", { opacity: 0, y: 18 }, {
          opacity: 1, y: 0, duration: 0.55, stagger: 0.06, ease: "power2.out",
          scrollTrigger: { trigger: ".otr-list", start: "top 80%" },
        });
      }, ref);

      return () => ctx.revert();
    }
    init();
  }, []);

  return (
    <section ref={ref} style={{ background: "#ffffff" }}>
      <div className="otr-rule px-6 md:px-16" style={{
        height: "1px", background: "rgba(10,10,10,0.08)",
        transformOrigin: "left center", transform: "scaleX(0)",
      }} />

      <div className="px-6 md:px-16 py-20 lg:py-28">
        <div className="otr-label" style={{
          fontFamily: "var(--font-mono)", fontSize: "12px",
          color: "rgba(10,10,10,0.45)", letterSpacing: "0.2em",
          marginBottom: "40px", opacity: 0,
        }}>
          ON THE RECORD
        </div>

        <div className="otr-list">
          {engagements.map((e, i) => (
            <a
              key={i}
              href={e.url}
              target="_blank"
              rel="noopener noreferrer"
              className="otr-row"
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: "24px",
                padding: "18px 0",
                borderBottom: "1px solid rgba(10,10,10,0.07)",
                textDecoration: "none",
                opacity: 0,
                cursor: "pointer",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(10,10,10,0.02)";
                (e.currentTarget as HTMLAnchorElement).style.paddingLeft = "8px";
                (e.currentTarget as HTMLAnchorElement).style.paddingRight = "8px";
                (e.currentTarget as HTMLAnchorElement).style.marginLeft = "-8px";
                (e.currentTarget as HTMLAnchorElement).style.marginRight = "-8px";
                (e.currentTarget as HTMLAnchorElement).style.transition = "all 0.2s ease";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                (e.currentTarget as HTMLAnchorElement).style.paddingLeft = "0";
                (e.currentTarget as HTMLAnchorElement).style.paddingRight = "0";
                (e.currentTarget as HTMLAnchorElement).style.marginLeft = "0";
                (e.currentTarget as HTMLAnchorElement).style.marginRight = "0";
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: "20px", flex: 1, minWidth: 0 }}>
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: "10px",
                  color: "rgba(10,10,10,0.28)", letterSpacing: "0.14em",
                  flexShrink: 0, width: "36px",
                }}>
                  {e.year}
                </span>
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: "10px",
                  color: "rgba(10,10,10,0.35)", letterSpacing: "0.18em",
                  flexShrink: 0,
                }}>
                  {e.org}
                </span>
                <span style={{
                  fontFamily: "var(--font-dm)",
                  fontSize: "clamp(14px, 1.2vw, 17px)",
                  color: "rgba(10,10,10,0.82)",
                  lineHeight: 1.4,
                }}>
                  {e.label}
                </span>
              </div>
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: "12px",
                color: "rgba(10,10,10,0.3)", flexShrink: 0,
              }}>
                ↗
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
