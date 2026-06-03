import React, { useState } from "react";
import { motion } from "motion/react";
import { ShieldAlert, Fingerprint, Award, Eye } from "lucide-react";

export const BrandStory: React.FC = () => {
  const [activeStorySegment, setActiveStorySegment] = useState(0);

  const pillars = [
    {
      title: "Material Isolation",
      desc: "Every thread is analyzed for geometric weight. We source exclusively GOTS-certified Egyptian cottons and organic virgin merino fiber to guarantee pristine drape stability over generations.",
      icon: Fingerprint
    },
    {
      title: "Architectural Form",
      desc: "We approach pattern-making like structural architecture. Clothes are blueprints. By stripping away standard shoulder paddings and stiff backing canvases, the fabric acts as a fluid load-bearing vault.",
      icon: Eye
    },
    {
      title: "Silent Luxury Statement",
      desc: "True exclusivity is an unspoken deal. Zero exterior stitching logs, visible tags, or printed monograms. Restoring luxury to its initial definition: pure premium texture, experienced privately.",
      icon: Award
    }
  ];

  return (
    <section
      id="about"
      className="py-24 bg-gradient-to-b from-matte-black to-charcoal px-6 md:px-12 relative overflow-hidden font-sans select-none"
    >
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full ambient-glow pointer-events-none select-none" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
        
        {/* Left Side: Creative Editorial Collage */}
        <div className="w-full lg:w-1/2 relative">
          <div className="relative aspect-[4/5] w-full max-w-lg mx-auto rounded-2xl overflow-hidden border border-zinc-200/50 dark:border-zinc-800 shadow-2xl">
            <motion.img
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000"
              alt="Artisan fabric assembly"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Absolute overlay visual stats box */}
            <div className="absolute bottom-6 left-6 right-6 glass-panel border border-white/10 p-5 rounded-lg text-left text-zinc-950 dark:text-zinc-50 select-none">
              <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-luxury-champagne block mb-1">
                Atelier Blueprint code
              </span>
              <p className="font-serif italic text-sm leading-relaxed mb-3">
                "Form serves only to draft the envelope. The absolute hero remains the pure, structural negative space surrounding the individual."
              </p>
              <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400">
                <span>PROJECT: DEBBIE GARMETS I</span>
                <span className="font-semibold text-luxury-champagne">100% TRACEABLE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Copy & Interactive Details */}
        <div className="w-full lg:w-1/2 space-y-8 text-left text-zinc-800 dark:text-zinc-150">
          <div className="space-y-4">
            <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-luxury-champagne block">
              the debbie garmets manifesto
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-zinc-950 dark:text-zinc-50">
              A Quiet Revolution <br />In <span className="font-serif italic font-light">Material Sincerity</span>
            </h2>
            <div className="w-16 h-[1.5px] bg-luxury-champagne" />
            <p className="font-light text-zinc-400 text-sm md:text-[15px] leading-relaxed max-w-xl">
              Constructed in Milan and forged in Paris, Debbie Garmets bypasses the noise of contemporary logomania. We cater strictly to curators who understand that luxury is a sensory dialogue between the skin and the seam.
            </p>
          </div>

          {/* Interactive pillars listing */}
          <div className="space-y-4 pt-4">
            {pillars.map((pillar, index) => {
              const IconComp = pillar.icon;
              const isActive = activeStorySegment === index;

              return (
                <div
                  key={index}
                  onMouseEnter={() => setActiveStorySegment(index)}
                  className={`p-4 md:p-5 rounded-xl border transition-all duration-300 ${
                    isActive
                      ? "bg-charcoal border-luxury-champagne shadow-md"
                      : "bg-transparent border-zinc-800 hover:border-zinc-650"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg transition-colors ${isActive ? "bg-luxury-champagne/20 text-luxury-champagne" : "bg-zinc-900 text-zinc-500"}`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-100">
                      {pillar.title}
                    </h3>
                  </div>
                  {isActive && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-3 text-xs leading-relaxed text-zinc-400 font-light select-text"
                    >
                      {pillar.desc}
                    </motion.p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-luxury-champagne bg-luxury-champagne/10 border border-luxury-champagne/20 p-3 rounded-lg max-w-md">
            <ShieldAlert className="w-4.5 h-4.5 text-luxury-champagne flex-shrink-0" />
            <span>Every single run capsule maintains a certificate of design isolation.</span>
          </div>
        </div>

      </div>
    </section>
  );
};
