// app/contact/page.tsx
"use client";

import { useMemo, useState } from "react";

function waDigits(n: string) {
  // Keep digits only; remove leading +
  return n.replace(/[^+\d]/g, "").replace(/^\+/, "");
}

export default function ContactPage() {
  const phoneDisplay =
    process.env.NEXT_PUBLIC_PHONE_DISPLAY || "+91 93119 18485";
  const phoneLink = process.env.NEXT_PUBLIC_PHONE_LINK || "+919311918485";
  const mapsUrl =
    process.env.NEXT_PUBLIC_MAPS_URL ||
    "https://maps.app.goo.gl/R9DnVJBfFdkUCeeo8?g_st=iw";

  const [name, setName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [message, setMessage] = useState("");

  // Use a PUBLIC env var so it’s available in the client bundle
  const toEmail =
    process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@dolphinfunandfood.com";

  const waRaw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+919311918485";
  const wa = useMemo(() => waDigits(waRaw), [waRaw]);

  const mailtoHref = useMemo(() => {
    const subject = `Enquiry from ${name || "your website"}`;
    const text =
      `Hi Dolphin Team,\n\n` +
      `${message || "(Write your message here)"}\n\n` +
      `Name: ${name || "-"}\n` +
      `Email: ${fromEmail || "-"}`;
    const params = new URLSearchParams({
      subject,
      body: text,
    });
    return `mailto:${toEmail}?${params.toString()}`;
  }, [name, fromEmail, message, toEmail]);

  const waMsg = useMemo(() => {
    const base = `Hello, this is ${name || "a visitor"} from the website.`;
    const tail = message ? `\n\n${message}` : "";
    return encodeURIComponent(base + tail);
  }, [name, message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }
    if (!fromEmail.trim() || !/^\S+@\S+\.\S+$/.test(fromEmail)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!message.trim()) {
      alert("Please write a short message.");
      return;
    }

    // Open the user's email client
    window.location.href = mailtoHref;
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-semibold">Contact Us</h1>

      <p className="mb-6 text-slate-700">
        Have an enquiry about banquets, dining, or the water park? Send us a
        message.
      </p>

      {/* Contact form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="mb-1 block text-sm font-medium">Name</label>
          <input
            className="w-full rounded-lg border p-3"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full rounded-lg border p-3"
            placeholder="you@example.com"
            value={fromEmail}
            onChange={(e) => setFromEmail(e.target.value)}
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            inputMode="email"
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Message</label>
          <textarea
            rows={5}
            className="w-full rounded-lg border p-3"
            placeholder="How can we help?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            className="rounded-xl bg-sky-600 px-5 py-3 font-medium text-white hover:bg-sky-700"
          >
            Send Email
          </button>

          <a
            className="rounded-xl bg-green-600 px-5 py-3 font-medium text-white hover:bg-green-700"
            href={`https://wa.me/${wa}?text=${waMsg}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Message on WhatsApp
          </a>

          {/* Optional: direct call button */}
          <a
            className="rounded-xl border px-5 py-3 font-medium hover:bg-slate-50"
            href={`tel:${phoneLink}`}
          >
            Call Us ({phoneDisplay})
          </a>
        </div>

        <div className="mt-4 text-sm text-slate-600">
          Prefer email?{" "}
          <a href={`mailto:${toEmail}`} className="text-sky-700 underline">
            {toEmail}
          </a>
        </div>
      </form>

      {/* Location / Map section */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-2">Find Us</h2>
        <p className="text-slate-600">
          Tap the map or use the button to open directions.
        </p>

        {/* Embedded map (no API key). 
         TIP: For best results, open your place in Google Maps → Share → Embed a map → 
         copy the iframe src (it starts with https://www.google.com/maps/embed?pb=...) and replace the src below. */}
        <div className="mt-3 overflow-hidden rounded-xl border">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3484.143550339609!2d77.03312989999999!3d29.160441799999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390dc90061191229%3A0x1af2e88e559acd6b!2sDolphin%20Fun%20%26%20Food!5e0!3m2!1sen!2sin!4v1761056536123!5m2!1sen!2sin"
            width="100%"
            height="360"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            title="Map to Dolphin Fun & Food, directions and location"
          />
        </div>

        {/* Direct Google Maps deep link (your short link) */}
        <div className="mt-4">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener nofollow"
            className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-3 font-medium text-white hover:bg-sky-700"
          >
            🗺️ View on Google Maps
          </a>
        </div>
      </section>
      {/* JSON-LD script at the end */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Restaurant",
            name: "Dolphin Fun & Food",
            url: "https://dolphin-fun-and-food-dolphin.vercel.app",
            telephone: phoneDisplay,
            sameAs: [mapsUrl],
            address: {
              "@type": "PostalAddress",
              streetAddress: "Highway, Near ...",
              addressLocality: "City",
              addressRegion: "State",
              postalCode: "PIN",
              addressCountry: "IN",
            },
          }),
        }}
      />
    </main>
  );
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
// "use client";

// import { useMemo, useState } from "react";

// function waDigits(n: string) {
//   // Keep digits only; remove leading +
//   return n.replace(/[^+\d]/g, "").replace(/^\+/, "");
// }

// export default function ContactPage() {
//   const [name, setName] = useState("");
//   const [fromEmail, setFromEmail] = useState("");
//   const [message, setMessage] = useState("");

//   // Use a PUBLIC env var so it’s available in the client bundle
//   const toEmail =
//     process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@dolphinfunandfood.com";

//   const waRaw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+919999999999";
//   const wa = useMemo(() => waDigits(waRaw), [waRaw]);

//   const mailtoHref = useMemo(() => {
//     const subject = `Enquiry from ${name || "your website"}`;
//     const text =
//       `Hi Dolphin Team,\n\n` +
//       `${message || "(Write your message here)"}\n\n` +
//       `Name: ${name || "-"}\n` +
//       `Email: ${fromEmail || "-"}`;
//     const params = new URLSearchParams({
//       subject,
//       body: text,
//     });
//     return `mailto:${toEmail}?${params.toString()}`;
//   }, [name, fromEmail, message, toEmail]);

//   const waMsg = useMemo(() => {
//     const base = `Hello, this is ${name || "a visitor"} from the website.`;
//     const tail = message ? `\n\n${message}` : "";
//     return encodeURIComponent(base + tail);
//   }, [name, message]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     // Basic validation
//     if (!name.trim()) {
//       alert("Please enter your name.");
//       return;
//     }
//     if (!fromEmail.trim() || !/^\S+@\S+\.\S+$/.test(fromEmail)) {
//       alert("Please enter a valid email address.");
//       return;
//     }
//     if (!message.trim()) {
//       alert("Please write a short message.");
//       return;
//     }

//     // Open the user's email client
//     window.location.href = mailtoHref;
//   };

//   return (
//     <main className="mx-auto max-w-3xl px-4 py-10">
//       <h1 className="mb-6 text-3xl font-semibold">Contact Us</h1>

//       <p className="mb-6 text-slate-700">
//         Have an enquiry about banquets, dining, or the water park? Send us a
//         message.
//       </p>

//       <form className="space-y-4" onSubmit={handleSubmit}>
//         <div>
//           <label className="mb-1 block text-sm font-medium">Name</label>
//           <input
//             className="w-full rounded-lg border p-3"
//             placeholder="Your name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             autoComplete="off"
//             required
//           />
//         </div>
//         <div>
//           <label className="mb-1 block text-sm font-medium">Email</label>
//           <input
//             type="email"
//             className="w-full rounded-lg border p-3"
//             placeholder="you@example.com"
//             value={fromEmail}
//             onChange={(e) => setFromEmail(e.target.value)}
//             autoComplete="off"
//             autoCapitalize="none"
//             autoCorrect="off"
//             spellCheck={false}
//             inputMode="email"
//             required
//           />
//         </div>
//         <div>
//           <label className="mb-1 block text-sm font-medium">Message</label>
//           <textarea
//             rows={5}
//             className="w-full rounded-lg border p-3"
//             placeholder="How can we help?"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             required
//           />
//         </div>

//         <div className="flex flex-wrap gap-3 pt-2">
//           <button
//             type="submit"
//             className="rounded-xl bg-sky-600 px-5 py-3 font-medium text-white hover:bg-sky-700"
//           >
//             Send Email
//           </button>

//           <a
//             className="rounded-xl bg-green-600 px-5 py-3 font-medium text-white hover:bg-green-700"
//             href={`https://wa.me/${wa}?text=${waMsg}`}
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Message on WhatsApp
//           </a>

//           {/* Optional: direct call button */}
//           <a
//             className="rounded-xl border px-5 py-3 font-medium hover:bg-slate-50"
//             href="tel:+919910278161"
//           >
//             Call Us
//           </a>
//         </div>

//         <div className="mt-4 text-sm text-slate-600">
//           Prefer email?{" "}
//           <a href={`mailto:${toEmail}`} className="text-sky-700 underline">
//             {toEmail}
//           </a>
//         </div>
//       </form>
//     </main>
//   );
// }

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
