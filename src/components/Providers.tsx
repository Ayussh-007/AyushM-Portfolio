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
    
    // ⚔️ ULTRA-SYNC: Lenis + GSAP Master Loop
    gsap.registerPlugin(ScrollTrigger);
    
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    
    gsap.ticker.lagSmoothing(0);
    gsap.ticker.add(update);
    
    const lenis = lenisRef.current?.lenis;
    let scrollTimeout: NodeJS.Timeout;

    if (lenis) {
      lenis.on('scroll', (e: any) => {
        ScrollTrigger.update();
        
        // 🚀 Dynamic Performance Toggling
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
              lerp: 0.08, // Premium weighted inertia
              smoothWheel: true,
              syncTouch: true,
              wheelMultiplier: 0.9, // More intentional, less floaty
              touchMultiplier: 1.8,
              infinite: false,
              gestureOrientation: "vertical",
            }}
          >
            {children as any}
          </ReactLenis>
        ) : (
          <div className="bg-background fixed inset-0" />
        )}
      </ThemeTransitionProvider>
    </ThemeProvider>
  );
}
