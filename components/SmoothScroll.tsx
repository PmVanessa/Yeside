"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { getGsap } from "@/lib/gsap";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let destroyed = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let gsapRef: any = null;
    let tickerFn: ((time: number) => void) | null = null;

    async function init() {
      // Share the GSAP singleton — same one all components use
      const { gsap, ScrollTrigger } = await getGsap();
      if (destroyed) return;

      gsapRef = gsap;

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      lenisRef.current = lenis;

      // Tell ScrollTrigger the scroll position whenever Lenis ticks
      lenis.on("scroll", ScrollTrigger.update);

      // Drive Lenis from GSAP's ticker — same animation frame, no drift
      // GSAP ticker passes seconds; Lenis.raf() wants milliseconds
      tickerFn = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tickerFn);

      // Prevent GSAP from artificially skipping frames on a laggy tick
      gsap.ticker.lagSmoothing(0);
    }

    init();

    return () => {
      destroyed = true;
      if (gsapRef && tickerFn) gsapRef.ticker.remove(tickerFn);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
