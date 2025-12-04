import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = await request.json();
  const { name, email, phone, date, details } = payload ?? {};

  if (!name || !email || !phone || !details) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO;

  if (!apiKey || !to) {
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
  }

  const subject = `New Sunday Studio quote request: ${name}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Preferred date: ${date || "Not specified"}`,
    "",
    "Details:",
    details,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.SMTP_FROM ?? "quotes@sunday.studio",
        to: [to],
        subject,
        text,
        reply_to: email,
      }),
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Quote email failed", error);
    return NextResponse.json({ error: "Failed to send quote" }, { status: 500 });
  }
}
