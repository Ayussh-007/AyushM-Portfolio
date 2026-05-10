"use client";

import { motion } from "framer-motion";
import { memo, useRef } from "react";
import { KineticText } from "./KineticText";
import { Briefcase, Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    company: "Future Tech AI",
    role: "AI Research Intern",
    period: "2025 - Present",
    location: "Remote / Mumbai",
    description: "Developing cutting-edge neural architectures for creative web applications and intelligent data visualizations.",
    skills: ["PyTorch", "Next.js", "WebGL"]
  },
  {
    company: "Creative Code Lab",
    role: "Full-Stack Developer",
    period: "2024 - 2025",
    location: "Mumbai",
    description: "Built high-performance interactive interfaces for luxury brands using React and advanced GSAP orchestrations.",
    skills: ["GSAP", "Three.js", "React"]
  },
  {
    company: "Data Insight Corp",
    role: "Data Science Lead",
    period: "2023 - 2024",
    location: "Mumbai",
    description: "Led a team in analyzing large-scale datasets to optimize user engagement metrics and business intelligence reporting.",
    skills: ["Pandas", "Scikit-Learn", "FastAPI"]
  }
];

export const ExperienceSection = memo(() => {
  return (
    <section id="experience" className="relative z-10 px-6 py-40 bg-background/20 backdrop-blur-md overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-32 gap-10">
           <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-6"
              >
                <Briefcase className="w-5 h-5 text-accent-blue" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500">
                  Career Trajectory
                </span>
              </motion.div>

              <h2 className="text-6xl md:text-[10rem] font-black uppercase tracking-tighter leading-none mb-12">
                <KineticText text="Exp" className="block" />
                <KineticText text="erience" className="block text-outline-black dark:text-outline-white" delay={0.2} />
              </h2>
           </div>

           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-zinc-500 max-w-xs text-sm leading-relaxed md:mt-24 border-l border-white/10 pl-8"
           >
              Bridging the gap between theoretical AI research and high-fidelity digital production.
           </motion.div>
        </div>

        <div className="space-y-12">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group relative"
            >
              <div className="glass p-10 md:p-16 rounded-[3rem] transition-all duration-700 hover:border-accent-blue/30 relative overflow-hidden">
                {/* Background Number */}
                <div className="absolute top-10 right-10 text-[12rem] font-black text-white/[0.02] dark:text-white/[0.01] select-none pointer-events-none group-hover:text-accent-blue/5 transition-colors duration-1000">
                   0{i + 1}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
                   <div className="lg:col-span-4">
                      <div className="flex items-center gap-4 text-accent-blue mb-4">
                         <Calendar className="w-4 h-4" />
                         <span className="text-xs font-bold uppercase tracking-widest">{exp.period}</span>
                      </div>
                      <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter group-hover:text-accent-blue transition-colors">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 mt-4 text-zinc-400 font-medium">
                         <MapPin className="w-4 h-4" />
                         <span className="text-sm">{exp.location}</span>
                      </div>
                   </div>

                   <div className="lg:col-span-5 lg:col-start-6">
                      <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                        {exp.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mt-10">
                        {exp.skills.map(skill => (
                          <span key={skill} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase text-zinc-500 dark:text-zinc-500 group-hover:text-accent-blue group-hover:border-accent-blue/20 transition-colors">
                            {skill}
                          </span>
                        ))}
                      </div>
                   </div>

                   <div className="lg:col-span-2 lg:col-start-11 flex justify-end">
                      <h4 className="text-right text-sm font-black uppercase tracking-widest text-zinc-300 dark:text-zinc-700 group-hover:text-accent-blue/40 transition-colors">
                        {exp.company}
                      </h4>
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

ExperienceSection.displayName = "ExperienceSection";
