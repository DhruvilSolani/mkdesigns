import type { Metadata } from "next";
import { ServicesPage } from "@/components/pages/services-page";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Residential interiors, luxury villas, commercial spaces, office design, hospitality, renovation, turnkey solutions and 3D visualization.",
  openGraph: { title: "Services — MK Designs" },
};

export default function Services() {
  return <ServicesPage />;
}
