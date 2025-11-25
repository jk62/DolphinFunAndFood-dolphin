// src/app/api/media/route.ts
import { NextResponse } from "next/server";
import { readdir } from "fs/promises";
import path from "path";

type MediaItem = { src: string; alt?: string };

function numericPart(name: string) {
  // e.g., "pic-12.jpg" or "reel-05.mp4" or "reel_03.webm" -> 12 / 5 / 3
  const m = name.match(/[-_](\d+)\./);
  return m ? Number(m[1]) : 0;
}

export async function GET() {
  try {
    const galleryDir = path.join(process.cwd(), "public", "images", "gallery");

    // New: three separate reels folders
    const reels1Dir = path.join(process.cwd(), "public", "videos", "reels1");
    const reels2Dir = path.join(process.cwd(), "public", "videos", "reels2");
    const reels3Dir = path.join(process.cwd(), "public", "videos", "reels3");

    const [galleryFiles, reels1Files, reels2Files, reels3Files] =
      await Promise.allSettled([
        readdir(galleryDir),
        readdir(reels1Dir),
        readdir(reels2Dir),
        readdir(reels3Dir),
      ]);

    const gallery: MediaItem[] =
      galleryFiles.status === "fulfilled"
        ? galleryFiles.value
            .filter((f) => /^pic-\d+\.(jpe?g|png|webp|avif)$/i.test(f))
            .sort((a, b) => numericPart(a) - numericPart(b))
            .map((f) => ({
              src: `/images/gallery/${f}`,
              alt: `Gallery ${numericPart(f).toString().padStart(2, "0")}`,
            }))
        : [];

    const reels1: MediaItem[] =
      reels1Files.status === "fulfilled"
        ? reels1Files.value
            // filenames like reel-01.mp4 or reel_02.webm
            .filter((f) => /^reel[-_]\d+\.(mp4|webm|ogg)$/i.test(f))
            .sort((a, b) => numericPart(a) - numericPart(b))
            .map((f) => ({
              src: `/videos/reels1/${f}`,
            }))
        : [];

    const reels2: MediaItem[] =
      reels2Files.status === "fulfilled"
        ? reels2Files.value
            .filter((f) => /^reel[-_]\d+\.(mp4|webm|ogg)$/i.test(f))
            .sort((a, b) => numericPart(a) - numericPart(b))
            .map((f) => ({
              src: `/videos/reels2/${f}`,
            }))
        : [];

    const reels3: MediaItem[] =
      reels3Files.status === "fulfilled"
        ? reels3Files.value
            .filter((f) => /^reel[-_]\d+\.(mp4|webm|ogg)$/i.test(f))
            .sort((a, b) => numericPart(a) - numericPart(b))
            .map((f) => ({
              src: `/videos/reels3/${f}`,
            }))
        : [];

    return NextResponse.json({ gallery, reels1, reels2, reels3 });
  } catch (e) {
    // On error, just return empty arrays so the front-end doesn't crash
    return NextResponse.json(
      { gallery: [], reels1: [], reels2: [], reels3: [] },
      { status: 200 }
    );
  }
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//
// Code below good with same reels in all 3 reel sections of hero panel
// // src/app/api/media/route.ts
// import { NextResponse } from "next/server";
// import { readdir } from "fs/promises";
// import path from "path";

// type MediaItem = { src: string; alt?: string };

// function numericPart(name: string) {
//   // e.g., "pic-12.jpg" -> 12
//   const m = name.match(/-(\d+)\./);
//   return m ? Number(m[1]) : 0;
// }

// export async function GET() {
//   try {
//     const galleryDir = path.join(process.cwd(), "public", "images", "gallery");
//     const reelsDir = path.join(process.cwd(), "public", "videos", "reels");

//     const [galleryFiles, reelFiles] = await Promise.allSettled([
//       readdir(galleryDir),
//       readdir(reelsDir),
//     ]);

//     const gallery: MediaItem[] =
//       galleryFiles.status === "fulfilled"
//         ? galleryFiles.value
//             .filter((f) => /^pic-\d+\.(jpe?g|png|webp|avif)$/i.test(f))
//             .sort((a, b) => numericPart(a) - numericPart(b))
//             .map((f) => ({
//               src: `/images/gallery/${f}`,
//               alt: `Gallery ${numericPart(f).toString().padStart(2, "0")}`,
//             }))
//         : [];

//     const reels: MediaItem[] =
//       reelFiles.status === "fulfilled"
//         ? reelFiles.value
//             // .filter((f) => /^reel-\d+\.(mp4|webm|ogg)$/i.test(f))
//             .filter((f) => /^reel[-_]\d+\.(mp4|webm|ogg)$/i.test(f))

//             .sort((a, b) => numericPart(a) - numericPart(b))
//             .map((f) => ({
//               src: `/videos/reels/${f}`,
//             }))
//         : [];

//     return NextResponse.json({ gallery, reels });
//   } catch (e) {
//     return NextResponse.json({ gallery: [], reels: [] }, { status: 200 });
//   }
// }
