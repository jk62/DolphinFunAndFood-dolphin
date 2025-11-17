// src/app/components/Hero.tsx
"use client";

import HeroRightPanel from "./HeroRightPanel";

export default function Hero() {
  return (
    <section className="grid md:grid-cols-2 gap-6">
      <div className="flex flex-col justify-center gap-4">
        <h1 className="text-3xl md:text-4xl font-bold">
          Dolphin Fun &amp; Food
        </h1>
        <p className="text-slate-600">
          Great food, parties and water fun on the highway.
        </p>
      </div>
      <HeroRightPanel />
    </section>
  );
}
