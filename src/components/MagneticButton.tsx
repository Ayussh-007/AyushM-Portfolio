"use client";

import { useRef, useState, memo } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export const MagneticButton = memo(({
  children,
  className = "",
  glow = false,
}: {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<{ x: number, y: number, id: number }[]>([]);

  // Elastic Physics Config
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 15, stiffness: 150, mass: 0.1 });
  const springY = useSpring(y, { damping: 15, stiffness: 150, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((clientX - centerX) * 0.4);
    y.set((clientY - centerY) * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const rippleX = e.clientX - rect.left;
    const rippleY = e.clientY - rect.top;
    
    setRipples(prev => [...prev, { x: rippleX, y: rippleY, id: Date.now() }]);
    setTimeout(() => setRipples(prev => prev.slice(1)), 1000);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ x: springX, y: springY }}
      className={`magnetic-target relative flex items-center justify-center cursor-pointer ${className}`}
    >
      {/* 1. Liquid Hover Morph Background */}
      <motion.div
        className="absolute inset-0 z-0 bg-accent-cyan/10 rounded-full blur-xl pointer-events-none"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: isHovered ? 1.5 : 0, 
          opacity: isHovered ? 1 : 0 
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />

      {/* 2. Hover Ripple Effects */}
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            style={{
              position: "absolute",
              left: ripple.x,
              top: ripple.y,
              width: 20,
              height: 20,
              backgroundColor: "rgba(34, 211, 238, 0.4)",
              borderRadius: "50%",
              pointerEvents: "none",
              zIndex: 1
            }}
          />
        ))}
      </AnimatePresence>

      {/* 3. Button Content with Depth Extrusion */}
      <motion.div 
        className="relative z-10 w-full h-full"
        animate={{
          scale: isHovered ? 1.05 : 1,
          translateZ: isHovered ? 20 : 0
        }}
      >
        {children}
      </motion.div>

      {/* 4. Glow Pulse */}
      {glow && (
        <div className={`absolute inset-0 rounded-full bg-accent-cyan/20 blur-2xl -z-10 animate-pulse-soft transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      )}
    </motion.div>
  );
});

MagneticButton.displayName = "MagneticButton";
