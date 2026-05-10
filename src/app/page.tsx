"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

// --- 💎 ULTRA-STABLE CORE ENGINE ---
const Hero = dynamic(() => import("@/components/Hero").then(m => m.Hero), { 
  ssr: true,
  loading: () => <div className="h-screen w-full bg-background flex items-center justify-center text-[10px] font-black uppercase tracking-[1em] opacity-20">Initializing...</div> 
});

const Scene = dynamic(() => import("@/components/Scene").then(m => m.Scene), { 
  ssr: false, 
  loading: () => <div className="fixed inset-0 bg-background" /> 
});

const CustomCursor = dynamic(() => import("@/components/CustomCursor").then(m => m.CustomCursor), { ssr: false });
const SocialIcons = dynamic(() => import("@/components/SocialIcons").then(m => m.SocialIcons), { ssr: false });
const ScrollToTop = dynamic(() => import("@/components/ScrollToTop").then(m => m.ScrollToTop), { ssr: false });

const AboutSection = dynamic(() => import("@/components/AboutSection").then(m => m.AboutSection), { ssr: true });
const SkillsSection = dynamic(() => import("@/components/SkillsSection").then(m => m.SkillsSection), { ssr: false });
const ProjectsSection = dynamic(() => import("@/components/ProjectsSection").then(m => m.ProjectsSection), { ssr: true });
const CertificatesSection = dynamic(() => import("@/components/CertificatesSection").then(m => m.CertificatesSection), { ssr: true });

import { ThemeToggle } from "@/components/ThemeToggle";
import { MagneticButton } from "@/components/MagneticButton";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Suspense fallback={null}>
        <CustomCursor />
        <Scene />
        <SocialIcons />
        <ScrollToTop />
      </Suspense>
      
      {/* 📏 SLIM GLOBAL PROGRESS */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-accent-cyan origin-left z-[250] shadow-[0_0_10px_#22D3EE]"
        style={{ scaleX }}
      />

      {/* 🏛️ PREMIUM NAVIGATION */}
      <header className="fixed top-0 z-[100] flex w-full items-center justify-between px-6 md:px-16 py-8 md:py-10 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl md:text-2xl font-black tracking-tighter pointer-events-auto group"
        >
          <span className="text-zinc-900 dark:text-white transition-colors duration-500 group-hover:text-accent-cyan select-none">Ayush.</span>
        </motion.div>
        
        <div className="flex items-center gap-4 md:gap-10 pointer-events-auto">
          <ThemeToggle />
          
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <MagneticButton glow>
              <a 
                href="/resume/resume.pdf" 
                download="Ayush_Mhatre_Resume.pdf"
                className="group relative overflow-hidden rounded-full border border-zinc-900/10 dark:border-white/10 px-6 md:px-10 py-2.5 md:py-3.5 text-[9px] font-black uppercase tracking-[0.3em] transition-all hover:border-accent-cyan shadow-sm bg-white/5 backdrop-blur-md block"
              >
                <span className="relative z-10 transition-colors group-hover:text-accent-cyan text-zinc-900 dark:text-white">
                  Resume
                </span>
                <div className="absolute inset-0 z-0 -translate-x-full bg-zinc-900 dark:bg-white transition-transform duration-500 group-hover:translate-x-0" />
                <span className="absolute inset-0 flex items-center justify-center z-20 translate-x-full group-hover:translate-x-0 transition-transform duration-500 text-white dark:text-black font-black pointer-events-none">
                   Resume
                </span>
              </a>
            </MagneticButton>
          </motion.div>

        </div>
      </header>

      {/* 🎞️ CINEMATIC PRODUCTION FLOW */}
      <div className={`transition-opacity duration-[2000ms] ${isMounted ? "opacity-100" : "opacity-0"}`}>
        <Hero />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <CertificatesSection />
      </div>

      {/* 📜 COMPACT FOOTER */}
      <footer className="relative z-10 p-24 text-center border-t border-black/5 dark:border-white/5 bg-background/80 backdrop-blur-md">
        <div className="flex flex-col items-center gap-8">
           <div className="text-xl font-black uppercase tracking-tighter">Ayush Mhatre</div>
           <div className="flex gap-10 text-[9px] font-black uppercase tracking-[0.6em] opacity-30">
              <span>Mumbai</span>
              <span>&bull;</span>
              <span>2026 Edition</span>
           </div>
           <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest max-sm leading-relaxed opacity-60 font-bold">
              Designed & Engineered with extreme precision using Next.js & WebGL.
           </p>
        </div>
      </footer>

      {/* 🎬 SOFT WORLD REVEAL */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1.5, ease: [0.85, 0, 0.15, 1] }}
        className="fixed inset-0 bg-[#0A0A0A] z-[300] origin-top pointer-events-none"
      />
    </main>
  );
}
