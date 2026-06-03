import React, { useState, useEffect } from "react";
import { useApp } from "./AppContext";
import { REVIEWS } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { X, Heart, Star, ShoppingBag, ShieldCheck, Truck, RefreshCw } from "lucide-react";

export const QuickViewModal: React.FC = () => {
  const {
    activeQuickViewProduct,
    setActiveQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
  } = useApp();

  const product = activeQuickViewProduct;

  // Selected state settings
  const [activeImage, setActiveImage] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string }>({ name: "", hex: "" });
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"details" | "reviews">("details");

  const [showMagnifier, setShowMagnifier] = useState(false);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [[mouseX, mouseY], setMouseCoords] = useState([0, 0]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const elem = e.currentTarget;
    const { top, left, width, height } = elem.getBoundingClientRect();
    
    // Calculate cursor position relative to the container
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    setMouseCoords([x, y]);
    setSize([width, height]);
  };

  // Sync state variables whenever dynamic popup product switches
  useEffect(() => {
    if (product) {
      setActiveImage(product.images[0]);
      setSelectedSize(product.sizes[0] || "M");
      setSelectedColor(product.colors[0] || { name: "Default", hex: "#000000" });
      setQuantity(1);
      setActiveTab("details");
    }
  }, [product]);

  if (!product) return null;

  const handleAddBag = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    setActiveQuickViewProduct(null);
  };

  const activeWish = isInWishlist(product.id);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 select-none font-sans">
        
        {/* Soft Backdrop blur layer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setActiveQuickViewProduct(null)}
          className="absolute inset-0 bg-zinc-950/70 backdrop-blur-md"
        />

        {/* Modal Main Frame */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 220 }}
          className="relative w-full max-w-5xl bg-white dark:bg-matte-black border border-zinc-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row z-10"
        >
          
          {/* Close trigger button */}
          <button
            onClick={() => setActiveQuickViewProduct(null)}
            className="absolute top-5 right-5 z-20 p-1.5 rounded-full bg-zinc-100 dark:bg-charcoal/80 hover:bg-zinc-200 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-white/10 cursor-none transition-colors"
          >
            <X className="w-5 h-5 text-zinc-600 dark:text-white" />
          </button>

          {/* Left panel: Image gallery presentation */}
          <div className="w-full md:w-1/2 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-zinc-205 dark:border-white/10 bg-zinc-50 dark:bg-charcoal">
            <div 
              onMouseEnter={() => setShowMagnifier(true)}
              onMouseLeave={() => setShowMagnifier(false)}
              onMouseMove={handleMouseMove}
              className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-zinc-100 dark:bg-matte-black shadow-inner group cursor-crosshair"
            >
              <motion.img
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />

              {/* Appraiser's Loupe (High-fidelity magnifying glass hover effect) */}
              {showMagnifier && (
                <div
                  style={{
                    position: "absolute",
                    pointerEvents: "none",
                    height: "160px",
                    width: "160px",
                    borderRadius: "50%",
                    border: "1.5px solid #00F0FF", // Neon Blue Loupe border
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.75), inset 0 0 15px rgba(0,0,0,0.5), 0 0 0 4px rgba(0,0,0,0.3)",
                    backgroundColor: "#000",
                    // Center the loupe at coordinates
                    left: `${mouseX - 80}px`,
                    top: `${mouseY - 80}px`,
                    backgroundImage: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: `${imgWidth * 2.5}px ${imgHeight * 2.5}px`,
                    backgroundPosition: `${-mouseX * 2.5 + 80}px ${-mouseY * 2.5 + 80}px`,
                    zIndex: 30,
                  }}
                  className="hidden md:block"
                >
                  {/* Fine Appraiser Reticle Center-lines */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 relative">
                      <div className="absolute top-1/2 left-0 right-0 h-[0.5px] bg-[#00F0FF]/40 -translate-y-1/2" />
                      <div className="absolute left-1/2 top-0 bottom-0 w-[0.5px] bg-[#00F0FF]/40 -translate-x-1/2" />
                      <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-neon-blue -translate-x-1/2 -translate-y-1/2 opacity-65" />
                    </div>
                  </div>
                  
                  {/* Subtle Zoom multiplier label inside loupe */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[7px] font-mono tracking-[0.25em] text-neon-blue bg-black/75 px-1.5 py-0.5 rounded-xs uppercase font-medium">
                    2.5x Loupe
                  </div>
                </div>
              )}

              {/* Loupe active coordinate tracker */}
              {showMagnifier && (
                <div className="absolute bottom-4 left-4 z-10 pointer-events-none hidden md:block">
                  <span className="px-2 py-1 text-[8px] font-mono tracking-[0.15em] uppercase bg-matte-black/90 text-neon-blue backdrop-blur-md rounded border border-white/10 shadow-md">
                    Weave Loupe • X:{Math.round((mouseX / (imgWidth || 1)) * 100)}% Y:{Math.round((mouseY / (imgHeight || 1)) * 100)}%
                  </span>
                </div>
              )}

              {/* Informative hover-to-inspect overlay badge */}
              <div className="absolute top-4 left-4 z-10 pointer-events-none bg-matte-black/65 backdrop-blur-md px-2.5 py-1 rounded border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-[8px] font-mono tracking-[0.25em] text-[#00F0FF] uppercase hidden md:inline-block">
                Hover to inspect textile weave
              </div>
            </div>

            {/* Galleria Thumbnails bar */}
            {product.images.length > 1 && (
              <div className="flex gap-2.5 mt-4 justify-center">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-14 h-14 rounded-md overflow-hidden bg-white dark:bg-neutral-900 border-2 transition-all cursor-none ${
                      activeImage === img ? "border-neon-blue scale-105" : "border-transparent opacity-65"
                    }`}
                  >
                    <img src={img} alt="thmb" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right panel: Details description metrics */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[80vh] md:max-h-[90vh] text-zinc-800 dark:text-[#F5F5F5] bg-white dark:bg-matte-black">
            <div className="space-y-6">
              
              {/* Category label & Curation buttons */}
              <div className="flex justify-between items-center pr-8">
                <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#D4AF37]">
                  {product.categoryLabel}
                </span>
                
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`flex items-center gap-1 text-[11px] font-mono tracking-wider transition-colors cursor-none ${
                    activeWish ? "text-[#D4AF37]" : "text-zinc-400 hover:text-rose-500"
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${activeWish ? "fill-luxury-champagne" : ""}`} />
                  <span>{activeWish ? "In Curation" : "Save Curation"}</span>
                </button>
              </div>

              {/* Title & Price */}
              <div className="space-y-2">
                <h3 className="font-serif text-2xl md:text-3xl font-light tracking-wide text-zinc-900 dark:text-white">{product.name}</h3>
                <div className="flex items-center gap-4">
                  <span className="text-xl font-mono font-medium text-zinc-800 dark:text-white">${product.price}</span>
                  <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-[#121212] border border-zinc-200 dark:border-white/10 px-2.5 py-1 text-xs font-mono rounded-md text-zinc-600 dark:text-zinc-300">
                    <Star className="w-3.5 h-3.5 fill-luxury-champagne text-luxury-champagne" />
                    <span>{product.rating} / 5</span>
                    <span className="text-zinc-400">({product.reviewsCount} reviews)</span>
                  </div>
                </div>
              </div>

              <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-450 leading-relaxed font-light font-sans">
                {product.longDescription}
              </p>

              {/* Tabs selector detail specs Vs Reviews */}
              <div className="border-b border-zinc-200 dark:border-white/10 flex gap-6 text-[11px] font-mono uppercase tracking-widest">
                <button
                  onClick={() => setActiveTab("details")}
                  className={`pb-2 transition-all cursor-none ${
                    activeTab === "details" ? "border-b-2 border-luxury-champagne text-zinc-900 dark:text-white" : "text-zinc-500 dark:text-zinc-400"
                  }`}
                >
                  Composition & details
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`pb-2 transition-all cursor-none ${
                    activeTab === "reviews" ? "border-b-2 border-luxury-champagne text-zinc-900 dark:text-white" : "text-zinc-500 dark:text-zinc-400"
                  }`}
                >
                  Appraiser logs
                </button>
              </div>

              {/* Dynamic bottom tabs */}
              <div className="text-xs font-sans min-h-[120px]">
                {activeTab === "details" ? (
                  <div className="space-y-3">
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-zinc-550 dark:text-zinc-400 text-xs font-serif italic">
                      {product.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-luxury-champagne text-lg leading-none select-none">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-4 border-t border-zinc-200 dark:border-white/10 space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-zinc-500 dark:text-zinc-400 font-mono text-[10px] uppercase">Fabric specification:</span>
                        <span className="font-medium text-zinc-750 dark:text-zinc-300">{product.fabric}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-550 dark:text-zinc-400 font-mono text-[10px] uppercase">Artisan dispatch:</span>
                        <span className="font-medium text-zinc-750 dark:text-zinc-300">{product.origin}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[160px] overflow-y-auto pr-2">
                    {REVIEWS.map((rev) => (
                      <div key={rev.id} className="p-3 bg-zinc-50 dark:bg-charcoal border border-zinc-200 dark:border-white/10 text-zinc-800 dark:text-white rounded-md">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-xs text-zinc-900 dark:text-white">{rev.userName}</span>
                          <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400">{rev.date}</span>
                        </div>
                        <p className="font-light text-zinc-650 dark:text-zinc-400 mt-1 italic text-xs">"{rev.comment}"</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Color & Size Toggles */}
              <div className="grid grid-cols-2 gap-4 border-t border-zinc-200 dark:border-white/10 pt-5">
                
                {/* Size toggle */}
                <div>
                  <span className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-2.5">
                    Frame Size
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`w-9 h-9 rounded text-xs font-mono transition-all cursor-none border ${
                          selectedSize === sz
                            ? "bg-luxury-champagne text-zinc-950 border-transparent font-bold"
                            : "bg-transparent border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:border-zinc-450"
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color toggles with dynamicHEX display */}
                <div>
                  <span className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-2.5">
                    Fabric Shade
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((col) => (
                      <button
                        key={col.name}
                        onClick={() => setSelectedColor(col)}
                        title={col.name}
                        className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all cursor-none ${
                          selectedColor.name === col.name ? "border-luxury-champagne ring-2 ring-luxury-champagne/30" : "border-zinc-200 dark:border-white/10"
                        }`}
                      >
                        <span
                          className="w-5.5 h-5.5 rounded-full block border border-black/10 shadow-inner"
                          style={{ backgroundColor: col.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Panel: Placing order */}
            <div className="border-t border-zinc-200 dark:border-white/10 pt-6 mt-6 flex gap-4 items-center">
              
              {/* Qty count */}
              <div className="flex items-center border border-zinc-200 dark:border-white/10 rounded-lg bg-transparent py-2.5">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3.5 text-zinc-550 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors font-semibold text-sm cursor-none"
                >
                  -
                </button>
                <span className="px-3 text-sm font-mono font-bold text-zinc-850 dark:text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3.5 text-zinc-550 dark:text-zinc-400 hover:text-zinc-955 dark:hover:text-zinc-100 transition-colors font-semibold text-sm cursor-none"
                >
                  +
                </button>
              </div>

              {/* Add main button */}
              <button
                onClick={handleAddBag}
                className="flex-1 py-3.5 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-955 text-xs font-mono uppercase tracking-[0.2em] rounded-lg hover:bg-luxury-champagne dark:hover:bg-luxury-champagne hover:text-neutral-900 transition-colors flex items-center justify-center gap-2 cursor-none"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Simulate Bag Placement</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2.5 text-center text-[10px] font-mono tracking-widest text-zinc-550 dark:text-zinc-400 bg-zinc-50 dark:bg-charcoal p-3 rounded-lg border border-zinc-200 dark:border-white/10 mt-4">
              <div className="flex flex-col items-center gap-1 leading-normal">
                <ShieldCheck className="w-4.5 h-4.5 text-luxury-champagne" />
                <span>100% Insured</span>
              </div>
              <div className="flex flex-col items-center gap-1 leading-normal border-x border-zinc-200 dark:border-white/10">
                <Truck className="w-4.5 h-4.5 text-luxury-champagne" />
                <span>Express Cargo</span>
              </div>
              <div className="flex flex-col items-center gap-1 leading-normal">
                <RefreshCw className="w-4.5 h-4.5 text-luxury-champagne" />
                <span>Easy Return</span>
              </div>
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
