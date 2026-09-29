import type { Metadata } from "next";
import { PortfolioPage } from "@/components/pages/portfolio-pages";
import { connectDB } from "@/lib/mongoose";
import Project from "@/models/Project";
import type { Project as ProjectType } from "@/lib/content";
import { projects as fallbackProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "A curated collection of residential, villa, apartment, and commercial interiors by MK Designs.",
  openGraph: { title: "Portfolio — MK Designs" },
};

export const revalidate = 60;

export default async function Portfolio() {
  let projects: ProjectType[] = [];

  try {
    await connectDB();
    const raw = await Project.find().sort({ createdAt: -1 }).lean();
    projects = raw.map((p) => ({
      ...p,
      _id: p._id?.toString(),
    })) as unknown as ProjectType[];
  } catch (error) {
    console.warn("MongoDB not connected, using fallback data:", error);
    projects = fallbackProjects;
  }

  if (projects.length === 0) {
    projects = fallbackProjects;
  }

  return <PortfolioPage projects={projects} />;
}
