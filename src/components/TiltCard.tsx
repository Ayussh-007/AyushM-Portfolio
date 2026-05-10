"use client";

import { useRef, useState, memo } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export const TiltCard = memo(({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { damping: 20, stiffness: 150 });
  const mouseYSpring = useSpring(y, { damping: 20, stiffness: 150 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || document.body.classList.contains('is-scrolling')) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.02 }}
      className={`relative group ${className}`}
    >
      <div 
        style={{
          transform: isHovered ? "translateZ(30px)" : "translateZ(0)",
          transformStyle: "preserve-3d",
          transition: "transform 0.3s ease-out"
        }}
        className="h-full w-full"
      >
        {children}
      </div>
      
      {/* Dynamic Shine Effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: useTransform(
            [mouseXSpring, mouseYSpring],
            ([mx, my]) => `radial-gradient(circle at ${((mx as number) + 0.5) * 100}% ${((my as number) + 0.5) * 100}%, rgba(255,255,255,0.1) 0%, transparent 80%)`
          )
        }}
      />
    </motion.div>
  );
});

TiltCard.displayName = "TiltCard";
