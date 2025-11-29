// scripts/batch-crop-16x9.cjs
// Usage:
//   node scripts/batch-crop-16x9.cjs
//
// This will process all pic-XX.(jpg|jpeg|png) inside
// public/images/gallery-3, crop them to 16:9, resize to 1920x1080,
// and overwrite the originals.

/* eslint-disable @typescript-eslint/no-require-imports */

const sharp = require("sharp");
const path = require("path");
const fs = require("fs").promises;
const fsSync = require("fs");

// Folder containing your 60 images
const GALLERY_DIR = path.join(__dirname, "..", "public", "images", "gallery-3");

// Target 16:9 output resolution (default 1920x1080)
const TARGET_WIDTH = parseInt(process.env.TARGET_WIDTH || "1920", 10);
const TARGET_HEIGHT = parseInt(process.env.TARGET_HEIGHT || "1080", 10);
const TARGET_RATIO = TARGET_WIDTH / TARGET_HEIGHT;

async function processOne(fullPath) {
  try {
    const image = sharp(fullPath);
    const metadata = await image.metadata();
    const { width, height, format } = metadata;

    if (!width || !height) {
      console.warn(`⚠️  Skipping (no dimensions): ${fullPath}`);
      return;
    }

    console.log(`\n📷 Processing: ${fullPath}`);
    console.log(`   Original size: ${width} x ${height} (format: ${format})`);

    const originalRatio = width / height;

    let cropWidth = width;
    let cropHeight = height;
    let left = 0;
    let top = 0;

    if (originalRatio > TARGET_RATIO) {
      // Too wide → crop left & right
      cropHeight = height;
      cropWidth = Math.round(height * TARGET_RATIO);
      left = Math.round((width - cropWidth) / 2);
    } else if (originalRatio < TARGET_RATIO) {
      // Too tall → crop top & bottom
      cropWidth = width;
      cropHeight = Math.round(width / TARGET_RATIO);
      top = Math.round((height - cropHeight) / 2);
    }

    console.log(`   Cropping to: ${cropWidth} x ${cropHeight} (16:9 target)`);

    // Use a temporary file first so we don't corrupt the original
    const tmpPath = fullPath + ".tmp";

    await image
      .extract({ left, top, width: cropWidth, height: cropHeight })
      .resize(TARGET_WIDTH, TARGET_HEIGHT)
      // sharp will infer encoder (jpg/png) from file extension
      .toFile(tmpPath);

    // Replace original with temp
    await fs.rename(tmpPath, fullPath);

    console.log(
      `✅ Saved 16:9 image (overwritten): ${fullPath} → ${TARGET_WIDTH} x ${TARGET_HEIGHT}`
    );
  } catch (err) {
    console.error(`❌ Error processing ${fullPath}:`, err);

    // Clean up tmp file if it exists
    const tmpPath = fullPath + ".tmp";
    if (fsSync.existsSync(tmpPath)) {
      try {
        await fs.unlink(tmpPath);
      } catch {
        // ignore
      }
    }
  }
}

(async () => {
  try {
    if (!fsSync.existsSync(GALLERY_DIR)) {
      console.error(`❌ Gallery folder does not exist: ${GALLERY_DIR}`);
      process.exit(1);
    }

    const files = await fs.readdir(GALLERY_DIR);

    // Match pic-01.jpg, pic-02.png, ..., pic-60.jpg / .png / .jpeg
    const imageFiles = files.filter((file) =>
      /^pic-\d+\.(jpe?g|png)$/i.test(file)
    );

    if (!imageFiles.length) {
      console.warn(
        `⚠️  No matching files found in ${GALLERY_DIR} (expected pic-XX.(jpg|jpeg|png))`
      );
      process.exit(0);
    }

    console.log(
      `🔎 Found ${imageFiles.length} image(s) to process in ${GALLERY_DIR}`
    );

    for (const file of imageFiles) {
      const fullPath = path.join(GALLERY_DIR, file);
      await processOne(fullPath);
    }

    console.log("\n🎉 Done! All matching images processed.");
  } catch (err) {
    console.error("❌ Batch error:", err);
    process.exit(1);
  }
})();
