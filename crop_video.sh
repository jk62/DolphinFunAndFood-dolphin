#!/bin/bash

# Check if an input file is provided
if [ -z "$1" ]; then
  echo "Usage: ./crop_video.sh <input_video>"
  exit 1
fi

INPUT_FILE="$1"
DIRNAME=$(dirname "$INPUT_FILE")
FILENAME=$(basename -- "$INPUT_FILE")
FILENAME_NO_EXT="${FILENAME%.*}"
EXTENSION="${FILENAME##*.}"
OUTPUT_FILE="${DIRNAME}/${FILENAME_NO_EXT}_fixed.${EXTENSION}"

echo "Analyzing $INPUT_FILE for black bars..."

# 1. Run cropdetect on the first 10 seconds to find the crop area
# We use a 2-pass approach: get crop parameters, then apply them.
CROP_PARAMS=$(ffmpeg -i "$INPUT_FILE" -t 2 -vf "cropdetect=24:16:0" -f null - 2>&1 | awk '/crop=/ { print $NF }' | tail -1)

if [ -z "$CROP_PARAMS" ]; then
  echo "Could not detect black bars. Is the video fully black or white?"
  exit 1
fi

echo "Detected Content Area: $CROP_PARAMS"

# 2. Apply the crop
ffmpeg -i "$INPUT_FILE" \
  -vf "$CROP_PARAMS" \
  -c:a copy \
  "$OUTPUT_FILE" -y

echo "------------------------------------------------"
echo "Success! Created: $OUTPUT_FILE"
echo "The black bars should be gone now."
echo "------------------------------------------------"
