import React from "react";
import { useApp } from "./AppContext";
import { motion } from "motion/react";
import { ArrowUpRight, Github, Twitter, Instagram, ShieldCheck, HelpCircle } from "lucide-react";

export const Footer: React.FC = () => {
  const { addToast } = useApp();

  const handlePolicyOpen = (policyName: string) => {
    addToast(`${policyName} Policy simulated in safe pop-up state.`, "info");
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-matte-black text-[#A5AAB0] border-t border-white/10 pt-20 pb-12 px-6 md:px-12 font-sans select-none relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Brand narrative block */}
        <div className="space-y-6">
          <div className="flex flex-col">
            <span className="font-serif text-3xl tracking-[0.2em] text-white uppercase">Debbie Garmets</span>
            <span className="text-[9px] font-mono tracking-[0.45em] text-luxury-champagne uppercase -mt-1 pl-0.5">
              atelier
            </span>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed font-light font-sans max-w-sm">
            Architectural silhouette pattern-makers operating out of Milan, Tokyo, and Paris. We focus purely on material sincerity, volume experiments, and structural negative spaces.
          </p>
          <div className="flex gap-4 text-white">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); addToast("Instagram Link active.", "info"); }}
              className="p-2 bg-white/5 hover:bg-[#d4c7b4]/30 rounded-full transition-all cursor-none"
              title="Debbie Garmets Instagram"
            >
              <Instagram className="w-4 h-4 text-zinc-100" />
            </a>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); addToast("Twitter/X Link active.", "info"); }}
              className="p-2 bg-white/5 hover:bg-[#d4c7b4]/30 rounded-full transition-all cursor-none"
              title="Debbie Garmets Twitter"
            >
              <Twitter className="w-4 h-4 text-zinc-100" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-white/5 hover:bg-[#d4c7b4]/30 rounded-full transition-all cursor-none"
              title="Debbie Garmets Github Codebase"
            >
              <Github className="w-4 h-4 text-zinc-100" />
            </a>
          </div>
        </div>

        {/* Directory links */}
        <div className="space-y-4">
          <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-white">
            the inventory
          </h4>
          <ul className="space-y-2.5 text-xs font-light">
            {["Atelier Tailoring", "Silk Drapery", "Sterling Silver", "Signature Scent", "Knitwear Series"].map((item) => (
              <li key={item}>
                <a
                  href="#collections"
                  className="hover:text-white transition-colors flex items-center gap-1 cursor-none group"
                >
                  <span>{item}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Support, sizing, shipping */}
        <div className="space-y-4">
          <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-white">
            concierge guides
          </h4>
          <ul className="space-y-2.5 text-xs font-light">
            {[
              { label: "Sizing Blueprint Guide", name: "Sizing Guide" },
              { label: "Secured Express Courier", name: "Shipping Options" },
              { label: "Inquire Custom Fitting", name: "Custom Fitting Concierge" },
              { label: "Archival Care Instructions", name: "Care & Durability" }
            ].map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => handlePolicyOpen(link.name)}
                  className="hover:text-white text-left transition-colors flex items-center gap-1 cursor-none"
                >
                  <span>{link.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Address and details */}
        <div className="space-y-4">
          <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-white">
            the headquarter
          </h4>
          <ul className="space-y-2.5 text-xs font-light text-neutral-400">
            <li className="leading-relaxed">
              <span className="font-semibold text-zinc-200 block">Milano Design Atelier:</span>
              Via della Moscova, 34, 20121 Milano, MI, Italy
            </li>
            <li className="leading-relaxed">
              <span className="font-semibold text-zinc-200 block">Concierge Phone:</span>
              +39 02 4498 8490
            </li>
            <li>
              <span className="font-semibold text-zinc-200 block">Digital Inquiries:</span>
              concierge@debbiegarmets.com
            </li>
          </ul>
        </div>

      </div>

      {/* Footer bottom bar */}
      <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-neutral-400">
        
        <div className="flex flex-wrap items-center justify-center gap-6">
          <span>&copy; {currentYear} Debbie Garmets. All rights preserved.</span>
          <button
            onClick={() => handlePolicyOpen("Sovereign Privacy Policy")}
            className="hover:text-white transition-colors cursor-none"
          >
            Privacy Code
          </button>
          <button
            onClick={() => handlePolicyOpen("Commercial Terms")}
            className="hover:text-white transition-colors cursor-none"
          >
            Terms of Appraisal
          </button>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-mono uppercase text-luxury-champagne bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
          <ShieldCheck className="w-4 h-4 text-luxury-champagne" />
          <span>Vercel Platform verified</span>
        </div>

      </div>
    </footer>
  );
};
