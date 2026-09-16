import type { Metadata } from "next";
import { HomePage } from "@/components/pages/home-page";

export const metadata: Metadata = {
  title: "MK Designs — Interior Design & Architecture Studio",
  description:
    "MK Designs creates thoughtful, timeless interiors for residences, villas, apartments, offices and hospitality spaces across India.",
  openGraph: {
    title: "MK Designs — Interior Design & Architecture Studio",
    description: "Thoughtful interiors. Timeless design. Exceptional living.",
  },
};

export default function Home() {
  return <HomePage />;
}
