"use client";

import { useEffect, useState, memo } from "react";
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence } from "framer-motion";

export const CustomCursor = memo(() => {
  const [cursorState, setCursorState] = useState<"default" | "hover" | "action" | "hidden">("default");
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // High-performance spring physics
  const springConfig = { damping: 35, stiffness: 600, mass: 0.6 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const velocityX = useMotionValue(0);
  const velocityY = useMotionValue(0);

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;

    const moveCursor = (e: MouseEvent) => {
      // Logic for hiding cursor when it leaves the window
      if (e.clientX <= 0 || e.clientY <= 0 || e.clientX >= window.innerWidth || e.clientY >= window.innerHeight) {
        setCursorState("hidden");
      } else {
        if (cursorState === "hidden") setCursorState("default");
      }

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
      if (target.closest(".magnetic-target") || target.closest("button") || target.closest("a")) {
        setCursorState("action");
      } else if (target.closest(".glass")) {
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
  }, [cursorX, cursorY, velocityX, velocityY, cursorState]);

  // Velocity-based stretching logic
  const scaleX = useTransform(velocityX, [-120, 120], [1.8, 0.4]);
  const scaleY = useTransform(velocityY, [-120, 120], [0.4, 1.8]);
  const rotate = useTransform(velocityX, [-120, 120], [-25, 25]);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
        opacity: cursorState === "hidden" ? 0 : 1,
        willChange: "transform, opacity",
      }}
    >
      {/* 🔮 MAIN BLOB */}
      <motion.div
        animate={{
          scale: cursorState === "action" ? 0.3 : cursorState === "hover" ? 2 : 1,
          backgroundColor: cursorState === "action" ? "#FFFFFF" : "#22D3EE",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="flex h-6 w-6 items-center justify-center rounded-full mix-blend-difference"
        style={{
          scaleX: cursorState === "default" ? scaleX : 1,
          scaleY: cursorState === "default" ? scaleY : 1,
          rotate: cursorState === "default" ? rotate : 0,
        }}
      >
        <div className="h-1 w-1 rounded-full bg-black opacity-30" />
      </motion.div>
      
      {/* ☄️ TRAIL / RING */}
      <motion.div
        animate={{
          scale: cursorState === "action" ? 3.5 : 0,
          opacity: cursorState === "action" ? 0.4 : 0,
          borderWidth: cursorState === "action" ? "1.5px" : "0px",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="absolute left-[-12px] top-[-12px] h-12 w-12 rounded-full border-accent-cyan flex items-center justify-center"
      >
         <div className="w-1 h-1 bg-accent-cyan rounded-full animate-ping" />
      </motion.div>

      {/* 🌠 SOFT GLOW SUBSTRATE */}
      <motion.div 
        animate={{ 
          opacity: cursorState === "hidden" ? 0 : 0.4,
          scale: cursorState === "action" ? 2 : 1.5 
        }}
        className="absolute inset-0 -z-10 bg-accent-cyan/20 blur-xl rounded-full" 
      />
    </motion.div>
  );
});

CustomCursor.displayName = "CustomCursor";
