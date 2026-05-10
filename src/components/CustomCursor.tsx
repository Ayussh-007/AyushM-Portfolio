"use client";

import { useEffect, useState, memo } from "react";
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence } from "framer-motion";

export const CustomCursor = memo(() => {
  const [cursorState, setCursorState] = useState<"default" | "hover" | "action">("default");
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 800, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const velocityX = useMotionValue(0);
  const velocityY = useMotionValue(0);

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;

    const moveCursor = (e: MouseEvent) => {
      if (document.body.classList.contains('is-scrolling')) return;
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const vX = e.clientX - lastX;
      const vY = e.clientY - lastY;
      velocityX.set(vX);
      velocityY.set(vY);
      lastX = e.clientX;
      lastY = e.clientY;
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(".magnetic-target")) {
        setCursorState("action");
      } else if (target.tagName === "BUTTON" || target.tagName === "A") {
        setCursorState("hover");
      } else {
        setCursorState("default");
      }
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mouseover", handleHover, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHover);
    };
  }, [cursorX, cursorY, velocityX, velocityY]);

  const scaleX = useTransform(velocityX, [-100, 100], [1.5, 0.5]);
  const scaleY = useTransform(velocityY, [-100, 100], [0.5, 1.5]);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block mix-blend-difference"
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
        willChange: "transform",
      }}
    >
      <motion.div
        animate={{
          scale: cursorState === "action" ? 0 : cursorState === "hover" ? 2.5 : 1,
          opacity: cursorState === "action" ? 0 : 1
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-cyan"
        style={{
          scaleX: cursorState === "default" ? scaleX : 1,
          scaleY: cursorState === "default" ? scaleY : 1,
        }}
      >
        <div className="h-1 w-1 rounded-full bg-black opacity-20" />
      </motion.div>
      
      {/* Action Ring for Magnetic Targets */}
      <motion.div
        animate={{
          scale: cursorState === "action" ? 3 : 0,
          opacity: cursorState === "action" ? 0.5 : 0,
        }}
        className="absolute left-[-12px] top-[-12px] h-12 w-12 rounded-full border border-accent-cyan"
      />
    </motion.div>
  );
});

CustomCursor.displayName = "CustomCursor";
