"use client";

import { motion } from "framer-motion";
import { memo } from "react";
import { Typewriter } from "./Typewriter";
import { FloatingPortrait } from "./FloatingPortrait";
import { ScrollIndicator } from "./ScrollIndicator";
import { Spotlight } from "./Spotlight";
import { KineticText } from "./KineticText";

export const Hero = memo(() => {
  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col items-center select-none bg-background">
      
      {/* 🌌 High-Fidelity Atmosphere */}
      <div className="absolute inset-0 -z-10 pointer-events-none text-foreground">
        <Spotlight />
        
        {/* Luxury Lighting Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.01)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />
        
        {/* Soft Background Texture */}
        <div className="noise-bg opacity-[0.015]" />
        
        {/* Deep Bottom Fog */}
        <div className="absolute inset-x-0 bottom-0 h-[45vh] bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      {/* 🏛️ Main Cinematic Composition */}
      <div className="relative z-[20] h-full w-full flex flex-col justify-between px-6 md:px-20 py-16 md:py-24 max-w-[1800px] pointer-events-none">
        
        {/* TOP: Strategic Branding */}
        <div className="flex flex-col gap-6 pointer-events-auto">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="flex items-center gap-3"
          >
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400 dark:text-zinc-500">
              System Active / 2026
            </span>
          </motion.div>

          <div className="relative py-4">
            {/* 💎 MASSIVE PREMIUM TYPOGRAPHY - NO OVERFLOW CLIPPING */}
            <h1 className="text-7xl md:text-[11.5rem] font-black uppercase leading-[0.9] tracking-tighter">
              <div className="relative">
                <KineticText 
                  text="AYUSH" 
                  className="block text-zinc-900 dark:text-white" 
                  stagger={0.04}
                />
              </div>
              <div className="relative md:mt-4">
                <KineticText 
                  text="MHATRE" 
                  className="block text-outline-cinematic" 
                  delay={0.4}
                  stagger={0.04}
                />
              </div>
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col gap-3"
          >
             <p className="text-xl md:text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100/80">
               AI & Data Science Engineer
             </p>
             <div className="h-[2px] w-16 bg-accent-cyan/30 rounded-full" />
          </motion.div>
        </div>

        {/* CENTER: Floating Portrait */}
        <FloatingPortrait />

        {/* BOTTOM: Narrative */}
        <div className="flex flex-col md:flex-row w-full items-start md:items-end justify-between gap-10 pointer-events-auto">
          <p className="text-xs md:text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 font-medium border-l-[3px] border-accent-cyan/10 pl-6 uppercase tracking-[0.2em]">
            Architecting high-fidelity <br /> digital systems at the nexus <br /> of logic and cinema.
          </p>

          <div className="flex flex-col items-start md:items-end gap-2">
             <span className="text-[9px] font-black uppercase tracking-[0.5em] opacity-20">Operational Stack</span>
            <Typewriter />
          </div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
});

Hero.displayName = "Hero";
