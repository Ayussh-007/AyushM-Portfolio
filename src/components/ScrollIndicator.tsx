"use client";

import { motion } from "framer-motion";
import { memo } from "react";

export const ScrollIndicator = memo(() => {
  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none select-none">
      <div className="flex flex-col items-center gap-3">
        <motion.div
          animate={{
            y: [0, 5, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative flex h-14 w-8 justify-center rounded-full border-2 border-primary/20 p-1"
          style={{ willChange: "transform" }}
        >
          <motion.div
            animate={{
              y: [0, 24, 0],
              opacity: [1, 0.4, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-1.5 w-1.5 rounded-full bg-accent-cyan shadow-[0_0_8px_#22D3EE]"
            style={{ willChange: "transform, opacity" }}
          />
        </motion.div>
        <span className="text-[9px] uppercase tracking-[0.4em] opacity-30 font-bold">Scroll</span>
      </div>
    </div>
  );
});

ScrollIndicator.displayName = "ScrollIndicator";
