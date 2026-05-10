"use client";

import { motion } from "framer-motion";
import { memo, useState } from "react";
import { KineticText } from "./KineticText";
import { MagneticButton } from "./MagneticButton";
import { Mail, ArrowUpRight, Send, Globe } from "lucide-react";

export const ContactSection = memo(() => {
  const [formState, setFormState] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    setTimeout(() => setFormState("success"), 2000);
  };

  return (
    <section id="contact" className="relative z-10 px-6 py-40 bg-background/50 backdrop-blur-xl overflow-hidden scroll-gpu">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           
           <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-6"
              >
                <Globe className="w-5 h-5 text-accent-cyan animate-spin-slow" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500">
                  Global Portal
                </span>
              </motion.div>

              <h2 className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter leading-[0.8] mb-12">
                <KineticText text="Let's" className="block" />
                <KineticText text="Connect" className="block text-accent-cyan" delay={0.2} />
              </h2>

              <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 font-medium max-w-md leading-relaxed mb-12">
                Currently exploring new horizons in AI and high-fidelity web engineering. 
                My portal is always open for revolutionary ideas.
              </p>

              <div className="flex flex-col gap-6">
                 <a href="mailto:007ayushmhatre@gmail.com" className="group flex items-center gap-6">
                    <div className="p-5 glass rounded-2xl group-hover:bg-accent-cyan/10 transition-colors">
                       <Mail className="w-6 h-6 text-accent-cyan" />
                    </div>
                    <div>
                       <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 block mb-1">Direct Mail</span>
                       <span className="text-xl font-bold group-hover:text-accent-cyan transition-colors">007ayushmhatre@gmail.com</span>
                    </div>
                 </a>
              </div>
           </div>

           <div className="relative">
              <div className="glass p-10 md:p-16 rounded-[3.5rem] relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 via-transparent to-accent-blue/5" />
                 
                 <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 ml-4">Full Name</label>
                       <input 
                         required
                         type="text" 
                         placeholder="Enter your name"
                         className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-5 text-sm focus:outline-none focus:border-accent-cyan/50 transition-colors placeholder:text-zinc-700"
                       />
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 ml-4">Email Address</label>
                       <input 
                         required
                         type="email" 
                         placeholder="Enter your email"
                         className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-5 text-sm focus:outline-none focus:border-accent-cyan/50 transition-colors placeholder:text-zinc-700"
                       />
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 ml-4">Your Vision</label>
                       <textarea 
                         required
                         rows={4}
                         placeholder="Tell me about your project"
                         className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-8 py-5 text-sm focus:outline-none focus:border-accent-cyan/50 transition-colors placeholder:text-zinc-700 resize-none"
                       />
                    </div>

                    <MagneticButton className="w-full">
                       <button 
                         type="submit"
                         disabled={formState !== "idle"}
                         className="w-full py-5 bg-white text-black dark:bg-white dark:text-black rounded-full font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3 transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                       >
                          {formState === "idle" && <><Send className="w-4 h-4" /> Initiate Transmission</>}
                          {formState === "sending" && <span className="animate-pulse">Transmitting...</span>}
                          {formState === "success" && "Transmission Received"}
                       </button>
                    </MagneticButton>
                 </form>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-cyan/10 blur-[80px] rounded-full -z-10" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent-blue/10 blur-[80px] rounded-full -z-10" />
           </div>
        </div>
      </div>
    </section>
  );
});

ContactSection.displayName = "ContactSection";
