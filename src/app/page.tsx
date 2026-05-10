"use client";

import { Hero } from "@/components/Hero";
import { Scene } from "@/components/Scene";
import { CustomCursor } from "@/components/CustomCursor";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SocialIcons } from "@/components/SocialIcons";
import { MagneticButton } from "@/components/MagneticButton";
import { AboutSection } from "@/components/AboutSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { CertificatesSection } from "@/components/CertificatesSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ContactSection } from "@/components/ContactSection";
import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

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
    <main className="relative min-h-screen">
      <CustomCursor />
      <Scene />
      <SocialIcons />
      
      {/* 1. TOP PROGRESS BAR */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-accent-cyan origin-left z-[200]"
        style={{ scaleX }}
      />

      {/* 2. CINEMATIC NAV */}
      <header className="fixed top-0 z-[100] flex w-full items-center justify-between px-6 md:px-10 py-6 md:py-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-2xl font-black tracking-tighter"
        >
          Ayush.
        </motion.div>
        
        <div className="flex items-center gap-4 md:gap-10">
          <ThemeToggle />
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <MagneticButton glow>
              <button className="group relative overflow-hidden rounded-full border border-primary/20 px-6 md:px-8 py-2 md:py-3 text-[10px] font-bold uppercase tracking-widest transition-all hover:border-accent-cyan">
                <span className="relative z-10 transition-colors group-hover:text-accent-cyan">
                  Resume
                </span>
                <div className="absolute inset-0 z-0 -translate-x-full bg-accent-cyan/10 transition-transform duration-500 group-hover:translate-x-0" />
              </button>
            </MagneticButton>
          </motion.div>
        </div>
      </header>

      {/* 3. SECTION CONTENT WITH STAGGERED ENTRANCE */}
      <div className={isMounted ? "opacity-100" : "opacity-0"}>
        <Hero />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ margin: "-100px" }}
          transition={{ duration: 1 }}
        >
          <AboutSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ margin: "-100px" }}
          transition={{ duration: 1 }}
        >
          <SkillsSection />
        </motion.div>

        <ProjectsSection />

        <ExperienceSection />

        <CertificatesSection />

        <ContactSection />
      </div>

      <footer className="relative z-10 p-20 text-center text-[10px] font-bold uppercase tracking-[0.5em] opacity-30 border-t border-white/5">
        &copy; 2026 Ayush Mhatre &bull; Creative Intelligence &bull; Mumbai
      </footer>

      {/* 4. PAGE ENTRANCE OVERLAY */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1.2, ease: [0.85, 0, 0.15, 1] }}
        className="fixed inset-0 bg-background z-[300] origin-top pointer-events-none"
      />
    </main>
  );
}
