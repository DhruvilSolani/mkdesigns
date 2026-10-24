import type { Metadata } from "next";
import { HomePage } from "@/components/pages/home-page";
import { connectDB } from "@/lib/mongoose";
import Project from "@/models/Project";
import type { Project as ProjectType } from "@/lib/content";
import { projects as fallbackProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "MK Designs — Interior Design Studio",
  description:
    "MK Designs creates thoughtful, timeless interiors for residences, villas, apartments, offices and hospitality spaces across India.",
  openGraph: {
    title: "MK Designs — Interior Design & Architecture Studio",
    description: "Thoughtful interiors. Timeless design. Exceptional living.",
  },
};

export const revalidate = 60;

export default async function Home() {
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

  // If MongoDB is empty, use fallback
  if (projects.length === 0) {
    projects = fallbackProjects;
  }

  return <HomePage projects={projects} />;
}
