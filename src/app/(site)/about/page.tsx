import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/about-page";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about MK Designs, our design philosophy, studio approach and the team behind every space we create.",
  openGraph: { title: "About — MK Designs" },
};

export default function About() {
  return <AboutPage />;
}
