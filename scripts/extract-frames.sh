#!/usr/bin/env bash

set -euo pipefail

VIDEO_PATH="${1:-}"
OUTPUT_DIR="${2:-output/frames}"
FPS="${3:-2}"

if [ -z "$VIDEO_PATH" ]; then
  echo "Usage:"
  echo "  bash scripts/extract-frames.sh path/to/video.mp4 output/frames 2"
  exit 1
fi

if [ ! -f "$VIDEO_PATH" ]; then
  echo "Video file not found: $VIDEO_PATH"
  exit 1
fi

mkdir -p "$OUTPUT_DIR"

echo "Extracting frames..."
echo "Video: $VIDEO_PATH"
echo "Output: $OUTPUT_DIR"
echo "FPS: $FPS"
echo ""

ffmpeg -i "$VIDEO_PATH" -vf "fps=$FPS,scale=1600:-1" -q:v 2 "$OUTPUT_DIR/frame_%05d.jpg"

echo ""
echo "Done."
echo "Frames saved to: $OUTPUT_DIR"
echo ""
echo "Frame count:"
find "$OUTPUT_DIR" -type f -name "*.jpg" | wc -l
