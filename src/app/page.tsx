// app/page.tsx
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-sky-50 text-slate-900">
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
            <h1 className="text-xl font-bold tracking-wide">
              Dolphin <span className="text-sky-600">Fun &amp; Food</span>
            </h1>
            <p className="text-sm text-slate-600">
              Restaurant • Banquets • Water Park
            </p>
          </div>
          <div className="ml-auto text-sm text-sky-700 font-medium">
            Official site — launching soon
          </div>
        </div>
      </header>

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
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">Welcome</h2>
            <p className="text-slate-700 leading-relaxed">
              A premium 8-acre destination on the highway — fine dining, grand
              banquets, and a thrilling water park.
            </p>
            <p className="mt-4 text-slate-600">
              This is a placeholder page. We’ll be adding booking, menus,
              gallery, and more step-by-step.
            </p>
            {/* ✅ New CTA button */}
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

      <footer className="mt-16 border-t border-sky-200">
        <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-slate-600">
          © {new Date().getFullYear()} Dolphin Fun &amp; Food
        </div>
      </footer>
    </main>
  );
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// export default function Page() {
//   return <div style={{ padding: 24, fontFamily: "system-ui, Arial" }}>
//     It works — minimal page.
//   </div>;
// }

// import Image from "next/image";

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
//           </div>
//         </div>
//       </section>

//       <footer className="mt-16 border-t border-sky-200">
//         <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-slate-600">
//           © <span id="year">{new Date().getFullYear()}</span> Dolphin Fun &amp;
//           Food
//         </div>
//       </footer>
//     </main>
//   );
// }
