export type TravelPackage = {
  id: number;
  title: string;
  origins: string[];
  destination: string;
  country: string;
  price: number;
  discount?: number;
  duration: string;
  durationDays: number;
  rating: number;
  image: string;
  gallery: string[];
  description: string;
  fullDescription: string;
  category: "Praia" | "Parque" | "Monumento" | "Cidade" | "Natureza";
  packageType:
    | "Econômico"
    | "Família"
    | "Romântico"
    | "Aventura"
    | "Cultural"
    | "Premium";
  includes: string[];
  featured: boolean;
};
