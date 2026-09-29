"use client";

import { useState, useRef } from "react";
import { X, Loader2, Plus, Trash2, Upload, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { type AdminProject } from "./admin-dashboard";

const CATEGORIES = [
  "Residential",
  "Villa",
  "Apartment",
  "Commercial",
  "Office",
  "Hospitality",
  "Renovation",
];

const EMPTY: AdminProject = {
  name: "",
  slug: "",
  category: "Residential",
  location: "",
  year: String(new Date().getFullYear()),
  client: "",
  area: "",
  description: "",
  concept: "",
  challenge: "",
  solution: "",
  services: [""],
  cover: "",
  gallery: [""],
  materials: [""],
  featured: false,
};

function toSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

interface Props {
  project: AdminProject | null;
  onClose: () => void;
  onSave: (data: AdminProject) => Promise<void>;
}

export function ProjectFormModal({ project, onClose, onSave }: Props) {
  const [form, setForm] = useState<AdminProject>(project ?? EMPTY);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [error, setError] = useState("");

  const coverInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRefs = useRef<Map<number, HTMLInputElement>>(new Map());

  const isEdit = Boolean(project);

  async function handleFileUpload(
    file: File,
    target: "cover" | { gallery: number }
  ): Promise<void> {
    const uploadId = typeof target === "string" ? target : `gallery-${target.gallery}`;
    setUploading(uploadId);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Upload failed");
      }

      const { url } = await res.json();

      // Update form state with the uploaded URL
      if (target === "cover") {
        set("cover", url);
      } else {
        setArr("gallery", target.gallery, url);
      }

      toast.success("Image uploaded");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Upload failed";
      toast.error(message);
    } finally {
      setUploading(null);
    }
  }

  function triggerFileInput(type: "cover" | { gallery: number }) {
    if (type === "cover") {
      coverInputRef.current?.click();
    } else {
      galleryInputRefs.current.get(type.gallery)?.click();
    }
  }

  function set<K extends keyof AdminProject>(key: K, value: AdminProject[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function setArr(key: "services" | "gallery" | "materials", index: number, value: string) {
    setForm((prev) => {
      const arr = [...prev[key]];
      arr[index] = value;
      return { ...prev, [key]: arr };
    });
  }

  function addArr(key: "services" | "gallery" | "materials") {
    setForm((prev) => ({ ...prev, [key]: [...prev[key], ""] }));
  }

  function removeArr(key: "services" | "gallery" | "materials", index: number) {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].filter((_, i) => i !== index),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    // Clean empty array values
    const cleaned: AdminProject = {
      ...form,
      services: form.services.filter(Boolean),
      gallery: form.gallery.filter(Boolean),
      materials: form.materials.filter(Boolean),
    };

    try {
      await onSave(cleaned);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  const inputCls =
    "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-[#b5973a] transition-colors";
  const labelCls = "block text-xs uppercase tracking-[0.12em] text-white/40 mb-1.5";

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/80 p-4 pt-10 backdrop-blur"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0f0f0f] pb-8">
        {/* Modal header */}
        <div className="sticky top-0 flex items-center justify-between border-b border-white/10 bg-[#0f0f0f] px-7 py-5">
          <h2 className="font-display text-xl">
            {isEdit ? `Edit — ${project!.name}` : "Add New Project"}
          </h2>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 px-7 pt-7">
          {error && (
            <p className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</p>
          )}

          {/* Row: Name + Slug */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Project Name *</label>
              <input
                className={inputCls}
                required
                value={form.name}
                onChange={(e) => {
                  set("name", e.target.value);
                  if (!isEdit) set("slug", toSlug(e.target.value));
                }}
                placeholder="The Ivory Residence"
              />
            </div>
            <div>
              <label className={labelCls}>Slug *</label>
              <input
                className={inputCls}
                required
                value={form.slug}
                onChange={(e) => set("slug", toSlug(e.target.value))}
                placeholder="the-ivory-residence"
              />
            </div>
          </div>

          {/* Row: Category + Location */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Category *</label>
              <select
                className={inputCls}
                required
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c} className="bg-[#1a1a1a]">
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Location *</label>
              <input
                className={inputCls}
                required
                value={form.location}
                onChange={(e) => set("location", e.target.value)}
                placeholder="Rajkot, Gujarat"
              />
            </div>
          </div>

          {/* Row: Year + Client + Area */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className={labelCls}>Year *</label>
              <input
                className={inputCls}
                required
                value={form.year}
                onChange={(e) => set("year", e.target.value)}
                placeholder="2025"
              />
            </div>
            <div>
              <label className={labelCls}>Client *</label>
              <input
                className={inputCls}
                required
                value={form.client}
                onChange={(e) => set("client", e.target.value)}
                placeholder="Private Residence"
              />
            </div>
            <div>
              <label className={labelCls}>Area *</label>
              <input
                className={inputCls}
                required
                value={form.area}
                onChange={(e) => set("area", e.target.value)}
                placeholder="4,800 sq ft"
              />
            </div>
          </div>

          {/* Cover Image URL */}
          <div>
            <label className={labelCls}>Cover Image *</label>
            <div className="flex gap-2">
              <input
                className={inputCls}
                required
                value={form.cover}
                onChange={(e) => set("cover", e.target.value)}
                placeholder="https://... or /uploads/image.jpg"
              />
              <button
                type="button"
                onClick={() => triggerFileInput("cover")}
                disabled={uploading === "cover"}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/70 hover:border-[#b5973a] hover:text-white transition-colors disabled:opacity-50"
                title="Upload image"
              >
                {uploading === "cover" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4" />
                )}
              </button>
            </div>
            <input
              ref={coverInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file, "cover");
                e.target.value = "";
              }}
            />
            {form.cover && (
              <div className="relative mt-2 overflow-hidden rounded-lg">
                <img
                  src={form.cover}
                  alt="Cover preview"
                  className="h-32 w-full object-cover"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className={labelCls}>Short Description *</label>
            <textarea
              className={`${inputCls} resize-none`}
              required
              rows={2}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="A quiet, light-filled home…"
            />
          </div>

          {/* Concept / Challenge / Solution */}
          {(["concept", "challenge", "solution"] as const).map((field) => (
            <div key={field}>
              <label className={labelCls}>{field.charAt(0).toUpperCase() + field.slice(1)} *</label>
              <textarea
                className={`${inputCls} resize-none`}
                required
                rows={3}
                value={form[field]}
                onChange={(e) => set(field, e.target.value)}
              />
            </div>
          ))}

          {/* Dynamic arrays */}
          {(
            [
              ["services", "Services"],
              ["materials", "Materials & Finishes"],
            ] as const
          ).map(([key, label]) => (
            <div key={key}>
              <label className={labelCls}>{label}</label>
              <div className="space-y-2">
                {form[key].map((val, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      className={inputCls}
                      value={val}
                      onChange={(e) => setArr(key, i, e.target.value)}
                      placeholder="Enter value"
                    />
                    {form[key].length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArr(key, i)}
                        className="rounded-lg border border-white/10 p-2 text-white/30 hover:border-red-500/40 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArr(key)}
                  className="flex items-center gap-1.5 text-xs text-white/30 hover:text-[#b5973a] transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add {label.split(" ")[0]}
                </button>
              </div>
            </div>
          ))}

          {/* Gallery with upload buttons */}
          <div>
            <label className={labelCls}>Gallery Images *</label>
            <div className="space-y-2">
              {form.gallery.map((val, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      className={inputCls}
                      value={val}
                      onChange={(e) => setArr("gallery", i, e.target.value)}
                      placeholder="https://... or /uploads/image.jpg"
                    />
                    <button
                      type="button"
                      onClick={() => triggerFileInput({ gallery: i })}
                      disabled={uploading === `gallery-${i}`}
                      className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/70 hover:border-[#b5973a] hover:text-white transition-colors disabled:opacity-50"
                      title="Upload image"
                    >
                      {uploading === `gallery-${i}` ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Upload className="h-4 w-4" />
                      )}
                    </button>
                    {form.gallery.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArr("gallery", i)}
                        className="rounded-lg border border-white/10 p-2 text-white/30 hover:border-red-500/40 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <input
                    ref={(el) => {
                      if (el) galleryInputRefs.current.set(i, el);
                    }}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file, { gallery: i });
                      e.target.value = "";
                    }}
                  />
                  {val && (
                    <div className="relative overflow-hidden rounded-lg">
                      <img
                        src={val}
                        alt={`Gallery ${i + 1}`}
                        className="h-24 w-full object-cover"
                        onError={(e) => (e.currentTarget.style.display = "none")}
                      />
                    </div>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArr("gallery")}
                className="flex items-center gap-1.5 text-xs text-white/30 hover:text-[#b5973a] transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Gallery Image
              </button>
            </div>
          </div>

          {/* Featured */}
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => set("featured", e.target.checked)}
              className="h-4 w-4 accent-[#b5973a]"
            />
            <span className="text-sm text-white/70">Mark as Featured</span>
          </label>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-white/10 px-5 py-2.5 text-sm text-white/60 hover:border-white/30 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-lg bg-[#b5973a] px-6 py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              {isEdit ? "Save Changes" : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
