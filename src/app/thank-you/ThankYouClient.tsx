// src/app/thank-you/ThankYouClient.tsx
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

function waDigits(n: string) {
  // strip non-digits except leading +
  return n.replace(/[^+\d]/g, "").replace(/^\+/, "");
}

export default function ThankYouClient() {
  const sp = useSearchParams();
  const name = sp.get("name") || "Friend";
  const date = sp.get("date") || "";
  const guests = sp.get("guests") || "";

  const phoneRaw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+919999999999";
  const phone = waDigits(phoneRaw);

  const message = `Hello, this is ${name}. I just submitted a banquet enquiry for ${guests || "our"} guests on ${date || "a date"}. Please get in touch.`;
  const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <main className="mx-auto max-w-xl px-4 py-14 text-center">
      <h1 className="text-3xl font-semibold">Thank you! 🎉</h1>
      <p className="mt-3 text-slate-700">
        We’ve received your enquiry{date ? ` for ${date}` : ""}
        {guests ? ` (${guests} guests)` : ""}. Our team will contact you
        shortly.
      </p>

      <div className="mt-8 space-y-3">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-xl bg-green-600 px-5 py-3 font-medium text-white hover:bg-green-700"
        >
          Message us on WhatsApp
        </a>

        {/* <div className="text-sm text-slate-600">
          Prefer email?{" "}
          <a
            href="mailto:info@dolphinfunandfood.com"
            className="text-sky-700 underline"
          >
            info@dolphinfunandfood.com
          </a>
        </div> */}

        <div className="pt-6">
          <Link
            href="/"
            className="inline-block rounded-xl border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
