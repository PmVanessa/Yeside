/**
 * Shared GSAP singleton.
 *
 * Starts loading as soon as this module is first parsed in the browser —
 * well before any useEffect fires. All components share the same promise,
 * so GSAP is only fetched once regardless of how many components use it.
 *
 * On the server (SSR) the returned promise never resolves, which is safe
 * because useEffect never runs server-side.
 */

type GsapKit = {
  gsap: (typeof import("gsap"))["gsap"];
  ScrollTrigger: (typeof import("gsap/ScrollTrigger"))["ScrollTrigger"];
};

let _kit: Promise<GsapKit> | null = null;

export function getGsap(): Promise<GsapKit> {
  if (typeof window === "undefined") {
    // SSR: return a promise that never resolves — useEffect won't run anyway.
    return new Promise(() => {});
  }

  if (!_kit) {
    _kit = (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      gsap.registerPlugin(ScrollTrigger);
      return { gsap, ScrollTrigger };
    })();
  }

  return _kit;
}

// Kick off loading immediately when this module is first parsed in the browser.
// By the time the first useEffect fires, GSAP is already in-flight or done.
if (typeof window !== "undefined") {
  getGsap();
}
