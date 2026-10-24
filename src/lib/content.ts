// Images are imported as Next.js StaticImageData; we extract .src so all
// cover/gallery fields remain plain strings compatible with <img src={...}>.
import _ivoryResidence from "@/assets/ivory-residence.jpg";
import _casaVerde from "@/assets/casa-verde.jpg";
import _modernVilla from "@/assets/modern-villa.jpg";
import _urbanLuxe from "@/assets/urban-luxe.jpg";
import _heritageResidence from "@/assets/heritage-residence.jpg";
import _minimalHouse from "@/assets/minimal-house.jpg";

const ivoryResidence = _ivoryResidence.src;
const casaVerde = _casaVerde.src;
const modernVilla = _modernVilla.src;
const urbanLuxe = _urbanLuxe.src;
const heritageResidence = _heritageResidence.src;
const minimalHouse = _minimalHouse.src;

export const brand = {
  name: "MK Designs",
  phone: "+91 8000620005",
  email: "contact@mkdesigns.com",
  address: "Rajkot · Gujarat · India",
  instagram: "https://instagram.com/",
  whatsapp: "https://wa.me/918000620005",
};

export type Project = {
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

export const projects: Project[] = [
  {
    name: "The Ivory Residence",
    slug: "the-ivory-residence",
    category: "Residential",
    location: "Rajkot, Gujarat",
    year: "2026",
    client: "Private Residence",
    area: "4,800 sq ft",
    description: "A quiet, light-filled home shaped by natural stone, warm timber and a sense of effortless calm.",
    concept: "The interior draws from the softness of ivory limestone and the measured rhythm of handcrafted joinery, creating a home that changes gently with the daylight.",
    challenge: "The brief called for an expansive social home that still felt intimate, tactile and deeply personal.",
    solution: "We framed open spaces with material transitions, sculptural furniture and layered lighting, balancing generous scale with moments of retreat.",
    services: ["Interior design", "Furniture design", "Lighting", "Styling"],
    cover: ivoryResidence,
    gallery: [ivoryResidence, minimalHouse, heritageResidence, casaVerde],
    materials: ["Travertine", "Walnut", "Linen", "Brass", "Fluted glass", "Plaster"],
    featured: true,
  },
  {
    name: "Casa Verde",
    slug: "casa-verde",
    category: "Villa",
    location: "Ahmedabad, Gujarat",
    year: "2025",
    client: "Private Villa",
    area: "7,200 sq ft",
    description: "A garden-led villa where interior design, landscape and daily life flow into one another.",
    concept: "Deep green stone and mature planting bring the garden into the centre of the home.",
    challenge: "To create privacy without losing openness or natural light.",
    solution: "Courtyards and layered thresholds organize each room around views of nature.",
    services: ["Interior design", "Landscape coordination"],
    cover: casaVerde,
    gallery: [casaVerde, modernVilla, minimalHouse, ivoryResidence],
    materials: ["Green marble", "Oak", "Linen", "Bronze", "Glass"],
    featured: true,
  },
  {
    name: "The Modern Villa",
    slug: "the-modern-villa",
    category: "Villa",
    location: "Surat, Gujarat",
    year: "2026",
    client: "Private Villa",
    area: "9,500 sq ft",
    description: "A cinematic family villa with dramatic volumes and calm, finely resolved interiors.",
    concept: "Monumental geometry softened by warm light and tactile materials.",
    challenge: "Bringing human scale to a double-height plan.",
    solution: "Layered ceilings, art, furniture groupings and reflected water anchor the volume.",
    services: ["Interior design", "Art curation"],
    cover: modernVilla,
    gallery: [modernVilla, urbanLuxe, ivoryResidence, casaVerde],
    materials: ["Limestone", "Dark oak", "Bronze", "Leather", "Glass"],
    featured: true,
  },
  {
    name: "Urban Luxe Apartment",
    slug: "urban-luxe-apartment",
    category: "Apartment",
    location: "Mumbai, Maharashtra",
    year: "2025",
    client: "Private Apartment",
    area: "2,600 sq ft",
    description: "A composed city home with rich textures, precise detailing and atmospheric light.",
    concept: "Metropolitan restraint with a warm, collected soul.",
    challenge: "Maximizing storage while preserving openness.",
    solution: "Integrated cabinetry and dark reflective surfaces create visual depth.",
    services: ["Interior design", "Custom furniture", "Styling"],
    cover: urbanLuxe,
    gallery: [urbanLuxe, ivoryResidence, minimalHouse, modernVilla],
    materials: ["Charcoal stone", "Walnut", "Smoked glass", "Metal"],
    featured: true,
  },
  {
    name: "Heritage Residence",
    slug: "heritage-residence",
    category: "Renovation",
    location: "Udaipur, Rajasthan",
    year: "2024",
    client: "Private Residence",
    area: "5,100 sq ft",
    description: "A sensitive renewal that lets historic craftsmanship and contemporary life coexist.",
    concept: "Restoration without nostalgia—preserving memory while introducing clarity.",
    challenge: "Modernizing services while respecting the original design.",
    solution: "New systems were discreetly integrated behind restored lime plaster and stonework.",
    services: ["Renovation", "Interior design", "Conservation coordination"],
    cover: heritageResidence,
    gallery: [heritageResidence, ivoryResidence, casaVerde, minimalHouse],
    materials: ["Lime plaster", "Sandstone", "Teak", "Cane", "Brass"],
    featured: true,
  },
  {
    name: "The Minimal House",
    slug: "the-minimal-house",
    category: "Residential",
    location: "Vadodara, Gujarat",
    year: "2025",
    client: "Private Residence",
    area: "3,400 sq ft",
    description: "A serene home distilled to natural light, honest materials and purposeful objects.",
    concept: "A calm backdrop for everyday rituals.",
    challenge: "Creating warmth within a rigorously minimal language.",
    solution: "Natural grain, tactile plaster and carefully placed daylight soften the architecture.",
    services: ["Interior architecture", "Kitchen design", "Styling"],
    cover: minimalHouse,
    gallery: [minimalHouse, casaVerde, heritageResidence, ivoryResidence],
    materials: ["Pale oak", "Limestone", "Plaster", "Linen"],
    featured: true,
  },
];

export const services = [
  ["Residential Interior Design", "Complete interiors for homes and residences, composed around the way you live."],
  ["Luxury Villa Design", "Architecture and interiors shaped as one refined, immersive experience."],
  ["Commercial Interiors", "Distinctive offices, retail, showrooms, clinics and corporate spaces."],
  ["Apartment Interiors", "Intelligent spatial planning and crafted detail for contemporary city living."],
  ["Office Interiors", "Focused workplaces that express culture and support everyday performance."],
  ["Hospitality Design", "Memorable hotels, cafés, restaurants, resorts and lounges."],
  ["Renovation & Remodeling", "Thoughtful transformations through new layouts, materials and light."],
  ["Turnkey Interior Solutions", "A complete journey from design development through final handover."],
  ["3D Visualization & Design", "Photorealistic views that make every decision clear before execution."],
] as const;

export const testimonials = [
  {
    quote: "MK Designs completely transformed our home. Every detail feels intentional and beautifully executed.",
    name: "Private Client",
    project: "Residential Interior",
    location: "Rajkot",
  },
  {
    quote: "The team understood our vision and turned it into a space that exceeded our expectations.",
    name: "Private Client",
    project: "Luxury Villa",
    location: "Ahmedabad",
  },
  {
    quote: "A rare balance of creativity, clarity and meticulous execution from the first sketch to handover.",
    name: "Commercial Client",
    project: "Office Interior",
    location: "Surat",
  },
];

export const processSteps = [
  "Consultation",
  "Site & Space Analysis",
  "Concept Development",
  "Design Development",
  "3D Visualization",
  "Execution",
  "Final Styling",
  "Handover",
];

export const stats = [
  ["10+", "Years of Experience"],
  ["100+", "Projects Completed"],
  ["50+", "Happy Clients"],
  ["15+", "Design Awards"],
];

export const serviceImages = [
  ivoryResidence,
  modernVilla,
  urbanLuxe,
  minimalHouse,
  modernVilla,
  casaVerde,
  heritageResidence,
  casaVerde,
  minimalHouse,
];
