"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";

export function Spotlight() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 300 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      if (document.body.classList.contains('is-scrolling')) return;

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [mouseX, mouseY]);

  // Using useMotionTemplate for a highly diffused cinematic spotlight
  const background = useMotionTemplate`radial-gradient(
    circle at ${smoothX}px ${smoothY}px,
    rgba(34, 211, 238, 0.08) 0%,
    rgba(255, 255, 255, 0.02) 20%,
    transparent 80%
  )`;

  return (
    <motion.div
      className="fixed inset-0 z-[-2] pointer-events-none transition-opacity duration-1000"
      style={{ background }}
    />
  );
}
