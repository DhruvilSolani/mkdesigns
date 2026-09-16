"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, CheckCircle, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow, PageIntro } from "@/components/editorial";
import { brand } from "@/lib/content";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  projectType: z.string().min(1, "Please select a project type"),
  budget: z.string().min(1, "Please select a budget range"),
  location: z.string().optional(),
  message: z.string().min(10, "Please tell us a little about your project (at least 10 characters)"),
});

type FormValues = z.infer<typeof schema>;

const projectTypes = [
  "Residential Interior Design",
  "Luxury Villa Design",
  "Commercial Interiors",
  "Apartment Interiors",
  "Office Interiors",
  "Hospitality Design",
  "Renovation & Remodeling",
  "Turnkey Interior Solutions",
  "3D Visualization",
  "Other / Not sure yet",
];

const budgetRanges = [
  "Below ₹15 Lakhs",
  "₹15L – ₹40L",
  "₹40L – ₹75L",
  "₹75L – ₹1.5 Crore",
  "Above ₹1.5 Crore",
  "To be discussed",
];

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (_data: FormValues) => {
    // Placeholder: connect to your preferred form service or email endpoint
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
  };

  return (
    <>
      <PageIntro
        eyebrow="Get in touch"
        title="Let's talk about your space."
        copy="Whether you have a clear brief or just a feeling about what you want, we would love to hear from you. Every project begins with a conversation."
      />

      <section className="px-5 py-24 lg:px-10 lg:py-36">
        <div className="mx-auto grid max-w-[1500px] gap-16 lg:grid-cols-[.9fr_1.1fr]">
          {/* Contact details */}
          <div>
            <Eyebrow>Studio details</Eyebrow>
            <div className="space-y-8 border-y border-border py-10">
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-brass" strokeWidth={1.5} />
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Location</p>
                  <p className="mt-1 text-sm leading-6">{brand.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="mt-1 h-4 w-4 shrink-0 text-brass" strokeWidth={1.5} />
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Phone & WhatsApp</p>
                  <a href={`tel:${brand.phone.replace(/\s/g, "")}`} className="mt-1 block text-sm hover:text-brass transition-colors">
                    {brand.phone}
                  </a>
                  <a href={brand.whatsapp} className="text-xs text-brass hover:underline">Message on WhatsApp →</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="mt-1 h-4 w-4 shrink-0 text-brass" strokeWidth={1.5} />
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Email</p>
                  <a href={`mailto:${brand.email}`} className="mt-1 block text-sm hover:text-brass transition-colors">
                    {brand.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="mt-10 aspect-[4/3] overflow-hidden bg-muted flex items-center justify-center">
              <div className="text-center">
                <MapPin className="mx-auto h-8 w-8 text-muted-foreground" strokeWidth={1} />
                <p className="mt-3 text-xs uppercase tracking-[0.14em] text-muted-foreground">Map coming soon</p>
                <p className="mt-1 text-xs text-muted-foreground">Gujarat, India</p>
              </div>
            </div>

            <div className="mt-10">
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Studio hours</p>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between border-b border-border pb-2">
                  <span>Monday – Saturday</span>
                  <span className="text-muted-foreground">10:00 AM – 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-muted-foreground">By appointment</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            {submitted ? (
              <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
                <CheckCircle className="h-14 w-14 text-brass" strokeWidth={1} />
                <h2 className="mt-8 font-display text-5xl">Thank you.</h2>
                <p className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground">
                  We have received your inquiry and will be in touch within one business day.
                </p>
                <p className="mt-3 text-xs text-muted-foreground">
                  In the meantime, feel free to reach us on WhatsApp or by phone.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6" aria-label="Project inquiry form">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-xs uppercase tracking-[0.14em] mb-2">
                      Your Name <span className="text-brass" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      aria-required="true"
                      aria-describedby={errors.name ? "name-error" : undefined}
                      {...register("name")}
                      className="w-full border-b border-input bg-transparent py-3 text-sm outline-none transition-colors focus:border-foreground placeholder:text-muted-foreground"
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p id="name-error" role="alert" className="mt-1 text-xs text-destructive">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs uppercase tracking-[0.14em] mb-2">
                      Email <span className="text-brass" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      aria-required="true"
                      aria-describedby={errors.email ? "email-error" : undefined}
                      {...register("email")}
                      className="w-full border-b border-input bg-transparent py-3 text-sm outline-none transition-colors focus:border-foreground placeholder:text-muted-foreground"
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p id="email-error" role="alert" className="mt-1 text-xs text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className="block text-xs uppercase tracking-[0.14em] mb-2">Phone</label>
                    <input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      {...register("phone")}
                      className="w-full border-b border-input bg-transparent py-3 text-sm outline-none transition-colors focus:border-foreground placeholder:text-muted-foreground"
                      placeholder="+91 00000 00000"
                    />
                  </div>
                  <div>
                    <label htmlFor="location" className="block text-xs uppercase tracking-[0.14em] mb-2">Project Location</label>
                    <input
                      id="location"
                      type="text"
                      {...register("location")}
                      className="w-full border-b border-input bg-transparent py-3 text-sm outline-none transition-colors focus:border-foreground placeholder:text-muted-foreground"
                      placeholder="City, State"
                    />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="projectType" className="block text-xs uppercase tracking-[0.14em] mb-2">
                      Project Type <span className="text-brass" aria-hidden="true">*</span>
                    </label>
                    <select
                      id="projectType"
                      aria-required="true"
                      aria-describedby={errors.projectType ? "project-type-error" : undefined}
                      {...register("projectType")}
                      className="w-full border-b border-input bg-transparent py-3 text-sm outline-none transition-colors focus:border-foreground"
                      defaultValue=""
                    >
                      <option value="" disabled>Select a service</option>
                      {projectTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    {errors.projectType && (
                      <p id="project-type-error" role="alert" className="mt-1 text-xs text-destructive">{errors.projectType.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="budget" className="block text-xs uppercase tracking-[0.14em] mb-2">
                      Estimated Budget <span className="text-brass" aria-hidden="true">*</span>
                    </label>
                    <select
                      id="budget"
                      aria-required="true"
                      aria-describedby={errors.budget ? "budget-error" : undefined}
                      {...register("budget")}
                      className="w-full border-b border-input bg-transparent py-3 text-sm outline-none transition-colors focus:border-foreground"
                      defaultValue=""
                    >
                      <option value="" disabled>Select a range</option>
                      {budgetRanges.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                    {errors.budget && (
                      <p id="budget-error" role="alert" className="mt-1 text-xs text-destructive">{errors.budget.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs uppercase tracking-[0.14em] mb-2">
                    Tell Us About Your Project <span className="text-brass" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    aria-required="true"
                    aria-describedby={errors.message ? "message-error" : undefined}
                    {...register("message")}
                    className="w-full resize-none border-b border-input bg-transparent py-3 text-sm outline-none transition-colors focus:border-foreground placeholder:text-muted-foreground"
                    placeholder="Describe your project, space, timeline, and any specific requirements…"
                  />
                  {errors.message && (
                    <p id="message-error" role="alert" className="mt-1 text-xs text-destructive">{errors.message.message}</p>
                  )}
                </div>

                <p className="text-xs text-muted-foreground">
                  Fields marked <span className="text-brass" aria-hidden="true">*</span> are required. Your information is used solely to respond to your inquiry.
                </p>

                <Button
                  type="submit"
                  variant="editorial"
                  size="lg"
                  disabled={isSubmitting}
                  aria-disabled={isSubmitting}
                  className="w-full sm:w-auto"
                >
                  {isSubmitting ? "Sending…" : <>Send Inquiry <ArrowRight /></>}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
