import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Achievements",
  description:
    "Track record of Yeside Kazeem FIA, FNAS: 20+ years across 8 African markets, two active board seats, co-founder of AADA, former President of the Nigerian Actuarial Society.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "Achievements · Yeside Kazeem",
    description:
      "20+ years. 8 markets. 2 board seats. A track record that speaks for itself.",
    url: "https://yesidekazeem.com/about",
    images: [{ url: "/images/yeside-hero.jpg", width: 460, height: 540, alt: "Yeside Kazeem" }],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
