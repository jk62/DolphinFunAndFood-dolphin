// src/app/api/media/route.ts
import { NextResponse } from "next/server";
import { readdir } from "fs/promises";
import path from "path";

type MediaItem = { src: string; alt?: string };

function numericPart(name: string) {
  // e.g., "pic-12.jpg" -> 12
  const m = name.match(/-(\d+)\./);
  return m ? Number(m[1]) : 0;
}

export async function GET() {
  try {
    const galleryDir = path.join(process.cwd(), "public", "images", "gallery");
    const reelsDir = path.join(process.cwd(), "public", "videos", "reels");

    const [galleryFiles, reelFiles] = await Promise.allSettled([
      readdir(galleryDir),
      readdir(reelsDir),
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

    const reels: MediaItem[] =
      reelFiles.status === "fulfilled"
        ? reelFiles.value
            // .filter((f) => /^reel-\d+\.(mp4|webm|ogg)$/i.test(f))
            .filter((f) => /^reel[-_]\d+\.(mp4|webm|ogg)$/i.test(f))

            .sort((a, b) => numericPart(a) - numericPart(b))
            .map((f) => ({
              src: `/videos/reels/${f}`,
            }))
        : [];

    return NextResponse.json({ gallery, reels });
  } catch (e) {
    return NextResponse.json({ gallery: [], reels: [] }, { status: 200 });
  }
}
