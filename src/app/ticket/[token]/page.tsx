// src/app/ticket/[token]/page.tsx
import { jwtVerify } from "jose";
import QRCode from "qrcode";

export const runtime = "nodejs";

type TicketClaims = {
  tid: string;
  name: string;
  email: string;
  date: string; // yyyy-mm-dd
  count: string; // MVP: number as string
  iat: number;
  exp: number;
};

async function verifyToken(token: string): Promise<TicketClaims> {
  const secret = new TextEncoder().encode(process.env.TICKET_SIGNING_SECRET);
  const { payload } = await jwtVerify<TicketClaims>(token, secret);
  if (
    !payload.tid ||
    !payload.name ||
    !payload.email ||
    !payload.date ||
    !payload.count
  ) {
    throw new Error("Malformed ticket");
  }
  return payload;
}

// Prefer explicit NEXT_PUBLIC_BASE_URL, else Vercel URL, else localhost
function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export default async function TicketPage({
  params,
}: {
  // 👇 params is async in Next 15 for dynamic routes
  params: Promise<{ token: string }>;
}) {
  // 👇 await it before use
  const { token } = await params;
  const decodedToken = decodeURIComponent(token);

  try {
    const data = await verifyToken(decodedToken);

    const base = getBaseUrl();
    const ticketUrl = `${base}/ticket/${encodeURIComponent(decodedToken)}`;
    const qr = await QRCode.toDataURL(ticketUrl, { margin: 1, width: 320 });

    return (
      <main className="mx-auto max-w-xl px-4 py-10">
        <h1 className="text-2xl font-semibold mb-4">Water Park Ticket</h1>
        <div className="rounded-2xl border p-6 bg-white">
          <div className="text-sm text-slate-600">Ticket ID</div>
          <div className="text-lg font-mono mb-3">{data.tid}</div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-slate-600">Name</div>
              <div className="font-medium">{data.name}</div>
            </div>
            <div>
              <div className="text-slate-600">Tickets</div>
              <div className="font-medium">{data.count}</div>
            </div>
            <div>
              <div className="text-slate-600">Date</div>
              <div className="font-medium">{data.date}</div>
            </div>
            <div>
              <div className="text-slate-600">Email</div>
              <div className="font-medium">{data.email}</div>
            </div>
          </div>

          <div className="mt-6 grid place-items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qr} alt="QR Ticket" width={320} height={320} />
          </div>

          <p className="mt-6 text-slate-600 text-sm">
            Show this ticket at the entrance. Keep brightness high for easy
            scanning.
          </p>

          <div className="mt-4 text-sm">
            View online:&nbsp;
            <a href={ticketUrl} className="text-sky-700 underline">
              {ticketUrl}
            </a>
          </div>
        </div>
      </main>
    );
  } catch {
    return (
      <main className="mx-auto max-w-xl px-4 py-10">
        <h1 className="text-2xl font-semibold mb-4">
          Invalid or expired ticket
        </h1>
        <p className="text-slate-700">
          Please contact support if you believe this is a mistake.
        </p>
      </main>
    );
  }
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
// // src/app/ticket/[token]/page.tsx
// import { jwtVerify } from "jose";
// import QRCode from "qrcode";

// export const runtime = "nodejs";

// type TicketClaims = {
//   tid: string;
//   name: string;
//   email: string;
//   date: string; // yyyy-mm-dd
//   count: string; // MVP: number as string
//   iat: number;
//   exp: number;
// };

// async function verifyToken(token: string): Promise<TicketClaims> {
//   const secret = new TextEncoder().encode(process.env.TICKET_SIGNING_SECRET);
//   const { payload } = await jwtVerify<TicketClaims>(token, secret);
//   if (
//     !payload.tid ||
//     !payload.name ||
//     !payload.email ||
//     !payload.date ||
//     !payload.count
//   ) {
//     throw new Error("Malformed ticket");
//   }
//   return payload;
// }

// export default async function TicketPage({
//   params,
// }: {
//   params: { token: string };
// }) {
//   const token = decodeURIComponent(params.token);

//   try {
//     const data = await verifyToken(token);

//     const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
//     const ticketUrl = `${base}/ticket/${encodeURIComponent(token)}`;
//     const qr = await QRCode.toDataURL(ticketUrl, { margin: 1, width: 320 });

//     return (
//       <main className="mx-auto max-w-xl px-4 py-10">
//         <h1 className="text-2xl font-semibold mb-4">Water Park Ticket</h1>
//         <div className="rounded-2xl border p-6 bg-white">
//           <div className="text-sm text-slate-600">Ticket ID</div>
//           <div className="text-lg font-mono mb-3">{data.tid}</div>

//           <div className="grid grid-cols-2 gap-4 text-sm">
//             <div>
//               <div className="text-slate-600">Name</div>
//               <div className="font-medium">{data.name}</div>
//             </div>
//             <div>
//               <div className="text-slate-600">Tickets</div>
//               <div className="font-medium">{data.count}</div>
//             </div>
//             <div>
//               <div className="text-slate-600">Date</div>
//               <div className="font-medium">{data.date}</div>
//             </div>
//             <div>
//               <div className="text-slate-600">Email</div>
//               <div className="font-medium">{data.email}</div>
//             </div>
//           </div>

//           <div className="mt-6 grid place-items-center">
//             {/* eslint-disable-next-line @next/next/no-img-element */}
//             <img src={qr} alt="QR Ticket" width={320} height={320} />
//           </div>

//           <p className="mt-6 text-slate-600 text-sm">
//             Show this ticket at the entrance. Keep brightness high for easy
//             scanning.
//           </p>
//         </div>
//       </main>
//     );
//   } catch {
//     return (
//       <main className="mx-auto max-w-xl px-4 py-10">
//         <h1 className="text-2xl font-semibold mb-4">
//           Invalid or expired ticket
//         </h1>
//         <p className="text-slate-700">
//           Please contact support if you believe this is a mistake.
//         </p>
//       </main>
//     );
//   }
// }
