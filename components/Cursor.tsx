"use client";

import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const coordsRef = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const coordsEl = coordsRef.current;
    if (!cursor || !coordsEl) return;

    let mouseX = 0;
    let mouseY = 0;
    let curX = 0;
    let curY = 0;

    // London base coordinates
    const LAT_BASE = 51.5074;
    const LNG_BASE = -0.1278;
    const LAT_RANGE = 0.4;
    const LNG_RANGE = 0.6;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setVisible(true);

      // Map position to coordinates
      const xRatio = e.clientX / window.innerWidth;
      const yRatio = e.clientY / window.innerHeight;
      const lat = LAT_BASE + (0.5 - yRatio) * LAT_RANGE;
      const lng = LNG_BASE + (xRatio - 0.5) * LNG_RANGE;

      const latDir = lat >= 0 ? "N" : "S";
      const lngDir = lng >= 0 ? "E" : "W";
      coordsEl.textContent = `${Math.abs(lat).toFixed(4)}°${latDir}, ${Math.abs(lng).toFixed(4)}°${lngDir}`;
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    let rafId: number;
    function lerp(a: number, b: number, n: number) {
      return (1 - n) * a + n * b;
    }

    function animate() {
      curX = lerp(curX, mouseX, 0.12);
      curY = lerp(curY, mouseY, 0.12);
      if (cursor) {
        cursor.style.transform = `translate(${curX - 20}px, ${curY - 20}px)`;
      }
      rafId = requestAnimationFrame(animate);
    }
    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="cursor-crosshair"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s" }}
    >
      {/* Crosshair */}
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        {/* Horizontal line */}
        <line x1="0" y1="20" x2="16" y2="20" stroke="#1B3A6B" strokeWidth="1" />
        <line x1="24" y1="20" x2="40" y2="20" stroke="#1B3A6B" strokeWidth="1" />
        {/* Vertical line */}
        <line x1="20" y1="0" x2="20" y2="16" stroke="#1B3A6B" strokeWidth="1" />
        <line x1="20" y1="24" x2="20" y2="40" stroke="#1B3A6B" strokeWidth="1" />
        {/* Center dot */}
        <circle cx="20" cy="20" r="1.5" fill="#1B3A6B" />
      </svg>
      {/* Coordinates label */}
      <span
        ref={coordsRef}
        style={{
          position: "absolute",
          top: "44px",
          left: "10px",
          fontFamily: "var(--font-mono)",
          fontSize: "9px",
          color: "#1B3A6B",
          whiteSpace: "nowrap",
          letterSpacing: "0.05em",
          opacity: 0.7,
        }}
      />
    </div>
  );
}
