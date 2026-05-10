"use client";

import { motion } from "framer-motion";
import { memo, useState, useActionState } from "react";
import { KineticText } from "./KineticText";
import { MagneticButton } from "./MagneticButton";
import { Mail, Send, Globe, MessageSquare, ArrowUpRight } from "lucide-react";
import { submitContactForm, FormState } from "@/app/actions";

const initialState: FormState = {
  success: false,
  message: "",
  errors: {},
};

export const ContactSection = memo(() => {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);

  return (
    <section id="contact" className="relative z-10 px-6 md:px-16 py-48 bg-background/50 backdrop-blur-3xl overflow-hidden scroll-gpu">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
           
           {/* 🌍 STRATEGIC INTEL (Col 1-5) */}
           <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-10"
              >
                <div className="p-2 bg-accent-cyan/10 rounded-lg">
                  <Globe className="w-5 h-5 text-accent-cyan animate-spin-slow" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500">
                  Global Interaction Portal
                </span>
              </motion.div>

              <h2 className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter leading-[0.8] mb-16">
                <KineticText text="Initiate" className="block" />
                <KineticText text="Contact" className="block text-accent-cyan" delay={0.2} />
              </h2>

              <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 font-medium max-w-md leading-relaxed mb-16 border-l border-zinc-200 dark:border-white/10 pl-8">
                Ready to engineer high-fidelity digital solutions. My transmission channel is open for revolutionary collaborations.
              </p>

              <div className="space-y-8">
                 <a 
                   href="mailto:007ayushmhatre@gmail.com" 
                   className="group flex items-center gap-8 p-6 glass rounded-3xl hover:border-accent-cyan/30 transition-all duration-500"
                 >
                    <div className="p-5 bg-white/5 dark:bg-white/[0.02] rounded-2xl border border-white/10 group-hover:bg-accent-cyan/10 transition-colors">
                       <Mail className="w-6 h-6 text-accent-cyan" />
                    </div>
                    <div>
                       <span className="text-[9px] font-black uppercase tracking-[0.4em] opacity-40 block mb-2">Primary Node</span>
                       <span className="text-xl font-bold group-hover:text-accent-cyan transition-colors block">ayushmhatre.tech</span>
                    </div>
                    <ArrowUpRight className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-40 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                 </a>
              </div>
           </div>

           {/* 🛡️ TRANSMISSION INTERFACE (Col 7-12) */}
           <div className="lg:col-span-6 lg:col-start-7 relative">
              <div className="glass p-10 md:p-16 rounded-[3.5rem] relative overflow-hidden shadow-2xl">
                 <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 via-transparent to-accent-blue/5 opacity-50" />
                 
                 <div className="flex items-center gap-4 mb-12 relative z-10">
                    <MessageSquare className="w-5 h-5 text-accent-cyan" />
                    <h3 className="text-sm font-black uppercase tracking-[0.4em] opacity-60">Secure Transmission</h3>
                 </div>

                 <form action={formAction} className="relative z-10 space-y-10">
                    <input type="text" name="botField" className="hidden" aria-hidden="true" />

                    <div className="space-y-3">
                       <label className="text-[9px] font-black uppercase tracking-[0.4em] opacity-30 ml-6">Identify Yourself</label>
                       <input 
                         required
                         name="name"
                         type="text" 
                         placeholder="NAME / ENTITY"
                         className="w-full bg-black/5 dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-full px-10 py-6 text-sm font-bold tracking-widest focus:outline-none focus:border-accent-cyan/40 transition-all placeholder:text-zinc-600 focus:bg-white/10 dark:focus:bg-white/[0.05]"
                       />
                       {state?.errors?.name && <p className="text-[10px] font-bold text-red-500 ml-10 uppercase tracking-widest">{state.errors.name[0]}</p>}
                    </div>

                    <div className="space-y-3">
                       <label className="text-[9px] font-black uppercase tracking-[0.4em] opacity-30 ml-6">Digital Address</label>
                       <input 
                         required
                         name="email"
                         type="email" 
                         placeholder="EMAIL@DOMAIN.COM"
                         className="w-full bg-black/5 dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-full px-10 py-6 text-sm font-bold tracking-widest focus:outline-none focus:border-accent-cyan/40 transition-all placeholder:text-zinc-600 focus:bg-white/10 dark:focus:bg-white/[0.05]"
                       />
                       {state?.errors?.email && <p className="text-[10px] font-bold text-red-500 ml-10 uppercase tracking-widest">{state.errors.email[0]}</p>}
                    </div>

                    <div className="space-y-3">
                       <label className="text-[9px] font-black uppercase tracking-[0.4em] opacity-30 ml-6">Data Payload</label>
                       <textarea 
                         required
                         name="message"
                         rows={5}
                         placeholder="DESCRIBE YOUR VISION..."
                         className="w-full bg-black/5 dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-[2.5rem] px-10 py-8 text-sm font-bold tracking-widest focus:outline-none focus:border-accent-cyan/40 transition-all placeholder:text-zinc-600 focus:bg-white/10 dark:focus:bg-white/[0.05] resize-none"
                       />
                       {state?.errors?.message && <p className="text-[10px] font-bold text-red-500 ml-10 uppercase tracking-widest">{state.errors.message[0]}</p>}
                    </div>

                    <MagneticButton className="w-full">
                       <button 
                         type="submit"
                         disabled={isPending || state?.success}
                         className="w-full py-6 bg-zinc-950 dark:bg-white text-white dark:text-black rounded-full font-black uppercase text-xs tracking-[0.3em] flex items-center justify-center gap-4 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 shadow-2xl"
                       >
                          {isPending ? (
                             <span className="animate-pulse">Synchronizing...</span>
                          ) : state?.success ? (
                             "Payload Transmitted"
                          ) : (
                             <><Send className="w-4 h-4" /> Initiate Link</>
                          )}
                       </button>
                    </MagneticButton>

                    {state?.success && (
                       <motion.div 
                         initial={{ opacity: 0, scale: 0.9 }}
                         animate={{ opacity: 1, scale: 1 }}
                         className="p-6 bg-accent-cyan/10 border border-accent-cyan/20 rounded-3xl text-center shadow-lg"
                       >
                         <p className="text-[10px] font-black text-accent-cyan uppercase tracking-[0.3em]">
                           {state.message}
                         </p>
                       </motion.div>
                    )}
                 </form>
              </div>

              {/* 🌌 Background Depth Decor */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent-cyan/5 blur-[120px] rounded-full -z-10 animate-pulse-soft" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent-blue/5 blur-[120px] rounded-full -z-10 animate-pulse-soft" />
           </div>
        </div>
      </div>
    </section>
  );
});

ContactSection.displayName = "ContactSection";
