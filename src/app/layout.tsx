// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import NavBar from "@/components/NavBar";
import StickyCtas from "./components/StickyCtas";
import GoogleTag from "./components/GoogleTag";


const SITE_URL = "https://dolphin-fun-and-food-dolphin.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dolphin Fun & Food",
    template: "%s | Dolphin Fun & Food",
  },
  description:
    "Luxurious Restaurant • Banquets • Water Park — an 8-acre destination on the highway.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Dolphin Fun & Food",
    title: "Dolphin Fun & Food",
    description:
      "Luxurious Restaurant • Banquets • Water Park — an 8-acre destination.",
    images: [
      {
        url: "/images/dolphin-banner.jpg",
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
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0ea5e9" },
    { media: "(prefers-color-scheme: dark)", color: "#0b5db3" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXXX" // 👈 put your AW ID here
        />
        <Script id="google-ads-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-XXXXXXXXXX'); // 👈 same AW ID here
          `}
        </Script>
      </head>
      <body className="antialiased pb-24">
        <GoogleTag /> {/* ← Google Ads tag */}
        <div id="fb-root" />
        <NavBar />
        {children}
        <StickyCtas />
      </body>
    </html>
  );
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //

// code below with google tag
// // src/app/layout.tsx
// import type { Metadata, Viewport } from "next";
// import "./globals.css";
// import NavBar from "@/components/NavBar";
// import StickyCtas from "./components/StickyCtas";

// const SITE_URL = "https://dolphin-fun-and-food-dolphin.vercel.app";

// export const metadata: Metadata = {
//   metadataBase: new URL(SITE_URL),
//   title: {
//     default: "Dolphin Fun & Food",
//     template: "%s | Dolphin Fun & Food",
//   },
//   description:
//     "Luxurious Restaurant • Banquets • Water Park — an 8-acre destination on the highway.",
//   alternates: { canonical: "/" },
//   openGraph: {
//     type: "website",
//     url: SITE_URL,
//     siteName: "Dolphin Fun & Food",
//     title: "Dolphin Fun & Food",
//     description:
//       "Luxurious Restaurant • Banquets • Water Park — an 8-acre destination.",
//     images: [
//       {
//         url: "/images/dolphin-banner.jpg",
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
//     apple: "/apple-touch-icon.png", // we'll add this file in step 2
//   },
//   // ⛔️ remove themeColor from here
// };

// // ✅ put themeColor here instead (supports light/dark if you want)
// export const viewport: Viewport = {
//   width: "device-width",
//   initialScale: 1,
//   viewportFit: "cover",
//   themeColor: [
//     { media: "(prefers-color-scheme: light)", color: "#0ea5e9" },
//     { media: "(prefers-color-scheme: dark)", color: "#0b5db3" },
//   ],
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className="antialiased pb-24">
//         <div id="fb-root" /> {/* ← add this line */}
//         <NavBar />
//         {children}
//         <StickyCtas />
//       </body>
//     </html>
//   );
// }
