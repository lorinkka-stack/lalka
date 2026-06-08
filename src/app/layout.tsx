import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MODULMONT | Profesionálna montáž fotovoltických konštrukcií",
  description:
    "MODULMONT je špecializovaná montážna spoločnosť pre výstavbu nosných konštrukcií a osádzanie solárnych panelov. Skúsené tímy pre veľké FV projekty v Nemecku a celej Európe.",
  keywords: [
    "montáž solárnych panelov",
    "fotovoltické konštrukcie",
    "solárny park Nemecko",
    "utility scale PV",
    "Photovoltaik Montage",
    "solar mounting Germany",
    "MODULMONT",
  ],
  authors: [{ name: "MODULMONT" }],
  openGraph: {
    title: "MODULMONT | Profesionálna montáž fotovoltických konštrukcií",
    description:
      "Skúsené montážne tímy pre veľké fotovoltické projekty v Nemecku a celej Európe.",
    type: "website",
    locale: "sk_SK",
    siteName: "MODULMONT",
  },
  robots: { index: true, follow: true },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#0A1628",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sk" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
