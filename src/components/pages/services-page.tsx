"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FinalCta, PageIntro, SectionHeading } from "@/components/editorial";
import { serviceImages } from "@/lib/content";

const serviceDetails = [
  {
    name: "Residential Interior Design",
    description: "Homes are the most personal spaces we inhabit. We design interiors that reflect the way you live — your routines, your tastes, your sense of beauty.",
    features: ["Complete spatial planning", "Material and finish selection", "Custom furniture and joinery", "Lighting design", "Art and styling direction"],
    deliverables: ["Concept boards", "Detailed drawings", "3D visualizations", "Specification documents", "Site supervision"],
  },
  {
    name: "Luxury Villa Design",
    description: "Villas demand architecture and interior design to work as one. We approach each villa as a complete composition of space, material, light and landscape.",
    features: ["Architecture and interior integration", "Landscape coordination", "Smart home planning", "Premium material sourcing", "Art and bespoke furniture"],
    deliverables: ["Design concept", "Full working drawings", "3D walkthroughs", "Procurement management", "Project execution"],
  },
  {
    name: "Commercial Interiors",
    description: "Commercial spaces define how people experience your brand. We design offices, retail, showrooms, clinics and corporate environments that are distinctive, functional and enduring.",
    features: ["Brand-aligned spatial identity", "Workflow and layout optimisation", "Acoustic and lighting design", "Durable, specification-grade materials", "Phased delivery options"],
    deliverables: ["Space planning", "Concept design", "Technical drawings", "3D visuals", "Site management"],
  },
  {
    name: "Apartment Interiors",
    description: "City apartments demand intelligent planning and considered detail. We maximise every square metre without sacrificing the quality that makes a home feel generous.",
    features: ["Space-maximising layouts", "Integrated storage design", "Custom modular furniture", "Urban material palette", "Compact kitchen and bathroom design"],
    deliverables: ["Layout drawings", "Material boards", "3D renderings", "Vendor coordination", "Final handover"],
  },
  {
    name: "Office Interiors",
    description: "Workplaces shape culture and performance. We design offices that express a company's character and make everyday work feel effortless and inspiring.",
    features: ["Collaboration zone planning", "Focus and privacy spaces", "Brand expression in materials", "Ergonomic furniture selection", "Biophilic elements"],
    deliverables: ["Workplace strategy", "Design development", "Specification", "FF&E procurement", "Installation oversight"],
  },
  {
    name: "Hospitality Design",
    description: "Hotels, restaurants, cafés, resorts and lounges each create an experience. We design hospitality spaces that guests remember and return to.",
    features: ["Guest journey mapping", "Atmospheric lighting", "Custom seating and fixtures", "Brand-led material palette", "Operational flow planning"],
    deliverables: ["Concept and mood direction", "Detailed design", "Bespoke furniture drawings", "Coordination with F&B and hospitality consultants", "Project management"],
  },
  {
    name: "Renovation & Remodeling",
    description: "Thoughtful renovation honours what exists while making space for new life. We carefully assess, preserve and transform existing buildings.",
    features: ["Structural coordination", "Selective demolition planning", "Conservation-sensitive detailing", "Updated services integration", "New layouts within existing envelopes"],
    deliverables: ["Existing condition survey", "Renovation design", "Technical drawings", "Contractor coordination", "Final snagging"],
  },
  {
    name: "Turnkey Interior Solutions",
    description: "From the first sketch to the final object in place, we manage the complete process. You arrive at a finished home — nothing left to do.",
    features: ["Design to delivery management", "Contractor and vendor management", "Material and furniture procurement", "Quality control at every stage", "Single point of responsibility"],
    deliverables: ["Design documentation", "Procurement schedule", "Timeline and budget tracking", "Site supervision", "Final handover package"],
  },
  {
    name: "3D Visualization & Design",
    description: "Photorealistic 3D views give you the confidence to make decisions before a single rupee is spent on execution. Every material, light source and detail rendered faithfully.",
    features: ["Photorealistic interior renders", "Walkthrough animations", "Material and finish studies", "Lighting scenario testing", "Virtual tour delivery"],
    deliverables: ["High-resolution still renders", "360° panoramas", "Animated walkthrough", "Material specification sheets", "Presentation-ready files"],
  },
];

export function ServicesPage() {
  return (
    <>
      <PageIntro
        eyebrow="What we offer"
        title="A complete design practice."
        copy="From intimate residences to large hospitality projects, we bring the same clarity, craft and commitment to every brief."
      />

      {serviceDetails.map((service, i) => (
        <section
          key={service.name}
          className={`px-5 py-20 lg:px-10 lg:py-28 ${i % 2 !== 0 ? "bg-ivory-deep" : ""}`}
        >
          <div className="mx-auto grid max-w-[1500px] items-center gap-14 lg:grid-cols-2">
            <div className={`aspect-[4/3] overflow-hidden ${i % 2 !== 0 ? "lg:order-last" : ""}`}>
              <img
                src={serviceImages[i]}
                alt={service.name}
                loading="lazy"
                className="h-full w-full object-cover image-zoom"
              />
            </div>
            <div className={i % 2 !== 0 ? "lg:pr-12" : "lg:pl-12"}>
              <p className="mb-4 text-xs uppercase tracking-[0.18em] text-brass">0{i + 1}</p>
              <h2 className="text-balance text-5xl leading-[.95] lg:text-6xl">{service.name}</h2>
              <p className="mt-6 text-sm leading-8 text-muted-foreground">{service.description}</p>
              <div className="mt-10 grid gap-8 md:grid-cols-2">
                <div>
                  <p className="mb-4 text-xs uppercase tracking-[0.16em]">Key features</p>
                  <ul className="space-y-2">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-3.5 w-3.5 shrink-0 text-brass" strokeWidth={1.5} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-4 text-xs uppercase tracking-[0.16em]">Deliverables</p>
                  <ul className="space-y-2">
                    {service.deliverables.map((d) => (
                      <li key={d} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-3.5 w-3.5 shrink-0 text-brass" strokeWidth={1.5} />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <Button asChild variant="editorial" size="lg" className="mt-10">
                <Link href="/contact">
                  Discuss Your Project <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      ))}

      {/* Budget guide */}
      <section className="bg-primary px-5 py-24 text-primary-foreground lg:px-10 lg:py-36">
        <div className="mx-auto max-w-[1500px]">
          <SectionHeading
            eyebrow="Investment guide"
            title="Understanding design investment."
            light
            copy="Every project is unique. The following ranges are indicative guides based on our experience across project types. We provide a detailed proposal after our initial consultation."
          />
          <div className="mt-16 grid gap-0 border border-primary-foreground/20 md:grid-cols-3">
            {[
              ["Apartments & Compact Homes", "₹15L – ₹40L", "2,000–4,000 sq ft, full interior design and execution"],
              ["Large Residences & Villas", "₹40L – ₹1.5Cr+", "4,000–10,000 sq ft, architecture and interior as one"],
              ["Commercial & Hospitality", "Custom quotation", "Tailored to scope, size and brand requirements"],
            ].map(([type, range, note]) => (
              <div
                key={type}
                className="border-b border-primary-foreground/20 p-8 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
              >
                <p className="text-xs uppercase tracking-[0.14em] text-primary-foreground/55">{type}</p>
                <p className="mt-4 font-display text-4xl">{range}</p>
                <p className="mt-3 text-xs leading-6 text-primary-foreground/60">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
