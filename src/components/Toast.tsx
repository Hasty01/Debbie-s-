import React from "react";
import { useApp } from "./AppContext";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export const ToastNotification: React.FC = () => {
  const { toasts, removeToast } = useApp();

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none max-w-sm w-full font-sans">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            className="pointer-events-auto w-full glass-panel border border-zinc-200 dark:border-white/10 shadow-lg p-4 flex items-center justify-between gap-3 text-sm rounded-lg bg-white/95 dark:bg-charcoal/90 backdrop-blur-md"
          >
            <div className="flex items-center gap-3">
              {toast.type === "success" && (
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              )}
              {toast.type === "info" && (
                <Info className="w-5 h-5 text-neon-blue flex-shrink-0" />
              )}
              {toast.type === "error" && (
                <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
              )}
              <span className="text-zinc-800 dark:text-zinc-100 tracking-wide font-normal">
                {toast.message}
              </span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 p-1 rounded-full transition-colors cursor-none"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
