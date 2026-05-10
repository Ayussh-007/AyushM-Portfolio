"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useThemeTransition } from "@/context/ThemeTransitionContext";

export function ThemeToggle() {
  const { theme } = useTheme();
  const transition = useThemeTransition();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !transition) return null;
  const { toggleWithAnimation } = transition;

  const isDark = theme === "dark";

  return (
    <div className="relative">
      {/* SVG Filter for Liquid Effect - Defined in a non-clipping container */}
      <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }} aria-hidden="true">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <button
        onClick={(e) => toggleWithAnimation(e)}
        className="glass relative flex h-12 w-24 cursor-pointer items-center rounded-full p-1 liquid-toggle"
        aria-label="Toggle theme"
      >
        <motion.div
          className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
          animate={{
            x: isDark ? 48 : 0,
            rotate: isDark ? 360 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
          }}
        >
          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.div
                key="moon"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
              >
                <Moon className="h-5 w-5" />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
              >
                <Sun className="h-5 w-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Decorative liquid drops */}
        <motion.div
          className="absolute left-4 h-2 w-2 rounded-full bg-primary/40"
          animate={{
            scale: isDark ? [0, 1.5, 0] : 0,
            x: isDark ? [0, 20, 40] : 0,
          }}
          transition={{ duration: 0.6 }}
        />
        <motion.div
          className="absolute right-4 h-2 w-2 rounded-full bg-primary/40"
          animate={{
            scale: !isDark ? [0, 1.5, 0] : 0,
            x: !isDark ? [0, -20, -40] : 0,
          }}
          transition={{ duration: 0.6 }}
        />
      </button>
    </div>
  );
}
