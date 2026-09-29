"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { Plus, LogOut, Pencil, Trash2, ExternalLink, ImageIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ProjectFormModal } from "@/components/admin/project-form-modal";

export type AdminProject = {
  _id?: string;
  name: string;
  slug: string;
  category: string;
  location: string;
  year: string;
  client: string;
  area: string;
  description: string;
  concept: string;
  challenge: string;
  solution: string;
  services: string[];
  cover: string;
  gallery: string[];
  materials: string[];
  featured: boolean;
};

export function AdminDashboard() {
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<AdminProject | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  async function fetchProjects() {
    setLoading(true);
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data);
    } catch {
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  async function handleDelete(slug: string) {
    if (!confirm(`Delete "${slug}"? This cannot be undone.`)) return;
    setDeleting(slug);
    try {
      const res = await fetch(`/api/projects/${slug}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Project deleted");
      setProjects((prev) => prev.filter((p) => p.slug !== slug));
    } catch {
      toast.error("Failed to delete project");
    } finally {
      setDeleting(null);
    }
  }

  function openAdd() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(project: AdminProject) {
    setEditing(project);
    setModalOpen(true);
  }

  async function handleSave(data: AdminProject) {
    const isEdit = Boolean(data._id);
    const url = isEdit ? `/api/projects/${data.slug}` : "/api/projects";
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error ?? "Save failed");
    }

    toast.success(isEdit ? "Project updated" : "Project created");
    setModalOpen(false);
    fetchProjects();
  }

  const categories = [...new Set(projects.map((p) => p.category))];

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-white/10 bg-[#0f0f0f]/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-10">
          <div>
            <p className="font-display text-xl tracking-[0.12em]">
              MK <span className="text-[#b5973a]">DESIGNS</span>
            </p>
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/40">Admin Panel</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              View Site
            </a>
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs text-white/60 hover:border-white/30 hover:text-white transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10 lg:px-10">
        {/* Stats */}
        <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            ["Total Projects", projects.length],
            ["Featured", projects.filter((p) => p.featured).length],
            ["Categories", categories.length],
            ["Latest Year", projects[0]?.year ?? "—"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-4"
            >
              <p className="text-2xl font-semibold text-[#b5973a]">{value}</p>
              <p className="mt-1 text-xs text-white/50">{label}</p>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <h1 className="text-lg font-medium">Portfolio Projects</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={async () => {
                const res = await fetch("/api/projects/seed", { method: "POST" });
                const data = await res.json();
                toast.info(data.message ?? data.error);
                fetchProjects();
              }}
              className="rounded-lg border border-white/10 px-3 py-2 text-xs text-white/50 hover:border-white/30 hover:text-white transition-colors"
            >
              Seed from code
            </button>
            <button
              onClick={openAdd}
              className="flex items-center gap-2 rounded-lg bg-[#b5973a] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity"
            >
              <Plus className="h-4 w-4" />
              Add Project
            </button>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center py-32 text-white/30">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 py-32 text-center">
            <ImageIcon className="mb-4 h-10 w-10 text-white/20" />
            <p className="text-white/40">No projects yet.</p>
            <p className="mt-1 text-xs text-white/20">
              Add your first project or seed from existing code.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-left text-xs uppercase tracking-[0.12em] text-white/40">
                  <th className="px-5 py-4">Cover</th>
                  <th className="px-5 py-4">Name</th>
                  <th className="px-5 py-4 hidden md:table-cell">Category</th>
                  <th className="px-5 py-4 hidden lg:table-cell">Location</th>
                  <th className="px-5 py-4 hidden lg:table-cell">Year</th>
                  <th className="px-5 py-4 hidden md:table-cell">Featured</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {projects.map((project) => (
                  <tr key={project.slug} className="hover:bg-white/5 transition-colors">
                    <td className="px-5 py-4">
                      <div className="h-12 w-16 overflow-hidden rounded-md bg-white/10">
                        {project.cover ? (
                          <img
                            src={project.cover}
                            alt={project.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <ImageIcon className="h-4 w-4 text-white/20" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-medium">{project.name}</p>
                      <p className="text-xs text-white/30">{project.slug}</p>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell text-white/60">
                      {project.category}
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell text-white/60">
                      {project.location}
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell text-white/60">
                      {project.year}
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-xs ${
                          project.featured
                            ? "bg-[#b5973a]/20 text-[#b5973a]"
                            : "bg-white/5 text-white/30"
                        }`}
                      >
                        {project.featured ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`/portfolio/${project.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg p-2 text-white/30 hover:bg-white/10 hover:text-white transition-colors"
                          title="View"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                        <button
                          onClick={() => openEdit(project)}
                          className="rounded-lg p-2 text-white/30 hover:bg-white/10 hover:text-white transition-colors"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(project.slug)}
                          disabled={deleting === project.slug}
                          className="rounded-lg p-2 text-white/30 hover:bg-red-500/20 hover:text-red-400 transition-colors disabled:opacity-40"
                          title="Delete"
                        >
                          {deleting === project.slug ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {modalOpen && (
        <ProjectFormModal
          project={editing}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
