import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Career Journey",
  description:
    "From Deloitte London to eight African markets — the full career journey of Yeside Kazeem FIA, FNAS. 10 roles across two continents, one direction.",
  alternates: {
    canonical: "/journey",
  },
  openGraph: {
    title: "Career Journey · Yeside Kazeem",
    description:
      "From Deloitte London to eight African markets. Ten stops. One direction.",
    url: "https://yesidekazeem.com/journey",
    images: [{ url: "/images/yeside-hero.jpg", width: 460, height: 540, alt: "Yeside Kazeem" }],
  },
};

export default function JourneyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
