import type { Metadata, Viewport } from "next";
import { Literata, Onest } from "next/font/google";
import "./globals.css";

const onest = Onest({
  subsets: ["latin", "cyrillic"],
  variable: "--font-ui",
  display: "swap",
});

const literata = Literata({
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ВЖИВУЮ",
  description:
    "Russian as people actually say it — speak with Ara or Lev, drill Moscow lines, walk the world with a live tutor.",
  icons: { icon: "/favicon.svg" },
  appleWebApp: {
    title: "ВЖИВУЮ",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#eef2f6",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${onest.variable} ${literata.variable} antialiased`}>
        <div className="app-shell">{children}</div>
      </body>
    </html>
  );
}
