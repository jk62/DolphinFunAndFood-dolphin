// crop-to-ratio.cjs
// Usage:
//   node crop-to-ratio.cjs input.jpg output.jpg 21:9
//   node crop-to-ratio.cjs input.jpg output.jpg 4:5
//
// If TARGET_WIDTH is set, height is computed from the ratio.
// Otherwise defaults to 1920px wide.

/* eslint-disable @typescript-eslint/no-require-imports */

const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const [, , inputPath, outputPathArg, ratioArg] = process.argv;

if (!inputPath) {
  console.error(
    "❌ Please provide an input image path.\n" +
      "Example: node crop-to-ratio.cjs input.jpg output.jpg 21:9"
  );
  process.exit(1);
}

if (!fs.existsSync(inputPath)) {
  console.error(`❌ File not found: ${inputPath}`);
  process.exit(1);
}

// --- Parse ratio ---
const ratioStr = ratioArg || process.env.TARGET_RATIO || "16:9";
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

// Output path
const outputPath =
  outputPathArg ||
  (() => {
    const dir = path.dirname(inputPath);
    const ext = path.extname(inputPath);
    const base = path.basename(inputPath, ext);
    return path.join(dir, `${base}-${ratioW}x${ratioH}${ext}`);
  })();

// Target size
const TARGET_WIDTH = parseInt(process.env.TARGET_WIDTH || "1920", 10);
const TARGET_HEIGHT = Math.round(TARGET_WIDTH * (ratioH / ratioW)); // preserve ratio

(async () => {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    const { width, height } = metadata;

    if (!width || !height) {
      throw new Error("Could not read image dimensions.");
    }

    console.log(`📷 Input: ${inputPath}`);
    console.log(`   Original size: ${width} x ${height}`);
    console.log(`   Target ratio: ${ratioW}:${ratioH}`);
    console.log(`   Target output size: ${TARGET_WIDTH} x ${TARGET_HEIGHT}`);

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

    console.log(`   Cropping to: ${cropWidth} x ${cropHeight}`);

    await image
      .extract({ left, top, width: cropWidth, height: cropHeight })
      .resize(TARGET_WIDTH, TARGET_HEIGHT)
      .toFile(outputPath);

    console.log(`✅ Saved ${ratioW}:${ratioH} image: ${outputPath}`);
    console.log(`   Final size: ${TARGET_WIDTH} x ${TARGET_HEIGHT}`);
  } catch (err) {
    console.error("❌ Error processing image:", err);
    process.exit(1);
  }
})();
