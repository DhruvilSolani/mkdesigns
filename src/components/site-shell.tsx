"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUp, Menu, Phone, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { brand } from "@/lib/content";

const links = [
  ["Home", "/"],
  ["About", "/about"],
  ["Services", "/services"],
  ["Portfolio", "/portfolio"],
  ["Process", "/process"],
  ["Testimonials", "/testimonials"],
  ["Contact", "/contact"],
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname();
  const overHero = path === "/" && !scrolled;
  const isProjectDetail = path.startsWith("/portfolio/") && path !== "/portfolio";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setMenu(false), [path]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 border-b transition-all duration-500 ${
          overHero
            ? "border-border/20 bg-white/95 text-foreground shadow-lg backdrop-blur-md"
            : "border-border bg-white/98 text-foreground shadow-md backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 lg:px-10">
          <Link
            href="/"
            aria-label="MK Designs home"
            className="flex items-center gap-3 font-display text-2xl font-medium tracking-[0.12em]"
          >
            <Image
              src="/assets/mklogo.png"
              alt="MK Designs Logo"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
            <span>
              MK <span className="text-brass">DESIGNS</span>
            </span>
          </Link>

          <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
            {links.map(([label, to]) => (
              <Link
                key={to}
                href={to}
                className={`text-[11px] uppercase tracking-[0.14em] transition-opacity hover:opacity-60 ${
                  path === to ? "text-brass font-semibold" : ""
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button asChild variant="editorial" size="lg">
              <Link href="/contact">Start Your Project</Link>
            </Button>
          </div>

          <Button
            aria-label={menu ? "Close menu" : "Open menu"}
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </Button>
        </div>
      </header>

      {menu && (
        <div className="fixed inset-0 z-30 flex flex-col justify-center bg-primary px-8 text-primary-foreground lg:hidden">
          <nav className="space-y-4 pt-16">
            {links.map(([label, to], i) => (
              <Link
                key={to}
                href={to}
                className="block font-display text-5xl reveal-up"
                style={{ animationDelay: `${i * 45}ms` }}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      <main>{children}</main>

      <footer className="bg-primary px-5 py-16 text-primary-foreground lg:px-10">
        <div className="mx-auto grid max-w-[1500px] gap-12 border-b border-primary-foreground/20 pb-14 md:grid-cols-3">
          <div>
            <p className="font-display text-4xl">MK Designs</p>
            <p className="mt-4 max-w-xs text-sm leading-7 text-primary-foreground/65">
              Thoughtful interiors. Timeless design. Exceptional living.
            </p>
          </div>
          <div className="text-sm leading-8">
            <p className="mb-3 text-xs uppercase tracking-[0.16em] text-brass">Office</p>
            <p>{brand.address}</p>
            <p>{brand.phone}</p>
            <p>{brand.email}</p>
          </div>
          <div className="md:text-right">
            <Button asChild variant="brass" size="lg">
              <Link href="/contact">Book a Consultation</Link>
            </Button>
          </div>
        </div>
        <div className="mx-auto mt-7 flex max-w-[1500px] flex-wrap justify-between gap-4 text-xs text-primary-foreground/55">
          <p>© 2026 BITCODER. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </footer>

      <a
        href={brand.whatsapp}
        aria-label="Contact MK Designs on WhatsApp"
        className={`fixed bottom-5 right-5 z-30 grid h-12 w-12 place-items-center rounded-full bg-olive text-primary-foreground shadow-lg transition-transform hover:scale-105 ${
          isProjectDetail ? "hidden" : ""
        }`}
      >
        <span className="text-xs font-semibold">WA</span>
      </a>

      {scrolled && (
        <Button
          variant="editorial"
          size="icon"
          aria-label="Back to top"
          className="fixed bottom-5 left-5 z-30"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUp />
        </Button>
      )}

      <a href={`tel:${brand.phone.replace(/\s/g, "")}`} className="sr-only">
        <Phone />
        Call MK Designs
      </a>
    </>
  );
}
