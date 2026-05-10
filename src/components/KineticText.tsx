"use client";

import { motion } from "framer-motion";
import { memo } from "react";

interface KineticTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export const KineticText = memo(({ text, className = "", delay = 0, stagger = 0.02 }: KineticTextProps) => {
  const characters = text.split("");

  return (
    <span className="inline-block overflow-visible">
      {characters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: delay + i * stagger,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`inline-block ${className}`}
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
});

KineticText.displayName = "KineticText";
