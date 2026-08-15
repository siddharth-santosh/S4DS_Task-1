import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky, ContactShadows } from '@react-three/drei';
import { ManhattanModel } from './ManhattanModel';

export function Scene({
  autoRotate,
  isHighQuality,
  resetTrigger,
  onSelectObject,
  setHoveredObject
}) {
  const controlsRef = useRef();

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  }, [resetTrigger]);

  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [110, 65, 110], fov: 45, near: 0.1, far: 5000 }}
        dpr={[1, isHighQuality ? 1.5 : 1]}
        gl={{ antialias: isHighQuality, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#0b0f19']} />
        
        {/* Lighting */}
        <ambientLight intensity={isHighQuality ? 0.8 : 0.6} />
        <directionalLight
          position={[250, 450, 150]}
          intensity={isHighQuality ? 1.6 : 1.1}
          castShadow={isHighQuality}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={2000}
          shadow-camera-left={-500}
          shadow-camera-right={500}
          shadow-camera-top={500}
          shadow-camera-bottom={-500}
        />
        <hemisphereLight skyColor="#38bdf8" groundColor="#090d16" intensity={0.6} />

        {/* Skybox & Atmosphere */}
        <Sky
          sunPosition={[250, 450, 150]}
          turbidity={8}
          rayleigh={2}
          mieCoefficient={0.005}
          mieDirectionalG={0.8}
        />

        {/* Contact Shadows for ground plane grounding */}
        {isHighQuality && (
          <ContactShadows
            position={[0, -2, 0]}
            opacity={0.4}
            scale={1000}
            blur={2}
            far={50}
          />
        )}

        {/* Camera Controls */}
        <OrbitControls
          ref={controlsRef}
          autoRotate={autoRotate}
          autoRotateSpeed={0.6}
          enableDamping
          dampingFactor={0.05}
          maxPolarAngle={Math.PI / 2 - 0.02}
          minDistance={3}
          maxDistance={2500}
          target={[0, 0, 0]}
        />

        {/* 3D Manhattan Model */}
        <Suspense fallback={null}>
          <ManhattanModel
            onSelectObject={onSelectObject}
            setHoveredObject={setHoveredObject}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
