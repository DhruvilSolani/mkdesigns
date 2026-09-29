"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const result = await signIn("credentials", {
      username: form.get("username"),
      password: form.get("password"),
      redirect: false,
    });

    setLoading(false);
    if (result?.error) {
      setError("Invalid username or password");
    } else {
      router.push("/admin");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f0f0f] px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-10 text-center">
          <p className="font-display text-3xl tracking-[0.12em] text-white">
            MK <span className="text-[#b5973a]">DESIGNS</span>
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.18em] text-white/40">Admin Panel</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur"
        >
          <div className="flex items-center justify-center text-[#b5973a] mb-2">
            <Lock className="h-5 w-5" />
          </div>

          {error && (
            <p className="rounded-lg bg-red-500/10 px-4 py-3 text-center text-sm text-red-400">
              {error}
            </p>
          )}

          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-white/50">
              Username
            </label>
            <input
              name="username"
              type="text"
              autoComplete="username"
              required
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#b5973a] transition-colors"
              placeholder="admin"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-white/50">
              Password
            </label>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#b5973a] transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#b5973a] py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
