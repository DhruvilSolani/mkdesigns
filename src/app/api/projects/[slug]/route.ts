import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongoose";
import Project from "@/models/Project";

type Params = { params: Promise<{ slug: string }> };

// GET /api/projects/:slug — public
export async function GET(_req: Request, { params }: Params) {
  const { slug } = await params;
  try {
    await connectDB();
    const project = await Project.findOne({ slug }).lean();
    if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(project);
  } catch {
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}

// PUT /api/projects/:slug — protected, update project
export async function PUT(request: Request, { params }: Params) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { slug } = await params;
  try {
    await connectDB();
    const body = await request.json();
    const project = await Project.findOneAndUpdate({ slug }, body, {
      new: true,
      runValidators: true,
    }).lean();
    if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(project);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update project";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

// DELETE /api/projects/:slug — protected
export async function DELETE(_req: Request, { params }: Params) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { slug } = await params;
  try {
    await connectDB();
    const project = await Project.findOneAndDelete({ slug });
    if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
