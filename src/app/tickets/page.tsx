// src/app/tickets/page.tsx
"use client";

import { useState } from "react";

type FormState = { name: string; email: string; date: string; count: string };
const initial: FormState = { name: "", email: "", date: "", count: "1" };

export default function TicketsPage() {
  const [data, setData] = useState<FormState>(initial);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setData({ ...data, [e.target.name]: e.target.value });

  function firstMissing(d: FormState) {
    if (!d.name.trim()) return "Name";
    if (!d.email.trim()) return "Email";
    if (!d.date?.trim()) return "Visit Date";
    if (!d.count.trim()) return "Tickets";
    return null;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setErr(null);

    const missing = firstMissing(data);
    if (missing) return setErr(`Please fill the ${missing} field.`);

    setLoading(true);
    try {
      const res = await fetch("/api/tickets/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name.trim(),
          email: data.email.trim(),
          date: data.date.trim(),
          count: data.count.trim(),
        }),
      });

      const json = await res.json().catch(() => null);
      if (!res.ok)
        throw new Error((json && json.error) || `Failed (${res.status})`);

      setMsg("Ticket created! Check your email for the QR ticket.");
      setData(initial);
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold mb-2">Water Park Tickets</h1>
      <p className="text-slate-700 mb-6">
        Buy a digital ticket and enter by scanning the QR at the gate. (MVP: no
        payment yet.)
      </p>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name *</label>
            <input
              name="name"
              value={data.name}
              onChange={onChange}
              className="w-full rounded-lg border p-3"
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Visit Date *
            </label>
            <input
              type="date"
              name="date"
              value={data.date}
              onChange={onChange}
              className="w-full rounded-lg border p-3"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email *</label>
          <input
            type="email"
            name="email"
            autoComplete="off"
            value={data.email}
            onChange={onChange}
            className="w-full rounded-lg border p-3"
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="max-w-xs">
          <label className="block text-sm font-medium mb-1">Tickets *</label>
          <input
            name="count"
            inputMode="numeric"
            pattern="[0-9]*"
            value={data.count}
            onChange={onChange}
            className="w-full rounded-lg border p-3"
            placeholder="1"
            required
          />
        </div>

        <button
          disabled={loading}
          className="rounded-xl bg-sky-600 px-5 py-3 font-medium text-white hover:bg-sky-700 disabled:opacity-60"
        >
          {loading ? "Creating…" : "Get QR Ticket"}
        </button>

        {msg && <p className="text-green-700 mt-3">{msg}</p>}
        {err && <p className="text-red-700 mt-3">{err}</p>}
      </form>

      <p className="mt-6 text-sm text-slate-600">
        Staff entrance? Use the{" "}
        <a className="text-sky-700 underline" href="/scan">
          Scan
        </a>{" "}
        page.
      </p>
    </main>
  );
}
