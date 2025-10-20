// app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import StickyCtas from "./components/StickyCtas";

// TODO: switch to https://www.dolphinfunandfood.com after the domain is live.
const SITE_URL = "https://dolphin-fun-and-food-dolphin.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dolphin Fun & Food",
    template: "%s | Dolphin Fun & Food",
  },
  description:
    "Luxurious Restaurant • Banquets • Water Park — an 8-acre destination on the highway.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Dolphin Fun & Food",
    title: "Dolphin Fun & Food",
    description:
      "Luxurious Restaurant • Banquets • Water Park — an 8-acre destination.",
    images: [
      {
        url: "/images/dolphin-banner.jpg", // file in /public/images
        width: 1200,
        height: 630,
        alt: "Dolphin Fun & Food",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dolphin Fun & Food",
    description:
      "Luxurious Restaurant • Banquets • Water Park — an 8-acre destination.",
    images: ["/images/dolphin-banner.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png", // put a 180x180 in /public
  },
  themeColor: "#0ea5e9", // subtle blue accent
  other: {
    "format-detection": "telephone=no",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <NavBar />
        {children}
        <StickyCtas /> {/* ⬅️ mount once, on every page */}
      </body>
    </html>
  );
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
// import type { Metadata } from "next";
// import "./globals.css";
// import NavBar from "@/components/NavBar";

// export const metadata: Metadata = {
//   metadataBase: new URL("https://www.dolphinfunandfood.com"),
//   title: {
//     default: "Dolphin Fun & Food",
//     template: "%s | Dolphin Fun & Food",
//   },
//   description:
//     "Luxurious Restaurant • Banquets • Water Park — an 8-acre destination on the highway.",
//   openGraph: {
//     type: "website",
//     url: "https://www.dolphinfunandfood.com",
//     title: "Dolphin Fun & Food",
//     description:
//       "Luxurious Restaurant • Banquets • Water Park — an 8-acre destination.",
//     images: [
//       {
//         url: "/images/dolphin-banner.jpg", // lives in /public/images
//         width: 1200,
//         height: 630,
//         alt: "Dolphin Fun & Food",
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Dolphin Fun & Food",
//     description:
//       "Luxurious Restaurant • Banquets • Water Park — an 8-acre destination.",
//     images: ["/images/dolphin-banner.jpg"],
//   },
//   icons: {
//     icon: "/favicon.ico",
//   },
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body>
//         <NavBar /> {/* <- add this line */}
//         {children}
//       </body>
//     </html>
//   );
// }

