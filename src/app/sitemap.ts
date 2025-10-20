export default async function sitemap() {
  const base = "https://dolphin-fun-and-food-dolphin.vercel.app";
  return [
    { url: `${base}/`, changefreq: "weekly", priority: 1.0 },
    { url: `${base}/banquet-enquiry`, changefreq: "weekly", priority: 0.9 },
    { url: `${base}/contact` },
    { url: `${base}/gallery` },
    { url: `${base}/reels` },
    { url: `${base}/tickets` },
  ];
}
