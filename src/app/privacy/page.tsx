import type { Metadata } from "next";
import { PrivacyPage } from "@/components/pages/legal-pages";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for MK Designs studio.",
};

export default function Privacy() {
  return <PrivacyPage />;
}
