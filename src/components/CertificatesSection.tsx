"use client";

import { motion } from "framer-motion";
import { memo, useState } from "react";
import { certificates, Certificate } from "@/data/certificates";
import { TiltCard } from "./TiltCard";
import { Award, ShieldCheck, Search } from "lucide-react";
import { CertificateModal } from "./CertificateModal";
import { KineticText } from "./KineticText";

const CertificateCard = memo(({ certificate, onClick }: { certificate: Certificate; onClick: () => void }) => {
  return (
    <TiltCard className="h-full">
      <div 
        className="glass group h-full flex flex-col rounded-[2.5rem] overflow-hidden border border-white/10 dark:border-white/5 hover:border-accent-cyan/30 transition-all duration-500 cursor-pointer"
        onClick={onClick}
      >
        {/* Top: Image Preview */}
        <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-800/50">
          <img
            src={certificate.image}
            alt={certificate.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.src = "https://placehold.co/600x400/18181b/ffffff?text=Collectible+ID";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 dark:from-zinc-900 via-transparent to-transparent opacity-60" />
          
          {/* Badge & Category */}
          <div className="absolute top-6 left-6 flex items-center gap-3">
             <div className="p-2 bg-white/40 dark:bg-black/40 backdrop-blur-md rounded-lg border border-white/20 dark:border-white/10">
                <Award className="w-4 h-4 text-accent-cyan" />
             </div>
             <span className="px-3 py-1 bg-white/20 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-full text-[8px] font-bold uppercase tracking-widest text-zinc-800 dark:text-zinc-200">
               {certificate.category}
             </span>
          </div>

          {/* Holographic Reflection Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-tr from-transparent via-white/20 dark:via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transform skew-x-12" />
        </div>

        {/* Bottom: Info */}
        <div className="p-8 flex flex-col flex-1 justify-between bg-white/40 dark:bg-zinc-900/40 backdrop-blur-sm">
           <div>
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 text-zinc-900 dark:text-white group-hover:text-accent-cyan transition-colors leading-tight">
                {certificate.title}
              </h3>
              <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck className="w-3 h-3 text-accent-blue" />
                {certificate.issuer}
              </p>
           </div>
           
           <div className="mt-8 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[8px] font-bold uppercase tracking-[0.3em] opacity-30 text-zinc-900 dark:text-white">Serial</span>
                <span className="text-[10px] font-mono text-accent-cyan/80 dark:text-accent-cyan/60">{certificate.credential}</span>
              </div>
              <div className="flex flex-col items-end text-right">
                <span className="text-[8px] font-bold uppercase tracking-[0.3em] opacity-30 text-zinc-900 dark:text-white">Issued</span>
                <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">{certificate.year}</span>
              </div>
           </div>
        </div>

        {/* Floating Accent Glow */}
        <div className={`absolute -right-10 -bottom-10 w-32 h-32 blur-[60px] opacity-0 group-hover:opacity-20 rounded-full transition-opacity ${
           certificate.glow === "blue" ? "bg-blue-500" : 
           certificate.glow === "orange" ? "bg-orange-500" : "bg-purple-500"
        }`} />
      </div>
    </TiltCard>
  );
});
CertificateCard.displayName = "CertificateCard";

export const CertificatesSection = memo(() => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = (cert: Certificate) => {
    setSelectedCert(cert);
    setIsModalOpen(true);
  };

  return (
    <section id="certificates" className="relative z-10 px-6 py-40 bg-background/30 backdrop-blur-sm overflow-hidden scroll-gpu">
      <div className="container mx-auto">
        <div className="max-w-4xl mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <Award className="w-5 h-5 text-accent-cyan animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500 dark:text-zinc-300">
              Validated Achievements
            </span>
          </motion.div>

          <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-8">
            <KineticText text="Certifi" className="block" />
            <KineticText text="cations" className="block text-accent-blue" delay={0.2} />
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 font-medium max-w-2xl leading-relaxed"
          >
            A curated vault of technical mastery, showcasing validated growth in AI, 
            Data Science, and specialized engineering domains.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <CertificateCard 
                certificate={cert} 
                onClick={() => handleOpen(cert)} 
              />
            </motion.div>
          ))}
        </div>
      </div>

      <CertificateModal 
        certificate={selectedCert} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
});

CertificatesSection.displayName = "CertificatesSection";
