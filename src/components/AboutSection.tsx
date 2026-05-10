"use client";

import { motion, AnimatePresence } from "framer-motion";
import { memo, useRef, useEffect, useState } from "react";
import { TiltCard } from "./TiltCard";
import { GraduationCap, Brain, Zap, Target } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { KineticText } from "./KineticText";

// 1. EDUCATION TIMELINE COMPONENT - Optimized
const EducationTimeline = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const education = [
    { year: "2018 - 2020", school: "BJPC Institution", desc: "Foundational secondary education with a focus on core sciences." },
    { year: "2020 - 2022", school: "Pace Jr College", desc: "Advanced Higher Secondary studies specializing in PCM." },
    { year: "2022 - 2026", school: "Shah & Anchor Kutchhi Engineering", desc: "Engineering in AI & Data Science. Building the future of intelligent systems." },
  ];

  useEffect(() => {
    if (!lineRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(lineRef.current, 
        { scaleY: 0 },
        { 
          scaleY: 1, 
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "bottom center",
            scrub: true // Zero-lag scrub
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative pl-8 py-4 space-y-12">
      {/* Glowing Progress Line */}
      <div className="absolute left-0 top-0 h-full w-[2px] bg-white/5" />
      <div ref={lineRef} className="absolute left-0 top-0 h-full w-[2px] bg-accent-cyan origin-top shadow-[0_0_10px_#22D3EE]" />

      {education.map((item, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }}
          className="relative"
        >
          <div className="absolute -left-[37px] top-1.5 h-4 w-4 rounded-full border-2 border-accent-cyan bg-background z-10 shadow-[0_0_8px_#22D3EE]" />
          <span className="text-[10px] font-bold text-accent-cyan uppercase tracking-widest block mb-1">
            {item.year}
          </span>
          <h4 className="text-xl font-bold text-foreground">{item.school}</h4>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            {item.desc}
          </p>
        </motion.div>
      ))}
    </div>
  );
});
EducationTimeline.displayName = "EducationTimeline";

const focusKeywords = ["AI Systems", "Full Stack Apps", "UI Engineering", "Intelligent Automation"];

export const AboutSection = memo(() => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex(prev => (prev + 1) % focusKeywords.length), 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative z-10 px-6 py-40 bg-background/20 backdrop-blur-md overflow-hidden">
      <div className="container mx-auto">
        <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-20">
          <KineticText text="About" className="block" />
          <KineticText text="The Vision" className="block text-outline-black dark:text-outline-white" delay={0.2} />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto">
          
          <TiltCard className="md:col-span-7 h-[400px]">
            <div className="glass h-full p-10 flex flex-col justify-between overflow-hidden">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-accent-blue/10 rounded-2xl">
                  <Brain className="w-6 h-6 text-accent-blue" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">Identity</span>
              </div>
              <div>
                <h3 className="text-4xl font-bold mb-6">Who I Am</h3>
                <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl">
                  I am a curiosity-driven engineer at the intersection of intelligence and design. 
                  My mindset is built on solving complex problems with creative technology. 
                </p>
              </div>
            </div>
          </TiltCard>

          <TiltCard className="md:col-span-5 md:row-span-2 h-auto">
            <div className="glass h-full p-10 overflow-hidden">
               <div className="flex justify-between items-start mb-12">
                <div className="p-3 bg-accent-cyan/10 rounded-2xl">
                  <GraduationCap className="w-6 h-6 text-accent-cyan" />
                </div>
              </div>
              <h3 className="text-4xl font-bold mb-10">Education</h3>
              <EducationTimeline />
            </div>
          </TiltCard>

          <TiltCard className="md:col-span-4 h-[350px]">
            <div className="glass h-full p-10 flex flex-col justify-between relative overflow-hidden">
              <Target className="w-6 h-6 text-green-500 mb-4" />
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-4 opacity-50">Current Focus</h3>
                <div className="h-12 flex items-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={focusKeywords[index]}
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      className="text-3xl font-black text-accent-cyan uppercase tracking-tight"
                    >
                      {focusKeywords[index]}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </TiltCard>

          <TiltCard className="md:col-span-3 h-[350px]">
            <div className="glass h-full p-10 relative overflow-hidden flex flex-col justify-end">
              <div className="absolute inset-0 z-0 bg-gradient-to-br from-accent-blue/5 via-transparent to-accent-red/5 opacity-40" />
              <Zap className="w-5 h-5 text-white mb-6 relative z-10" />
              <p className="text-2xl font-bold leading-tight italic tracking-tight relative z-10">
                “Technology should feel human.”
              </p>
            </div>
          </TiltCard>

        </div>
      </div>
    </section>
  );
});

AboutSection.displayName = "AboutSection";
