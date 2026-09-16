"use client";

import { Quote } from "lucide-react";
import { FinalCta, PageIntro, SectionHeading, TestimonialSlider } from "@/components/editorial";
import { testimonials } from "@/lib/content";

const extended = [
  {
    quote: "The level of detail in every aspect of our home — from the joinery to the lighting — exceeded anything we had imagined.",
    name: "Private Client",
    project: "Villa Interior",
    location: "Surat",
  },
  {
    quote: "MK Designs understood that our office needed to communicate confidence and warmth to clients. They delivered exactly that.",
    name: "Business Client",
    project: "Commercial Interior",
    location: "Ahmedabad",
  },
  {
    quote: "What struck us most was how calm the process felt. Every decision was explained clearly and every milestone delivered on time.",
    name: "Private Client",
    project: "Apartment Interior",
    location: "Mumbai",
  },
  {
    quote: "Our renovated home feels both new and familiar — the original character of the house has been honoured and elevated.",
    name: "Private Client",
    project: "Renovation",
    location: "Udaipur",
  },
  {
    quote: "We had worked with other designers before, but none who brought this level of commitment to the relationship and the craft.",
    name: "Private Client",
    project: "Residential Interior",
    location: "Rajkot",
  },
  {
    quote: "The 3D visualisations meant we could see every detail before a single rupee was spent. It gave us total confidence in every decision.",
    name: "Private Client",
    project: "Luxury Villa",
    location: "Ahmedabad",
  },
];

export function TestimonialsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Client stories"
        title="In their words."
        copy="We are grateful for every client who has trusted us with their home or business. Here are some of the stories they have shared."
      />

      {/* Featured slider */}
      <section className="px-5 py-24 lg:px-10 lg:py-36">
        <div className="mx-auto max-w-[1500px]">
          <SectionHeading eyebrow="Featured" title="Selected testimonials." />
          <div className="mt-14">
            <TestimonialSlider />
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-ivory-deep px-5 py-24 lg:px-10 lg:py-36">
        <div className="mx-auto max-w-[1500px]">
          <SectionHeading eyebrow="More from our clients" title="A consistent record of care." />
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {extended.map((item) => (
              <article
                key={item.quote.slice(0, 20)}
                className="flex flex-col justify-between bg-background p-8 lg:p-10"
              >
                <div>
                  <Quote className="h-6 w-6 text-brass" strokeWidth={1} />
                  <blockquote className="mt-6 font-display text-2xl leading-snug">"{item.quote}"</blockquote>
                </div>
                <div className="mt-8 border-t border-border pt-6">
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.13em] text-muted-foreground">
                    {item.project} · {item.location}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary px-5 py-24 text-primary-foreground lg:px-10 lg:py-36">
        <div className="mx-auto max-w-[1500px]">
          <SectionHeading eyebrow="Our record" title="Numbers that reflect our commitment." light />
          <div className="mt-14 grid grid-cols-2 gap-10 border-t border-primary-foreground/20 pt-12 md:grid-cols-4">
            {[
              ["100%", "Client retention within project"],
              ["4.9/5", "Average client satisfaction"],
              ["50+", "Happy clients across India"],
              ["10+", "Years of practice"],
            ].map(([value, label]) => (
              <div key={label}>
                <p className="font-display text-5xl text-brass">{value}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.12em] text-primary-foreground/55">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
