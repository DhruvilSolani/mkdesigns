import type { Metadata } from "next";
import { TermsPage } from "@/components/pages/legal-pages";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for MK Designs studio.",
};

export default function Terms() {
  return <TermsPage />;
}
