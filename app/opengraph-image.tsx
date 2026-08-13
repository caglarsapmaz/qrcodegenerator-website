import { ImageResponse } from "next/og";

export const alt = "Zyqra — Ücretsiz QR Kod Oluşturucu";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#080808",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #7c3aed, #2563eb)",
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              {[
                [1, 1, 1, 1, 0, 1, 1, 1, 1],
                [1, 0, 1, 1, 0, 1, 0, 1, 0],
                [1, 1, 1, 0, 0, 1, 1, 0, 1],
              ]
                .flat()
                .map((cell, index) => (
                  <div
                    key={index}
                    style={{
                      width: 12,
                      height: 12,
                      margin: 1.5,
                      background: cell ? "#ffffff" : "transparent",
                      borderRadius: 2,
                    }}
                  />
                ))}
            </div>
          </div>
          <div style={{ color: "#ffffff", fontSize: 56, fontWeight: 700 }}>
            Zyqra
          </div>
        </div>
        <div style={{ color: "#a1a1aa", fontSize: 34, fontWeight: 600, letterSpacing: 1 }}>
          Create. Connect. Scan.
        </div>
        <div style={{ color: "#71717a", fontSize: 24, marginTop: 14 }}>
          Ücretsiz · Reklamsız · 100% tarayıcınızda
        </div>
      </div>
    ),
    { ...size },
  );
}
