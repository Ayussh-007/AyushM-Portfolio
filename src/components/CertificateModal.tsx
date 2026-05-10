"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Award, ExternalLink, User, CheckCircle2 } from "lucide-react";
import { Certificate } from "@/data/certificates";
import { memo, useEffect, useState } from "react";
import { MagneticButton } from "./MagneticButton";

interface CertificateModalProps {
  certificate: Certificate | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateModal = memo(({ certificate, isOpen, onClose }: CertificateModalProps) => {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setImageError(false);
    } else {
      document.body.style.overflow = "unset";
    }
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!certificate) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 md:px-10 overflow-y-auto py-10">
          {/* 🌑 Deep Atmospheric Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-2xl dark:bg-black/90"
          />

          {/* 🏛️ Modal Architecture */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.9, y: 30, filter: "blur(10px)" }}
            transition={{ type: "spring", damping: 28, stiffness: 200 }}
            className="relative z-10 w-full max-w-6xl bg-white dark:bg-[#0A0A0A] rounded-[3.5rem] overflow-hidden border border-black/5 dark:border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] grid grid-cols-1 lg:grid-cols-12 min-h-[600px]"
          >
            {/* 🖼️ VISUAL HUB (Col 1-7) */}
            <div className="lg:col-span-7 relative bg-zinc-50 dark:bg-black/40 flex items-center justify-center p-8 md:p-16 overflow-hidden">
               {/* Ambient Glow Pulse */}
               <div className={`absolute inset-0 opacity-10 blur-[120px] transition-colors duration-1000 ${
                 certificate.glow === "blue" ? "bg-blue-500" : 
                 certificate.glow === "orange" ? "bg-orange-500" : "bg-purple-500"
               }`} />
               
               <motion.div 
                 className="relative z-10 w-full shadow-2xl rounded-2xl overflow-hidden border border-white/20 dark:border-white/10 bg-white dark:bg-zinc-900 group"
                 whileHover={{ scale: 1.01 }}
                 transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
               >
                 {!imageError ? (
                    <img
                      src={certificate.image}
                      alt={certificate.title}
                      className="w-full h-auto object-contain transition-transform duration-1000"
                      onError={() => setImageError(true)}
                    />
                 ) : (
                    <div className="aspect-video w-full flex flex-col items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 p-12 text-center">
                       <Award className="w-24 h-24 text-accent-cyan/10 mb-6" />
                       <h3 className="text-xl font-black opacity-30 uppercase tracking-tighter mb-2">High-Resolution Asset Not Loaded</h3>
                       <p className="text-[10px] opacity-20 max-w-xs leading-relaxed uppercase font-bold tracking-widest">Optimizing secure transmission...</p>
                    </div>
                 )}
                 
                 {/* Glass Reflection overlay */}
                 <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none group-hover:opacity-50 transition-opacity" />
               </motion.div>
            </div>

            {/* 📝 INTEL HUB (Col 8-12) */}
            <div className="lg:col-span-5 p-10 md:p-16 flex flex-col justify-between bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl border-l border-black/5 dark:border-white/5">
               <motion.div
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.3, duration: 0.8 }}
               >
                 <div className="flex items-center gap-4 mb-10">
                    <span className="px-4 py-2 bg-accent-cyan/10 border border-accent-cyan/20 rounded-full text-[9px] font-black uppercase tracking-[0.3em] text-accent-cyan">
                      {certificate.category}
                    </span>
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-30 text-zinc-900 dark:text-white">
                      Verified {certificate.year}
                    </span>
                 </div>

                 <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9] mb-6 text-zinc-950 dark:text-white">
                   {certificate.title}
                 </h2>
                 
                 <div className="flex items-center gap-3 mb-12 text-zinc-600 dark:text-zinc-400">
                    <div className="p-2 bg-accent-blue/10 rounded-lg">
                      <Award className="w-5 h-5 text-accent-blue" />
                    </div>
                    <span className="text-lg font-bold tracking-tight">Issued by {certificate.issuer}</span>
                 </div>

                 <div className="space-y-12">
                    <div>
                      <h4 className="text-[9px] font-black uppercase tracking-[0.5em] opacity-30 mb-6 text-zinc-900 dark:text-white">Technical Vector</h4>
                      <div className="flex flex-wrap gap-2">
                        {certificate.skills.map(skill => (
                          <div key={skill} className="flex items-center gap-2 px-4 py-2 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl">
                            <CheckCircle2 className="w-3 h-3 text-accent-cyan" />
                            <span className="text-xs font-black uppercase tracking-widest text-zinc-800 dark:text-zinc-200">
                              {skill}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 bg-black/5 dark:bg-white/[0.02] rounded-3xl border border-black/5 dark:border-white/5">
                      <h4 className="text-[9px] font-black uppercase tracking-[0.5em] opacity-30 mb-3 text-zinc-900 dark:text-white">Credential Auth</h4>
                      <code className="text-xs font-mono text-accent-cyan font-bold block truncate">{certificate.credential}</code>
                    </div>
                 </div>
               </motion.div>

               <div className="mt-16 flex items-center justify-between">
                  <MagneticButton>
                    <button className="flex items-center gap-3 px-10 py-5 bg-zinc-950 dark:bg-white text-white dark:text-black rounded-full text-[10px] font-black uppercase tracking-widest transition-all hover:scale-[1.05] active:scale-[0.95] shadow-2xl">
                      Verify Credential <ExternalLink className="w-4 h-4" />
                    </button>
                  </MagneticButton>
                  
                  <button 
                    onClick={onClose}
                    className="p-5 text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});

CertificateModal.displayName = "CertificateModal";
