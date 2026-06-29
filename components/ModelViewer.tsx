"use client";

import Script from "next/script";
import React from "react";

type ModelViewerProps = {
  src: string;
  poster?: string;
};

export default function ModelViewer({ src, poster }: ModelViewerProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100 shadow-sm">
      <Script
        type="module"
        src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
        strategy="afterInteractive"
      />

      <div className="relative">
        {React.createElement(
          "model-viewer",
          {
            src,
            poster,
            "camera-controls": true,
            "auto-rotate": true,
            ar: true,
            loading: "lazy",
            reveal: "auto",
            "shadow-intensity": "1",
            "environment-image": "neutral",
            style: {
              width: "100%",
              height: "min(70vh, 620px)",
              minHeight: "380px",
              backgroundColor: "#f5f5f5"
            }
          },
          "Your browser does not support 3D model viewing."
        )}

        <div className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-neutral-700 shadow-sm">
          Drag to rotate • Pinch to zoom
        </div>
      </div>
    </div>
  );
}
