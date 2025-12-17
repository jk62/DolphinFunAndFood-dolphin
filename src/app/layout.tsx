// src/app/layout.tsx
// src/app/layout.tsx
import "./globals.css";
import type { Metadata, Viewport } from "next";
import NavBar from "@/components/NavBar";
import StickyCtas from "./components/StickyCtas";

const SITE_URL = "https://www.dolphinfunandfood.com";
const GOOGLE_ADS_ID = "AW-17769899853";

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
        {/* ✅ Plain Google Ads tag, no next/script, no environment vars */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GOOGLE_ADS_ID}');
            `,
          }}
        />
      </head>
      <body className="antialiased pb-24">
        <NavBar />
        {children}
        <StickyCtas />
      </body>
    </html>
  );
}


