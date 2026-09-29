import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongoose";
import Project from "@/models/Project";
import { ProjectDetailPage } from "@/components/pages/portfolio-pages";
import type { Project as ProjectType } from "@/lib/content";
import { projects as fallbackProjects } from "@/lib/content";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    await connectDB();
    const projects = await Project.find({}, { slug: 1 }).lean();
    if (projects.length > 0) {
      return projects.map((p) => ({ slug: p.slug }));
    }
  } catch {
    // Fallback to hardcoded if MongoDB not available at build time
  }
  return fallbackProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    await connectDB();
    const project = await Project.findOne({ slug }).lean();
    if (project) {
      return {
        title: project.name,
        description: project.description,
        openGraph: {
          title: `${project.name} — MK Designs`,
          description: project.description,
        },
      };
    }
  } catch {
    // Fall through to fallback
  }

  const fallback = fallbackProjects.find((p) => p.slug === slug);
  if (!fallback) return {};
  
  return {
    title: fallback.name,
    description: fallback.description,
    openGraph: {
      title: `${fallback.name} — MK Designs`,
      description: fallback.description,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  let project: ProjectType | null = null;
  let allProjects: ProjectType[] = [];

  try {
    await connectDB();
    const raw = await Project.findOne({ slug }).lean();
    const allRaw = await Project.find({}, { slug: 1, name: 1, cover: 1 })
      .sort({ createdAt: -1 })
      .lean();

    if (raw) {
      project = { ...raw, _id: raw._id?.toString() } as unknown as ProjectType;
      allProjects = allRaw.map((p) => ({
        ...p,
        _id: p._id?.toString(),
      })) as unknown as ProjectType[];
    }
  } catch (error) {
    console.warn("MongoDB not connected, using fallback data:", error);
  }

  // Fallback to hardcoded if not in MongoDB
  if (!project) {
    project = fallbackProjects.find((p) => p.slug === slug) ?? null;
    allProjects = fallbackProjects;
  }

  if (!project) notFound();

  return <ProjectDetailPage project={project} allProjects={allProjects} />;
}
