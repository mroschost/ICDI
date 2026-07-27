import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ICDI | Instituto de Capacitação, Desenvolvimento e Inovação",
  description:
    "Projetos de cultura, educação, inovação e transformação social no Distrito Federal.",
  other: {
    "codex-preview": "development",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
