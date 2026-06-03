import React, { useState } from "react";
import { TESTIMONIALS } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Star, Quote, Sparkles } from "lucide-react";

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="py-24 bg-matte-black px-6 md:px-12 relative overflow-hidden font-sans select-none">
      
      {/* Background soft lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full ambient-glow pointer-events-none select-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center space-y-12">
        
        {/* Carousel Headers */}
        <div className="space-y-4">
          <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-luxury-champagne font-semibold block">
            atelier appraisals
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-white">
            Critically Acclaimed <span className="font-serif italic font-light">Elegance</span>
          </h2>
          <div className="w-12 h-[1.5px] bg-luxury-champagne mx-auto" />
        </div>

        {/* Carousel Box */}
        <div className="relative bg-charcoal border border-white/10 rounded-2xl shadow-xl p-8 md:p-12 min-h-[320px] md:min-h-[280px] flex flex-col justify-between">
          
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-matte-black text-[#F5F5F5] rounded-full flex items-center justify-center border border-white/10 shadow-lg">
            <Quote className="w-5 h-5 text-luxury-champagne" />
          </div>

          {/* Animate slide shifting with AnimatePresence */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={{ duration: 0.4 }}
              className="space-y-6 pt-4 text-center"
            >
              {/* Star rating indicators */}
              <div className="flex justify-center gap-1.5">
                {Array.from({ length: current.rating }).map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-luxury-champagne text-luxury-champagne" />
                ))}
              </div>

              {/* Quotation text */}
              <blockquote className="font-serif text-lg md:text-2xl font-light text-zinc-200 leading-relaxed italic max-w-2xl mx-auto select-text">
                "{current.quote}"
              </blockquote>

              {/* User credentials */}
              <div className="space-y-0.5 select-text">
                <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-zinc-50 flex items-center justify-center gap-1.5">
                  {current.name} <Sparkles className="w-3.5 h-3.5 text-luxury-champagne" />
                </h4>
                <p className="text-[11px] text-luxury-champagne font-light">{current.role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls arrows */}
          <div className="flex justify-between items-center mt-8 border-t border-zinc-800 pt-6">
            <button
              onClick={prevSlide}
              className="p-2 border border-zinc-800 hover:border-zinc-700 rounded-full bg-transparent hover:bg-zinc-900 transition-colors cursor-none"
              title="Prior appraisal"
            >
              <ChevronLeft className="w-4.5 h-4.5 text-zinc-400" />
            </button>

            {/* Pagination dots indicators */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full cursor-none transition-all ${
                    idx === currentIndex ? "w-5 bg-luxury-champagne" : "bg-zinc-800"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-2 border border-zinc-800 hover:border-zinc-700 rounded-full bg-transparent hover:bg-zinc-900 transition-colors cursor-none"
              title="Next appraisal"
            >
              <ChevronRight className="w-4.5 h-4.5 text-zinc-400" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
