import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, intent, message } = await req.json();

    if (!name || !email || !intent) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const intentLabels: Record<string, string> = {
      speaking: "Speaking / Keynote",
      board: "Board Advisory",
      africa: "Africa Mission / AADA",
    };

    // Log the submission (replace with your email service: Resend, SendGrid, etc.)
    console.log("Contact form submission:", {
      name,
      email,
      intent: intentLabels[intent] ?? intent,
      message: message || "(no message)",
      receivedAt: new Date().toISOString(),
    });

    // TODO: Integrate with an email service (e.g. Resend)
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "noreply@yesidekazeem.com",
    //   to: "yeside@yesidekazeem.com",
    //   subject: `New enquiry: ${intentLabels[intent]} from ${name}`,
    //   html: `<p><strong>Name:</strong> ${name}</p>
    //          <p><strong>Email:</strong> ${email}</p>
    //          <p><strong>Intent:</strong> ${intentLabels[intent]}</p>
    //          <p><strong>Message:</strong> ${message || "—"}</p>`,
    // });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
