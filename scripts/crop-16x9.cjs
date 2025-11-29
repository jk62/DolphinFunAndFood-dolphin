// crop-16x9.cjs
// Usage:
//   node crop-16x9.cjs input.jpg output.jpg
/* eslint-disable @typescript-eslint/no-require-imports */

const sharp = require("sharp");
const path = require("path");
const fs = require("fs");



const [, , inputPath, outputPathArg] = process.argv;

if (!inputPath) {
  console.error(
    "❌ Please provide an input image path.\nExample: node crop-16x9.cjs input.jpg output.jpg"
  );
  process.exit(1);
}

if (!fs.existsSync(inputPath)) {
  console.error(`❌ File not found: ${inputPath}`);
  process.exit(1);
}

// If no output path provided, create one like "input-16x9.ext"
const outputPath =
  outputPathArg ||
  (() => {
    const dir = path.dirname(inputPath);
    const ext = path.extname(inputPath);
    const base = path.basename(inputPath, ext);
    return path.join(dir, `${base}-16x9${ext}`);
  })();

// Target 16:9 output resolution (default 1920x1080)
const TARGET_WIDTH = parseInt(process.env.TARGET_WIDTH || "1920", 10);
const TARGET_HEIGHT = parseInt(process.env.TARGET_HEIGHT || "1080", 10);
const TARGET_RATIO = TARGET_WIDTH / TARGET_HEIGHT;

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

    console.log(`   Cropping to: ${cropWidth} x ${cropHeight} (16:9)`);

    await image
      .extract({ left, top, width: cropWidth, height: cropHeight })
      .resize(TARGET_WIDTH, TARGET_HEIGHT)
      .toFile(outputPath);

    console.log(`✅ Saved 16:9 image: ${outputPath}`);
    console.log(`   Final size: ${TARGET_WIDTH} x ${TARGET_HEIGHT}`);
  } catch (err) {
    console.error("❌ Error processing image:", err);
    process.exit(1);
  }
})();
