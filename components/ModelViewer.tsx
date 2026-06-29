"use client";

import Script from "next/script";
import React from "react";

type ModelViewerProps = {
  src: string;
};

export default function ModelViewer({ src }: ModelViewerProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100 shadow-sm">
      <Script
        type="module"
        src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
        strategy="afterInteractive"
      />

      {React.createElement(
        "model-viewer",
        {
          src,
          "camera-controls": true,
          "auto-rotate": true,
          ar: true,
          "shadow-intensity": "1",
          style: {
            width: "100%",
            height: "600px",
            backgroundColor: "#f5f5f5"
          }
        },
        "Your browser does not support 3D model viewing."
      )}
    </div>
  );
}
