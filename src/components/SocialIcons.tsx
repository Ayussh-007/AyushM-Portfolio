"use client";

import { MagneticButton } from "./MagneticButton";
import { motion } from "framer-motion";
import { memo } from "react";

const socials = [
  { 
    name: "GitHub", 
    href: "https://github.com/Ayussh-007", 
    color: "group-hover:text-white",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    )
  },
  { 
    name: "LinkedIn", 
    href: "https://www.linkedin.com/in/ayussh-mhatre007/", 
    color: "group-hover:text-blue-500",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    )
  },
  { 
    name: "Gmail", 
    href: "mailto:007ayushmhatre@gmail.com", 
    color: "group-hover:text-red-500",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    )
  },
];

export const SocialIcons = memo(() => {
  return (
    <div className="fixed left-6 md:left-10 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-8 md:gap-10 items-center">
      {/* 🔮 Vertical Connector */}
      <div className="h-12 w-[1px] bg-gradient-to-b from-transparent to-accent-cyan/40" />

      {socials.map((social, i) => (
        <MagneticButton key={social.name}>
          <motion.a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            className={`group relative block rounded-[1.2rem] p-5 transition-all duration-700 glass ${social.color}`}
            initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.8 + i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Liquid Shine Overlay */}
            <div className="absolute inset-0 scale-0 rounded-[1.2rem] bg-accent-cyan/10 blur-2xl transition-transform duration-1000 group-hover:scale-150" />
            
            <div className="relative z-10 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6">
              {social.icon}
            </div>

            {/* Hover Tooltip */}
            <div className="absolute left-[calc(100%+20px)] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
               <div className="glass px-4 py-2 rounded-xl border-white/10">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white whitespace-nowrap">
                    {social.name}
                  </span>
               </div>
            </div>
          </motion.a>
        </MagneticButton>
      ))}

      <div className="h-12 w-[1px] bg-gradient-to-t from-transparent to-accent-cyan/40" />
    </div>
  );
});

SocialIcons.displayName = "SocialIcons";
