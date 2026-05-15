"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "WORK", href: "/journey" },
  { label: "CONTACT", href: "/#contact" },
];

export function Navigation() {
  const pathname = usePathname();
  const isLight = pathname === "/";
  const [open, setOpen] = useState(false);

  const bg = isLight ? "rgba(255,255,255,0.96)" : "rgba(8,8,8,0.94)";
  const border = isLight
    ? "1px solid rgba(10,10,10,0.07)"
    : "1px solid rgba(255,255,255,0.06)";
  const logoColor = isLight ? "#0A0A0A" : "#ffffff";
  const activeColor = isLight ? "#0A0A0A" : "#ffffff";
  const inactiveColor = isLight ? "rgba(10,10,10,0.55)" : "rgba(255,255,255,0.65)";
  const iconColor = isLight ? "#0A0A0A" : "#ffffff";

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-16"
        style={{ background: bg, backdropFilter: "blur(14px)", borderBottom: border, height: "60px" }}
      >
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "17px",
              fontWeight: 600,
              color: logoColor,
              textDecoration: "none",
              letterSpacing: "0.04em",
              flexShrink: 0,
            }}
          >
            YESIDE KAZEEM
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10">
            {links.map((link) => {
              const base = link.href.split("#")[0] || "/";
              const isActive =
                pathname === base || (base !== "/" && pathname?.startsWith(base));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "12px",
                    letterSpacing: "0.22em",
                    color: isActive ? activeColor : inactiveColor,
                    textDecoration: "none",
                    borderBottom: isActive
                      ? `1px solid ${isLight ? "rgba(10,10,10,0.45)" : "rgba(255,255,255,0.45)"}`
                      : "1px solid transparent",
                    paddingBottom: "2px",
                    transition: "color 0.2s",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "6px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "5px",
              width: "32px",
              height: "32px",
            }}
          >
            <span style={{
              display: "block", height: "1px", background: iconColor,
              width: "22px",
              transformOrigin: "center",
              transition: "transform 0.25s ease, opacity 0.2s",
              transform: open ? "translateY(6px) rotate(45deg)" : "none",
            }} />
            <span style={{
              display: "block", height: "1px", background: iconColor,
              width: "14px",
              transition: "opacity 0.2s",
              opacity: open ? 0 : 1,
            }} />
            <span style={{
              display: "block", height: "1px", background: iconColor,
              width: "22px",
              transformOrigin: "center",
              transition: "transform 0.25s ease, opacity 0.2s",
              transform: open ? "translateY(-6px) rotate(-45deg)" : "none",
            }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu dropdown */}
      <div
        className="md:hidden fixed left-0 right-0 z-40 overflow-hidden"
        style={{
          top: "60px",
          background: isLight ? "rgba(255,255,255,0.98)" : "rgba(8,8,8,0.98)",
          backdropFilter: "blur(16px)",
          borderBottom: open ? border : "none",
          maxHeight: open ? "300px" : "0px",
          transition: "max-height 0.3s ease, border-bottom 0.3s",
        }}
      >
        <div className="px-6 py-6 flex flex-col gap-6">
          {links.map((link) => {
            const base = link.href.split("#")[0] || "/";
            const isActive =
              pathname === base || (base !== "/" && pathname?.startsWith(base));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "13px",
                  letterSpacing: "0.22em",
                  color: isActive ? activeColor : inactiveColor,
                  textDecoration: "none",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
