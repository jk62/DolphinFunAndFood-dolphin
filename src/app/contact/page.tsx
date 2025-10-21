// app/contact/page.tsx
"use client";

import { useMemo, useState } from "react";

function waDigits(n: string) {
  // Keep digits only; remove leading +
  return n.replace(/[^+\d]/g, "").replace(/^\+/, "");
}

export default function ContactPage() {
  const [name, setName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [message, setMessage] = useState("");

  // Use a PUBLIC env var so it’s available in the client bundle
  const toEmail =
    process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@dolphinfunandfood.com";

  const waRaw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+919999999999";
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
            href="tel:+919910278161"
          >
            Call Us
          </a>
        </div>

        <div className="mt-4 text-sm text-slate-600">
          Prefer email?{" "}
          <a href={`mailto:${toEmail}`} className="text-sky-700 underline">
            {toEmail}
          </a>
        </div>
      </form>
    </main>
  );
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
// // src/app/contact/page.tsx
// "use client";

// import { useMemo, useState } from "react";

// function waDigits(n: string) {
//   // strip non-digits except leading +
//   return n.replace(/[^+\d]/g, "").replace(/^\+/, "");
// }

// export default function ContactPage() {
//   const [name, setName] = useState("");
//   const [fromEmail, setFromEmail] = useState("");
//   const [message, setMessage] = useState("");

//   const toEmail = "hello@dolphinfunandfood.com"; // change to your live inbox
//   const waRaw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+919999999999";
//   const wa = useMemo(() => waDigits(waRaw), [waRaw]);

//   // Build a mailto link so it opens the user's email client
//   const mailtoHref = useMemo(() => {
//     const subject = `Enquiry from ${name || "your website"}`;
//     const body =
//       `Hi Dolphin Team,%0D%0A%0D%0A` +
//       `${message || "(Write your message here)"}%0D%0A%0D%0A` +
//       `Name: ${name || "-"}%0D%0A` +
//       `Email: ${fromEmail || "-"}`;
//     return `mailto:${toEmail}?subject=${encodeURIComponent(subject)}&body=${body}`;
//   }, [name, fromEmail, message, toEmail]);

//   const waMsg = useMemo(() => {
//     const base = `Hello, this is ${name || "a visitor"} from the website.`;
//     const tail = message ? `\n\n${message}` : "";
//     return encodeURIComponent(base + tail);
//   }, [name, message]);

//   return (
//     <main className="mx-auto max-w-3xl px-4 py-10">
//       <h1 className="text-3xl font-semibold mb-6">Contact Us</h1>

//       <p className="text-slate-700 mb-6">
//         Have an enquiry about banquets, dining, or the water park? Send us a
//         message.
//       </p>

//       <form
//         className="space-y-4"
//         onSubmit={(e) => {
//           e.preventDefault(); // prevent page reload
//           window.location.href = mailtoHref; // open email client
//         }}
//       >
//         <div>
//           <label className="block text-sm font-medium mb-1">Name</label>
//           <input
//             className="w-full rounded-lg border p-3"
//             placeholder="Your name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             autoComplete="off"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium mb-1">Email</label>
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
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium mb-1">Message</label>
//           <textarea
//             rows={5}
//             className="w-full rounded-lg border p-3"
//             placeholder="How can we help?"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
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
//         </div>

//         <div className="text-sm text-slate-600 mt-4">
//           Prefer email?{" "}
//           <a href={`mailto:${toEmail}`} className="text-sky-700 underline">
//             {toEmail}
//           </a>
//         </div>
//       </form>
//     </main>
//   );
// }
