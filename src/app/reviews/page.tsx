import { getFeaturedReviews, getReviews } from "./data";
import TestimonialCard from "@/components/TestimonialCard";
import VideoCarousel from "@/components/VideoCarousel";

export const metadata = {
  title: "Reviews",
  description: "See what our happy customers have to say about Dolphin Fun & Food.",
};

export default async function ReviewsPage() {
  // Parallel fetching
  const [reviews, featuredReviews] = await Promise.all([
    getReviews(),
    getFeaturedReviews(),
  ]);

  return (
    <main className="min-h-screen bg-sky-50 pb-20">
        
      {/* Header Section */}
      <section className="bg-sky-900 pt-24 pb-16 text-white text-center rounded-b-[3rem] shadow-lg mb-10">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-4xl font-bold md:text-5xl mb-4">
            Customer Stories
          </h1>
          <p className="text-lg text-sky-200 max-w-2xl mx-auto">
            Real experiences from real families. Discover why Dolphin Fun & Food is the favorite stop on NH-44.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4">
        {/* Featured Video Carousel */}
        {featuredReviews.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-slate-800 text-center mb-6">
              Spotlight Reviews
            </h2>
            <VideoCarousel reviews={featuredReviews} />
          </section>
        )}

        {/* All Reviews Grid */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-800">
               Recent Feedback
            </h2>
            <div className="text-sm text-slate-500">
                Sorted by most recent
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <TestimonialCard key={review.id} review={review} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
