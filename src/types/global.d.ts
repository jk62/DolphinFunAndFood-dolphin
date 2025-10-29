// src/types/global.d.ts
export {};

declare global {
  interface Window {
    FB?: {
      XFBML: { parse: () => void };
      init?: (opts: Record<string, unknown>) => void;
    };
    fbAsyncInit?: () => void;
  }
}
