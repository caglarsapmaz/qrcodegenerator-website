import { ImageResponse } from "next/og";

export const alt = "Zyqra — QR kod oluşturucu";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const C = {
  bg: "#000000",
  panel: "#0a0a0a",
  line: "#1c1c1c",
  lineStrong: "#2e2e2e",
  fg: "#ededed",
  fgSecondary: "#a3a3a3",
  muted: "#6e6e6e",
  accent: "#3cffa4",
};

const LEFT = 500;
const BAR = 64;
const GRID = 24;

// ── QR pattern (21×21, version-1 layout) ───────────────────────────────
const N = 21;
const CELL = 14;

function finderOf(r: number, c: number): "tl" | "tr" | "bl" | null {
  if (r < 7 && c < 7) return "tl";
  if (r < 7 && c >= 14) return "tr";
  if (r >= 14 && c < 7) return "bl";
  return null;
}

function isDark(r: number, c: number): boolean {
  const f = finderOf(r, c);
  if (f) {
    const lr = f === "bl" ? r - 14 : r;
    const lc = f === "tr" ? c - 14 : c;
    const ring = lr === 0 || lr === 6 || lc === 0 || lc === 6;
    const core = lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4;
    return ring || core;
  }
  // Separators around the finders stay light.
  if ((r === 7 && (c < 8 || c > 12)) || (c === 7 && (r < 8 || r > 12))) return false;
  if (r === 13 && c < 8) return false;
  if (c === 13 && r < 8) return false;
  // Timing patterns.
  if (r === 6) return c % 2 === 0;
  if (c === 6) return r % 2 === 0;
  // Integer hash so the data area reads as noise, not stripes.
  let h = Math.imul(r * 73 + 11, 0x9e3779b1) ^ Math.imul(c * 151 + 7, 0x85ebca6b);
  h = Math.imul(h ^ (h >>> 15), 0x2c1b3c6d);
  return ((h ^ (h >>> 12)) & 1) === 1;
}

// Pulls a subset TTF from Google Fonts at build time. Falls back to the
// bundled default font if the network is unavailable.
async function loadFont(family: string, weight: number, text: string) {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(text)}`,
    ).then((res) => res.text());
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((res) => res.arrayBuffer());
  } catch {
    return null;
  }
}

const SANS_TEXT = "ZyqraQR kodlarınızı tarayıcıda oluşturun.Önizleme";
const MONO_TEXT =
  "QR / GENERATOR KOD OLUŞTURUCU · V1 01 02 03 HAZIR 600 PX FIG. URL ECC H 8 İÇERİK TÜRÜ PNG SVG WEBP YEREL İŞLEM SUNUCU YOK zyqra.vercel.app";

function Mono({ children, color = C.muted, size: fontSize = 15 }: { children: string; color?: string; size?: number }) {
  return (
    <div style={{ display: "flex", fontFamily: "Geist Mono", fontSize, letterSpacing: 2, color }}>
      {children}
    </div>
  );
}

export default async function OpengraphImage() {
  const [sans, mono] = await Promise.all([
    loadFont("Geist", 600, SANS_TEXT),
    loadFont("Geist+Mono", 500, MONO_TEXT),
  ]);

  const fonts = [
    sans && { name: "Geist", data: sans, weight: 600 as const, style: "normal" as const },
    mono && { name: "Geist Mono", data: mono, weight: 500 as const, style: "normal" as const },
  ].filter((font) => !!font);

  const qrSize = N * CELL;
  // 20px padding + 1px border on each side.
  const frame = qrSize + 42;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: C.bg,
          color: C.fg,
          fontFamily: "Geist",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            height: BAR,
            display: "flex",
            alignItems: "center",
            gap: 18,
            padding: "0 40px",
            borderBottom: `1px solid ${C.line}`,
          }}
        >
          <div style={{ width: 30, height: 30, display: "flex", background: C.fg, padding: 6, flexWrap: "wrap" }}>
            {[1, 0, 1, 0, 0, 0, 1, 0, 1].map((on, i) => (
              <div key={i} style={{ width: 6, height: 6, background: on ? C.bg : "transparent" }} />
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 24, fontWeight: 600, letterSpacing: -0.5 }}>Zyqra</div>
          <div style={{ width: 1, height: 20, background: C.lineStrong }} />
          <Mono>QR / GENERATOR</Mono>
          <div style={{ flex: 1 }} />
          <Mono>zyqra.vercel.app</Mono>
        </div>

        <div style={{ flex: 1, display: "flex" }}>
          {/* Left panel */}
          <div
            style={{
              width: LEFT,
              display: "flex",
              flexDirection: "column",
              borderRight: `1px solid ${C.line}`,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", padding: "44px 40px 0" }}>
              <Mono>QR KOD OLUŞTURUCU · V1</Mono>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 26,
                  fontSize: 54,
                  fontWeight: 600,
                  lineHeight: 1.1,
                  letterSpacing: -1.5,
                }}
              >
                <div style={{ display: "flex" }}>QR kodlarınızı</div>
                <div style={{ display: "flex", color: C.muted }}>tarayıcıda</div>
                <div style={{ display: "flex" }}>oluşturun.</div>
              </div>
            </div>
            <div style={{ flex: 1 }} />
            {[
              ["01", "8 İÇERİK TÜRÜ"],
              ["02", "PNG · SVG · WEBP"],
              ["03", "YEREL İŞLEM · SUNUCU YOK"],
            ].map(([index, label]) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  height: 52,
                  padding: "0 40px",
                  borderTop: `1px solid ${C.line}`,
                }}
              >
                <Mono>{index}</Mono>
                <Mono color={C.fgSecondary}>{label}</Mono>
              </div>
            ))}
          </div>

          {/* Right panel: blueprint preview */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <div
              style={{
                height: 52,
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "0 40px",
                background: C.panel,
                borderBottom: `1px solid ${C.line}`,
              }}
            >
              <Mono>03</Mono>
              <div style={{ display: "flex", fontSize: 18 }}>Önizleme</div>
              <div style={{ flex: 1 }} />
              <div style={{ width: 8, height: 8, background: C.accent, boxShadow: `0 0 12px ${C.accent}` }} />
              <Mono color={C.fg}>HAZIR</Mono>
            </div>

            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                backgroundImage: `linear-gradient(${C.line} 1px, transparent 1px), linear-gradient(90deg, ${C.line} 1px, transparent 1px)`,
                backgroundSize: `${GRID}px ${GRID}px`,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                {/* Horizontal dimension */}
                <div style={{ width: frame, display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <div style={{ width: 1, height: 10, background: C.muted }} />
                  <div style={{ flex: 1, height: 1, background: C.lineStrong }} />
                  <Mono size={13}>600 PX</Mono>
                  <div style={{ flex: 1, height: 1, background: C.lineStrong }} />
                  <div style={{ width: 1, height: 10, background: C.muted }} />
                </div>

                <div style={{ display: "flex", position: "relative" }}>
                  {[
                    { top: -12, left: -12, borderTop: 1, borderLeft: 1 },
                    { top: -12, right: -12, borderTop: 1, borderRight: 1 },
                    { bottom: -12, left: -12, borderBottom: 1, borderLeft: 1 },
                    { bottom: -12, right: -12, borderBottom: 1, borderRight: 1 },
                  ].map(({ borderTop, borderLeft, borderRight, borderBottom, ...pos }, i) => (
                    <div
                      key={i}
                      style={{
                        position: "absolute",
                        width: 16,
                        height: 16,
                        ...pos,
                        borderTop: borderTop ? `1px solid ${C.muted}` : "none",
                        borderLeft: borderLeft ? `1px solid ${C.muted}` : "none",
                        borderRight: borderRight ? `1px solid ${C.muted}` : "none",
                        borderBottom: borderBottom ? `1px solid ${C.muted}` : "none",
                      }}
                    />
                  ))}
                  <div
                    style={{
                      width: frame,
                      height: frame,
                      padding: 20,
                      display: "flex",
                      flexWrap: "wrap",
                      background: "#ffffff",
                      border: `1px solid ${C.lineStrong}`,
                    }}
                  >
                    {Array.from({ length: N * N }, (_, i) => (
                      <div
                        key={i}
                        style={{
                          width: CELL,
                          height: CELL,
                          background: isDark(Math.floor(i / N), i % N) ? "#000000" : "transparent",
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    width: frame,
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 22,
                  }}
                >
                  <Mono size={13}>FIG. 01</Mono>
                  <Mono size={13}>URL · ECC H</Mono>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined },
  );
}
