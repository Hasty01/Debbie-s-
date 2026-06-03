/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { AppProvider, useApp } from "./components/AppContext";
import Lenis from "lenis";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Collections } from "./components/Collections";
import { BrandStory } from "./components/BrandStory";
import { Lookbook } from "./components/Lookbook";
import { Testimonials } from "./components/Testimonials";
import { Newsletter } from "./components/Newsletter";
import { Footer } from "./components/Footer";
import { ToastNotification } from "./components/Toast";
import { QuickViewModal } from "./components/QuickViewModal";
import { Sparkles, Eye, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Pre-loader component to capture luxurious initial vibe
const PreLoader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + 1;
      });
    }, 18);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0, y: -50, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-50 bg-matte-black flex flex-col justify-between p-12 text-white font-sans font-light select-none"
    >
      <div className="flex justify-between items-center text-[10px] uppercase font-mono tracking-[0.4em] text-zinc-500">
        <span>DEBBIE GARMETS CORP</span>
        <span>EST. 2026 MILAN</span>
      </div>

      <div className="text-center space-y-4">
        <motion.h1
          initial={{ letterSpacing: "1.2em", opacity: 0 }}
          animate={{ letterSpacing: "0.2em", opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-normal uppercase"
        >
          Debbie Garmets
        </motion.h1>
        <span className="text-[10px] font-mono tracking-[0.55em] uppercase text-luxury-champagne block">
          appraisal studio & atelier
        </span>
      </div>

      <div className="flex justify-between items-end">
        <div className="text-left space-y-1">
          <p className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase">system initialization</p>
          <p className="text-xs font-serif italic text-luxury-champagne font-light">Loading structural geometry...</p>
        </div>
        <span className="font-mono text-2xl font-light text-luxury-champagne">{percent}%</span>
      </div>
    </motion.div>
  );
};

// Main layout element inside context wrapper
function MainAppContent() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) return;

    // Instantiate premium inertial scrolling mechanics
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    (window as any).lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      (window as any).lenis = null;
    };
  }, [loading]);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <PreLoader key="preloader" onComplete={() => setLoading(false)} />
      ) : (
        <motion.div
          key="main-app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="min-h-screen bg-zinc-50 dark:bg-matte-black text-zinc-900 dark:text-[#F5F5F5] relative select-none"
        >
          {/* Advanced visual micro element: Atmospheric noise texture fallback / subtle border */}
          <div className="fixed inset-0 pointer-events-none z-[100] border-[12px] border-zinc-300/30 dark:border-charcoal/50" />

          {/* Core Layout Items */}
          <Navigation />
          <Hero />
          
          <main className="relative">
            <Collections />
            <BrandStory />
            <Lookbook />
            <Testimonials />
            <Newsletter />
          </main>

          <Footer />

          {/* Modal Portals and Toast Notifiers */}
          <QuickViewModal />
          <ToastNotification />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Global App wrapper with Provider
export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
