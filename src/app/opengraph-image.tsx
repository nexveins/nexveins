import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "Nexveins, product engineering for ambitious teams";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logo = await readFile(path.join(process.cwd(), "public", "nexveins-mark-512.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#f7faff",
        color: "#071226",
        display: "flex",
        height: "100%",
        justifyContent: "space-between",
        padding: "72px 84px",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 750 }}>
        <div style={{ color: "#0058c9", fontSize: 24, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>Nexveins</div>
        <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: "-0.055em", lineHeight: 1.02, marginTop: 30 }}>Products with a reason to exist.</div>
        <div style={{ color: "#506079", fontSize: 26, lineHeight: 1.4, marginTop: 28 }}>Strategy, design, engineering, AI, and growth in one connected team.</div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        height={270}
        src={logoSrc}
        width={270}
      />
    </div>,
    size,
  );
}
