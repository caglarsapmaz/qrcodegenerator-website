import { ImageResponse } from "next/og";

export const alt = "Zyqra — Ücretsiz QR Kod Oluşturucu";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// ── QR pattern (21×21, version-1 style) ────────────────────────────────
const N = 21;
const CELL = 18;
const GAP = 2;

function finderOf(r: number, c: number): "tl" | "tr" | "bl" | null {
  if (r < 7 && c < 7) return "tl";
  if (r < 7 && c >= 14) return "tr";
  if (r >= 14 && c < 7) return "bl";
  return null;
}

function finderDark(r: number, c: number): boolean {
  let lr = r;
  let lc = c;
  const f = finderOf(r, c);
  if (f === "tr") lc = c - 14;
  if (f === "bl") lr = r - 14;
  const ring = lr === 0 || lr === 6 || lc === 0 || lc === 6;
  const core = lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4;
  return ring || core;
}

function isDark(r: number, c: number): boolean {
  if (finderOf(r, c)) return finderDark(r, c);
  // Deterministic pseudo-random data modules
  return ((r * 31 + c * 17) % 29) % 2 === 0;
}

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#080808",
        }}
      >
        {/* Ambient diagonal tint */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(120deg, rgba(124,58,237,0.22) 0%, rgba(124,58,237,0.04) 35%, rgba(37,99,235,0.04) 65%, rgba(37,99,235,0.22) 100%)",
          }}
        />

        {/* Brand column */}
        <div
          style={{
            position: "relative",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: 88,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            <div
              style={{
                width: 68,
                height: 68,
                borderRadius: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #7c3aed, #2563eb)",
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
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
                        width: 11,
                        height: 11,
                        margin: 1.5,
                        background: cell ? "#ffffff" : "transparent",
                        borderRadius: 2,
                      }}
                    />
                  ))}
              </div>
            </div>
            <div
              style={{
                color: "#ffffff",
                fontSize: 58,
                fontWeight: 700,
                letterSpacing: -1,
              }}
            >
              Zyqra
            </div>
          </div>

          <div
            style={{
              color: "#a1a1aa",
              fontSize: 34,
              fontWeight: 600,
              letterSpacing: 1,
              marginTop: 26,
            }}
          >
            Create. Connect. Scan.
          </div>
          <div style={{ color: "#71717a", fontSize: 24, marginTop: 12 }}>
            Ücretsiz · Reklamsız · 100% tarayıcınızda
          </div>
        </div>

        {/* QR graphic */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingRight: 88,
          }}
        >
          <div
            style={{
              width: 466,
              height: 466,
              padding: 24,
              display: "flex",
              flexWrap: "wrap",
              alignContent: "flex-start",
              background: "#ffffff",
              borderRadius: 28,
            }}
          >
            {Array.from({ length: N * N }, (_, i) => {
              const r = Math.floor(i / N);
              const c = i % N;
              const finder = finderOf(r, c) !== null;
              return (
                <div
                  key={i}
                  style={{
                    width: CELL,
                    height: CELL,
                    margin: GAP / 2,
                    borderRadius: finder ? 2 : 1,
                    background: isDark(r, c)
                      ? finder
                        ? "linear-gradient(135deg, #7c3aed, #2563eb)"
                        : "#101014"
                      : "transparent",
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
