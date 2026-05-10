"use client";

import { motion, AnimatePresence } from "framer-motion";
import { memo, useState } from "react";
import { TiltCard } from "./TiltCard";
import { MagneticButton } from "./MagneticButton";
import { KineticText } from "./KineticText";

// --- Custom SVGs for Icons ---
const GithubSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const MusicSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
);

const GamepadSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <line x1="6" y1="12" x2="10" y2="12" />
    <line x1="8" y1="10" x2="8" y2="14" />
    <rect x="15" y="13" width="3" height="3" rx="0.5" />
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8Z" />
  </svg>
);

const ClockSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const AtomSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <circle cx="12" cy="12" r="1" />
    <path d="M20.2 20.2c2.04-2.03.02-7.36-4.52-11.9s-9.87-6.56-11.9-4.52 0 7.36 4.52 11.9 9.87 6.56 11.9 4.52z" />
    <path d="M3.8 3.8c-2.04 2.03-.02 7.36 4.52 11.9s9.87 6.56 11.9 4.52 0-7.36-4.52-11.9-9.87-6.56-11.9-4.52z" />
  </svg>
);

const MicSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="22" />
  </svg>
);

const projects = [
  { 
    id: "xolo", 
    title: "XOLO", 
    tagline: "Multimodal AI Music", 
    description: "AI mobile app translating visual DNA of photos into unique musical compositions using OpenAI's CLIP model.", 
    icon: <MusicSVG />, 
    github: "https://github.com/Ayussh-007/XOLO" 
  },
  { 
    id: "incursion", 
    title: "INCURSION", 
    tagline: "Sci-Fi Interactive", 
    description: "Hyper-realistic cinematic game experience featuring WebGL Earth rendering and immersive spatial audio design.", 
    icon: <GamepadSVG />, 
    github: "https://github.com/Ayussh-007/Incursion" 
  },
  { 
    id: "planner", 
    title: "Student Planner", 
    tagline: "Intelligent Productivity", 
    description: "Smart desktop planner built with Java and SQLite that generates personalized, priority-based study schedules.", 
    icon: <ClockSVG />, 
    github: "https://github.com/Ayussh-007/StudentPlanner" 
  },
  { 
    id: "qurie", 
    title: "Qurie", 
    tagline: "3D Physics Simulation", 
    description: "Interactive platform for visualizing complex scientific concepts through immersive 3D simulations and explorations.", 
    icon: <AtomSVG />, 
    github: "https://github.com/Ayussh-007/Qurie" 
  },
  { 
    id: "nava", 
    title: "N.A.V.A", 
    tagline: "AI Voice Assistant", 
    description: "Digital assistant performing voice recognition, web searches, weather reporting, and automated task execution.", 
    icon: <MicSVG />, 
    github: "https://github.com/Manthan-Railkar/N.A.V.A" 
  },
];

const ProjectCard = memo(({ project }: { project: typeof projects[0] }) => {
  return (
    <TiltCard className="h-full">
      <div className="glass h-full min-h-[340px] w-full relative overflow-hidden rounded-[2rem] flex flex-col p-8 group transition-all duration-500 hover:border-accent-cyan/20">
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex justify-between items-start mb-6">
            <div className="p-2.5 bg-white/5 rounded-lg border border-white/10 group-hover:bg-accent-cyan/10 transition-colors">
              {project.icon}
            </div>
            <span className="text-[8px] font-black uppercase tracking-[0.4em] opacity-20">Project Node</span>
          </div>

          <div className="mt-auto">
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-1 group-hover:text-accent-cyan transition-colors">{project.title}</h3>
            <p className="text-accent-cyan font-bold uppercase text-[8px] tracking-[0.2em] mb-4">{project.tagline}</p>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6 font-bold uppercase tracking-widest opacity-60">
              {project.description}
            </p>
            <div className="flex gap-3">
              <MagneticButton><a href={project.github} target="_blank" rel="noopener noreferrer" className="px-5 py-2 bg-black dark:bg-white text-white dark:text-black rounded-full text-[9px] font-black uppercase tracking-widest transition-transform hover:scale-105 active:scale-95 shadow-lg">GitHub</a></MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </TiltCard>
  );
});
ProjectCard.displayName = "ProjectCard";

export const ProjectsSection = memo(() => {
  return (
    <section id="works" className="relative z-10 px-6 py-20 bg-background overflow-hidden border-t border-white/5">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-8">
          <div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight">
              <KineticText text="Selected" className="block" />
              <KineticText text="Works" className="block text-accent-cyan" delay={0.1} />
            </h2>
          </div>
          <p className="text-[10px] md:text-xs text-zinc-500 max-w-sm leading-relaxed uppercase tracking-widest font-bold opacity-40 md:mt-1 border-l-2 border-accent-blue/10 pl-5">
            Intelligent systems and cinematic interfaces built at the boundary of ML and web architecture.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});
ProjectsSection.displayName = "ProjectsSection";
