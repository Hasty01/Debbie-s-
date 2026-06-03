import { Product, LookbookPage, Testimonial, Review } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "L'Manteau Sculptural",
    price: 1250,
    category: "tailoring",
    categoryLabel: "Tailoring & Outerwear",
    description: "Double-breasted trench in heavy architectural wool-gabardine with structured shoulders and an oversized drape.",
    longDescription: "An exploration of architecture on the human frame. Cut from custom-woven, dense Italian wool-gabardine, L'Manteau Sculptural features a strong, drop-shoulder silhouette with exaggerated wide lapels, deep storm flaps, and raw edge finishes. Includes an internal storm belt that allows the jacket to suspend effortlessly from the shoulders. Designed to age with architectural character over decades of wear.",
    details: [
      "Custom double-breasted buttoning structure",
      "Full interior cupro lining with silk satin finishing",
      "Signature storm yoke with modular clasp",
      "Integrated throat latch for upright protection",
      "Deep interior utility pockets"
    ],
    fabric: "85% Heavy Virgin Wool, 15% Mulberry Silk (Italy)",
    origin: "Lovingly tailormade in Milan, Italy",
    images: [
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000",
      "https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=1000",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Obsidian Black", hex: "#121212" },
      { name: "Raw Alabaster", hex: "#EBE6DD" },
      { name: "Gravel Grey", hex: "#4E4E4E" }
    ],
    rating: 4.9,
    reviewsCount: 18,
    featured: true,
    newArrival: true
  },
  {
    id: "p2",
    name: "L'Ombre Tailored Blazer",
    price: 890,
    category: "tailoring",
    categoryLabel: "Tailoring & Outerwear",
    description: "Deconstructed relaxed blazer featuring structured shoulders and zero interior canvas padding for fluid movement.",
    longDescription: "Reimagining modern tailoring without the stiffness. L'Ombre tailored blazer relies entirely on the weight of its double-faced Japanese wool. Fully unlined with hand-bound silk-organza seams, it presents a sculptural silhouette when still while flowing naturally in motion. Complete with genuine horn buttons and soft unstructured sleeves that can be rolled back elegantly.",
    details: [
      "Floating shoulder-pad structure",
      "Hand-rolled peak lapel",
      "Dual hidden front patch pockets",
      "Fully double-vented rear silhouette",
      "Contrast grey organic horn buttons"
    ],
    fabric: "100% Organic Double-Faced Merino Wool (Japan)",
    origin: "Handcrafted in Kurashiki, Japan",
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Gravel Grey", hex: "#4E4E4E" },
      { name: "Obsidian Black", hex: "#121212" }
    ],
    rating: 4.8,
    reviewsCount: 12,
    bestSeller: true
  },
  {
    id: "p3",
    name: "La Soie Slip Dress",
    price: 650,
    category: "atelier",
    categoryLabel: "Atelier Collections",
    description: "An incredibly fluid fluid slip dress with a raw asymmetrical neck and low criss-cross back detailing.",
    longDescription: "Formed on the bias for an unparalleled, liquid-like drape. La Soie slip dress leverages heavy-weight 22momme sandwashed silk satin, creating a matte lustre that catches the softest twilight. Engineered with micro-seams that contour safely to the body's movements and adjustable fine silk tie-straps at the low back.",
    details: [
      "Asymmetrical bias cowl neckline",
      "Low back layout with criss-cross adjustment",
      "Raw edge double-stitched hem styling",
      "Reinforced side-seams for long term stability",
      "Concealed side zipper fastening"
    ],
    fabric: "100% Sandwashed Mulberry Silk (22 Momme)",
    origin: "Assembled in Lyon, France",
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1000",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000"
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Raw Alabaster", hex: "#EBE6DD" },
      { name: "Champagne Gold", hex: "#D4C7B4" },
      { name: "Obsidian Black", hex: "#121212" }
    ],
    rating: 5.0,
    reviewsCount: 31,
    featured: true,
    bestSeller: false
  },
  {
    id: "p4",
    name: "L'Origine Poplin Shirt",
    price: 320,
    category: "atelier",
    categoryLabel: "Atelier Collections",
    description: "Architectural tunic-style shirt in ultra-dense organic cotton-poplin with extended cuffs and a curved split hem.",
    longDescription: "The absolute foundation of design. Cut from long-staple, crisp Egyptian cotton poplin, L'Origine shirt is defined by its architectural stiffness and sharp lines. It features extended elongated 3-button cuffs, a concealed button placket, and a steep curvilinear split hem designed for effortless layering or a dramatic loose stance.",
    details: [
      "Concealed mother-of-pearl front buttons",
      "Elongated architectural double cuffs",
      "Subtle curved split side gusset",
      "Deep box fold on the center-back spine",
      "Ultra-fine 22 stitches per inch sewing"
    ],
    fabric: "100% GOTS Certified Long-Staple Giza Cotton (Egypt)",
    origin: "Stitched by custom atelier in Cairo, Egypt",
    images: [
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Crisp Alabaster", hex: "#F7F5F0" },
      { name: "Obsidian Black", hex: "#121212" }
    ],
    rating: 4.7,
    reviewsCount: 24,
    newArrival: true
  },
  {
    id: "p5",
    name: "Le Tricot Heavy Knit",
    price: 480,
    category: "knitwear",
    categoryLabel: "Knitwear & Sweaters",
    description: "Dense, heavyweight fisherman ribbed knit sweater made from ultra-soft undercoat cashmere and merino wool fiber.",
    longDescription: "An envelope of supreme texture and warmth. Le Tricot is knitted in an authentic full fisherman's rib pattern utilizing 7-gauge machines. Pairing fine wool fiber with premium Mongolian cashmere undercoat creates an incredibly robust yet entirely non-scratchy skin structure. Includes a thick rolled mock neck collar and fully fashioned shoulder lines.",
    details: [
      "Heavyweight 7-gauge ribbed knit structure",
      "Double-ply mock collar architecture",
      "Chunky seamless body styling",
      "Fully fashioned seam highlights",
      "Slightly ballooned relaxed sleeve form"
    ],
    fabric: "70% Merino Wool, 30% Fine Mongolian Cashmere",
    origin: "Lovingly hand-knit in Ulaanbaatar, Mongolia",
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Sand Beige", hex: "#C7B9A5" },
      { name: "Gravel Grey", hex: "#4E4E4E" },
      { name: "Obsidian Black", hex: "#121212" }
    ],
    rating: 4.9,
    reviewsCount: 42,
    featured: true,
    bestSeller: true
  },
  {
    id: "p6",
    name: "L'Oblique Square Toe Boot",
    price: 790,
    category: "accessories",
    categoryLabel: "Accessories & Leather",
    description: "Minimalist zipped leather boot featuring a sharp, low-profile square toe and a stacked leather cuban block heel.",
    longDescription: "The defining line of any silhouette. L'Oblique boots are bench-carved from a single piece of wax-dipped Parisian box calf leather. The leather is drum-dyed for a saturated finish that develops a gorgeous individual patina. Features a heavy-duty gunmetal YKK medial running zipper and fully hand-stitched Goodyear welted leather soles.",
    details: [
      "Full premium calf leather upper and linings",
      "Brutalist chisel-cut modern square toe",
      "Hand-stacked 45mm robust leather block heel",
      "Invisible inner ankle zipper layout",
      "Reinforced custom instep steel shank support"
    ],
    fabric: "100% Parisian Box Calfskin Leather (France)",
    origin: "Handcrafted in Porto, Portugal",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000",
      "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=1000"
    ],
    sizes: ["37", "38", "39", "40", "41", "42", "43", "44"],
    colors: [
      { name: "Obsidian Black", hex: "#121212" },
      { name: "Warm Sienna", hex: "#8B5E3C" }
    ],
    rating: 4.6,
    reviewsCount: 15,
    newArrival: true
  },
  {
    id: "p7",
    name: "L'Air Signature Perfume",
    price: 210,
    category: "objects",
    categoryLabel: "Objects & Scent",
    description: "An evocative fragrance evoking crushed granite dust, cedarwood smoke, damp moss, and crisp morning air.",
    longDescription: "The sensory envelope of Debbie Garmets. L'Air captures the conceptual atmosphere of our design space. It is a slow, cold wood incense perfume that opens with mineral top notes of flint stone, warming down into black tea leaves, warm cedar resin, dried vetiver, and premium white musk. Encased in a massive, brutalist hand-sculpted heavy glass vial with a black stone magnetic closure.",
    details: [
      "Top Notes: Flints stone, mineral sea-salt, fresh bergamot",
      "Heart Notes: Black tea leaves, wet forest moss, dry papyrus",
      "Base Notes: Siberian cedarwood, dark vetiver, cold incense smoke",
      "100ml / 3.4 FL.OZ natural vaporisateur",
      "Hand-numbered collectible stone cap"
    ],
    fabric: "Pure Parfum Extract, Hand-Blown Borosilicate Glass",
    origin: "Distilled and bottled in Grasse, France",
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000"
    ],
    sizes: ["100ml"],
    colors: [
      { name: "Clear Essence", hex: "#FFFFFF" }
    ],
    rating: 4.9,
    reviewsCount: 56,
    bestSeller: true
  },
  {
    id: "p8",
    name: "L'Éclat Structural Torque",
    price: 380,
    category: "objects",
    categoryLabel: "Objects & Scent",
    description: "Heavy open collar choker neck ring in brutalist, raw hand-forged 925 sterling silver with micro-distressed lines.",
    longDescription: "A literal sculpture for the body. The L'Éclat torque chokes comfortably just above the collarbone. Hand-forged by our master silversmith from solid recycled 925 sterling silver, each collar undergoes customized micro-abrasion testing on concrete structures to produce unique weathered markings, merging contemporary design with mineral distress.",
    details: [
      "Solid heavy 100% recycled 925 sterling silver",
      "Hand-chiseled raw asymmetric entry terminals",
      "Natural heat-treated dark silver oxidization lines",
      "Flex-tempered structural core fits all frames",
      "Imprinted with discrete Debbie Garmets workshop assay mark"
    ],
    fabric: "100% Recycled Solid 925 Sterling Silver",
    origin: "Forged in Florence, Italy",
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000"
    ],
    sizes: ["One Size"],
    colors: [
      { name: "Rough Silver", hex: "#D9D9D9" }
    ],
    rating: 5.0,
    reviewsCount: 9,
    newArrival: false,
    featured: true
  }
];

export const LOOKBOOK_PAGES: LookbookPage[] = [
  {
    id: "lb1",
    title: "ARCHETYPES I",
    subtitle: "The Volume Study",
    description: "An architectural exploration of heavy wool-gabardine envelopes surrounding static frames. Designed to celebrate negative space and raw structure.",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000",
    alignment: "left",
    quote: "We don't clothe borders. We sculpt structural voids that breathe with human gait.",
    featuredProductId: "p1"
  },
  {
    id: "lb2",
    title: "ARCHETYPES II",
    subtitle: "Liquid Obsidian",
    description: "Focusing on absolute fluidity. Premium 22momme silk satin cascades along the bias, reflecting soft, grazing light off raw obsidian monoliths.",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1000",
    alignment: "right",
    quote: "A quiet, low-frequency ripple in the fabric of standard luxury dress.",
    featuredProductId: "p3"
  },
  {
    id: "lb3",
    title: "ARCHETYPES III",
    subtitle: "Mineral & Bone",
    description: "A convergence of pure alabaster Egyptian poplin and brutalist recycled silver collared objects. Stripping down form to its absolute white base.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000",
    alignment: "center",
    quote: "Form is nothing but concentrated air. The garments serve only to draft the space.",
    featuredProductId: "p4"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Charlotte Vance",
    role: "Senior Fashion Editor, The Cut & Modernity",
    quote: "Debbie Garmets represents a seismic shift for the minimalist fashion landscape. The weight of the fabrics, the sculptural honesty of the tailoring, and the lack of branding speak directly to the modern curator.",
    rating: 5
  },
  {
    id: "t2",
    name: "Julian Sterling",
    role: "Architect & Spatial Designer",
    quote: "As someone who spends life orchestrating raw concrete and light, wearing L'Manteau Sculptural feels exactly like wearing a beautifully designed space. Total structural visual perfection.",
    rating: 5
  },
  {
    id: "t3",
    name: "Elena Rostova",
    role: "Collector & Creative Director",
    quote: "The details on these garments are magnificent. Seams are hand-rolled and clean, closures feel heavy and tactile. This brand is a silent powerhouse that puts modern couture houses to complete shame.",
    rating: 5
  }
];

export const REVIEWS: Review[] = [
  {
    id: "r1",
    userName: "Alexander K.",
    rating: 5,
    date: "May 12, 2026",
    comment: "The Wool Gabardine used in the Trench is sensational. It flows with an heavy, premium swing. Easily rivals Jil Sander and old Celine.",
    verified: true
  },
  {
    id: "r2",
    userName: "Sonia G.",
    rating: 5,
    date: "April 28, 2026",
    comment: "Pure visual masterpiece. The custom packaging arrived in dense grey compostable stone-paper with a trace of L'Air scent. Absolutely luxurious experience.",
    verified: true
  },
  {
    id: "r3",
    userName: "Marcus V.",
    rating: 4,
    date: "May 03, 2026",
    comment: "The cut of the poplin shirt is extremely wide and dramatic, which I adore, but take note of the measurements. Fabric is incredibly crisp.",
    verified: true
  }
];

export const CATEGORIES = [
  { id: "all", label: "View All" },
  { id: "tailoring", label: "Tailoring & Outerwear" },
  { id: "atelier", label: "Atelier Collections" },
  { id: "knitwear", label: "Knitwear" },
  { id: "accessories", label: "Accessories" },
  { id: "objects", label: "Objects & Scents" }
];
