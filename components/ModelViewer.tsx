"use client";

import Script from "next/script";
import React from "react";

type ModelViewerProps = {
  src: string;
  poster?: string;
};

export default function ModelViewer({ src, poster }: ModelViewerProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 shadow-sm sm:rounded-3xl">
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
              height: "clamp(320px, 62vh, 620px)",
              backgroundColor: "#f5f5f5"
            }
          },
          "Your browser does not support 3D model viewing."
        )}

        <div className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-2 text-[11px] font-semibold text-neutral-700 shadow-sm sm:bottom-4 sm:left-4 sm:px-4 sm:text-xs">
          Drag to rotate • Pinch to zoom
        </div>
      </div>
    </div>
  );
}
