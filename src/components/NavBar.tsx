// src/components/NavBar.tsx
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="w-full border-b border-sky-200 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-6">
        {/* LEFT SIDE: Logo + tagline + Open Now */}
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-lg font-semibold">
            Dolphin <span className="text-sky-600">Fun &amp; Food</span>
          </span>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600">
              Murthal’s New Destination for Food, Fun &amp; Family Time — Now
              Open at Ganaur!
            </span>

            {/* GREEN OPEN NOW BUTTON */}
            <span className="inline-flex items-center rounded-full bg-emerald-500 px-3 py-0.5 text-xs font-semibold text-white shadow">
              <span className="relative flex h-2 w-2 mr-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </span>
              Open Now
            </span>
          </div>
        </Link>

        {/* RIGHT SIDE: Navigation Links */}
        <div className="ml-auto flex items-center gap-5 text-sm">
          <Link href="/" className="hover:text-sky-700">
            Home
          </Link>
          <Link href="/contact" className="hover:text-sky-700">
            Contact
          </Link>

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
          </Link>
          <Link href="/tickets" className="hover:text-sky-700">
            Tickets
          </Link>
          <Link href="/menu-image" className="hover:text-sky-700">
            Menu
          </Link>
        </div>
      </div>
    </nav>
  );
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
// // src/components/NavBar.tsx
// import Link from "next/link";

// export default function NavBar() {
//   return (
//     <nav className="w-full border-b border-sky-200 bg-white/80 backdrop-blur">
//       <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-6">
//         {/* <Link href="/" className="text-lg font-semibold">
//           Dolphin <span className="text-sky-600">Fun &amp; Food</span>
//         </Link> */}
//         <Link href="/" className="flex flex-col leading-tight">
//           <span className="text-lg font-semibold">
//             Dolphin <span className="text-sky-600">Fun &amp; Food</span>
//           </span>
//           <span className="text-xs text-slate-600">
//             Murthal&rsquo;s New Destination for Food, Fun &amp; Family Time, Now
//             Open at Ganaur!
//           </span>
//         </Link>

//         <div className="ml-auto flex items-center gap-5 text-sm">
//           <Link href="/" className="hover:text-sky-700">
//             Home
//           </Link>
//           <Link href="/contact" className="hover:text-sky-700">
//             Contact
//           </Link>
//           {/* ✅ New Link for Banquet Enquiry */}
//           <Link href="/banquet-enquiry" className="hover:text-sky-700">
//             Banquet Enquiry
//           </Link>
//           <Link href="/gallery" className="hover:text-sky-700">
//             Gallery
//           </Link>
//           <Link
//             href="/gallery/best-moments"
//             className="font-medium text-sky-700"
//           >
//             Best Moments
//           </Link>
//           <Link href="/reels" className="hover:text-sky-700">
//             Reels
//           </Link>{" "}
//           <Link href="/tickets" className="hover:text-sky-700">
//             Tickets
//           </Link>
//           {/* new */}
//         </div>
//       </div>
//     </nav>
//   );
// }
