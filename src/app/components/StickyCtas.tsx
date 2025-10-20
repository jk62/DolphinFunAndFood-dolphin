// app/components/StickyCtas.tsx
"use client";
import Link from "next/link";

export default function StickyCtas() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t bg-white/95 backdrop-blur supports-backdrop-blur:block md:hidden">
      <div className="mx-auto flex max-w-md gap-2 p-3">
        <Link
          href="/banquet-enquiry"
          className="flex-1 rounded-lg bg-sky-600 px-4 py-3 text-center font-medium text-white"
        >
          Banquet Enquiry
        </Link>
        <a
          href="https://wa.me/919910278161"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-lg border px-4 py-3 text-center font-medium"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
