import React from "react";
import { motion } from "motion/react";
import { ArrowDownRight, Sparkles } from "lucide-react";

export const Hero: React.FC = () => {
  const handleScrollDown = () => {
    const section = document.querySelector("#collections");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="hero"
      className="relative h-[100vh] w-full flex items-center justify-center overflow-hidden font-sans select-none"
    >
      {/* Dynamic Background Image Layer */}
      <div className="absolute inset-0 bg-zinc-950">
        <motion.img
          initial={{ scale: 1.15, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 0.8 }}
          transition={{ duration: 3, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=2000"
          alt="Debbie Garmets Premium Autumn/Winter"
          className="w-full h-full object-cover object-center brightness-[0.45] dark:brightness-[0.35]"
          referrerPolicy="no-referrer"
        />
        {/* Ambient Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 via-transparent to-zinc-950/40 dark:from-matte-black dark:to-matte-black/40" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-col justify-end h-full pb-20 md:pb-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Tagline micro-capsule */}
          <motion.div
            variants={textVariants}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border border-white/10 text-[9px] font-mono tracking-[0.25em] text-[#00F0FF] uppercase mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#00F0FF] animate-pulse" />
            Capsule I : archetypes
          </motion.div>

          {/* Main Display Headlines */}
          <motion.h1
            variants={textVariants}
            className="font-serif text-4xl sm:text-6xl md:text-8xl font-extralight tracking-[-0.03em] text-white leading-[0.95]"
          >
            Sculpting <br />
            <span className="font-serif italic font-light text-luxury-champagne">Spatial Silhouettes</span>
          </motion.h1>

          <motion.p
            variants={textVariants}
            className="mt-6 text-sm sm:text-md md:text-lg text-zinc-300 dark:text-zinc-400 font-light max-w-lg leading-relaxed tracking-wide"
          >
            An inquiry into structural volume, negative space, and premium material honesty. Built from core Virgin Wool, Egyptian Cotton, and recycled Sterling Silver.
          </motion.p>

          {/* Action CTA buttons */}
          <motion.div variants={textVariants} className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                const colls = document.querySelector("#collections");
                if (colls) colls.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 py-3 bg-white text-zinc-950 hover:bg-luxury-champagne rounded-lg font-mono text-xs uppercase tracking-widest font-semibold flex items-center gap-2 transition-all cursor-none border border-white group"
            >
              Examine Atelier
              <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
            </button>
            <button
              onClick={() => {
                const book = document.querySelector("#lookbook");
                if (book) book.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 py-3 glass-panel border border-white/20 text-white hover:border-white rounded-lg font-mono text-xs uppercase tracking-[0.15em] transition-all cursor-none"
            >
              Editorial Lookbook
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Vertical Design Specs (Right Hand Side) - Apple Aesthetics style */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 1.2 }}
        className="hidden lg:flex flex-col gap-6 absolute bottom-24 right-12 z-10 text-right text-zinc-800 dark:text-white select-none font-sans"
      >
        <div className="border-r-2 border-luxury-champagne/40 pr-4 space-y-1">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#00F0FF]">Materiality</p>
          <p className="text-xs font-serif italic text-zinc-650 dark:text-zinc-200">Double-faced virgin wool</p>
        </div>
        <div className="border-r-2 border-luxury-champagne/40 pr-4 space-y-1">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#00F0FF]">Aesthetic</p>
          <p className="text-xs font-serif italic text-zinc-650 dark:text-zinc-200">Brutalist Minimalism</p>
        </div>
        <div className="border-r-2 border-luxury-champagne/40 pr-4 space-y-1">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#00F0FF]">Circulation</p>
          <p className="text-xs font-serif italic text-zinc-650 dark:text-zinc-200">Strictly Non-branded</p>
        </div>
      </motion.div>

      {/* Bottom Scroll Down indicator */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: "reverse" }}
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white p-2 z-10 cursor-none flex flex-col items-center gap-1.5"
      >
        <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-white/60">scroll</span>
        <div className="w-1 h-8 rounded bg-gradient-to-b from-white to-transparent" />
      </motion.button>
    </section>
  );
};
