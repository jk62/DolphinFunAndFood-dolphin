// src/components/NavBar.tsx
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="w-full border-b border-sky-200 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-6">
        <Link href="/" className="text-lg font-semibold">
          Dolphin <span className="text-sky-600">Fun &amp; Food</span>
        </Link>
        <div className="ml-auto flex items-center gap-5 text-sm">
          <Link href="/" className="hover:text-sky-700">
            Home
          </Link>
          <Link href="/contact" className="hover:text-sky-700">
            Contact
          </Link>
          {/* ✅ New Link for Banquet Enquiry */}
          <Link href="/banquet-enquiry" className="hover:text-sky-700">
            Banquet Enquiry
          </Link>
          <Link href="/gallery" className="hover:text-sky-700">
            Gallery
          </Link>
          <Link
            href="/gallery/best-moments"
            className="font-medium text-sky-700"
          >
            Best Moments
          </Link>
          <Link href="/reels" className="hover:text-sky-700">
            Reels
          </Link>{" "}
          <Link href="/tickets" className="hover:text-sky-700">
            Tickets
          </Link>
          {/* new */}
        </div>
      </div>
    </nav>
  );
}
