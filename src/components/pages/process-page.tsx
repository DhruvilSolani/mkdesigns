"use client";

import { FinalCta, PageIntro, SectionHeading } from "@/components/editorial";
import { processSteps } from "@/lib/content";
import { projects } from "@/lib/content";

const stepDetails = [
  {
    title: "Consultation",
    duration: "Week 1",
    copy: "We begin with a free introductory conversation — in person at our studio, at your site, or via video call. We listen carefully to your brief, understand your lifestyle, and explain our process and approach.",
  },
  {
    title: "Site & Space Analysis",
    duration: "Weeks 1–2",
    copy: "We visit and document the site in detail: existing architecture, natural light conditions, structural constraints, services, and spatial potential. This informs everything that follows.",
  },
  {
    title: "Concept Development",
    duration: "Weeks 2–4",
    copy: "We develop a single, coherent spatial concept — an organizing idea that makes the design cohesive. This covers spatial layout, material language, colour, light, and furniture approach.",
  },
  {
    title: "Design Development",
    duration: "Weeks 4–8",
    copy: "We refine every layer of the design: precise floor plans, joinery drawings, material and finish schedules, furniture selection and custom pieces, lighting plans, and complete specifications.",
  },
  {
    title: "3D Visualization",
    duration: "Weeks 6–9",
    copy: "Photorealistic renders and, where requested, animated walkthroughs that let you experience every room before a single item is ordered. This stage resolves all design decisions with confidence.",
  },
  {
    title: "Execution",
    duration: "Weeks 10–28+",
    copy: "We coordinate and supervise every trade and supplier — civil, MEP, joinery, flooring, painting and beyond. Regular site visits, progress updates and quality control at each milestone.",
  },
  {
    title: "Final Styling",
    duration: "Final 1–2 weeks",
    copy: "Furniture, lighting, art, objects and textiles are placed and composed with care. This is where the design comes fully to life — every detail considered, every surface considered.",
  },
  {
    title: "Handover",
    duration: "Project end",
    copy: "A complete handover package including as-built drawings, product manuals, supplier contacts and care notes. You move into a finished, considered space — nothing left to do.",
  },
];

export function ProcessPage() {
  return (
    <>
      <PageIntro
        eyebrow="How we work"
        title="Eight stages from conversation to completion."
        copy="A clear, structured process that keeps every project on track — and keeps you informed and in control at every step."
      />

      {/* Timeline */}
      <section className="px-5 py-24 lg:px-10 lg:py-36">
        <div className="mx-auto max-w-[1300px]">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[11px] top-0 hidden h-full w-px origin-top bg-border md:block" aria-hidden="true" />
            <div className="space-y-0">
              {stepDetails.map((step, i) => (
                <div
                  key={step.title}
                  className="relative grid gap-6 border-b border-border py-12 md:grid-cols-[80px_1fr_2fr] md:gap-14"
                >
                  {/* Step indicator */}
                  <div className="flex items-start gap-4 md:flex-col md:gap-0">
                    <div className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brass text-[10px] font-semibold text-brass-foreground">
                      {i + 1}
                    </div>
                    <span className="text-xs uppercase tracking-[0.14em] text-muted-foreground md:mt-4">
                      {step.duration}
                    </span>
                  </div>
                  <h3 className="font-display text-4xl leading-tight md:text-5xl">{step.title}</h3>
                  <p className="text-sm leading-8 text-muted-foreground">{step.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reassurance section */}
      <section className="bg-ivory-deep px-5 py-24 lg:px-10 lg:py-36">
        <div className="mx-auto grid max-w-[1500px] gap-16 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="aspect-[4/5] overflow-hidden bg-muted">
            {projects.length > 2 && (
              <img
                src={projects[2].cover}
                alt="MK Designs project in progress"
                loading="lazy"
                className="h-full w-full object-cover image-zoom"
              />
            )}
          </div>
          <div className="lg:pl-10">
            <SectionHeading
              eyebrow="Working with us"
              title="Transparent, collaborative, and always in touch."
              copy="We believe the design process should feel as good as the finished space. That means clear communication, honest timelines, and a genuine partnership from first call to final handover."
            />
            <div className="mt-14 grid grid-cols-1 gap-8 border-t border-border pt-10 sm:grid-cols-2">
              {[
                ["Clear Communication", "Regular updates, accessible team, and no surprises."],
                ["Honest Timelines", "We set realistic schedules and manage them carefully."],
                ["Transparent Costs", "Detailed proposals with no hidden fees."],
                ["Post-Handover Support", "We stay available after completion for any follow-up."],
              ].map(([title, copy]) => (
                <div key={title}>
                  <p className="font-semibold text-sm">{title}</p>
                  <p className="mt-1 text-xs leading-6 text-muted-foreground">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
