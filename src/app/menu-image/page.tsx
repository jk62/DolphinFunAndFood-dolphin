// src/app/menu-image/page.tsx

import React from "react";
import Image from "next/image";

export default function MenuImagePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 py-8">
      <div className="max-w-4xl">
        <Image
          src="/dolphin-menu.png"
          alt="Dolphin Fun & Food Full Menu"
          width={800} // Adjust dimensions as needed
          height={600}
          className="rounded-lg shadow-lg"
        />
      </div>
    </main>
  );
}
