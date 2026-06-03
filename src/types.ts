export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  categoryLabel: string;
  description: string;
  longDescription: string;
  details: string[];
  fabric: string;
  origin: string;
  images: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  rating: number;
  reviewsCount: number;
  featured?: boolean;
  newArrival?: boolean;
  bestSeller?: boolean;
  lookbookId?: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface LookbookPage {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  alignment: "left" | "right" | "center";
  quote?: string;
  featuredProductId?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: { name: string; hex: string };
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
}
