import { ImageResponse } from "next/og";

// Imagem de prévia usada quando o link é compartilhado (LinkedIn, WhatsApp)
export const alt = "Central de Chamados: help desk em React, Next.js e TypeScript";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
          background: "#f4f5f7",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: 44,
              background: "#10b981",
              color: "white",
              fontSize: 52,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            C
          </div>
          <div style={{ fontSize: 72, fontWeight: 700, color: "#12372a" }}>Central de Chamados</div>
        </div>
        <div style={{ marginTop: 40, fontSize: 36, color: "#334155" }}>
          Help desk com painel de SLA, chamados e formulário
        </div>
        <div style={{ marginTop: 16, fontSize: 30, color: "#10b981" }}>
          React · Next.js · TypeScript · Tailwind CSS · responsivo
        </div>
      </div>
    ),
    size,
  );
}
