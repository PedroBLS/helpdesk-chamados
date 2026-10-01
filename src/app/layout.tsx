import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Shell } from "@/components/Shell";
import "./globals.css";

const poppins = Poppins({ variable: "--font-poppins", subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://helpdesk-chamados.vercel.app"),
  title: "Central de Chamados",
  description: "Help desk com chamados, SLA e indicadores, feito em React, Next.js e TypeScript a partir de um layout do Figma.",
  openGraph: {
    title: "Central de Chamados",
    description: "Help desk com painel de SLA, chamados e formulário, responsivo, em React, Next.js e TypeScript.",
    url: "/",
    type: "website",
  },
};

// Os dados simulados usam datas relativas a agora; renderizar a cada acesso mantém o SLA atualizado
export const dynamic = "force-dynamic";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full font-sans">
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
