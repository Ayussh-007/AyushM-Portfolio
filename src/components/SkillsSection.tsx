"use client";

import { motion } from "framer-motion";
import { memo } from "react";
import { TechSphere } from "./TechSphere";
import { Code2, Cpu, Wrench, Sparkles, Orbit } from "lucide-react";
import { KineticText } from "./KineticText";

const webSkills = ["React", "Next.js", "Node.js", "TailwindCSS", "TypeScript", "JavaScript"];
const aiSkills = ["Python", "Pandas", "Scikit-learn", "TensorFlow", "Keras", "NumPy"];
const toolSkills = ["Blender", "VS Code", "AutoCAD", "Git", "Figma", "Docker"];

const SkillMarquee = memo(({ items, direction = 1 }: { items: string[], direction?: 1 | -1 }) => (
  <div className="relative flex overflow-hidden py-2">
    <motion.div
      animate={{ x: direction === 1 ? [0, -1000] : [-1000, 0] }}
      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      className="flex gap-3"
    >
      {[...items, ...items, ...items, ...items].map((skill, i) => (
        <span 
          key={i} 
          className="px-4 py-2 rounded-xl glass border border-white/10 text-[9px] font-black uppercase tracking-[0.2em] whitespace-nowrap hover:border-accent-cyan hover:text-accent-cyan transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
        >
          {skill}
        </span>
      ))}
    </motion.div>
  </div>
));
SkillMarquee.displayName = "SkillMarquee";

export const SkillsSection = memo(() => {
  return (
    <section id="skills" className="relative z-10 px-6 py-20 bg-background overflow-hidden border-t border-white/5">
      <div className="container mx-auto max-w-6xl">
        
        {/* 1. CINEMATIC HEADER - Scaled down */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 mb-4"
            >
              <Orbit className="w-4 h-4 text-accent-cyan animate-spin-slow" />
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500">Neural Infrastructure</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] select-none">
              <KineticText text="Technical" className="block" />
              <KineticText text="Ecosystem" className="block text-accent-cyan" delay={0.1} />
            </h2>
          </div>
          
          <p className="text-xs md:text-sm text-zinc-500 max-w-xs leading-relaxed uppercase tracking-widest font-bold opacity-40 border-l-2 border-accent-blue/20 pl-6 md:mt-2">
             High-precision technical repertoire focused on machine intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* 🛸 THE 3D SPHERE VISUALIZER (Col 1-7) - More Compact */}
          <div className="lg:col-span-7 h-[350px] md:h-[500px] relative rounded-[2.5rem] border border-white/5 overflow-hidden bg-zinc-950/20 shadow-xl group">
             {/* HUD elements - Compacted */}
             <div className="absolute top-6 left-6 z-20 flex flex-col gap-1 opacity-30 group-hover:opacity-100 transition-opacity duration-700">
                <div className="flex items-center gap-2">
                   <div className="h-1.5 w-1.5 rounded-full bg-accent-cyan animate-pulse" />
                   <span className="text-[8px] font-black uppercase tracking-[0.4em]">Link: Stable</span>
                </div>
                <div className="h-[1px] w-16 bg-gradient-to-r from-accent-cyan to-transparent" />
             </div>

             <div className="absolute bottom-6 right-6 z-20 text-right opacity-20 group-hover:opacity-100 transition-opacity duration-700">
                <span className="text-[7px] font-black uppercase tracking-[0.4em]">3D Engine v2.0</span>
                <p className="text-[6px] font-mono text-accent-cyan mt-0.5">[ Drag ]</p>
             </div>

             {/* The 3D Canvas */}
             <TechSphere />
             
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.02)_0%,transparent_70%)] pointer-events-none" />
          </div>

          {/* ⚡ INFINITE MARQUEE INTERFACE (Col 8-12) - More Compact */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 ml-2 opacity-50">
                <Code2 className="w-3.5 h-3.5 text-accent-blue" />
                <h3 className="text-[8px] font-black uppercase tracking-[0.3em]">Engineering</h3>
              </div>
              <SkillMarquee items={webSkills} direction={1} />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 ml-2 opacity-50">
                <Cpu className="w-3.5 h-3.5 text-accent-cyan" />
                <h3 className="text-[8px] font-black uppercase tracking-[0.3em]">Intelligence</h3>
              </div>
              <SkillMarquee items={aiSkills} direction={-1} />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 ml-2 opacity-50">
                <Wrench className="w-3.5 h-3.5 text-zinc-400" />
                <h3 className="text-[8px] font-black uppercase tracking-[0.3em]">Systems</h3>
              </div>
              <SkillMarquee items={toolSkills} direction={1} />
            </div>

            <div className="p-6 rounded-[2rem] glass border border-white/5 relative overflow-hidden group/card mt-4">
               <div className="absolute top-0 right-0 p-4 opacity-5 group-hover/card:opacity-10 transition-opacity">
                  <Cpu className="w-12 h-12 text-accent-cyan" />
               </div>
               <h4 className="text-xs font-black uppercase tracking-widest mb-2 transition-colors group-hover/card:text-accent-cyan">Vision Protocol</h4>
               <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest leading-relaxed">
                 Constantly evolving through rigorous research and high-fidelity interaction.
               </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
});

SkillsSection.displayName = "SkillsSection";
