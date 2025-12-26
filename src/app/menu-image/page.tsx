// src/app/menu-image/page.tsx

import React from "react";
import Image from "next/image";

export default function MenuImagePage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <div className="w-full">
        <Image
          src="/dolphin-menu.png"
          alt="Dolphin Fun & Food Full Menu"
          width={2816}
          height={1536}
          className="w-full h-auto"
          priority
        />
      </div>
    </main>
  );
}
