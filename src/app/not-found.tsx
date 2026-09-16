import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-primary px-5 text-primary-foreground">
      <p className="mb-6 text-[11px] uppercase tracking-[0.2em] text-brass">404</p>
      <h1 className="text-center font-display text-7xl leading-[.9] sm:text-8xl lg:text-[10rem]">
        Page not found.
      </h1>
      <p className="mt-8 max-w-sm text-center text-sm leading-7 text-primary-foreground/65">
        The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back somewhere familiar.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="inline-flex h-12 items-center gap-2 bg-brass px-8 text-xs uppercase tracking-[0.18em] text-brass-foreground transition-opacity hover:opacity-85"
        >
          Go home
        </Link>
        <Link
          href="/portfolio"
          className="inline-flex h-12 items-center gap-2 border border-primary-foreground/40 px-8 text-xs uppercase tracking-[0.18em] transition-colors hover:bg-primary-foreground/10"
        >
          View portfolio
        </Link>
      </div>
    </div>
  );
}
