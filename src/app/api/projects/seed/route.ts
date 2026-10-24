import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongoose";
import Project from "@/models/Project";
import { projects as hardcoded } from "@/lib/content";

// POST /api/projects/seed — one-time migration of hardcoded data into MongoDB
// Only available in development or when called by an authenticated admin
export async function POST() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await connectDB();
    const count = await Project.countDocuments();
    if (count > 0) {
      return NextResponse.json({
        message: `Skipped — ${count} projects already exist in MongoDB`,
      });
    }

    // Strip out Next.js image objects — store plain URL strings
    const docs = hardcoded.map((p) => ({
      ...p,
      cover: typeof p.cover === "string" ? p.cover : p.cover ? (p.cover as { src: string }).src : undefined,
      gallery: p.gallery.map((g) =>
        typeof g === "string" ? g : g ? (g as { src: string }).src : ""
      ).filter(Boolean),
    }));

    await Project.insertMany(docs);
    return NextResponse.json({ message: `Seeded ${docs.length} projects` });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Seed failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
