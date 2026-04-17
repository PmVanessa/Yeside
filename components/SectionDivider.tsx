"use client";

import { useEffect, useRef } from "react";

export function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function init() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!ref.current) return;

      gsap.fromTo(
        ref.current.querySelector(".divider-line"),
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.4,
          ease: "power3.out",
          transformOrigin: "left",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 90%",
          },
        }
      );
    }
    init();
  }, []);

  return (
    <div ref={ref} className="w-full px-12 md:px-20 lg:px-28 py-2">
      <div
        className="divider-line"
        style={{
          width: "100%",
          height: "1px",
          background: "rgba(27,58,107,0.12)",
        }}
      />
    </div>
  );
}
