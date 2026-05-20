import { Hero } from "@/components/Hero";
import { StatsMarquee } from "@/components/StatsMarquee";
import { OnTheRecord } from "@/components/OnTheRecord";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <StatsMarquee />
      <OnTheRecord />
      <Contact />
    </main>
  );
}
