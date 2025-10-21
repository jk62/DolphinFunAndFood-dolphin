// app/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const HERO = [
  { src: "/images/gallery/baloon-01.jpg", alt: "Balloon decor — entrance" },
  { src: "/images/gallery/baloon-02.jpg", alt: "Balloon arch — celebration" },
];

export default function Home() {
  const [i, setI] = useState(0);

  // Auto-rotate the hero every 4s
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % HERO.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="min-h-screen bg-sky-50 text-slate-900">
      {/* Hero */}
      <section className="relative h-[48vh] min-h-[320px] w-full overflow-hidden bg-slate-200">
        <Image
          key={HERO[i].src}
          src={HERO[i].src}
          alt={HERO[i].alt}
          fill
          priority
          sizes="100vw"
          className="object-contain" // ← was object-cover
        />
        {/* optional subtle overlay so text stays readable */}
        <div className="pointer-events-none absolute inset-0 bg-black/20" />
        <div className="absolute inset-x-0 bottom-6 mx-auto max-w-5xl px-4 text-white">
          <h1 className="text-3xl font-semibold drop-shadow">
            Dolphin Fun &amp; Food
          </h1>
          <p className="mt-1 text-slate-100/90 drop-shadow">
            Restaurant • Banquets • 8-acre Water Park
          </p>
        </div>
      </section>

      {/* Header */}
      <header className="w-full border-b border-sky-200 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-4">
          <Image
            src="/images/dolphin-logo.jpg"
            alt="Dolphin Fun & Food logo"
            width={56}
            height={56}
            className="rounded-md object-cover"
            priority
          />
          <div>
            <h2 className="text-xl font-bold tracking-wide">
              Dolphin <span className="text-sky-600">Fun &amp; Food</span>
            </h2>
            <p className="text-sm text-slate-600">
              Restaurant • Banquets • Water Park
            </p>
          </div>
          <div className="ml-auto text-sm text-sky-700 font-medium">
            Official site — launching soon
          </div>
        </div>
      </header>

      {/* Welcome card */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="rounded-3xl overflow-hidden shadow-lg bg-white">
          <Image
            src="/images/dolphin-banner.jpg"
            alt="Dolphin Fun & Food banner"
            width={2400}
            height={1200}
            className="w-full h-auto object-cover"
            priority
          />
          <div className="p-6 md:p-10">
            <h3 className="text-2xl md:text-3xl font-semibold mb-3">Welcome</h3>
            <p className="text-slate-700 leading-relaxed">
              A premium 8-acre destination on the highway — fine dining, grand
              banquets, and a thrilling water park.
            </p>
            <p className="mt-4 text-slate-600">
              This is a placeholder page. We’ll be adding booking, menus,
              gallery, and more step-by-step.
            </p>
            <div className="mt-6">
              <Link
                href="/banquet-enquiry"
                className="inline-block rounded-xl bg-sky-600 px-5 py-3 font-medium text-white hover:bg-sky-700"
              >
                Book a Banquet Enquiry
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 border-t border-sky-200">
        <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-slate-600">
          © {new Date().getFullYear()} Dolphin Fun &amp; Food
        </div>
      </footer>
    </main>
  );
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
// // app/page.tsx
// import Image from "next/image";
// import Link from "next/link";

// export default function Home() {
//   return (
//     <main className="min-h-screen bg-sky-50 text-slate-900">
//       <header className="w-full border-b border-sky-200 bg-white/80 backdrop-blur">
//         <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-4">
//           <Image
//             src="/images/dolphin-logo.jpg"
//             alt="Dolphin Fun & Food logo"
//             width={56}
//             height={56}
//             className="rounded-md object-cover"
//             priority
//           />
//           <div>
//             <h1 className="text-xl font-bold tracking-wide">
//               Dolphin <span className="text-sky-600">Fun &amp; Food</span>
//             </h1>
//             <p className="text-sm text-slate-600">
//               Restaurant • Banquets • Water Park
//             </p>
//           </div>
//           <div className="ml-auto text-sm text-sky-700 font-medium">
//             Official site — launching soon
//           </div>
//         </div>
//       </header>

//       <section className="mx-auto max-w-6xl px-4 py-8">
//         <div className="rounded-3xl overflow-hidden shadow-lg bg-white">
//           <Image
//             src="/images/dolphin-banner.jpg"
//             alt="Dolphin Fun & Food banner"
//             width={2400}
//             height={1200}
//             className="w-full h-auto object-cover"
//             priority
//           />
//           <div className="p-6 md:p-10">
//             <h2 className="text-2xl md:text-3xl font-semibold mb-3">Welcome</h2>
//             <p className="text-slate-700 leading-relaxed">
//               A premium 8-acre destination on the highway — fine dining, grand
//               banquets, and a thrilling water park.
//             </p>
//             <p className="mt-4 text-slate-600">
//               This is a placeholder page. We’ll be adding booking, menus,
//               gallery, and more step-by-step.
//             </p>
//             {/* ✅ New CTA button */}
//             <div className="mt-6">
//               <Link
//                 href="/banquet-enquiry"
//                 className="inline-block rounded-xl bg-sky-600 px-5 py-3 font-medium text-white hover:bg-sky-700"
//               >
//                 Book a Banquet Enquiry
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       <footer className="mt-16 border-t border-sky-200">
//         <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-slate-600">
//           © {new Date().getFullYear()} Dolphin Fun &amp; Food
//         </div>
//       </footer>
//     </main>
//   );
// }

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
