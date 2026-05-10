"use client";

import { motion } from "framer-motion";
import { memo, useState } from "react";
import { certificates, Certificate } from "@/data/certificates";
import { TiltCard } from "./TiltCard";
import { Award, ShieldCheck } from "lucide-react";
import { CertificateModal } from "./CertificateModal";
import { KineticText } from "./KineticText";

const CertificateCard = memo(({ certificate, onClick }: { certificate: Certificate; onClick: () => void }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <TiltCard className="h-full">
      <div 
        className="glass group h-full flex flex-col rounded-[2rem] overflow-hidden border border-white/5 hover:border-accent-cyan/20 transition-all duration-500 cursor-pointer shadow-lg"
        onClick={onClick}
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-800/50">
          {!imageError ? (
            <img
              src={certificate.image}
              alt={certificate.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-zinc-100 dark:bg-zinc-800">
               <Award className="w-8 h-8 text-accent-cyan/20 mb-2" />
               <span className="text-[8px] font-bold uppercase tracking-widest opacity-20">Secure Node</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 dark:from-zinc-900 via-transparent to-transparent opacity-60" />
          <div className="absolute top-4 left-4">
             <div className="p-2 bg-white/40 dark:bg-black/40 backdrop-blur-md rounded-lg border border-white/20 dark:border-white/10">
                <Award className="w-4 h-4 text-accent-cyan" />
             </div>
          </div>
        </div>

        <div className="p-6 flex flex-col flex-1 justify-between bg-white/40 dark:bg-zinc-900/40 backdrop-blur-sm">
           <div>
              <h3 className="text-xl font-black uppercase tracking-tighter mb-1 group-hover:text-accent-cyan transition-colors leading-tight">
                {certificate.title}
              </h3>
              <p className="text-[9px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest flex items-center gap-2 opacity-60">
                <ShieldCheck className="w-3 h-3 text-accent-blue" />
                {certificate.issuer}
              </p>
           </div>
           
           <div className="mt-6 flex items-center justify-between opacity-40">
              <span className="text-[9px] font-mono text-accent-cyan">{certificate.credential}</span>
              <span className="text-[9px] font-bold uppercase tracking-widest">{certificate.year}</span>
           </div>
        </div>
      </div>
    </TiltCard>
  );
});
CertificateCard.displayName = "CertificateCard";

export const CertificatesSection = memo(() => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="certificates" className="relative z-10 px-6 py-20 bg-background overflow-hidden border-t border-white/5">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-4 select-none">
            <KineticText text="Technical" className="block" />
            <KineticText text="Mastery" className="block text-accent-cyan" delay={0.1} />
          </h2>
          <p className="text-[10px] md:text-xs text-zinc-500 max-w-sm leading-relaxed uppercase tracking-widest font-bold opacity-40 border-l-2 border-accent-blue/10 pl-5">
            Curated vault of specialized technical growth and validated neural engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, i) => (
            <motion.div key={cert.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <CertificateCard certificate={cert} onClick={() => { setSelectedCert(cert); setIsModalOpen(true); }} />
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
