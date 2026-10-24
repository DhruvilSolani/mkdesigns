import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IProject extends Document {
  name: string;
  slug: string;
  category?: string;
  location?: string;
  year?: string;
  client?: string;
  area?: string;
  description?: string;
  concept?: string;
  challenge?: string;
  solution?: string;
  services: string[];
  cover?: string;
  gallery: string[];
  materials: string[];
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    category: { type: String, trim: true },
    location: { type: String, trim: true },
    year: { type: String },
    client: { type: String, trim: true },
    area: { type: String, trim: true },
    description: { type: String },
    concept: { type: String },
    challenge: { type: String },
    solution: { type: String },
    services: { type: [String], default: [] },
    cover: { type: String },
    gallery: { type: [String], default: [] },
    materials: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Project: Model<IProject> =
  mongoose.models.Project ?? mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
