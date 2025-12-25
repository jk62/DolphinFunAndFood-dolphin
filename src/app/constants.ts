export type GalleryItem = { src: string; alt?: string };

//----------------------------------------
// MAIN FEATURED SLIDES (band with caption + image)
export const FEATURED_SLIDES = [
  {
    src: "/images/gallery/pic-01.png",
    alt: "Feast for eyes and soul",
    tagline: "Fresh, fun, and full of fuel.",
  },
  {
    src: "/images/gallery/pic-02.jpg",
    alt: "Veg North Indian Thali",
    tagline: "A perfectly curated plate of timeless North Indian flavours.",
  },
  {
    src: "/images/gallery/pic-03.jpg",
    alt: "Jumpy dolphin at sunrise",
    tagline: "Energy. Freedom. Fun — the Dolphin way.",
  },
  {
    src: "/images/gallery/pic-04.jpg",
    alt: "Mother & Child Underwater",
    tagline: "Where every splash becomes a memory.",
  },
  {
    src: "/images/gallery/pic-05.jpg",
    alt: "Kids & Family on Car Striking Ride",
    tagline: "Bump into happiness — one ride at a time!",
  },
  {
    src: "/images/gallery/pic-06.png",
    alt: "Opening Shortly Balloon 1",
    tagline: "Murthal’s New Destination for Food, Fun & Family!",
  },
  {
    src: "/images/gallery/pic-07.png",
    alt: "Opening Shortly Balloon 2",
    tagline: "Highway’s Happiest Stop — Open Now!",
  },
  {
    src: "/images/gallery/pic-08.png",
    alt: "Yellow & White Balloon in the Sky ",
    tagline: "Highway’s Happiest Stop — Open Now!",
  },
  {
    src: "/images/gallery/pic-09.png",
    alt: "Dolphin at your service ",
    tagline: "When Hunger Strikes… Dive to Dolphin!",
  },
  {
    src: "/images/gallery/pic-10.png",
    alt: "Dolphin in the service of Buddha",
    tagline: "When a Dolphin Serves, Even Buddha Smiles.",
  },
  {
    src: "/images/gallery/pic-11.png",
    alt: "Ganpati Bappa’s Blessings…",
    tagline: "Bappa’s Blessings, Dolphin’s Devotion — A Heavenly Moment.",
  },
  {
    src: "/images/gallery/pic-12.png",
    alt: "Palm Breeze, Blue Seas, Big Smiles.",
    tagline: "From Ocean Vibes to High-Energy Rides!",
  },
  {
    src: "/images/gallery/pic-13.png",
    alt: "Dolphin: Fun & Food, Showered with Buddha's Grace.",
    tagline: "Buddha Smiles Upon Dolphin: Your New Spot for Fun & Friends.",
  },
  {
    src: "/images/gallery/pic-14.jpg",
    alt: "At Dolphin, Every Child Finds Their Smile.",
    tagline: "Big Fun for Little Ones.",
  },
  {
    src: "/images/gallery/pic-15.jpg",
    alt: "At Dolphin, Every Child Finds Their Smile.",
    tagline: "Smiles You Can’t Put a Price On.",
  },
];

//----------------------------------------
// SECOND GALLERY (tile slideshow from /images/gallery-2)

export const GALLERY2_FILES = [
  "pic-01.jpg",
  "pic-02.jpg",
  "pic-03.jpg",
  "pic-04.jpg",
  "pic-05.jpg",
  "pic-06.jpg",
  "pic-07.jpg",
  "pic-08.png",
  "pic-09.png",
  "pic-10.jpg",
  "pic-11.jpg",
  "pic-12.jpg",
  "pic-13.jpg",
  "pic-14.jpg",
  "pic-15.jpg",
  "pic-16.png",
  "pic-17.png",
  "pic-18.jpg",
  "pic-19.png",
  "pic-20.png",
  "pic-21.png",
  "pic-22.png",
  "pic-23.png",
  "pic-24.jpg",
  "pic-25.jpg",
  "pic-26.jpg",
  "pic-27.jpg",
  "pic-28.jpg",
  "pic-29.jpg",
  "pic-30.jpg",
  "pic-31.jpg",
];

export const GALLERY2_IMAGES: GalleryItem[] = GALLERY2_FILES.map((file) => ({
  src: `/images/gallery-2/${file}`,
  alt: `Dolphin Fun & Food gallery image ${file}`,
}));

//----------------------------------------
// THIRD GALLERY (used for hero background slideshow) from /images/gallery-3

export const GALLERY3_FILES = [
  "pic-01.jpg",
  "pic-02.jpg",
  "pic-03.jpg",
  "pic-04.jpg",
  "pic-05.jpg",
  "pic-06.jpg",
  "pic-07.png",
  "pic-08.jpg",
  "pic-09.jpg",
  "pic-10.jpg",
  "pic-11.jpg",
  "pic-12.jpg",
  "pic-13.jpg",
  "pic-14.jpg",
  "pic-15.png",
  "pic-16.png",
  "pic-17.png",
  "pic-18.jpg",
  "pic-19.png",
  "pic-20.png",
  "pic-21.png",
  "pic-22.png",
  "pic-23.png",
  "pic-24.png",
  "pic-25.png",
  "pic-26.png",
  "pic-27.png",
  "pic-28.png",
  "pic-29.png",
  "pic-30.png",
  "pic-31.png",
  "pic-32.png",
  "pic-33.jpg",
  "pic-34.jpg",
];

export const GALLERY3_IMAGES: GalleryItem[] = GALLERY3_FILES.map((file) => ({
  src: `/images/gallery-3/${file}`,
  alt: `Dolphin Fun & Food interior ${file}`,
}));
