import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IProject extends Document {
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
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    category: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    year: { type: String, required: true },
    client: { type: String, required: true, trim: true },
    area: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    concept: { type: String, required: true },
    challenge: { type: String, required: true },
    solution: { type: String, required: true },
    services: { type: [String], default: [] },
    cover: { type: String, required: true },
    gallery: { type: [String], default: [] },
    materials: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Project: Model<IProject> =
  mongoose.models.Project ?? mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
