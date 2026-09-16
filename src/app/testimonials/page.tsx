import type { Metadata } from "next";
import { TestimonialsPage } from "@/components/pages/testimonials-page";

export const metadata: Metadata = {
  title: "Client Stories",
  description:
    "Read what our clients say about living and working in spaces designed by MK Designs.",
  openGraph: { title: "Client Stories — MK Designs" },
};

export default function Testimonials() {
  return <TestimonialsPage />;
}
