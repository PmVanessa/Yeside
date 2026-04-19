"use client";

import { ContactForm } from "@/components/ContactForm";
import Link from "next/link";

export default function ContactPage() {
  return (
    <main style={{ background: "#ffffff", minHeight: "100vh" }}>
      <section className="px-6 md:px-16 pt-36 pb-24" style={{ maxWidth: "900px" }}>

        {/* Header */}
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: "12px",
          color: "rgba(10,10,10,0.52)", letterSpacing: "0.2em", marginBottom: "24px",
        }}>
          GET IN TOUCH
        </div>

        <h1 style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(40px, 6vw, 80px)",
          fontWeight: 600, color: "#0A0A0A",
          lineHeight: 1.0, letterSpacing: "-0.02em",
          marginBottom: "20px",
        }}>
          Let&apos;s build<br />something together.
        </h1>

        <p style={{
          fontFamily: "var(--font-dm)",
          fontSize: "clamp(15px, 1.3vw, 18px)",
          color: "rgba(10,10,10,0.72)",
          lineHeight: 1.8, maxWidth: "520px",
          marginBottom: "56px",
        }}>
          Whether you&apos;re planning an event, filling a board seat, or building
          the African actuarial profession — Yeside would like to hear from you.
        </p>

        <ContactForm />

        <div style={{
          marginTop: "48px",
          paddingTop: "32px",
          borderTop: "1px solid rgba(10,10,10,0.07)",
        }}>
          <Link href="/" style={{
            fontFamily: "var(--font-mono)", fontSize: "12px",
            color: "rgba(10,10,10,0.55)", letterSpacing: "0.16em",
            textDecoration: "none",
          }}>
            ← BACK TO PROFILE
          </Link>
        </div>
      </section>
    </main>
  );
}
