import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navigation } from "@/components/Navigation";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yesidekazeem.com"),
  title: {
    default: "Yeside Kazeem FIA, FNAS · Actuary. Builder. Board Director.",
    template: "%s · Yeside Kazeem",
  },
  description:
    "Entrepreneurial actuary and institution-builder operating across London and Africa. Board Advisory · Speaking · Africa Mission.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Yeside Kazeem FIA, FNAS",
    description: "Entrepreneurial actuary. Building what Africa's financial future needs.",
    type: "website",
    url: "https://yesidekazeem.com",
    siteName: "Yeside Kazeem",
    images: [
      {
        url: "/images/yeside-hero.jpg",
        width: 460,
        height: 540,
        alt: "Yeside Kazeem FIA FNAS — Actuary, Board Director, Co-Founder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yeside Kazeem FIA, FNAS",
    description: "Entrepreneurial actuary. Building what Africa's financial future needs.",
    images: ["/images/yeside-hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${spaceMono.variable}`}
    >
      <body suppressHydrationWarning>
        <Navigation />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
