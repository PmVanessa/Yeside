"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "WORK", href: "/journey" },
  { label: "CONTACT", href: "/#contact" },
];

export function Navigation() {
  const pathname = usePathname();
  const isLight = pathname === "/";

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-16"
      style={{
        background: isLight ? "rgba(255,255,255,0.96)" : "rgba(8,8,8,0.94)",
        backdropFilter: "blur(14px)",
        borderBottom: isLight
          ? "1px solid rgba(10,10,10,0.07)"
          : "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="flex items-center justify-between py-4">
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "17px",
            fontWeight: 600,
            color: isLight ? "#0A0A0A" : "#ffffff",
            textDecoration: "none",
            letterSpacing: "0.04em",
          }}
        >
          YESIDE KAZEEM
        </Link>

        <div className="flex items-center gap-8 md:gap-10">
          {links.map((link) => {
            const base = link.href.split("#")[0] || "/";
            const isActive =
              pathname === base ||
              (base !== "/" && pathname?.startsWith(base));
            const activeColor = isLight ? "#0A0A0A" : "#ffffff";
            const inactiveColor = isLight
              ? "rgba(10,10,10,0.62)"
              : "rgba(255,255,255,0.72)";
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "13px",
                  letterSpacing: "0.2em",
                  color: isActive ? activeColor : inactiveColor,
                  textDecoration: "none",
                  borderBottom: isActive
                    ? `1px solid ${isLight ? "rgba(10,10,10,0.5)" : "rgba(255,255,255,0.5)"}`
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
      </div>
    </nav>
  );
}
