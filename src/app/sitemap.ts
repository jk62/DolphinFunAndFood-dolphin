// src/app/sitemap.ts

export default async function sitemap() {
  const base = "https://www.dolphinfunandfood.com";

  return [
    {
      url: `${base}/`,
      changefreq: "weekly",
      priority: 1.0,
    },
    {
      url: `${base}/banquet-enquiry`,
      changefreq: "weekly",
      priority: 0.9,
    },
    { url: `${base}/contact` },
    { url: `${base}/gallery` },
    { url: `${base}/reels` },
    { url: `${base}/tickets` },
  ];
}
