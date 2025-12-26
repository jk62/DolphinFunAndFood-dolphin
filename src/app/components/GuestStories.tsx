"use client";
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

// Define the stories data based on available video files
interface Story {
  id: number;
  title: string;
  author: string;
  video: string;
}

const stories: Story[] = [
  { id: 1, title: "Amazing Experience", author: "@guest_01", video: "/videos/review-reels/review-01.mp4" },
  { id: 2, title: "Best Non-Veg Food", author: "@guest_02", video: "/videos/review-reels/review-02.mp4" },
  { id: 3, title: "Good Food - would like to come again", author: "@guest_03", video: "/videos/review-reels/review-03.mp4" },
  { id: 4, title: "Food was very good", author: "@guest_04", video: "/videos/review-reels/review-04.mp4" },
  { id: 5, title: "Best for us", author: "@guest_05", video: "/videos/review-reels/review-05.mp4" },
  { id: 6, title: "Delicious Meals-Very good service", author: "@guest_06", video: "/videos/review-reels/review-06.mp4" },
  { id: 7, title: "Kids loved it", author: "@guest_07", video: "/videos/review-reels/review-07.mp4" },
  { id: 8, title: "Nice hospitality", author: "@guest_08", video: "/videos/review-reels/review-08.mp4" },
  { id: 9, title: "Lovely Atmosphere-Hydrabadi Biryani was too good", author: "@guest_09", video: "/videos/review-reels/review-9.mp4" },
  { id: 10, title: "Lajawab Khana", author: "@guest_10", video: "/videos/review-reels/review-10.mp4" },
  { id: 11, title: "Great ambience. Food was very good", author: "@guest_11", video: "/videos/review-reels/review-11.mp4" },
  { id: 12, title: "Khana, kids zone, service all very good", author: "@guest_12", video: "/videos/review-reels/review-12.mp4" },
  { id: 13, title: "Amazing experience. Loved it", author: "@guest_13", video: "/videos/review-reels/review-13.mp4" },
  { id: 14, title: "Best in the area", author: "@guest_14", video: "/videos/review-reels/review-14.mp4" },
];

export default function GuestStories() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 350;
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="py-20 bg-sky-50 overflow-hidden relative">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">Guest Stories</h2>
        <p className="text-slate-500">See the fun through their eyes</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Navigation Arrows */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white/80 hover:bg-white text-slate-900 p-3 rounded-full shadow-lg backdrop-blur-sm transition-all hidden md:block border border-gray-100 group"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white/80 hover:bg-white text-slate-900 p-3 rounded-full shadow-lg backdrop-blur-sm transition-all hidden md:block border border-gray-100 group"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
        </button>

        <div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-auto pb-8 [&::-webkit-scrollbar]:hidden scrollbar-hide snap-x"
        >
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StoryCard({ story }: { story: Story }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If less than 60% of the card is visible, pause it
        if (!entry.isIntersecting && isPlaying) {
          if (videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        }
      },
      { threshold: 0.6 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  return (
    <div ref={cardRef} className="min-w-[280px] md:min-w-[320px] h-[568px] relative rounded-3xl overflow-hidden shadow-lg group cursor-pointer snap-center bg-black">
      <video
        ref={videoRef}
        src={story.video}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        muted={false} 
        onClick={togglePlay}
        onEnded={() => setIsPlaying(false)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

      {/* Play Button Overlay - Only show if NOT playing */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none">
          <div className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50">
            <Play fill="white" className="text-white ml-1" />
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 p-6 text-white w-full pointer-events-none">
        
        <h3 className="text-xl font-bold mb-1">&quot;{story.title}&quot;</h3>
        <p className="text-sm text-gray-300 opacity-80">{story.author}</p>
      </div>
    </div>
  );
}
