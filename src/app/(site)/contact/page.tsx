import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/contact-page";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with MK Designs to start your project. Book a consultation or send us an inquiry.",
  openGraph: { title: "Contact — MK Designs" },
};

export default function Contact() {
  return <ContactPage />;
}
