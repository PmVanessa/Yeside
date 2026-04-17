import { Hero } from "@/components/Hero";
import { Statement } from "@/components/Statement";
import { ThreeDoors } from "@/components/ThreeDoors";
import { Story } from "@/components/Story";
import { Timeline } from "@/components/Timeline";
import { Numbers } from "@/components/Numbers";
import { BoardSection } from "@/components/BoardSection";
import { SpeakingSection } from "@/components/SpeakingSection";
import { AfricaSection } from "@/components/AfricaSection";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Statement />
      <ThreeDoors />
      <Story />
      <Timeline />
      <Numbers />
      <BoardSection />
      <SpeakingSection />
      <AfricaSection />
      <Contact />
    </main>
  );
}
