import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  metadataBase: new URL("https://mkdesigns.bitcoder.in"),
  title: {
    default: "MK Designs — Interior Design Studio",
    template: "%s — MK Designs",
  },
  description:
    "MK Designs creates thoughtful, timeless interiors for residences, villas, apartments, offices and hospitality spaces across India.",
  icons: {
    icon: "/assets/mklogo.png",
    shortcut: "/assets/mklogo.png",
    apple: "/assets/mklogo.png",
  },
  authors: [{ name: "MK Designs" }],
  openGraph: {
    type: "website",
    url: "https://mkdesigns.bitcoder.in",
    siteName: "MK Designs",
    title: "MK Designs — Interior Design Studio",
    description:
      "Thoughtful, timeless interiors for residences, villas, offices & hospitality spaces across India. Crafted with purpose. Designed for life.",
    images: [
      {
        url: "https://mkdesigns.bitcoder.in/assets/mklogo.png",
        width: 1200,
        height: 630,
        alt: "MK Designs — Interior Design Studio",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "MK Designs — Interior Design Studio",
    description:
      "Thoughtful, timeless interiors for residences, villas, offices & hospitality spaces across India.",
    images: ["https://mkdesigns.bitcoder.in/assets/mklogo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Manrope:wght@400;500;600&display=swap"
        />
      </head>
      <body>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
