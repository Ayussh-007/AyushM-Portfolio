"use client";

import { motion, AnimatePresence, useScroll } from "framer-motion";
import { memo, useEffect, useState } from "react";
import { MagneticButton } from "./MagneticButton";
import { ArrowUp } from "lucide-react";

export const ScrollToTop = memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const updateVisibility = (latest: number) => {
      setIsVisible(latest > 600);
    };
    
    const unsubscribe = scrollY.on("change", updateVisibility);
    return () => unsubscribe();
  }, [scrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed bottom-10 left-6 md:left-10 z-[150] hidden md:block"
        >
          <MagneticButton glow>
            <button
              onClick={scrollToTop}
              className="p-5 glass rounded-2xl border border-white/10 hover:border-accent-cyan/50 transition-all duration-500 group relative overflow-hidden"
              aria-label="Scroll to Top"
            >
              <div className="absolute inset-0 bg-accent-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <ArrowUp className="w-5 h-5 text-accent-cyan group-hover:-translate-y-1 transition-transform relative z-10" />
            </button>
          </MagneticButton>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

ScrollToTop.displayName = "ScrollToTop";
