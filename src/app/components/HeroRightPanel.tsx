"use client";

import { useEffect, useState } from "react";
import FacebookPageEmbedShell from "./FacebookPageEmbedShell"; // <-- your existing one

type TopAdResponse = {
  ok: boolean;
  reason?: string;
  ad?: {
    ad_id: string;
    ad_name?: string;
    impressions?: string;
  };
  creative?: {
    object_story_id?: string;
    thumbnail_url?: string;
    image_url?: string;
    title?: string;
  };
};

export default function HeroRightPanel() {
  const [data, setData] = useState<TopAdResponse | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/top-facebook-ad", { cache: "no-store" });
        const json = (await res.json()) as TopAdResponse;
        setData(json);
      } catch (e) {
        setData({ ok: false, reason: "network-error" });
      }
    })();
  }, []);

  // still loading → show old embed
  if (!data) {
    return <FacebookPageEmbedShell />;
  }

  // API failed (most likely: no ads_read yet) → show old embed
  if (!data.ok || !data.creative) {
    return <FacebookPageEmbedShell />;
  }

  const image =
    data.creative.thumbnail_url ||
    data.creative.image_url ||
    "/dolphin-placeholder.jpg";

  return (
    <div className="relative rounded-2xl bg-white/80 backdrop-blur p-3 shadow-xl w-[360px] h-[500px] flex flex-col">
      <img
        src={image}
        alt={data.ad?.ad_name ?? "Facebook Ad"}
        className="rounded-xl mb-3 h-[210px] w-full object-cover"
      />
      <div className="text-[11px] uppercase tracking-wide text-slate-500 mb-1">
        Most viewed on Facebook
      </div>
      <div className="text-lg font-semibold mb-2 line-clamp-2">
        {data.creative.title ??
          data.ad?.ad_name ??
          "Dolphin Fun & Food promotion"}
      </div>
      {data.ad?.impressions ? (
        <div className="text-xs text-slate-500 mb-3">
          {data.ad.impressions} impressions (last 30 days)
        </div>
      ) : null}
      <a
        href="https://www.facebook.com/DolphinFunAndFood"
        target="_blank"
        rel="noreferrer"
        className="mt-auto inline-flex items-center justify-center rounded-lg bg-blue-600 text-white text-sm h-9"
      >
        View on Facebook
      </a>
    </div>
  );
}
