"use client";

import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  FinalCta,
  ImageStrip,
  ProjectCard,
  SectionHeading,
  TestimonialSlider,
} from "@/components/editorial";
import { serviceImages, services, stats, type Project } from "@/lib/content";

const reasons = [
  ["Personalized Design", "Every space is designed around your lifestyle and requirements."],
  ["Attention to Detail", "From materials to lighting and furniture, every element is considered."],
  ["Functional Luxury", "We balance visual refinement with intuitive everyday function."],
  ["End-to-End Execution", "From concept to completion, we manage the complete journey."],
  ["Transparent Process", "Clear communication, timelines and project planning throughout."],
  ["Quality Craftsmanship", "We collaborate with skilled craftspeople and trusted vendors."],
];

export function HomePage({ projects }: { projects: Project[] }) {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[100svh] min-h-[600px] overflow-hidden bg-primary text-primary-foreground">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full scale-[1.02] object-cover"
        >
          <source src="/assets/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-primary/45" />
        <div className="relative mx-auto flex h-full max-w-[1500px] flex-col justify-end px-5 pb-20 pt-36 lg:px-10 lg:pb-24">
          <p className="mb-5 text-xs uppercase tracking-[0.2em] text-primary-foreground/80 reveal-up">
            Interior Design
          </p>
          <h1 className="max-w-5xl text-balance text-6xl leading-[.88] reveal-up reveal-delay sm:text-7xl lg:text-9xl">
            We Design Spaces That Feel Like You.
          </h1>
          <div className="mt-8 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <p className="max-w-xl text-base leading-7 text-primary-foreground/80">
              Thoughtful interiors. Timeless design. Exceptional living.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="brass" size="lg">
                <Link href="/portfolio">Explore Our Work</Link>
              </Button>
              <Button asChild variant="editorialOutline" size="lg">
                <Link href="/contact">Start Your Project</Link>
              </Button>
            </div>
          </div>
          <a
            href="#featured"
            aria-label="Scroll to featured projects"
            className="absolute bottom-5 left-1/2 -translate-x-1/2"
          >
            <ArrowDown className="animate-bounce" />
          </a>
        </div>
      </section>

      {/* Featured projects */}
      <section id="featured" className="px-5 py-24 lg:px-10 lg:py-36">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHeading eyebrow="Selected work" title="Spaces with a point of view." />
            <Link
              href="/portfolio"
              className="flex items-center gap-3 text-xs uppercase tracking-[0.16em]"
            >
              View all projects <ArrowRight />
            </Link>
          </div>
          <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <ProjectCard key={p.slug} project={p} tall={i % 3 !== 0} />
            ))}
          </div>
        </div>
      </section>

      {/* Studio story */}
      <section className="bg-ivory-deep px-5 py-24 lg:px-10 lg:py-36">
        <div className="mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div className="aspect-[4/5] overflow-hidden bg-muted">
            {projects.length > 0 && (
              <img
                src={projects[Math.min(4, projects.length - 1)]?.cover || projects[0]?.cover}
                alt="MK Designs interior showcase"
                loading="lazy"
                className="h-full w-full object-cover image-zoom"
              />
            )}
          </div>
          <div className="lg:pl-14">
            <SectionHeading
              eyebrow="About the studio"
              title="Interiors that tell your story."
              copy="We believe great interiors are more than beautiful spaces. They are an expression of the people who live, work and experience them."
            />
            <Button asChild variant="editorialOutline" size="lg" className="mt-9">
              <Link href="/about">
                About MK Designs <ArrowRight />
              </Link>
            </Button>
            <div className="mt-16 grid grid-cols-2 gap-8 border-t border-border pt-10">
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

      {/* Services list */}
      <section className="px-5 py-24 lg:px-10 lg:py-36">
        <div className="mx-auto max-w-[1500px]">
          <SectionHeading
            eyebrow="Our expertise"
            title="A complete design practice."
            copy="From the first spatial idea to the final object, we create interiors with clarity, care and enduring character."
          />
          <div className="mt-16 divide-y divide-border border-y border-border">
            {services.map(([name, desc], i) => (
              <Link
                href="/services"
                key={name}
                className="group grid items-center gap-5 py-7 md:grid-cols-[70px_1fr_1fr_auto]"
              >
                <span className="text-xs text-brass">0{i + 1}</span>
                <h3 className="text-3xl md:text-4xl">{name}</h3>
                <p className="text-sm leading-6 text-muted-foreground">{desc}</p>
                <div className="relative hidden h-16 w-24 overflow-hidden md:block">
                  <img
                    src={serviceImages[i]}
                    alt=""
                    loading="lazy"
                    className="h-full w-full translate-x-full object-cover opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-primary px-5 py-24 text-primary-foreground lg:px-10 lg:py-36">
        <div className="mx-auto grid max-w-[1500px] gap-16 lg:grid-cols-[.7fr_1.3fr]">
          <SectionHeading
            eyebrow="Our philosophy"
            title="Designed With Purpose."
            light
            copy="We bring function, aesthetics, materiality, lighting, spatial planning and personal expression into one considered whole."
          />
          <ImageStrip projects={projects} />
        </div>
      </section>

      {/* Why MK Designs */}
      <section className="px-5 py-24 lg:px-10 lg:py-36">
        <div className="mx-auto max-w-[1500px]">
          <SectionHeading eyebrow="Why MK Designs" title="The difference is in the detail." />
          <div className="mt-16 grid border-l border-t border-border md:grid-cols-2 lg:grid-cols-3">
            {reasons.map(([title, text], i) => (
              <article
                key={title}
                className="min-h-64 border-b border-r border-border p-8 lg:p-10"
              >
                <p className="text-xs text-brass">0{i + 1}</p>
                <h3 className="mt-12 text-3xl">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-5 pb-24 lg:px-10 lg:pb-36">
        <div className="mx-auto max-w-[1500px]">
          <SectionHeading eyebrow="Client stories" title="In their words." />
          <div className="mt-14">
            <TestimonialSlider />
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
