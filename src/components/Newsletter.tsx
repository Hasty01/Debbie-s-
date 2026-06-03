import React, { useState } from "react";
import { useApp } from "./AppContext";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Sparkles, Send, CheckCircle } from "lucide-react";

export const Newsletter: React.FC = () => {
  const { addToast } = useApp();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [ticketNum, setTicketNum] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Simulate luxury queuing
    const generatedTicket = `AÉ-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketNum(generatedTicket);
    setSubmitted(true);
    addToast("Registered securely for Private Capsule invite privileges", "success");
  };

  return (
    <section
      id="newsletter"
      className="py-24 bg-matte-black text-white relative overflow-hidden font-sans select-none border-t border-white/10"
    >
      {/* Background ambient light */}
      <div className="absolute inset-0 bg-radial-gradient(circle at 50% 120%, rgba(212, 199, 180, 0.1), transparent 60%)" />

      <div className="max-w-4xl mx-auto px-6 text-center space-y-8 relative z-10">
        
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono tracking-[0.25em] text-[#d4c7b4] uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          the private queue
        </div>

        <div className="space-y-3">
          <h2 className="font-serif text-3xl md:text-5xl font-extralight tracking-tight text-white leading-tight">
            Subscribe To <span className="font-serif italic font-light text-luxury-champagne">The Atelier Memo</span>
          </h2>
          <p className="max-w-md mx-auto text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
            Gain priority entry to the subsequent capsule. Subscribed collectors obtain custom digital entry keys forty-eight hours prior to public appraisal.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="newsletter-form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              onSubmit={handleSubmit}
              className="max-w-lg mx-auto flex flex-col sm:flex-row gap-3 items-center justify-center p-2 rounded-xl bg-white/5 border border-white/10 shadow-2xl"
            >
              <div className="flex items-center gap-2.5 w-full px-3 py-2">
                <Mail className="w-4 h-4 text-zinc-400" />
                <input
                  type="email"
                  required
                  placeholder="Inquire with your curated email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent border-none text-white focus:outline-none placeholder-zinc-550 text-sm w-full font-light"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-white text-zinc-950 rounded-lg hover:bg-luxury-champagne hover:text-zinc-950 font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-colors cursor-none shrink-0"
              >
                <span>Request Invite</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="newsletter-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 max-w-md mx-auto bg-white/5 border border-white/10 rounded-2xl shadow-xl text-center space-y-4"
            >
              <div className="w-12 h-12 bg-[#d4c7b4]/25 text-[#d4c7b4] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-lg font-light text-white">Invitation Active</h4>
                <p className="text-xs text-zinc-400 leading-normal max-w-xs mx-auto">
                  Your access has been queued under the private keys database.
                </p>
              </div>
              <div className="p-3 bg-zinc-900 border border-white/5 rounded-lg text-center font-mono">
                <span className="text-[10px] text-zinc-500 uppercase block tracking-widest mb-1">Couture Queue Ticket ID</span>
                <span className="text-sm font-semibold text-luxury-champagne">{ticketNum}</span>
              </div>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setEmail("");
                }}
                className="text-[10px] font-mono tracking-widest text-zinc-450 hover:text-white underline"
              >
                Queue another appraisal email
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="text-[10px] font-mono text-zinc-550 pt-3">
          <span>Obsidian Protocol Safeguard</span> • <span>We never broadcast third-party spam.</span>
        </div>

      </div>
    </section>
  );
};
