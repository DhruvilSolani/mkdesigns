"use client";

import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { projects, testimonials, type Project } from "@/lib/content";

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-brass">
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
  light?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${light ? "text-primary-foreground" : "text-foreground"}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="text-balance text-5xl leading-[.95] sm:text-6xl lg:text-7xl">{title}</h2>
      {copy && (
        <p
          className={`mt-7 max-w-2xl text-sm leading-7 md:text-base ${
            light ? "text-primary-foreground/70" : "text-muted-foreground"
          }`}
        >
          {copy}
        </p>
      )}
    </div>
  );
}

export function PageIntro({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <section className="bg-primary px-5 pb-20 pt-40 text-primary-foreground lg:px-10 lg:pb-28 lg:pt-48">
      <div className="mx-auto max-w-[1500px] reveal-up">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="max-w-5xl text-balance text-6xl leading-[.9] sm:text-7xl lg:text-9xl">
          {title}
        </h1>
        <p className="mt-8 max-w-2xl text-base leading-8 text-primary-foreground/70">{copy}</p>
      </div>
    </section>
  );
}

export function ProjectCard({
  project,
  tall = false,
}: {
  project: Project;
  tall?: boolean;
}) {
  return (
    <Link href={`/portfolio/${project.slug}`} className="group block">
      <div
        className={`relative overflow-hidden bg-muted ${tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}
      >
        <img
          src={project.cover}
          alt={`${project.name} — ${project.category} interior by MK Designs`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-primary/70 via-transparent to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <ArrowRight className="ml-auto text-primary-foreground" />
        </div>
      </div>
      <div className="flex items-start justify-between gap-5 border-b border-border py-5">
        <div>
          <h3 className="text-2xl">{project.name}</h3>
          <p className="mt-1 text-xs uppercase tracking-[0.13em] text-muted-foreground">
            {project.location}
          </p>
        </div>
        <p className="pt-1 text-xs uppercase tracking-[0.13em] text-muted-foreground">
          {project.category} · {project.year}
        </p>
      </div>
    </Link>
  );
}

export function TestimonialSlider() {
  const [active, setActive] = useState(0);
  const item = testimonials[active % testimonials.length]!;
  const move = (by: number) =>
    setActive((active + by + testimonials.length) % testimonials.length);

  return (
    <div className="relative min-h-[390px] bg-primary p-8 text-primary-foreground sm:p-12 lg:p-20">
      <Quote className="h-9 w-9 text-brass" strokeWidth={1} />
      <blockquote className="mt-10 max-w-4xl font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
        &ldquo;{item.quote}&rdquo;
      </blockquote>
      <div className="mt-12 flex flex-wrap items-end justify-between gap-8">
        <div>
          <p className="text-sm font-semibold">{item.name}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.14em] text-primary-foreground/55">
            {item.project} · {item.location}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            aria-label="Previous testimonial"
            variant="editorialOutline"
            size="icon"
            onClick={() => move(-1)}
          >
            <ChevronLeft />
          </Button>
          <Button
            aria-label="Next testimonial"
            variant="editorialOutline"
            size="icon"
            onClick={() => move(1)}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}

export function FinalCta() {
  return (
    <section className="bg-ivory-deep px-5 py-24 text-center lg:px-10 lg:py-36">
      <div className="mx-auto max-w-4xl">
        <Eyebrow>Your space, thoughtfully imagined</Eyebrow>
        <h2 className="text-balance text-6xl leading-[.95] sm:text-7xl lg:text-8xl">
          Ready to Create Your Space?
        </h2>
        <p className="mx-auto mt-7 max-w-xl leading-7 text-muted-foreground">
          Let&apos;s transform your ideas into an interior that feels uniquely yours.
        </p>
        <Button asChild variant="editorial" size="lg" className="mt-10">
          <Link href="/contact">
            Book a Consultation <ArrowRight />
          </Link>
        </Button>
      </div>
    </section>
  );
}

export function ImageStrip() {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
      {projects.slice(0, 4).map((project, i) => (
        <div
          key={project.slug}
          className={`${i % 2 ? "mt-8" : "mb-8"} aspect-[3/4] overflow-hidden`}
        >
          <img
            src={project.cover}
            alt={`${project.name} interior detail`}
            loading="lazy"
            className="h-full w-full object-cover image-zoom"
          />
        </div>
      ))}
    </div>
  );
}
