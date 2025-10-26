// src/lib/loadGallery.ts
import fs from "fs";
import path from "path";

export type Category = "restaurant" | "banquets" | "kids-zone" | "water-park";
export type Pic = { src: string; alt: string; cat: Category };

const GALLERY_DIR = path.join(process.cwd(), "public/images/gallery");

// simple alt text from filename
function filenameToAlt(filename: string) {
  const base = filename.replace(/\.(jpg|jpeg|png|webp|avif)$/i, "");
  return base.replace(/[-_]/g, " ").replace(/\b\w/g, (m) => m.toUpperCase()); // title case
}

// infer category from filename keywords/prefixes
function guessCategory(name: string): Category {
  const n = name.toLowerCase();

  // explicit prefixes win
  if (n.startsWith("restaurant-") || /veg|nonveg|thali|dish|food/.test(n))
    return "restaurant";
  if (n.startsWith("banquet") || /banquet|balloon|decor|hall/.test(n))
    return "banquets";
  if (n.startsWith("kids-") || /kids|kid|bumper|striking|car/.test(n))
    return "kids-zone";
  if (
    n.startsWith("water-park-") ||
    /water|splash|wave|slide|pool|dolphin|fish/.test(n)
  )
    return "water-park";

  // fallback — put unknowns in banquets (adjust if you like)
  return "banquets";
}

/**
 * Load all images from /public/images/gallery at build/request time.
 * Returns a Pic[] with src, alt, cat.
 */
export function loadGallery(): Pic[] {
  if (!fs.existsSync(GALLERY_DIR)) return [];

  const files = fs
    .readdirSync(GALLERY_DIR, { withFileTypes: true })
    .filter((d) => d.isFile())
    .map((d) => d.name)
    .filter((f) => /\.(jpg|jpeg|png|webp|avif)$/i.test(f))
    // sort newest-ish first (optional): by name descending
    .sort((a, b) => a.localeCompare(b)); // change to b.localeCompare(a) if you want reverse

  return files.map((filename) => ({
    src: `/images/gallery/${filename}`,
    alt: filenameToAlt(filename),
    cat: guessCategory(filename),
  }));
}
