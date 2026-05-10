"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, AdaptiveDpr, AdaptiveEvents, PerformanceMonitor, Points, PointMaterial, MeshDistortMaterial, Float, Icosahedron } from "@react-three/drei";
import { useRef, useState, memo, useMemo, useEffect } from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";

// 1. Cinematic Dust Motes - Balanced for visual richness and performance
const ParticleField = memo(({ count = 350, isDark }: { count?: number; isDark: boolean }) => {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 20;
      p[i * 3 + 1] = (Math.random() - 0.5) * 20;
      p[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return p;
  }, [count]);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!ref.current || document.body.classList.contains('is-scrolling')) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.005;
    ref.current.rotation.x = t * 0.002;
  });

  return (
    <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={isDark ? "#22D3EE" : "#1E3A8A"}
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={isDark ? 0.15 : 0.08}
      />
    </Points>
  );
});
ParticleField.displayName = "ParticleField";

// 2. Abstract Crystalline Monoliths
const FloatingMonoliths = memo(({ isDark }: { isDark: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  const shapes = useMemo(() => {
    return [...Array(4)].map((_, i) => ({
      position: [(Math.random() - 0.5) * 12, (Math.random() - 0.5) * 12, -8 - Math.random() * 8] as [number, number, number],
      scale: 1 + Math.random() * 2,
      speed: 0.1 + Math.random() * 0.4,
      distort: 0.2 + Math.random() * 0.4,
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current || document.body.classList.contains('is-scrolling')) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.children.forEach((child, i) => {
      child.position.y += Math.sin(t * shapes[i].speed) * 0.001;
      child.rotation.x = t * 0.05;
      child.rotation.y = t * 0.08;
    });
  });

  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => (
        <Float key={i} speed={shape.speed * 2} rotationIntensity={0.5} floatIntensity={0.5}>
          <Icosahedron args={[1, 10]} position={shape.position} scale={shape.scale}>
            <MeshDistortMaterial
              color={i % 2 === 0 ? (isDark ? "#1E3A8A" : "#22D3EE") : (isDark ? "#0A0A0A" : "#FFFFFF")}
              speed={1.5}
              distort={shape.distort}
              radius={1}
              metalness={0.9}
              roughness={0.1}
              transparent
              opacity={isDark ? 0.1 : 0.03}
            />
          </Icosahedron>
        </Float>
      ))}
    </group>
  );
});
FloatingMonoliths.displayName = "FloatingMonoliths";

// 3. Dynamic Background World
const BackgroundWorld = memo(({ isDark }: { isDark: boolean }) => {
  const worldRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!worldRef.current) return;
    
    const { x, y } = state.pointer;
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, x, 0.05);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, y, 0.05);
    
    worldRef.current.rotation.x = -mouse.current.y * 0.03;
    worldRef.current.rotation.y = mouse.current.x * 0.03;

    if (typeof window !== 'undefined') {
       const scrollY = window.scrollY;
       worldRef.current.position.y = THREE.MathUtils.lerp(worldRef.current.position.y, scrollY * 0.0005, 0.1);
    }
  });

  return (
    <group ref={worldRef}>
      <ParticleField isDark={isDark} />
      <FloatingMonoliths isDark={isDark} />
      
      {/* Volumetric Center Glow */}
      <mesh position={[0, 0, -10]} scale={[20, 20, 1]}>
        <planeGeometry />
        <meshBasicMaterial color={isDark ? "#1E3A8A" : "#22D3EE"} transparent opacity={isDark ? 0.02 : 0.01} />
      </mesh>
    </group>
  );
});
BackgroundWorld.displayName = "BackgroundWorld";

export function Scene() {
  const [dpr, setDpr] = useState(1);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <div className="fixed inset-0 -z-10 h-screen w-full pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 65 }}
        dpr={[1, 1.25]}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true
        }}
      >
        <PerformanceMonitor onDecline={() => setDpr(1)} />
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        
        <ambientLight intensity={isDark ? 0.3 : 0.8} />
        <pointLight position={[10, 10, 10]} intensity={isDark ? 1 : 0.5} color="#22D3EE" />
        <pointLight position={[-10, -10, -10]} intensity={isDark ? 0.5 : 0.2} color={isDark ? "#9B1C1C" : "#FFFFFF"} />
        
        <BackgroundWorld isDark={isDark} />
        
        <Environment preset="city" />
        <fog attach="fog" args={[isDark ? "#0A0A0A" : "#FAFAFA", 5, 25]} />
      </Canvas>
    </div>
  );
}
