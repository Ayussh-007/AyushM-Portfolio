"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState, memo, useRef } from "react";
import Image from "next/image";

export const FloatingPortrait = memo(() => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 100, mass: 1 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const rotateX = useTransform(y, [-500, 500], [3, -3]);
  const rotateY = useTransform(x, [-500, 500], [-3, 3]);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile || document.body.classList.contains('is-scrolling')) return;

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.03;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.03;
        mouseX.set(moveX);
        mouseY.set(moveY);
      });
    };

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener('resize', checkMobile);
      cancelAnimationFrame(rafId);
    };
  }, [mouseX, mouseY, isMobile]);

  if (!mounted) return null;

  const currentTheme = resolvedTheme || theme;

  return (
    <div className="absolute inset-0 flex items-end justify-center pointer-events-none z-[30]">
      <motion.div
        style={{
          x: isMobile ? 0 : x,
          y: isMobile ? 0 : y,
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
          perspective: 1000,
          willChange: "transform",
          transform: "translateZ(0)",
        }}
        className="relative h-[65vh] md:h-[85vh] w-full max-w-5xl"
      >
        <div 
          className="absolute bottom-[-5%] left-1/2 h-24 w-[70%] -translate-x-1/2 rounded-[100%] bg-black/[0.1] blur-[60px] dark:bg-accent-cyan/5 z-0" 
          style={{ transform: "translateZ(0)" }}
        />
        
        <div className="relative h-full w-full flex items-end justify-center pointer-events-none px-4">
          {/* Using Next.js Image for Automatic WebP conversion and optimization */}
          <div className="relative h-full w-full flex items-end justify-center">
             <motion.div
                key={currentTheme === "dark" ? "dark-img" : "light-img"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="relative h-full w-full"
              >
                <Image
                  src={currentTheme === "dark" ? "/images/hero/ayush-dark.png" : "/images/hero/ayush-light.png"}
                  alt="Ayush Mhatre"
                  fill
                  priority // Critical for LCP
                  sizes="(max-width: 768px) 100vw, 1200px"
                  className="object-contain object-bottom relative z-10"
                  quality={90}
                />
              </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
});

FloatingPortrait.displayName = "FloatingPortrait";
