import type { Metadata } from "next";
import { PortfolioPage } from "@/components/pages/portfolio-pages";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "A curated collection of residential, villa, apartment, and commercial interiors by MK Designs.",
  openGraph: { title: "Portfolio — MK Designs" },
};

export default function Portfolio() {
  return <PortfolioPage />;
}
