import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Yeside Kazeem FIA, FNAS for speaking engagements, board advisory opportunities, or Africa mission collaboration.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact · Yeside Kazeem",
    description: "Speaking. Board advisory. Africa mission. Get in touch.",
    url: "https://yesidekazeem.com/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
