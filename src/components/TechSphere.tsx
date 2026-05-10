"use client";

import { useRef, useMemo, memo, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Text, 
  OrbitControls, 
  Sphere, 
  MeshDistortMaterial, 
  Billboard,
  AdaptiveDpr,
  Float,
} from "@react-three/drei";
import * as THREE from "three";

const skills = [
  "React", "Next.js", "Node.js", "Tailwind", 
  "Python", "Pandas", "Sklearn", "TensorFlow", 
  "Blender", "VS Code", "AutoCAD", "Git", "TypeScript"
];

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

const DataLines = memo(({ points }: { points: THREE.Vector3[] }) => {
  const lineRef = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const linePoints: number[] = [];
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        if (points[i].distanceTo(points[j]) < 3.2) {
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
      material.opacity = 0.04 + Math.sin(state.clock.elapsedTime * 2) * 0.02;
    }
  });

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color="#22D3EE" transparent opacity={0.06} blending={THREE.AdditiveBlending} />
    </lineSegments>
  );
});
DataLines.displayName = "DataLines";

const SkillNode = memo(({ name, position }: { name: string; position: THREE.Vector3 }) => {
  const textRef = useRef<any>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!textRef.current) return;
    const dist = state.camera.position.distanceTo(new THREE.Vector3().setFromMatrixPosition(textRef.current.matrixWorld));
    const targetScale = hovered ? 1.3 : THREE.MathUtils.mapLinear(dist, 5, 11, 1.1, 0.5);
    textRef.current.scale.setScalar(THREE.MathUtils.lerp(textRef.current.scale.x, targetScale, 0.1));
    textRef.current.fillOpacity = THREE.MathUtils.mapLinear(dist, 5, 11, 1, 0.2);
  });

  return (
    <group position={position}>
      <Billboard>
        <Text
          ref={textRef}
          fontSize={0.35}
          color={hovered ? "#22D3EE" : "#FFFFFF"}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.015}
          outlineColor="#000000"
        >
          {name}
        </Text>
      </Billboard>
    </group>
  );
});
SkillNode.displayName = "SkillNode";

const SphereUniverse = memo(() => {
  const groupRef = useRef<THREE.Group>(null);
  const radius = 3.2; // Slightly smaller radius
  const points = useMemo(() => getFibonacciPoints(skills.length, radius), []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += 0.003;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -state.pointer.y * 0.2, 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, state.pointer.x * 0.2, 0.05);
  });

  return (
    <group ref={groupRef}>
      {skills.map((skill, i) => (
        <SkillNode key={skill} name={skill} position={points[i]} />
      ))}
      <DataLines points={points} />
      
      <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
        <Sphere args={[0.8, 32, 32]}>
          <MeshDistortMaterial
            color="#1E3A8A"
            speed={3}
            distort={0.4}
            transparent
            opacity={0.12}
          />
        </Sphere>
      </Float>
    </group>
  );
});
SphereUniverse.displayName = "SphereUniverse";

export const TechSphere = memo(() => {
  return (
    <div className="w-full h-full relative pointer-events-auto">
      <Canvas 
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 9], fov: 38 }} // Adjusted camera
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1.2} />
          <pointLight position={[10, 10, 10]} intensity={2.5} color="#22D3EE" />
          <SphereUniverse />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            rotateSpeed={0.5}
            dampingFactor={0.05}
            enableDamping 
          />
          <AdaptiveDpr pixelated />
        </Suspense>
      </Canvas>
    </div>
  );
});

TechSphere.displayName = "TechSphere";
