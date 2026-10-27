import { ImageResponse } from "next/og";

export const alt = "Titan Autoworx — Expert automotive care for every road";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "radial-gradient(circle at 80% 70%, rgba(255,90,31,0.35), #0a0a0b 60%)",
          color: "#f5f5f4",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 8, color: "#ff5a1f", fontWeight: 700 }}>TITAN AUTOWORX · MALTA</div>
        <div style={{ fontSize: 92, fontWeight: 900, fontStyle: "italic", marginTop: 24, lineHeight: 1 }}>EXPERT AUTOMOTIVE</div>
        <div style={{ fontSize: 92, fontWeight: 900, fontStyle: "italic", color: "#ff5a1f", lineHeight: 1 }}>CARE FOR EVERY ROAD.</div>
        <div style={{ fontSize: 30, color: "#a1a1aa", marginTop: 32 }}>Repairs · Bodywork · Paint · Restorations · Builds · 24/7 Towing</div>
      </div>
    ),
    size,
  );
}
