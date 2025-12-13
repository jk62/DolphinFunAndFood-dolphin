// src/app/components/GoogleTag.tsx
"use client";
import Script from "next/script";

const GOOGLE_ADS_ID = "AW-1776989853";

export default function GoogleTag() {
  return (
    <>
      {/* Load the Google tag script */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
      />
      {/* Initialize gtag after loading */}
      <Script
        id="google-gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){ dataLayer.push(arguments); }
          gtag('js', new Date());
          gtag('config', '${GOOGLE_ADS_ID}');
        `,
        }}
      />
    </>
  );
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
// // src/app/components/GoogleTag.tsx
// "use client";

// import Script from "next/script";

// const GOOGLE_ADS_ID = "AW-1776989853";

// export default function GoogleTag() {
//   return (
//     <>
//       {/* Load the Google tag script */}
//       <Script
//         id="google-ads-gtag"
//         strategy="afterInteractive"
//         src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
//       />

//       {/* Initialize gtag */}
//       <Script id="google-ads-gtag-inline" strategy="afterInteractive">
//         {`
//           window.dataLayer = window.dataLayer || [];
//           function gtag(){dataLayer.push(arguments);}
//           gtag('js', new Date());
//           gtag('config', '${GOOGLE_ADS_ID}');
//         `}
//       </Script>
//     </>
//   );
// }
