"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FinalCta, PageIntro, SectionHeading } from "@/components/editorial";
import { projects, stats } from "@/lib/content";

const principles = [
  {
    number: "01",
    title: "Context First",
    copy: "Every project begins with deep listening. We study the site, the light, the client's way of living before a single line is drawn.",
  },
  {
    number: "02",
    title: "Material Honesty",
    copy: "We choose materials for their character and longevity. Stone, timber, plaster, and metal are selected for what they are, not what they imitate.",
  },
  {
    number: "03",
    title: "Enduring Craft",
    copy: "We collaborate with skilled craftspeople who share our commitment to precision. The result is spaces that improve with time.",
  },
];

const approach = [
  ["Listen", "We begin with a conversation — understanding your life, your aspirations, and the way you move through space."],
  ["Analyse", "We study the site, the light, the structure, and the context before reaching for a pencil."],
  ["Concept", "A single spatial idea that makes everything else coherent — a concept that is felt before it is seen."],
  ["Develop", "We refine every layer: layout, materiality, furniture, lighting, and joinery in precise detail."],
  ["Visualise", "Photorealistic 3D views that let you experience the space before a single item is ordered."],
  ["Execute", "We manage every phase of build and installation, coordinating each trade with meticulous care."],
];

const team = [
  {
    name: "MK",
    title: "Principal Designer & Founder",
    description: "With over a decade of practice, MK leads every project with a personal commitment to quality, craft, and the client relationship.",
  },
  {
    name: "Studio Team",
    title: "Design, Architecture & Project Management",
    description: "A close-knit team of designers, architects and project coordinators who bring each vision to life with skill and dedication.",
  },
  {
    name: "Craft Partners",
    title: "Makers, Suppliers & Specialists",
    description: "A trusted network of artisans, material suppliers and specialist contractors who share our standards and values.",
  },
];

export function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About MK Designs"
        title="A studio built on craft, context, and care."
        copy="We are an interior design and architecture practice based in Gujarat, India. We create spaces that are beautiful to look at and meaningful to live in."
      />

      {/* Studio story */}
      <section className="px-5 py-24 lg:px-10 lg:py-36">
        <div className="mx-auto grid max-w-[1500px] gap-16 lg:grid-cols-2 lg:items-center">
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src={projects[0]!.cover}
              alt="MK Designs studio interior"
              loading="lazy"
              className="h-full w-full object-cover image-zoom"
            />
          </div>
          <div className="lg:pl-10">
            <SectionHeading
              eyebrow="Our story"
              title="Spaces that feel like you."
              copy="MK Designs was founded on one belief: that great interiors are deeply personal. They are shaped by the people who inhabit them — their rituals, their memories, their sense of beauty."
            />
            <p className="mt-6 text-sm leading-8 text-muted-foreground">
              Over the years, we have had the privilege of working on residences, villas, apartments,
              offices and hospitality spaces across India. Each project has deepened our understanding of
              how architecture and interior design can transform daily life.
            </p>
            <p className="mt-5 text-sm leading-8 text-muted-foreground">
              We are a small, focused practice. That is deliberate. It means every client receives the
              full attention of the principal designer, and every project reflects our highest standards.
            </p>
            <div className="mt-14 grid grid-cols-2 gap-8 border-t border-border pt-10">
              {stats.map(([value, label]) => (
                <div key={label}>
                  <p className="font-display text-5xl text-brass">{value}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="bg-ivory-deep px-5 py-24 lg:px-10 lg:py-36">
        <div className="mx-auto max-w-[1500px]">
          <SectionHeading eyebrow="What we believe" title="Three principles that guide everything." />
          <div className="mt-16 grid gap-10 border-t border-border pt-12 md:grid-cols-3">
            {principles.map(({ number, title, copy }) => (
              <article key={title}>
                <p className="text-xs text-brass">{number}</p>
                <h3 className="mt-8 text-4xl">{title}</h3>
                <p className="mt-5 text-sm leading-7 text-muted-foreground">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="px-5 py-24 lg:px-10 lg:py-36">
        <div className="mx-auto max-w-[1500px]">
          <SectionHeading eyebrow="How we work" title="A structured journey, from idea to home." />
          <div className="mt-16 divide-y divide-border border-y border-border">
            {approach.map(([step, desc], i) => (
              <div
                key={step}
                className="grid items-center gap-5 py-8 md:grid-cols-[70px_1fr_2fr]"
              >
                <span className="text-xs text-brass">0{i + 1}</span>
                <h3 className="text-3xl md:text-4xl">{step}</h3>
                <p className="text-sm leading-7 text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Button asChild variant="editorial" size="lg">
              <Link href="/process">
                Full Process Details <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-primary px-5 py-24 text-primary-foreground lg:px-10 lg:py-36">
        <div className="mx-auto max-w-[1500px]">
          <SectionHeading eyebrow="The people" title="Small team. Full commitment." light />
          <div className="mt-16 grid gap-8 border-t border-primary-foreground/20 pt-12 md:grid-cols-3">
            {team.map(({ name, title, description }) => (
              <article key={name}>
                <div
                  className="mb-6 aspect-square w-24 overflow-hidden rounded-full bg-primary-foreground/10"
                  aria-hidden="true"
                />
                <h3 className="text-2xl">{name}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-primary-foreground/55">
                  {title}
                </p>
                <p className="mt-5 text-sm leading-7 text-primary-foreground/70">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
