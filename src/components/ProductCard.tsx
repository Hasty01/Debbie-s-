import React, { useState } from "react";
import { Product } from "../types";
import { useApp } from "./AppContext";
import { Heart, Eye, ShoppingCart, Star } from "lucide-react";
import { motion } from "motion/react";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleWishlist, isInWishlist, addToCart, setActiveQuickViewProduct } = useApp();
  const [isHovered, setIsHovered] = useState(false);
  // No magnifier/zoom active

  // Check if second image exists, else fallback to first
  const displayImage = isHovered && product.images[1] ? product.images[1] : product.images[0];
  const activeWish = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Default selecting first available size and first available color
    const defaultSize = product.sizes[0] || "M";
    const defaultColor = product.colors[0] || { name: "Default", hex: "#000000" };
    addToCart(product, 1, defaultSize, defaultColor);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group flex flex-col justify-between font-sans relative select-none rounded-xl overflow-hidden bg-white dark:bg-charcoal border border-zinc-200 dark:border-white/10 shadow-sm dark:shadow-none hover:shadow-md transition-shadow"
    >
      {/* Product Image Holder */}
      <div 
        className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-950 cursor-pointer"
      >
        <motion.img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-all duration-700 ease-in-out group-hover:scale-[1.03]"
          referrerPolicy="no-referrer"
        />

        {/* Promo badges (e.g., Best seller or New release) */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 transition-opacity duration-300">
          {product.newArrival && (
            <span className="px-2.5 py-1 text-[8px] font-mono font-semibold tracking-wider uppercase bg-matte-black/95 text-zinc-50 border border-white/10 rounded shadow-xs">
              Mélange New
            </span>
          )}
          {product.bestSeller && (
            <span className="px-2.5 py-1 text-[8px] font-mono font-semibold tracking-wider uppercase bg-neon-blue text-zinc-950 rounded shadow-xs">
              Archive Seller
            </span>
          )}
        </div>

        {/* Floating Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center border border-white/10 transition-all cursor-none ${
            activeWish
              ? "bg-luxury-champagne text-zinc-950 border-transparent shadow-md"
              : "bg-matte-black/70 backdrop-blur-md text-zinc-300 hover:text-rose-500 hover:bg-charcoal"
          }`}
          title={activeWish ? "Saved in curation" : "Add to curation"}
        >
          <Heart className={`w-4 h-4 ${activeWish ? "fill-zinc-950" : ""}`} />
        </button>

        {/* Hover label removed as magnifier is disabled */}

        {/* Compact quick-action capsule sliding from bottom */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 flex items-center gap-2 bg-matte-black/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-2xl">
          {/* Quick view button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              setActiveQuickViewProduct(product);
            }}
            className="w-10 h-10 bg-charcoal/90 text-zinc-100 rounded-full flex items-center justify-center border border-white/10 shadow-md cursor-none hover:bg-neon-blue hover:text-zinc-950 transition-colors"
            title="Appraise Detail"
          >
            <Eye className="w-4 h-4" />
          </motion.button>
          
          {/* Quick add bag */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              handleQuickAdd(e);
            }}
            className="w-10 h-10 bg-charcoal/90 text-zinc-100 rounded-full flex items-center justify-center border border-white/10 shadow-md cursor-none hover:bg-neon-blue hover:text-zinc-950 transition-colors"
            title="Express Placement"
          >
            <ShoppingCart className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Metadata Descriptions */}
      <div className="p-4 md:p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          {/* Scent, accessories, tailoring, objects etc label */}
          <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-neon-blue">
            {product.categoryLabel}
          </span>
          <h3 className="text-sm md:text-md text-zinc-900 dark:text-zinc-50 font-medium group-hover:text-luxury-champagne transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 font-light leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Bottom Details Row */}
        <div className="mt-4 flex items-center justify-between border-t border-zinc-150 dark:border-white/10 pt-3">
          <span className="text-sm md:text-[15px] font-mono font-semibold text-zinc-850 dark:text-zinc-50">
            KSh {product.price}
          </span>
          
          <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-500">
            <Star className="w-3.5 h-3.5 fill-luxury-champagne text-luxury-champagne" />
            <span>{product.rating}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
