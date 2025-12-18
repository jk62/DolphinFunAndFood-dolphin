import fs from "fs";
import path from "path";

export type Review = {
  id: string;
  name: string;
  role?: string;
  rating: number; // 1-5
  avatar?: string;
  videoSrc?: string; // if it's a video review
  text?: string;
  date: string;
};

const VIDEOS_DIR = path.join(process.cwd(), "public/videos/review-reels");

export async function getReviews(): Promise<Review[]> {
  // Simulate network delay for Suspense
  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    if (!fs.existsSync(VIDEOS_DIR)) {
      return [];
    }
    
    const files = await fs.promises.readdir(VIDEOS_DIR);
    
    // Filter for common video extensions
    const videoFiles = files.filter((file) => 
      /\.(mp4|mov|webm)$/i.test(file)
    );

    const reviews: Review[] = videoFiles.map((file, index) => {
        // Synthesize metadata since we only have the filename
        return {
            id: `video-review-${index}`,
            name: "Happy Customer",
            rating: 5,
            videoSrc: `/videos/review-reels/${file}`,
            text: "Sharing our amazing experience at Dolphin Fun & Food! A must-visit destination.",
            date: new Date().toISOString().split('T')[0], // Today's date
        };
    });

    return reviews;

  } catch (error) {
    console.error("Error reading review videos:", error);
    return [];
  }
}

export async function getFeaturedReviews(): Promise<Review[]> {
    const reviews = await getReviews();
    // Return all found videos as featured
    return reviews;
}
