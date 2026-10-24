"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Loader2, Lock, ArrowLeft, AlertCircle, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const username = form.get("username") as string;
    const password = form.get("password") as string;

    // Client-side validation
    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password");
      setLoading(false);
      return;
    }

    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid credentials. Please try again.");
        setLoading(false);
      } else if (result?.ok) {
        // Successful login
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  }

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <div className="relative flex min-h-screen">
      {/* Left Side - Branding & Image */}
      <div className="relative hidden w-1/2 overflow-hidden bg-primary lg:block">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/assets/mklogo.png"
            alt="MK Designs"
            fill
            className="object-cover opacity-10"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/90" />
        </div>

        {/* Content */}
        <div className="relative flex h-full flex-col justify-between p-12">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-3">
            <Image
              src="/assets/mklogo.png"
              alt="MK Designs Logo"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
            <span className="font-display text-3xl tracking-[0.12em] text-primary-foreground">
              MK <span className="text-brass">DESIGNS</span>
            </span>
          </Link>

          {/* Center Content */}
          <div className="space-y-6 text-primary-foreground">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2 text-xs uppercase tracking-[0.14em]">
              <Lock className="h-3.5 w-3.5" />
              Secure Access
            </div>
            <h1 className="max-w-lg font-display text-5xl leading-tight">
              Welcome to the Admin Portal
            </h1>
            <p className="max-w-md text-lg leading-relaxed text-primary-foreground/70">
              Manage your portfolio, projects, and content with a streamlined dashboard designed
              for efficiency.
            </p>
          </div>

          {/* Footer */}
          <p className="text-xs text-primary-foreground/50">
            © 2026 BITCODER. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex w-full flex-col justify-center bg-background px-6 py-12 lg:w-1/2 lg:px-16">
        {/* Mobile Logo */}
        <div className="mb-8 lg:hidden">
          <Link href="/" className="inline-flex items-center gap-3">
            <Image
              src="/assets/mklogo.png"
              alt="MK Designs Logo"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
            <span className="font-display text-2xl tracking-[0.12em]">
              MK <span className="text-brass">DESIGNS</span>
            </span>
          </Link>
        </div>

        {/* Back to Site Link */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Site
        </Link>

        <div className="mx-auto w-full max-w-md">
          {/* Header */}
          <div className="mb-10">
            <h2 className="font-display text-4xl text-foreground">Sign In</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Enter your credentials to access the admin dashboard
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 flex items-start gap-3 rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="block text-xs font-medium uppercase tracking-[0.14em] text-foreground"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                disabled={loading}
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-brass focus:ring-2 focus:ring-brass/20 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter your username"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-xs font-medium uppercase tracking-[0.14em] text-foreground"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  disabled={loading}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-sm text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-brass focus:ring-2 focus:ring-brass/20 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full overflow-hidden rounded-lg bg-brass py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-brass-foreground transition-all hover:shadow-lg hover:shadow-brass/25 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </button>
          </form>

          {/* Footer Note */}
          <div className="mt-8 rounded-lg border border-border/50 bg-muted/30 px-4 py-3 text-center">
            <p className="text-xs text-muted-foreground">
              <Lock className="mr-1 inline h-3 w-3" />
              Secure authentication powered by NextAuth
            </p>
          </div>
        </div>

        {/* Mobile Footer */}
        <p className="mt-12 text-center text-xs text-muted-foreground lg:hidden">
          © 2026 BITCODER. All rights reserved.
        </p>
      </div>
    </div>
  );
}
