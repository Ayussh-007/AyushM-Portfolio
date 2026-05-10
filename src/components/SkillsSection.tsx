"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { memo, useRef, useEffect, useState } from "react";
import { TechSphere } from "./TechSphere";
import { TiltCard } from "./TiltCard";
import { Code2, Cpu, Wrench } from "lucide-react";
import { KineticText } from "./KineticText";

const webSkills = ["React", "Next.js", "Node.js", "TailwindCSS", "TypeScript", "JavaScript"];
const aiSkills = ["Python", "Pandas", "Scikit-learn", "TensorFlow", "Keras", "NumPy"];
const toolSkills = ["Blender", "VS Code", "AutoCAD", "Git", "Figma", "Docker"];

const SkillMarquee = memo(({ items, direction = 1, isMobile = false }: { items: string[], direction?: 1 | -1, isMobile?: boolean }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const xOffset = useTransform(scrollYProgress, [0, 1], [0, direction * (isMobile ? 100 : 200)]);

  return (
    <div ref={containerRef} className="relative flex overflow-hidden py-2">
      <motion.div
        style={{ x: xOffset }}
        className="flex gap-4 whitespace-nowrap"
      >
        <motion.div
           animate={{
            x: direction === 1 ? [0, -1000] : [-1000, 0]
          }}
          transition={{
            duration: isMobile ? 60 : 40, // Slower on mobile for GPU relief
            repeat: Infinity,
            ease: "linear"
          }}
          className="flex gap-4"
        >
          {[...items, ...items, ...items, ...items].map((item, i) => (
            <div
              key={i}
              className="px-4 md:px-6 py-2 rounded-full border border-white/5 glass text-[9px] md:text-[10px] font-bold uppercase tracking-widest"
            >
              {item}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
});
SkillMarquee.displayName = "SkillMarquee";

export const SkillsSection = memo(() => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="relative z-10 px-6 py-24 md:py-40 bg-background/10 backdrop-blur-sm overflow-hidden">
      <div className="container mx-auto">
        <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-12 md:mb-20 text-left md:text-right">
          <KineticText text="Technical" className="block" />
          <KineticText text="Ecosystem" className="block text-accent-cyan" delay={0.2} />
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-10 items-center">
          
          {/* Tech Sphere - Scaled for Mobile */}
          <div className="order-2 lg:order-1 opacity-80 h-[400px] md:h-auto">
            <TechSphere />
          </div>

          <div className="space-y-6 md:space-y-8 order-1 lg:order-2">
            
            <div className="space-y-2">
              <div className="flex items-center gap-3 mb-2">
                <Code2 className="w-4 h-4 md:w-5 md:h-5 text-accent-blue" />
                <h3 className="text-[10px] md:text-sm font-bold uppercase tracking-widest opacity-60">Web Engineering</h3>
              </div>
              <SkillMarquee items={webSkills} direction={1} isMobile={isMobile} />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3 mb-2">
                <Cpu className="w-4 h-4 md:w-5 md:h-5 text-accent-cyan" />
                <h3 className="text-[10px] md:text-sm font-bold uppercase tracking-widest opacity-60">Intelligence</h3>
              </div>
              <SkillMarquee items={aiSkills} direction={-1} isMobile={isMobile} />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3 mb-2">
                <Wrench className="w-4 h-4 md:w-5 md:h-5 text-zinc-400" />
                <h3 className="text-[10px] md:text-sm font-bold uppercase tracking-widest opacity-60">Tools & Ops</h3>
              </div>
              <SkillMarquee items={toolSkills} direction={1} isMobile={isMobile} />
            </div>

            <TiltCard>
              <div className="glass p-6 md:p-8 mt-4 md:mt-6 relative overflow-hidden group rounded-3xl">
                 <h4 className="text-base md:text-lg font-bold mb-2 uppercase tracking-tighter">Always Evolving</h4>
                 <p className="text-zinc-500 dark:text-zinc-400 text-[10px] md:text-xs leading-relaxed max-w-sm">
                   Continuously expanding boundaries across neural architectures and creative technologies.
                 </p>
              </div>
            </TiltCard>

          </div>
        </div>
      </div>
    </section>
  );
});

SkillsSection.displayName = "SkillsSection";
