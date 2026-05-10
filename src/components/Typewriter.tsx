"use client";

import { useEffect, useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const roles = [
  "AI Solutions",
  "Full-Stack Dev",
  "Data Analysis",
  "Creative Engineering",
  "Intelligent Interfaces",
];

export const Typewriter = memo(() => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex h-8 items-center overflow-hidden pointer-events-none select-none">
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -15, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="text-xl font-bold tracking-tight text-accent-cyan"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
});

Typewriter.displayName = "Typewriter";
