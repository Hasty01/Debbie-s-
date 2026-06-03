import React, { useState, useMemo } from "react";
import { PRODUCTS, CATEGORIES } from "../data";
import { ProductCard } from "./ProductCard";
import { motion, AnimatePresence } from "motion/react";
import { SlidersHorizontal, ArrowUpDown, RefreshCw, Layers } from "lucide-react";

export const Collections: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc" | "rating">("default");
  const [showFilters, setShowFilters] = useState(false);

  // Filter and Sort calculation
  const processedProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (selectedCategory !== "all") {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [selectedCategory, sortBy]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSortBy("default");
  };

  return (
    <section
      id="collections"
      className="py-24 px-6 md:px-12 max-w-7xl mx-auto font-sans bg-transparent"
    >
      {/* Visual background element */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full ambient-glow pointer-events-none -translate-y-1/2 select-none" />

      {/* Header and Storytelling Segment */}
      <div className="relative z-10 text-center max-w-4xl mx-auto mb-16 space-y-4">
        <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-luxury-champagne font-semibold block">
          appraisal studio
        </span>
        <h2 className="font-serif text-3xl md:text-5xl font-extralight tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
          Capsule Collection <span className="font-serif italic font-light">Archetypes</span>
        </h2>
        <div className="w-12 h-[1px] bg-luxury-champagne mx-auto my-4" />
        <p className="text-zinc-500 dark:text-zinc-400 font-light text-sm max-w-xl mx-auto leading-relaxed">
          Crafted in single-batch editions to guarantee structural and material isolation. Selected bespoke textiles constructed to breathe organically alongside standard elements.
        </p>
      </div>

      {/* Interactive Controls Bar */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-zinc-200 dark:border-white/10 pb-6 mb-10">
        
        {/* Horizontal Category Selectors (Custom look) */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-3 md:pb-0 scrollbar-none scroll-smooth">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-[10px] md:text-xs font-mono tracking-widest uppercase transition-all duration-300 rounded-full flex-shrink-0 cursor-none border ${
                selectedCategory === cat.id
                  ? "bg-luxury-champagne text-zinc-950 border-transparent shadow-xs"
                  : "bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-900 border-zinc-200 dark:border-white/10 text-zinc-650 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Action controls button */}
        <div className="flex items-center gap-3 justify-between w-full md:w-auto">
          {/* Filters Toggle Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2 border ${
              showFilters
                ? "bg-luxury-champagne/10 border-luxury-champagne text-luxury-champagne"
                : "border-zinc-200 dark:border-white/10 hover:border-zinc-400 dark:hover:border-zinc-500 text-zinc-600 dark:text-zinc-400 bg-white dark:bg-transparent shadow-xs dark:shadow-none"
            } text-xs font-mono tracking-wider rounded-lg flex items-center gap-2 transition-all cursor-none`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Customize</span>
          </button>

          {/* Sorting Dropdown container */}
          <div className="flex items-center gap-2 border border-zinc-200 dark:border-white/10 px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-500 dark:text-zinc-400 bg-white dark:bg-transparent shadow-xs dark:shadow-none">
            <ArrowUpDown className="w-3.5 h-3.5 text-zinc-450 dark:text-zinc-400" />
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-transparent border-none focus:outline-none cursor-none text-zinc-800 dark:text-zinc-300 font-medium"
            >
              <option value="default" className="bg-white dark:bg-matte-black text-zinc-850 dark:text-[#F5F5F5]">Release Default</option>
              <option value="price-asc" className="bg-white dark:bg-matte-black text-zinc-850 dark:text-[#F5F5F5]">Price: Min to Max</option>
              <option value="price-desc" className="bg-white dark:bg-matte-black text-zinc-850 dark:text-[#F5F5F5]">Price: Max to Min</option>
              <option value="rating" className="bg-white dark:bg-matte-black text-zinc-850 dark:text-[#F5F5F5]">Appraiser Stars</option>
            </select>
          </div>
        </div>
      </div>

      {/* Advanced filters dropdown slider */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-8 border-b border-zinc-200 dark:border-white/10 pb-6"
          >
            <div className="bg-white dark:bg-charcoal p-5 rounded-xl border border-zinc-200 dark:border-white/10 flex flex-wrap justify-between items-center gap-4 shadow-sm dark:shadow-none">
              <div className="flex items-center gap-3 text-zinc-850 dark:text-zinc-100">
                <Layers className="w-5 h-5 text-luxury-champagne" />
                <div>
                  <h4 className="text-xs font-mono font-bold tracking-wider uppercase">Atelier Isolation Engine</h4>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Isolating micro-batch runs crafted from fine virgin merino yarn.</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={resetFilters}
                  className="px-3 py-1.5 bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 hover:bg-zinc-200 dark:hover:bg-white/10 text-[10px] font-mono tracking-widest uppercase transition-all rounded text-zinc-700 dark:text-zinc-300 cursor-none"
                >
                  Clear settings
                </button>
                <div className="px-3 py-1.5 bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-[10px] uppercase font-mono tracking-widest rounded select-none">
                  Fully Synchronized
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Products Grid with AnimatePresence */}
      <motion.div layout className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        <AnimatePresence mode="popLayout">
          {processedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </AnimatePresence>
      </motion.div>

      {processedProducts.length === 0 && (
        <div className="text-center py-20 bg-white dark:bg-charcoal border border-zinc-200 dark:border-white/10 rounded-lg shadow-sm dark:shadow-none">
          <RefreshCw className="w-8 h-8 text-zinc-400 dark:text-zinc-650 mx-auto mb-4 animate-spin" />
          <p className="text-sm font-medium text-zinc-650 dark:text-zinc-400">No active capsule items isolated in this sector.</p>
          <button
            onClick={resetFilters}
            className="mt-4 px-4 py-2 border border-luxury-champagne text-luxury-champagne text-xs font-mono uppercase tracking-widest hover:bg-luxury-champagne hover:text-zinc-950 transition-all cursor-none"
          >
            Reload collection
          </button>
        </div>
      )}
    </section>
  );
};
