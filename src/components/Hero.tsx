"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { memo, useEffect, useState } from "react";
import { Typewriter } from "./Typewriter";
import { FloatingPortrait } from "./FloatingPortrait";
import { ScrollIndicator } from "./ScrollIndicator";
import { Spotlight } from "./Spotlight";
import { KineticText } from "./KineticText";

export const Hero = memo(() => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col items-center">
      
      {/* 1. CINEMATIC ATMOSPHERE LAYER (-z-10) */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <Spotlight />
        <div className="noise-bg opacity-[0.03]" />
        
        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.05)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
        <div className="absolute inset-0 haze-overlay opacity-30 dark:opacity-20" />

        {/* Deep Atmospheric Fog */}
        <div className="absolute inset-x-0 bottom-0 h-[35vh] bg-gradient-to-t from-background via-background/40 to-transparent opacity-95" />

        {/* Portrait Halo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[40rem] md:h-[55rem] w-[40rem] md:w-[55rem] rounded-full bg-zinc-400/5 blur-[120px] dark:bg-accent-cyan/[0.03] opacity-60" />
      </div>

      {/* 2. CONTENT CONTAINER (z-20) */}
      <div className="relative z-[20] h-full w-full flex flex-col justify-between px-6 md:px-10 py-16 md:py-20 pointer-events-none">
        
        {/* Top Content - Stacked on Mobile */}
        <div className="flex flex-col gap-4 md:gap-6 max-w-4xl pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 md:gap-3"
          >
            <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_12px_rgba(34,197,94,0.6)]" />
            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600 dark:text-zinc-300">
              Available for Opportunities
            </span>
          </motion.div>

          <div className="relative">
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-24 md:h-32 bg-white/5 dark:bg-accent-cyan/5 blur-[80px] md:blur-[100px] -z-10" />
            
            <h1 className="text-6xl md:text-[13rem] font-black uppercase leading-[0.85] tracking-tighter select-none">
              <KineticText 
                text="AYUSH" 
                className="block text-black dark:text-gradient-silver text-shadow-glow" 
                stagger={0.05}
              />
              <KineticText 
                text="MHATRE" 
                className="block text-outline-black dark:text-outline-white" 
                delay={0.3}
                stagger={0.05}
              />
            </h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-2xl font-medium tracking-tight text-zinc-900 dark:text-zinc-100/90"
          >
            AI & Data Science Engineering
          </motion.p>
        </div>

        {/* Portrait Interaction (z-30) - Positioned relative to scroll and viewport */}
        <FloatingPortrait />

        {/* Bottom Content - Clean flow on Mobile */}
        <div className="flex flex-col md:flex-row w-full items-start md:items-end justify-between gap-6 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="max-w-[240px] md:max-w-[280px]"
          >
            <p className="text-xs md:text-sm leading-relaxed text-zinc-700 dark:text-zinc-300/80 font-medium">
              Blending data, design, and code to create meaningful digital experiences.
            </p>
          </motion.div>

          <div className="flex flex-col items-start md:items-end gap-1">
            <Typewriter />
          </div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
});

Hero.displayName = "Hero";
