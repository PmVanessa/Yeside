import { Hero } from "@/components/Hero";
import { ProofSection } from "@/components/ProofSection";
import { WhatSheDoes } from "@/components/WhatSheDoes";
import { AfricaSection } from "@/components/AfricaSection";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProofSection />
      <WhatSheDoes />
      <AfricaSection />
      <Contact />
    </main>
  );
}
