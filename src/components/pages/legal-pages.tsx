"use client";

import Link from "next/link";
import { brand } from "@/lib/content";

function LegalLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="px-5 pb-24 pt-40 lg:px-10 lg:pb-36 lg:pt-48">
      <div className="mx-auto max-w-3xl">
        <p className="mb-5 text-xs uppercase tracking-[0.2em] text-brass">Legal</p>
        <h1 className="font-display text-5xl leading-tight sm:text-6xl">{title}</h1>
        <p className="mt-4 text-xs text-muted-foreground">
          Last updated: September 2026. Placeholder language — replace with your solicitor's advice before launch.
        </p>
        <div className="prose prose-sm mt-14 max-w-none text-sm leading-8 text-foreground [&_h2]:font-display [&_h2]:text-3xl [&_h2]:font-normal [&_h2]:mt-12 [&_h2]:mb-4 [&_p]:text-muted-foreground [&_p]:mb-5 [&_ul]:text-muted-foreground [&_ul]:pl-5 [&_li]:mb-1">
          {children}
        </div>
        <div className="mt-16 border-t border-border pt-8 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">← Back to home</Link>
        </div>
      </div>
    </div>
  );
}

export function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy">
      <p>
        MK Designs ("we", "our", "us") is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard information when you visit our website or contact us regarding our services.
      </p>

      <h2>Information We Collect</h2>
      <p>
        We may collect personal information you voluntarily provide through our contact form, including your name, email address, phone number, and project details. We also collect standard server log data and anonymised analytics to improve our website.
      </p>

      <h2>How We Use Your Information</h2>
      <p>Information you provide is used to:</p>
      <ul>
        <li>Respond to your project inquiry or consultation request</li>
        <li>Communicate with you about your project</li>
        <li>Improve our services and website experience</li>
      </ul>
      <p>We do not sell, trade or rent your personal information to third parties.</p>

      <h2>Data Retention</h2>
      <p>
        We retain inquiry and project data for as long as necessary to fulfil the purposes outlined in this policy or as required by applicable law. You may request deletion of your data at any time.
      </p>

      <h2>Cookies</h2>
      <p>
        Our website may use essential cookies to improve your browsing experience. We do not currently use third-party advertising or tracking cookies. You may configure your browser to refuse cookies, though some features may not function correctly as a result.
      </p>

      <h2>Third-Party Services</h2>
      <p>
        Our website may contain links to third-party websites (such as Instagram or WhatsApp). We are not responsible for the privacy practices of those sites and encourage you to review their policies separately.
      </p>

      <h2>Security</h2>
      <p>
        We take reasonable precautions to protect your information from unauthorised access, disclosure, or misuse. However, no transmission over the internet can be guaranteed to be fully secure.
      </p>

      <h2>Your Rights</h2>
      <p>
        You have the right to request access to, correction of, or deletion of your personal information held by us. To exercise these rights, please contact us at{" "}
        <a href={`mailto:${brand.email}`} className="text-brass hover:underline">{brand.email}</a>.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this policy from time to time. Updates will be posted on this page with a revised date. Continued use of our website after changes constitutes acceptance of the updated policy.
      </p>

      <h2>Contact Us</h2>
      <p>
        For any privacy-related questions, please write to us at{" "}
        <a href={`mailto:${brand.email}`} className="text-brass hover:underline">{brand.email}</a> or call {brand.phone}.
      </p>
    </LegalLayout>
  );
}

export function TermsPage() {
  return (
    <LegalLayout title="Terms & Conditions">
      <p>
        By accessing or using the MK Designs website, you agree to be bound by these Terms and Conditions. Please read them carefully. If you do not agree, please discontinue use of this site.
      </p>

      <h2>Use of This Website</h2>
      <p>
        This website is provided for general informational purposes about MK Designs' services. You agree to use this site only for lawful purposes and in a manner that does not infringe the rights of others.
      </p>

      <h2>Intellectual Property</h2>
      <p>
        All content on this website — including text, images, design, logos, and project photography — is the property of MK Designs or used with permission and is protected by applicable copyright laws. You may not reproduce, distribute, or exploit any content without our prior written consent.
      </p>

      <h2>Project Imagery</h2>
      <p>
        Images on this website depict completed or in-progress projects and are protected by copyright. All project photography is reproduced with client consent. Individual project details are presented in good faith based on our records.
      </p>

      <h2>No Professional Advice</h2>
      <p>
        Information on this website is provided for general awareness only and does not constitute architectural, structural, legal, or financial advice. Engage qualified professionals for project-specific guidance.
      </p>

      <h2>Inquiries and Consultations</h2>
      <p>
        Submitting an inquiry through our contact form does not create a contractual relationship between you and MK Designs. A formal engagement is only established upon execution of a signed agreement.
      </p>

      <h2>Disclaimers</h2>
      <p>
        This website is provided "as is" without warranties of any kind. We make no representations as to the accuracy or completeness of information on this site. Pricing indications are estimates only and subject to change based on project scope.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, MK Designs will not be liable for any indirect, incidental, or consequential damages arising from your use of this website or reliance on any information contained herein.
      </p>

      <h2>Links to Third-Party Sites</h2>
      <p>
        This website may contain links to external websites. These are provided for convenience only. We have no control over those sites and accept no responsibility for their content or practices.
      </p>

      <h2>Governing Law</h2>
      <p>
        These terms are governed by the laws of India. Any disputes arising from the use of this website shall be subject to the jurisdiction of the courts of Gujarat.
      </p>

      <h2>Changes to These Terms</h2>
      <p>
        We may revise these terms at any time without notice. Continued use of the website constitutes acceptance of any revised terms.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Contact us at{" "}
        <a href={`mailto:${brand.email}`} className="text-brass hover:underline">{brand.email}</a>.
      </p>
    </LegalLayout>
  );
}
