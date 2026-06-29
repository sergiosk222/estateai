#!/usr/bin/env bash

set -euo pipefail

JOB_ID="${1:-demo-capture}"

CAPTURE_DIR="captures/$JOB_ID"

mkdir -p "$CAPTURE_DIR/raw"
mkdir -p "$CAPTURE_DIR/frames"
mkdir -p "$CAPTURE_DIR/reconstruction"
mkdir -p "$CAPTURE_DIR/output"

cat > "$CAPTURE_DIR/job.json" <<JSON
{
  "jobId": "$JOB_ID",
  "status": "created",
  "inputType": null,
  "rawFiles": [],
  "framesDir": "$CAPTURE_DIR/frames",
  "reconstructionDir": "$CAPTURE_DIR/reconstruction",
  "outputDir": "$CAPTURE_DIR/output"
}
JSON

echo "Created capture folder:"
echo "$CAPTURE_DIR"
echo ""
echo "Put video/photos into:"
echo "$CAPTURE_DIR/raw"
