"use client";

import { motion, AnimatePresence } from "framer-motion";
import { memo, useRef, useState, useEffect } from "react";
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

const ExternalLinkSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 22 3 22 9" />
    <line x1="10" y1="14" x2="22" y2="3" />
  </svg>
);

const ActivitySVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const CpuSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
    <rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="1" x2="9" y2="4" />
    <line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" />
    <line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" />
    <line x1="20" y1="15" x2="23" y2="15" />
    <line x1="1" y1="9" x2="4" y2="9" />
    <line x1="1" y1="15" x2="4" y2="15" />
  </svg>
);

const CalendarSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const LayoutSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="9" y1="21" x2="9" y2="9" />
  </svg>
);

const NAVABackground = () => (
  <div className="absolute inset-0 z-0 opacity-20 overflow-hidden">
    <div className="absolute inset-0 flex items-center justify-center gap-1">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-accent-cyan rounded-full"
          animate={{ height: [20, 60, 20], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.05, ease: "easeInOut" }}
        />
      ))}
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
  </div>
);

const NeuralBackground = () => (
  <div className="absolute inset-0 z-0 opacity-20 overflow-hidden">
    <svg className="h-full w-full">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-accent-blue/30" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      {[...Array(5)].map((_, i) => (
        <motion.circle
          key={i}
          cx={`${20 + i * 15}%`}
          cy={`${30 + (i % 2) * 40}%`}
          r="2"
          fill="var(--color-accent-blue)"
          animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}
    </svg>
    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-accent-blue/5 to-transparent" />
  </div>
);

const PlannerBackground = () => (
  <div className="absolute inset-0 z-0 opacity-10 overflow-hidden">
    <div className="grid grid-cols-6 grid-rows-6 gap-1 p-10 h-full w-full">
      {[...Array(36)].map((_, i) => (
        <motion.div key={i} className="border border-white/20 rounded-sm" whileHover={{ backgroundColor: "rgba(34, 211, 238, 0.2)" }} />
      ))}
    </div>
  </div>
);

const PortfolioBackground = () => (
  <div className="absolute inset-0 z-0 opacity-20 overflow-hidden">
    <motion.div
      className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,var(--color-accent-cyan),transparent_50%)]"
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

const projects = [
  { id: "nava", title: "N.A.V.A", tagline: "Neural Voice Assistant", description: "Advanced AI voice assistant using NLP and audio synthesis.", tech: ["Python", "TensorFlow", "React"], icon: <ActivitySVG />, background: <NAVABackground />, github: "#", live: "#" },
  { id: "mtrx", title: "MTRX-TriAxis", tagline: "AI Coordinate Engine", description: "Coordinate processing for complex 3D spatial intelligence.", tech: ["C++", "CUDA", "Three.js"], icon: <CpuSVG />, background: <NeuralBackground />, github: "#", live: "#" },
  { id: "planner", title: "Smart Study Planner", tagline: "Intelligent Productivity", description: "Predictive scheduling application using machine learning.", tech: ["Next.js", "ML.js", "Tailwind"], icon: <CalendarSVG />, background: <PlannerBackground />, github: "#", live: "#" },
  { id: "portfolio", title: "Portfolio Website", tagline: "Cinematic Web Experience", description: "A fusion of Apple storytelling and Awwwards-winning design.", tech: ["React", "Next.js", "GSAP"], icon: <LayoutSVG />, background: <PortfolioBackground />, github: "#", live: "#" }
];

const ProjectCard = memo(({ project }: { project: typeof projects[0] }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <TiltCard className="h-full">
      <div 
        className="glass h-[450px] w-full relative overflow-hidden rounded-[2.5rem] flex flex-col group p-8"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {project.background}
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-2">
              <motion.div className="p-3 bg-white/5 rounded-2xl w-fit backdrop-blur-md border border-white/10" whileHover={{ scale: 1.1, rotate: 5 }}>
                {project.icon}
              </motion.div>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40 mt-2">ProjectUniverse</span>
            </div>
          </div>
          <div className="mt-auto">
            <h3 className="text-4xl font-black uppercase tracking-tighter mb-2">{project.title}</h3>
            <p className="text-accent-cyan font-bold uppercase text-[10px] tracking-widest mb-4">{project.tagline}</p>
            <AnimatePresence>
              {isExpanded && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: "circOut" }} className="overflow-hidden">
                  <p className="text-sm text-zinc-400 leading-relaxed mb-6 max-w-md">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-8">{project.tech.map(t => (<span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-bold uppercase text-zinc-300">{t}</span>))}</div>
                  <div className="flex gap-4">
                    <MagneticButton><a href={project.github} className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full text-[10px] font-black uppercase transition-transform hover:scale-105">GitHub</a></MagneticButton>
                    <MagneticButton><a href={project.live} className="flex items-center gap-2 px-6 py-3 border border-white/20 rounded-full text-[10px] font-black uppercase transition-all hover:bg-white/5">Preview</a></MagneticButton>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {!isExpanded && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4 mt-2"><span className="text-[10px] font-bold opacity-30 uppercase tracking-widest flex items-center gap-2">Hover to expand <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span></span></motion.div>)}
          </div>
        </div>
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-accent-cyan/10 blur-[100px] rounded-full group-hover:bg-accent-cyan/20 transition-colors duration-700" />
      </div>
    </TiltCard>
  );
});
ProjectCard.displayName = "ProjectCard";

export const ProjectsSection = memo(() => {
  return (
    <section id="works" className="relative z-10 px-6 py-40 bg-background/50 backdrop-blur-sm overflow-hidden scroll-gpu">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <h2 className="text-6xl md:text-[10rem] font-black uppercase tracking-tighter leading-none">
            <KineticText text="Selected" className="block" />
            <KineticText text="Works" className="block text-accent-blue" delay={0.2} />
          </h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-zinc-500 max-w-xs text-sm leading-relaxed mb-6">
            A collection of intelligent systems and creative interfaces crafted at the intersection of AI and Web.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {projects.map((project, i) => (
            <motion.div key={project.id} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.8, ease: "circOut" }}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});
ProjectsSection.displayName = "ProjectsSection";
