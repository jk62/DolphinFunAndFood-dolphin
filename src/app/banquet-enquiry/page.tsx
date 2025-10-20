// app/banquet-enquiry/page.tsx
// app/banquet-enquiry/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";   // ✅ use this


type FormState = {
  name: string;
  email: string;
  phone: string;
  date: string;
  guests: string;
  message: string;
};
const initial: FormState = {
  name: "", email: "", phone: "", date: "", guests: "", message: ""
};

export default function BanquetEnquiryPage() {
  const router = useRouter(); // ✅ get router here
  const [data, setData] = useState<FormState>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setData({ ...data, [e.target.name]: e.target.value });

  function firstMissing(d: FormState) {
    if (!d.name.trim()) return "Name";
    if (!d.email.trim()) return "Email";
    if (!d.phone.trim()) return "Phone";
    if (!d.date.trim()) return "Event Date";
    if (!d.guests.trim()) return "Guests";
    return null;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setOk(null);
    setErr(null);

    const missing = firstMissing(data);
    if (missing) {
      setErr(`Please fill the ${missing} field.`);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          name: data.name.trim(),
          email: data.email.trim(),
          phone: data.phone.trim(),
          date: data.date.trim(),
          guests: data.guests.trim(),
          message: data.message.trim(),
        }),
      });

      // Try to parse JSON (even on error). If it fails, payload will be null.
      const payload = await res.json().catch(() => null);

      if (!res.ok) {
        const msg =
          (payload && (payload.error || payload.message)) ||
          `Request failed (${res.status})`;
        throw new Error(msg);
      }

      // ✅ success: go to thank-you page (prevents showing any bottom error)
      router.push(
        `/thank-you?name=${encodeURIComponent(data.name)}&date=${encodeURIComponent(
          data.date
        )}&guests=${encodeURIComponent(data.guests)}`
      );
      setData(initial); // optional
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Something went wrong.";
      // Keep it short; don’t dump HTML
      setErr(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold mb-6">Banquet Enquiry</h1>

      <form onSubmit={onSubmit} className="space-y-4" autoComplete="off">
        {/* ... */}
        <div>
          <label className="block text-sm font-medium mb-1">Name *</label>
          <input
            required
            name="name"
            value={data.name}
            onChange={onChange}
            className="w-full rounded-lg border p-3"
            placeholder="Your name"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email *</label>
            
            <input
              required
              type="email"
              name="enquiry_email" // <- different name to dodge autofill heuristics
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })} // map manually
              className="w-full rounded-lg border p-3"
              placeholder="you@example.com"
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              inputMode="email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone *</label>
            <input
              required
              name="phone"
              value={data.phone}
              onChange={onChange}
              className="w-full rounded-lg border p-3"
              placeholder="+91…"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Event Date *
            </label>
            <input
              required
              type="date"
              name="date"
              value={data.date}
              onChange={onChange}
              className="w-full rounded-lg border p-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Guests (approx) *
            </label>
            <input
              required
              name="guests"
              value={data.guests}
              onChange={onChange}
              className="w-full rounded-lg border p-3"
              placeholder="e.g., 200"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            rows={5}
            name="message"
            value={data.message}
            onChange={onChange}
            className="w-full rounded-lg border p-3"
            placeholder="Additional details"
          />
        </div>

        <button
          disabled={submitting}
          className="rounded-xl bg-sky-600 px-5 py-3 font-medium text-white hover:bg-sky-700 disabled:opacity-60"
        >
          {submitting ? "Sending…" : "Send Enquiry"}
        </button>

        {ok && <p className="text-green-700 mt-3">{ok}</p>}
        {err && <p className="text-red-700 mt-3">{err}</p>}
      </form>
    </main>
  );
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
// "use client";
// import { useState } from "react";

// type FormState = {
//   name: string;
//   email: string;
//   phone: string;
//   date: string;
//   guests: string;
//   message: string;
// };
// const initial: FormState = {
//   name: "",
//   email: "",
//   phone: "",
//   date: "",
//   guests: "",
//   message: "",
// };

// export default function BanquetEnquiryPage() {
//   const [data, setData] = useState<FormState>(initial);
//   const [submitting, setSubmitting] = useState(false);
//   const [ok, setOk] = useState<string | null>(null);
//   const [err, setErr] = useState<string | null>(null);

//   const onChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => setData({ ...data, [e.target.name]: e.target.value });

//   async function onSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     setOk(null);
//     setErr(null);

//     // minimal client-side validation
//     if (
//       !data.name ||
//       !data.email ||
//       !data.phone ||
//       !data.date ||
//       !data.guests
//     ) {
//       setErr("Please fill all required fields.");
//       return;
//     }

//     setSubmitting(true);
//     try {
//       const res = await fetch("/api/enquiry", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });
//       if (!res.ok) throw new Error(await res.text());
//       setOk("Thanks! We received your enquiry.");
//       setData(initial);
//     } catch (e: unknown) {
//       const msg = e instanceof Error ? e.message : "Something went wrong.";
//       setErr(msg);
//     } finally {
//       setSubmitting(false);
//     }

//   }

//   return (
//     <main className="mx-auto max-w-3xl px-4 py-10">
//       <h1 className="text-3xl font-semibold mb-6">Banquet Enquiry</h1>

//       <form onSubmit={onSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium mb-1">Name *</label>
//           <input
//             name="name"
//             value={data.name}
//             onChange={onChange}
//             className="w-full rounded-lg border p-3"
//             placeholder="Your name"
//           />
//         </div>
//         <div className="grid md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Email *</label>
//             <input
//               type="email"
//               name="email"
//               value={data.email}
//               onChange={onChange}
//               className="w-full rounded-lg border p-3"
//               placeholder="you@example.com"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">Phone *</label>
//             <input
//               name="phone"
//               value={data.phone}
//               onChange={onChange}
//               className="w-full rounded-lg border p-3"
//               placeholder="+91…"
//             />
//           </div>
//         </div>
//         <div className="grid md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Event Date *
//             </label>
//             <input
//               type="date"
//               name="date"
//               value={data.date}
//               onChange={onChange}
//               className="w-full rounded-lg border p-3"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Guests (approx) *
//             </label>
//             <input
//               name="guests"
//               value={data.guests}
//               onChange={onChange}
//               className="w-full rounded-lg border p-3"
//               placeholder="e.g., 200"
//             />
//           </div>
//         </div>
//         <div>
//           <label className="block text-sm font-medium mb-1">Message</label>
//           <textarea
//             rows={5}
//             name="message"
//             value={data.message}
//             onChange={onChange}
//             className="w-full rounded-lg border p-3"
//             placeholder="Additional details"
//           />
//         </div>

//         <button
//           disabled={submitting}
//           className="rounded-xl bg-sky-600 px-5 py-3 font-medium text-white hover:bg-sky-700 disabled:opacity-60"
//         >
//           {submitting ? "Sending…" : "Send Enquiry"}
//         </button>

//         {ok && <p className="text-green-700 mt-3">{ok}</p>}
//         {err && <p className="text-red-700 mt-3">{err}</p>}
//       </form>
//     </main>
//   );
// }
