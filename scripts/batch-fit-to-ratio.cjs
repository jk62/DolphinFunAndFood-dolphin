// scripts/batch-fit-to-ratio.cjs
// Usage:
//   node scripts/batch-fit-to-ratio.cjs 21:9
//   node scripts/batch-fit-to-ratio.cjs 4:5
//
// Fits all pic-XX.(jpg|jpeg|png) inside public/images/gallery-3
// into a canvas of given ratio WITHOUT CROPPING.
// It resizes with `fit: "contain"` and adds padding (letterbox/pillarbox)
// using a dark background.
//
// TARGET_WIDTH can be set via env; height is computed from the ratio.

/* eslint-disable @typescript-eslint/no-require-imports */

const sharp = require("sharp");
const path = require("path");
const fs = require("fs").promises;
const fsSync = require("fs");

const [, , ratioArg] = process.argv;

// --- parse ratio argument ---
const ratioStr = ratioArg || process.env.TARGET_RATIO || "21:9";
const ratioMatch = ratioStr.match(/^(\d+)\s*:\s*(\d+)$/);

if (!ratioMatch) {
  console.error(
    `❌ Invalid ratio "${ratioStr}". Use something like "21:9" or "4:5".`
  );
  process.exit(1);
}

const ratioW = Number(ratioMatch[1]);
const ratioH = Number(ratioMatch[2]);
const TARGET_RATIO = ratioW / ratioH;

// Folder containing your images (same as before)
const GALLERY_DIR = path.join(__dirname, "..", "public", "images", "gallery-3");

// Target width; height is derived from ratio
const TARGET_WIDTH = parseInt(process.env.TARGET_WIDTH || "1920", 10);
const TARGET_HEIGHT = Math.round(TARGET_WIDTH * (ratioH / ratioW));

// Background for padding (dark)
const BG = { r: 0, g: 0, b: 0, alpha: 1 };

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
    console.log(
      `   Original: ${width} x ${height} (format: ${format}, ratio: ${(
        width / height
      ).toFixed(3)})`
    );
    console.log(
      `   Target canvas: ${TARGET_WIDTH} x ${TARGET_HEIGHT} (ratio: ${ratioW}:${ratioH})`
    );

    const tmpPath = fullPath + ".tmp";

    // 👇 NO CROPPING — just contain inside the target canvas
    await image
      .resize(TARGET_WIDTH, TARGET_HEIGHT, {
        fit: "contain", // keep entire image visible
        background: BG, // letterbox/pillarbox padding
      })
      .toFile(tmpPath);

    await fs.rename(tmpPath, fullPath);

    console.log(
      `✅ Saved (no-crop contain): ${fullPath} → ${TARGET_WIDTH} x ${TARGET_HEIGHT}`
    );
  } catch (err) {
    console.error(`❌ Error processing ${fullPath}:`, err);

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
    console.log(
      `   Target ratio: ${ratioW}:${ratioH}, canvas: ${TARGET_WIDTH} x ${TARGET_HEIGHT}`
    );

    for (const file of imageFiles) {
      const fullPath = path.join(GALLERY_DIR, file);
      await processOne(fullPath);
    }

    console.log("\n🎉 Done! All matching images processed (no crop).");
  } catch (err) {
    console.error("❌ Batch error:", err);
    process.exit(1);
  }
})();

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//
// // scripts/batch-crop-to-ratio.cjs
// // Usage:
// //   node scripts/batch-crop-to-ratio.cjs 21:9
// //   node scripts/batch-crop-to-ratio.cjs 4:5
// //
// // Processes all pic-XX.(jpg|jpeg|png) inside public/images/gallery-3,
// // crops them to the given ratio, resizes to TARGET_WIDTH, and overwrites.
// //
// // TARGET_WIDTH can be set via env; height is computed from the ratio.

// /* eslint-disable @typescript-eslint/no-require-imports */

// const sharp = require("sharp");
// const path = require("path");
// const fs = require("fs").promises;
// const fsSync = require("fs");

// const [, , ratioArg] = process.argv;

// const ratioStr = ratioArg || process.env.TARGET_RATIO || "16:9";
// const ratioMatch = ratioStr.match(/^(\d+)\s*:\s*(\d+)$/);

// if (!ratioMatch) {
//   console.error(
//     `❌ Invalid ratio "${ratioStr}". Use something like "21:9" or "4:5".`
//   );
//   process.exit(1);
// }

// const ratioW = Number(ratioMatch[1]);
// const ratioH = Number(ratioMatch[2]);
// const TARGET_RATIO = ratioW / ratioH;

// // Folder containing your images
// const GALLERY_DIR = path.join(__dirname, "..", "public", "images", "gallery-3");

// // Target width; height is derived from ratio
// const TARGET_WIDTH = parseInt(process.env.TARGET_WIDTH || "1920", 10);
// const TARGET_HEIGHT = Math.round(TARGET_WIDTH * (ratioH / ratioW));

// async function processOne(fullPath) {
//   try {
//     const image = sharp(fullPath);
//     const metadata = await image.metadata();
//     const { width, height, format } = metadata;

//     if (!width || !height) {
//       console.warn(`⚠️  Skipping (no dimensions): ${fullPath}`);
//       return;
//     }

//     console.log(`\n📷 Processing: ${fullPath}`);
//     console.log(
//       `   Original size: ${width} x ${height} (format: ${format}, ratio: ${width / height}`
//     );
//     console.log(
//       `   Target ratio: ${ratioW}:${ratioH}, output: ${TARGET_WIDTH} x ${TARGET_HEIGHT}`
//     );

//     const originalRatio = width / height;

//     let cropWidth = width;
//     let cropHeight = height;
//     let left = 0;
//     let top = 0;

//     if (originalRatio > TARGET_RATIO) {
//       // Too wide → crop left & right
//       cropHeight = height;
//       cropWidth = Math.round(height * TARGET_RATIO);
//       left = Math.round((width - cropWidth) / 2);
//     } else if (originalRatio < TARGET_RATIO) {
//       // Too tall → crop top & bottom
//       cropWidth = width;
//       cropHeight = Math.round(width / TARGET_RATIO);
//       top = Math.round((height - cropHeight) / 2);
//     }

//     console.log(`   Cropping to: ${cropWidth} x ${cropHeight}`);

//     const tmpPath = fullPath + ".tmp";

//     await image
//       .extract({ left, top, width: cropWidth, height: cropHeight })
//       .resize(TARGET_WIDTH, TARGET_HEIGHT)
//       .toFile(tmpPath);

//     await fs.rename(tmpPath, fullPath);

//     console.log(
//       `✅ Saved ${ratioW}:${ratioH} image (overwritten): ${fullPath} → ${TARGET_WIDTH} x ${TARGET_HEIGHT}`
//     );
//   } catch (err) {
//     console.error(`❌ Error processing ${fullPath}:`, err);

//     const tmpPath = fullPath + ".tmp";
//     if (fsSync.existsSync(tmpPath)) {
//       try {
//         await fs.unlink(tmpPath);
//       } catch {
//         // ignore
//       }
//     }
//   }
// }

// (async () => {
//   try {
//     if (!fsSync.existsSync(GALLERY_DIR)) {
//       console.error(`❌ Gallery folder does not exist: ${GALLERY_DIR}`);
//       process.exit(1);
//     }

//     const files = await fs.readdir(GALLERY_DIR);

//     const imageFiles = files.filter((file) =>
//       /^pic-\d+\.(jpe?g|png)$/i.test(file)
//     );

//     if (!imageFiles.length) {
//       console.warn(
//         `⚠️  No matching files found in ${GALLERY_DIR} (expected pic-XX.(jpg|jpeg|png))`
//       );
//       process.exit(0);
//     }

//     console.log(
//       `🔎 Found ${imageFiles.length} image(s) to process in ${GALLERY_DIR}`
//     );
//     console.log(
//       `   Target ratio: ${ratioW}:${ratioH}, output: ${TARGET_WIDTH} x ${TARGET_HEIGHT}`
//     );

//     for (const file of imageFiles) {
//       const fullPath = path.join(GALLERY_DIR, file);
//       await processOne(fullPath);
//     }

//     console.log("\n🎉 Done! All matching images processed.");
//   } catch (err) {
//     console.error("❌ Batch error:", err);
//     process.exit(1);
//   }
// })();
