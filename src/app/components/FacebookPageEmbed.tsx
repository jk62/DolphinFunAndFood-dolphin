// app/components/FacebookPageEmbed.tsx
"use client";
import { useEffect, useRef } from "react";

type Props = {
  href?: string;
  width?: number;
  height?: number;
  smallHeader?: boolean;
  hideCover?: boolean;
  responsive?: boolean;
};

type FBInitOptions = {
  appId?: string;
  xfbml?: boolean;
  version?: string;
  cookie?: boolean;
  status?: boolean;
  autoLogAppEvents?: boolean;
  frictionlessRequests?: boolean;
};
type FBSDK = {
  XFBML?: { parse: (el?: Element) => void };
  init?: (o: FBInitOptions) => void;
};
type FBWindow = Window & { FB?: FBSDK; fbAsyncInit?: () => void };

export default function FacebookPageEmbed({
  href = "https://www.facebook.com/profile.php?id=61582301725295",
  width = 360,
  height = 500,
  smallHeader = false,
  hideCover = false,
  responsive = false,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  // Load SDK + initial parse
  useEffect(() => {
    const w = window as unknown as FBWindow;
    const parse = () => w.FB?.XFBML?.parse?.(ref.current ?? undefined);

    if (w.FB?.XFBML) {
      parse();
    } else {
      w.fbAsyncInit = function () {
        w.FB?.init?.({ xfbml: true, version: "v20.0" } as FBInitOptions);
        parse();
      };
      if (!document.getElementById("facebook-jssdk")) {
        const s = document.createElement("script");
        s.id = "facebook-jssdk";
        s.async = true;
        s.defer = true;
        s.crossOrigin = "anonymous";
        s.src = "https://connect.facebook.net/en_US/sdk.js";
        document.body.appendChild(s);
      }
    }
  }, []);

  // Re-parse when container resizes (helps mobile rotation, dynamic toolbars)
  useEffect(() => {
    const w = window as unknown as FBWindow;
    if (!ref.current) return;
    const el = ref.current;
    const ro = new ResizeObserver(() => {
      // debounce a touch to avoid spam
      const t = setTimeout(() => {
        clearTimeout(t);
        w.FB?.XFBML?.parse?.(el);
      }, 150);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const outerStyle = responsive
    ? { width: "100%", minHeight: height }
    : { width, height };

  return (
    <div style={outerStyle}>
      {/* recommended by FB SDK */}
      <div id="fb-root" />
      <div
        ref={ref}
        className="fb-page"
        data-href={href}
        data-tabs="timeline"
        {...(!responsive ? { "data-width": String(width) } : {})}
        data-height={String(height)}
        data-small-header={smallHeader ? "true" : "false"}
        data-hide-cover={hideCover ? "true" : "false"}
        data-show-facepile="true"
        data-adapt-container-width="true"
      />
    </div>
  );
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
// // app/components/FacebookPageEmbed.tsx
// "use client";
// import { useEffect, useRef } from "react";

// type Props = {
//   href?: string;
//   width?: number;
//   height?: number;
//   smallHeader?: boolean;
//   hideCover?: boolean;
//   responsive?: boolean; // ← NEW
// };
// // Put these near the top of FacebookPageEmbed.tsx

// type FBInitOptions = {
//   appId?: string;
//   xfbml?: boolean;
//   version?: string;
//   cookie?: boolean;
//   status?: boolean;
//   autoLogAppEvents?: boolean;
//   frictionlessRequests?: boolean;
// };

// type FBSDK = {
//   XFBML?: { parse: (el?: Element) => void };
//   init?: (o: FBInitOptions) => void;
// };

// type FBWindow = Window & {
//   FB?: FBSDK;
//   fbAsyncInit?: () => void;
// };

// // export default function FacebookPageEmbed({
// //   href = "https://www.facebook.com/profile.php?id=61582301725295",
// //   width = 360,
// //   height = 420,
// //   smallHeader = true,
// //   hideCover = false,
// // }: Props) {
// //   const ref = useRef<HTMLDivElement | null>(null);

// //   useEffect(() => {
// //     const w = window as unknown as FBWindow;

// //     if (w.FB?.XFBML) {
// //       w.FB.XFBML.parse(ref.current ?? undefined);
// //       return;
// //     }

// //     w.fbAsyncInit = function () {
// //       w.FB?.init?.({ xfbml: true, version: "v20.0" } satisfies FBInitOptions);
// //       w.FB?.XFBML?.parse(ref.current ?? undefined);
// //     };

// //     if (!document.getElementById("facebook-jssdk")) {
// //       const s = document.createElement("script");
// //       s.id = "facebook-jssdk";
// //       s.async = true;
// //       s.defer = true;
// //       s.crossOrigin = "anonymous";
// //       s.src = "https://connect.facebook.net/en_US/sdk.js";
// //       document.body.appendChild(s);
// //     }
// //   }, []);

// //   return (
// //     <div style={{ width, height }}>
// //       <div
// //         ref={ref}
// //         className="fb-page"
// //         data-href={href}
// //         data-tabs="timeline"
// //         data-width={String(width)}
// //         data-height={String(height)}
// //         data-small-header={smallHeader ? "true" : "false"}
// //         data-hide-cover={hideCover ? "true" : "false"}
// //         data-show-facepile="true"
// //         data-adapt-container-width="true"
// //       />
// //     </div>
// //   );
// // }
// //------------------------------------------------------------
// export default function FacebookPageEmbed({
//   href = "https://www.facebook.com/profile.php?id=61582301725295",
//   width = 360,
//   height = 500,
//   smallHeader = false,
//   hideCover = false,
//   responsive = false, // ← NEW default off
// }: Props) {
//   const ref = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const w = window as unknown as FBWindow;
//     if (w.FB?.XFBML) {
//       w.FB.XFBML.parse(ref.current ?? undefined);
//       return;
//     }
//     w.fbAsyncInit = function () {
//       w.FB?.init?.({ xfbml: true, version: "v20.0" } as FBInitOptions);
//       w.FB?.XFBML?.parse(ref.current ?? undefined);
//     };
//     if (!document.getElementById("facebook-jssdk")) {
//       const s = document.createElement("script");
//       s.id = "facebook-jssdk";
//       s.async = true;
//       s.defer = true;
//       s.crossOrigin = "anonymous";
//       s.src = "https://connect.facebook.net/en_US/sdk.js";
//       document.body.appendChild(s);
//     }
//   }, []);

//   const outerStyle = responsive
//     ? { width: "100%", minHeight: height }
//     : { width, height };

//   return (
//     <div style={outerStyle}>
//       <div
//         ref={ref}
//         className="fb-page"
//         data-href={href}
//         data-tabs="timeline"
//         {...(!responsive ? { "data-width": String(width) } : {})} // omit width in responsive mode
//         data-height={String(height)}
//         data-small-header={smallHeader ? "true" : "false"}
//         data-hide-cover={hideCover ? "true" : "false"}
//         data-show-facepile="true"
//         data-adapt-container-width="true"
//       />
//     </div>
//   );
// }

//------------------------------------------------------------

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
// // app/components/FacebookPageEmbed.tsx
// "use client";
// import { useEffect } from "react";

// type Props = { height?: number };

// export default function FacebookPageEmbed({ height = 420 }: Props) {
//   useEffect(() => {
//     const w = window as unknown as Window & {
//       FB?: {
//         XFBML?: { parse: () => void };
//         init?: (opts: Record<string, unknown>) => void;
//       };
//       fbAsyncInit?: () => void;
//     };

//     if (w.FB?.XFBML) {
//       w.FB.XFBML.parse();
//       return;
//     }
//     w.fbAsyncInit = function () {
//       w.FB?.init?.({ xfbml: true, version: "v20.0" });
//     };
//     if (!document.getElementById("facebook-jssdk")) {
//       const s = document.createElement("script");
//       s.id = "facebook-jssdk";
//       s.async = true;
//       s.defer = true;
//       s.crossOrigin = "anonymous";
//       s.src = "https://connect.facebook.net/en_US/sdk.js";
//       document.body.appendChild(s);
//     }
//   }, []);

//   return (
//     <>
//       <div id="fb-root"></div>
//       <div
//         className="fb-page"
//         data-href="https://www.facebook.com/profile.php?id=61582301725295"
//         data-tabs="timeline"
//         data-small-header="true"
//         data-hide-cover="true"
//         data-show-facepile="true"
//         data-adapt-container-width="true"
//         data-height={String(height)}
//       />
//     </>
//   );
// }

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
// "use client";
// import { useEffect } from "react";

// export default function FacebookPageEmbed() {
//   useEffect(() => {
//     const w = window as unknown as Window & {
//       FB?: {
//         XFBML?: { parse: () => void };
//         init?: (opts: Record<string, unknown>) => void;
//       };
//       fbAsyncInit?: () => void;
//     };

//     if (w.FB?.XFBML) {
//       w.FB.XFBML.parse();
//       return;
//     }
//     w.fbAsyncInit = function () {
//       w.FB?.init?.({ xfbml: true, version: "v20.0" });
//     };
//     if (!document.getElementById("facebook-jssdk")) {
//       const s = document.createElement("script");
//       s.id = "facebook-jssdk";
//       s.async = true;
//       s.defer = true;
//       s.crossOrigin = "anonymous";
//       s.src = "https://connect.facebook.net/en_US/sdk.js";
//       document.body.appendChild(s);
//     }
//   }, []);

//   return (
//     <>
//       <div id="fb-root"></div>
//       <div
//         className="fb-page"
//         data-href="https://www.facebook.com/profile.php?id=61582301725295"
//         data-tabs="timeline"
//         data-small-header="true"
//         data-hide-cover="true"
//         data-show-facepile="true"
//         data-adapt-container-width="true"
//         data-height="1200" // ↑ increase to show several posts at once
//       />
//     </>
//   );
// }

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
// "use client";
// import { useEffect } from "react";

// export default function FacebookPageEmbed() {
//   useEffect(() => {
//     const w = window as unknown as Window & {
//       FB?: {
//         XFBML?: { parse: () => void };
//         init?: (opts: Record<string, unknown>) => void;
//       };
//       fbAsyncInit?: () => void;
//     };

//     // If SDK already loaded, just re-parse XFBML
//     if (w.FB?.XFBML) {
//       w.FB.XFBML.parse();
//       return;
//     }

//     // Setup fbAsyncInit before loading the SDK
//     w.fbAsyncInit = function () {
//       w.FB?.init?.({ xfbml: true, version: "v20.0" });

//     };

//     // Avoid adding the script twice
//     if (!document.getElementById("facebook-jssdk")) {
//       const s = document.createElement("script");
//       s.id = "facebook-jssdk";
//       s.async = true;
//       s.defer = true;
//       s.crossOrigin = "anonymous";
//       s.src = "https://connect.facebook.net/en_US/sdk.js";
//       document.body.appendChild(s);
//     }
//   }, []);

//   return (
//     <>
//       <div id="fb-root"></div>
//       <div
//         className="fb-page"
//         data-href="https://www.facebook.com/profile.php?id=61582301725295"
//         data-tabs="timeline"
//         data-small-header="false"
//         data-hide-cover="false"
//         data-show-facepile="true"
//         data-adapt-container-width="true"
//         // omit data-width so it auto-fits the container
//       />
//     </>
//   );
// }
