// src/app/api/tickets/new/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import dayjs from "dayjs";
import QRCode from "qrcode";
import { Resend } from "resend";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  date: z.string().min(4), // yyyy-mm-dd
  count: z.string().min(1), // keep string; parseInt later if needed
});

const secret = new TextEncoder().encode(process.env.TICKET_SIGNING_SECRET);
const resend = new Resend(process.env.RESEND_API_KEY);

// Prefer explicit NEXT_PUBLIC_BASE_URL, else use Vercel’s deployment URL, else localhost
function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const data = schema.parse(json);

    const tid = nanoid(10);
    const payload = {
      tid,
      name: data.name.trim(),
      email: data.email.trim(),
      date: data.date.trim(),
      count: data.count.trim(),
      iat: Math.floor(Date.now() / 1000),
      exp: dayjs(data.date).endOf("day").add(1, "day").unix(),
    };

    // Sign token
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .sign(secret);

    const base = getBaseUrl();
    const ticketUrl = `${base}/ticket/${encodeURIComponent(token)}`;

    // QR image (inline)
    const qrDataUrl = await QRCode.toDataURL(ticketUrl, {
      margin: 1,
      width: 512,
    });

    const from =
      process.env.TICKET_FROM_EMAIL ||
      "Dolphin Tickets <onboarding@resend.dev>";
    const replyTo =
      process.env.TICKET_REPLY_TO || "hello@dolphinfunandfood.com";
    const org = "Dolphin Fun & Food";

    // --- Email template ---
    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.5">
        <h2>${org} — Water Park Ticket</h2>
        <p><strong>Ticket ID:</strong> ${tid}</p>
        <p><strong>Name:</strong> ${payload.name}<br/>
           <strong>Date:</strong> ${payload.date}<br/>
           <strong>Tickets:</strong> ${payload.count}</p>
        <p>Present this QR at the gate:</p>
        <p><img src="${qrDataUrl}" width="256" height="256" alt="QR Ticket"/></p>
        <p>You can also open your ticket here:<br/>
          <a href="${ticketUrl}">${ticketUrl}</a>
        </p>
        <hr/>
        <p style="font-size:12px;color:#555">
          This is an MVP ticket without payment. Contact us if you need help.
        </p>
      </div>
    `;

    // Use your own email in Resend sandbox (no domain verification yet)
    const recipient =
      process.env.NODE_ENV === "development"
        ? "jaikishanbhargav@gmail.com"
        : "jaikishanbhargav@gmail.com"; // until domain verified

    const result = await resend.emails.send({
      from,
      to: [recipient],
      subject: `${org} Ticket — ${payload.date} — ${tid}`,
      html,
      replyTo,
    });

    console.log("Resend send() result:", JSON.stringify(result, null, 2));

    if (result.error) {
      const errObj = result.error;
      const name =
        typeof errObj === "object" && errObj && "name" in errObj
          ? String((errObj as { name?: unknown }).name ?? "ResendError")
          : "ResendError";
      const message =
        typeof errObj === "object" && errObj && "message" in errObj
          ? String((errObj as { message?: unknown }).message ?? "Unknown error")
          : String(errObj);

      return NextResponse.json(
        { error: `${name}: ${message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, token, ticketUrl });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Bad request";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//
// // src/app/api/tickets/new/route.ts
// import { NextResponse } from "next/server";
// import { z } from "zod";
// import { SignJWT } from "jose";
// import { nanoid } from "nanoid";
// import dayjs from "dayjs";
// import QRCode from "qrcode";
// import { Resend } from "resend";

// export const runtime = "nodejs";

// const schema = z.object({
//   name: z.string().min(2),
//   email: z.string().email(),
//   date: z.string().min(4), // yyyy-mm-dd
//   count: z.string().min(1), // keep string; parseInt later if needed
// });

// const secret = new TextEncoder().encode(process.env.TICKET_SIGNING_SECRET);
// const resend = new Resend(process.env.RESEND_API_KEY);
// // prefer explicit NEXT_PUBLIC_BASE_URL, else use Vercel’s URL, else localhost
// const base =
//   process.env.NEXT_PUBLIC_BASE_URL ||
//   (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

// export async function POST(req: Request) {
//   try {
//     const json = await req.json();
//     const data = schema.parse(json);

//     const tid = nanoid(10);
//     const payload = {
//       tid,
//       name: data.name.trim(),
//       email: data.email.trim(),
//       date: data.date.trim(),
//       count: data.count.trim(),
//       iat: Math.floor(Date.now() / 1000),
//       exp: dayjs(data.date).endOf("day").add(1, "day").unix(),
//     };

//     const token = await new SignJWT(payload)
//       .setProtectedHeader({ alg: "HS256" })
//       .sign(secret);

//     const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
//     const ticketUrl = `${base}/ticket/${encodeURIComponent(token)}`;

//     const qrDataUrl = await QRCode.toDataURL(ticketUrl, {
//       margin: 1,
//       width: 512,
//     });

//     const from =
//       process.env.TICKET_FROM_EMAIL ||
//       "Dolphin Tickets <onboarding@resend.dev>";
//     const replyTo =
//       process.env.TICKET_REPLY_TO || "hello@dolphinfunandfood.com";
//     const org = "Dolphin Fun & Food";

//     const html = `
//       <div style="font-family:Arial,sans-serif;line-height:1.5">
//         <h2>${org} — Water Park Ticket</h2>
//         <p><strong>Ticket ID:</strong> ${tid}</p>
//         <p><strong>Name:</strong> ${payload.name}<br/>
//            <strong>Date:</strong> ${payload.date}<br/>
//            <strong>Tickets:</strong> ${payload.count}</p>
//         <p>Present this QR at the gate:</p>
//         <p><img src="${qrDataUrl}" width="256" height="256" alt="QR Ticket"/></p>
//         <p>You can also open your ticket here:<br/>
//           <a href="${ticketUrl}">${ticketUrl}</a>
//         </p>
//         <hr/>
//         <p style="font-size:12px;color:#555">This is an MVP ticket without payment. Contact us if you need help.</p>
//       </div>
//     `;

//     // Send only to your own email in development (Resend sandbox)
//     const recipient =
//       process.env.NODE_ENV === "development"
//         ? "jaikishanbhargav@gmail.com" // your Resend account email
//         : payload.email;

//     const result = await resend.emails.send({
//       from,
//       to: [recipient], // <-- use recipient here
//       subject: `${org} Ticket — ${payload.date} — ${tid}`,
//       html,
//       replyTo,
//     });

//     console.log("Resend send() result:", JSON.stringify(result, null, 2));

//     if (result.error) {
//       const errObj = result.error;
//       const name =
//         typeof errObj === "object" && errObj && "name" in errObj
//           ? String((errObj as { name?: unknown }).name ?? "ResendError")
//           : "ResendError";
//       const message =
//         typeof errObj === "object" && errObj && "message" in errObj
//           ? String((errObj as { message?: unknown }).message ?? "Unknown error")
//           : String(errObj);

//       return NextResponse.json(
//         { error: `${name}: ${message}` },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json({ ok: true, token, ticketUrl });
//   } catch (e: unknown) {
//     const msg = e instanceof Error ? e.message : "Bad request";
//     return NextResponse.json({ error: msg }, { status: 400 });
//   }
// }
