import { readdir } from "fs/promises";
import path from "path";

export type MediaItem = { src: string; alt?: string; poster?: string };

function numericPart(name: string) {
  // e.g., "pic-12.jpg" or "reel-05.mp4" or "reel_03.webm" -> 12 / 5 / 3
  const m = name.match(/[-_](\d+)\./);
  return m ? Number(m[1]) : 0;
}

export async function getMediaFiles() {
  try {
    const galleryDir = path.join(process.cwd(), "public", "images", "gallery");
    
    // Four separate reels folders
    const reels1Dir = path.join(process.cwd(), "public", "videos", "reels1");
    const reels2Dir = path.join(process.cwd(), "public", "videos", "reels2");
    const reels3Dir = path.join(process.cwd(), "public", "videos", "reels3");
    const reels4Dir = path.join(process.cwd(), "public", "videos", "reels4");

    const [galleryFiles, reels1Files, reels2Files, reels3Files, reels4Files] =
      await Promise.allSettled([
        readdir(galleryDir),
        readdir(reels1Dir),
        readdir(reels2Dir),
        readdir(reels3Dir),
        readdir(reels4Dir),
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

    const getReels = (files: PromiseSettledResult<string[]>, dirName: string) => 
      files.status === "fulfilled"
        ? files.value
            .filter((f) => /^reel[-_]\d+\.(mp4|webm|ogg)$/i.test(f))
            .sort((a, b) => numericPart(a) - numericPart(b))
            .map((f) => ({
              src: `/videos/${dirName}/${f}`,
            }))
        : [];

    const reels1 = getReels(reels1Files, "reels1");
    const reels2 = getReels(reels2Files, "reels2");
    const reels3 = getReels(reels3Files, "reels3");
    const reels4 = getReels(reels4Files, "reels4");

    return { gallery, reels1, reels2, reels3, reels4 };
  } catch (e) {
    console.error("Error fetching media files:", e);
    return { gallery: [], reels1: [], reels2: [], reels3: [], reels4: [] };
  }
}
