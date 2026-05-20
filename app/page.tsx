import { Hero } from "@/components/Hero";
import { StatsMarquee } from "@/components/StatsMarquee";
import { OnTheRecord } from "@/components/OnTheRecord";
import { WhatSheDoes } from "@/components/WhatSheDoes";
import { AfricaSection } from "@/components/AfricaSection";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <StatsMarquee />
      <OnTheRecord />
      <WhatSheDoes />
      <AfricaSection />
      <Contact />
    </main>
  );
}
