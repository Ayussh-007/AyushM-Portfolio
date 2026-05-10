"use client";

import { motion, AnimatePresence } from "framer-motion";
import { memo, useRef, useEffect, useState } from "react";
import { TiltCard } from "./TiltCard";
import { GraduationCap, Brain, Zap, Target } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { KineticText } from "./KineticText";

const EducationTimeline = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const education = [
    { year: "2012 - 2023", school: "BJPC Institution", desc: "Primary and Secondary Education." },
    { year: "2023 - 2025", school: "Pace Jr College", desc: "Higher Secondary Education (PCM)." },
    { year: "2025 - Present", school: "Shah & Anchor Kutchhi Engineering College", desc: "B.Tech in AI & Data Science." },
  ];

  useEffect(() => {
    if (!lineRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(lineRef.current, 
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: containerRef.current, start: "top center", end: "bottom center", scrub: true } }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative pl-6 py-4 space-y-8">
      <div className="absolute left-0 top-0 h-full w-[1px] bg-zinc-200 dark:bg-white/5" />
      <div ref={lineRef} className="absolute left-0 top-0 h-full w-[1px] bg-accent-cyan origin-top shadow-[0_0_8px_#22D3EE]" />

      {education.map((item, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="absolute -left-[27px] top-1 h-2.5 w-2.5 rounded-full border border-accent-cyan bg-background z-10 transition-transform group-hover:scale-125" />
          <div className="flex flex-col gap-0.5">
            <span className="text-[8px] font-black text-accent-cyan uppercase tracking-[0.2em] block">{item.year}</span>
            <h4 className="text-sm md:text-lg font-black uppercase tracking-tighter text-zinc-900 dark:text-zinc-100">{item.school}</h4>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">{item.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
});
EducationTimeline.displayName = "EducationTimeline";

const focusKeywords = ["AI Architectures", "Full Stack Systems", "UI Engineering", "Data Analytics"];

export const AboutSection = memo(() => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIndex(prev => (prev + 1) % focusKeywords.length), 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="about" className="relative z-10 px-6 py-24 bg-background overflow-hidden scroll-gpu border-t border-white/5">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight mb-4">
            <KineticText text="About" className="block" />
            <KineticText text="The Vision" className="block text-outline-black dark:text-outline-white" delay={0.1} />
          </h2>
          <p className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-widest font-bold opacity-40">
             Strategic identity and digital narrative.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* 🟢 UNIFIED IDENTITY CARD */}
          <TiltCard className="md:col-span-8 h-[320px]">
            <div className="glass h-full p-10 flex flex-col justify-between overflow-hidden relative rounded-[2.5rem]">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Brain className="w-40 h-48" />
              </div>
              <div className="p-2.5 bg-accent-blue/10 rounded-xl border border-accent-blue/20 w-fit">
                 <Brain className="w-5 h-5 text-accent-blue" />
              </div>
              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter mb-4">Who I Am</h3>
                <p className="text-sm md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl font-medium">
                  I’m Ayush Mhatre — a technology enthusiast passionate about building creative digital experiences and solving real-world problems through code. Driven by curiosity and continuous learning, I enjoy exploring new technologies, refining ideas, and turning challenges into meaningful solutions.
                </p>
              </div>
            </div>
          </TiltCard>

          {/* 🟢 UNIFIED EDUCATION CARD */}
          <TiltCard className="md:col-span-4 h-full md:row-span-2">
            <div className="glass h-full p-10 flex flex-col rounded-[2.5rem]">
              <div className="p-2.5 bg-accent-cyan/10 rounded-xl border border-accent-cyan/20 w-fit mb-8">
                 <GraduationCap className="w-5 h-5 text-accent-cyan" />
              </div>
              <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter mb-8">Academic Core</h3>
              <EducationTimeline />
            </div>
          </TiltCard>

          {/* 🟢 UNIFIED FOCUS CARD */}
          <TiltCard className="md:col-span-5 h-[280px]">
            <div className="glass h-full p-10 flex flex-col justify-between relative overflow-hidden rounded-[2.5rem]">
               <div className="p-2.5 bg-green-500/10 rounded-xl w-fit border border-green-500/20">
                 <Target className="w-5 h-5 text-green-500" />
               </div>
               <div>
                  <h3 className="text-[8px] font-black uppercase tracking-[0.3em] mb-2 opacity-30">Current Focus</h3>
                  <div className="h-10 flex items-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={focusKeywords[index]}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        className="text-xl md:text-2xl font-black text-accent-cyan uppercase tracking-tighter"
                      >
                        {focusKeywords[index]}
                      </motion.div>
                    </AnimatePresence>
                  </div>
               </div>
            </div>
          </TiltCard>

          {/* 🟢 UNIFIED QUOTE CARD */}
          <TiltCard className="md:col-span-3 h-[280px]">
            <div className="glass h-full p-10 relative overflow-hidden flex flex-col justify-end rounded-[2.5rem]">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 via-transparent to-accent-red/5 opacity-50" />
              <div className="p-2.5 bg-white/10 rounded-xl w-fit mb-6 border border-white/20">
                <Zap className="w-4 h-4 text-white animate-pulse" />
              </div>
              <p className="text-lg md:text-xl font-black leading-tight tracking-tighter uppercase">
                “Intelligence <br /> meets <br /> <span className="text-accent-cyan">Experience.</span>”
              </p>
            </div>
          </TiltCard>

        </div>
      </div>
    </section>
  );
});

AboutSection.displayName = "AboutSection";
