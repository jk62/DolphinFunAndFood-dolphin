// src/app/api/enquiry/route.ts

import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
export const runtime = "nodejs";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  date: z.string().min(4), // ISO date or any non-empty
  guests: z.string().min(1), // keep string; you can parseInt if needed
  message: z.string().optional().default(""),
});

const resend = new Resend(process.env.RESEND_API_KEY);
const TO = process.env.ENQUIRY_TO_EMAIL || "you@example.com";

// Simple HTML template
const htmlTemplate = (data: z.infer<typeof schema>) => `
  <div style="font-family:Arial,sans-serif;line-height:1.5">
    <h2>New Banquet Enquiry</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone}</p>
    <p><strong>Event Date:</strong> ${data.date}</p>
    <p><strong>Guests:</strong> ${data.guests}</p>
    <p><strong>Message:</strong><br/>${(data.message || "").replace(/\n/g, "<br/>")}</p>
  </div>
`;

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const data = schema.parse(json);

    // Send the email
    const { error } = await resend.emails.send({
      from: "Dolphin Enquiries <onboarding@resend.dev>", // works without domain setup
      to: [TO],
      subject: `Banquet Enquiry: ${data.name} (${data.guests} guests)`,
      html: htmlTemplate(data),
      text: `
New Banquet Enquiry

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Event Date: ${data.date}
Guests: ${data.guests}

Message:
${data.message || "-"}
      `.trim(),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Email send failed" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const msg =
      e instanceof Error
        ? e.message
        : typeof e === "string"
          ? e
          : "Bad request";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
