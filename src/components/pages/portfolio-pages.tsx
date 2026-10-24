"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Eyebrow, FinalCta, PageIntro, ProjectCard } from "@/components/editorial";
import { type Project } from "@/lib/content";

const filters = [
  "All",
  "Residential",
  "Villa",
  "Apartment",
  "Commercial",
  "Office",
  "Hospitality",
  "Renovation",
];

export function PortfolioPage({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("All");
  const visible =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <PageIntro
        eyebrow="Selected portfolio"
        title="Stories, told through space."
        copy="A curated collection of residential, commercial and hospitality interiors shaped by context, character and the people who inhabit them."
      />
      <section className="px-5 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1500px]">
          <div
            className="mb-14 flex gap-6 overflow-x-auto border-b border-border pb-5"
            role="tablist"
            aria-label="Project categories"
          >
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={filter === item}
                onClick={() => setFilter(item)}
                className={`shrink-0 text-xs uppercase tracking-[0.14em] transition-colors ${
                  filter === item
                    ? "text-brass"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          {visible.length ? (
            <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
              {visible.map((p, i) => (
                <div key={p.slug} className="animate-fade-in">
                  <ProjectCard project={p} tall={i % 3 !== 1} />
                </div>
              ))}
            </div>
          ) : (
            <p className="py-24 text-center font-display text-4xl text-muted-foreground">
              New work in this category is coming soon.
            </p>
          )}
        </div>
      </section>
      <FinalCta />
    </>
  );
}

export function ProjectDetailPage({ project, allProjects }: { project: Project; allProjects: Project[] }) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const index = allProjects.findIndex((p) => p.slug === project.slug);
  const previous = allProjects[(index - 1 + allProjects.length) % allProjects.length]!;
  const next = allProjects[(index + 1) % allProjects.length]!;

  const galleryImages = project.gallery.length > 0 ? project.gallery : (project.cover ? [project.cover] : []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
      if (e.key === "ArrowRight") setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [galleryImages.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <>
      {/* Gallery Slideshow - Moved to top */}
      {galleryImages.length > 0 && (
        <section className="relative bg-black pt-20">
          {/* Slideshow Container */}
          <div className="relative mx-auto max-w-[1800px]">
            {/* Main Image */}
            <div className="relative flex items-center justify-center bg-black" style={{ minHeight: '70vh', maxHeight: '85vh' }}>
              <img
                src={galleryImages[currentSlide]}
                alt={`${project.name} - Image ${currentSlide + 1}`}
                className="h-auto max-h-[85vh] w-full object-contain cursor-pointer"
                onClick={() => setLightbox(currentSlide)}
              />
              
              {/* Navigation Arrows */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white backdrop-blur-sm transition-all hover:bg-black/70 lg:left-8"
                    aria-label="Previous image"
                  >
                    <ArrowLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white backdrop-blur-sm transition-all hover:bg-black/70 lg:right-8"
                    aria-label="Next image"
                  >
                    <ArrowRight className="h-6 w-6" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-sm text-white backdrop-blur-sm">
                {currentSlide + 1} / {galleryImages.length}
              </div>
            </div>

            {/* Thumbnail Navigation */}
            {galleryImages.length > 1 && (
              <div className="bg-black px-4 py-6">
                <div className="mx-auto flex max-w-full gap-3 overflow-x-auto pb-2">
                  {galleryImages.map((image, i) => (
                    <button
                      key={i}
                      onClick={() => goToSlide(i)}
                      className={`relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-lg transition-all ${
                        currentSlide === i
                          ? "ring-2 ring-brass ring-offset-2 ring-offset-black"
                          : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${i + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Project Header - Below Gallery */}
      <section className="bg-background px-5 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-[1500px]">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 text-xs uppercase tracking-[.15em] text-muted-foreground"
          >
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/portfolio" className="hover:text-foreground transition-colors">Portfolio</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{project.name}</span>
          </nav>
          <h1 className="max-w-4xl text-balance font-display text-5xl uppercase leading-[.9] sm:text-6xl lg:text-8xl">
            {project.name}
          </h1>
          {(project.category || project.location || project.year) && (
            <p className="mt-6 text-sm uppercase tracking-[.16em] text-muted-foreground">
              {[project.category, project.location, project.year].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>
      </section>

      {/* Project overview */}
      {(project.client || project.area || project.year || project.services.length > 0 || project.description) && (
        <section className="px-5 py-24 lg:px-10 lg:py-36">
          <div className="mx-auto grid max-w-[1300px] gap-16 lg:grid-cols-[.65fr_1.35fr]">
            {(project.client || project.area || project.year || project.services.length > 0) && (
              <div>
                <Eyebrow>Project overview</Eyebrow>
                <dl className="divide-y divide-border border-y border-border text-sm">
                  {[
                    ["Client", project.client],
                    ["Area", project.area],
                    ["Year", project.year],
                    ["Services", project.services.length > 0 ? project.services.join(", ") : null],
                  ]
                    .filter(([, value]) => value)
                    .map(([dt, dd]) => (
                      <div key={dt} className="grid grid-cols-3 py-4">
                        <dt className="text-muted-foreground">{dt}</dt>
                        <dd className="col-span-2">{dd}</dd>
                      </div>
                    ))}
                </dl>
              </div>
            )}
            {project.description && (
              <div>
                <p className="font-display text-4xl leading-tight sm:text-5xl">
                  {project.description}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Concept / Challenge / Solution */}
      {(project.concept || project.challenge || project.solution) && (
        <section className="bg-ivory-deep px-5 py-24 lg:px-10 lg:py-32">
          <div className="mx-auto grid max-w-[1300px] gap-14 md:grid-cols-3">
            {[
              ["Design Concept", project.concept],
              ["The Challenge", project.challenge],
              ["Our Solution", project.solution],
            ]
              .filter(([, copy]) => copy)
              .map(([title, copy]) => (
                <article key={title}>
                  <h2 className="text-4xl">{title}</h2>
                  <p className="mt-6 text-sm leading-7 text-muted-foreground">{copy}</p>
                </article>
              ))}
          </div>
        </section>
      )}

      {/* Materials */}
      {project.materials.length > 0 && (
        <section className="px-5 py-24 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-[1500px]">
            <Eyebrow>Materials &amp; finishes</Eyebrow>
            <div className="grid grid-cols-2 border-l border-t border-border md:grid-cols-3 lg:grid-cols-6">
              {project.materials.map((material, i) => (
                <div key={material} className="aspect-square border-b border-r border-border p-5">
                  <span className="text-xs text-brass">0{i + 1}</span>
                  <p className="mt-12 font-display text-2xl">{material}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Prev / Next */}
      <nav className="grid border-y border-border md:grid-cols-2">
        <Link
          href={`/portfolio/${previous.slug}`}
          className="flex min-h-48 items-center gap-4 px-7 transition-colors hover:bg-ivory-deep lg:px-14"
        >
          <ArrowLeft />
          <div>
            <span className="text-xs uppercase tracking-[.14em] text-muted-foreground">
              Previous project
            </span>
            <p className="mt-2 font-display text-3xl">{previous.name}</p>
          </div>
        </Link>
        <Link
          href={`/portfolio/${next.slug}`}
          className="flex min-h-48 items-center justify-end gap-4 border-t border-border px-7 text-right transition-colors hover:bg-ivory-deep md:border-l md:border-t-0 lg:px-14"
        >
          <div>
            <span className="text-xs uppercase tracking-[.14em] text-muted-foreground">
              Next project
            </span>
            <p className="mt-2 font-display text-3xl">{next.name}</p>
          </div>
          <ArrowRight />
        </Link>
      </nav>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Project image viewer"
          className="fixed inset-0 z-50 grid place-items-center bg-primary/95 p-4"
          onClick={() => setLightbox(null)}
        >
          <Button
            variant="editorialOutline"
            size="icon"
            aria-label="Close image viewer"
            className="absolute right-5 top-5 text-primary-foreground"
            onClick={() => setLightbox(null)}
          >
            <X />
          </Button>
          <img
            src={project.gallery[lightbox]}
            alt={`${project.name} enlarged detail`}
            className="max-h-[88vh] max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
