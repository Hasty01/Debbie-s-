import React from "react";
import { LOOKBOOK_PAGES, PRODUCTS } from "../data";
import { useApp } from "./AppContext";
import { motion } from "motion/react";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";

export const Lookbook: React.FC = () => {
  const { setActiveQuickViewProduct, addToast } = useApp();

  return (
    <section
      id="lookbook"
      className="py-24 bg-gradient-to-b from-charcoal to-matte-black text-zinc-50 px-6 md:px-12 relative overflow-hidden font-sans select-none"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full dark:ambient-glow pointer-elements-none select-none" />

      {/* Lookbook section headers */}
      <div className="relative z-10 max-w-7xl mx-auto mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-luxury-champagne font-semibold block">
            editorial narrative
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-extralight tracking-tight text-white leading-tight">
            The Oblique Study <span className="font-serif italic font-light text-luxury-champagne">No. I</span>
          </h2>
        </div>
        <p className="max-w-md text-xs text-zinc-450 leading-relaxed font-light font-sans select-text">
          A poetic visual record documenting architectural volumes floating against minimal structures. Captured at dawn in the stone quarries of Sicily.
        </p>
      </div>

      {/* Lookbook grid list of pages */}
      <div className="relative z-10 max-w-7xl mx-auto space-y-24">
        {LOOKBOOK_PAGES.map((page, idx) => {
          // Resolve matching product shown on lookbook
          const featuredProduct = PRODUCTS.find((p) => p.id === page.featuredProductId);

          return (
            <div
              key={page.id}
              className={`flex flex-col lg:flex-row gap-12 items-center justify-between ${
                page.alignment === "right" ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Left Side (or opposite): Visual display image */}
              <div className="w-full lg:w-3/5 group">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/5 bg-zinc-950 shadow-2xl">
                  <motion.img
                    initial={{ scale: 1.15 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.8, ease: "easeOut" }}
                    src={page.image}
                    alt={page.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[1200ms]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-50" />
                  
                  {/* Floating alignment details */}
                  <div className="absolute bottom-6 left-6 text-left space-y-1 select-none">
                    <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#d4c7b4]">
                      {page.subtitle}
                    </span>
                    <h3 className="text-xl font-serif font-light text-white">{page.title}</h3>
                  </div>
                </div>
              </div>

              {/* Right Side: Editorial text copy & Shoppable feature tag snippet */}
              <div className="w-full lg:w-1/3 text-left space-y-6">
                <span className="text-[10px] font-mono tracking-widest text-[#9c8e75] font-semibold uppercase block">
                  Curation Page 0{idx + 1}
                </span>
                
                <h4 className="font-serif text-lg text-zinc-200 tracking-wide font-normal">
                  {page.description}
                </h4>

                {page.quote && (
                  <p className="border-l border-luxury-champagne pl-4 font-serif italic text-zinc-400 text-sm leading-relaxed">
                    "{page.quote}"
                  </p>
                )}

                {/* Shoppable product link snippet */}
                {featuredProduct && (
                  <motion.div
                    whileHover={{ y: -3 }}
                    onClick={() => {
                      setActiveQuickViewProduct(featuredProduct);
                      addToast(`Examining ${featuredProduct.name} from Lookbook`, "info");
                    }}
                    className="p-4 bg-zinc-950/80 rounded-xl border border-white/5 hover:border-luxury-champagne/40 transition-all cursor-pointer-hover flex gap-4 items-center"
                  >
                    <img
                      src={featuredProduct.images[0]}
                      alt={featuredProduct.name}
                      className="w-14 h-14 object-cover rounded bg-[#1c1d22]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-luxury-champagne flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-luxury-champagne" /> Examine garment
                      </span>
                      <h5 className="text-xs font-medium text-white tracking-wide mt-1.5 font-sans">
                        {featuredProduct.name}
                      </h5>
                      <span className="text-[11px] font-mono text-zinc-450">${featuredProduct.price}</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-luxury-champagne hover:text-zinc-950 transition-all text-white">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Lookbook bottom action button segment */}
      <div className="max-w-xl mx-auto text-center mt-24">
        <div className="inline-flex gap-2 items-center text-luxury-champagne mb-4">
          <BookOpen className="w-5 h-5" />
          <span className="tracking-widest font-mono text-[10px] uppercase">Physical dispatch</span>
        </div>
        <h4 className="font-serif font-light text-xl text-zinc-150 mb-3">Order Physical Sicily Volume</h4>
        <p className="text-xs text-zinc-450 mb-6 leading-relaxed max-w-sm mx-auto">
          Every order above $1,000 automatically includes our hand-pasted 240g cold-pressed Sicily linen lookbook magazine.
        </p>
        <button
          onClick={() => addToast("Sicilian Lookbook added to qualified basket items", "success")}
          className="border border-white/20 hover:border-luxury-champagne text-white hover:text-luxury-champagne px-6 py-2 rounded-lg font-mono text-xs uppercase tracking-widest transition-colors cursor-none"
        >
          Check Eligibility
        </button>
      </div>

    </section>
  );
};
