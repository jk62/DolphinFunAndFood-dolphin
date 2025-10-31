// app/components/FacebookPageEmbedShell.tsx
"use client";

import FacebookPageEmbed from "./FacebookPageEmbed";

export default function FacebookPageEmbedShell() {
  // this is the card you show in the hero
  return (
    <div className="relative rounded-2xl bg-white/80 backdrop-blur p-3 shadow-xl w-[360px] h-[500px] overflow-hidden">
      {/* the actual FB plugin */}
      <FacebookPageEmbed
        width={340}
        height={460}
        smallHeader={false}
        hideCover={false}
      />

      {/* 🔒 blocker just on the top header/cover part */}
      <div className="absolute left-0 top-0 right-0 h-[400px] pointer-events-auto" />
    </div>
  );
}
