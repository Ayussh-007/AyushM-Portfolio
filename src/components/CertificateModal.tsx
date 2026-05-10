"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Award, ExternalLink } from "lucide-react";
import { Certificate } from "@/data/certificates";
import { memo, useEffect } from "react";

interface CertificateModalProps {
  certificate: Certificate | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateModal = memo(({ certificate, isOpen, onClose }: CertificateModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
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
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 md:px-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 dark:bg-black/90 backdrop-blur-xl"
          />

          {/* Close Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={onClose}
            className="absolute top-8 right-8 z-10 p-4 bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 rounded-full transition-colors text-black dark:text-white"
          >
            <X className="w-6 h-6" />
          </motion.button>

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative z-0 w-full max-w-6xl max-h-[90vh] grid grid-cols-1 lg:grid-cols-2 bg-white/90 dark:bg-zinc-900/50 rounded-[3rem] overflow-hidden border border-black/5 dark:border-white/10 shadow-2xl"
          >
            {/* Left: Image Container */}
            <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden bg-zinc-100 dark:bg-black/40 flex items-center justify-center p-6 lg:p-12 group">
               {/* Background Glow */}
               <div className={`absolute inset-0 opacity-10 dark:opacity-20 blur-[100px] transition-colors duration-1000 ${
                 certificate.glow === "blue" ? "bg-blue-500" : 
                 certificate.glow === "orange" ? "bg-orange-500" : "bg-purple-500"
               }`} />
               
               <motion.div 
                 className="relative z-10 w-full h-full shadow-2xl rounded-xl overflow-hidden border border-black/5 dark:border-white/10"
                 whileHover={{ scale: 1.02 }}
                 transition={{ duration: 0.5 }}
               >
                 <img
                   src={certificate.image}
                   alt={certificate.title}
                   className="w-full h-full object-contain bg-white dark:bg-zinc-800"
                   onError={(e) => {
                     e.currentTarget.src = "https://placehold.co/800x600/ffffff/000000?text=Certificate+Preview";
                   }}
                 />
                 <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
               </motion.div>
            </div>

            {/* Right: Info Content */}
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white/40 dark:bg-zinc-900/80 backdrop-blur-md">
               <motion.div
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.2 }}
               >
                 <div className="flex items-center gap-3 mb-6">
                    <span className="px-4 py-1.5 bg-accent-cyan/10 border border-accent-cyan/20 rounded-full text-[10px] font-bold uppercase tracking-widest text-accent-cyan">
                      {certificate.category}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 text-zinc-900 dark:text-white">
                      {certificate.year}
                    </span>
                 </div>

                 <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight mb-4 text-zinc-900 dark:text-white">
                   {certificate.title}
                 </h2>
                 
                 <div className="flex items-center gap-2 mb-8 text-xl font-medium text-zinc-600 dark:text-zinc-400">
                    <Award className="w-5 h-5 text-accent-cyan" />
                    <span>Issued by {certificate.issuer}</span>
                 </div>

                 <div className="space-y-8">
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 mb-4 text-zinc-900 dark:text-white">Skills Validated</h4>
                      <div className="flex flex-wrap gap-2">
                        {certificate.skills.map(skill => (
                          <span key={skill} className="px-4 py-2 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl text-xs font-medium text-zinc-700 dark:text-zinc-300">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 mb-2 text-zinc-900 dark:text-white">Credential ID</h4>
                      <code className="text-sm font-mono text-accent-cyan dark:text-accent-cyan/80">{certificate.credential}</code>
                    </div>
                 </div>

                 <div className="mt-12 flex gap-4">
                    <button className="flex items-center gap-2 px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full text-xs font-black uppercase transition-all hover:scale-105 active:scale-95 shadow-lg">
                      Verify Credential <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                 </div>
               </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});

CertificateModal.displayName = "CertificateModal";
