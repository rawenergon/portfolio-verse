"use client";

import React, { useEffect, useState } from "react";

export function NoiseOverlay() {
  const [bgData, setBgData] = useState<string>("");

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const SIZE = 256;
      canvas.width = canvas.height = SIZE;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const img = ctx.createImageData(SIZE, SIZE);
      const data = img.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);
      setBgData(canvas.toDataURL());
    } catch {
      // Graceful fallback
    }
  }, []);

  if (!bgData) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] select-none opacity-[0.035] dark:opacity-[0.05] mix-blend-overlay"
      style={{
        backgroundImage: `url(${bgData})`,
        backgroundRepeat: "repeat",
        backgroundSize: "256px 256px",
      }}
    />
  );
}
