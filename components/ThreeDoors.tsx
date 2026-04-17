"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const doors = [
  {
    id: "board",
    label: "01",
    title: "Board &\nAdvisory",
    subtitle: "Two decades of governance, risk, and strategic oversight",
    proof: "Tangerine Life · NCGC · Prudential CEO",
    cta: "View governance profile",
    href: "#board",
    expandedBg: "#0F1F3D",
    expandedText: "#ffffff",
    detail:
      "Chair of ERM & Technical Committee · IFRS 17 Transition · 40% growth as MD · CRO across three countries",
    statNumber: "20+",
    statLabel: "YEARS GOVERNANCE",
    rightTag: "FIA · FNAS · CRO → MD",
  },
  {
    id: "speaking",
    label: "02",
    title: "Speaking &\nThought Leadership",
    subtitle: "On the stages where Africa's future gets decided",
    proof: "COP30 · SCGN · IBW Women in Insurance",
    cta: "Book Yeside to speak",
    href: "#speaking",
    expandedBg: "#ffffff",
    expandedText: "#0A0A0A",
    detail:
      "Corporate Governance · African Financial Systems · Actuarial Talent Development · Women in Leadership",
    statNumber: "6+",
    statLabel: "MAJOR STAGES · 2024–25",
    rightTag: "LONDON · LAGOS · GLOBAL",
  },
  {
    id: "africa",
    label: "03",
    title: "Africa\nMission",
    subtitle: "Building the profession the continent needs",
    proof: "AADA · NAS · Nigeria's first mortality table",
    cta: "Let's build together",
    href: "#africa",
    expandedBg: "#F0F4FF",
    expandedText: "#0A0A0A",
    detail:
      "Pan-African reach · English & French · COP30 IAA Representative · GAIN Ambassador",
    statNumber: "8",
    statLabel: "AFRICAN MARKETS",
    rightTag: "CONTINENTAL",
  },
];

export function ThreeDoors() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="w-full" style={{ fontFamily: "var(--font-dm)" }}>
      {doors.map((door) => {
        const isActive = active === door.id;
        const isInactive = active !== null && active !== door.id;
        const isDark = door.expandedBg === "#0F1F3D";

        return (
          <motion.div
            key={door.id}
            layout
            onHoverStart={() => setActive(door.id)}
            onHoverEnd={() => setActive(null)}
            animate={{
              height: isActive ? "65vh" : isInactive ? "80px" : "110px",
              backgroundColor: isActive ? door.expandedBg : "#ffffff",
            }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="w-full overflow-hidden border-b relative group"
            style={{ minHeight: "80px", borderColor: "rgba(27,58,107,0.12)" }}
          >
            <a
              href={door.href}
              className="flex w-full h-full items-start px-12 md:px-20 lg:px-28"
              style={{ textDecoration: "none" }}
            >
              {/* Number */}
              <div
                className="pt-6 mr-8 shrink-0"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  color: isActive
                    ? isDark ? "rgba(255,255,255,0.4)" : "#1B3A6B"
                    : "#1B3A6B",
                  letterSpacing: "0.15em",
                  opacity: isActive ? 1 : 0.6,
                  transition: "color 0.4s",
                }}
              >
                {door.label}
              </div>

              {/* Left content */}
              <div className="flex-1 pt-6 min-w-0">
                {/* Title row */}
                <div className="flex items-center justify-between">
                  <h3
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontSize: isActive
                        ? "clamp(36px, 5vw, 64px)"
                        : "clamp(20px, 2.5vw, 30px)",
                      fontWeight: 500,
                      color: isActive ? door.expandedText : "#0A0A0A",
                      lineHeight: 1.1,
                      whiteSpace: "pre-line",
                      transition: "font-size 0.5s ease, color 0.4s",
                    }}
                  >
                    {door.title}
                  </h3>
                </div>

                {/* Expanded content */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.4, delay: 0.15 }}
                      className="mt-6"
                    >
                      <p
                        style={{
                          fontSize: "clamp(16px, 1.6vw, 20px)",
                          color: isDark
                            ? "rgba(255,255,255,0.75)"
                            : "rgba(10,10,10,0.65)",
                          fontStyle: "italic",
                          fontFamily: "var(--font-cormorant)",
                          marginBottom: "16px",
                          maxWidth: "540px",
                        }}
                      >
                        {door.subtitle}
                      </p>

                      <p
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "10px",
                          color: isDark ? "rgba(255,255,255,0.45)" : "#1B3A6B",
                          letterSpacing: "0.15em",
                          marginBottom: "24px",
                        }}
                      >
                        {door.proof}
                      </p>

                      <p
                        style={{
                          fontSize: "13px",
                          color: isDark
                            ? "rgba(255,255,255,0.55)"
                            : "rgba(10,10,10,0.5)",
                          maxWidth: "480px",
                          lineHeight: 1.7,
                          marginBottom: "32px",
                        }}
                      >
                        {door.detail}
                      </p>

                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "10px",
                          fontFamily: "var(--font-mono)",
                          fontSize: "11px",
                          letterSpacing: "0.15em",
                          color: isDark ? "#ffffff" : "#1B3A6B",
                          borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.4)" : "#1B3A6B"}`,
                          paddingBottom: "2px",
                        }}
                      >
                        {door.cta} →
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Right side — stat + arrow */}
              <div
                className="shrink-0 flex flex-col items-end justify-between h-full pb-6 pt-5 pl-8"
                style={{ minWidth: "220px" }}
              >
                {/* Arrow */}
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "20px",
                    color: isActive
                      ? isDark ? "rgba(255,255,255,0.7)" : "#1B3A6B"
                      : "#1B3A6B",
                    transition: "transform 0.4s ease, color 0.4s",
                    transform: isActive ? "rotate(45deg)" : "rotate(0deg)",
                    opacity: isActive ? 1 : 0.4,
                  }}
                >
                  ↗
                </div>

                {/* Stat — only when active */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      style={{ textAlign: "right" }}
                    >
                      <div
                        style={{
                          fontFamily: "var(--font-cormorant)",
                          fontSize: "clamp(48px, 6vw, 80px)",
                          fontWeight: 600,
                          color: isDark ? "rgba(255,255,255,0.15)" : "rgba(27,58,107,0.1)",
                          lineHeight: 1,
                          marginBottom: "8px",
                        }}
                      >
                        {door.statNumber}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "9px",
                          color: isDark ? "rgba(255,255,255,0.35)" : "rgba(27,58,107,0.5)",
                          letterSpacing: "0.18em",
                        }}
                      >
                        {door.statLabel}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Tag when collapsed */}
                {!isActive && (
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "9px",
                      color: "rgba(27,58,107,0.35)",
                      letterSpacing: "0.12em",
                      textAlign: "right",
                    }}
                  >
                    {door.rightTag}
                  </div>
                )}
              </div>
            </a>

            {/* Background large watermark number */}
            <div
              style={{
                position: "absolute",
                right: "80px",
                top: "50%",
                transform: "translateY(-50%)",
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(120px, 18vw, 240px)",
                fontWeight: 700,
                lineHeight: 1,
                color: isActive
                  ? isDark ? "rgba(255,255,255,0.03)" : "rgba(27,58,107,0.04)"
                  : "rgba(27,58,107,0.025)",
                userSelect: "none",
                pointerEvents: "none",
                transition: "opacity 0.5s",
                zIndex: 0,
              }}
            >
              {door.label}
            </div>
          </motion.div>
        );
      })}
    </section>
  );
}
