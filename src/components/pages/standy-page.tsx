"use client";

import Image from "next/image";
import { Instagram, Globe } from "lucide-react";

export function StandyPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-12">
      <div className="w-full max-w-md text-center">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Image
            src="/assets/mklogo.png"
            alt="MK Designs Logo"
            width={120}
            height={120}
            className="h-28 w-28 object-contain sm:h-32 sm:w-32"
            priority
          />
        </div>

        {/* Company Name */}
        <h1 className="mb-3 font-display text-4xl tracking-[0.12em] sm:text-5xl">
          MK <span className="text-brass">DESIGNS</span>
        </h1>
        <p className="mb-12 text-sm uppercase tracking-[0.16em] text-muted-foreground">
          Interior Design Studio
        </p>

        {/* Buttons */}
        <div className="space-y-4">
          {/* Instagram Button */}
          <a
            href="https://www.instagram.com/mk_designs.space/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block w-full overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 p-[2px] transition-all hover:shadow-lg hover:shadow-pink-500/25"
            aria-label="Visit our Instagram"
          >
            <div className="flex items-center justify-center gap-3 rounded-lg bg-background px-6 py-4 transition-colors group-hover:bg-background/95">
              <Instagram className="h-5 w-5 text-pink-600" />
              <span className="text-sm font-medium uppercase tracking-[0.14em]">
                Follow on Instagram
              </span>
            </div>
          </a>

          {/* Website Button */}
          <a
            href="/"
            className="group relative block w-full overflow-hidden rounded-lg border-2 border-brass bg-brass px-6 py-4 transition-all hover:shadow-lg hover:shadow-brass/25"
            aria-label="Visit our Website"
          >
            <span className="relative z-10 flex items-center justify-center gap-3 text-sm font-medium uppercase tracking-[0.14em] text-brass-foreground">
              <Globe className="h-5 w-5" />
              Visit Our Website
            </span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </a>
        </div>

        {/* Tagline */}
        <p className="mt-12 text-xs leading-relaxed text-muted-foreground">
          Thoughtful interiors. Timeless design.
          <br />
          Exceptional living.
        </p>
      </div>
    </div>
  );
}
