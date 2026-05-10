"use client";

import { useRef, useMemo, memo, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Text, 
  Float, 
  OrbitControls, 
  Sphere, 
  MeshDistortMaterial, 
  PerspectiveCamera, 
  Billboard,
  AdaptiveDpr,
  PerformanceMonitor
} from "@react-three/drei";
import * as THREE from "three";

const skills = [
  "React", "Next.js", "Tailwind", "Python", 
  "TensorFlow", "Node.js", "Three.js", "GSAP", 
  "Blender", "TypeScript", "VS Code", "Git", 
  "Pandas", "Scikit-learn", "Framer"
];

// 1. FIBONACCI SPHERE DISTRIBUTION - Mathematical Balance
const getFibonacciPoints = (count: number, radius: number) => {
  const points = [];
  const phi = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = phi * i;
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;
    points.push(new THREE.Vector3(x * radius, y * radius, z * radius));
  }
  return points;
};

// 2. SKILL NODE COMPONENT - Smart Camera-Facing Labels
const SkillNode = memo(({ name, position }: { name: string; position: THREE.Vector3 }) => {
  const [hovered, setHovered] = useState(false);
  const textRef = useRef<any>(null);

  useFrame((state) => {
    if (!textRef.current) return;
    
    const cameraPos = state.camera.position;
    const dist = position.distanceTo(cameraPos);
    
    // Depth-based scaling and opacity for spatial realism
    const scale = THREE.MathUtils.mapLinear(dist, 5, 12, 1, 0.4);
    const opacity = THREE.MathUtils.mapLinear(dist, 5, 12, 1, 0.15);
    
    textRef.current.scale.setScalar(THREE.MathUtils.lerp(textRef.current.scale.x, hovered ? scale * 1.6 : scale, 0.1));
    textRef.current.fillOpacity = THREE.MathUtils.lerp(textRef.current.fillOpacity || 1, hovered ? 1 : opacity, 0.1);
  });

  return (
    <group position={position}>
      <Billboard>
        <Text
          ref={textRef}
          fontSize={0.3}
          color={hovered ? "#22D3EE" : "#FFFFFF"}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.01}
          outlineColor="#000000"
        >
          {name}
        </Text>
      </Billboard>
      
      {/* Node Anchor Point */}
      <mesh>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color={hovered ? "#22D3EE" : "#1E3A8A"} transparent opacity={0.4} />
      </mesh>
    </group>
  );
});
SkillNode.displayName = "SkillNode";

// 3. NEURAL NETWORK CONNECTIONS
const ConnectionLines = memo(({ points }: { points: THREE.Vector3[] }) => {
  const lineRef = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const linePoints: number[] = [];
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dist = points[i].distanceTo(points[j]);
        if (dist < 3.5) { 
          linePoints.push(points[i].x, points[i].y, points[i].z);
          linePoints.push(points[j].x, points[j].y, points[j].z);
        }
      }
    }
    geo.setAttribute('position', new THREE.Float32BufferAttribute(linePoints, 3));
    return geo;
  }, [points]);

  useFrame((state) => {
    if (lineRef.current) {
      const material = lineRef.current.material as THREE.LineBasicMaterial;
      material.opacity = 0.03 + Math.sin(state.clock.elapsedTime) * 0.01;
    }
  });

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color="#22D3EE" transparent opacity={0.05} blending={THREE.AdditiveBlending} />
    </lineSegments>
  );
});
ConnectionLines.displayName = "ConnectionLines";

// 4. CENTRAL ENERGY CORE
const CentralCore = memo(() => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
  });

  return (
    <group>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={0.5}>
        <Sphere ref={meshRef} args={[1, 64, 64]}>
          <MeshDistortMaterial
            color="#1E3A8A"
            speed={2}
            distort={0.3}
            radius={1}
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0.1}
          />
        </Sphere>
      </Float>
      
      {/* Volumetric Halo */}
      <Sphere args={[1.3, 32, 32]}>
        <meshBasicMaterial color="#22D3EE" transparent opacity={0.02} wireframe />
      </Sphere>
      
      <pointLight intensity={1.5} distance={6} color="#22D3EE" />
    </group>
  );
});
CentralCore.displayName = "CentralCore";

// 5. THE SPHERE UNIVERSE
const SphereUniverse = memo(() => {
  const groupRef = useRef<THREE.Group>(null);
  const radius = 4;
  const points = useMemo(() => getFibonacciPoints(skills.length, radius), []);

  useFrame((state) => {
    if (!groupRef.current || document.body.classList.contains('is-scrolling')) return;
    
    // Natural Idle Rotation
    groupRef.current.rotation.y += 0.0008;
    
    // Interactive Parallax
    const targetX = state.pointer.x * 0.15;
    const targetY = state.pointer.y * 0.15;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.05);
  });

  return (
    <group ref={groupRef}>
      {skills.map((skill, i) => (
        <SkillNode key={skill} name={skill} position={points[i]} />
      ))}
      <ConnectionLines points={points} />
      <CentralCore />
    </group>
  );
});
SphereUniverse.displayName = "SphereUniverse";

export const TechSphere = memo(() => {
  const [dpr, setDpr] = useState(1.5);

  return (
    <div className="h-[550px] md:h-[650px] w-full cursor-grab active:cursor-grabbing relative">
      <Canvas 
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance",
          logarithmicDepthBuffer: true
        }}
        dpr={dpr}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={40} />
          <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.5)} />
          <AdaptiveDpr pixelated />
          
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#22D3EE" />
          
          <SphereUniverse />

          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.4}
            dampingFactor={0.05}
            enableDamping
          />
        </Suspense>
      </Canvas>
      
      {/* Premium Fog Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.02)_0%,transparent_80%)]" />
    </div>
  );
});

TechSphere.displayName = "TechSphere";
