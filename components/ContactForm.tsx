"use client";

import { useState } from "react";

type Intent = "speaking" | "board" | "africa" | "";

const intents: { value: Intent; label: string }[] = [
  { value: "speaking", label: "Speaking / Keynote" },
  { value: "board", label: "Board Advisory" },
  { value: "africa", label: "Africa Mission / AADA" },
];

export function ContactForm() {
  const [intent, setIntent] = useState<Intent>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !intent) return;
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, intent, message }),
      });
      if (res.ok) {
        setStatus("sent");
        setName(""); setEmail(""); setIntent(""); setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputStyle: React.CSSProperties = {
    fontFamily: "var(--font-dm)",
    fontSize: "15px",
    color: "#0A0A0A",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(10,10,10,0.2)",
    padding: "12px 0",
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    color: "rgba(10,10,10,0.55)",
    letterSpacing: "0.18em",
    display: "block",
    marginBottom: "6px",
  };

  if (status === "sent") {
    return (
      <div style={{ padding: "48px 0", textAlign: "center" }}>
        <div style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(28px, 3.5vw, 42px)",
          fontWeight: 500, color: "#0A0A0A", marginBottom: "16px",
        }}>
          Message received.
        </div>
        <p style={{
          fontFamily: "var(--font-dm)", fontSize: "16px",
          color: "rgba(10,10,10,0.65)", lineHeight: 1.7,
        }}>
          Yeside will be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Intent selector */}
      <div style={{ marginBottom: "32px" }}>
        <span style={labelStyle}>I AM REACHING OUT ABOUT</span>
        <div className="flex flex-wrap gap-3" style={{ marginTop: "10px" }}>
          {intents.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setIntent(value)}
              style={{
                fontFamily: "var(--font-mono)", fontSize: "12px",
                letterSpacing: "0.14em", padding: "10px 20px",
                border: `1px solid ${intent === value ? "#1B3A6B" : "rgba(10,10,10,0.25)"}`,
                background: intent === value ? "#1B3A6B" : "transparent",
                color: intent === value ? "#ffffff" : "rgba(10,10,10,0.65)",
                cursor: "pointer", transition: "all 0.15s",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ marginBottom: "28px" }}>
        <div>
          <label style={labelStyle} htmlFor="cf-name">YOUR NAME</label>
          <input
            id="cf-name"
            type="text"
            required
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Full name"
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle} htmlFor="cf-email">EMAIL ADDRESS</label>
          <input
            id="cf-email"
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@organisation.com"
            style={inputStyle}
          />
        </div>
      </div>

      <div style={{ marginBottom: "36px" }}>
        <label style={labelStyle} htmlFor="cf-message">MESSAGE (OPTIONAL)</label>
        <textarea
          id="cf-message"
          rows={4}
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Tell Yeside a little about your opportunity or event..."
          style={{ ...inputStyle, resize: "none", lineHeight: 1.7 }}
        />
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <button
          type="submit"
          disabled={status === "sending" || !name || !email || !intent}
          style={{
            fontFamily: "var(--font-mono)", fontSize: "13px",
            letterSpacing: "0.16em", color: "#ffffff",
            background: (!name || !email || !intent) ? "rgba(27,58,107,0.4)" : "#1B3A6B",
            border: "1px solid #1B3A6B",
            padding: "14px 32px",
            cursor: (!name || !email || !intent) ? "not-allowed" : "pointer",
            transition: "background 0.2s",
          }}
        >
          {status === "sending" ? "SENDING..." : "SEND MESSAGE →"}
        </button>
        {status === "error" && (
          <span style={{ fontFamily: "var(--font-dm)", fontSize: "14px", color: "#c0392b" }}>
            Something went wrong. Please try again.
          </span>
        )}
      </div>
    </form>
  );
}
