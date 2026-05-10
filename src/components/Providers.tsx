"use client";

import { ThemeProvider } from "next-themes";
import { ReactLenis } from "@studio-freight/react-lenis";
import { useEffect, useState, useRef } from "react";
import { ThemeTransitionProvider } from "@/context/ThemeTransitionContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    setMounted(true);
    
    // 1. High-Sync Lenis + GSAP Integration
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    
    // 2. Disable lag smoothing
    gsap.ticker.lagSmoothing(0);
    
    // 3. Add Lenis to GSAP Ticker
    gsap.ticker.add(update);
    
    // 4. Update ScrollTrigger and handle performance class
    const lenis = lenisRef.current?.lenis;
    let scrollTimeout: NodeJS.Timeout;

    if (lenis) {
      lenis.on('scroll', (e: any) => {
        ScrollTrigger.update();
        if (Math.abs(e.velocity) > 0.8) {
          document.body.classList.add('is-scrolling');
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            document.body.classList.remove('is-scrolling');
          }, 150);
        }
      });
    }
    
    return () => {
      gsap.ticker.remove(update);
      lenis?.off('scroll', ScrollTrigger.update);
    };
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      <ThemeTransitionProvider>
        {mounted ? (
          <ReactLenis 
            root 
            ref={lenisRef}
            options={{ 
              lerp: 0.1, 
              smoothWheel: true,
              syncTouch: true,
              wheelMultiplier: 1.0,
              touchMultiplier: 1.5,
              infinite: false,
              gestureOrientation: "vertical",
            }}
          >
            {children as any}
          </ReactLenis>
        ) : (
          <div style={{ visibility: 'hidden' }}>{children}</div>
        )}
      </ThemeTransitionProvider>
    </ThemeProvider>
  );
}
