import { MediaItem } from "@/lib/media";
import InlineHeroReels from "./InlineHeroReels";

export default async function ReelsShelves({
  mediaPromise,
}: {
  mediaPromise: Promise<{
    gallery: MediaItem[];
    reels1: MediaItem[];
    reels2: MediaItem[];
    reels3: MediaItem[];
    reels4: MediaItem[];
  }>;
}) {
  const { reels1, reels2, reels3, reels4 } = await mediaPromise;

  return (
    <section className="bg-sky-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <InlineHeroReels videos={reels1} />
          <InlineHeroReels videos={reels2} />
          <InlineHeroReels videos={reels3} />
          <InlineHeroReels videos={reels4} />
        </div>
      </div>
    </section>
  );
}
