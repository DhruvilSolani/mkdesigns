import type { Metadata } from "next";
import { ProcessPage } from "@/components/pages/process-page";

export const metadata: Metadata = {
  title: "Our Process",
  description:
    "From initial consultation to final handover — discover MK Designs' eight-stage design and execution process.",
  openGraph: { title: "Our Process — MK Designs" },
};

export default function Process() {
  return <ProcessPage />;
}
