// src/app/scan/page.tsx
"use client";

import { useState } from "react";

type TicketClaims = {
  tid: string;
  name: string;
  email: string;
  date: string; // yyyy-mm-dd
  count: string; // number as string in this MVP
  iat: number;
  exp: number;
};

export default function ScanPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<TicketClaims | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function parseToken(s: string) {
    try {
      const url = new URL(s);
      const parts = url.pathname.split("/").filter(Boolean);
      if (parts[0] === "ticket" && parts[1]) return parts[1];
    } catch {
      // not a URL, treat as raw token
    }
    return s.trim();
  }

  async function verify() {
    setErr(null);
    setResult(null);
    setLoading(true);
    try {
      const token = parseToken(input);
      const res = await fetch("/api/tickets/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      // Parse JSON even on error to surface meaningful messages
      const json = (await res.json().catch(() => null)) as
        | (TicketClaims & { error?: string })
        | { error: string }
        | null;

      if (!res.ok) {
        const msg =
          (json && "error" in json && json.error) || `Failed (${res.status})`;
        throw new Error(msg);
      }

      // json is the verified payload
      setResult(json as TicketClaims);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Verification failed";
      setErr(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-lg px-4 py-10">
      <h1 className="text-2xl font-semibold mb-4">Scan / Verify Ticket</h1>
      <p className="text-slate-700 mb-4">Paste the ticket URL or token.</p>

      <div className="flex gap-2">
        <input
          className="flex-1 rounded-lg border p-3"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste token or /ticket/URL here"
        />
        <button
          onClick={verify}
          className="rounded-xl bg-sky-600 px-5 py-3 font-medium text-white hover:bg-sky-700"
          disabled={loading}
        >
          {loading ? "Checking…" : "Verify"}
        </button>
      </div>

      {err && <p className="text-red-700 mt-3">{err}</p>}

      {result && (
        <div className="mt-6 rounded-2xl border p-4 bg-white">
          <div className="text-green-700 font-semibold mb-2">Valid ticket</div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-slate-600">Ticket ID</div>
              <div className="font-mono">{result.tid}</div>
            </div>
            <div>
              <div className="text-slate-600">Tickets</div>
              <div className="font-medium">{result.count}</div>
            </div>
            <div>
              <div className="text-slate-600">Name</div>
              <div className="font-medium">{result.name}</div>
            </div>
            <div>
              <div className="text-slate-600">Date</div>
              <div className="font-medium">{result.date}</div>
            </div>
            <div>
              <div className="text-slate-600">Email</div>
              <div className="font-medium">{result.email}</div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
