// src/lib/loadReels.ts
import fs from "fs";
import path from "path";

export type ReelCat = "restaurant" | "banquets" | "water-park" | "kids-zone";
export type Reel = {
  kind: "mp4";
  src: string; // /videos/reels/...
  poster?: string; // /videos/reels/...
  title: string; // human title from slug
  cat: ReelCat;
};

const VALID_CATS = new Set<ReelCat>([
  "restaurant",
  "banquets",
  "water-park",
  "kids-zone",
]);

function toTitle(slug: string) {
  return slug
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase())
    .trim();
}

/** Scan /public/videos/reels and build Reel[] from filenames */
export async function loadReels(): Promise<Reel[]> {
  const root = path.join(process.cwd(), "public", "videos", "reels");
  let files: string[] = [];
  try {
    files = fs.readdirSync(root);
  } catch {
    return [];
  }

  const mp4s = files.filter((f) => f.toLowerCase().endsWith(".mp4"));

  const reels: Reel[] = mp4s
    .map((file) => {
      // Expect: <cat>--<slug>.mp4
      const base = file.slice(0, -4); // strip .mp4
      const [maybeCat, slugRaw] = base.split("--");
      if (!maybeCat || !slugRaw) return null;
      const cat = maybeCat as ReelCat;
      if (!VALID_CATS.has(cat)) return null;

      // poster any of .jpg/.png/.webp with SAME base name
      const posterExt = [".jpg", ".jpeg", ".png", ".webp"].find((ext) =>
        files.includes(`${base}${ext}`)
      );
      const poster = posterExt
        ? `/videos/reels/${base}${posterExt}`
        : undefined;

      return {
        kind: "mp4" as const,
        src: `/videos/reels/${file}`,
        poster,
        title: toTitle(slugRaw),
        cat,
      };
    })
    .filter(Boolean) as Reel[];

  // newest first by filename timestamp if you like; otherwise keep alpha
  reels.sort((a, b) => a.title.localeCompare(b.title));
  return reels;
}
